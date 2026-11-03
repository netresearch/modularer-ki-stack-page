/** Check the built talk at its real Pages subpath, with no external assets. */
import assert from 'node:assert/strict';
import { readFile, readdir, stat, mkdtemp, rm } from 'node:fs/promises';
import { createServer } from 'node:http';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import puppeteer from 'puppeteer';

const root = fileURLToPath(new URL('../', import.meta.url));
const talk = resolve(root, 'talks/tugle-2026-11-03');
const site = resolve(talk, 'site');
const prefix = '/modularer-ki-stack-page/vortraege/tugle-2026-11-03/';
const pdfName = 'TUGLE-KI-in-TYPO3.pdf';
const source = await readFile(resolve(talk, 'source/slides.md'), 'utf8');
const titles = [...source.matchAll(/^# (.+)$/gm)].map((match) => match[1]);
assert.equal(titles.length, 43, 'Expected 43 slides');
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.pdf': 'application/pdf' };
const server = createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    assert(path.startsWith(prefix));
    let file = resolve(site, path.slice(prefix.length) || 'index.html');
    assert(file.startsWith(site + sep));
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream' });
    res.end(data);
  } catch { res.writeHead(404); res.end('Not found'); }
});
await new Promise((done) => server.listen(0, '127.0.0.1', done));
const origin = `http://127.0.0.1:${server.address().port}`;
const url = origin + prefix;
const downloadsDir = await mkdtemp(resolve(tmpdir(), 'tugle-download-'));
let browser;
try {
  browser = await puppeteer.launch({ executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 900 });
  const failures = [], localLinks = new Set(), fontFiles = new Set();
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    if (/^https?:/.test(request.url()) && !request.url().startsWith(origin + '/')) {
      failures.push(`External asset: ${request.url()}`); void request.abort();
    } else void request.continue();
  });
  page.on('pageerror', (error) => failures.push(error.message));
  page.on('requestfailed', (request) => failures.push(`Failed request: ${request.url()}`));
  page.on('response', (response) => {
    if (response.status() >= 400) failures.push(`${response.status()}: ${response.url()}`);
    if (response.ok() && response.url().endsWith('.woff2')) fontFiles.add(response.url());
  });
  async function show(number) {
    await page.goto(`${url}#/${number}`, { waitUntil: 'networkidle0' });
    await page.waitForFunction((title) => [...document.querySelectorAll('.slidev-layout h1')].some((node) => node.textContent === title && node.checkVisibility()), {}, titles[number - 1]);
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].filter((image) => image.checkVisibility()).map((image) => image.decode()));
      await new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)));
    });
  }
  for (let number = 1; number <= titles.length; number++) {
    await show(number);
    const result = await page.evaluate((title) => {
      const heading = [...document.querySelectorAll('.slidev-layout h1')].find((node) => node.textContent === title && node.checkVisibility());
      const slide = heading.closest('.slidev-layout'), box = slide.getBoundingClientRect();
      const footer = slide.querySelector('.nr-footer'), footerTop = footer.getBoundingClientRect().top;
      const overflow = [...slide.querySelectorAll('h1,h2,p,li,figcaption,.nr-columns section,.nr-subtitle,.nr-author,.nr-topics,.nr-stack section,.nr-flow-note,.nr-takeaway,.nr-controls')].filter((node) => {
        if (!node.checkVisibility() || !node.getClientRects().length) return false;
        const rect = node.getBoundingClientRect();
        const connector = node.matches('.nr-flow>li,.nr-stack-connected>section');
        return rect.left < box.left - 2 || rect.right > box.right + 2 || rect.bottom > footerTop + 2
          || (!connector && (node.scrollHeight > node.clientHeight + 4 || node.scrollWidth > node.clientWidth + 4));
      }).map((node) => node.className || node.tagName);
      return { overflow, broken: [...slide.querySelectorAll('img')].filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src), footer: footer.innerText, max: footer.querySelector('[role="progressbar"]').getAttribute('aria-valuemax'), links: [...slide.querySelectorAll('a[href]')].map((link) => link.href) };
    }, titles[number - 1]);
    assert.deepEqual(result.overflow, [], `Slide ${number}: overflow`);
    assert.deepEqual(result.broken, [], `Slide ${number}: images`);
    assert.equal(result.max, '23');
    assert(result.footer.includes(number <= 23 ? `Folie ${number}/23` : 'Anhang · nicht mitgezählt'), `Slide ${number}: footer`);
    for (const href of result.links) {
      const link = new URL(href);
      assert(['https:', 'http:'].includes(link.protocol), `Unexpected link ${href}`);
      if (link.origin === origin && !link.hash) localLinks.add(href);
    }
  }
  await show(1);
  // Check the fonts actually used for glyphs, not just declared CSS families.
  const cdp = await page.createCDPSession();
  await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
  const { root: documentNode } = await cdp.send('DOM.getDocument');
  for (const [selector, family] of [['.nr-cover h1', 'Raleway'], ['.nr-cover .nr-subtitle', 'Open Sans']]) {
    const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: documentNode.nodeId, selector });
    const { fonts } = await cdp.send('CSS.getPlatformFontsForNode', { nodeId });
    assert(fonts.some((font) => (font.familyName === family || font.familyName.startsWith(family + ' ')) && font.isCustomFont && font.glyphCount > 0), `${family} not actually rendered: ${JSON.stringify(fonts)}`);
  }
  assert(fontFiles.size >= 2, 'Local font files were not loaded');
  await page.keyboard.press('ArrowRight');
  await page.waitForFunction(() => location.hash === '#/2');
  await page.keyboard.press('ArrowLeft');
  await page.waitForFunction(() => location.hash === '#/1');
  await page.mouse.move(800, 400); await page.mouse.wheel({ deltaY: 160 });
  await page.waitForFunction(() => location.hash === '#/2');
  await show(26);
  await page.evaluate(() => [...document.querySelectorAll('.nr-reserve-menu button')].find((button) => button.textContent.includes('Skills einbinden')).click());
  await page.waitForFunction(() => location.hash === '#/29');
  await page.evaluate(() => [...document.querySelectorAll('button.nr-jump')].find((button) => button.checkVisibility() && button.textContent === 'Themenübersicht').click());
  await page.waitForFunction(() => location.hash === '#/26');
  await cdp.send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadsDir });
  await page.$eval('button[title="Download as PDF"]', (button) => button.click());
  const expectedPdf = await readFile(resolve(talk, 'source/public', pdfName));
  let downloaded;
  for (let attempt = 0; attempt < 100; attempt++) {
    const filename = (await readdir(downloadsDir)).find((name) => name.endsWith('.pdf'));
    downloaded = filename && await readFile(resolve(downloadsDir, filename));
    if (downloaded) break;
    await new Promise((done) => setTimeout(done, 100));
  }
  assert.deepEqual(downloaded, expectedPdf, 'PDF download button did not deliver the original PDF');
  localLinks.add(url + pdfName);
  for (const href of localLinks) {
    const response = await fetch(href); assert.equal(response.status, 200, href);
    if (href.endsWith('.pdf')) {
      assert.match(response.headers.get('content-type'), /application\/pdf/);
      assert.deepEqual(Buffer.from(await response.arrayBuffer()), expectedPdf, 'PDF download differs from source');
    }
  }
  assert.deepEqual(failures, [], 'Browser or network errors');
  console.log(`Talk verified: ${titles.length} slides, 23-slide progress, appendix, local images/fonts, navigation and ${localLinks.size} local links/downloads`);
} finally {
  await browser?.close(); await new Promise((done) => server.close(done));
  await rm(downloadsDir, { recursive: true, force: true });
}
