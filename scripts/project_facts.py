"""Resolve release, maturity and install requirements with explicit provenance.

GitHub releases and Composer requirements are read from the same tag. Editorial
maturity comes from the product manifest or portfolio, then ext_emconf.php. A
source failure aborts publication rather than silently retaining old facts.
"""
from __future__ import annotations

import json
import os
import re
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from urllib.parse import urlsplit

PRODUCT_MANIFESTS = {
    name: f"https://netresearch.github.io/t3x-{name}/project-manifest.json"
    for name in ("nr-llm", "nr-browser-ai", "nr-mcp-agent")
}
STAGES = {"concept", "poc", "alpha", "beta", "stable", "maintenance"}


def fetch(url: str, *, optional_release: bool = False):
    parsed = urlsplit(url)
    if parsed.scheme != "https" or not parsed.hostname:
        raise ValueError(f"Expected an HTTPS source: {url}")
    is_github_api = parsed.hostname == "api.github.com"
    headers = {"User-Agent": "netresearch-ki-stack-build", "Accept": "application/json"}
    token = os.environ.get("GITHUB_TOKEN")
    if token and is_github_api:
        headers["Authorization"] = f"Bearer {token}"
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=30) as response:
            text = response.read().decode("utf-8")
    except urllib.error.HTTPError as exc:
        if optional_release and exc.code == 404:
            return None
        raise
    return json.loads(text) if parsed.path.endswith(".json") or is_github_api else text


def validate_source(manifest: dict, repository: str) -> None:
    if manifest and manifest.get("repository", "").rstrip("/") != repository:
        raise ValueError(f"Product manifest does not identify {repository}")


def merge_product(name, repository, central, own, composer, ext_emconf, release, checked_at):
    validate_source(own, repository)
    requirements = composer.get("require", {})
    if not requirements.get("php") or not requirements.get("typo3/cms-core"):
        raise ValueError(f"{name}: PHP and TYPO3 requirements must be declared")
    state = re.search(r"['\"]state['\"]\s*=>\s*['\"]([^'\"]+)", ext_emconf)
    if own.get("stage"):
        stage = own["stage"]
        stage_source = PRODUCT_MANIFESTS[name]
    elif central.get("stage"):
        stage = central["stage"]
        stage_source = central.get("stage_source") or "https://netresearch.github.io/projects.json"
    else:
        stage = state.group(1) if state else None
        stage_source = None
    if stage not in STAGES:
        raise ValueError(f"{name}: no supported maturity declaration")
    tag = release.get("tag_name") if release else None
    ref = tag or "main"
    stage_source = stage_source or f"{repository}/blob/{ref}/ext_emconf.php"
    return {
        **central, "name": name, "repository": repository,
        "page": central.get("page") or repository, "stage": stage,
        "latest_release": tag, "release_date": release.get("published_at", "")[:10] if release else None,
        "release_source": f"{repository}/releases", "stage_source": stage_source,
        "requirements_ref": ref, "requirements_source": f"{repository}/blob/{ref}/composer.json",
        "php": requirements["php"], "typo3": requirements["typo3/cms-core"],
        "composer_package": composer.get("name"),
        "documentation": f"{repository}/tree/{ref}/Documentation",
        "dependencies": [key.removeprefix("netresearch/") for key in requirements if key.startswith("netresearch/nr-")],
        "checked_at": checked_at,
    }


def resolve_products(repositories: dict[str, str], central: dict[str, dict]) -> dict:
    checked_at = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

    def resolve(item):
        name, repository = item
        repo = repository.removeprefix("https://github.com/")
        release = fetch(f"https://api.github.com/repos/{repo}/releases/latest", optional_release=True)
        ref = release["tag_name"] if release else "main"
        own = fetch(PRODUCT_MANIFESTS[name]) if name in PRODUCT_MANIFESTS else {}
        raw = f"https://raw.githubusercontent.com/{repo}/{ref}/"
        composer = fetch(raw + "composer.json")
        ext_emconf = fetch(raw + "ext_emconf.php")
        return name, merge_product(name, repository, central.get(name, {}), own,
                                   composer, ext_emconf, release, checked_at)

    with ThreadPoolExecutor(max_workers=4) as executor:
        products = dict(executor.map(resolve, repositories.items()))
    return {"generated_at": checked_at, "products": products}
