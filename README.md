# French BMI Calculator MVP

A dependency-free calculator designed to be hosted on GitHub Pages and embedded in a valuable French Blogger landing page.

## Local test

From this folder run `python3 -m http.server 8000`, then open `http://localhost:8000/tools/bmi/`. Run logic tests with `node tests/bmi.test.js`.

## GitHub Pages

1. Create a public repository, for example `outils-en-ligne`.
2. Upload the **contents** of this folder to the repository root.
3. In **Settings → Pages**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then Save.
4. The tool URL will be `https://YOUR-USERNAME.github.io/outils-en-ligne/tools/bmi/`.
5. Replace the placeholder URL in `blogger-embed.html` with that exact URL.

The tool page uses `noindex,follow` intentionally. The Blogger landing page—not the framed GitHub page—should be the page indexed and monetized.

## Architecture

- `core/bmi.js`: calculation and classification only; no French text or page code.
- `locales/fr.json`: all reusable interface text.
- `tools/bmi/`: accessible, responsive UI shell.
- `tests/`: basic boundary and formula checks.
- `blogger-embed.html`: paste-ready iframe code.
- `BLOGGER-GUIDE.md`: publication, SEO, content, testing and scaling plan.

For language two, add `locales/en.json`, then make the UI select the locale from a validated `?lang=en` parameter. Keep editorial Blogger articles separate and genuinely localized; do not place long SEO articles in these JSON files.
