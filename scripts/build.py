#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = ["jinja2", "pyyaml"]
# ///
"""Build the modular AI stack landing page.

The page used to be a single hand-written HTML file with the copy, the layer
data and the module list interleaved with the markup. That made a second
language impossible to keep in step and left the maturity of each module as a
claim nobody could check.

Now:

  content/<lang>.yaml   all copy, one file per language
  templates/            markup, no copy
  public/               the built site — German at /, English at /en/

The portfolio supplies editorial metadata. scripts/project_facts.py resolves
current releases and the install requirements at their tags, preferring a
product's own maturity declaration and recording the source of every field.
The same records feed the comparison, JSON-LD and public stack-manifest.json.

    uv run scripts/build.py
"""

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path
from urllib.parse import urlencode
from project_facts import resolve_products

import yaml
from jinja2 import Environment, FileSystemLoader

ROOT = Path(__file__).resolve().parent.parent
SHELL_SOURCE = ROOT / "shared" / "site-shell"
sys.path.insert(0, str(SHELL_SOURCE))
from site_shell import render_header, render_page_navigation

PUBLIC = ROOT / "public"
SITE_URL = "https://netresearch.github.io/modularer-ki-stack-page/"
MANIFEST_URL = os.environ.get(
    "PROJECTS_MANIFEST", "https://netresearch.github.io/projects.json"
)

LANGS = ("de", "en")
# German serves the bare path: the page was published in German, the URL is
# linked from outside, and it stays the canonical one.
PATHS = {"de": "", "en": "en/"}

LAST_VERIFIED = "2026-10-24"

CONTACT_BASE = {"de": "https://www.netresearch.de/kontakt/", "en": "https://www.netresearch.de/en/contact/"}

REPOS = {
    "nr-vault": "https://github.com/netresearch/t3x-nr-vault",
    "nr-passkeys-be": "https://github.com/netresearch/t3x-nr-passkeys-be",
    "nr-passkeys-fe": "https://github.com/netresearch/t3x-nr-passkeys-fe",
    "nr-llm": "https://github.com/netresearch/t3x-nr-llm",
    "nr-mcp-agent": "https://github.com/netresearch/t3x-nr-mcp-agent",
    "nr-browser-ai": "https://github.com/netresearch/t3x-nr-browser-ai",
    "nr-repurpose": "https://github.com/netresearch/t3x-nr-repurpose",
    "cowriter": "https://github.com/netresearch/t3x-cowriter",
    "nr-landingpage": "https://github.com/netresearch/nr-landingpage",
}


def contact_url(position: str, lang: str) -> str:
    return CONTACT_BASE[lang] + "?" + urlencode({
        "utm_source": "github-pages",
        "utm_medium": "referral",
        "utm_campaign": "ki-stack",
        "utm_content": position,
    })


def load_manifest() -> dict[str, dict]:
    """Fetch the organisation's aggregated product manifest, keyed by product id."""
    # urllib also speaks file:// and ftp://, so the scheme is asserted rather
    # than assumed. MANIFEST_URL is a constant unless PROJECTS_MANIFEST overrides
    # it for a local build; the assertion is what keeps a remote build honest.
    if not MANIFEST_URL.startswith(("https://", "file://")):
        raise SystemExit(f"build: refusing a manifest URL that is not HTTPS: {MANIFEST_URL}")
    try:
        # The URL is asserted above and comes from the build environment, not
        # from a request or a user.
        # nosemgrep: python.lang.security.audit.dynamic-urllib-use-detected.dynamic-urllib-use-detected
        with urllib.request.urlopen(MANIFEST_URL, timeout=20) as response:
            payload = json.load(response)
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as exc:
        print(
            f"build: {MANIFEST_URL} unreachable ({exc}). Refusing to build a maturity "
            "table from guesses.",
            file=sys.stderr,
        )
        raise SystemExit(1) from exc
    return {product["id"]: product for product in payload.get("products", [])}


def maturity_rows(content: dict, manifest: dict[str, dict], lang: str) -> list[dict]:
    rows = []
    for row in content["maturity"]["rows"]:
        product = manifest.get(row["id"])
        if product is None:
            print(
                f"build: {row['id']} is in content/{lang}.yaml but not in the manifest. "
                "Add it to the hub's products.yaml or remove the row.",
                file=sys.stderr,
            )
            raise SystemExit(1)
        page = product["page"]
        if row["id"] in ("nr-llm", "nr-browser-ai", "nr-mcp-agent"):
            locale_path = ""
            if row["id"] == "nr-llm" or lang == "de":
                locale_path = f"{lang}/"
            page = f"https://netresearch.github.io/t3x-{row['id']}/{locale_path}"
        rows.append({
            **product,
            **row,
            "name": product["name"],
            "page": page,
            "repository": product["repository"],
            "stage": product["stage"],
            "latest_release": product.get("latest_release"),
            # Two different things, and the page says which. "derived": the
            # project has a page but publishes no manifest yet — a gap.
            # "repository_sourced": it has no page of its own, so the hub reads
            # the repository — a description, not a deficiency.
            "derived": product.get("manifest_source") == "derived",
            "repository_sourced": product.get("manifest_source") == "repository",
        })
    return rows


def layer_data(content: dict) -> str:
    """The layer copy the enhancement script reads. Same source as the markup."""
    return json.dumps(
        {
            "repos": REPOS,
            "labels": {"openRepo": content["stack"]["detail_labels"]["open_repo"]},
            "layers": {
                layer["number"]: {
                    "kicker": layer["detail"]["kicker"],
                    "title": layer["title"],
                    "summary": layer["detail"]["summary"],
                    "problem": layer["detail"]["problem"],
                    "audience": layer["detail"]["audience"],
                    "result": layer["detail"]["result"],
                    "takeawayTitle": layer["detail"]["takeaway_title"],
                    "takeaway": layer["detail"]["takeaway"],
                    "stack": layer["detail"]["stack"],
                }
                for layer in content["stack"]["layers"]
            },
        },
        ensure_ascii=False,
    ).replace("<", "\\u003c")


def json_ld(content: dict, canonical: str, manifest_rows: list[dict]) -> str:
    organisation = {
        "@type": "Organization",
        "@id": f"{SITE_URL}#organization",
        "name": "Netresearch DTT GmbH",
        "url": "https://www.netresearch.de/",
    }
    page = {
        "@type": "WebPage",
        "@id": canonical,
        "url": canonical,
        "name": content["meta"]["title"],
        "description": content["meta"]["description"],
        "inLanguage": content["html_lang"],
        "isPartOf": {"@type": "WebSite", "@id": "https://netresearch.github.io/#website", "url": "https://netresearch.github.io/"},
        "publisher": {"@id": f"{SITE_URL}#organization"},
    }
    # Only the modules the page actually renders with a status, and only the
    # values the table shows.
    modules = {
        "@type": "ItemList",
        "name": content["maturity"]["heading"],
        "numberOfItems": len(manifest_rows),
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "SoftwareApplication",
                    "name": row["name"],
                    "url": row["page"],
                    "applicationCategory": "DeveloperApplication",
                    "codeRepository": row["repository"],
                    **({"softwareVersion": row["latest_release"]} if row["latest_release"] else {}),
                },
            }
            for index, row in enumerate(manifest_rows)
        ],
    }
    breadcrumb = {
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": content["meta"]["og_title"], "item": canonical},
        ],
    }
    payload = json.dumps(
        {"@context": "https://schema.org", "@graph": [organisation, page, modules, breadcrumb]},
        ensure_ascii=False,
    )
    return payload.replace("<", "\\u003c")


def main() -> None:
    shell_assets = PUBLIC / "assets" / "site-shell"
    shell_assets.mkdir(parents=True, exist_ok=True)
    for name in ("site-shell.css", "site-shell.js", "netresearch-symbol-only.svg"):
        (shell_assets / name).write_bytes((SHELL_SOURCE / name).read_bytes())
    shell_bootstrap = (SHELL_SOURCE / "theme-bootstrap.js").read_text(encoding="utf-8")
    facts_path = os.environ.get("PROJECT_FACTS")
    if facts_path:
        facts = json.loads(Path(facts_path).read_text(encoding="utf-8"))
    else:
        facts = resolve_products(REPOS, load_manifest())
    manifest = facts["products"]
    (PUBLIC / "stack-manifest.json").write_text(json.dumps(facts, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    env = Environment(# nosemgrep: python.flask.security.xss.audit.direct-use-of-jinja2.direct-use-of-jinja2
        loader=FileSystemLoader(ROOT / "templates"),
        # Autoescape everything. An extension allow-list would miss ".html.j2",
        # and every deliberate raw-HTML injection is marked |safe at its use site.
        autoescape=True,
        trim_blocks=True,
        lstrip_blocks=True,
    )

    alternates = [
        {"hreflang": "de", "href": SITE_URL},
        {"hreflang": "en", "href": f"{SITE_URL}en/"},
        {"hreflang": "x-default", "href": SITE_URL},
    ]

    for lang in LANGS:
        content = yaml.safe_load((ROOT / "content" / f"{lang}.yaml").read_text(encoding="utf-8"))
        canonical = f"{SITE_URL}{PATHS[lang]}"
        rows = maturity_rows(content, manifest, lang)

        html = env.get_template("index.html.j2").render(
            shell_bootstrap=shell_bootstrap,
            page_navigation=render_page_navigation({
                "lang": lang, "title": content["nav"]["brand_line2"], "titleHref": "#main",
                "links": content["nav"]["items"],
            }),
            global_header=render_header({
                "lang": lang, "assetBase": f"{'../' if lang == 'en' else ''}assets/site-shell",
                "languageUrls": {"de": SITE_URL, "en": f"{SITE_URL}en/"},
                "active": "stack", "contactHref": contact_url("header", lang),
            }),
            c=content,
            canonical=canonical,
            alternates=alternates,
            site_url=SITE_URL,
            base="" if lang == "de" else "../",
            last_verified=LAST_VERIFIED,
            repos=REPOS,
            maturity_rows=rows,
            facts_checked=facts["generated_at"],
            layer_data=layer_data(content),
            json_ld=json_ld(content, canonical, rows),
            contact={
                "hero": contact_url("hero", lang),
                "band": contact_url("cta-band", lang),
                "footer": contact_url("footer", lang),
            },
        )

        target = PUBLIC / PATHS[lang] / "index.html"
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(html, encoding="utf-8")
        print(f"Wrote {target.relative_to(ROOT)}")

    error_url = f"{SITE_URL}404.html"
    (PUBLIC / "404.html").write_text(env.get_template("not_found.html.j2").render(
        site_title="Modular AI stack", asset_base="/modularer-ki-stack-page/assets",
        home_en=f"{SITE_URL}en/", home_de=SITE_URL,
        contact=contact_url("error-footer", "en"), shell_bootstrap=shell_bootstrap,
        global_header=render_header({
            "lang": "en", "assetBase": "/modularer-ki-stack-page/assets/site-shell",
            "languageUrls": {"de": f"{error_url}#deutsch", "en": f"{error_url}#english"},
            "contactHref": contact_url("error-header", "en"),
        }),
    ), encoding="utf-8")

    urls = [f"{SITE_URL}{PATHS[lang]}" for lang in LANGS]
    entries = "\n".join(
        f"  <url><loc>{url}</loc><lastmod>{LAST_VERIFIED}</lastmod></url>" for url in urls
    )
    (PUBLIC / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{entries}\n</urlset>\n",
        encoding="utf-8",
    )
    (PUBLIC / "robots.txt").write_text(
        "User-agent: *\nAllow: /\n\n"
        "User-agent: Googlebot\nAllow: /\n\n"
        "User-agent: Bingbot\nAllow: /\n\n"
        "User-agent: OAI-SearchBot\nAllow: /\n\n"
        f"Sitemap: {SITE_URL}sitemap.xml\n",
        encoding="utf-8",
    )
    print("Wrote sitemap.xml and robots.txt")


if __name__ == "__main__":
    main()
