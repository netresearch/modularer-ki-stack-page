# modularer-ki-stack-page

Business landing page for the Netresearch modular AI stack.
Published at <https://netresearch.github.io/modularer-ki-stack-page/>.

German is served from `/`, English from `/en/`.

## Build

```bash
uv run scripts/build.py        # render both languages into public/
python3 scripts/verify_site.py # gate the result
uv run scripts/render_og.py    # social cards, after a headline change
```

`scripts/build.py` needs `jinja2` and `pyyaml`; the shebang pulls them via `uv`,
and the deploy workflow installs them with pip.

## Where the facts come from

| Fact on the page | Source |
| --- | --- |
| Maturity, latest release | `https://netresearch.github.io/projects.json` |
| All copy | `content/de.yaml`, `content/en.yaml` |
| Markup | `templates/` |
| Styles, script, fonts, cards | `public/assets/` |

Maturity and release version are **not** written in this repository. They come
from each project's own manifest, aggregated by the organisation's portfolio
site. If the manifest is unreachable, or lists no entry for a module the page
names, the build fails: a maturity table with an unexplained gap is worse than
no table.

That also means `public/index.html`, `public/en/`, `public/sitemap.xml` and
`public/robots.txt` are generated and not committed. Only `public/assets/` and
`public/.nojekyll` are checked in.

## Content

`content/<lang>.yaml` holds every string, including the interactive stack's layer
descriptions. The enhancement script reads them from a JSON block the page
renders, so the markup and the script cannot state different things.

The detail panel is server-rendered with layer 0 already filled in: without
JavaScript the reader still gets a complete layer description.

## Build gate

`scripts/verify_site.py` fails on placeholder text, a missing canonical,
description, `x-default` hreflang, `og:image`, `twitter:card` or JSON-LD block,
invalid JSON-LD, a contact link missing any UTM parameter, a logo that does not
appear exactly once, a maturity section with no status, a missing
"what is not claimed" section, a missing asset, or any asset loaded from a
third-party origin.

That last rule is deliberate. The page argues for data sovereignty; it used to
fetch its fonts from a third-party service on every visit.

## Adding a module to the maturity table

1. Make sure the module is listed in the portfolio site's `src/data/products.yaml`
   so it appears in `projects.json`.
2. Add a row under `maturity.rows` in both `content/de.yaml` and
   `content/en.yaml` with its `id`, `role`, `usage` and `boundary`.

The status, release and links come from the manifest — do not write them here.
