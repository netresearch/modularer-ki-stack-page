"""Event preparation must preserve archives while deriving active editions."""
import json
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest

from prepare_talks import EVENT, MARKERS, prepare


SLIDES = """---
title: KI in TYPO3
info: |
  KI in TYPO3. Neutrale, fortlaufend gepflegte Vorlage.
presenter: false
record: false
download: ./KI-in-TYPO3.pdf
exportFilename: KI-in-TYPO3
---
<div class="nr-kicker">Anwendungen · Fragen · gemeinsame Grundlagen</div>
<div class="nr-author">Sebastian Mendel · Netresearch</div>
---
title: Gemeinsame Inhalte
---
# Gemeinsame Inhalte

Dieser Inhalt gehört beiden aktiven Fassungen.
"""


class PrepareTalkTests(unittest.TestCase):
    def setUp(self):
        temporary = TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.root = Path(temporary.name)
        self.master = self.root / 'talks/vorlage/source'
        self.event = self.root / 'talks' / EVENT
        self.target = self.event / 'source'
        self.master.mkdir(parents=True)
        self.target.mkdir(parents=True)
        (self.master / 'slides.md').write_text(SLIDES, encoding='utf-8')
        (self.master / 'package.json').write_text(json.dumps({
            'name': 'vorlage', 'scripts': {'export': 'template export'},
            'devDependencies': {'example': '1.0.0'},
        }))
        (self.master / 'package-lock.json').write_text(json.dumps({
            'name': 'vorlage', 'packages': {'': {'name': 'vorlage'}, 'node_modules/example': {'version': '1.0.0'}},
        }))
        (self.target / 'slides.md').write_text('existing event source')
        (self.target / 'old.txt').write_text('stale active file')
        self.archive = self.root / 'talks/tugle-2026-11-03/snapshot'
        self.archive.mkdir(parents=True)
        (self.archive / 'index.html').write_text('frozen TUGLE')

    def target_files(self):
        return {p.relative_to(self.target).as_posix(): p.read_bytes()
                for p in self.target.rglob('*') if p.is_file()}

    def test_invalid_template_preserves_existing_event_source(self):
        before = self.target_files()
        for name, invalid in [('slides.md', 'missing neutral metadata'), ('package.json', '{}'), ('package-lock.json', '{}')]:
            with self.subTest(name=name):
                path = self.master / name
                original = path.read_bytes()
                path.write_text(invalid)
                try:
                    with self.assertRaises(ValueError):
                        prepare(self.root)
                    self.assertEqual(self.target_files(), before)
                finally:
                    path.write_bytes(original)

    def test_derives_event_metadata_and_keeps_shared_content(self):
        master_before = (self.master / 'slides.md').read_bytes()
        dependency = self.target / 'node_modules/existing'
        dependency.mkdir(parents=True)
        (dependency / 'installed.txt').write_text('keep installed dependencies')

        prepare(self.root)

        actual = (self.target / 'slides.md').read_text(encoding='utf-8')
        self.assertIn('TMUC · TYPO3 User Group München · 9. November 2026.', actual)
        self.assertIn('TMUC · 9. November 2026</div>', actual)
        self.assertIn('Netresearch<br>9. November 2026</div>', actual)
        self.assertIn('download: ./TMUC-KI-in-TYPO3.pdf', actual)
        self.assertIn('exportFilename: TMUC-KI-in-TYPO3', actual)
        self.assertEqual(actual.split('title: Gemeinsame Inhalte', 1)[1], SLIDES.split('title: Gemeinsame Inhalte', 1)[1])
        self.assertEqual((self.master / 'slides.md').read_bytes(), master_before)
        self.assertEqual((self.archive / 'index.html').read_text(), 'frozen TUGLE')
        self.assertTrue((dependency / 'installed.txt').is_file())
        self.assertFalse((self.target / 'old.txt').exists())
        package = json.loads((self.target / 'package.json').read_text())
        lock = json.loads((self.target / 'package-lock.json').read_text())
        self.assertEqual(package['name'], lock['name'])
        self.assertEqual(package['name'], lock['packages']['']['name'])
        self.assertEqual(lock['packages']['node_modules/example']['version'], '1.0.0')

    def test_complete_freeze_preserves_event_even_when_template_changes(self):
        (self.event / 'snapshot').mkdir()
        for name in MARKERS[1:]:
            (self.event / name).write_text('{}')
        (self.master / 'slides.md').write_text('changed template, irrelevant to archived event')
        before = self.target_files()
        prepare(self.root)
        self.assertEqual(self.target_files(), before)

    def test_pdf_proof_link_uses_event_while_template_reference_stays_neutral(self):
        neutral = 'https://netresearch.github.io/modularer-ki-stack-page/vortraege/vorlage/'
        (self.master / 'slides.md').write_text(SLIDES + (
            f'<NrLink href="pruefbeispiel/index.html" print-href="{neutral}pruefbeispiel/index.html">Proof</NrLink>\n'
            f'<NrLink href="{neutral}">Current template</NrLink>\n'
        ))
        prepare(self.root)
        actual = (self.target / 'slides.md').read_text()
        self.assertIn('print-href="' + neutral.replace('vorlage/', EVENT + '/') + 'pruefbeispiel/index.html"', actual)
        self.assertIn(f'href="{neutral}">Current template', actual)

    def test_each_partial_freeze_marker_prevents_source_changes(self):
        before = self.target_files()
        for name in MARKERS:
            with self.subTest(marker=name):
                marker = self.event / name
                marker.write_text('incomplete freeze')
                with self.assertRaisesRegex(ValueError, 'Incomplete frozen'):
                    prepare(self.root)
                self.assertEqual(self.target_files(), before)
                marker.unlink()

    def test_each_dangling_marker_prevents_source_changes(self):
        before = self.target_files()
        for name in MARKERS:
            with self.subTest(marker=name):
                marker = self.event / name
                marker.symlink_to(self.root / 'missing-archive-part')
                with self.assertRaisesRegex(ValueError, 'Incomplete frozen'):
                    prepare(self.root)
                self.assertEqual(self.target_files(), before)
                marker.unlink()

    def test_source_symlink_rejected_before_existing_event_is_changed(self):
        (self.master / 'external').symlink_to(self.archive, target_is_directory=True)
        before = self.target_files()
        with self.assertRaisesRegex(ValueError, 'symbolic link'):
            prepare(self.root)
        self.assertEqual(self.target_files(), before)


if __name__ == '__main__':
    unittest.main()
