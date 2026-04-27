# Design System — Mapped from Main Pages

**Scope:** Pages in main navbar (excl. Contact): `/`, `/about/capabilities`, `/portfolio`, `/blog`.
**Purpose:** Capture the implicit visual rules so this Backstage page matches the rest of the site.

---

## 1. Color rule — grayscale only, blue is link-accent only

The site is **monochrome black + white + gray**, end of story for visible content.

The `$color-accent: #60a5fa` (blue-400) variable exists, but is used **only** for:
- **Text links** in body copy (`color: #60a5fa` → hover `#93c5fd`) — see `_links.scss`, `PortfolioItem` link
- **Section header bottom-border accent** (1-2px line under `SectionHeader` — see `SectionHeader.astro:60`)
- **Subtle button hover affordance** (border color flip — see `ContactForm`, `contact.astro`)

**Never used on this site:**
- ❌ Banner gradients (no `radial-gradient(blue, …)` on any main page)
- ❌ Eyebrow / tag pills filled with blue
- ❌ Big colored numbers (numbers on OfferCard are white at 5% opacity, not blue)
- ❌ Decorative dividers in blue
- ❌ Stat labels in blue
- ❌ Brand-name text styled in blue

**Backstage page rule (per user, 2026-04-27):** drop **all** blue uses on this page. Numbers, eyebrows, dividers, banner backgrounds, brand-text accents → white at varying opacity. Only text-links may stay blue (none on this page in body copy currently).

---

## 2. Color tokens (verified)

| Token | Value | Use |
|---|---|---|
| Background | `#000` | Page + card background |
| Border (default) | `#1f2937` (gray-800) | Card borders, dividers |
| Border (hover) | `#374151` (gray-700) | Card hover state |
| Border (subtle) | `#111827` (gray-900) | Section hairlines |
| Text primary | `#fff` / `#f8fafc` | Headings |
| Text secondary | `#9ca3af` (gray-400) | Card descriptions (OfferCard) |
| Text tertiary | `rgba(255,255,255,0.7)` | Body paragraphs |
| Text muted | `rgba(255,255,255,0.55)` | Eyebrows, labels, captions |
| Text low-opacity | `opacity: 0.05–0.15` (white) | Background numbers, watermark icons |
| Accent (rare) | `#60a5fa` | Text links only |

---

## 3. Typography

- **Headlines:** `font-weight: 300` (light). All h1–h3.
- **Body:** `font-weight: 400`.
- **No bold > 500** anywhere on these pages.
- **Hero h1:** responsive scale `text-4xl → text-8xl` (after recent fix).
- **Hero h2 (subtitle):** `text-xl → text-4xl`, `text-white/85`.
- **Card title:** `text-3xl` (~30px) on cards, `font-light`.
- **Card description:** `text-lg` (~18-20px) gray-400 on capabilities; `text-base` white/70 on homepage.
- **Background numbers:** `text-9xl opacity-5` — almost invisible decorative numbers (OfferCard pattern). Not the page-active accent.

---

## 4. Spacing — card padding is 4rem desktop

Reference: `CardContainer.astro` (used by OfferCard, PortfolioItem on the main pages).

```
padding: 4rem;   /* Desktop: 64px */
@media (max-width: 1440px) { padding: 3rem; }  /* Large: 48px */
@media (max-width: 1000px) { padding: 2rem; }  /* Medium: 32px */
@media (max-width: 770px)  { padding: 1.5rem; } /* Tablet: 24px */
@media (max-width: 480px)  { padding: 1rem; }   /* Mobile: 16px */
```

**Implication:** any card-shaped content on this site has 64px padding desktop. My `SectionContent--grid` (`0.75rem 1rem`, max 24px) is **3× too tight** vs. system standard. **Fix:** override on this page or wrap content in `CardContainer`.

Section vertical padding: `py-responsive('lg')` for hero (96→24px), `py-responsive('md')` for section bodies (64→16px).

---

## 5. Grid system

- **Standard cards grid:** `.cards-grid` from `_grids.scss` — 3-col desktop → 2-col tablet → 1-col mobile.
- **Section primitive equivalent:** `<SectionGrid columns={2|3|4|5}>`.
- **Modifiers:** `cards-grid--halves` (2-col), `cards-grid--two-one` (2/3 + 1/3).
- **Border pattern:** transparent top/left + colored right/bottom. On hover all 4 borders color → known double-line bug if hovered cell is not pulled with `margin: -1px`.
- **No gaps between cards** — borders touch.

---

## 6. Card content patterns

What main pages put inside each card:

**OfferCard (capabilities):**
- Big number watermark in corner (`text-9xl opacity-5` — white, not blue)
- `CardBackgroundIcon` watermark (Phosphor Thin, opacity 0.06 idle / 0.32 hover, white)
- Title `text-3xl font-light`
- Description `text-xl text-gray-400`

**PortfolioItem (portfolio):**
- Image (square, eager loading)
- Title
- Subtitle paragraph
- Single text link `color: #60a5fa` (one of the few blue uses, justified — it's a link)

**PostCard (blog):**
- Excerpt + author + date stack

**Pattern across all of them:** card content is restrained — title + description + maybe one link. No embedded sub-headings, no inline pill badges, no colored emphasis text.

---

## 7. Hero pattern

`Hero.astro` (centered, `text-center`):
- Optional eyebrow (just added) — should be `text-white/55`, not blue
- h1 huge responsive, white, font-light
- h2 subtitle, smaller, `text-white/85` after recent fix

Hero is always full width inside `container-padded`, vertical padding `py-responsive('lg')`.

---

## 8. CTA / Button styling

`Button.astro` variants used:
- `primary` — solid white-ish on dark, with icon (used by homepage CTA)
- `secondary` — outline / muted
- `light` — light background

For cross-product link to DevStage.io, the right pattern (matching site tone) is `secondary` or simple text link with arrow, NOT a saturated blue button.

---

## 9. Section primitives — when to use what

- `<Section>` — wraps everything, applies bordered container.
- `<SectionHeader>` — every section starts with this (h2 + subhead). Has bottom-border accent.
- `<SectionGrid columns={n}>` — cards. **Padding inside is anemic — must override to ~4rem on this page** until the primitive itself is fixed.
- `<SectionContent context="grid">` — content wrapper inside grid. Same padding issue.
- `<SectionContent context="full">` — standalone content with `max-width: 960px`, big padding.
- `<SectionCTA>` — full-width text-link CTA with arrow. Restrained, fits the design tone.

---

## 10. Hover behavior

Cards lift via `z-index: 10` and switch `border-color` to gray-700 on hover. **Known issue:** without `margin: -1px` to absorb neighbor borders, hovered cell creates a double-line vs neighbors. Fix needed in `SectionGrid.astro` (and arguably `_grids.scss .cards-grid`).

Card hover background: `#111827` (gray-900). Subtle, no glow, no scale.

---

## 11. Decorative elements rule

When OfferCard wants to draw attention to a number, it uses **white at 5% opacity**, not a colored accent. The number is **visible only as texture**, not as a visual call-to-action. This is the calibration target for any other "decorative" numbers (process steps, FAQ counters, stat numbers).

**Stat numbers in DevStage banner:** my current rendering (white 4rem light) is OK for the active stats, but the surrounding accents (top/bottom borders, eyebrow color, brand-text color) all need to drop blue.

---

## 12. Apply this to backstage page (concrete checklist)

| Element | Current | Fix to |
|---|---|---|
| Hero eyebrow color | (was blue in `.page-tag`) | white/55, light, inline above title via Hero `eyebrow` prop |
| Hero subtitle | "consulting. Enterprise…" | add "consulting, contracting & body leasing." |
| DevStage banner background | radial blue gradient | flat black, optional very subtle white-tinted gradient `rgba(255,255,255,0.02)` |
| DevStage brand text "DevStage.io" | `color: #60a5fa` | `color: #fff` (already light, stands by typography only) |
| DevStage stat-row borders | `rgba(96,165,250,0.2)` | `$border-color` gray-800 |
| DevStage CTA button | `Button variant="primary"` (blue) | `variant="secondary"` (outlined) |
| Process step numbers `01–04` | `color: #60a5fa` 2.5rem | `color: rgba(255,255,255,0.15)` 3.5rem (watermark scale, OfferCard idiom) |
| FAQ `Q01–Q06` labels | `color: #60a5fa` uppercase | `color: rgba(255,255,255,0.4)` uppercase, smaller |
| About blue divider | `rgba(96,165,250,0.4)` | `$border-color` gray-800 (1px line) |
| Tech stack labels | (already white/muted) | OK |
| Card padding | `~16-24px` | `4rem desktop` matching CardContainer (override `.section-content--grid` on this page) |
| SectionGrid hover double-line | `border-color: hover` only | add `margin: -1px` to hover state in SectionGrid |

---

## Source pages cross-reference (verified)

- `src/pages/index.astro` — uses `BentoAboutMe`, `CTASection`. Black bg, white text, no blue accents in user-visible non-link content.
- `src/pages/about/capabilities.astro` — `Hero` + `cards-grid` + `OfferCard`. Numbers white opacity-5, descriptions gray-400.
- `src/pages/portfolio.astro` — `Hero` + `PortfolioItem`. Single blue link per card, all else grayscale.
- `src/pages/blog/index.astro` — `cards-grid` + `PostCard`. Pure grayscale, no blue.

The Backstage page must visually pass for "same site" when alt-tabbing between it and any of these four.
