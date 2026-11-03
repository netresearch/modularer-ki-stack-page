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
const chunks = source.split(/^---\s*$/m);
const slides = [];
for (let i = 1; i + 1 < chunks.length; i += 2) {
  const value = (key) => {
    const raw = chunks[i].match(new RegExp(`^${key}:\\s*(.*)$`, 'm'))?.[1];
    assert(raw !== undefined, `Missing ${key} in slide metadata`);
    try { return JSON.parse(raw); } catch { return raw; }
  };
  slides.push({ title: value('title'), talkPage: value('talkPage'), talkTotal: value('talkTotal'), appendix: value('appendix'), section: value('section'), divider: value('sectionDivider'), menuTargets: [...chunks[i + 1].matchAll(/<NrJump :page="(\d+)" print-label>/g)].map((match) => Number(match[1])) });
}
const titles = slides.map((slide) => slide.title);
const talkTotal = slides.filter((slide) => !slide.appendix).length;
const dividers = slides.flatMap((slide, i) => slide.divider ? [i + 1] : []);
assert.equal(dividers.length, 4, 'Expected four quiet section dividers');
assert(slides.every((slide) => slide.talkTotal === talkTotal), 'Inconsistent main-slide total');
assert.match(source, /^presenter: false$/m, 'Public presenter mode must remain disabled');
assert(!source.includes('<!--'), 'Public source contains speaker notes');
for (const file of await readdir(resolve(site, 'assets'), { recursive: true })) {
  if (file.endsWith('.js')) {
    const text = await readFile(resolve(site, 'assets', file), 'utf8');
    assert(!/Zeit: \d+(?:,\d+)? Minuten?\./.test(text), `Speaker timing leaked into ${file}`);
  }
}
const pageOf = (title) => {
  const number = titles.indexOf(title) + 1;
  assert(number > 0, `Missing slide: ${title}`);
  return number;
};
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
      const overflow = [...slide.querySelectorAll('h1,h2,p,li,figcaption,.nr-columns section,.nr-subtitle,.nr-author,.nr-topics,.nr-stack section,.nr-flow-note,.nr-takeaway,.nr-controls,.nr-section-number')].filter((node) => {
        if (!node.checkVisibility() || !node.getClientRects().length) return false;
        const rect = node.getBoundingClientRect();
        const connector = node.matches('.nr-flow>li,.nr-stack-connected>section');
        return rect.left < box.left - 2 || rect.right > box.right + 2 || rect.bottom > footerTop + 2
          || (!connector && (node.scrollHeight > node.clientHeight + 4 || node.scrollWidth > node.clientWidth + 4));
      }).map((node) => node.className || node.tagName);
      return { overflow, divider: slide.classList.contains('nr-section-divider'), content: slide.querySelector('.nr-content').innerText.replace(/\s+/g, ' ').trim(), dividerExtras: slide.querySelectorAll('.nr-content img,.nr-content ul,.nr-content ol,.nr-content button,.nr-content a,.nr-content .nr-controls').length, broken: [...slide.querySelectorAll('img')].filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src), footer: footer.innerText, max: footer.querySelector('[role="progressbar"]').getAttribute('aria-valuemax'), links: [...slide.querySelectorAll('a[href]')].map((link) => link.href) };
    }, titles[number - 1]);
    assert.deepEqual(result.overflow, [], `Slide ${number}: overflow`);
    assert.deepEqual(result.broken, [], `Slide ${number}: images`);
    const metadata = slides[number - 1];
    assert.equal(result.max, String(talkTotal));
    assert(result.footer.includes(metadata.appendix ? 'Anhang · nicht mitgezählt' : `Folie ${metadata.talkPage}/${talkTotal}`), `Slide ${number}: footer`);
    assert.equal(result.divider, metadata.divider, `Slide ${number}: divider class`);
    if (metadata.divider) {
      assert.equal(result.content, `${String(metadata.section).padStart(2, '0')} ${metadata.title}`, `Slide ${number}: quiet divider content`);
      assert.equal(result.dividerExtras, 0, `Slide ${number}: distracting divider controls`);
    }
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
  const indexPage = pageOf('Rückfragen: die passende Erklärung öffnen');
  const menuTargets = slides[indexPage - 1].menuTargets;
  assert.equal(menuTargets.length, slides.filter((slide) => slide.appendix === 'technical').length - 1, 'Reserve index must cover every explanation');
  assert.equal(new Set(menuTargets).size, menuTargets.length, 'Duplicate reserve index target');
  await show(indexPage);
  for (const [index, number] of menuTargets.entries()) {
    assert(slides[number - 1]?.appendix === 'technical', 'Reserve target outside technical appendix');
    await page.evaluate((index) => [...document.querySelectorAll('.nr-reserve-menu button')].filter((button) => button.checkVisibility())[index].click(), index);
    await page.waitForFunction((number) => location.hash === `#/${number}`, {}, number);
    await page.waitForFunction((title) => [...document.querySelectorAll('.slidev-layout h1')].some((node) => node.textContent === title && node.checkVisibility()), {}, titles[number - 1]);
    await page.evaluate(() => [...document.querySelectorAll('button.nr-jump')].find((button) => button.checkVisibility() && button.textContent === 'Themenübersicht').click());
    await page.waitForFunction((number) => location.hash === `#/${number}`, {}, indexPage);
    await page.waitForFunction(() => [...document.querySelectorAll('.nr-reserve-menu button')].some((button) => button.checkVisibility()));
  }
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
  console.log(`Talk verified: ${titles.length} slides, ${talkTotal}-slide progress, ${dividers.length} quiet dividers, appendix, local images/fonts, ${menuTargets.length} reserve jumps, navigation and ${localLinks.size} local links/downloads`);
} finally {
  await browser?.close(); await new Promise((done) => server.close(done));
  await rm(downloadsDir, { recursive: true, force: true });
}
