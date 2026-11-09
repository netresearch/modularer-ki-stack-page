# AGENTS.md

This project is a static GitHub Pages site for the Netresearch modular AI stack visualization.

## Project Structure

- `public/index.html` contains the complete static page.
- `.github/workflows/pages.yml` publishes `public/` through GitHub Pages.

## Guidelines

- Keep the page static unless a build step is explicitly needed.
- Preserve Netresearch brand colors, logo usage, and footer link.
- Do not add secrets or deployment credentials to the repository.

## Deployment & Git

- `main` is the **deploy branch**: every push to `main` triggers
  `.github/workflows/pages.yml` and publishes within ~3–4 minutes.
- This is a single-maintainer static site, so committing **directly to `main`**
  is the accepted flow here — a deliberate, repo-scoped exception to the usual
  "feature branches only" rule. No PR overhead is required for site edits.
- Pin all GitHub Actions to full commit SHAs (org policy enforces it).

## Presentation editions

- `talks/vorlage/source/` is the editable, event-neutral master. It is published
  at `vortraege/vorlage/`. Make future content and design changes here.
- `talks/tugle-2026-11-03/` is frozen. Never edit its source, PDF, snapshot,
  or checksum manifests. The only user-authorized addition was the small link
  to the current template; it is already included in the frozen snapshot.
- `talks/mtug-2026-11-09/source/` is derived from the master by
  `scripts/prepare_talks.py` until the 9 November event is frozen. Do not edit
  the derived slides independently. The event name and URL are `MTUG` and
  `mtug-2026-11-09`, as specified by the user.
- On or after 9 November, freeze the final reviewed MTUG edition explicitly
  with `python3 scripts/freeze_talk.py mtug-2026-11-09`. The date alone does
  not choose the final presentation state. After freezing, it follows the
  same immutable-source and snapshot rules as TUGLE.
- Never update an archive manifest to make a changed archive pass checks.
  New improvements belong to `vorlage`; a changed historical edition would
  require an explicit new user instruction.
- CI prepares and builds active editions, then verifies and publishes all
  three canonical routes. The former `tmuc-2026-11-09` address remains a
  compatibility route for previously shared links and downloads. Archived
  editions are copied from their verified snapshots and never rebuilt.

