"""Keep the recorded proof, bundled original sources and active slides in sync."""
from hashlib import sha1, sha256
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import shutil
from tempfile import TemporaryDirectory
import unittest
from zipfile import ZipFile


ROOT = Path(__file__).resolve().parents[1]
EDITIONS = ('vorlage', 'tmuc-2026-11-09')
UPSTREAM = 'https://github.com/netresearch/t3x-nr-llm'
ORIGINALS = {
    'Classes/Service/Schema/StrictSchemaSubset.php',
    'Classes/Service/Schema/JsonSchemaValidator.php',
    'LICENSE',
}


class ProofDataParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.records = []
        self.current = None

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if tag == 'script' and attributes.get('id') == 'proof-data':
            self.current = []

    def handle_data(self, data):
        if self.current is not None:
            self.current.append(data)

    def handle_endtag(self, tag):
        if tag == 'script' and self.current is not None:
            self.records.append(''.join(self.current))
            self.current = None


def require(condition, message):
    if not condition:
        raise ValueError(message)


def verify_proof(source):
    """Check local consistency; upstream tag authenticity still needs review."""
    proof_dir = source / 'public/pruefbeispiel'
    proof = json.loads((proof_dir / 'quality-proof.json').read_text(encoding='utf-8'))
    html = (proof_dir / 'index.html').read_text(encoding='utf-8')
    parser = ProofDataParser()
    parser.feed(html)
    require(len(parser.records) == 1, 'Expected one embedded proof-data record')
    require(json.loads(parser.records[0]) == proof, 'HTML and JSON proof differ')

    metadata = proof['source']
    version, commit = metadata['version'], metadata['commit']
    require(re.fullmatch(r'\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?', version), 'Invalid proof version')
    require(re.fullmatch(r'[0-9a-f]{40}', commit), 'Expected a full source commit')
    require(metadata['sourceFilesUnmodified'] is True, 'Proof must use unmodified sources')
    require(f'nr-llm {version}' in proof['scope']['executed'], 'Recorded scope version differs')

    with ZipFile(proof_dir / 'quality-proof.zip') as archive:
        require(len(archive.namelist()) == len(set(archive.namelist())), 'Duplicate ZIP members')
        require(json.loads(archive.read('quality-proof.json')) == proof, 'ZIP and JSON proof differ')
        manifest = json.loads(archive.read('quality-proof-source/source.json'))
        require(manifest == metadata, 'ZIP source manifest and proof differ')
        files = manifest['files']
        paths = {entry['path'] for entry in files}
        require(len(files) == len(paths) and paths == ORIGINALS, 'Original source manifest is incomplete')
        for entry in files:
            path = entry['path']
            content = archive.read('quality-proof-source/' + path)
            require(sha256(content).hexdigest() == entry['sha256'], f'Source SHA-256 differs: {path}')
            git_blob = sha1(f'blob {len(content)}\0'.encode() + content, usedforsecurity=False).hexdigest()
            require(git_blob == entry['gitBlob'], f'Source Git blob differs: {path}')
            require(entry['url'] == f'{UPSTREAM}/blob/{commit}/{path}', f'Source URL differs: {path}')
        recorded = archive.read('quality-proof-run.txt').decode('utf-8')
        require('Exit code: 0\n' in recorded, 'Recorded proof run did not succeed')
        marker = 'STDOUT (unmodified):\n'
        require(marker in recorded, 'Recorded proof output is missing')
        require(json.loads(recorded.split(marker, 1)[1]) == proof, 'Run log and JSON proof differ')

    slides = (source / 'slides.md').read_text(encoding='utf-8')
    for name, text in [('slides', slides), ('proof page', html)]:
        pins = re.findall(re.escape(UPSTREAM) + r'/(?:blob|tree)/([^/\s"<>]+)', text)
        require(pins and set(pins) == {commit}, f'{name} source commits differ')
        versions = re.findall(r'nr-llm v?(\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)', text)
        require(versions and set(versions) == {version}, f'{name} version labels differ')
    return version, commit


class ProofConsistencyTests(unittest.TestCase):
    def test_active_editions_match_their_recorded_sources(self):
        states = []
        for edition in EDITIONS:
            with self.subTest(edition=edition):
                states.append(verify_proof(ROOT / 'talks' / edition / 'source'))
        if not (ROOT / 'talks/tmuc-2026-11-09/source.sha256.json').exists():
            self.assertEqual(states[0], states[1], 'Prepare active TMUC from the current template')

    def fixture(self):
        temporary = TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        source = Path(temporary.name)
        original = ROOT / 'talks/vorlage/source'
        shutil.copytree(original / 'public/pruefbeispiel', source / 'public/pruefbeispiel')
        shutil.copyfile(original / 'slides.md', source / 'slides.md')
        return source

    def test_relabeling_public_json_and_html_does_not_update_the_recorded_run(self):
        source = self.fixture()
        proof_dir = source / 'public/pruefbeispiel'
        old = json.loads((proof_dir / 'quality-proof.json').read_text())['source']['version']
        for name in ('quality-proof.json', 'index.html'):
            path = proof_dir / name
            path.write_text(path.read_text(encoding='utf-8').replace(old, '999.999.999'), encoding='utf-8')
        with self.assertRaisesRegex(ValueError, 'ZIP and JSON proof differ'):
            verify_proof(source)

    def test_changed_original_in_zip_is_detected(self):
        source = self.fixture()
        path = source / 'public/pruefbeispiel/quality-proof.zip'
        with ZipFile(path) as archive:
            members = {name: archive.read(name) for name in archive.namelist()}
        members['quality-proof-source/Classes/Service/Schema/JsonSchemaValidator.php'] += b'\n// modified\n'
        with ZipFile(path, 'w') as archive:
            for name, content in members.items():
                archive.writestr(name, content)
        with self.assertRaisesRegex(ValueError, 'Source SHA-256 differs'):
            verify_proof(source)

    def test_stale_slide_commit_or_version_is_detected(self):
        for field, replacement, expected in [
            ('commit', '0' * 40, 'slides source commits differ'),
            ('version', '999.999.999', 'slides version labels differ'),
        ]:
            with self.subTest(field=field):
                source = self.fixture()
                proof = json.loads((source / 'public/pruefbeispiel/quality-proof.json').read_text())
                slides = source / 'slides.md'
                slides.write_text(slides.read_text(encoding='utf-8').replace(proof['source'][field], replacement), encoding='utf-8')
                with self.assertRaisesRegex(ValueError, expected):
                    verify_proof(source)


if __name__ == '__main__':
    unittest.main()
