"""Publish the editable template and event decks without rebuilding frozen talks."""
from hashlib import sha256
import json
from pathlib import Path, PurePosixPath
import re
import shutil

ROOT = Path(__file__).resolve().parents[1]
TEMPLATE = "vorlage"
ARCHIVE = "tugle-2026-11-03"
EVENT = "tmuc-2026-11-09"
PDFS = {
    TEMPLATE: "KI-in-TYPO3.pdf",
    ARCHIVE: "TUGLE-KI-in-TYPO3.pdf",
    EVENT: "TMUC-KI-in-TYPO3.pdf",
}
FREEZE_PARTS = ("snapshot", "snapshot.sha256.json", "source.sha256.json")


def _reject_redirected(path):
    if path.is_symlink() or path.resolve() != path:
        raise ValueError(f"Refusing redirected publication path: {path}")


def _files(tree, ignored=()):
    """Inventory regular files, rejecting redirects and pruning local tooling."""
    _reject_redirected(tree)
    if not tree.is_dir():
        raise FileNotFoundError(tree)
    files = {}

    def walk(directory):
        for path in sorted(directory.iterdir()):
            if directory == tree and path.name in ignored:
                continue
            _reject_redirected(path)
            if path.is_dir():
                walk(path)
            elif path.is_file():
                files[path.relative_to(tree).as_posix()] = path
            else:
                raise ValueError(f"Not a regular publication file: {path}")

    walk(tree)
    return files


def _unique_keys(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError(f"Duplicate snapshot manifest entry: {key}")
        result[key] = value
    return result


def _verify_manifest(files, manifest_path):
    _reject_redirected(manifest_path)
    if not manifest_path.is_file():
        raise FileNotFoundError(manifest_path)
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"), object_pairs_hook=_unique_keys)
    if not isinstance(manifest, dict) or not manifest:
        raise ValueError(f"Expected a non-empty file-to-SHA256 manifest: {manifest_path}")
    for name, digest in manifest.items():
        path = PurePosixPath(name)
        if (not name or path.is_absolute() or ".." in path.parts
                or path.as_posix() != name or "\\" in name
                or not isinstance(digest, str) or not re.fullmatch(r"[0-9a-f]{64}", digest)):
            raise ValueError(f"Invalid snapshot manifest entry: {name}")
    if set(manifest) != set(files):
        missing = sorted(set(manifest) - set(files))
        extra = sorted(set(files) - set(manifest))
        raise ValueError(f"Snapshot file inventory changed in {manifest_path}: missing={missing}, extra={extra}")
    for name, path in files.items():
        if sha256(path.read_bytes()).hexdigest() != manifest[name]:
            raise ValueError(f"Frozen file changed: {path}")


def _prepare(root, slug):
    talk = root / "talks" / slug
    # A partial freeze must fail closed, never silently select a fresh build.
    frozen = slug == ARCHIVE or (slug == EVENT and any(
        (talk / part).exists() or (talk / part).is_symlink() for part in FREEZE_PARTS
    ))
    source = talk / ("snapshot" if frozen else "site")
    public = root / "public"
    target = public / "vortraege" / slug
    for path in (talk, source, public, target.parent, target):
        _reject_redirected(path)
        if path.exists() and not path.is_dir():
            raise ValueError(f"Expected a publication directory: {path}")
    files = _files(source)
    for name in ("index.html", PDFS[slug]):
        if name not in files:
            raise FileNotFoundError(source / name)
    if not files[PDFS[slug]].read_bytes().startswith(b"%PDF-"):
        raise ValueError(f"Talk PDF is not a PDF: {source / PDFS[slug]}")
    if frozen:
        _verify_manifest(files, talk / "snapshot.sha256.json")
        _verify_manifest(
            _files(talk / "source", ignored=("node_modules", ".slidev")),
            talk / "source.sha256.json",
        )
    return source, target


def publish(root=ROOT):
    root = Path(root).resolve()
    # Validate EVERY source and destination before changing ANY published talk.
    prepared = [_prepare(root, slug) for slug in (TEMPLATE, ARCHIVE, EVENT)]
    for source, target in prepared:
        target.parent.mkdir(parents=True, exist_ok=True)
        if target.exists():
            shutil.rmtree(target)
        shutil.copytree(source, target)
        print(f"Published talk into {target.relative_to(root)}; stack files retained")


if __name__ == "__main__":
    publish()
