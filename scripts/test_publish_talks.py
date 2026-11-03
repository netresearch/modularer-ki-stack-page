"""Publication must preserve the root site and reject incomplete/redirected builds."""
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest

from publish_talks import PDF, TALK, publish


class PublishTalkTests(unittest.TestCase):
    def setUp(self):
        self.temp = TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.source = self.root / "talks" / TALK / "site"
        self.source.mkdir(parents=True)
        (self.source / "index.html").write_text("talk")
        (self.source / PDF).write_bytes(b"%PDF-1.7\nfixture")
        self.target = self.root / "public" / "vortraege" / TALK
        self.target.mkdir(parents=True)
        (self.target / "old.js").write_text("stale build")
        (self.root / "public" / "index.html").write_text("stack")

    def test_replaces_only_known_talk(self):
        publish(self.root)
        self.assertEqual((self.root / "public" / "index.html").read_text(), "stack")
        self.assertEqual((self.target / "index.html").read_text(), "talk")
        self.assertFalse((self.target / "old.js").exists())

    def test_incomplete_build_preserves_previous_talk(self):
        (self.source / PDF).unlink()
        with self.assertRaises(FileNotFoundError):
            publish(self.root)
        self.assertTrue((self.target / "old.js").exists())

    def test_source_symlink_rejected_before_mutation(self):
        (self.source / "outside").symlink_to(self.root / "public", target_is_directory=True)
        with self.assertRaises(ValueError):
            publish(self.root)
        self.assertTrue((self.target / "old.js").exists())

    def test_destination_symlink_rejected(self):
        (self.target / "old.js").unlink()
        self.target.rmdir()
        self.target.symlink_to(self.root / "public", target_is_directory=True)
        with self.assertRaises(ValueError):
            publish(self.root)
        self.assertEqual((self.root / "public" / "index.html").read_text(), "stack")
