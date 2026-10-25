"""The supplied fact snapshot is a complete, genuinely offline build input."""
import json
import os
import shutil
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import build


class OfflineBuildTest(unittest.TestCase):
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
