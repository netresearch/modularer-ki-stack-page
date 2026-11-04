"""Publication preserves the stack and rejects changed or incomplete archives."""
from hashlib import sha256
import json
from pathlib import Path
import shutil
from tempfile import TemporaryDirectory
import unittest

from publish_talks import ARCHIVE, EVENT, PDFS, TEMPLATE, publish


class PublishTalkTests(unittest.TestCase):
    def setUp(self):
        self.temp = TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.talks = self.root / "talks"
        self.public = self.root / "public"
        self.targets = {}
        for slug in (TEMPLATE, ARCHIVE, EVENT):
            source = self.talks / slug / "source"
            source.mkdir(parents=True)
            (source / "slides.md").write_text(f"source for {slug}")
            build = self.talks / slug / "site"
            build.mkdir()
            (build / "index.html").write_text(f"built {slug}")
            (build / PDFS[slug]).write_bytes(b"%PDF-1.7\nfixture")
            target = self.public / "vortraege" / slug
            target.mkdir(parents=True)
            (target / "old.js").write_text(f"previous {slug}")
            self.targets[slug] = target
        (self.public / "index.html").write_text("stack")
        unrelated = self.public / "vortraege" / "other-event"
        unrelated.mkdir()
        (unrelated / "index.html").write_text("other talk")
        self.freeze(ARCHIVE)

    def manifest(self, slug, directory):
        tree = self.talks / slug / directory
        hashes = {path.relative_to(tree).as_posix(): sha256(path.read_bytes()).hexdigest()
                  for path in tree.rglob("*") if path.is_file()}
        (tree.parent / f"{directory}.sha256.json").write_text(json.dumps(hashes))

    def freeze(self, slug):
        talk = self.talks / slug
        shutil.copytree(talk / "site", talk / "snapshot")
        self.manifest(slug, "snapshot")
        self.manifest(slug, "source")

    def public_files(self):
        return {path.relative_to(self.public).as_posix(): path.read_bytes()
                for path in self.public.rglob("*") if path.is_file()}

    def assert_rejected_without_changes(self, exception=ValueError):
        before = self.public_files()
        with self.assertRaises(exception):
            publish(self.root)
        self.assertEqual(self.public_files(), before)

    def test_publishes_three_known_talks_and_preserves_root_and_other_talks(self):
        # Even an unrelated, newer archive build must never replace the snapshot.
        (self.talks / ARCHIVE / "site" / "index.html").write_text("unapproved rebuild")
        publish(self.root)
        self.assertEqual((self.public / "index.html").read_text(), "stack")
        self.assertEqual((self.public / "vortraege/other-event/index.html").read_text(), "other talk")
        for slug, target in self.targets.items():
            self.assertEqual((target / "index.html").read_text(), f"built {slug}")
            self.assertFalse((target / "old.js").exists())
            self.assertFalse((target / "slides.md").exists())

    def test_incomplete_template_preserves_all_previous_talks(self):
        (self.talks / TEMPLATE / "site" / PDFS[TEMPLATE]).unlink()
        self.assert_rejected_without_changes(FileNotFoundError)

    def test_invalid_template_pdf_preserves_all_previous_talks(self):
        (self.talks / TEMPLATE / "site" / PDFS[TEMPLATE]).write_text("not a PDF")
        self.assert_rejected_without_changes()

    def test_incomplete_archive_preserves_all_previous_talks(self):
        (self.talks / ARCHIVE / "snapshot" / PDFS[ARCHIVE]).unlink()
        self.assert_rejected_without_changes(FileNotFoundError)

    def test_archive_hash_mismatch_preserves_all_previous_talks(self):
        (self.talks / ARCHIVE / "snapshot/index.html").write_text("changed")
        self.assert_rejected_without_changes()

    def test_unlisted_archive_file_preserves_all_previous_talks(self):
        (self.talks / ARCHIVE / "snapshot/unapproved.js").write_text("changed")
        self.assert_rejected_without_changes()

    def test_missing_archive_manifest_preserves_all_previous_talks(self):
        (self.talks / ARCHIVE / "snapshot.sha256.json").unlink()
        self.assert_rejected_without_changes(FileNotFoundError)

    def test_archive_source_change_preserves_all_previous_talks(self):
        (self.talks / ARCHIVE / "source/slides.md").write_text("unapproved edit")
        self.assert_rejected_without_changes()

    def test_missing_source_manifest_preserves_all_previous_talks(self):
        (self.talks / ARCHIVE / "source.sha256.json").unlink()
        self.assert_rejected_without_changes(FileNotFoundError)

    def test_local_source_tooling_is_not_part_of_frozen_source(self):
        for name in ("node_modules", ".slidev"):
            folder = self.talks / ARCHIVE / "source" / name
            folder.mkdir()
            (folder / "local-cache").write_text("runtime only")
        publish(self.root)
        self.assertEqual((self.targets[ARCHIVE] / "index.html").read_text(), f"built {ARCHIVE}")

    def test_frozen_event_uses_snapshot_not_new_site(self):
        self.freeze(EVENT)
        (self.talks / EVENT / "site/index.html").write_text("new event build")
        publish(self.root)
        self.assertEqual((self.targets[EVENT] / "index.html").read_text(), f"built {EVENT}")

    def test_partial_event_freeze_cannot_fall_back_to_site(self):
        self.freeze(EVENT)
        (self.talks / EVENT / "snapshot.sha256.json").unlink()
        self.assert_rejected_without_changes(FileNotFoundError)

    def test_frozen_event_source_change_preserves_all_previous_talks(self):
        self.freeze(EVENT)
        (self.talks / EVENT / "source/slides.md").write_text("unapproved event edit")
        self.assert_rejected_without_changes()

    def test_source_symlink_rejected_before_any_mutation(self):
        (self.talks / EVENT / "site/outside").symlink_to(self.public, target_is_directory=True)
        self.assert_rejected_without_changes()

    def test_destination_symlink_rejected_before_any_mutation(self):
        target = self.targets[EVENT]
        shutil.rmtree(target)
        target.symlink_to(self.public, target_is_directory=True)
        self.assert_rejected_without_changes()

    def test_destination_file_rejected_before_any_mutation(self):
        target = self.targets[EVENT]
        shutil.rmtree(target)
        target.write_text("not a directory")
        self.assert_rejected_without_changes()

    def test_manifest_rejects_unsafe_paths_and_invalid_hashes(self):
        path = self.talks / ARCHIVE / "snapshot.sha256.json"
        original = path.read_text()
        cases = [{"../index.html": "0" * 64}, {"/index.html": "0" * 64},
                 {"assets\\index.js": "0" * 64}, {"index.html": "invalid"}, [], {}]
        for manifest in cases:
            with self.subTest(manifest=manifest):
                path.write_text(json.dumps(manifest))
                self.assert_rejected_without_changes()
        path.write_text(original)

    def test_duplicate_manifest_entries_are_rejected(self):
        path = self.talks / ARCHIVE / "snapshot.sha256.json"
        path.write_text('{"index.html":"' + '0' * 64 + '","index.html":"' + '1' * 64 + '"}')
        self.assert_rejected_without_changes()
