---
name: line-grid-layout
description: Build or change pages, sections, cards, grids, banners and CTAs in the zentala.agency line-grid layout. Pick the right primitive, copy a page or section recipe, and verify that the 1px lines join without doubling. Use when creating a new page or route, adding a section to a page, adding or changing a card or grid component, touching borders, hover or focus on cells, writing grid or container CSS, or when a line looks doubled, missing, dangling or 1px off.
---

# Line-grid layout

The site is separated by 1px lines that join into one continuous grid. Every line has exactly one owner. Reference and numbers: [DESIGN.md](../../../DESIGN.md) section 3 (line model) and section 4 (primitives and props). This skill is the procedure; do not copy numbers from here.

## When to load

Load before you create or change a page, section, card, grid, banner, CTA, or any CSS that touches `border`, `margin`, `overflow`, hover or focus on a grid cell. Do not load for blog prose and copy ([docs/agents/blog-content.md](../../../docs/agents/blog-content.md)) or for token-only changes (DESIGN.md section 2).

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
| Page header | `section-full` plus `SectionHeader` (or `Hero`) | `src/components/primitives/sections/SectionHeader.astro` |
| Section wrapper | `Section` (`section-grid` plus `container-bordered`) | `.../sections/Section.astro` |
| Equal card grid, 2 to 5 columns | `SectionGrid columns={n}` or `.cards-grid` | `.../sections/SectionGrid.astro`, `src/styles/components/_grids.scss` |
| Prose or mixed columns | `.content-grid` with `--halves`, `--two-one`, `--one-two` | `_grids.scss` |
| Any other grid | `.line-grid` with `--cols-wide`, `--cols-medium`, `--cols-narrow` or `--grid-columns` | `_grids.scss` |
| Asymmetric bento | `SectionBento` with `BentoCard` spans | `.../sections/SectionBento.astro`, [bento notation](../../../docs/design/bento-notation.md) |
| Content block in a cell | `SectionContent context="grid"` | `.../sections/SectionContent.astro` |
| Standalone CTA, quote, banner | `SectionCTA`, `SectionBlockQuote`, `Banner` (all `line-block`) | `.../sections/`, `src/components/banners/` |
| Card | `CardContainer` as the root | `src/components/cards/CardContainer.astro` |
| Interactive cell | a direct-child `<a>`, or add `cell-interactive` | mixin in `src/styles/variables.scss` |
| Static cell | a plain child: no hover, no focus | |
| Listing with a variable count | add `line-grid--fill-last` (default 3/2/1 columns only) | `_grids.scss` |
| Article prose column | blog prose styles, not a grid | `src/pages/blog/[postSlug].astro` |
| Three static columns (post body) | `.line-grid` with a custom `--grid-columns` | `src/pages/blog/[postSlug].astro` |

Primitives and props are tabulated in DESIGN.md section 4 ("Primitives and props").

## Recipes

Full code, copied from real files, is in [page-recipes.md](page-recipes.md): a new page, a new section, a new card component, a standalone CTA or banner.

Shortest page: `Layout` > `Hero` > `section-full` > `container-bordered` > `cards-grid` > cards (this is `src/pages/portfolio.astro`).

## Do not duplicate

- Before writing CSS, read `src/styles/components/_grids.scss`, `_containers.scss`, the mixins in `src/styles/variables.scss` and the `sections/` folder.
- Never write border CSS for layout in a component. If a primitive lacks a case, extend the primitive (and add the case to the guard) instead of writing a local variant.
- No seventh border system. A new look or token goes into the DESIGN.md Decisions table first.
- A component that is a grid cell must not draw a border, `overflow: hidden`, a fixed `aspect-ratio`, an opaque background, or `margin` / `transform` / `z-index` for hover. Clip inside an inner wrapper with `overflow: clip` (see `CardContainer`). Make a tall card with `grid-row: span N`, give height with `min-height`.
- Tokens only: `text-fg-*`, `border-line`, `bg-surface-*`, `var(--color-*)`. No hex, no `gray-800`, no `-m-px`, no `transition: all`.
- Do not mix SCSS and Tailwind breakpoints in one rule. Tailwind `md` is 771 and `lg` is 1001; SCSS has `tablet`, `medium`, `large` mixins.

## Verify

1. `just check` (lint, build, unit tests, prod-bundle audit, critical e2e). It includes `tests/e2e/line-geometry.spec.ts`.
2. The guard builds its route list from `dist/**/index.html` at test time: a new page is covered without editing the spec. Redirect stubs are replaced by their destination, `/linkedin-preview/` is excluded, and one unbuilt path covers the 404 page. At 1920, 1450, 768 and 390 it fails on doubled lines (two segments 1px apart), a vertical line at the viewport edge at 1450px and below, a floating vertical segment that joins no other line, containers narrower than the viewport at 1450px and below, and any layout rect change on hover. 1280 runs on the four core routes only. See [tests/e2e/README.md](../../../tests/e2e/README.md).
3. Measure and look at the render at 1920, 1450, 1280, 1024, 768 and 390: no doubled line, no dangling segment, no line at the viewport edge at 1450px and below, hover and focus overlay on the line pixels, no layout shift. Reuse `analyzeLines` in the guard spec.
4. Tab through the cells with the keyboard.
5. Get an independent visual review of rendered screenshots. Anything not rendered is NOT_CHECKED, not a pass.

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

## Links

[DESIGN.md](../../../DESIGN.md) (tokens, line model, primitives, decisions) · [page-recipes.md](page-recipes.md) · [line guard](../../../tests/e2e/line-geometry.spec.ts) · [mixins](../../../src/styles/variables.scss)
