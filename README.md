# Modular AI stack for TYPO3

Business and technical entry point for the Netresearch AI modules, published at
<https://netresearch.github.io/modularer-ki-stack-page/>. German is at `/`,
English at `/en/`. `content/` holds copy, `templates/` holds markup and
`public/assets/` holds local fonts, styling, scripts and previews.

## Build and verification

```bash
python3 -m pip install jinja2 pyyaml
python3 -m unittest discover -s scripts -p 'test_*.py'
python3 scripts/build.py
python3 scripts/verify_site.py
npm ci --ignore-scripts
npx puppeteer browsers install chrome
npm run test:dom
npm run axe
```

The build needs network access to the portfolio, product manifests, GitHub's
public release API and raw repository files. `GITHUB_TOKEN`, when present, is
used only for requests to `api.github.com`; no token is embedded in output.
A failed source request stops publication. Only a 404 from the latest-release
endpoint means “no GitHub release”; other errors never become a guessed version.

The browser gate serves the real `/modularer-ki-stack-page/` base path. It checks
both locales and actual light/dark preferences in isolated browser contexts at
1280, 390 and 320 CSS px. Besides WCAG 2.2 A/AA rules and enhanced text contrast,
it exercises task selection, reflow, the mobile menu's Escape/focus behaviour
and the colour switch. Set `PUPPETEER_EXECUTABLE_PATH` to reuse an installed Chrome.
These checks do not certify complete WCAG AA or AAA conformance.
The DOM regression check supplies literal markup and deceptive repository URLs:
text remains text, and only HTTPS links to Netresearch repositories on GitHub
remain clickable.

## Fact provenance

`public/stack-manifest.json` is generated and published with every build. It
contains the retrieval time and these sources for each of the nine modules:

- Latest GitHub release, read directly from its repository.
- PHP/TYPO3 constraints and direct Netresearch dependencies from `composer.json`
  **at that release tag**, or `main` when no release exists.
- Maturity from the product's own published manifest, otherwise the portfolio's
  editorial value, otherwise the extension's declared `state` at the same ref.
  The emitted `stage_source` identifies which source applies. A release number
  never implies a maturity grade.

The visible comparison and JSON-LD use the same resolved records. The per-module
manual and Composer package names come from those records as well. Release
existence is distinct from verified TER/Packagist publication or installation.

The deploy workflow rebuilds daily and on `main` changes or manual dispatch, so
release data can change without editing this repository. The page shows its
source retrieval time separately from the editorial review date. Build failures
leave the previous deployment and its original retrieval timestamp intact.
Dependency installation and browser downloads run in the token-free pre-build
phase. The source-data build receives the job's read-only GitHub token; checks
explicitly unset it. Resolved fact files are read and written as UTF-8.

For an offline rebuild of a previously retrieved set, explicitly use:

```bash
PROJECTS_MANIFEST=file:///absolute/path/projects.json \
PROJECT_FACTS=/absolute/path/stack-manifest.json python3 scripts/build.py
```

Do not commit generated HTML, sitemaps, robots.txt or `stack-manifest.json`.

## Content and design

Functional groups are not an installation dependency graph. The table states
actual direct dependencies; passkeys, the backend agent and individual content
tools are optional choices. Browser AI is independent and does not inherit
server-side logging/budgets. Social publication is an integration task until a
current, compatible implementation is evidenced.
Frontend passkeys require the backend passkey extension; both are optional for
the AI foundation. The shared colour preference uses `nr-theme`, with migration
from the earlier `nr-color-theme` key.

Follow the standalone-page profile of Netresearch branding skill **3.1.0**:
canonical unchanged symbol, local Raleway/Open Sans, `--nr-*` tokens, anthracite
company footer, 14px minimum text and light/dark schemes. The normal-text colour
pairs use the skill's AAA variants; the bright primary/accent hues are reserved
for non-text marks. There is one hero surface, without hover translations or
coloured card-edge stripes.

The menu, colour preference and task details are progressive enhancements. With
JavaScript disabled, the native navigation disclosure remains usable and all
four task descriptions are rendered. Language links and the return to the portfolio remain direct.

## Social previews

After changing a title or preview description:

```bash
# Requires Playwright plus an installed Chrome, or Playwright's Chromium.
CHROME_PATH=/path/to/chrome uv run scripts/render_og.py
```

The renderer embeds the same local brand fonts and canonical symbol, then writes
both 1200×630 previews. Browser rendering avoids an SVG rasterizer silently using
system fallback fonts. The PNGs are committed and served from this site.

## Shared navigation

`shared/site-shell/` vendors the common Netresearch header source. The build uses
its Python renderer and publishes byte-identical CSS, JavaScript and the original
symbol under `assets/site-shell/`. That public directory is generated during
every build and excluded from Git; `shared/site-shell/` is the maintained source.
The early inline bootstrap applies System,
Light or Dark before styles load; the task explorer does not own colour or
global-navigation state. The browser gate checks radio-keyboard selection,
persistence, legacy and System reset, blocked storage, native NoJS navigation
and short viewports against the actual built pages.
