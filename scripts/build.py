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

Maturity and release version are not written in this repository at all. They are
read from the organisation's aggregated manifest:

  https://netresearch.github.io/projects.json

A module the manifest does not cover is a build error, not a blank cell: a
maturity table with an unexplained gap is worse than no table.

    uv run scripts/build.py
"""

from __future__ import annotations

import json
import os
import shutil
import sys
import urllib.error
import urllib.request
from datetime import date
from pathlib import Path
from urllib.parse import urlencode

import yaml
from jinja2 import Environment, FileSystemLoader

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
SITE_URL = "https://netresearch.github.io/modularer-ki-stack-page/"
MANIFEST_URL = os.environ.get(
    "PROJECTS_MANIFEST", "https://netresearch.github.io/projects.json"
)

LANGS = ("de", "en")
# German serves the bare path: the page was published in German, the URL is
# linked from outside, and it stays the canonical one.
PATHS = {"de": "", "en": "en/"}

LAST_VERIFIED = "2026-08-10"

CONTACT_BASE = "https://www.netresearch.de/kontakt/"

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


def contact_url(position: str) -> str:
    return CONTACT_BASE + "?" + urlencode({
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
        rows.append({
            **row,
            "name": product["name"],
            "page": product["page"],
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
        "isPartOf": {"@id": f"{SITE_URL}#organization"},
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
    manifest = load_manifest()
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
            c=content,
            canonical=canonical,
            alternates=alternates,
            site_url=SITE_URL,
            base="" if lang == "de" else "../",
            last_verified=LAST_VERIFIED,
            repos=REPOS,
            maturity_rows=rows,
            layer_data=layer_data(content),
            json_ld=json_ld(content, canonical, rows),
            contact={
                "hero": contact_url("hero"),
                "band": contact_url("cta-band"),
                "footer": contact_url("footer"),
            },
        )

        target = PUBLIC / PATHS[lang] / "index.html"
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(html, encoding="utf-8")
        print(f"Wrote {target.relative_to(ROOT)}")

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
