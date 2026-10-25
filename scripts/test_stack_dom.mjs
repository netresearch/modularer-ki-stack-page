/** Exercise the DOM boundary with literal markup and deceptive repository URLs. */
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import puppeteer from 'puppeteer';

const script = await readFile(new URL('../public/assets/stack.js', import.meta.url), 'utf8');
const attack = '<img src=x onerror="globalThis.domAttack=true">';
const urls = [
  ['https://github.com/netresearch/t3x-nr-vault', true],
  ['https://github.com/netresearch/typo3_http_guard', true],
  ['javascript:globalThis.domAttack=true', false],
  ['data:text/html,<script>globalThis.domAttack=true</script>', false],
  ['https://github.com.evil.invalid/netresearch/example', false],
  ['https://github.com@evil.invalid/netresearch/example', false],
  ['https://github.com/another-organisation/example', false],
];
const browser = await puppeteer.launch({
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
async function checkRepositoryUrl([url, allowed]) {
  const context = await browser.createBrowserContext();
  try {
    const page = await context.newPage();
    const fields = ['kicker', 'title', 'summary', 'problem', 'audience', 'result', 'takeawayTitle', 'takeaway'];
    const layer = Object.fromEntries(fields.map((field) => [field, attack]));
    layer.stack = [attack];
    const data = JSON.stringify({ repos: { [attack]: url }, layers: { 0: layer }, labels: {} }).replaceAll('<', String.raw`\u003c`);
    await page.setContent(
      '<button class="layer-card" id="tab-0" data-layer="0">Select</button>' +
      '<div id="layer-panel">' +
      ['detail-kicker', 'detail-title', 'detail-summary', 'detail-problem', 'detail-audience', 'detail-result', 'detail-takeaway-title', 'detail-takeaway']
        .map((id) => '<span id="' + id + '"></span>').join('') +
      '<div class="detail-stack"><div id="stack-path"></div></div></div><p id="panel-state"></p>' +
      '<script id="layer-data" type="application/json">' + data + '</script>',
    );
    await page.addScriptTag({ content: script });
    await page.click('#tab-0');
    const actual = await page.evaluate(() => ({
      title: document.getElementById('detail-title').textContent,
      chip: document.querySelector('#stack-path .path-chip')?.textContent,
      links: [...document.querySelectorAll('#stack-path a')].map((link) => link.href),
      injected: document.querySelectorAll('#layer-panel img, #layer-panel script').length,
      executed: globalThis.domAttack === true,
    }));
    assert.equal(actual.title, attack);
    assert.equal(actual.chip, attack);
    assert.equal(actual.injected, 0);
    assert.equal(actual.executed, false);
    assert.deepEqual(actual.links, allowed ? [url] : [], url);
  } finally {
    await context.close();
  }
}

try {
  // Each case owns a context but shares this browser; retain bounded, serial
  // execution and close each context before opening the next one.
  await urls.reduce((sequence, entry) => sequence.then(() => checkRepositoryUrl(entry)), Promise.resolve());
  console.log(`DOM boundary: literal markup remains text; only Netresearch HTTPS repository links are clickable (${urls.length} cases)`);
} finally {
  await browser.close();
}
