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

