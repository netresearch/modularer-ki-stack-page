/** Check the built talk at its real Pages subpath, with no external assets. */
import assert from 'node:assert/strict';
import { readFile, readdir, stat, lstat, mkdtemp, rm } from 'node:fs/promises';
import { createServer } from 'node:http';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import puppeteer from 'puppeteer';

const root = fileURLToPath(new URL('../', import.meta.url));
const decks = { vorlage: 'KI-in-TYPO3.pdf', 'tmuc-2026-11-09': 'TMUC-KI-in-TYPO3.pdf' };
const slug = process.argv[2] || 'vorlage';
assert(Object.hasOwn(decks, slug) && process.argv.length <= 3, 'Usage: verify_talk.mjs [vorlage|tmuc-2026-11-09]');
const talk = resolve(root, 'talks', slug);
const freezeParts = ['snapshot', 'snapshot.sha256.json', 'source.sha256.json'];
const frozenParts = await Promise.all(freezeParts.map(async (name) => {
  try { await lstat(resolve(talk, name)); return true; }
  catch (error) { if (error.code === 'ENOENT') return false; throw error; }
}));
const frozen = slug !== 'vorlage' && frozenParts.some(Boolean);
assert(!frozen || frozenParts.every(Boolean), 'Partial event freeze: snapshot and both manifests are required');
const site = resolve(talk, frozen ? 'snapshot' : 'site');
const prefix = `/modularer-ki-stack-page/vortraege/${slug}/`;
const pdfName = decks[slug];
const source = await readFile(resolve(talk, 'source/slides.md'), 'utf8');
const chunks = source.split(/^---\s*$/m);
const slides = [];
for (let i = 1; i + 1 < chunks.length; i += 2) {
  const value = (key) => {
    const raw = chunks[i].match(new RegExp(`^${key}:\\s*(.*)$`, 'm'))?.[1];
    assert(raw !== undefined, `Missing ${key} in slide metadata`);
    try { return JSON.parse(raw); } catch { return raw; }
  };
  slides.push({ title: value('title'), talkPage: value('talkPage'), talkTotal: value('talkTotal'), appendix: value('appendix'), section: value('section'), sectionTitle: value('sectionTitle'), divider: value('sectionDivider'), body: chunks[i + 1], screenshots: [...chunks[i + 1].matchAll(/<NrImage\b[^>]*\bfile="([^"]+)"/g)].map(match => match[1]), jumps: [...chunks[i + 1].matchAll(/<NrJump\b[^>]*:page="(\d+)"/g)].map(match => Number(match[1])), menuTargets: [...chunks[i + 1].matchAll(/<NrJump :page="(\d+)" print-label>/g)].map((match) => Number(match[1])) });
}
const titles = slides.map((slide) => slide.title);
const talkTotal = slides.filter((slide) => !slide.appendix).length;
const dividers = slides.flatMap((slide, i) => slide.divider ? [i + 1] : []);
const sections = JSON.parse(await readFile(resolve(talk, 'source/progress-sections.json'), 'utf8'));
assert.deepEqual(sections.map(section => section.number), [1, 2, 3, 4, 5], 'Only the five main sections get progress segments');
assert.deepEqual(slides.filter(slide => !slide.appendix && slide.section === 0).map(slide => slide.title), ['KI in TYPO3', 'Was euch heute erwartet'], 'Title and agenda form the unnumbered introduction');
assert(slides.slice(0, 2).every(slide => slide.section === 0 && !slide.divider && !slide.appendix), 'The introduction must precede the first section');
assert.deepEqual(dividers, sections.map(section => section.start), 'Every main section starts with exactly one quiet divider');
for (const section of sections) {
  const pages = slides.flatMap((slide, index) => !slide.appendix && slide.section === section.number ? [index + 1] : []);
  assert.deepEqual(pages, Array.from({ length: section.end - section.start + 1 }, (_, index) => section.start + index), `Section ${section.number}: progress range differs from source`);
  assert(pages.length && pages.every(page => slides[page - 1].sectionTitle === section.title), `Section ${section.number}: title differs`);
}
assert(slides.every((slide, index) => index < talkTotal ? !slide.appendix && slide.talkPage === index + 1 : slide.appendix && slide.talkPage === talkTotal), 'Main-slide numbering must stop at the appendix');
for (const slide of slides) for (const target of slide.jumps) assert(target >= 1 && target <= slides.length, `Invalid jump from ${slide.title} to ${target}`);
assert(slides.every((slide) => slide.talkTotal === talkTotal), 'Inconsistent main-slide total');
assert.match(source, /^presenter: false$/m, 'Public presenter mode must remain disabled');
assert(!source.includes('<!--'), 'Public source contains speaker notes');
assert(!source.includes('/typo3/main?redirect='), 'Legacy backend redirects open the dashboard; use verified native module/record paths');
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
// Run in the page after fonts, images and layout have settled. A text-only
// overflow check misses a quiet detail link covering an otherwise valid button.
function inspectControlGeometry() {
  const slide = [...document.querySelectorAll('.slidev-layout')].find(node => node.checkVisibility());
  const content = slide.querySelector('.nr-content');
  const footerTop = slide.querySelector('.nr-footer').getBoundingClientRect().top;
  const visible = node => node.checkVisibility() && [...node.getClientRects()].some(rect => rect.width && rect.height);
  const label = node => `${node.tagName}.${node.className}: ${node.textContent.trim().replace(/\s+/g, ' ').slice(0, 100)}`;
  const overlaps = (a, b) => Math.min(a.right, b.right) - Math.max(a.left, b.left) > 2
    && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 2;
  const details = [...content.querySelectorAll('.nr-detail-links')].filter(visible);
  const contentNodes = [...content.querySelectorAll('h1,h2,p,li,dt,dd,figcaption,blockquote,table,.nr-takeaway,.nr-limit,.nr-code-result,.nr-overview-limit,.nr-project-decision,a[href],button')]
    .filter(node => visible(node) && !node.closest('.nr-detail-links'));
  const detailCollisions = details.flatMap(detail => {
    const rect = detail.getBoundingClientRect();
    return contentNodes.filter(node => overlaps(node.getBoundingClientRect(), rect)).map(label);
  });
  const controls = [...content.querySelectorAll('a[href],button')].filter(visible);
  const blockedControls = controls.flatMap(node => {
    // An inline link can wrap. Test the center of its largest actual line box,
    // not the whitespace between lines in its enclosing bounding rectangle.
    const rect = [...node.getClientRects()].sort((a, b) => b.width * b.height - a.width * a.height)[0];
    const hit = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
    return hit && (hit === node || node.contains(hit)) ? [] : [{ control: label(node), hit: hit ? label(hit) : null }];
  });
  const footerCollisions = controls.filter(node => node.getBoundingClientRect().bottom > footerTop + 2).map(label);
  return { detailCollisions, blockedControls, footerCollisions, controls: controls.length };
}
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
const downloadsDir = await mkdtemp(resolve(tmpdir(), `${slug}-download-`));
let browser;
try {
  // Headless Chrome can report no pointer; this is explicitly the desktop/mouse gate.
  browser = await puppeteer.launch({ executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined, args: ['--no-sandbox', '--disable-dev-shm-usage', '--blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4'] });
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
  let imageChecks = 0;
  async function checkImageViewer(number, imageIndex) {
    const trigger = (await page.evaluateHandle(({title, imageIndex}) => [...document.querySelectorAll('.slidev-layout h1')].find((heading) => heading.textContent === title && heading.checkVisibility()).closest('.slidev-layout').querySelectorAll('button.nr-original')[imageIndex], { title: titles[number - 1], imageIndex })).asElement();
    assert(trigger, `Slide ${number}: screenshot is not an in-page button`);
    const thumbnail = await trigger.evaluate((button) => ({ src: button.querySelector('img').src, alt: button.querySelector('img').alt }));
    const initialUrl = page.url(), initialPages = (await browser.pages()).length;
    const dialog = 'dialog.nr-image-viewer[open]';
    async function opened() {
      await page.waitForSelector(dialog, { visible: true });
      await page.$eval(`${dialog} img`, (image) => image.decode());
      assert.equal(await page.$eval(`${dialog} img`, (image) => image.src), thumbnail.src);
      assert.equal(page.url(), initialUrl, 'Opening screenshot changed the slide');
      assert.equal((await browser.pages()).length, initialPages, 'Screenshot opened another tab');
    }
    async function closed() {
      await page.waitForSelector(dialog, { hidden: true });
      assert.equal(page.url(), initialUrl, 'Closing screenshot changed the slide');
      assert(await trigger.evaluate((button) => document.activeElement === button), 'Screenshot trigger did not regain focus');
    }
    if (imageChecks === 0) {
      const point = await trigger.evaluate((button) => {
        const image = button.querySelector('img'), rect = image.getBoundingClientRect();
        const factor = Math.min(rect.width / image.naturalWidth, rect.height / image.naturalHeight);
        const width = image.naturalWidth * factor, height = image.naturalHeight * factor;
        const position = getComputedStyle(image).objectPosition.split(' ').map(parseFloat);
        return { x: rect.x + (rect.width - width) * position[0] / 100 + width / 2, y: rect.y + (rect.height - height) * position[1] / 100 + height / 2 };
      });
      await page.mouse.move(point.x, point.y);
      await page.waitForFunction(() => [...document.querySelectorAll('.nr-image-lens')].some((lens) => lens.checkVisibility()));
      assert.equal(await page.$eval('.nr-image-lens', (lens) => lens.dataset.lensSource), thumbnail.src, 'Thumbnail lens source differs');
      assert.equal(await page.$eval('.nr-image-lens', (lens) => getComputedStyle(lens).pointerEvents), 'none', 'Lens blocks image clicks');
      await page.waitForFunction(() => ['webgl', 'canvas2d'].includes(document.querySelector('.nr-image-lens')?.dataset.lensRenderer));
      const magnifier = await page.$eval('.nr-image-lens', (lens) => {
        const rect = lens.getBoundingClientRect(), canvas = lens.querySelector('canvas');
        return { width: rect.width, height: rect.height, core: Number(lens.dataset.lensCore), zoom: Number(lens.dataset.lensZoom), renderer: lens.dataset.lensRenderer, pixels: canvas && [canvas.width, canvas.height], radius: getComputedStyle(lens).borderRadius };
      });
      assert(magnifier.width >= 560 && Math.abs(magnifier.width - magnifier.height) < 2, 'Reading lens must be large and square');
      assert(magnifier.width * magnifier.core >= 400 && magnifier.zoom >= 2.5, 'Lens must have a wide, sharp magnified center');
      const minimumPixels = magnifier.renderer === 'webgl' ? magnifier.width : 256;
      assert(magnifier.pixels?.[0] >= minimumPixels && magnifier.pixels[1] >= minimumPixels, 'Lens renderer did not allocate visible pixels');
      assert.notEqual(magnifier.radius, '50%', 'Lens still has circular clipping');
    }
    if (imageChecks === 1) { await trigger.focus(); await page.keyboard.press('Enter'); }
    else await trigger.click();
    await opened();
    if (imageChecks === 1) {
      // Changing modal src reuses its <img>. Do not hover the new thumbnail:
      // a texture cache keyed only by element identity would still paint slide 3.
      await page.hover(`${dialog} img`);
      await page.waitForFunction(() => [...document.querySelectorAll('dialog[open] .nr-image-lens')].some(lens => lens.checkVisibility()));
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      const screenshot = await page.screenshot({ encoding: 'base64' });
      const sourceError = await page.evaluate(async (png) => {
        const shot = new Image(); shot.src = `data:image/png;base64,${png}`; await shot.decode();
        const actualCanvas = document.createElement('canvas'); actualCanvas.width = innerWidth; actualCanvas.height = innerHeight;
        const actualContext = actualCanvas.getContext('2d'); actualContext.drawImage(shot, 0, 0);
        const expectedCanvas = document.createElement('canvas'); expectedCanvas.width = innerWidth; expectedCanvas.height = innerHeight;
        const expectedContext = expectedCanvas.getContext('2d');
        const lens = document.querySelector('dialog[open] .nr-image-lens'), lensRect = lens.getBoundingClientRect();
        const img = document.querySelector('dialog[open] .nr-image-viewer-image img'), rect = img.getBoundingClientRect();
        const zoom = Number(lens.dataset.lensZoom), cx = lensRect.left + lensRect.width / 2, cy = lensRect.top + lensRect.height / 2;
        expectedContext.drawImage(img, cx + (rect.left - cx) * zoom, cy + (rect.top - cy) * zoom, rect.width * zoom, rect.height * zoom);
        const actual = actualContext.getImageData(Math.round(cx - 100), Math.round(cy - 50), 200, 100).data;
        const expected = expectedContext.getImageData(Math.round(cx - 100), Math.round(cy - 50), 200, 100).data;
        let error = 0;
        for (let i = 0; i < actual.length; i++) if (i % 4 !== 3) error += Math.abs(actual[i] - expected[i]);
        return error / (200 * 100 * 3);
      }, screenshot);
      assert(sourceError < 12, `Modal magnifier painted a stale source: mean pixel error ${sourceError}`);
    }
    if (imageChecks === 0) {
      await page.hover(`${dialog} img`);
      await page.waitForFunction(() => [...document.querySelectorAll('dialog[open] .nr-image-lens')].some((lens) => lens.checkVisibility()));
      assert.equal(await page.$eval('dialog[open] .nr-image-lens', (lens) => lens.dataset.lensSource), thumbnail.src, 'Dialog lens source differs');
      for (const key of ['ArrowRight', 'ArrowLeft', 'PageDown', 'PageUp', 'Home', 'End']) await page.keyboard.press(key);
      await page.mouse.move(800, 450); await page.mouse.wheel({ deltaY: 160 });
      assert.equal(page.url(), initialUrl, 'Dialog input navigated the underlying presentation');
      await page.keyboard.press('Tab');
      await page.keyboard.down('Shift'); await page.keyboard.press('Tab'); await page.keyboard.up('Shift');
      assert(await page.$eval(dialog, (element) => element.contains(document.activeElement)), 'Dialog lost keyboard focus');
    }
    if (imageChecks % 3 === 0) await page.keyboard.press('Escape');
    else if (imageChecks % 3 === 1) await page.click(`${dialog} button[aria-label="Bild schließen"]`);
    else await page.mouse.click(2, 2);
    await closed();
    const second = (await trigger.evaluateHandle((button) => (button.closest('figure').querySelector('.nr-action-links button.nr-image-link') || button.closest('.slidev-layout').querySelector('.nr-action-links button.nr-image-link')))).asElement();
    assert(second, 'Screenshot action button missing');
    await second.click(); await opened();
    await page.keyboard.press('Escape'); await page.waitForSelector(dialog, { hidden: true });
    assert(await second.evaluate((button) => document.activeElement === button), 'Image action did not regain focus');
    assert.equal(page.url(), initialUrl);
    if (imageChecks === 0) {
      await trigger.focus(); await page.keyboard.press('Enter'); await opened();
      for (const key of ['ArrowRight', 'ArrowLeft', 'PageDown', 'PageUp', 'Home', 'End']) await page.keyboard.press(key);
      await page.mouse.move(800, 450); await page.mouse.wheel({ deltaY: 600 });
      await page.keyboard.press('Tab');
      await page.keyboard.down('Shift'); await page.keyboard.press('Tab'); await page.keyboard.up('Shift');
      await page.$eval(`${dialog} button[aria-label="Bild schließen"]`, (button) => button.focus());
      await page.keyboard.press('Space'); await closed();
      // The native close event is asynchronous; immediate navigation must still work.
      await page.keyboard.press('ArrowRight');
      await page.waitForFunction((target) => location.hash === `#/${target}`, {}, number + 1);
    }
    localLinks.add(thumbnail.src);
    imageChecks++;
  }
  let mainJumpChecks = 0, controlChecks = 0;
  for (let number = 1; number <= titles.length; number++) {
    await show(number);
    const result = await page.evaluate((title) => {
      const heading = [...document.querySelectorAll('.slidev-layout h1')].find((node) => node.textContent === title && node.checkVisibility());
      const slide = heading.closest('.slidev-layout'), box = slide.getBoundingClientRect();
      const footer = slide.querySelector('.nr-footer'), footerTop = footer.getBoundingClientRect().top;
      const overflow = [...slide.querySelectorAll('h1,h2,p,li,figcaption,blockquote,table,.nr-columns section,.nr-question-grid section,.nr-config-chain section,.nr-context-flow section,.nr-data-gate section,.nr-editor-demos figure,.nr-subtitle,.nr-author,.nr-topics,.nr-stack section,.nr-flow-note,.nr-takeaway,.nr-controls,.nr-section-number,.nr-content .nr-jump')].filter((node) => {
        if (!node.checkVisibility() || !node.getClientRects().length) return false;
        const rect = node.getBoundingClientRect();
        const connector = node.matches('.nr-flow>li,.nr-stack-connected>section');
        return rect.left < box.left - 2 || rect.right > box.right + 2 || rect.bottom > footerTop + 2
          || (!connector && (node.scrollHeight > node.clientHeight + 4 || node.scrollWidth > node.clientWidth + 4));
      }).map((node) => node.className || node.tagName);
      const progress = footer.querySelector('[role="progressbar"]');
      return { overflow, divider: slide.classList.contains('nr-section-divider'), content: slide.querySelector('.nr-content').innerText.replace(/\s+/g, ' ').trim(), dividerExtras: slide.querySelectorAll('.nr-content img,.nr-content ul,.nr-content ol,.nr-content button,.nr-content a,.nr-content .nr-controls').length, broken: [...slide.querySelectorAll('img')].filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src), footer: footer.innerText, max: progress.getAttribute('aria-valuemax'), progressText: progress.getAttribute('aria-valuetext'), sectionText: footer.querySelector('.nr-section-progress').textContent, segmentLabels: [...footer.querySelectorAll('.nr-progress-label')].map(node => node.textContent), current: [...footer.querySelectorAll('.is-current .nr-progress-label')].map(node => node.textContent), fills: [...footer.querySelectorAll('.nr-progress-fill')].map(node => node.style.width), links: [...slide.querySelectorAll('a[href]')].map((link) => link.href) };
    }, titles[number - 1]);
    assert.deepEqual(result.overflow, [], `Slide ${number}: overflow`);
    assert.deepEqual(result.broken, [], `Slide ${number}: images`);
    const controls = await page.evaluate(inspectControlGeometry);
    assert.deepEqual(controls.detailCollisions, [], `Slide ${number}: content or action overlaps the detail navigation`);
    assert.deepEqual(controls.blockedControls, [], `Slide ${number}: a control is covered at its click target`);
    assert.deepEqual(controls.footerCollisions, [], `Slide ${number}: a control overlaps the footer`);
    controlChecks += controls.controls;
    const metadata = slides[number - 1];
    assert.equal(result.max, String(talkTotal));
    assert(result.footer.includes(metadata.appendix ? 'Anhang · nicht mitgezählt' : `Folie ${metadata.talkPage}/${talkTotal}`), `Slide ${number}: footer`);
    assert.deepEqual(result.segmentLabels, sections.map(section => `${section.number} ${section.label}`), `Slide ${number}: visible section labels`);
    if (metadata.appendix) {
      assert.deepEqual(result.current, [], `Slide ${number}: appendix must not mark an active section`);
      assert(result.fills.every(fill => fill === '100%'), `Slide ${number}: completed presentation`);
    } else if (metadata.section === 0) {
      assert.deepEqual(result.current, [], `Slide ${number}: introduction must not activate section 1`);
      assert(result.fills.every(fill => fill === '0%'), `Slide ${number}: no main section has started`);
      assert.equal(result.sectionText, 'Auftakt');
      assert(result.progressText.startsWith('Auftakt.'), `Slide ${number}: accessible intro label`);
    } else {
      const section = sections.find(section => section.number === metadata.section);
      assert.deepEqual(result.current, [`${section.number} ${section.label}`], `Slide ${number}: active section`);
    }
    assert.equal(result.divider, metadata.divider, `Slide ${number}: divider class`);
    if (metadata.divider) {
      assert.equal(result.content, `${String(metadata.section).padStart(2, '0')} ${metadata.title}`, `Slide ${number}: quiet divider content`);
      assert.equal(result.dividerExtras, 0, `Slide ${number}: distracting divider controls`);
    }
    for (const href of result.links) {
      assert(!href.includes('/typo3/main?redirect='), `Slide ${number}: legacy backend redirect opens the dashboard`);
      const link = new URL(href);
      assert(['https:', 'http:'].includes(link.protocol), `Unexpected link ${href}`);
      if (link.origin === origin && !link.hash) localLinks.add(href);
    }
    for (let imageIndex = 0; imageIndex < metadata.screenshots.length; imageIndex++) {
      if (imageIndex) await show(number);
      await checkImageViewer(number, imageIndex);
    }
    // Main slides link into the reserve. Verify the rendered target and that
    // keyboard navigation still works after a mouse or keyboard jump.
    if (!metadata.appendix) for (const [index, target] of metadata.jumps.entries()) {
      await show(number);
      const button = (await page.evaluateHandle(({ title, index }) => {
        const heading = [...document.querySelectorAll('.slidev-layout h1')].find(node => node.textContent === title && node.checkVisibility());
        return heading.closest('.slidev-layout').querySelectorAll('button.nr-jump')[index];
      }, { title: metadata.title, index })).asElement();
      assert(button, `Slide ${number}: missing jump button ${index}`);
      if (mainJumpChecks === 0) { await button.focus(); await page.keyboard.press('Enter'); }
      else await button.click();
      await page.waitForFunction(({ target, title }) => location.hash === `#/${target}` && [...document.querySelectorAll('.slidev-layout h1')].some(node => node.textContent === title && node.checkVisibility()), {}, { target, title: titles[target - 1] });
      if (target < slides.length) {
        await page.keyboard.press('ArrowRight');
        await page.waitForFunction(target => location.hash === `#/${target}`, {}, target + 1);
      }
      mainJumpChecks++;
    }
  }
  assert.equal(imageChecks, slides.reduce((total, slide) => total + slide.screenshots.length, 0), 'Not every screenshot was checked');
  // Reach the proof through its actual main-slide control. A direct page.goto
  // would not notice an appendix link intercepting clicks on this button.
  const proofOwners = slides.flatMap((slide, index) => !slide.appendix && slide.body.includes('href="pruefbeispiel/index.html"') ? [index + 1] : []);
  assert.equal(proofOwners.length, 1, 'The proof example needs one main-slide return target');
  const proofPage = proofOwners[0];
  await show(proofPage);
  const proofButton = (await page.evaluateHandle(() => [...document.querySelectorAll('.slidev-layout a[href]')].find(link => link.checkVisibility() && new URL(link.href).pathname.endsWith('/pruefbeispiel/index.html')))).asElement();
  assert(proofButton, 'The proof example needs a visible slide control');
  const proofUrl = url + 'pruefbeispiel/index.html';
  const proofTarget = browser.waitForTarget(target => target.type() === 'page' && target.url() === proofUrl);
  await proofButton.click();
  const proofView = await (await proofTarget).page();
  assert(proofView && proofView !== page, 'The schema button did not open its example in a separate tab');
  await proofView.waitForFunction(() => document.readyState === 'complete');
  assert.equal(proofView.url(), proofUrl, 'The schema button opened the wrong target');
  assert.equal(page.url(), `${url}#/${proofPage}`, 'Opening the proof changed the underlying slide');
  // The proof page displays a recorded PHP run, including the accepted false claim.
  const proof = JSON.parse(await readFile(resolve(site, 'pruefbeispiel/quality-proof.json'), 'utf8'));
  for (const example of proof.cases) {
    await proofView.click(`button[data-case="${example.id}"]`);
    assert.equal(await proofView.$eval('#input-json', (node) => node.textContent), JSON.stringify(example.input, null, 2));
    assert.equal(await proofView.$eval('#boolean', (node) => node.textContent), String(example.actualValid));
  }
  localLinks.add(url + 'pruefbeispiel/quality-proof.zip');
  localLinks.add(url + 'pruefbeispiel/quality-proof.json');
  await proofView.click('a.back');
  // A committed URL precedes Slidev mounting after this full-page navigation.
  // Verify the returned slide before issuing the next hash navigation.
  await proofView.waitForFunction(({ number, title }) => location.hash === `#/${number}`
    && [...document.querySelectorAll('.slidev-layout h1')].some((node) => node.textContent === title && node.checkVisibility()), {}, { number: proofPage, title: titles[proofPage - 1] });
  await proofView.close();
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
  console.log(`Talk ${slug} verified${frozen ? ' from frozen snapshot' : ''}: ${titles.length} slides, ${talkTotal}-slide progress, unnumbered intro, ${dividers.length} quiet dividers, appendix, local images/fonts, ${controlChecks} unobstructed controls, ${mainJumpChecks} main jumps, ${menuTargets.length} reserve jumps, ${imageChecks} in-page image viewers, schema-button navigation and ${localLinks.size} local links/downloads`);
} finally {
  await browser?.close(); await new Promise((done) => server.close(done));
  await rm(downloadsDir, { recursive: true, force: true });
}
