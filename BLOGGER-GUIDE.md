# Blogger + GitHub MVP implementation guide

## 1. Recommended ownership model

Use Blogger as the public, indexable page and GitHub Pages as an embedded application host.

| Responsibility | Blogger | GitHub Pages |
|---|---:|---:|
| Search landing URL and article | Yes | No |
| Calculator interface and logic | Embedded | Yes |
| FAQs, explanation and related links | Yes | No |
| AdSense placements | Yes, after approval | No for MVP |
| Canonical/indexing target | Blogger page | `noindex,follow` |

This avoids two competing URLs for the same intent. The iframe content is a separate document; do not assume its text strengthens the Blogger page. Put every SEO-important explanation in Blogger itself.

## 2. Publish the GitHub calculator

Follow `README.md`. Keep the repository public on the free plan. After Pages finishes deploying, open the tool URL directly on desktop and mobile. HTTPS must work before embedding it into an HTTPS Blogger page.

## 3. Build the Blogger landing page

Create a **Page** if this will be an evergreen tool in the main navigation. Blogger Pages are less convenient than Posts for feeds and labels, so a Post is also defensible. Pick one convention and use it consistently. A clean custom permalink may be easier with a Post. Blogger does not naturally provide a true `/fr/...` directory architecture; do not promise that structure until moving to a platform that controls routing.

Suggested URL now: `https://YOURDOMAIN.com/p/calculateur-imc.html` (Page) or a concise custom post permalink. The language can be signalled by French page content, `<html lang>` at theme level where practical, navigation, and later reciprocal language links.

### Paste order in Blogger HTML view

1. Introductory paragraphs.
2. A visible heading such as `Calculateur d’IMC`.
3. The contents of `blogger-embed.html` with both placeholders replaced.
4. The editorial sections listed below.

If Blogger removes the `<script>` block when saving, keep the iframe with a fixed `height="700"`. That works; it may leave a little empty space. A second option is to place the resize listener once in **Theme → Edit HTML** after backing up the theme. Do not repeatedly edit the theme just to launch the MVP.

## 4. Search title and description

Recommended page title:

> Calculateur IMC gratuit : calculez votre indice de masse corporelle

Recommended meta description (aim for clarity, not a rigid character count):

> Calculez gratuitement votre IMC en kg/cm ou en livres/pieds. Découvrez la formule, les catégories chez l’adulte, un exemple et les limites de l’IMC.

Use one visible H1. The calculator iframe has its own H1, but it is a separate document. On Blogger, make the page headline the H1 and use H2 for article sections. Do not stuff variants such as “IMC calcul”, “calcul IMC” and “calculateur poids” unnaturally.

## 5. French editorial content blueprint

Write and fact-check the article in natural French. A useful first version can follow this structure:

1. **Introduction** — what the calculator does, who it is for, and that it is informational.
2. **Calculateur d’IMC** — the embedded tool.
3. **Qu’est-ce que l’IMC ?** — plain-language definition and adult scope.
4. **Comment calculer son IMC ?** — `poids (kg) ÷ taille² (m)` plus the imperial method if offered.
5. **Exemple** — 70 kg and 1.75 m gives 22.9.
6. **Interpréter le résultat** — table: below 18.5; 18.5–24.9; 25–29.9; 30+. Cite the health authority used and state the population/scope.
7. **Limites** — it does not directly measure body fat and can mislead for athletes, pregnancy, older adults, children, and some populations.
8. **Quand demander conseil ?** — neutral, non-diagnostic guidance to consult a qualified professional for personal interpretation.
9. **FAQ** — only questions that add information; 4–6 is enough.
10. **Outils associés** — add real links only as the next tools are published.
11. **Sources and review date** — cite authoritative medical sources and show when the page was reviewed.

Do not publish medical claims from an automatically translated draft without human review. Avoid personalised diagnoses and do not claim the displayed “healthy range” is a target weight.

## 6. Initial FAQ prompts

- Comment calculer l’IMC d’un adulte ?
- Quel IMC est considéré comme normal chez l’adulte ?
- L’IMC est-il fiable pour les sportifs ?
- Peut-on utiliser ce calculateur pendant la grossesse ?
- L’IMC s’interprète-t-il de la même manière chez l’enfant ?

Answer each directly in 2–4 sentences. FAQ structured data is optional and does not guarantee a rich result. Never mark up content that is not visibly present.

## 7. Internal linking for the first cluster

Launch with the BMI page and basic trust pages: About, Contact, Privacy Policy, Cookie information where applicable, Editorial/medical disclaimer, and Terms. Once published, add the next genuinely useful page (BMR is a logical neighbour), then link both ways with descriptive French anchor text.

Suggested health cluster order: IMC → métabolisme de base (BMR) → besoins caloriques (TDEE) → poids idéal. Do not show dead “coming soon” links. Add a small category hub only when at least 3–4 tools exist.

## 8. AdSense and privacy

- First prove the site has original, complete pages, working navigation, clear ownership/contact information, and a good mobile experience. Approval is never guaranteed.
- Apply through Blogger/AdSense only when the site is ready; do not make an arbitrary page-count promise.
- Keep ads outside the iframe for the MVP. Never place ads where they can be mistaken for calculator buttons or results.
- Avoid an ad immediately against the main Calculate button, excessive above-the-fold ads, pop-ups that block the tool, or labels that encourage clicks.
- The current calculator sends no form data and uses no cookies or third-party libraries. Analytics, ads, consent platforms, affiliate links, or QR libraries can change your privacy obligations.
- If serving users in regulated regions, implement the consent/privacy setup required by your chosen ad and analytics products before enabling them.
- Health is a sensitive topic: use reputable sources, author/reviewer transparency, cautious language, and a visible disclaimer.

## 9. Multilingual reality on Blogger

Blogger is inexpensive but not a full multilingual CMS. It does not give each Page arbitrary nested routes such as `/fr/calculateur-imc`, nor an easy per-page `<head>` editor. At MVP scale, use one Blogger site and clear localized slugs, labels/navigation, and language-switch links. Before launching language two, test whether your theme can output correct self-referencing and reciprocal `hreflang` tags for mapped pages. If this becomes brittle, separate language subdomains/blogs or a future migration may be cleaner.

Do not auto-redirect visitors solely by IP or browser language. Let them switch languages. Every translated page should read naturally and be locally useful, not be a word-for-word mass translation.

## 10. Test checklist

### Calculation

- 70 kg / 175 cm returns 22.9.
- 154 lb / 5 ft 9 in returns about 22.7.
- Boundary values 18.5, 25.0 and 30.0 use the intended category.
- Empty, negative, extremely small/large, decimal and comma-decimal input behaviour is checked.
- Reset clears the result and errors.

### Embed and experience

- Tool loads on the final HTTPS Blogger URL without mixed-content errors.
- No inner vertical scrollbar at common phone, tablet and desktop widths.
- Keyboard-only use works; focus is visible; result/error is announced.
- French accents render correctly and buttons are large enough to tap.
- The calculator works with slow loading; fixed-height fallback is acceptable.
- Browser console has no 404, JSON, or cross-origin errors.

### SEO and quality

- Blogger page has one descriptive H1, a unique title/description, substantial original French content, sources and review date.
- GitHub tool contains `noindex,follow`; Blogger URL is the one submitted/indexed.
- Search Console URL inspection can render the Blogger content and iframe.
- No empty related links, copied FAQs, unsupported health claims or accidental duplicate page.
- About, Contact, Privacy and disclaimer pages work from mobile navigation.

### Performance

- Images, if added to Blogger, are compressed and dimensioned.
- No unnecessary font, framework, tracker or third-party JavaScript is added.
- Core Web Vitals and mobile usability are checked after the iframe is live.

## 11. Scaling after validation

Use this gate before tool two: the calculator works on the live Blogger page, the page is indexable, Search Console sees it, mobile UX is clean, and at least a few real users complete the tool without confusion.

For each new tool:

1. Add a pure file in `core/` with calculations and validation.
2. Add automated examples/boundary tests in `tests/`.
3. Add a UI folder under `tools/TOOL-SLUG/`.
4. Reuse shared CSS/components once the second tool proves what is actually common.
5. Add interface strings to locale JSON; keep long editorial content in Blogger.
6. Publish one excellent Blogger landing page, then add reciprocal internal links.
7. Log source, reviewer, test cases, page URL, language, index status, and last update in a simple spreadsheet.

Do not build 100 copied HTML folders manually. After 3–5 tools, create a small static build script that combines a shared shell, per-tool configuration, and locale files. Add language two only after 5–10 pages show that the workflow and search demand justify it. Separate the reusable calculation engine from localized interface text, but give each Blogger article a human editorial pass.

## 12. Practical phases

- **MVP:** French BMI tool, one excellent Blogger page, trust pages, Search Console, basic analytics only if privacy setup is ready.
- **Validation:** 5–10 tools in one coherent French cluster; inspect queries, tool usage and page quality.
- **Second language:** translate the best-performing tools, create reciprocal language mapping, and test `hreflang` rather than assuming it works.
- **Systemization:** shared components, build script, automated tests, content-review checklist and deployment automation.
- **Scale:** expand clusters based on demonstrated demand and editorial capacity—not a page-count target.

## 13. Authoritative references to keep with the project

- GitHub Pages publishing source: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- GitHub Pages custom domains: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
- Google Search multilingual/localized pages: https://developers.google.com/search/docs/specialty/international/localized-versions
- Google Search people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- AdSense programme policies: https://support.google.com/adsense/answer/48182
- WHO BMI background and adult thresholds: https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight

Re-check these sources before a major launch or policy-sensitive change; platform and advertising requirements can change.
