"""Freezing is explicit, date-gated, complete, and never replaces an archive."""
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import shutil
from tempfile import TemporaryDirectory
import unittest
from unittest.mock import patch

from freeze_talk import EVENT, MARKERS, PDF, freeze_talk, validate_pdf


def pdf_fixture() -> bytes:
    """Build one real PDF page, including byte offsets and its cross-reference."""
    objects = [
        b"<< /Type /Catalog /Pages 2 0 R >>",
        b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
        b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 200 200] /Contents 4 0 R >>",
        b"<< /Length 0 >>\nstream\n\nendstream",
    ]
    data = b"%PDF-1.4\n"
    offsets = []
    for index, value in enumerate(objects, start=1):
        offsets.append(len(data))
        data += f"{index} 0 obj\n".encode() + value + b"\nendobj\n"
    start = len(data)
    data += f"xref\n0 {len(objects) + 1}\n0000000000 65535 f \n".encode()
    for offset in offsets:
        data += f"{offset:010d} 00000 n \n".encode()
    return data + f"trailer\n<< /Size 5 /Root 1 0 R >>\nstartxref\n{start}\n%%EOF\n".encode()


SLIDES = """---
title: KI in TYPO3
info: |
  KI in TYPO3: Anwendungen. MTUG · TYPO3 User Group München · 9. November 2026.
presenter: false
record: false
download: ./MTUG-KI-in-TYPO3.pdf
exportFilename: MTUG-KI-in-TYPO3
---
# KI in TYPO3
"""
ON_EVENT = datetime(2026, 11, 8, 23, 0, tzinfo=timezone.utc)


class FreezeTalkTests(unittest.TestCase):
    def setUp(self):
        temporary = TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.root = Path(temporary.name)
        self.event = self.root / "talks" / EVENT
        self.site = self.event / "site"
        self.source = self.event / "source"
        self.site.mkdir(parents=True)
        self.source.mkdir()
        (self.site / "index.html").write_text("<html>Reviewed MTUG talk</html>")
        (self.site / PDF).write_bytes(pdf_fixture())
        (self.source / "slides.md").write_text(SLIDES, encoding="utf-8")
        # Date/immutability/hash tests stay runnable without a system PDF parser.
        # The separate parser integration test below uses real PDF documents.
        self.pdf_check = patch("freeze_talk.validate_pdf").start()
        self.addCleanup(patch.stopall)

    def freeze(self, now=ON_EVENT, event=EVENT):
        return freeze_talk(event, self.root, now=now)

    def assert_unstarted(self):
        for name in MARKERS:
            self.assertFalse((self.event / name).exists(), name)
        self.assertFalse((self.event / ".freeze.lock").exists())
        self.assertFalse(list(self.event.glob(".freeze-stage-*")))

    def test_requires_explicit_supported_event(self):
        for event in ("", "vorlage", "tugle-2026-11-03", "../mtug-2026-11-09"):
            with self.subTest(event=event), self.assertRaises(ValueError):
                self.freeze(event=event)
        self.assert_unstarted()

    def test_berlin_date_blocks_one_minute_before_event(self):
        with self.assertRaisesRegex(ValueError, "before 9 November"):
            self.freeze(datetime(2026, 11, 8, 22, 59, tzinfo=timezone.utc))
        self.pdf_check.assert_not_called()
        self.assert_unstarted()

    def test_naive_clock_is_not_accepted(self):
        with self.assertRaisesRegex(ValueError, "timezone"):
            self.freeze(datetime(2026, 11, 9))
        self.assert_unstarted()

    def test_at_berlin_midnight_copies_complete_site_and_hashes_sources(self):
        (self.site / ".nojekyll").write_text("")
        (self.site / "assets").mkdir()
        (self.site / "assets" / "app.js").write_text("renderTalk()")
        (self.source / "components").mkdir()
        (self.source / "components" / "Slide.vue").write_text("<template>MTUG</template>")
        (self.source / ".npmrc").write_text("ignore-scripts=true\n")
        for ignored in ("node_modules", ".slidev"):
            (self.source / ignored).mkdir()
            (self.source / ignored / "cache.txt").write_text("not an archival input")
        # Ignore rules only concern source caches at the top level.
        (self.site / "node_modules").mkdir()
        (self.site / "node_modules" / "keep.txt").write_text("a built artifact")
        nested = self.source / "components" / "node_modules"
        nested.mkdir()
        (nested / "keep.txt").write_text("a nested source fixture")

        snapshot = self.freeze()
        built = json.loads((self.event / "snapshot.sha256.json").read_text())
        sources = json.loads((self.event / "source.sha256.json").read_text())
        expected = {"index.html", PDF, ".nojekyll", "assets/app.js", "node_modules/keep.txt"}
        self.assertEqual(set(built), expected)
        self.assertEqual(set(sources), {"slides.md", ".npmrc", "components/Slide.vue", "components/node_modules/keep.txt"})
        for path, digest in built.items():
            self.assertEqual((snapshot / path).read_bytes(), (self.site / path).read_bytes())
            self.assertEqual(digest, hashlib.sha256((snapshot / path).read_bytes()).hexdigest())
        for path, digest in sources.items():
            self.assertEqual(digest, hashlib.sha256((self.source / path).read_bytes()).hexdigest())
        self.pdf_check.assert_called_once_with(self.site / PDF)

    def test_any_existing_archive_component_prevents_overwrite(self):
        for name in MARKERS:
            with self.subTest(marker=name):
                marker = self.event / name
                if name == "snapshot":
                    marker.mkdir()
                    (marker / "retained.txt").write_text("original")
                else:
                    marker.write_text("original")
                with self.assertRaises(FileExistsError):
                    self.freeze()
                original = marker / "retained.txt" if marker.is_dir() else marker
                self.assertEqual(original.read_text(), "original")
                if marker.is_dir():
                    shutil.rmtree(marker)
                else:
                    marker.unlink()
        self.pdf_check.assert_not_called()
        self.assert_unstarted()

    def test_dangling_archive_symlink_counts_as_started(self):
        marker = self.event / "source.sha256.json"
        marker.symlink_to(self.root / "absent")
        with self.assertRaises(FileExistsError):
            self.freeze()
        self.assertTrue(marker.is_symlink())

    def test_existing_lock_blocks_a_concurrent_or_interrupted_freeze(self):
        (self.event / ".freeze.lock").mkdir()
        with self.assertRaisesRegex(FileExistsError, "active or interrupted"):
            self.freeze()
        self.assertTrue((self.event / ".freeze.lock").is_dir())

    def test_repeated_freeze_does_not_update_an_existing_archive(self):
        snapshot = self.freeze()
        original = (snapshot / "index.html").read_bytes()
        (self.site / "index.html").write_text("later edit")
        with self.assertRaises(FileExistsError):
            self.freeze(datetime(2026, 11, 10, tzinfo=timezone.utc))
        self.assertEqual((snapshot / "index.html").read_bytes(), original)

    def test_missing_required_build_files_fail_before_archive_creation(self):
        for name in ("index.html", PDF):
            with self.subTest(name=name):
                contents = (self.site / name).read_bytes()
                (self.site / name).unlink()
                with self.assertRaises(FileNotFoundError):
                    self.freeze()
                self.assert_unstarted()
                (self.site / name).write_bytes(contents)

    def test_source_metadata_and_public_notes_are_validated(self):
        for invalid in (
            SLIDES.replace("9. November 2026", "3. November 2026"),
            SLIDES.replace("MTUG", "TUGLE"),
            SLIDES.replace("presenter: false", "presenter: true"),
            SLIDES.replace("record: false", "record: true"),
            SLIDES.replace("download: ./MTUG", "download: ./TUGLE"),
            SLIDES.replace("exportFilename: MTUG", "exportFilename: TUGLE"),
            SLIDES + "\n<!-- Private speaker notes -->\n",
            SLIDES + "\nnotes: Private speaker notes\n",
        ):
            with self.subTest(invalid=invalid):
                (self.source / "slides.md").write_text(invalid, encoding="utf-8")
                with self.assertRaises(ValueError):
                    self.freeze()
                self.assert_unstarted()

    def test_symlinks_in_both_input_trees_are_rejected(self):
        for directory in (self.site, self.source):
            with self.subTest(directory=directory):
                link = directory / "redirected.txt"
                link.symlink_to(self.site / "index.html")
                with self.assertRaisesRegex(ValueError, "symbolic link"):
                    self.freeze()
                self.assert_unstarted()
                link.unlink()

    def test_invalid_pdf_is_rejected_before_staging(self):
        self.pdf_check.side_effect = ValueError("Invalid PDF")
        with self.assertRaisesRegex(ValueError, "Invalid PDF"):
            self.freeze()
        self.assert_unstarted()

    def test_source_change_during_staging_aborts_without_markers(self):
        copy = shutil.copytree

        def changed_source(*args, **kwargs):
            result = copy(*args, **kwargs)
            (self.source / "slides.md").write_text(SLIDES + "\nChanged during freeze\n", encoding="utf-8")
            return result

        with patch("freeze_talk.shutil.copytree", side_effect=changed_source):
            with self.assertRaisesRegex(ValueError, "changed during"):
                self.freeze()
        self.assert_unstarted()

    def test_interrupted_promotion_leaves_a_marker_and_cannot_be_retried(self):
        with patch("freeze_talk.os.link", side_effect=OSError("interrupted")):
            with self.assertRaisesRegex(OSError, "interrupted"):
                self.freeze()
        self.assertTrue((self.event / "snapshot" / "index.html").is_file())
        with self.assertRaises(FileExistsError):
            self.freeze()


class PdfValidationTests(unittest.TestCase):
    @unittest.skipUnless(shutil.which("pdfinfo"), "pdfinfo is needed for the real PDF parser integration")
    def test_real_pdf_is_accepted_and_header_only_document_is_rejected(self):
        with TemporaryDirectory() as temporary:
            path = Path(temporary) / PDF
            path.write_bytes(pdf_fixture())
            validate_pdf(path)
            path.write_bytes(b"%PDF-1.7\nnot a document\n%%EOF\n")
            with self.assertRaises(ValueError):
                validate_pdf(path)

    def test_missing_parser_fails_closed(self):
        with TemporaryDirectory() as temporary:
            path = Path(temporary) / PDF
            path.write_bytes(pdf_fixture())
            with patch("freeze_talk.shutil.which", return_value=None):
                with self.assertRaisesRegex(RuntimeError, "pdfinfo"):
                    validate_pdf(path)


if __name__ == "__main__":
    unittest.main()
