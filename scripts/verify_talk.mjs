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
  slides.push({ title: value('title'), talkPage: value('talkPage'), talkTotal: value('talkTotal'), appendix: value('appendix'), section: value('section'), sectionTitle: value('sectionTitle'), divider: value('sectionDivider'), body: chunks[i + 1], screenshots: [...chunks[i + 1].matchAll(/<NrImage\b[^>]*\bfile="([^"]+)"/g)].map(match => match[1]), jumps: [...chunks[i + 1].matchAll(/<NrJump\b[^>]*:page="(\d+)"/g)].map(match => Number(match[1])), backTargets: [...chunks[i + 1].matchAll(/<NrJump\b(?=[^>]*\bback\b)[^>]*:page="(\d+)"/g)].map(match => Number(match[1])), menuTargets: [...chunks[i + 1].matchAll(/<NrJump :page="(\d+)" print-label>/g)].map((match) => Number(match[1])) });
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
assert(!/Bild vergrößern/.test(source), 'Duplicate image-opening links must be removed; the screenshot itself opens the viewer');
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
    // The thumbnail is the only image-opening control. Verify both keyboard
    // activation keys on every image, with Escape restoring that same trigger.
    if (imageChecks === 1) { await trigger.click(); await opened(); await page.keyboard.press('Escape'); await closed(); }
    for (const key of ['Enter', 'Space']) {
      await trigger.focus(); await page.keyboard.press(key); await opened();
      await page.keyboard.press('Escape'); await closed();
    }
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
  let mainJumpChecks = 0, controlChecks = 0, normalActionStyle;
  const destinationKinds = new Map();
  const mixedActionPage = slides.findIndex(slide => slide.appendix === 'technical' && slide.body.includes('href="pruefbeispiel/index.html"')) + 1;
  assert(mixedActionPage > 0, 'Need a representative slide with local, external and internal destinations');
  for (let number = 1; number <= titles.length; number++) {
    await show(number);
    await page.mouse.move(1590, 5);
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
      const destinationLinks = [...slide.querySelectorAll('.nr-content a.nr-link')].filter(node => node.checkVisibility()).map(node => ({ href: node.href, kind: node.querySelector('.nr-link-kind')?.textContent.trim(), label: node.querySelector('.nr-link-label')?.textContent.trim(), target: node.target, rel: node.rel, marker: node.querySelector('.nr-link-external')?.textContent.trim(), markerHidden: node.querySelector('.nr-link-external')?.getAttribute('aria-hidden'), note: node.querySelector('.nr-link-note')?.textContent.trim() }));
      const internalLinks = [...slide.querySelectorAll('.nr-content a.nr-jump:not(.nr-link):not(.nr-jump-quiet)')].filter(node => node.checkVisibility()).map(node => ({ href: node.getAttribute('href'), target: node.target, kind: node.querySelector('.nr-link-kind')?.textContent.trim(), marker: node.querySelector('.nr-jump-arrow')?.textContent.trim() }));
      const styleKeys = ['fontFamily', 'fontSize', 'lineHeight', 'fontWeight', 'color', 'backgroundColor', 'borderTopWidth', 'borderTopStyle', 'borderTopColor', 'borderRadius', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'textDecorationLine'];
      const normalActions = [...slide.querySelectorAll('.nr-action-links a.nr-link,.nr-jump-links a.nr-jump')].filter(node => node.checkVisibility()).map(node => ({ href: node.getAttribute('href'), kind: node.querySelector('.nr-link-kind')?.textContent.trim(), style: Object.fromEntries(styleKeys.map(key => [key, getComputedStyle(node)[key]])) }));
      const progress = footer.querySelector('.nr-progress');
      return { overflow, destinationLinks, internalLinks, normalActions, duplicateImageActions: slide.querySelectorAll('.nr-action-links .nr-image-link').length, divider: slide.classList.contains('nr-section-divider'), content: slide.querySelector('.nr-content').innerText.replace(/\s+/g, ' ').trim(), dividerExtras: slide.querySelectorAll('.nr-content img,.nr-content ul,.nr-content ol,.nr-content button,.nr-content a,.nr-content .nr-controls').length, broken: [...slide.querySelectorAll('img')].filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src), footer: footer.innerText, max: progress.dataset.talkTotal, progressRole: progress.getAttribute('role'), progressControls: footer.querySelectorAll('button.nr-progress-control').length, cursorCount: footer.querySelectorAll('.nr-progress-cursor').length, progressText: progress.getAttribute('aria-label'), sectionText: footer.querySelector('.nr-section-progress')?.textContent || '', segmentLabels: [...footer.querySelectorAll('.nr-progress-label')].map(node => node.textContent), current: [...footer.querySelectorAll('.is-current .nr-progress-label')].map(node => node.textContent), fills: [...footer.querySelectorAll('.nr-progress-fill')].map(node => node.style.width), links: [...slide.querySelectorAll('a[href]')].map((link) => link.href) };
    }, titles[number - 1]);
    assert.deepEqual(result.overflow, [], `Slide ${number}: overflow`);
    assert.deepEqual(result.broken, [], `Slide ${number}: images`);
    assert.equal(result.duplicateImageActions, 0, 'Image viewer must be opened through its thumbnail, without duplicate action links');
    for (const link of result.destinationLinks) {
      assert(link.kind && link.label, `Slide ${number}: destination type or independent link label missing`);
      assert.equal(link.target, '_blank');
      assert(link.rel.split(/\s+/).includes('noopener'));
      assert.equal(link.marker, '↗');
      assert.equal(link.markerHidden, 'true');
      assert(link.note.includes('öffnet in einem neuen Tab'), 'External navigation needs an accessible new-tab indication');
      destinationKinds.set(link.href, link.kind);
    }
    for (const link of result.internalLinks) {
      assert.match(link.href, /^#\/\d+$/, 'Internal link must expose its slide target');
      assert.equal(link.target, '', 'Internal slide navigation must stay in the same tab');
      assert.equal(link.kind, 'Folie');
      assert.equal(link.marker, '→');
    }
    for (const action of result.normalActions) {
      normalActionStyle ??= action.style;
      assert.deepEqual(action.style, normalActionStyle, `Slide ${number}: ordinary actions have inconsistent visual priority`);
      assert.equal(action.style.fontSize, '18px');
      assert.equal(action.style.lineHeight, '22px');
      assert.equal(action.style.fontWeight, '600');
      assert.equal(action.style.backgroundColor, 'rgb(255, 255, 255)', 'An arbitrary first action still has a filled background');
      assert.equal(action.style.borderTopWidth, '1px');
      assert.equal(action.style.borderTopStyle, 'solid');
      assert.equal(action.style.borderRadius, '6px');
      assert.equal(action.style.textDecorationLine, 'none');
    }
    if (number === mixedActionPage) {
      assert(result.normalActions.length >= 4, 'Representative appendix slide lost one of its action types');
      for (const kind of ['Beispiel', 'GitHub', 'Folie']) assert(result.normalActions.some(action => action.kind === kind), `Representative appendix slide needs ${kind} navigation`);
    }

    const controls = await page.evaluate(inspectControlGeometry);
    assert.deepEqual(controls.detailCollisions, [], `Slide ${number}: content or action overlaps the detail navigation`);
    assert.deepEqual(controls.blockedControls, [], `Slide ${number}: a control is covered at its click target`);
    assert.deepEqual(controls.footerCollisions, [], `Slide ${number}: a control overlaps the footer`);
    controlChecks += controls.controls;
    const metadata = slides[number - 1];
    assert.equal(result.max, String(talkTotal));
    assert.equal(result.progressRole, 'group', 'Interactive sections need group semantics');
    assert.equal(result.progressControls, sections.length, 'Every main section needs one navigation control');
    assert.equal(result.cursorCount, result.current.length, 'Only the active section may display a position marker');
    assert(result.cursorCount <= 1, 'The presentation has more than one active position marker');
    assert(metadata.appendix ? /Reserve für Rückfragen|Links & Quellen/.test(result.footer) : result.footer.includes(`Folie ${metadata.talkPage}/${talkTotal}`), `Slide ${number}: footer`);
    assert.deepEqual(result.segmentLabels, sections.map(section => `${section.number} ${section.label}`), `Slide ${number}: visible section labels`);
    if (metadata.appendix) {
      assert(result.current.length <= 1, `Slide ${number}: appendix invented multiple active sections`);
      assert(result.fills.every(fill => parseFloat(fill) >= 0 && parseFloat(fill) <= 100), `Slide ${number}: invalid remembered progress`);
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
        return heading.closest('.slidev-layout').querySelectorAll('a.nr-jump,button.nr-jump')[index];
      }, { title: metadata.title, index })).asElement();
      assert(button, `Slide ${number}: missing jump control ${index}`);
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
  // Representative destinations form a small product contract; this does not
  // duplicate NrLink's classification algorithm or depend on its label wording.
  for (const [href, kind] of [
    ['https://typo3-demo.netresearch.de/extensions/ai-search', 'Demo'],
    ['https://github.com/netresearch/t3x-nr-llm', 'GitHub'],
    ['https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture', 'Doku'],
    ['https://symfony.com/doc/current/ai/components/platform.html', 'Doku'],
    ['https://docs.typo3.org/p/nitsan/ns-t3af/main/en-us/Index.html', 'Doku'],
    [url + 'pruefbeispiel/index.html', 'Beispiel'],
    ['https://www.netresearch.de/blog/ki-kennzeichnung-auf-websites-was-jetzt-wirklich-gekennzeichnet-werden-muss/', 'Artikel'],
    ['https://netresearch.github.io/modularer-ki-stack-page/', 'Projekt'],
    ['https://www.louis.info/leistungen/technologien/typo3-extensions/', 'Web'],
  ]) assert.equal(destinationKinds.get(href), kind, `Wrong destination label for ${href}`);
  assert([...destinationKinds].some(([href, kind]) => /^https:\/\/netresearch\.github\.io\/modularer-ki-stack-page\/vortraege\/(?:vorlage|tmuc-2026-11-09)\/$/.test(href) && kind === 'Vortrag'), 'A presentation link must be labeled as Vortrag');

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
    await page.evaluate((index) => [...document.querySelectorAll('.nr-reserve-menu a.nr-jump,.nr-reserve-menu button.nr-jump')].filter((button) => button.checkVisibility())[index].click(), index);
    await page.waitForFunction((number) => location.hash === `#/${number}`, {}, number);
    await page.waitForFunction((title) => [...document.querySelectorAll('.slidev-layout h1')].some((node) => node.textContent === title && node.checkVisibility()), {}, titles[number - 1]);
    await page.evaluate((target) => [...document.querySelectorAll('a.nr-jump,button.nr-jump')].find((control) => control.checkVisibility() && control.getAttribute('href') === `#/${target}`).click(), indexPage);
    await page.waitForFunction((number) => location.hash === `#/${number}`, {}, indexPage);
    await page.waitForFunction(() => [...document.querySelectorAll('.nr-reserve-menu a.nr-jump,.nr-reserve-menu button.nr-jump')].some((button) => button.checkVisibility()));
  }
  // Test the actual navigation controls with fresh sessions so prior verifier
  // navigation cannot manufacture a contextual return for a direct hash URL.
  async function waitForPage(number) {
    await page.waitForFunction(({ number, title }) => location.hash === `#/${number}` && [...document.querySelectorAll('.slidev-layout h1')].some(node => node.checkVisibility() && node.textContent === title), {}, { number, title: titles[number - 1] });
    await page.evaluate(() => new Promise(done => requestAnimationFrame(() => requestAnimationFrame(done))));
  }
  async function fresh(number) {
    await page.goto('about:blank');
    await show(number);
  }
  async function jump(from, target, keyboard = false) {
    const index = slides[from - 1].jumps.indexOf(target);
    assert(index >= 0, `No declared jump ${from} → ${target}`);
    const control = (await page.evaluateHandle(index => [...document.querySelectorAll('.slidev-layout')].find(node => node.checkVisibility()).querySelectorAll('a.nr-jump,button.nr-jump')[index], index)).asElement();
    assert(control, `No rendered jump ${from} → ${target}`);
    assert.equal(await control.evaluate(node => node.getAttribute('href')), `#/${target}`, 'Internal navigation needs a genuine, copyable anchor');
    if (keyboard) { await control.focus(); await page.keyboard.press('Enter'); }
    else await control.click();
    await waitForPage(target);
  }
  async function returnTarget(expected) {
    const state = await page.evaluate(() => {
      const slide = [...document.querySelectorAll('.slidev-layout')].find(node => node.checkVisibility());
      const link = slide.querySelector('.nr-footer .nr-return-link');
      if (!link?.checkVisibility()) return null;
      const rect = link.getBoundingClientRect(), footerRect = link.closest('.nr-footer').getBoundingClientRect();
      const hit = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
      const overlaps = (a, b) => Math.min(a.right, b.right) - Math.max(a.left, b.left) > 2 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 2;
      const collisions = [], walker = document.createTreeWalker(link.closest('.nr-footer'), NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        if (!walker.currentNode.textContent.trim() || link.contains(walker.currentNode) || walker.currentNode.parentElement.closest('.nr-progress-sr-only')) continue;
        const range = document.createRange(); range.selectNodeContents(walker.currentNode);
        if ([...range.getClientRects()].some(box => overlaps(rect, box))) collisions.push(walker.currentNode.textContent.trim());
      }
      return { href: link.getAttribute('href'), text: link.textContent.trim(), clickable: hit === link || link.contains(hit), collisions, insideFooter: rect.left >= footerRect.left - 2 && rect.right <= footerRect.right + 2 && rect.top >= footerRect.top - 2 && rect.bottom <= footerRect.bottom + 2 };
    });
    if (expected === null) assert.equal(state, null, 'Return link invented an origin or bounced back to the detail');
    else {
      assert(state, `Missing contextual return to ${expected}`);
      assert.equal(state.href, `#/${expected}`);
      assert(state.text.includes(`Folie ${expected}`), 'Return control must name its destination');
      assert(state.clickable && state.insideFooter, 'Return control is covered or clipped');
      assert.deepEqual(state.collisions, [], 'Return control overlaps footer text');
    }
  }
  async function returnTo(target, keyboard = false) {
    await returnTarget(target);
    const link = (await page.evaluateHandle(() => [...document.querySelectorAll('.nr-footer .nr-return-link')].find(node => node.checkVisibility()))).asElement();
    if (keyboard) { await link.focus(); await page.keyboard.press('Enter'); }
    else await link.click();
    await waitForPage(target);
  }
  const agendaPage = pageOf('Was euch heute erwartet');
  assert.deepEqual(slides[agendaPage - 1].jumps, sections.map(section => section.start), 'Every agenda topic must link to its section divider');
  for (const [index, section] of sections.entries()) {
    await fresh(agendaPage);
    await returnTarget(null);
    const link = (await page.evaluateHandle(target => [...document.querySelectorAll('.slidev-layout a.nr-jump-quiet')].find(node => node.checkVisibility() && node.getAttribute('href') === `#/${target}`), section.start)).asElement();
    assert(link, `Agenda section ${section.number} is not a quiet anchor`);
    async function quietAppearance() {
      const style = await link.evaluate(node => {
        const own = getComputedStyle(node), parent = getComputedStyle(node.parentElement);
        return { color: own.color, inheritedColor: parent.color, fontSize: own.fontSize, inheritedFontSize: parent.fontSize, textDecoration: own.textDecorationLine, background: own.backgroundColor, borderWidths: ['Top', 'Right', 'Bottom', 'Left'].map(side => own[`border${side}Width`]), marker: getComputedStyle(node, 'after').content, visibleMarkers: [...node.querySelectorAll('[aria-hidden="true"]')].filter(child => child.checkVisibility()).map(child => child.textContent.trim()) };
      });
      assert.equal(style.color, style.inheritedColor, 'Agenda links changed the text color');
      assert.equal(style.fontSize, style.inheritedFontSize, 'Agenda links changed the text size');
      assert.equal(style.textDecoration, 'none', 'Agenda link has a visible underline');
      assert.equal(style.background, 'rgba(0, 0, 0, 0)', 'Agenda link has button styling');
      assert(style.borderWidths.every(width => parseFloat(width) === 0), 'Agenda link has a visible border');
      assert(['none', 'normal', '""'].includes(style.marker), 'Agenda link has a decorative link marker');
      assert.deepEqual(style.visibleMarkers, [], 'Agenda link gained a visible navigation marker');
    }
    await page.mouse.move(1590, 5); await quietAppearance();
    await link.hover(); await quietAppearance();
    await link.focus(); await page.keyboard.press('Tab');
    await page.keyboard.down('Shift'); await page.keyboard.press('Tab'); await page.keyboard.up('Shift');
    assert(await link.evaluate(node => document.activeElement === node && node.matches(':focus-visible') && getComputedStyle(node).outlineStyle !== 'none' && parseFloat(getComputedStyle(node).outlineWidth) > 0), 'Agenda link lacks visible keyboard focus');
    await jump(agendaPage, section.start, index % 2 === 1);
    await returnTo(agendaPage, index % 2 === 0);
    await returnTarget(null);
  }

  // Agenda → section, then linear navigation → detail is a real nested route.
  // Both return levels and the browser's own Back/Forward must preserve origins.
  const nestedOrigin = slides.findIndex((slide, index) => !slide.appendix && slide.section > 0 && sections.find(section => section.number === slide.section).start < index + 1 && slide.jumps.some(target => target > talkTotal)) + 1;
  assert(nestedOrigin > 0, 'Need a main-slide detail link after a section divider');
  const nestedSection = sections.find(section => section.number === slides[nestedOrigin - 1].section);
  const nestedDetail = slides[nestedOrigin - 1].jumps.find(target => target > talkTotal);
  await fresh(agendaPage);
  await jump(agendaPage, nestedSection.start);
  for (let number = nestedSection.start; number < nestedOrigin; number++) { await page.keyboard.press('ArrowRight'); await waitForPage(number + 1); }
  await returnTarget(agendaPage);
  await jump(nestedOrigin, nestedDetail, true);
  await returnTarget(nestedOrigin);
  await page.goBack(); await waitForPage(nestedOrigin); await returnTarget(agendaPage);
  await page.goForward(); await waitForPage(nestedDetail); await returnTarget(nestedOrigin);
  await returnTo(nestedOrigin, true); await returnTarget(agendaPage);
  await returnTo(agendaPage); await returnTarget(null);
  await page.goBack(); await waitForPage(nestedOrigin); await returnTarget(agendaPage);
  await page.goForward(); await waitForPage(agendaPage); await returnTarget(null);
  await page.keyboard.press('ArrowRight'); await waitForPage(agendaPage + 1); await returnTarget(null);
  await fresh(nestedDetail); await returnTarget(null);
  // An explicit authored return must consume the excursion, not create its
  // reverse and invite an endless detail/main/detail ping-pong.
  const authoredBackPair = slides.flatMap((slide, index) => slide.appendix ? [] : slide.jumps.filter(target => slides[target - 1].backTargets.includes(index + 1)).map(target => [index + 1, target]))[0];
  assert(authoredBackPair, 'Need an authored main/detail return path');
  const [authoredOrigin, authoredDetail] = authoredBackPair;
  await fresh(authoredOrigin); await jump(authoredOrigin, authoredDetail);
  await jump(authoredDetail, authoredOrigin); await returnTarget(null);
  await page.keyboard.press('ArrowRight'); await waitForPage(authoredOrigin + 1); await returnTarget(null);
  const explicitExitRoute = slides.flatMap((slide, index) => slide.appendix ? [] : slide.jumps.filter(target => slides[target - 1].appendix).flatMap(detail => slides[detail - 1].backTargets.filter(exit => exit !== index + 1).map(exit => [index + 1, detail, exit])))[0];
  assert(explicitExitRoute, 'Need an explicit appendix exit to another target');
  const [exitOrigin, exitDetail, explicitExit] = explicitExitRoute;
  await fresh(exitOrigin); await jump(exitOrigin, exitDetail);
  await jump(exitDetail, explicitExit); await returnTarget(null);
  async function progressSnapshot() {
    return page.evaluate(() => {
      const slide = [...document.querySelectorAll('.slidev-layout')].find(node => node.checkVisibility());
      return [...slide.querySelectorAll('.nr-progress-segment')].map(segment => ({ section: Number(segment.dataset.section), lastPage: Number(segment.dataset.lastPage) || null, fill: parseFloat(segment.querySelector('.nr-progress-fill').style.width), current: segment.classList.contains('is-current'), cursor: Boolean(segment.querySelector('.nr-progress-cursor')), cursorPosition: segment.querySelector('.nr-progress-cursor') ? parseFloat(segment.querySelector('.nr-progress-cursor').style.left) : null }));
    });
  }
  async function progressControl(section) {
    const control = (await page.evaluateHandle(number => [...document.querySelectorAll(`button.nr-progress-control[data-section="${number}"]`)].find(node => node.checkVisibility()), section.number)).asElement();
    assert(control, `Missing progress control ${section.number}`);
    assert(await control.evaluate(node => !node.disabled && !node.closest('[aria-hidden="true"]')), 'Progress control is unavailable to keyboard or assistive technology');
    return control;
  }
  async function controlPreviewIs(control, target) {
    await page.waitForFunction(({ section, target }) => [...document.querySelectorAll(`.nr-progress-control[data-section="${section}"]`)].some(node => node.checkVisibility() && Number(node.dataset.previewPage) === target), {}, { section: await control.evaluate(node => node.dataset.section), target });
    assert((await control.evaluate(node => node.getAttribute('aria-label'))).includes(`Folie ${target}: ${titles[target - 1]}`), 'Announced and selected progress targets differ');
  }
  async function previewIs(control, target) {
    await controlPreviewIs(control, target);
    const tooltip = await page.$eval('.nr-progress-tooltip', node => ({ text: node.textContent.trim(), visible: node.checkVisibility(), pointerEvents: getComputedStyle(node).pointerEvents }));
    assert(tooltip.visible, 'Progress target tooltip is hidden');
    assert.equal(tooltip.text, `Folie ${target}: ${titles[target - 1]}`, 'Progress tooltip must identify the exact slide');
    assert.equal(tooltip.pointerEvents, 'none', 'Progress preview blocks its target');
  }
  async function pointAtProgress(section, target, click = false) {
    const control = await progressControl(section);
    const point = await control.evaluate((node, { start, length, target }) => {
      const rect = node.getBoundingClientRect();
      return { x: rect.left + (target - start + .5) / length * rect.width, y: rect.top + rect.height / 2 };
    }, { start: section.start, length: section.end - section.start + 1, target });
    const beforeUrl = page.url(), before = await progressSnapshot();
    await page.mouse.move(point.x, point.y);
    await previewIs(control, target);
    assert.equal(page.url(), beforeUrl, 'Hovering the progress bar navigated');
    assert.deepEqual(await progressSnapshot(), before, 'Hovering changed remembered progress');
    assert(await control.evaluate((node, point) => document.elementFromPoint(point.x, point.y) === node, point), 'Progress control is covered');
    if (click) { await page.mouse.click(point.x, point.y); await waitForPage(target); }
  }
  await fresh(agendaPage);
  const remembered = new Map();
  for (const section of sections) {
    const target = section.start + Math.floor((section.end - section.start) / 2);
    // Check both boundaries as well as a real interior target; hover never
    // completes or visits a section on the audience's behalf.
    await pointAtProgress(section, section.start);
    await pointAtProgress(section, section.end);
    await pointAtProgress(section, target, true);
    remembered.set(section.number, target);
    const snapshot = await progressSnapshot();
    for (const state of snapshot) {
      const own = sections.find(item => item.number === state.section), saved = remembered.get(state.section) || null;
      assert.equal(state.lastPage, saved, `Section ${state.section}: last position was overwritten by another section`);
      assert.equal(state.cursor, state.section === section.number, 'Remembered sections must not display additional active markers');
      if (state.cursor) assert(Math.abs(state.cursorPosition - state.fill) < .001, 'Active marker differs from the latest main position');
      assert.equal(state.current, state.section === section.number, 'Exactly the latest main section remains active');
      const expectedFill = saved ? (saved - own.start + 1) / (own.end - own.start + 1) * 100 : 0;
      assert(Math.abs(state.fill - expectedFill) < .001, `Section ${state.section}: displayed position differs from its visit`);
    }
  }
  // Preserve every section's position and the active marker during an appendix
  // excursion, including linear movement within the appendix and its return.
  await pointAtProgress(nestedSection, nestedOrigin, true);
  const frozenProgress = await progressSnapshot();
  await jump(nestedOrigin, nestedDetail);
  assert.deepEqual(await progressSnapshot(), frozenProgress, 'Entering the appendix rewrote progress');
  const adjacentDetail = nestedDetail < titles.length ? nestedDetail + 1 : nestedDetail - 1;
  await page.keyboard.press(nestedDetail < titles.length ? 'ArrowRight' : 'ArrowLeft'); await waitForPage(adjacentDetail);
  assert.deepEqual(await progressSnapshot(), frozenProgress, 'Moving in the appendix changed the main-talk position');
  await returnTo(nestedOrigin);
  assert.deepEqual(await progressSnapshot(), frozenProgress, 'Returning from the appendix changed another section');
  await fresh(nestedDetail);
  assert((await progressSnapshot()).every(state => state.lastPage === null && state.fill === 0 && !state.current && !state.cursor), 'A direct appendix link must not invent a completed presentation');

  // Reproduce the audience's actual path: advance through several sections,
  // backtrack into the introduction, then enter the talk again. Remembered
  // fills survive; the single active marker disappears on title and agenda.
  async function activePositionIs(number) {
    const snapshot = await progressSnapshot(), section = slides[number - 1].section;
    const active = section > 0 ? [section] : [];
    assert.deepEqual(snapshot.filter(state => state.current).map(state => state.section), active, `Slide ${number}: active section survived the return to the introduction`);
    assert.deepEqual(snapshot.filter(state => state.cursor).map(state => state.section), active, `Slide ${number}: stale or duplicate position markers`);
    for (const state of snapshot.filter(state => state.cursor)) assert(Math.abs(state.cursorPosition - state.fill) < .001, 'Marker is not at the latest main position');
    return snapshot;
  }
  await fresh(agendaPage);
  const turnaroundPage = Math.min(sections[2].start + 1, sections[2].end);
  for (let number = agendaPage + 1; number <= turnaroundPage; number++) {
    await page.keyboard.press('ArrowRight'); await waitForPage(number);
    await activePositionIs(number);
  }
  for (let number = turnaroundPage - 1; number >= agendaPage; number--) {
    await page.keyboard.press('ArrowLeft'); await waitForPage(number);
    await activePositionIs(number);
  }
  const introProgress = await progressSnapshot();
  assert(introProgress.filter(state => state.lastPage !== null && state.fill > 0).length >= 3, 'Returning to the introduction erased remembered section positions');
  for (let number = agendaPage - 1; number >= 1; number--) {
    await page.keyboard.press('ArrowLeft'); await waitForPage(number);
    await activePositionIs(number);
    assert.deepEqual(await progressSnapshot(), introProgress, 'Title navigation changed remembered progress');
  }
  for (let number = 2; number <= agendaPage; number++) {
    await page.keyboard.press('ArrowRight'); await waitForPage(number);
    await activePositionIs(number);
    assert.deepEqual(await progressSnapshot(), introProgress, 'Agenda navigation changed remembered progress');
  }
  await page.keyboard.press('ArrowRight'); await waitForPage(agendaPage + 1);
  const resumedProgress = await activePositionIs(agendaPage + 1);
  const rememberedPositions = snapshot => snapshot.map(({ section, lastPage, fill }) => ({ section, lastPage, fill }));
  assert.deepEqual(rememberedPositions(resumedProgress), rememberedPositions(introProgress), 'Re-entering the talk overwrote other sections');

  await fresh(agendaPage);
  const keyboardSection = sections[0];
  let progressButton = await progressControl(keyboardSection);
  await page.mouse.move(1590, 5); await progressButton.focus();
  const keyboardOrigin = page.url(), keyboardProgress = await progressSnapshot();
  for (const [key, target] of [['End', keyboardSection.end], ['Home', keyboardSection.start], ['ArrowRight', keyboardSection.start + 1], ['ArrowLeft', keyboardSection.start], ['ArrowUp', keyboardSection.start + 1], ['ArrowDown', keyboardSection.start], ['End', keyboardSection.end]]) {
    await page.keyboard.press(key); await previewIs(progressButton, target);
    assert.equal(page.url(), keyboardOrigin, `${key} navigated before confirming the preview`);
    assert.deepEqual(await progressSnapshot(), keyboardProgress, 'Keyboard preview changed remembered progress');
  }
  await page.keyboard.press('Enter'); await waitForPage(keyboardSection.end);
  await page.keyboard.press('ArrowRight'); await waitForPage(keyboardSection.end + 1);
  progressButton = await progressControl(keyboardSection);
  await page.mouse.move(1590, 5); await progressButton.focus();
  await previewIs(progressButton, keyboardSection.end);
  await page.keyboard.press('Home'); await previewIs(progressButton, keyboardSection.start);
  await page.keyboard.press('Space'); await waitForPage(keyboardSection.start);
  await page.keyboard.press('ArrowRight'); await waitForPage(keyboardSection.start + 1);
  // Mixed pointer/keyboard use must confirm the target that the focused
  // control exposes, rather than a stale hover or another section's preview.
  const hoveredPage = keyboardSection.end - 1;
  assert(hoveredPage > keyboardSection.start + 1, 'Need distinct saved and hovered positions');
  for (const savedPage of [null, keyboardSection.start + 1]) {
    await fresh(savedPage ?? agendaPage);
    if (savedPage) await show(sections[1].start);
    progressButton = await progressControl(keyboardSection);
    await pointAtProgress(keyboardSection, hoveredPage);
    await progressButton.focus();
    const focusTarget = savedPage ?? keyboardSection.start;
    await previewIs(progressButton, focusTarget);
    await page.keyboard.press('Enter'); await waitForPage(focusTarget);
  }
  for (const key of ['Enter', 'Space']) {
    await fresh(agendaPage);
    progressButton = await progressControl(keyboardSection);
    await page.mouse.move(1590, 5); await progressButton.focus();
    await previewIs(progressButton, keyboardSection.start);
    await pointAtProgress(keyboardSection, hoveredPage);
    await previewIs(progressButton, hoveredPage);
    assert(await progressButton.evaluate(node => document.activeElement === node), 'Hovering the focused section stole keyboard focus');
    await page.keyboard.press(key); await waitForPage(hoveredPage);
  }
  await fresh(agendaPage);
  progressButton = await progressControl(keyboardSection);
  await page.mouse.move(1590, 5); await progressButton.focus();
  await page.keyboard.press('End'); await previewIs(progressButton, keyboardSection.end);
  const otherSection = sections[2];
  await pointAtProgress(otherSection, otherSection.start);
  await controlPreviewIs(progressButton, keyboardSection.end);
  assert(await progressButton.evaluate(node => document.activeElement === node), 'Hovering another section stole keyboard focus');
  await page.keyboard.press('Enter'); await waitForPage(keyboardSection.end);
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
  console.log(`Talk ${slug} verified${frozen ? ' from frozen snapshot' : ''}: ${titles.length} slides, ${talkTotal}-slide progress, unnumbered intro, ${dividers.length} quiet dividers, appendix, local images/fonts, ${controlChecks} unobstructed controls, consistent destination labels/action styles, ${mainJumpChecks} main jumps, ${menuTargets.length} reserve jumps, ${sections.length} quiet agenda links, nested/contextual/browser-history returns, interactive per-section progress and appendix freeze, ${imageChecks} in-page image viewers, schema-button navigation and ${localLinks.size} local links/downloads`);
} finally {
  await browser?.close(); await new Promise((done) => server.close(done));
  await rm(downloadsDir, { recursive: true, force: true });
}
