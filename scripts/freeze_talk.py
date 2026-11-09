"""Explicitly archive the reviewed MTUG build on or after its event date.

This command never builds or publishes a talk. It needs PyYAML (already used by
this repository) and pdfinfo from poppler-utils for an actual PDF parse.
"""
from __future__ import annotations

import argparse
from datetime import date, datetime
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
from tempfile import TemporaryDirectory
from zoneinfo import ZoneInfo

import yaml


ROOT = Path(__file__).resolve().parents[1]
EVENT = "mtug-2026-11-09"
EVENT_DATE = date(2026, 11, 9)
PDF = "MTUG-KI-in-TYPO3.pdf"
SOURCE_IGNORED = frozenset({"node_modules", ".slidev"})
MARKERS = ("snapshot", "snapshot.sha256.json", "source.sha256.json")


def _reject_redirected(path: Path) -> None:
    if path.is_symlink() or path.resolve() != path:
        raise ValueError(f"Refusing redirected archive path: {path}")


def _files(directory: Path, *, sources: bool = False) -> list[Path]:
    """Include hidden files; exclude only the two top-level source caches."""
    _reject_redirected(directory)
    if not directory.is_dir():
        raise FileNotFoundError(directory)
    result = []

    def visit(parent: Path) -> None:
        for path in sorted(parent.iterdir()):
            if path.is_symlink():
                raise ValueError(f"Archive input contains a symbolic link: {path}")
            if sources and parent == directory and path.name in SOURCE_IGNORED:
                continue
            if path.is_dir():
                visit(path)
            elif path.is_file():
                result.append(path)
            else:
                raise ValueError(f"Archive input is not a regular file: {path}")

    visit(directory)
    return result


def manifest(directory: Path, *, sources: bool = False) -> dict[str, str]:
    return {
        path.relative_to(directory).as_posix(): hashlib.sha256(path.read_bytes()).hexdigest()
        for path in _files(directory, sources=sources)
    }


def validate_source(source: Path) -> None:
    slides = source / "slides.md"
    text = slides.read_text(encoding="utf-8")
    if "<!--" in text or re.search(r"^\s*(?:notes|speakerNotes):", text, re.MULTILINE):
        raise ValueError("Public slides must not contain speaker notes or HTML comments")
    match = re.match(r"\A---\s*\n(.*?)\n---\s*(?:\n|$)", text, re.DOTALL)
    if not match:
        raise ValueError("Public slides need initial event frontmatter")
    metadata = yaml.safe_load(match.group(1))
    if not isinstance(metadata, dict):
        raise ValueError("Invalid event frontmatter")
    if metadata.get("presenter") is not False or metadata.get("record") is not False:
        raise ValueError("Public slides must disable presenter mode and recording")
    if metadata.get("download") not in (PDF, f"./{PDF}"):
        raise ValueError(f"Event download must name {PDF}")
    if metadata.get("exportFilename") != PDF.removesuffix(".pdf"):
        raise ValueError("Event export filename does not match MTUG")
    info = metadata.get("info", "")
    if not isinstance(info, str) or not re.search(r"\bMTUG\b", info):
        raise ValueError("Event information must identify MTUG")
    if not re.search(r"(?:\b0?9\.\s*November\s+2026\b|\b09\.11\.2026\b|\b2026-11-09\b)", info):
        raise ValueError("Event information must identify 9 November 2026")
    if re.search(r"\bTUGLE\b", info):
        raise ValueError("MTUG event metadata still identifies TUGLE")


def validate_pdf(path: Path) -> None:
    """A filename or PDF header alone is not evidence of a valid document."""
    if not path.read_bytes().startswith(b"%PDF-"):
        raise ValueError(f"Not a PDF: {path}")
    parser = shutil.which("pdfinfo")
    if not parser:
        raise RuntimeError("Freezing needs pdfinfo (poppler-utils) to validate the PDF")
    result = subprocess.run(
        [parser, str(path)], capture_output=True, text=True, timeout=30,
        env={**os.environ, "LC_ALL": "C"}, check=False,
    )
    pages = re.search(r"^Pages:\s+([1-9]\d*)\s*$", result.stdout, re.MULTILINE)
    if result.returncode != 0 or not pages:
        raise ValueError(f"PDF cannot be parsed as a document with pages: {path}")


def _require_unstarted(event_dir: Path) -> None:
    # lexists semantics include dangling links, which also count as started.
    for name in MARKERS:
        target = event_dir / name
        if target.exists() or target.is_symlink():
            raise FileExistsError(f"Archive already started; refusing to replace {target}")


def freeze_talk(event: str, root: Path = ROOT, *, now: datetime | None = None) -> Path:
    """Archive only the explicitly named event; ``now`` is for isolated tests.

    There is deliberately no CLI clock override and no automatic scheduler.
    Once any archive artifact exists, even an interrupted freeze fails closed.
    """
    if event != EVENT:
        raise ValueError(f"Only the explicit event {EVENT!r} can be frozen")
    current = now if now is not None else datetime.now(ZoneInfo("Europe/Berlin"))
    if current.tzinfo is None or current.utcoffset() is None:
        raise ValueError("The freeze clock must include a timezone")
    if current.astimezone(ZoneInfo("Europe/Berlin")).date() < EVENT_DATE:
        raise ValueError("MTUG cannot be frozen before 9 November 2026 (Europe/Berlin)")

    root = Path(root).absolute()
    _reject_redirected(root)
    event_dir = root / "talks" / event
    _reject_redirected(event_dir)
    if not event_dir.is_dir():
        raise FileNotFoundError(event_dir)
    _require_unstarted(event_dir)

    # Cooperating invocations cannot both pass the no-existing-artifact check.
    lock = event_dir / ".freeze.lock"
    try:
        lock.mkdir()
    except FileExistsError as error:
        raise FileExistsError(f"Freeze already active or interrupted: {lock}") from error
    try:
        _require_unstarted(event_dir)
        source, site = event_dir / "source", event_dir / "site"
        source_hashes = manifest(source, sources=True)
        site_hashes = manifest(site)
        for name in ("index.html", PDF):
            if name not in site_hashes:
                raise FileNotFoundError(site / name)
        if not (site / "index.html").stat().st_size:
            raise ValueError("The reviewed site index is empty")
        validate_source(source)
        validate_pdf(site / PDF)

        # Stage on the same filesystem. Promotion uses individual atomic moves;
        # a crash between them leaves markers that subsequent runs must reject.
        with TemporaryDirectory(prefix=".freeze-stage-", dir=event_dir) as temporary:
            stage = Path(temporary)
            shutil.copytree(site, stage / "snapshot", symlinks=True)
            if manifest(stage / "snapshot") != site_hashes:
                raise ValueError("Site changed while its snapshot was copied")
            if manifest(site) != site_hashes or manifest(source, sources=True) != source_hashes:
                raise ValueError("Source or site changed during the freeze")
            for name, hashes in (("snapshot.sha256.json", site_hashes), ("source.sha256.json", source_hashes)):
                (stage / name).write_text(json.dumps(hashes, indent=2, sort_keys=True) + "\n", encoding="utf-8")
            _require_unstarted(event_dir)
            (stage / "snapshot").rename(event_dir / "snapshot")
            # Hard-link publication is atomic and refuses an existing filename.
            for name in MARKERS[1:]:
                os.link(stage / name, event_dir / name)
        return event_dir / "snapshot"
    finally:
        lock.rmdir()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("event", choices=[EVENT], help="explicit event to archive")
    args = parser.parse_args()
    try:
        result = freeze_talk(args.event)
    except (OSError, ValueError, RuntimeError, subprocess.TimeoutExpired, yaml.YAMLError) as error:
        parser.exit(1, f"Freeze refused: {error}\n")
    print(f"Archived {args.event}: {result}")


if __name__ == "__main__":
    main()
