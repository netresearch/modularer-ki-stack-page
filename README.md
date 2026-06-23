# Modularer KI-Stack

Static GitHub Pages project for the Netresearch AI stack visualization.

## Local Preview

Open `public/index.html` directly in a browser, or serve it locally:

```bash
python3 -m http.server 8000 --directory public
```

Then open `http://localhost:8000/`.

## GitHub Pages

The `.github/workflows/pages.yml` workflow publishes the `public/` directory to GitHub Pages from the default branch.

To deploy:

1. Create an empty GitHub project.
2. Add that project as `origin`.
3. Push the `main` branch.

```bash
git remote add origin <github-project-url>
git push -u origin main
```

GitHub will publish the site after the Pages workflow completes.
