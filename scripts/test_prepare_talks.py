"""Event preparation must preserve archives while deriving active editions."""
import json
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest

from prepare_talks import EVENT, MARKERS, prepare


INTRO = [(0, False, 'KI in TYPO3', 'Auftakt', ''), (0, False, 'Agenda', 'Auftakt', '')]
CONTENT = [
    (1, True, 'Möglichkeiten', 'Möglichkeiten', ''),
    (1, False, 'Gemeinsame Inhalte', 'Möglichkeiten', 'Dieser Inhalt gehört beiden aktiven Fassungen.'),
    (2, True, 'Fragen', 'Fragen zum KI-Einsatz', ''),
    (3, True, 'Antworten', 'Antworten und Grenzen', ''),
    (3, False, 'Prüfbeispiel', 'Antworten und Grenzen', '<NrLink href="pruefbeispiel/index.html">Proof</NrLink>'),
    (4, True, 'Agentenwege', 'Agentenwege', ''),
    (5, True, 'Einordnung', 'Einordnung & Austausch', ''),
]
EDITION = """info: |
  KI in TYPO3. Neutrale, fortlaufend gepflegte Vorlage.
presenter: false
record: false
download: ./KI-in-TYPO3.pdf
exportFilename: KI-in-TYPO3
"""
COVER = """
<div class="nr-kicker">Anwendungen · Fragen · gemeinsame Grundlagen</div>
<div class="nr-author">Sebastian Mendel · Netresearch</div>
"""


def fixture_slides(intro=INTRO):
    main = [*intro, *CONTENT]
    entries = [*main, (5, False, 'Reserve', 'Einordnung & Austausch', 'Anhang')]
    chunks = []
    for page, (section, divider, title, section_title, body) in enumerate(entries, 1):
        chunks.append(f'''---
title: {title}
section: {section}
sectionTitle: {json.dumps(section_title, ensure_ascii=False)}
sectionDivider: {str(divider).lower()}
talkPage: {min(page, len(main))}
talkTotal: {len(main)}
appendix: {json.dumps('technical' if page > len(main) else '')}
{EDITION if page == 1 else ''}---
# {title}
{COVER if page == 1 else body}
''')
    return ''.join(chunks)


SLIDES = fixture_slides()


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
        self.proof = self.master / 'public/pruefbeispiel/index.html'
        self.proof.parent.mkdir(parents=True)
        self.proof.write_text('<a class="back" href="../#/999">Zurück</a>', encoding='utf-8')
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
        self.assertIn('MTUG · TYPO3 User Group München · 9. November 2026.', actual)
        self.assertIn('MTUG · 9. November 2026</div>', actual)
        self.assertIn('Netresearch<br>9. November 2026</div>', actual)
        self.assertIn('download: ./MTUG-KI-in-TYPO3.pdf', actual)
        self.assertIn('exportFilename: MTUG-KI-in-TYPO3', actual)
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

    def test_complete_freeze_preserves_event_while_master_navigation_keeps_up(self):
        (self.event / 'snapshot').mkdir()
        for name in MARKERS[1:]:
            (self.event / name).write_text('{}')
        (self.master / 'slides.md').write_text(fixture_slides([*INTRO, (0, False, 'Zusätzlicher Auftakt', 'Auftakt', '')]))
        before = self.target_files()
        prepare(self.root)
        self.assertEqual(self.target_files(), before)
        sections = json.loads((self.master / 'progress-sections.json').read_text())
        self.assertEqual(sections[0]['start'], 4)
        self.assertIn('href="../#/8"', self.proof.read_text())

    def test_navigation_excludes_intro_and_appendix_and_is_shared_with_event(self):
        prepare(self.root)
        sections = json.loads((self.master / 'progress-sections.json').read_text())
        self.assertEqual([section['number'] for section in sections], [1, 2, 3, 4, 5])
        self.assertEqual((sections[0]['start'], sections[0]['end']), (3, 4))
        self.assertEqual(sections[-1]['end'], len(INTRO) + len(CONTENT))
        self.assertEqual((self.master / 'progress-sections.json').read_bytes(),
                         (self.target / 'progress-sections.json').read_bytes())
        self.assertIn('href="../#/7"', self.proof.read_text())
        self.assertEqual(self.proof.read_bytes(), (self.target / 'public/pruefbeispiel/index.html').read_bytes())

    def test_inserted_intro_moves_section_start_and_proof_return_together(self):
        (self.master / 'slides.md').write_text(fixture_slides([*INTRO, (0, False, 'Vorwissen', 'Auftakt', '')]))
        prepare(self.root)
        sections = json.loads((self.master / 'progress-sections.json').read_text())
        self.assertEqual(sections[0]['start'], 4)
        self.assertIn('href="../#/8"', self.proof.read_text())

    def test_invalid_outline_is_rejected_before_existing_event_is_changed(self):
        before = self.target_files()
        variants = {
            'numbered intro': SLIDES.replace('section: 0', 'section: 1', 1),
            'missing divider': SLIDES.replace('sectionDivider: true', 'sectionDivider: false', 1),
            'wrong total': SLIDES.replace('talkTotal: 9', 'talkTotal: 99', 1),
            'invalid jump': SLIDES + '<NrJump :page="999">Out of bounds</NrJump>',
        }
        for name, source in variants.items():
            with self.subTest(name=name):
                (self.master / 'slides.md').write_text(source)
                with self.assertRaises(ValueError):
                    prepare(self.root)
                self.assertEqual(self.target_files(), before)
                self.assertIn('href="../#/999"', self.proof.read_text())

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
