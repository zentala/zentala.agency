---
name: line-grid-layout
description: Build or change pages, sections, cards, grids, banners and CTAs in the zentala.agency line-grid layout. Pick the right primitive, copy a page or section recipe, and verify that the 1px lines join without doubling. Use when creating a new page or route, adding a section to a page, adding or changing a card or grid component, touching borders, hover or focus on cells, writing grid or container CSS, or when a line looks doubled, missing, dangling or 1px off.
---

# Line-grid layout

The site is separated by 1px lines that join into one continuous grid. Every line has exactly one owner. It is also minimal, readable and subtle: read [DESIGN.md](../../../DESIGN.md) "Principles" (P1 to P11) before you pick a colour, icon, arrow, tag or button. A rule marked "target" there is decided but built in E007-T30; the code is the truth until then. Reference and numbers: DESIGN.md section 3 (line model) and section 4 (primitives and props). This skill is the procedure; do not copy numbers from here.

## When to load

Load before you create or change a page, section, card, grid, banner, CTA, form, tag, icon, or any CSS that touches `border`, `margin`, `overflow`, colour, hover or focus on a grid cell. Do not load for blog prose and copy ([docs/agents/blog-content.md](../../../docs/agents/blog-content.md)) or for token-only changes (DESIGN.md section 2).

## Mental model

1. A pixel line belongs to exactly one element. No two lines are ever 1px apart.
2. The container owns the outer verticals, only from 1451px. At 1450px and below there are no side lines and the container clips the overshoot.
3. The section (`section-full`, `section-grid`, `section-bordered`) owns the line below it.
4. The grid wrapper (`.line-grid`, `.cards-grid`, `.content-grid`) sits at `margin: -1px 0 0 -1px`, so its top line lands on the line above and its left line on the container line.
5. A cell draws only `border-left` and `border-top`. The right line is the neighbour's left line; the bottom line is the next row's top line or the section line.
6. Cells are transparent, never `overflow: hidden`, never fixed `aspect-ratio`. Rows stretch.
7. Hover and focus are an `::after` overlay on the line pixels (focus 2px). No border, transform, scale or z-index jump.
8. A standalone full-width block (CTA, quote, banner) uses the `line-block` mixin.
9. An incomplete last row of a variable-length listing uses `line-grid--fill-last`.

## What am I building

| Building | Use | Where |
| --- | --- | --- |
| Page header | `Hero` (own `section-grid`; `h1` title, `h2` subtitle) first; a later `SectionHeader` stays `h2` | `src/components/Hero.astro` |
| Section header block | `SectionHeader` inside `Section` or `section-full`; look by `variant` (`a` default, `b`, `c`, `d`: DESIGN.md section 5, SectionHeader) | `src/components/primitives/sections/SectionHeader.astro` |
| Section with a header and a grid | `Section` (`section-grid` plus `container-bordered`) | `.../sections/Section.astro` |
| Bare listing (cards, blog) | `<section class="section-full"><div class="container-bordered">` around `.cards-grid` or `.line-grid` | `src/pages/portfolio.astro` |
| Equal card grid, 2 to 5 columns | `SectionGrid columns={n}` or `.cards-grid` | `.../sections/SectionGrid.astro`, `src/styles/components/_grids.scss` |
| Prose or mixed columns | `.content-grid` with `--halves`, `--two-one`, `--one-two` | `_grids.scss` |
| Any other grid | `.line-grid` with `--cols-wide`, `--cols-medium`, `--cols-narrow` or `--grid-columns` | `_grids.scss` |
| Asymmetric bento | `SectionBento` with `BentoCard` spans | `.../sections/SectionBento.astro`, [bento notation](../../../docs/design/bento-notation.md) |
| Prose or fact list in a cell | `.content-grid__text` (padding, vertical centring) inside `.content-grid`, or `prose prose-blog` text; give headings `text-fg`. `SectionContent` is a transparent prose block (context `full` or `grid`) and is fine to use | `src/styles/components/_grids.scss` |
| Standalone CTA, quote, banner | `SectionCTA`, `SectionBlockQuote`, `Banner` (all `line-block`) | `.../sections/`, `src/components/banners/` |
| Button or CTA | `Button` with `tier` (DESIGN.md section 5, Buttons: at most one `cta` per screen); `variant` is the legacy look; `CTA` for headline plus buttons; `PostCta` only for copy | `src/components/Button.astro`, `CTA.astro` |
| Arrow | `<SiteIcon name="caret-right" size="sm" class="arrow-nudge" />` inside the link, button or `.group`; never `→` or a shaft icon | `src/styles/motion.scss` |
| Icon | `SiteIcon` with a meaning name; size and weight rule: DESIGN.md section 5, Icons; a typo throws at build; technology logo: `TechIcon name="astro"`; logo wall: `TechLogoWall` | `src/components/primitives/SiteIcon.astro`, `TechIcon.astro`, `src/lib/siteIcon.ts` |
| Tag, chip, badge | `Tag` (or `TagGroup`, `TagList`, `Badge`, which wrap it); `tech="Astro"` for a logo | `src/components/primitives/Tag.astro` |
| Form | `ThemedInput` and `ThemedTextarea` as direct children of a `.line-grid` form, plus a submit cell (anatomy: DESIGN.md section 5, Forms) | `src/components/ContactForm.astro` |
| Callout in prose | `NoteBox variant="info"`; in a cell, wrap in `data-prose-widget` | `src/components/primitives/NoteBox.astro` |
| Dev-only marker | `DraftBadge` (neutral dashed or solid thin line: P11) | `src/components/primitives/DraftBadge.astro` |
| Card | `CardContainer` as the root | `src/components/cards/CardContainer.astro` |
| Interactive cell | a direct-child `<a>`, or add `cell-interactive` | mixin in `src/styles/variables.scss` |
| Static cell | a plain child: no hover, no focus | |
| Listing with a variable count | add `line-grid--fill-last`: default 3/2/1 columns only and every child the same tag (all constraints: DESIGN.md section 4) | `_grids.scss` |
| Article prose column | blog prose styles, not a grid | `src/pages/blog/[postSlug].astro` |
| Three static columns (post body) | `.line-grid` with a custom `--grid-columns` | `src/pages/blog/[postSlug].astro` |

Primitives and props are tabulated in DESIGN.md section 4 ("Primitives and props").

## Show it in the gallery and to the owner

- Every new or changed component goes into the gallery at `/demo` (dev only; owner link http://agency.internal/demo) in the same change: a row in `src/components/demo/manifest.ts` (or `groups/`), and a `<GalleryEntry id="...">` with one example per variant and realistic props in the matching `src/components/demo/Gallery*.astro`. `tests/unit/component-gallery.test.ts` fails when a component file has no import, no row or no entry; an exemption needs a reason in its `EXEMPT` map.
- Entry layout: cells (`GalleryCell`, or cards directly) go in the entry's `.line-grid`; `cols={3}` closes the last row, so keep its children `div`s. Standalone blocks and grids (`line-block`, `SectionGrid`, `SectionBento`) use `bare`. A component that is a section of its own (`PostNav`) goes in the `after` slot. Never nest a `Section` or another grid with its own lines inside a cell: the lines double.
- For a new look, show the owner a mockup first at `/mockups/<name>` (dev only, `src/pages/mockups/[mockup].astro`). The real page changes only after the owner accepts it.

## Recipes

Full code, copied from real files, is in [page-recipes.md](page-recipes.md): a new page, a new section, a new card component, a standalone CTA or banner.

Shortest page: `Layout` > `Hero` > `section-full` > `container-bordered` > `cards-grid` > cards (this is `src/pages/portfolio.astro`).

## Do not duplicate

- Before writing CSS, read `src/styles/components/_grids.scss`, `_containers.scss`, the mixins in `src/styles/variables.scss` and the `sections/` folder.
- Never write border CSS for layout in a component. If a primitive lacks a case, extend the primitive (and add the case to the guard) instead of writing a local variant.
- No seventh border system. A new look or token goes into the DESIGN.md Decisions table first.
- A component that is a grid cell must not draw a border, `overflow: hidden`, a fixed `aspect-ratio`, an opaque background, or `margin` / `transform` / `z-index` for hover. Clip inside an inner wrapper with `overflow: clip` (see `CardContainer`). Make a tall card with `grid-row: span N`, give height with `min-height`.
- Tokens only: `text-fg-*`, `border-line`, `bg-surface-*`, `var(--color-*)`. No hex, no `gray-800`, no `-m-px`, no `transition: all`.
- Restraint (owner rulings, DESIGN.md Principles P1 to P11): no warm colour in the UI; blue only as a small accent (the one `cta` button per screen is the only fill: P2); hover is the lighter card background (P3); no `font-semibold` or `font-bold` (P4); no underline on a link (P5); icons only through `SiteIcon` and `TechIcon` (P7). When unsure, make it quieter: the owner found every colour added so far too intense.
- Do not mix SCSS and Tailwind breakpoints in one rule. Tailwind `md` is 771 and `lg` is 1001; SCSS has `tablet`, `medium`, `large` mixins.

## Verify

1. `just check` (lint, build, unit tests, prod-bundle audit, critical e2e). It includes `tests/e2e/line-geometry.spec.ts`.
2. The guard builds its route list from `dist/**/index.html` at test time: a new page is covered without editing the spec. Redirect stubs are replaced by their destination, `/linkedin-preview/` is excluded, and one unbuilt path covers the 404 page. At 1920, 1450, 768 and 390 it fails on doubled lines (two segments 1px apart), a vertical line at the viewport edge at 1450px and below, a floating vertical segment that joins no other line, containers narrower than the viewport at 1450px and below, and any layout rect change on hover. 1280 runs on the four core routes only, and 1024 is not in the guard. Dev-only routes (`/demo`, `/mockups/*`) and drafts are not in `dist/`, so the guard never sees them. See [tests/e2e/README.md](../../../tests/e2e/README.md).
3. Measure and look at the render at 1920, 1450, 1280, 1024, 768 and 390: no doubled line, no dangling segment, no line at the viewport edge at 1450px and below, hover and focus overlay on the line pixels, no layout shift. For one page (dev-only routes, mockups, drafts included) run `node scripts/visual-check.mjs <url> [widths...]` (Node 22.6 or newer: `.nvmrc` says 18, use a Node 22); it uses `analyzeLines` and `measureLines`, exported from `tests/e2e/lib/line-analysis.ts`, the same module as the guard. Scratch scripts import that module and do not port the function. Then judge the screenshots against the principles: subtle, nothing orange, nothing large and blue, nothing heavy or jagged, text visible (not dark on black).
   - Guard against a preview: build with `PUBLIC_PLAYWRIGHT_TEST=true`, then `npx playwright test --project=chromium tests/e2e/line-geometry.spec.ts --workers=2`. Playwright starts its own preview, so stop yours first. `astro preview` listens on `[::1]`: use `http://localhost:<port>`, not `127.0.0.1`. Details: DESIGN.md section 9.
4. Tab through the cells with the keyboard.
5. Get an independent visual review of rendered screenshots. Anything not rendered is NOT_CHECKED, not a pass.

## Gotchas

- `getStaticPaths` is hoisted and cannot read frontmatter constants.
- Git Bash rewrites `/` arguments: use `MSYS_NO_PATHCONV=1`.
- `networkidle` never settles in dev: `load` plus a 3 s wait.
- Screenshot very tall pages (over ~16k px) in chunks; one capture gives false floating findings.
- A bordered chip in a grid cell draws a dangling line: chip rows go outside the grid as borderless filled chips (DESIGN.md).
- No text webfont is loaded: the owner chose the system font (DESIGN.md section 2). Weight 200 cannot render in it and Segoe UI has no 500.

## Failure modes seen in this project

| Symptom | Cause | Fix |
| --- | --- | --- |
| Lines break after adding a header or filler to a grid | `:nth-child` border rules count non-cell children (`::after` filler, header) | no nth-child border rules; use the `--cols-*` properties or classes |
| Rows and lines stagger | fixed `aspect-ratio` on cells | `min-height`; rows stretch |
| Borders jump or flicker on hover | `transition: all` | an explicit property list |
| The next CSS rule silently vanishes | a `//` comment in a plain `.css` or `<style>` block | `/* */` there; `//` only in `lang="scss"` |
| Production bundle audit fails or ships extra chunks | a `client:only` island | render static, or keep islands out of the lines |
| A column divider is blurry or missing | gradient dividers on fractional pixels (1406px / 3 = 468.67px) | real borders |
| Side lines stop short of the edge at 1409 to 1450px | a container narrower than the viewport without side lines | containers are full width up to 1450px; never cap earlier |
| Cell lines hidden | an opaque cell background paints over the wrapper lines | transparent cell; an inner wrapper paints the surface |
| Overlay clipped at the viewport edge | missing clip, or a 1px ring | container `overflow-x: clip` at 1450px and below; focus ring 2px at inset -1px |
| Test passes but measures nothing | a redirect stub counted as a page | the guard replaces stubs by their destination; test the destination |
| Dashed or boxed element inside a grid | a bordered chip or box inside a cell draws a dangling line | plain content, or a cell of its own; form controls and prose widgets are the documented exceptions |
| Top edge dim on the first row at scroll top | the fixed header's bottom line covers the overlay's top pixel | known limitation (DESIGN.md Decisions); do not work around it |
| The page feels loud, cheap or eye-searing | a warm colour, a blue fill or tint, a solid button, a glow | remove it: neutral tokens, blue only on a link, icon or chevron (P1, P2); `design-guards.test.ts` catches warm colours only |
| Icons look heavy, jagged or uneven | a Lucide icon, an inline `<svg>`, a fractional size, a stroke prop, or a weight that does not match the size | `SiteIcon` with a whole-pixel size; the weight follows the size (P7, DESIGN.md section 5 Icons; `icon-set.test.ts` fails the first three) |
| A link shows an underline, or a title looks bold | `underline` or `hover:underline`, `font-semibold`, a plugin weight 600 | colour change on hover, `font-medium` at most (`design-guards.test.ts` fails these) |
| A cell hover turns blue | a local `bg-accent` or accent `color-mix` hover | use `cell-interactive`; the hover is the neutral card fill of P3 |
| A heading or text in a cell is nearly invisible | unstyled markup is not white by default | `text-fg` on headings, `text-fg-secondary` on body, or `prose prose-blog` |
| Text sits on the line with no padding | a bare `<div>` in a `.content-grid` | `.content-grid__text` or `padding-responsive-md` |
| The last cell of a `fill-last` listing mis-spans | children of mixed tags (`<a>` and `<div>`), or custom `--cols-*` | one tag for every child, default columns |
| Two `h1` on a page | `Hero` already renders the `h1` and a `SectionHeader` has `tag="h1"` | `SectionHeader` keeps `tag="h2"` below a `Hero` |
| `curl` or Playwright cannot reach `astro preview` on `127.0.0.1` | the preview binds `[::1]` | `http://localhost:<port>` or `--host 127.0.0.1` |
| Guard run fails with "already used" or load timeouts | a preview is already on the port; too many workers | stop it or set `PLAYWRIGHT_TEST_BASE_URL`; `--workers=2` |
| `node scripts/visual-check.mjs` fails to import a `.ts` file | Node older than 22.6 | use Node 22 |

## Links

[DESIGN.md](../../../DESIGN.md) (tokens, line model, primitives, decisions) · [page-recipes.md](page-recipes.md) · [line guard](../../../tests/e2e/line-geometry.spec.ts) · [mixins](../../../src/styles/variables.scss)
