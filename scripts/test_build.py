"""The supplied fact snapshot is a complete, genuinely offline build input."""
import json
import os
import shutil
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import build


class OfflineBuildTest(unittest.TestCase):
    def test_shared_renderers_produce_identical_bytes_in_ascii_locale(self):
        program = """
import json, sys
sys.path.insert(0, sys.argv[1])
from site_shell import render_header, render_page_navigation
output = []
for lang in ('de', 'en'):
    output.append(render_header({'lang': lang, 'assetBase': '/assets/site-shell',
        'languageUrls': {'de': '/de/', 'en': '/'}, 'active': 'stack',
        'contactHref': 'https://www.netresearch.de/kontakt/'}))
    output.append(render_page_navigation({'lang': lang, 'title': 'AI stack',
        'links': [{'href': '#main', 'label': 'Start'}]}))
json.dump(output, sys.stdout, ensure_ascii=False)
"""
        command = [sys.executable, "-c", program, str(build.ROOT / "shared/site-shell")]
        normal_env = {**os.environ, "PYTHONUTF8": "1", "PYTHONIOENCODING": "utf-8"}
        ascii_env = {**normal_env, "LC_ALL": "C", "PYTHONUTF8": "0", "PYTHONCOERCECLOCALE": "0"}
        normal = subprocess.run(command, env=normal_env, capture_output=True)
        ascii_locale = subprocess.run(command, env=ascii_env, capture_output=True)
        self.assertEqual(normal.returncode, 0, normal.stderr.decode("utf-8", errors="replace"))
        self.assertEqual(ascii_locale.returncode, 0, ascii_locale.stderr.decode("utf-8", errors="replace"))
        self.assertEqual(normal.stdout, ascii_locale.stdout)
        self.assertEqual(len(json.loads(normal.stdout)), 4)

    def test_fact_snapshot_builds_both_locales_without_manifest_or_network(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            for name in ("content", "templates", "shared"):
                shutil.copytree(build.ROOT / name, root / name)
            public = root / "public"
            public.mkdir()
            facts = {
                "generated_at": "2026-10-24T00:00:00Z",
                "products": {
                    name: {"name": name, "repository": url, "page": url, "stage": "alpha"}
                    for name, url in build.REPOS.items()
                },
            }
            snapshot = root / "facts.json"
            snapshot.write_text(json.dumps(facts), encoding="utf-8")
            environment = {key: value for key, value in os.environ.items() if key != "PROJECTS_MANIFEST"}
            environment["PROJECT_FACTS"] = str(snapshot)
            with patch.dict(os.environ, environment, clear=True), \
                 patch.object(build, "ROOT", root), patch.object(build, "PUBLIC", public), \
                 patch.object(build, "SHELL_SOURCE", root / "shared/site-shell"), \
                 patch("urllib.request.urlopen", side_effect=AssertionError("offline build attempted network")) as network, \
                 patch("socket.create_connection", side_effect=AssertionError("offline build attempted socket")) as connection, \
                 patch.object(build, "resolve_products", side_effect=AssertionError("offline build resolved remote facts")):
                build.main()
            network.assert_not_called()
            connection.assert_not_called()
            self.assertTrue((public / "index.html").is_file())
            self.assertTrue((public / "en/index.html").is_file())
            error = (public / "404.html").read_text(encoding="utf-8")
            self.assertIn('name="robots" content="noindex, follow"', error)
            self.assertIn('href="https://netresearch.github.io/modularer-ki-stack-page/en/"', error)
            self.assertIn('href="https://netresearch.github.io/modularer-ki-stack-page/"', error)
            self.assertIn('src="/modularer-ki-stack-page/assets/site-shell/site-shell.js"', error)
            self.assertEqual(json.loads((public / "stack-manifest.json").read_text()), facts)
            for page in (public / "index.html", public / "en/index.html"):
                markup = page.read_text(encoding="utf-8")
                self.assertIn("data-nr-shell", markup)
                self.assertIn("data-nr-page-navigation", markup)
                self.assertIn('name="nr-shell-theme"', markup)
            for name in ("site-shell.css", "site-shell.js", "netresearch-symbol-only.svg"):
                self.assertEqual((public / "assets/site-shell" / name).read_bytes(), (root / "shared/site-shell" / name).read_bytes())


if __name__ == "__main__":
    unittest.main()
