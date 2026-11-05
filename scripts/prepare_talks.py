"""Derive the upcoming event edition from the neutral template; never touch archives."""
from pathlib import Path
import json
import os
import shutil

ROOT = Path(__file__).resolve().parents[1]
EVENT = 'tmuc-2026-11-09'
MARKERS = ('snapshot', 'snapshot.sha256.json', 'source.sha256.json')


def prepare(root=ROOT):
    root = Path(root).resolve()
    event = root / 'talks' / EVENT
    markers = [(event / name).exists() or (event / name).is_symlink() for name in MARKERS]
    if any(markers):
        if not all(markers):
            raise ValueError('Incomplete frozen TMUC archive: refusing to regenerate its source')
        print('TMUC source is frozen; keeping it unchanged')
        return
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
    slides = (master / 'slides.md').read_text()
    old = 'Neutrale, fortlaufend gepflegte Vorlage.'
    if old not in slides:
        raise ValueError('Missing neutral edition metadata')
    package = json.loads((master / 'package.json').read_text())
    lock = json.loads((master / 'package-lock.json').read_text())
    if not isinstance(package.get('scripts'), dict) or not isinstance(lock.get('packages', {}).get(''), dict):
        raise ValueError('Invalid template package or lock metadata')
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
    slides = slides.replace(old, 'TMUC · TYPO3 User Group München · 9. November 2026.')
    slides = slides.replace('Anwendungen · Fragen · gemeinsame Grundlagen</div>', 'TMUC · 9. November 2026</div>', 1)
    slides = slides.replace('Sebastian Mendel · Netresearch</div>', 'Sebastian Mendel · Netresearch<br>9. November 2026</div>', 1)
    slides = slides.replace('download: ./KI-in-TYPO3.pdf', 'download: ./TMUC-KI-in-TYPO3.pdf')
    slides = slides.replace('exportFilename: KI-in-TYPO3', 'exportFilename: TMUC-KI-in-TYPO3')
    slides = slides.replace('print-href="https://netresearch.github.io/modularer-ki-stack-page/vortraege/vorlage/',
                            'print-href="https://netresearch.github.io/modularer-ki-stack-page/vortraege/tmuc-2026-11-09/')
    (target / 'slides.md').write_text(slides)
    package['name'] = 'tmuc-2026-11-09-ki-in-typo3'
    package['scripts']['export'] = 'slidev export slides.md --output public/TMUC-KI-in-TYPO3.pdf'
    (target / 'package.json').write_text(json.dumps(package, indent=2) + '\n')
    lock['name'] = package['name']
    lock['packages']['']['name'] = package['name']
    (target / 'package-lock.json').write_text(json.dumps(lock, indent=2) + '\n')
    print('Prepared TMUC edition from vorlage; no archive modified')


if __name__ == '__main__':
    prepare()
