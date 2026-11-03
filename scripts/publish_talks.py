"""Assemble the known, verified talk without replacing the stack website."""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
TALK = "tugle-2026-11-03"
PDF = "TUGLE-KI-in-TYPO3.pdf"


def publish(root=ROOT):
    root = Path(root).resolve()
    source = root / "talks" / TALK / "site"
    public = root / "public"
    target = public / "vortraege" / TALK
    # Reject redirected trees before deleting even the known talk destination.
    for path in (source, public, target.parent, target):
        if path.is_symlink() or path.resolve() != path:
            raise ValueError(f"Refusing redirected publication path: {path}")
    for name in ("index.html", PDF):
        if not (source / name).is_file():
            raise FileNotFoundError(source / name)
    if not (source / PDF).read_bytes().startswith(b"%PDF-"):
        raise ValueError("Talk PDF is not a PDF")
    if any(path.is_symlink() for path in source.rglob("*")):
        raise ValueError("Talk build contains a symbolic link")
    target.parent.mkdir(parents=True, exist_ok=True)
    if target.exists():
        shutil.rmtree(target)
    shutil.copytree(source, target)
    print(f"Published talk into {target.relative_to(root)}; stack files retained")


if __name__ == "__main__":
    publish()
