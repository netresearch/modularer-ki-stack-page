#!/usr/bin/env python3
"""Build gate for the rendered landing page.

Checks what visitors and crawlers actually receive. Exit code 1 fails the build.

    python3 scripts/verify_site.py
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from check_accessibility import check_accessibility  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"

errors: list[str] = []

PLACEHOLDERS = ("Loading…", "Loading...", "TBD", "Lorem ipsum")

REQUIRED_META = (
    (r'<link rel="canonical" href="[^"]+"', "canonical"),
    (r'<meta name="description" content="[^"]+"', "meta description"),
    (r'hreflang="x-default"', "x-default hreflang"),
    (r'<meta property="og:image" content="[^"]+"', "og:image"),
    (r'<meta name="twitter:card"', "twitter:card"),
    (r'<script type="application/ld\+json">', "JSON-LD"),
)

# Everything the page loads must come from this origin: the page argues for data
# sovereignty, so a third-party font or script request contradicts its own text.
ALLOWED_ASSET_PREFIXES = ("https://netresearch.github.io/",)


def strip_markup(html: str) -> str:
    html = re.sub(r"<script\b[^>]*>.*?</script\b[^>]*>", " ", html, flags=re.S | re.I)
    html = re.sub(r"<style\b[^>]*>.*?</style\b[^>]*>", " ", html, flags=re.S | re.I)
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", html))


def main() -> int:
    pages = sorted(PUBLIC.rglob("index.html"))
    if not pages:
        print("verify_site: no pages built — run scripts/build.py first", file=sys.stderr)
        return 1

    for page in pages:
        name = page.relative_to(PUBLIC).as_posix()
        html = page.read_text(encoding="utf-8")
        text = strip_markup(html)

        for placeholder in PLACEHOLDERS:
            if placeholder in text:
                errors.append(f"{name}: placeholder text in the initial HTML: {placeholder!r}")

        for pattern, label in REQUIRED_META:
            if not re.search(pattern, html):
                errors.append(f"{name}: no {label}")

        for block in re.findall(r'<script type="application/ld\+json">([\s\S]*?)</script>', html):
            try:
                parsed = json.loads(block)
            except json.JSONDecodeError as exc:
                errors.append(f"{name}: invalid JSON-LD: {exc}")
                continue
            for node in parsed.get("@graph", [parsed]):
                if "@type" not in node:
                    errors.append(f"{name}: JSON-LD node without @type")

        contact_links = re.findall(r'href="([^"]*netresearch\.de/kontakt/[^"]*)"', html)
        if not contact_links:
            errors.append(f"{name}: no business CTA to the contact form")
        for href in contact_links:
            for param in ("utm_source", "utm_medium", "utm_campaign", "utm_content"):
                if f"{param}=" not in href:
                    errors.append(f"{name}: contact link without {param}")

        # Accessibility and semantics decidable from the markup alone.
        for problem in check_accessibility(html):
            errors.append(f"{name}: {problem}")

        # The logo is an inline SVG here; it must still appear exactly once.
        logos = re.findall(r"<title>Netresearch DTT GmbH</title>", html)
        if len(logos) != 1:
            errors.append(f"{name}: the logo appears {len(logos)} times, expected exactly once")

        # No maturity claim without a status pill, and no status without a source.
        if "maturity-heading" in html and 'class="status-pill' not in html:
            errors.append(f"{name}: the maturity section renders no status")

        # The limits section is what keeps the page's claims bounded.
        if 'id="grenzen"' not in html:
            errors.append(f"{name}: the 'what is not claimed' section is missing")

        for asset in re.findall(r'<(?:script|link|img)[^>]+(?:src|href)="(https?://[^"]+)"', html):
            if not asset.startswith(ALLOWED_ASSET_PREFIXES):
                errors.append(f"{name}: loads a third-party asset: {asset}")

    for required in ("sitemap.xml", "robots.txt", ".nojekyll", "assets/styles.css",
                     "assets/stack.js", "assets/og-ki-stack-de.png", "assets/og-ki-stack-en.png"):
        if not (PUBLIC / required).exists():
            errors.append(f"missing public/{required}")

    for message in errors:
        print(f"ERROR {message}", file=sys.stderr)

    print(f"\nverify_site: {len(pages)} pages checked, {len(errors)} errors")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
