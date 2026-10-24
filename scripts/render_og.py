#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = ["pyyaml", "playwright"]
# ///
"""Render branded 1200×630 previews with the same local fonts as the page.

Set CHROME_PATH to an installed Chrome, or install Playwright Chromium once.
Rendering in a browser avoids a silent system-font fallback in SVG rasterizers.
"""
from __future__ import annotations

import asyncio
import base64
import html
import os
import shutil
from pathlib import Path

import yaml
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "public" / "assets"


def data_url(path: Path, mime: str) -> str:
    return f"data:{mime};base64," + base64.b64encode(path.read_bytes()).decode("ascii")


def card(content: dict) -> str:
    heading_font = data_url(ASSETS / "fonts/raleway-latin-800-normal.woff2", "font/woff2")
    body_font = data_url(ASSETS / "fonts/open-sans-latin-400-normal.woff2", "font/woff2")
    logo = data_url(ASSETS / "netresearch-symbol-only.svg", "image/svg+xml")
    return f"""<!doctype html><html lang="{content['lang']}"><meta charset="utf-8"><style>
@font-face{{font-family:Raleway;src:url('{heading_font}');font-weight:800}}
@font-face{{font-family:'Open Sans';src:url('{body_font}');font-weight:400}}
*{{box-sizing:border-box}}body{{margin:0;width:1200px;height:630px;background:linear-gradient(125deg,#15585E,#0A5057 55%,#06363B);color:white;font:26px/1.45 'Open Sans';position:relative}}
header{{height:108px;background:white;color:#4D4F57;display:flex;align-items:center;gap:20px;padding:16px 60px;font:800 28px Raleway}}
header img{{width:64px;height:64px}}main{{padding:42px 64px}}.eyebrow{{font-size:20px;letter-spacing:.1em;text-transform:uppercase;display:flex;align-items:center;gap:12px}}.eyebrow::before{{content:'';width:10px;height:10px;border-radius:50%;background:#FF4D00}}
h1{{font:800 64px/1.1 Raleway;margin:20px 0;max-width:1000px}}p{{margin:0;max-width:1050px}}footer{{position:absolute;bottom:0;left:0;width:100%;height:58px;background:#25272D;display:flex;align-items:center;justify-content:space-between;padding:0 64px;font-size:18px}}
</style><header><img src="{logo}" alt="Netresearch">netresearch</header><main><div class="eyebrow">Open Source · TYPO3</div><h1>{html.escape(content['meta']['og_title'])}</h1><p>{html.escape(content['meta']['og_description'])}</p></main><footer><span>Netresearch DTT GmbH</span><span>netresearch.github.io</span></footer></html>"""


async def main() -> None:
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(executable_path=os.environ.get("CHROME_PATH") or shutil.which("google-chrome"))
        page = await browser.new_page(viewport={"width": 1200, "height": 630}, device_scale_factor=1)
        for lang in ("de", "en"):
            content = yaml.safe_load((ROOT / "content" / f"{lang}.yaml").read_text(encoding="utf-8"))
            await page.set_content(card(content), wait_until="load")
            await page.evaluate("document.fonts.ready")
            target = ASSETS / f"og-ki-stack-{lang}.png"
            await page.screenshot(path=str(target))
            print(f"Wrote {target.relative_to(ROOT)}")
        await browser.close()


if __name__ == "__main__":
    asyncio.run(main())
