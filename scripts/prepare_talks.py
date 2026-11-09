"""Derive the upcoming event edition from the neutral template; never touch archives."""
from pathlib import Path
import json
import os
import re
import shutil

ROOT = Path(__file__).resolve().parents[1]
EVENT = 'mtug-2026-11-09'
MARKERS = ('snapshot', 'snapshot.sha256.json', 'source.sha256.json')
SECTION_LABELS = {1: 'Möglichkeiten', 2: 'Fragen', 3: 'Antworten', 4: 'Agenten', 5: 'Einordnung'}


def slide_outline(source):
    """Read the explicitly declared navigation metadata, without rendering slides."""
    chunks = re.split(r'^---\s*$', source, flags=re.MULTILINE)
    if len(chunks) < 3 or len(chunks) % 2 != 1 or chunks[0].strip():
        raise ValueError('Invalid slide frontmatter structure')
    slides = []
    for index in range(1, len(chunks), 2):
        metadata = {}
        for key in ('title', 'section', 'sectionTitle', 'sectionDivider', 'talkPage', 'talkTotal', 'appendix'):
            match = re.search(r'^' + key + r':\s*(.*)$', chunks[index], flags=re.MULTILINE)
            if not match:
                raise ValueError(f'Missing slide metadata: {key}')
            raw = match.group(1)
            try:
                metadata[key] = json.loads(raw)
            except json.JSONDecodeError:
                metadata[key] = raw
        metadata['body'] = chunks[index + 1]
        slides.append(metadata)
    main = [slide for slide in slides if not slide['appendix']]
    if not main or slides[:len(main)] != main:
        raise ValueError('Main slides must precede the appendix')
    if any(slide['talkTotal'] != len(main) for slide in slides):
        raise ValueError('Inconsistent main-slide total')
    if any(slide['talkPage'] != min(index, len(main)) for index, slide in enumerate(slides, 1)):
        raise ValueError('Inconsistent main-slide page number')
    return slides


def progress_sections(slides):
    """Keep the introduction outside the five numbered, contiguous sections."""
    sections = []
    for page, slide in enumerate(slides, 1):
        if slide['appendix']:
            continue
        number = slide['section']
        if type(number) is not int or number < 0:
            raise ValueError('Invalid section number')
        if number == 0:
            if sections or slide['sectionDivider']:
                raise ValueError('Introduction must precede all numbered sections without a divider')
            continue
        if not sections or sections[-1]['number'] != number:
            if number != len(sections) + 1 or number not in SECTION_LABELS or not slide['sectionDivider']:
                raise ValueError('Each numbered section must start with its own divider in order')
            sections.append({'number': number, 'label': SECTION_LABELS[number],
                             'title': slide['sectionTitle'], 'start': page, 'end': page})
        else:
            if slide['sectionDivider'] or slide['sectionTitle'] != sections[-1]['title']:
                raise ValueError('Inconsistent section title or repeated divider')
            sections[-1]['end'] = page
    if not slides or slides[0]['section'] != 0 or len(sections) != len(SECTION_LABELS):
        raise ValueError('Expected an unnumbered introduction and five main sections')
    for slide in slides:
        for jump in re.findall(r'<NrJump\b[^>]*:page="(\d+)"', slide['body']):
            if not 1 <= int(jump) <= len(slides):
                raise ValueError('Jump target is outside the presentation')
    return sections


def navigation_updates(master, source):
    """Validate all generated navigation before writing any source file."""
    slides = slide_outline(source)
    updates = {master / 'progress-sections.json': json.dumps(progress_sections(slides), ensure_ascii=False, indent=2) + '\n'}
    proof = master / 'public/pruefbeispiel/index.html'
    if proof.exists():
        owners = [page for page, slide in enumerate(slides, 1)
                  if not slide['appendix'] and 'href="pruefbeispiel/index.html"' in slide['body']]
        if len(owners) != 1:
            raise ValueError('Expected one main slide linking to the proof example')
        html, count = re.subn(r'(<a class="back" href=")\.\./#/\d+(" >|">)',
                              lambda match: f'{match[1]}../#/{owners[0]}{match[2]}',
                              proof.read_text(encoding='utf-8'))
        if count != 1:
            raise ValueError('Expected one proof-page return link')
        updates[proof] = html
    return updates


def prepare(root=ROOT):
    root = Path(root).resolve()
    event = root / 'talks' / EVENT
    markers = [(event / name).exists() or (event / name).is_symlink() for name in MARKERS]
    if any(markers) and not all(markers):
        raise ValueError('Incomplete frozen MTUG archive: refusing to regenerate its source')
    frozen = all(markers)
    master = root / 'talks/vorlage/source'
    target = event / 'source'
    for path in (master, event, target):
        if path.is_symlink() or path.resolve() != path:
            raise ValueError(f'Redirected edition path: {path}')
    for directory, subdirs, names in os.walk(master):
        subdirs[:] = [name for name in subdirs if name not in {'node_modules', '.slidev'}]
        if any((Path(directory) / name).is_symlink() for name in [*subdirs, *names]):
            raise ValueError('Template contains a symbolic link')
    # Validate the template before replacing any active event source.
    slides = (master / 'slides.md').read_text(encoding='utf-8')
    old = 'Neutrale, fortlaufend gepflegte Vorlage.'
    if old not in slides:
        raise ValueError('Missing neutral edition metadata')
    updates = navigation_updates(master, slides)
    if frozen:
        for path, content in updates.items():
            path.write_text(content, encoding='utf-8')
        print('Prepared master navigation; MTUG source is frozen and unchanged')
        return
    package = json.loads((master / 'package.json').read_text())
    lock = json.loads((master / 'package-lock.json').read_text())
    if not isinstance(package.get('scripts'), dict) or not isinstance(lock.get('packages', {}).get(''), dict):
        raise ValueError('Invalid template package or lock metadata')
    for path, content in updates.items():
        path.write_text(content, encoding='utf-8')
    target.mkdir(parents=True, exist_ok=True)
    # Remove stale generated source, retaining only the installed dependencies.
    for entry in target.iterdir():
        if entry.name == 'node_modules':
            continue
        if entry.is_symlink() or entry.is_file():
            entry.unlink()
        else:
            shutil.rmtree(entry)
    shutil.copytree(master, target, dirs_exist_ok=True, ignore=shutil.ignore_patterns('node_modules', '.slidev', '*.pdf'))
    slides = slides.replace(old, 'MTUG · TYPO3 User Group München · 9. November 2026.')
    slides = slides.replace('Anwendungen · Fragen · gemeinsame Grundlagen</div>', 'MTUG · 9. November 2026</div>', 1)
    slides = slides.replace('Sebastian Mendel · Netresearch</div>', 'Sebastian Mendel · Netresearch<br>9. November 2026</div>', 1)
    slides = slides.replace('download: ./KI-in-TYPO3.pdf', 'download: ./MTUG-KI-in-TYPO3.pdf')
    slides = slides.replace('exportFilename: KI-in-TYPO3', 'exportFilename: MTUG-KI-in-TYPO3')
    slides = slides.replace('print-href="https://netresearch.github.io/modularer-ki-stack-page/vortraege/vorlage/',
                            'print-href="https://netresearch.github.io/modularer-ki-stack-page/vortraege/mtug-2026-11-09/')
    (target / 'slides.md').write_text(slides)
    package['name'] = 'mtug-2026-11-09-ki-in-typo3'
    package['scripts']['export'] = 'slidev export slides.md --output public/MTUG-KI-in-TYPO3.pdf'
    (target / 'package.json').write_text(json.dumps(package, indent=2) + '\n')
    lock['name'] = package['name']
    lock['packages']['']['name'] = package['name']
    (target / 'package-lock.json').write_text(json.dumps(lock, indent=2) + '\n')
    print('Prepared MTUG edition from vorlage; no archive modified')


if __name__ == '__main__':
    prepare()
