# Tarot Atlas — Bilingual Tarot Learning Site

A mystical-professional, fully bilingual (English/Hindi) tarot education site,
built static (HTML/CSS/vanilla JS) and ready for drag-and-drop deploy to Netlify.

## What's built in this pass

- **Design system** (`css/style.css`) — the full "constellation" visual identity:
  midnight indigo + muted gold palette, Fraunces/Work Sans for English,
  Baloo 2/Hind for Hindi (so Devanagari renders with correct proportions).
- **Language toggle** (`js/script.js`) — every page has an EN/हिं switch in the nav.
  Every bilingual element uses two tags side by side:
  ```html
  <p lang-en>English text</p>
  <p lang-hi>हिन्दी पाठ</p>
  ```
  The CSS/JS shows only the active language and remembers the choice in
  `localStorage` across pages. **This is the pattern to copy for every new
  page and every new card.**
- **Pages**: Home (`index.html`), How to Use (`how-to-use.html`),
  Major Arcana index (`major-arcana.html`), Minor Arcana index
  (`minor-arcana.html`), FAQ (`faq.html`, 6 questions, ~300–400 words/answer,
  bilingual, accordion UI), About (`about.html`), Privacy Policy
  (`privacy-policy.html`), Disclaimer (`disclaimer.html`), Terms
  (`terms.html`), Contact (`contact.html`, wired for Netlify Forms).
- **One fully-built card page**: `major-arcana/the-fool.html` — the template
  for all 78 cards (upright/reversed, keywords, Love/Career/Spirituality grid,
  ad slots, related-cards sidebar).

## File structure

```
tarot-site/
├── index.html
├── how-to-use.html
├── major-arcana.html          ← index/grid of all 22 Major Arcana cards
├── minor-arcana.html          ← index of the 4 suits
├── faq.html
├── about.html
├── privacy-policy.html
├── disclaimer.html
├── terms.html
├── contact.html
├── netlify.toml
├── css/
│   └── style.css
├── js/
│   └── script.js
├── major-arcana/
│   ├── the-fool.html          ← ✅ fully built — COPY THIS as the template
│   ├── the-magician.html      ← to build (linked from major-arcana.html)
│   ├── the-high-priestess.html
│   ├── the-empress.html
│   ├── the-emperor.html
│   ├── the-hierophant.html
│   ├── the-lovers.html
│   ├── the-chariot.html
│   ├── strength.html
│   ├── the-hermit.html
│   ├── wheel-of-fortune.html
│   ├── justice.html
│   ├── the-hanged-man.html
│   ├── death.html
│   ├── temperance.html
│   ├── the-devil.html
│   ├── the-tower.html
│   ├── the-star.html
│   ├── the-moon.html
│   ├── the-sun.html
│   ├── judgement.html
│   └── the-world.html
└── minor-arcana/
    ├── wands.html              ← suit overview page (to build: grid of Ace–King of Wands)
    ├── cups.html
    ├── swords.html
    ├── pentacles.html
    └── (optional) wands/ace-of-wands.html, wands/two-of-wands.html, ... (56 cards total)
```

## How to finish the remaining 77 cards

1. Duplicate `major-arcana/the-fool.html`.
2. Update: `<title>`, meta description, breadcrumb, card name/number/glyph,
   element/planet line, and every `lang-en`/`lang-hi` meaning block
   (intro, upright keywords + meaning + Love/Career/Spirituality, reversed
   equivalent, related cards).
3. Save as `major-arcana/{card-slug}.html` (slugs already referenced in
   `major-arcana.html`'s links) or `minor-arcana/{suit}/{card-slug}.html`.
4. No other file needs to change — nav, footer, language toggle and styling
   are shared automatically because every page loads the same `css/style.css`
   and `js/script.js`.

## Ad placement (AdSense-ready)

Ad slots are already positioned and clearly marked (`.ad-slot` class) in:
header/leaderboard (below nav), in-content (mid-article), and sidebar
(300×250, on card pages). Replace the placeholder `<div class="ad-slot">`
markup with your AdSense `<ins>` unit once approved — the layout spacing
already accounts for these slots so approval review won't flag layout shift
or intrusive placement.

## SEO

Every page has a unique `<title>`, meta description, and canonical URL
(update `https://example.com` to your real domain before deploy). Card page
URLs follow the clean pattern `/major-arcana/the-fool` via the Netlify
redirect rules in `netlify.toml` (serves the `.html` file without the
extension showing).

## Deploy to Netlify

Drag the `tarot-site` folder onto Netlify's deploy dashboard, or connect it
as a Git repo — no build command needed (`netlify.toml` sets `publish = "."`).
The Contact form is already wired for **Netlify Forms** (`data-netlify="true"`
+ honeypot field); submissions will appear in your Netlify dashboard once
deployed — Netlify Forms only activates after the first live deploy.
