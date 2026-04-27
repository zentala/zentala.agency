# Design System — zentala.agency

**Extracted:** 2026-04-27 from 85 `.astro` + 14 `.scss` files in `src/`.
**Source of truth:** this file. Cross-references live in `src/styles/variables.scss`,
`.claude/CLAUDE.THEMING.md`, and `.claude/tasks/006_backstage_page_redesign/DESIGN.md`.

---

## Tokens

### Spacing (base 4px)

```
Scale: 4, 8, 12, 16, 24, 32, 48, 64  (px)
       0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4  (rem)
```

Maps directly to `variables.scss`:
```scss
$spacing-mobile:  1rem;    // 16px
$spacing-tablet:  1.5rem;  // 24px
$spacing-medium:  2rem;    // 32px
$spacing-large:   3rem;    // 48px
$spacing-desktop: 4rem;    // 64px
```

Standard responsive ramp for cards/sections (large → mobile): **64 → 48 → 32 → 24 → 16 px**.

Tailwind classes seen most: `p-4` `p-6` `p-8` (16/24/32 px), `mb-2` `mb-4` `mb-8`, `gap-2` `gap-6` `gap-8`. All snap to the 4px grid.

### Radius

```
0      — Cards, sections, hero, buttons (sharp by default)
8px    — Inputs, badges, small UI (rounded-lg)
9999px — Circles (avatars, sygnets, dots — rounded-full)
```

**Cards do not have radius.** Treat 0 as the default; only use `rounded-lg` for inputs / pills.

### Depth — **borders-only**

Repo ratio: ~325 borders : 26 shadows. Shadows used only in Header scroll states and focus rings.

```
Border default: 1px solid #1f2937   (gray-800)
Border hover:   1px solid #374151   (gray-700)
Border subtle:  1px solid #111827   (gray-900)
```

When adding visual depth: **always border, never shadow**. The `.cards-grid` transparent-pattern handles double-border avoidance for grid layouts; `margin: -1px` on hover absorbs neighbor edges.

### Color

```
# Backgrounds
#000              — Page + card default
#111827 gray-900  — Card hover

# Text (active content)
#fff              — Headings, primary
#9ca3af gray-400  — Card descriptions
#d1d5db gray-300  — Subtitles
white/85          — Hero subtitle (after fix)
white/70 white/80 — Body paragraphs
white/40 white/55 — Eyebrows, captions, labels
white/15 white/05 — Decorative numbers (OfferCard idiom)

# Borders → see above

# Accent
#60a5fa blue-400  — Text links only (4 instances repo-wide)
                    NOT for: gradients, banner backgrounds, eyebrow pills,
                    decorative numbers, dividers, brand-text emphasis
```

### Typography

```
Hero h1:    font-light, text-4xl → text-8xl  (responsive after Hero.astro fix)
Hero h2:    font-light, text-xl → text-4xl
Card title: font-light, text-3xl (~30px)
Body:       font-normal, text-base / text-lg
Buttons:    font-semibold, text-base
Eyebrow:    font-light, text-sm tracking-wide
```

Default weight rule: **`font-light` (300) for headings, `font-normal` (400) for body**. `font-semibold` reserved for buttons and badges. `font-bold` only seen in legacy Header / OfferCard number.

---

## Patterns

### Button (`src/components/Button.astro`)

```
Geometry: px-8 py-3 (32 × 12), inline-flex, no radius
Weight:   font-semibold
Variants: primary | secondary | outline | filled | light
  primary:   bg-blue-600  text-white
  secondary: bg-gray-800  border gray-700  text-white
  outline:   border white/30  hover→white bg
  light:     bg-white  text-black
Icon:     left position via astro-icon (Lucide)
Arrow:    right side, opt-out via arrow={false}
```

For external/cross-product links that should not scream, prefer **secondary** (matches the grayscale rule).

### Card

```
Wrapper: <CardContainer> OR SectionContent context="grid"
Border:  1px (transparent top/left, gray-800 right/bottom — set by .cards-grid / SectionGrid)
Padding: 4rem → 3rem → 2rem → 1.5rem → 1rem  (per breakpoint, see CardContainer)
Bg:      #000 idle, #111827 hover
Radius:  0
Hover:   z-index: 10, border-color → gray-700, margin: -1px (absorbs neighbor edges)
```

**Important:** the bare `SectionContent context="grid"` ships with too-tight padding (~16-24px) — does NOT match site standard. Either wrap in `CardContainer` OR override `.section-content--grid` padding to the 4-rem responsive ramp.

### Grid

```
.cards-grid           — 3-col → 2-col tablet → 1-col mobile
.cards-grid--halves   — 2-col on desktop
.cards-grid--two-one  — 2/3 + 1/3 on desktop
<SectionGrid columns={2|3|4|5}> — primitive equivalent
```

Border mechanic: every cell has `border: 1px solid transparent` with right+bottom colored. Right border removed for last column. On hover, all 4 borders color, cell pulled `margin: -1px` to overlap neighbors. Double-line bug requires the `margin: -1px` fix (currently scoped, not yet upstreamed in `_grids.scss`).

### Hero (`src/components/Hero.astro`)

```
Layout:  centered (text-center), full container-padded width
Padding: py-responsive('lg')  (96 → 24px)
Eyebrow: optional, font-light text-white/55 above title
h1:      text-4xl → text-8xl responsive
h2:      text-xl → text-4xl, text-white/85
```

---

## Section primitives — when to use

```
<Section>            — Wrapper, applies bordered container.
<SectionHeader>      — h2 + subhead, bottom-border accent. Open every section.
<SectionGrid cols=N> — Cards (2-5 col responsive). Override padding (see Card).
<SectionBento>       — Asymmetric bento (homepage uses this).
<SectionContent>     — Content block. context="grid" inside grids, "full" standalone.
<SectionImage>       — Image with aspect ratio modes.
<SectionBlockQuote>  — Quote block with top/bottom borders.
<SectionCTA>         — Full-width text-link CTA. Restrained, on-brand.
```

Replaces deprecated: `GridCTA → SectionCTA`, `ImageSquare → SectionImage`, `BlockQuote → SectionBlockQuote`, `CapabilityBlock` & `EngagementCard` → `SectionContent`.

---

## Anti-patterns (caught in audit)

- ❌ Radial blue gradients on banner sections
- ❌ Eyebrow pill / label colored blue
- ❌ Decorative numbers in blue (use white/15 watermark — OfferCard idiom)
- ❌ Dividers in blue
- ❌ Stat-row borders in blue
- ❌ Box-shadow for depth (use border)
- ❌ Card padding < 24px desktop (must match CardContainer 4rem ramp)
- ❌ Hover without `margin: -1px` (double-border)
- ❌ Mixing SCSS `@include` breakpoints with Tailwind `md:` / `lg:` (use one or the other within a component)

---

## Source pages used as ground truth

- `src/pages/index.astro` (Homepage — Bento + CTA)
- `src/pages/about/capabilities.astro` (cards-grid + OfferCard)
- `src/pages/portfolio.astro` (Hero + PortfolioItem)
- `src/pages/blog/index.astro` (cards-grid + PostCard)

A new page should visually pass for "same site" when alt-tabbed against any of these four. If it doesn't, it's the new page that's wrong.

---

## Update protocol

When adding a new pattern:
1. Check it doesn't duplicate an existing token / pattern.
2. Add it to this file with the file:line where it's introduced.
3. If it's a global utility, add to `_grids.scss` / `_containers.scss` / `_spacing.scss`.
4. Cross-link from `.claude/CLAUDE.THEMING.md`.

When deviating intentionally (e.g., per-page accent override): document the deviation in the page's task folder under `.claude/tasks/NNN_*/DESIGN.md`.
