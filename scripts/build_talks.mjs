/** Build active editions only. Archived content is never rebuilt. */
import { lstatSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import puppeteer from 'puppeteer';

const root = fileURLToPath(new URL('../', import.meta.url));
const env = { ...process.env };
delete env.GITHUB_TOKEN;
delete env.GH_TOKEN;
const chrome = process.env.PUPPETEER_EXECUTABLE_PATH || await puppeteer.executablePath();
for (const id of ['vorlage', 'mtug-2026-11-09']) {
  const talk = resolve(root, 'talks', id);
  const flags = ['snapshot', 'snapshot.sha256.json', 'source.sha256.json'].map(name => {
    try { lstatSync(resolve(talk, name)); return true; }
    catch (error) { if (error.code === 'ENOENT') return false; throw error; }
  });
  if (flags.some(Boolean)) {
    if (id === 'vorlage') throw new Error('The neutral template must remain editable');
    if (!flags.every(Boolean)) throw new Error(`Incomplete frozen archive: ${id}`);
    console.log(`Keeping frozen edition: ${id}`);
    continue;
  }
  const source = resolve(talk, 'source');
  const expectedPdf = id === 'vorlage' ? 'KI-in-TYPO3.pdf' : 'MTUG-KI-in-TYPO3.pdf';
  const markdown = readFileSync(resolve(source, 'slides.md'), 'utf8');
  if (!markdown.includes(`download: ./${expectedPdf}`)) throw new Error(`Wrong PDF metadata in ${id}`);
  // A complete lock-based installation preserves the security overrides.
  execFileSync('npm', ['ci', '--ignore-scripts', '--no-audit', '--no-fund'], { cwd: source, env, stdio: 'inherit' });
  execFileSync('npm', ['run', 'export', '--', '--executable-path', chrome, '--timeout', '60000', '--wait', '1000'], { cwd: source, env, stdio: 'inherit' });
  execFileSync('npm', ['run', 'build'], { cwd: source, env, stdio: 'inherit' });
}
