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
            for name in ("content", "templates"):
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
                 patch("urllib.request.urlopen", side_effect=AssertionError("offline build attempted network")) as network, \
                 patch("socket.create_connection", side_effect=AssertionError("offline build attempted socket")) as connection, \
                 patch.object(build, "resolve_products", side_effect=AssertionError("offline build resolved remote facts")):
                build.main()
            network.assert_not_called()
            connection.assert_not_called()
            self.assertTrue((public / "index.html").is_file())
            self.assertTrue((public / "en/index.html").is_file())
            self.assertEqual(json.loads((public / "stack-manifest.json").read_text()), facts)


if __name__ == "__main__":
    unittest.main()
