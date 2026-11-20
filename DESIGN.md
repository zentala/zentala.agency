# DESIGN.md

## TLDR

Dark, square, line-grid site: black surface, 1px gray-800 lines, one blue accent, light-weight type. All colour, type, radius, motion and breakpoint values come from tokens (CSS custom properties in `src/styles/tokens.scss`, mirrored in `tailwind.config.js`). All lines come from one line model (section 3): cells draw only their left and top line, hover is an overlay on lines that already exist. Anything not in this file is a design decision: record it in the Decisions table (section 10) first, then implement it. This file is the reference; to build a page, section or card, load the agent skill [line-grid-layout](.agents/skills/line-grid-layout/SKILL.md) (procedure, recipes, failure modes). Incomplete last rows of variable-length card grids use `line-grid--fill-last` (section 4); blog helpers and components are named in section 5. Every component is shown, with its variants, in the dev-only gallery at `/demo` (`src/pages/demo/[...slug].astro`, `src/components/demo/`); owner-facing mockups of undecided changes live at `/mockups/<name>` (dev only, registry `src/components/blog/mockups/registry.ts`). Neither ships to production and neither is covered by the line guard (section 9).

## 1. Visual direction

- Black (`#000`) surface; content is defined by 1px lines, not by shadows or radii.
- White type, light weight (300) for page titles and hero text.
- Single accent `#60a5fa`; solid blue `#2563eb` is for one main action per page (Button `accent`).
- Cards and containers are square. Chips, tags and badges are square too (4px); pills (`--radius-full`) are for avatars only.
- Dev-only affordances (bento span labels, DRAFT badges, version-history panel) never render in production.

## 2. Tokens

Source of truth: `src/styles/tokens.scss` (`:root`). SCSS aliases in `src/styles/variables.scss` (`$border-color`, `$border-color-hover`, `$surface-base`, `$surface-hover`, `$color-accent`) point at the same variables.

### Colour roles

| Role                  | CSS variable             | Value                                                   | Tailwind             |
| --------------------- | ------------------------ | ------------------------------------------------------- | -------------------- |
| Surface               | `--color-surface`        | `#000`                                                  | `bg-surface`         |
| Surface raised        | `--color-surface-raised` | `#0b0f17` (slightly blue: chips, code, inputs, popovers) | `bg-surface-raised`  |
| Surface hover         | `--color-surface-hover`  | `color-mix(in srgb, var(--color-accent) 10%, var(--color-surface))`, about `rgb(10,17,25)` (accent wash) | `bg-surface-hover`   |
| Line                  | `--color-line`           | `#1f2937`                                               | `border-line`        |
| Line strong (hover)   | `--color-line-strong`    | `#374151`                                               | `border-line-strong` |
| Line focus            | `--line-focus`           | `rgba(255,255,255,.55)`                                 |                      |
| Text                  | `--color-text`           | `#fff`                                                  | `text-fg`            |
| Text secondary        | `--color-text-secondary` | `rgba(255,255,255,.75)` (about 10:1)                    | `text-fg-secondary`  |
| Text muted            | `--color-text-muted`     | `rgba(255,255,255,.60)` (about 7.4:1)                   | `text-fg-muted`      |
| Text subtle           | `--color-text-subtle`    | `rgba(255,255,255,.55)` (6.3:1, the FLOOR for any text) | `text-fg-subtle`     |
| Accent                | `--color-accent`         | `#60a5fa` (8.3:1)                                       | `text-accent`        |
| Accent hover          | `--color-accent-hover`   | `#93c5fd`                                               | `text-accent-hover`  |
| Accent solid          | `--color-accent-solid`   | `#2563eb`                                               | `bg-accent-solid`    |
| Warn (DRAFT, caution) | `--color-warn`           | `#f59e0b`                                               | `text-warn`          |
| Success               | `--color-success`        | `#34d399`                                               | `text-success`       |
| Danger                | `--color-danger`         | `#f87171`                                               | `text-danger`        |

### Mapping from legacy values (other packages apply this)

| Old                                                                                   | New                                                                       |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `text-gray-600`, `text-gray-700`, `text-gray-500`, `text-white/30` to `text-white/50` | `text-fg-subtle`                                                          |
| `text-gray-400`, `text-white/60`                                                      | `text-fg-muted`                                                           |
| `text-gray-300`, `text-white/70` to `text-white/90`, `text-neutral-300`               | `text-fg-secondary`                                                       |
| `text-white`                                                                          | `text-fg`                                                                 |
| `text-blue-400`, `text-blue-500`, `#3b82f6`, `#60a5fa` (text)                         | `text-accent` / `var(--color-accent)`                                     |
| `text-blue-300`, `#93c5fd`                                                            | `text-accent-hover`                                                       |
| `bg-black`, `#000`                                                                    | `bg-surface` / `var(--color-surface)` (or transparent inside a grid cell) |
| `bg-gray-900`, `#111827`                                                              | `bg-surface-hover`                                                        |
| `#0a0a0a`, `#0b0f17`                                                                  | `bg-surface-raised`                                                       |
| `#1f2937`, `border-gray-800`, `$border-color`                                         | `var(--color-line)` / `border-line`                                       |
| `#374151`, `border-gray-700`, `$border-color-hover`                                   | `var(--color-line-strong)` / `border-line-strong`                         |
| amber-500, `#f59e0b`                                                                  | `text-warn`                                                               |
| `#10b981`, green-400                                                                  | `text-success`                                                            |
| `text-[8px]`, `text-[9px]`, `text-[10px]`                                             | `text-label`                                                              |
| `duration-200`, `duration-300`, `200ms`, `0.3s`                                       | `duration-fast` / `var(--motion-fast)`                                    |
| `transition: all`, `transition-all`                                                   | an explicit property list                                                 |

### Type scale (rem; no px sizes, no 8-10px)

| Token              | Value             | Token            | Value      |
| ------------------ | ----------------- | ---------------- | ---------- |
| `--text-label`     | `.6875rem` (11px) | `--text-h3`      | `1.5rem`   |
| `--text-sm`        | `.875rem`         | `--text-h2`      | `1.875rem` |
| `--text-body`      | `1rem`            | `--text-h1-page` | `2.25rem`  |
| `--text-lead`      | `1.125rem`        | `--text-h4`      | `1.25rem`  |
| `--tracking-label` | `.12em`           |                  |            |

- Roles: page-title, section-title, card-title. Display sizes for the hero use `clamp` steps.
- Weights: 300 titles, 400 body, 600 labels and card titles.
- Label style: uppercase, `.6875rem`, 600, tracking `.12em`, `text-fg-subtle` or brighter. Tailwind: `text-label` (sets size, tracking, line-height).
- Font Inter / InterVariable; buttons inherit (`font: inherit`).
- Reading column 65-75ch; line-height 1.65-1.7.

### Spacing

- Responsive scale 16, 24, 32, 48, 64px via the mixins `padding-responsive`, `px-responsive`, `py-responsive` and the `py-responsive-*` classes. Vertical `xs`-`xl` are 8/16/32/64/96px.
- No hand-written `p-8` or `px-16` on controls.

### Radii

`--radius-none` 0 (cards, containers, article widgets); `--radius-sm` 4px (chips, tags, badges, code, inputs; Tailwind `rounded-chip`); `--radius-full` 9999px (avatars only, never a chip).

### Motion

- Durations: `--motion-fast` 150ms (colour, border, arrow nudge), `--motion-base` 250ms (background, opacity, reveal), `--motion-slow` 600ms (hero or bento stage changes). Tailwind: `duration-fast|base|slow`.
- Easing: `--ease-standard` `cubic-bezier(.2,.8,.2,1)`, `--ease-enter` `cubic-bezier(.16,1,.3,1)`. Tailwind: `ease-standard|enter`.
- Properties that may transition: `color`, `background-color`, `border-color`, `box-shadow`, `opacity`, and the `transform` of inner glyphs (arrows, icons, image zoom inside a clipped wrapper). Never `transition: all`.
- Shared keyframes: `appear` (opacity plus `translateY(8px)`), in `src/styles/motion.scss`.
- Hero reveal: `.hero-reveal` fades up 8px over `--motion-slow` with `--ease-enter`; `--reveal-index` (0 or 1) staggers by 60ms; CSS only, first viewport only, `animation: none` under reduced motion.
- Ambient loops (`CardIconMosaic`) pause off-screen through an IntersectionObserver (class `.is-paused`) and never run under reduced motion.
- Z-index for hover: `--z-cell-hover` (2) is the only one.

### Breakpoints

| System                  | Values                                                                                               |
| ----------------------- | ---------------------------------------------------------------------------------------------------- |
| SCSS (`variables.scss`) | mobile 480, tablet 770 (hamburger from 771), medium 1000, large 1440, container side lines from 1451 |
| Tailwind `screens`      | sm 640, **md 771**, **lg 1001**, xl 1280, 2xl 1536                                                   |

md and lg were moved from 768 and 1024 so Tailwind switches where the SCSS tablet and medium edges are. sm, xl and 2xl keep their defaults: xl (1280) drives the blog rail. Never mix both systems in one rule.

## 3. Line model

1px everywhere; every line is owned by exactly one element, and no two lines are ever 1px apart.

### Who owns which line

```
 viewport edge (<=1450px: no side lines)      container side lines (>=1451px only)
        |                                     |
        |   section-full  ---- border-bottom (section owns the separator below it) ----
        |   +-- container-bordered ----------------------------------------------+
        |   |   SectionHeader ---- border-bottom (header owns the line under it)  |
        |   |   .line-grid  margin: -1px 0 0 -1px   (top and left lines overlap   |
        |   |   +--------+--------+--------+            the header line and the   |
        |   |   | cell   | cell   | cell   |            container side line)       |
        |   |   | L + T  | L + T  | L + T  |   cell = border-left + border-top    |
        |   |   +--------+--------+--------+   next row's top = this row's bottom |
        |   +---- grid bottom = container bottom = the section's border-bottom ----+
```

1. **Outer verticals belong to the container.** `.container-bordered`, `.container-padded` (and `.container-header`, lines only) draw `border-left` and `border-right` at `min-width: 1451px` and nothing below. At 1450px and below `.container-bordered` and `.container-padded` set `overflow-x: clip`, which hides the 1px a grid or block overlay overshoots, so no line appears at the viewport edge.
2. **Horizontal separators between stacked blocks belong to the section.** `.section-full` and `.section-grid` draw `border-bottom`, defined once in `_containers.scss`.
3. **Inner dividers belong to the grid wrapper and its cells.** `.line-grid`, `.cards-grid` and `.content-grid` are the same implementation (mixin `line-grid`). The wrapper has `margin: -1px 0 0 -1px`, so the first row's top line lands on the line above (header or previous section) and the first column's left line lands on the container's left line. Each direct child is a cell with `border-left` and `border-top` only (mixin `line-cell`). Cells have no right or bottom border: the right line of a cell is its neighbour's left line, or the container's right line; the bottom line is the next row's top line, or the section's bottom line.
4. **Cells are transparent** and own no `nth-child` rules, no transparent-border placeholders and no `overflow: hidden`. Content is clipped by an inner wrapper (`overflow: clip`), never by the cell. The wrapper itself paints `--color-surface`.
5. **Uneven grids.** Rows stretch (`align-items: stretch`), so row lines align across the row. Cells use `min-height`, never a fixed `aspect-ratio`. A tall card uses `grid-row: span N`.
6. **Incomplete last row.** The wrapper's `::after` is an auto-placed filler that spans from the first free column to the last (`grid-column: auto / -1`) with the same left and top line: it draws the line under the cells above the gap. With a full last row it collapses to zero height (`margin-bottom: -1px`) and sits on the section's bottom line. Add `.line-grid--fill-last` to make the last real cell take the rest of the row instead. Bento grids switch the filler off (`display: none`) because their cards fill by manual placement.
7. **Hover is an overlay, with zero layout shift.** `cell-interactive` adds `::after { position: absolute; inset: -1px; border: 1px solid var(--color-line-strong); opacity: 0 }` and `:hover::after { opacity: 1 }`. With the cell's own left and top borders, `inset: -1px` puts the overlay's four edges exactly on the cell's left line, top line, the neighbour's left line (right edge) and the next row's top line (bottom edge), or on the container and section lines at the grid's edges. The cell also changes `background-color` to `--color-surface-hover`. Nothing else changes: no border width, scale, translate or z-index jump. The overlay's z-index is `--z-cell-hover`.
8. **Focus is the same overlay, 2px wide** (`--focus-ring-width`, drawn from the line pixel inward) in `--line-focus` (`:focus-visible`, and `:has(:focus-visible)` for cells that contain the focusable link). The cell's own `outline` is removed only because the overlay is present. Every other interactive element gets the global `:focus-visible { outline: 1px solid var(--line-focus); outline-offset: -2px }` from `motion.scss`. Anything reachable by hover is also reachable by focus.
9. **Standalone blocks** (SectionCTA, SectionBlockQuote, banners) outside a `.line-grid` use mixin `line-block`: `border-top` plus `margin-top: -1px` (overlapping the line above), reset to `0` directly after a `.line-grid`, whose filler already draws that line. They also include `cell-interactive`.
10. **Guard:** `tests/e2e/line-geometry.spec.ts` reads rendered pixels (device scale 1) on every static route found in `dist/` and fails on doubled lines, a vertical line at the viewport edge at 1450px and below, a floating vertical segment, containers narrower than the viewport at 1450px and below, and a layout change on hover. Details in section 9, "Route coverage".

### Worked example and the five things to remember

A 3-column section with 7 cells: rows 1 and 2 are full (cells 1-6), row 3 holds cell 7 in column 1. The wrapper's `::after` filler takes columns 2-3 of row 3 and draws only a left and top line, so the line under cells 5 and 6 and the left line of the empty slot are drawn once. A listing adds `line-grid--fill-last` instead: cell 7 spans columns 1-3 and the filler is not needed.

Five things to remember:

1. One line, one owner: container verticals (from 1451px), section bottom, grid top-left overlap, cell left and top.
2. A cell never draws a border, an opaque background, `overflow: hidden` or a fixed `aspect-ratio`.
3. Hover and focus are an overlay on existing line pixels; nothing moves.
4. Standalone blocks use `line-block`; variable-length listings use `line-grid--fill-last`.
5. Reuse a primitive; a new look is recorded in section 10 first.

### Why borders, and the measurement

The first proposal drew column dividers as a `repeating-linear-gradient` on the wrapper. It was not adopted: stops at fractional column widths (1406px / 3 = 468.67px) are not pixel-snapped, cells with an opaque background paint over a wrapper gradient, and the hover overlay would still need border-based lines to land on. Not measured as a prototype; the choice rests on those reasons. The border model was measured instead (Chromium, `deviceScaleFactor` 1, screenshot pixels) on `/portfolio`:

| Viewport              | Track widths                                       | Dividers                                                                                                       |
| --------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| 1920                  | 469 / 469 / 469 px (grid 1407px wide)              | single `#1f2937` pixel columns at x 725 and 1194; no adjacent pair                                             |
| 1280                  | 427 / 427 / 427 px                                 | single pixel columns at x 426 and 853; no adjacent pair                                                        |
| 1920, hover on cell 2 | rect and `scrollHeight` identical before and after | pixels on x 725 and 1194 and on the top line turn `#374151` (55,65,81) in place; the pixel inside is `#111827` |

2-column tracks at 771-1000px are fractional (for example 640.5px); the same pixel analysis found no adjacent pair there. Pixel analysis: line-coloured runs of at least 48px; a pair of runs on adjacent rows or columns with at least 8px overlap, not part of a thicker filled area, is a defect.

## 4. Layout and grid primitives

| Need                   | Use                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| Page header            | `.section-full` plus `SectionHeader`                                                             |
| Equal card grid        | `.cards-grid` (modifiers `--halves`, `--two-one`) or `SectionGrid columns={2..5}`                |
| Prose or mixed content | `.content-grid` (modifiers `--halves`, `--two-one` 1.67fr/1fr, `--one-two`)                      |
| Any other grid         | `.line-grid` with `--cols-wide`, `--cols-medium`, `--cols-narrow`                                |
| Home bento             | `SectionBento` with spans (`BentoCard`)                                                          |
| Containers             | `.container-bordered` (lines, sections), `.container-padded` (padding only), `.container-simple` |

Do not add a seventh border system. New grids use `.line-grid`. Path alias `@/` = `/src`.

### API for components

- **Columns.** `--cols-wide` (above 1000px, default 3), `--cols-medium` (771-1000px, default 2), `--cols-narrow` (770px and below, default 1). `--cols` is derived. Set them on the element (`style="--cols-wide: 4"`); `.content-grid` defaults to 2 / 1 / 1. Custom proportions: `--grid-columns: 1.67fr 1fr` (replaces the whole template).
- **Mixins** (`src/styles/variables.scss`): `line-grid`, `line-cell`, `line-block`, `cell-interactive`, plus the existing `padding-responsive`, `px-responsive`, `py-responsive`, `tablet`, `medium`, `medium-up`, `container-borders`, `container-side-lines`, `section-borders`.
- **Classes**: `.line-grid`, `.line-grid--fill-last`, `.cards-grid`, `.content-grid`, `.cell-interactive`.
- **Incomplete last row.** Grids whose cell count varies (blog index, series, category) add `line-grid--fill-last`: the last cell spans the remaining columns, so no stray or missing line is left (measured at 1920, 1280 and 1024 on `/blog`, `/series/agent-native-harness`, `/category/innovation`). The default wrapper filler stays for grids that do not opt in; with a gap it draws a vertical line on the last column only and leaves the last cell without a right line, so it is not used for listings. `fill-last` assumes the default 3 / 2 / 1 columns (grid placement cannot span "the rest", so the spans are written out); do not combine it with custom `--cols-*`.
- **A component opts into being a grid cell** by being a direct child of one of the grid classes: it gets its lines automatically and must not draw a border, `overflow: hidden`, a fixed `aspect-ratio` or an opaque background. A direct-child `<a>` is interactive automatically. Any other interactive cell adds `class="cell-interactive"` or `@include cell-interactive` in its own style (add `position: relative` only through the mixin). Inside the cell, wrap content that needs clipping in an inner element with `overflow: clip` (see `CardContainer`).
- **Do not** put `margin`, `border`, `transform` or `z-index` rules on a cell for hover or layout.

### Primitives and props

Props verified against the source files on 2026-11-20. Files are in `src/components/primitives/sections/` unless stated.

| Component | Draws | Props (default; options) | Example |
| --- | --- | --- | --- |
| `Section` | section (`section-grid` plus `container-bordered`) | `id`, `class` | `<Section id="cta">` |
| `SectionHeader` | header block with the line below it | `headline`, `subhead`, `eyebrow`, `icon`, `logoSrc`, `logoAlt`, `eyebrowIcon`, `compact` (false; plain header padding when an eyebrow is set), default slot (body under the subhead), `tag` (`h2`; `h1`, `h3`), `align` (`left`; `center`), `interactive` (deprecated, no effect) | `<SectionHeader headline="Services" subhead="..." />` |
| `SectionGrid` | `.line-grid` of equal cells | `columns` (3; 2 to 5) | `<SectionGrid columns={4}>` |
| `SectionContent` | one cell or a full block of prose | `context` (`auto`, which resolves to `full`; `full`, `grid`), `prose` (true) | `<SectionContent context="grid" prose={false}>` |
| `SectionBento` | bento `.line-grid`, 4 / 2 / 1 columns, filler off | `rowHeight` (`1fr`) | `<SectionBento rowHeight="1fr">` |
| `BentoCard` | bento cell | `colSpan` (1; 1 to 4), `rowSpan` (1; 1 to 3), `padding` (`md`; `none`, `sm`, `lg`) | `<BentoCard colSpan={2} rowSpan={2}>` |
| `SectionCTA` | standalone block (`line-block`) | `href`, `text`, `icon`, `arrow` (true), `variant` (`primary`; `secondary`, `accent`, `outline`), `external`, `bgText`, `class` | `<SectionCTA href="/contact" text="Get started" />` |
| `SectionBlockQuote` | standalone block (`line-block`) | `quote`, `author`, `role`, `variant` (`default`; `large`, `minimal`), `class` | `<SectionBlockQuote quote="..." author="..." />` |
| `SectionImage` | image cell or background | `src`, `alt`, `class`, `loading` (`lazy`), `aspectRatio` (`square`; `16/9`, `4/3`, `auto`), `objectFit` (`cover`), `background`, `animateIn`, `hoverZoom` (true), `overlayPosition` (`bottom-left`) | `<SectionImage src="..." alt="..." />` |
| `CardContainer` (`src/components/cards/`) | grid cell, a link when `href` is set | `href`, `hasHover` (true when `href`), `backgroundIcon`, `class`, `target` (`_self`) | `<CardContainer href="/x">` |
| `Button` (`src/components/`) | link styled as a button | `href`, `text`, `target`, `variant` (`primary`; `secondary`, `accent`, `outline`, `light`), `icon`, `arrow` (true) | `<Button href="/contact" text="Contact" variant="accent" />` |
| `Tag`, `TagGroup` (`src/components/primitives/`) | square chip, row of chips | `Tag`: `text`, `href`, `prefix` (`#`), `theme` (`chip`; `simple`, `label`), `class`. `TagGroup`: `tags`, `theme`, `prefix`, `hrefPrefix`, `class`, `tagClass` | `<TagGroup tags={['a', 'b']} />` |
| `Badge` (`src/components/primitives/`) | square chip | `variant` (`tech`; `accent`), `size` (`sm`; `md`), `class` | `<Badge variant="accent">New</Badge>` |
| `DraftBadge` (`src/components/primitives/`) | dev-only marker, no layout space | `placement` (`corner`; `edge`, `inline`), `review` (false), `label` | `<DraftBadge review />` |
| `Banner` (`src/components/banners/`) | standalone block (`line-block`) | `variant` (`simple`, `simpleWithImage`), `title`, `description`, `linkText`, `linkHref`, `image`, `class` | `<Banner variant="simple" ... />` |

A `line-block` component needs a `container-bordered` parent. Header and Footer are page chrome: the header draws its own bottom line (`container-header`, lines only) and the footer bands use `section-bordered`.

### Component gallery and mockups (dev only)

- **`/demo`** is the component gallery (`src/pages/demo/[...slug].astro`, `src/components/demo/`): every component with file path, purpose, props and rendered variants, in ordinary line-grid sections, with sample content from the real blog collection (`samples.ts`). Add each new or changed component in the same change: a row in `src/components/demo/manifest.ts` (or a file in `groups/`) and a `<GalleryEntry>` in the matching `Gallery*.astro`. `tests/unit/component-gallery.test.ts` fails when a component has no entry; it checks existence, not that the variants are current.
- **`/mockups/<name>`** (`src/pages/mockups/[mockup].astro`) shows owner-facing mockups of undecided changes: one entry in `src/components/blog/mockups/registry.ts` plus its component. `getStaticPaths` returns `[]` outside DEV, so nothing is built. The gallery test exempts the `mockups/` directory; when the owner accepts a mockup, move the component out so the test requires a gallery entry. The mockup markers `MockupNotice` and `MockupDevLabel` are square warn chips like `DraftBadge`.
- **Heading switch (C5 mockup):** `src/dev/heading-switch.ts`, loaded in DEV only from `Layout.astro`, reads `?headings=300|200|off`, remembers it in localStorage and sets `html[data-headings]`. Headings are already weight 300 (`font-light`), so the 300 variant only enlarges them; no Inter webfont file is loaded, so 200 cannot render thin. That the loader is absent from `dist/` (`scripts/audit-prod-bundle.mjs`) is not yet verified on a build.

### Page anatomy

```
 Header (fixed)                 owns its bottom line; container-header draws side lines >= 1451px
 ------------------------------------------------------------------------------ header line
 section-full                   owns the line BELOW it (border-bottom)
   container-bordered           owns the outer verticals (>= 1451px)
     SectionHeader              owns the line under the header block (Hero is its own section-grid)
     .line-grid                 margin -1px overlaps the header line and the container line
       cell | cell | cell       each cell owns its left + top line
       cell | cell | filler     filler (or fill-last) closes the incomplete row
 ------------------------------------------------------------------------------ section line
 section-grid (Section)         same structure: SectionHeader + SectionGrid / SectionBento
 ------------------------------------------------------------------------------ section line
 SectionCTA / Banner            line-block: own top line, overlaps the line above
 ------------------------------------------------------------------------------ section line
 Footer                         section-bordered bands own their lines
```

Applied on: `/`, `/portfolio`, `/about/capabilities`, `/blog`, series, category, `/contact`, `/about/capabilities/backstage`, the dev-only `/demo` gallery and the zntl-desk case study. The blog post page uses a three-cell `.line-grid` at xl (left rail, article, right rail) with PostNav as its own section.

## 5. Component rules

- **Cards** (PostCard, SeriesCard, OfferCard, PortfolioItem, CardContainer): no borders, no `overflow: hidden`, no fixed aspect-ratio (`min-height`), interactive overlay from the mixin, titles wrap (`line-clamp-2`), excerpt line-clamp, one title size per grid.
- **Badges and meta:** one DraftBadge (icon plus uppercase text-xs; props `placement` `corner|edge|inline`, `review`, `label`; a plain draft is warn amber, `review` is accent blue with the label "Review" and an eye icon, `label` replaces the text of an amber dev note); one `formatDate` (en-GB, UTC, with `<time>`); one part label ('Part n of N' only when contiguous, else 'Part n'); the category display name is the badge text and is used in the h1, the document title and the slug.
- **Blog helpers** (`src/lib/blog/`): `formatDate`, `partLabel`, `slugify`, `isVisiblePost` / `getVisiblePosts` (one visibility rule, `SHOW_DRAFTS`), plus the `DraftBadge` primitive. Pages never inline these rules.
- **Blog components** (`src/components/blog/`): `PostMeta` (`tone="muted"` for the post hero at 14px `text-fg-muted`; listings keep `subtle`), `SeriesRail`, `PostNav`, `PostToc`, `ShareButtons`.
- **Background icons** (`CardBackgroundIcon`): .06 at rest, hover capped at `--icon-bg-max-opacity` (.12); decorative icons never exceed it.
- **Tags and labels:** the one label style; 4px square chips (`--radius-sm`) filled with `surface-raised`, no border (a bordered chip in a grid cell draws a dangling line). `Tag` and `TagGroup` themes are `chip` (default), `simple`, `label`; `Badge` is the same square chip. A chip row outside a grid sits in a padded block: borderless chip filled with text colour at 8%, accent wash at 12% on hover (`CategoryChips` in the mockup).
- **CTA cells and quotes:** the same overlay hover; no `translateY`, scale or z-index jumps; the arrow nudges `translateX(4px)`.
- **SectionHeader:** `eyebrowIcon`, `compact` and the default slot are in section 4; the `interactive` prop is deprecated and has no effect (the 1.1x scale was removed). Centred subheads centre their box (`margin-inline: auto`).
- **Buttons:** `Button` variants `primary` (solid white, dark text), `secondary` (outlined, `line-strong` border, white text) and `accent` (solid `#2563eb`, one main action per page); `light` and `outline` are aliases of primary and secondary for old callers. Every variant has a 1px border so buttons in a row have equal height. Solid white and solid blue get a 2px white outline at 2px offset on `focus-visible`. All CTAs use the shared Button/CTA component.
- **Inputs:** `surface-raised` fill, line border, focus uses the focus ring; buttons and fields in a row have equal height.
- **Links:** accent, hover accent-hover, underline on hover for arrow links (including the PortfolioItem link title).

## 6. Interaction states

- **Hover:** overlay `line-strong` plus `surface-hover` background (the accent wash), 150ms.
- **Focus-visible:** the same overlay in `line-focus` on cells; global 1px inset ring for everything else. Every hover affordance has a focus and touch equivalent.
- **Active:** no scale.
- **Reduced motion:** one global block in `motion.scss` sets animation and transition durations to `.01ms`, iteration count 1, `scroll-behavior: auto`, and zeroes transforms on `[data-motion]`. Colour changes stay. JS-driven zoom must check `prefers-reduced-motion` itself.
- **Reveal (approved, C8):** 8px fade-up, 60ms stagger, first viewport only (`.hero-reveal` in `Hero.astro`), never starts hidden without JS. Nothing below the fold animates on scroll.

## 7. Responsive

- Columns: 3 above 1000, 2 from 771 to 1000, 1 at 770 and below.
- Container side lines only at 1451px and above; below, `overflow-x: clip` hides the outer line.
- Header 56px at 390.
- Post navigation is available below 1280px (details and end-of-article block).
- Verify at 1920, 1450, 1280, 1024, 768 and 390 (1450 is the widest width without container side lines).

## 8. Accessibility

- Text contrast minimum 4.5:1; the `text-subtle` floor is 6.3:1 on `#000`. Lines and decorative icons are exempt (1.43:1 is fine for lines).
- Minimum text size 11px (`.6875rem`).
- Visible focus on every interactive element.
- One h1 per page (blog index and home included).
- Dates use `<time datetime>`.
- No horizontal scroll at 390.
- Images have meaningful alt text; no placeholder images in production.

## 9. Design guard and checks

- `just check` includes the geometry spec (`tests/e2e/line-geometry.spec.ts`).
- Greps that must return nothing in `src/`: hex colours in `.astro` files, `text-gray-(500|600|700)`, `text-white/<55`, `transition: all`, `nth-child` border rules. Also review any `border` in an `.astro` component that sits in a grid, and any `client:only`.
- Failure modes seen in this project (symptom, cause, fix): the table in the [line-grid-layout skill](.agents/skills/line-grid-layout/SKILL.md).

### Route coverage

What the guard measures now. Routes come from `dist/`, so a new page is covered without editing the spec.

- **Routes:** every `dist/**/index.html`. A redirect stub is replaced by its destination. `/linkedin-preview/*` is excluded (it mocks a third-party UI). The redirects `/capabilities` and `/offer/backstage` are set in `astro.config.mjs`. One unbuilt path stands in for the 404 page.
- **Widths:** 1920, 1450, 768 and 390 on all routes; 1280 on the four core routes (`/`, `/blog`, `/about/capabilities`, `/portfolio`).
- **Checks:** no two parallel line segments 1px apart; no vertical line at the viewport edge at 1450px and below; no vertical segment of 80px or more that joins no other line (prose widgets such as table, pre, code, blockquote, form controls, LinkedIn cards and `[data-prose-widget]` article blocks are excluded); containers span the viewport at 1450px and below; hovering the first interactive cell changes no layout rect (at 1920).
- **Not covered:** dev-only routes (`/demo`, `/mockups/*`) and drafts (`published: false`, for example `/blog/software-factory-tour`) are never in `dist/`, so the guard cannot see them. Check them by hand with the same pixel analysis. A page taller than about 16k px must be chunked: Chrome paints black rectangles in a taller screenshot, which gives false floating-line findings. Series with fewer than 2 published parts are not built in production, so the route list shrinks.
- **Prose widgets:** article blocks in `src/components/blog/rich/` carry `data-prose-widget`; the guard skips those rects for the doubled-line and the floating-segment check (`PROSE_WIDGET_SELECTOR` in the spec).
- **Not measured:** the overlay colour on the line pixels, focus geometry, 1024px, screenshots. Those stay manual: measure and look at 1920, 1450, 1280, 1024, 768 and 390.

## 10. Decisions

Append-only: add a row before you add a new look or token to code. A change to a live row adds a new row; the replaced row moves to [docs/design/decisions-history.md](docs/design/decisions-history.md).

### Pending owner rows

Blog index structure (C1: the mockup at `/mockups/blog-series` awaits the owner's pick), about/mission fate (C3), heading weight and size (C5: the dev switch awaits the pick; if 300 wins, replace `zoom` with token steps of about `--text-h3` 1.7rem, `--text-h2` 2.1rem, `--text-h1-page` 2.55rem).

### Table

| Date | Decision | Replaces | Why |
| --- | --- | --- | --- |
| 2026-11-19 | One line model: cells draw only left and top lines, the wrapper overlaps the line above and the container line, hover and focus are an `::after` overlay | Six copy-pasted border systems (transparent borders, `nth-child`, `margin -1px`, hover borders) | Doubled and missing lines; per the design audit |
| 2026-11-19 | Border model, not a gradient model, for dividers | Wrapper `repeating-linear-gradient` proposal | Fractional stops are not pixel-snapped; opaque cells paint over a wrapper gradient |
| 2026-11-19 | Semantic tokens as CSS custom properties, mirrored in Tailwind | SCSS-only variables plus raw hex | One vocabulary for SCSS, Tailwind and inline styles |
| 2026-11-19 | Text floor `text-subtle` (.55 alpha) | gray-500/600/700 and white/30-50 | Contrast |
| 2026-11-19 | Motion tokens 150/250/600ms, standard easing; no `transition: all` | 150-700ms, ms and s mixed | One motion language |
| 2026-11-19 | Tailwind md 771 and lg 1001 aligned to SCSS; xl 1280 retained | Tailwind defaults 768 and 1024 | Blog rail depends on xl; md and lg now switch with the SCSS tablet and medium edges |
| 2026-11-19 | Global `:focus-visible` inset ring in `--line-focus`; cells use the overlay | Browser default ring | Visible, consistent focus |
| 2026-11-19 | One global reduced-motion block | Six local handlers | Gaps on the hero, hamburger and floating labels |
| 2026-11-19 | `.container-bordered` is `display: flow-root` and clips `overflow-x` at 1450px and below | none | Grid negative margins must not collapse through the container; no stray line at the viewport edge |
| 2026-11-19 | Eyebrow label uses the label style (11px, 600, tracking .12em, `text-subtle`) | 12px, 400, .2em, white/50 | One label style, contrast |
| 2026-11-19 | `SectionHeader` `interactive` scale hover removed; prop kept as deprecated no-op until importers drop it | scale 1.1, shadow, z-index 10 | Scaling a cell breaks every shared line |
| 2026-10-19 | Header navigation responds to the header's available inline size; below 1180px use the existing hamburger menu, below 600px hide the agency descriptor. Keep logo and controls on one row. | Viewport-only navigation breakpoints and wrapping logo text. | An open hub chat panel reduces the page width while the viewport remains wide; all navigation must remain reachable down to a 400px page width. (lives on `feat/hub-chat-adoption`, not yet on main) |
| 2026-11-19 | Incomplete last row closed by `line-grid--fill-last` on listings, not the wrapper filler | Wrapper filler (stray last-column line, no right line on the last cell) | Measured at 1920/1280/1024; `auto / -1` cannot span, so nth-child spans for the 3/2/1 default |
| 2026-11-19 | Overlay inset -1px on all sides; wrapper margin `-1px 0 0 -1px` | Per-grid overlay offsets | Overlay lands on the neighbour's, next row's and container lines |
| 2026-11-19 | Standalone blocks (CTA, quote, banner) use the `line-block` mixin | Own borders | Same line model as grids |
| 2026-11-19 | Direct-child `<a>` in a line grid is interactive automatically; other interactive cells opt in with `.cell-interactive` | Hover border on every cell | Static cells stay quiet |
| 2026-11-19 | Per-breakpoint columns via `--cols-wide`, `--cols-medium`, `--cols-narrow`; `.content-grid` defaults to 2/1/1 | Per-grid media queries | One column API |
| 2026-11-19 | `SectionGrid` `gap` prop removed | Unused prop | No importer used it |
| 2026-11-19 | PortfolioItem link title at full accent strength, underline on hover | Opacity .75 | Contrast gain is intentional |
| 2026-11-19 | Dates en-GB long month, UTC ('8 September 2026') | Short month | Short en-GB renders 'Sept' on newer ICU |
| 2026-11-19 | Series rail rows show the real part number; date only on the newest part, muted | Row index | Gaps from unpublished parts stay honest |
| 2026-11-19 | `DraftBadge` renders only when `SHOW_DRAFTS` is true | Caller-side gating | No caller gates it |
| 2026-11-19 | 'New' chip and '+N more' button are square | Rounded corners | Square-card rule |
| 2026-11-19 | Category display name is the badge text, used in h1, title and slug | Description title as a name | One canonical name |
| 2026-11-19 | 'LinkedIn draft' link on series cards is an accent square chip on `bg-surface-hover` | blue-900 pill | Token colours, square chips |
| 2026-11-19 | Series rail shows previous, current, next part plus 'See all N parts'; reading time and share move into the hero meta below 1280px | Full list in the rail | Shorter rail |
| 2026-11-19 | Related posts for non-series posts: same category, newest first, three at most; every PostNav ends with '← All posts' | None | Navigation dead ends |
| 2026-11-19 | Prose body `--color-text-secondary`, headings white, line-height 1.7 from md up | `leading-relaxed` (1.625) | Middle of the 1.65-1.7 range |
| 2026-11-19 | Prose inline code on line border and `surface-raised`, 4px radius; pre, images and blockquote 4px, no right rounding | `rounded-lg` | Square-card rule |
| 2026-11-19 | Base `.prose` block uses tokens, no `theme('colors.gray.*')` | Legacy gray values | One colour source |
| 2026-11-19 | LinkedIn preview banner: centred warn 'Draft preview' chip; counters read 'Likes: -', 'Comments: -' | Blue banner | Token colours |
| 2026-11-19 | Share buttons square; copied state uses the success colour via Tailwind group variants | 6px radius, scoped CSS | Astro scoped CSS did not reach spread-prop svgs |
| 2026-11-19 | Active nav link: persistent 1px underline at 40% opacity (100% on hover or focus), 4px below the baseline | None | No nav active state existed |
| 2026-11-19 | Mobile menu items inset with the header padding; active and hover background `surface-hover` | `px-responsive('sm')` | Alignment with the header |
| 2026-11-19 | Tagline 'INNOVATION AGENCY' hidden at 480px and below; header 57px at 390 | Always shown | Fits `--header-spacer-height` |
| 2026-11-19 | Footer social row reserves 88px right padding at 1450px and below (chat bubble), 0 at 480px and below | Bubble covered the third icon | Chat bubble overlap |
| 2026-11-19 | Footer links `text-fg-muted`, hover `text-fg` | gray-300, neutral-300/400 | Tokens |
| 2026-11-19 | `footer.scss` rules are unlayered (no Tailwind layer import); if other component sheets get the same cleanup, move them to `global.scss` | `@layer components` | First change to the layer convention |
| 2026-11-19 | Bento cards are transparent cells with `cell-interactive`; the central stage keeps the focus overlay only | Opaque bordered cards | Its hover drives the stage state |
| 2026-11-19 | Bento state layers use `--motion-slow` and `--ease-standard` (600ms) | 500ms and 700ms ease | Motion tokens |
| 2026-11-19 | Bento decor clipped by an inner `overflow-clip` wrapper; decor arrow nudges `translate-x-2` | `overflow-hidden` on the cell; animated `right` | No cell overflow, no layout animation |
| 2026-11-19 | Logo colour is `var(--color-text)`; h2 'Your Hands-On CTO' uses `--text-h2` | Hex literal; 28px | Tokens |
| 2026-11-19 | `SectionImage` background variant renders a `.section-image__bg` child; entrance 600ms `--ease-enter` | scale(1.1) entrance | Shared `appear` motion |
| 2026-11-19 | `NoteBox` variants set one `--note-accent`; default and info use the accent | Own colour per variant | Tokens |
| 2026-11-19 | `Quote` `gradient` variant is a flat accent 10% tint with a 2px accent left border; marks accent 8% (12% minimal) | Blue-purple gradient | No gradients |
| 2026-11-19 | /contact cards: 2.5rem in-flow icon in the heading row at .12 opacity, shared `CardContainer` in a `.line-grid` | Large absolute glyph under text | Icon can never sit under text |
| 2026-11-19 | /404 keeps one 'Contact Us' button; /mission collapsed to one column (C3 open) | Two buttons; image columns | Minimum fix pending owner |
| 2026-11-19 | Backstage stats and FAQ are static `.line-grid` cells; the stats CTA row is a `line-block` | Per-cell hover | Static content |
| 2026-11-19 | Agentation dev toolbar: GET /health added to the proxy allow-list; `agentation` added to all three forbidden-string lists (`FORBIDDEN_RUNTIME` gates the build) | Toolbar showed disconnected | The widget probes /health first |
| 2026-11-19 | PM3 dev service runs astro directly (argv array) | `npm run dev` string command | The secret broker cannot spawn a string command |
| 2026-11-19 | Background icon hover capped at `--icon-bg-max-opacity` (.12) | Hover to .32 | Decorative icons stay quiet |
| 2026-11-19 | Post hero meta: `PostMeta tone="muted"` (`text-fg-muted`, 14px) | `text-fg-subtle` | Hero meta is brighter than listing meta |
| 2026-11-19 | Post bodies start at `h2`; the page title is the only `h1` | Body `# ` heading in one post | One h1 per page |
| 2026-11-19 | `--header-spacer-height` is set from the measured header height (ResizeObserver); header has no shadow | Fixed per-breakpoint calc constants; `shadow-md` | The tagline wraps at tablet widths and the header covered content; the shadow dimmed the verticals below it |
| 2026-11-19 | Bento rows are `minmax(14rem, auto)` | `0.8fr` rows | Fractional rows let tall cells overflow and left the grid taller than its tracks, so verticals dangled |
| 2026-11-19 | Inside an interactive cell the overlay is the only focus indicator (descendant outline removed) | Overlay plus stretched-link outline | Two focus rings 2px apart |
| 2026-11-19 | Home h1 is the product-minded bento heading, same look | No h1 on home | One h1 per page |
| 2026-11-19 | Blockquote bar is 1px `line-strong` (prose and `Quote` gradient variant) | 2px bar, accent bar | One line weight; the bar is a callout edge, not a grid line |
| 2026-11-19 | Dev tools start out of the way: Version History panel collapsed, bottom-left; Agentation button at bottom 5.5rem | Open panel bottom-right over the article and the round button | Neither covers article text, the TOC or the chat bubble slot |
| 2026-11-19 | Series intro: 70ch, 1rem, line-height 1.65, paragraph spacing; blog prose column 70ch with the secondary text token | Full-width 14px intro; 768px, white prose | Readable measure |
| 2026-11-19 | Footer Capabilities plain items use `text-fg-muted` like links | Bright plain items next to a dim link | The one link is not dimmer than text |
| 2026-11-19 | Series toggle is an underlined `fg-secondary` control that expands and collapses (`aria-expanded`) | Meta-style text that vanished on click | Looks clickable, reports state |
| 2026-11-19 | `/faq` removed | Placeholder store-FAQ copy on a light slate block | Not linked, off-system; rebuild on the line model when real content exists |
| 2026-11-19 | Non-linked bento cards and static offer cards stay non-interactive (no focus, no overlay) | Hover-only highlight | Static cells stay quiet; linked cards are `<a>` and focusable |
| 2026-11-19 | Focus ring is 2px (`--focus-ring-width`) at `inset: -1px`: it covers the shared line pixel and one pixel inward; no column detection | Edge-column pull-in via `:nth-of-type` and `@container style(--cols)` | Position heuristics misplaced the ring on spanning bento cards; a 2px ring stays visible when a viewport edge clips its outer pixel and meets WCAG 2.2 focus-appearance size |
| 2026-11-19 | Containers are full width up to 1450px; the 1408px (8xl) cap starts at 1451px together with the side lines | 8xl cap at every width | Between 1409 and 1450px the container was narrower than the viewport with no side lines, so row lines stopped 21px short of the edge and edge-cell rings floated |
| 2026-11-19 | DRAFT marker never takes layout space (`DraftBadge` placements): a 2px warn bar left of list rows, a corner tag in the padding of cards and the post hero, inline text only in a label that cannot wrap | DRAFT on its own line under the title | Drafts are hidden in production, so a dev page with extra DRAFT lines was taller than the real one (owner feedback) |
| 2026-11-19 | Known limitation: on the first row at scroll top, hover and focus leave the top edge dim, because the fixed header's bottom line (z 50) covers the overlay's top pixel | Raising the overlay above the header (it would paint over the header when cells scroll under it) | No clean fix without cells overlapping the header |
| 2026-11-19 | `CardBackgroundIcon` sits at `z-index: -1` inside an isolated host (`.card-container__clip`, `.section-header`, `.section-content`); no sibling is lifted | Sibling selector forcing `position: relative` on content | It overrode absolutely positioned siblings such as `.bs-step__num` |
| 2026-11-20 | Post body is a 3-cell static `.line-grid` at xl (left rail, article, right rail) | Floating rails with `border-t` dividers and a `border-l` TOC spine | The rail dividers become real cell lines that run the full section height and join the section lines |
| 2026-11-20 | Sticky rails are an inner sticky element inside tall grid cells | Sticky `aside` elements | A cell must stay a full-height grid item so its lines span the section |
| 2026-11-20 | TOC and rail items are separated by spacing only; the TOC active state is text colour only | `border-t` dividers, a `border-l` spine and a border-left active marker | Those segments joined no other line |
| 2026-11-20 | PostNav is its own section: a top row with the series or related label and the all-posts link, then a `.line-grid` of direct-child link cells (2 columns for series prev/next, 3 with `fill-last` for related) | Boxed links with their own hover border and a `border-t` inside the article column | One hover and focus system on the grid lines |
| 2026-11-20 | Post banner (`bannerEnd`) sits in its own `section-full` > `container-bordered` after PostNav | Banner inside the padded body container | The banner is a `line-block` and needs a `container-bordered` parent |
| 2026-11-20 | Case-study tags are `.line-grid` cells with `fill-last` (plain centred text) | Bordered `rounded-full` pills | Pills are not approved, and a bordered chip inside a grid draws a dangling line |
| 2026-11-20 | Case-study image placeholders are full-width `section-full` bands, same text and heights, no dashed border | Dashed bordered boxes inside prose | Keeps the visible placeholder text, removes the dangling dashed lines |
| 2026-11-20 | Case-study cells carry `prose prose-blog max-w-none padding-responsive-md` on the cell itself | Per-box `border bg-surface-raised p-6` | The cell stays transparent and borderless but keeps the prose styling for h5 and ul |
| 2026-11-20 | Allowed decorative exceptions inside bento cells: the 24x24 ring in BentoAboutMe, the CardIconMosaic `mosaic__cell` boxes, the `border-l border-line-strong` quote rail and the `border-l-2` hover rail | None (flagged as deviations in the audit) | They are decorative or quote bars, not grid lines |
| 2026-11-20 | Bento inner content boxes are plain blocks with no radius and no own border | Rounded `border border-line` boxes | The cell's own grid lines are enough; a nested box added a second outline |
| 2026-11-20 | Form boxes keep a full `border-line` outline; form controls are an allowed exception to the grid | `border-gray-800` plus `-m-px` and an inner `border-black` trick | The token border plus the global focus ring is enough with equal-height controls |
| 2026-11-20 | Footer bands use `section-bordered`; no new shared class was added | Own borders in the footer | The existing class already owns the line below a band |
| 2026-11-20 | Floating-segment check is on in the guard | No check for vertical segments that join no other line | Catches post rails, PostNav boxes and case-study boxes automatically; prose widgets are excluded because they draw their own boxes |
| 2026-11-20 | The guard derives its route list from `dist/` at test time (redirect stubs replaced by their destination, `/linkedin-preview/` excluded) | A hard-coded 4-route list | A new page is covered without editing the spec |
| 2026-11-20 | Agent instructions: `AGENTS.md` is canonical, `CLAUDE.md` is `@AGENTS.md`, the how-to is the repo skill `.agents/skills/line-grid-layout` | `.claude/CLAUDE.md` plus `.claude/CLAUDE.THEMING.md` | One source for every client; reference (this file) is kept apart from procedure (the skill) |
| 2026-11-20 | `.claude/CLAUDE.THEMING.md` is retired; the bento span notation lives in `docs/design/bento-notation.md` | THEMING.md as a live design guide | It teaches the removed transparent-border model and deleted components |
| 2026-11-20 | This table keeps rows that describe live behaviour; superseded rows move to `docs/design/decisions-history.md` | One ever-growing table | Readability; the history stays one link away |
| 2026-11-20 | Surface raised is `#0b0f17` (slightly blue); hover is an accent wash `color-mix(accent 10%, surface)` (about `rgb(10,17,25)`) | `#0a0a0a`; solid `#111827` | C7. Text on the wash stays far above the 6.3:1 floor; same hue family as the accent |
| 2026-11-20 | Chips, tags and badges are square (`--radius-sm`), filled with `surface-raised`, no border; `--radius-full` is for avatars only. `Tag` theme `pill` is renamed `chip`; `Badge` is the same square chip; `CardIconMosaic` tiles use `--radius-sm` | `rounded-full` and bordered pills; theme `pill`; an empty `Badge`; 0.75rem tiles | C6. A bordered chip in a grid cell draws a dangling line |
| 2026-11-20 | Buttons: `primary` solid white with dark text, `secondary` outlined (`line-strong` border, white text), `accent` solid `#2563eb` for one main action per page; `light` and `outline` stay as aliases, `filled` is gone; every variant has a 1px border (equal height, 50px measured) | `primary` bg-blue-600, bordered raised `secondary`, `outline`, `filled`, `light` | C7 |
| 2026-11-20 | Solid white and solid blue buttons get a 2px white outline at 2px offset on `focus-visible` | The global 1px inset ring | The 55% white ring is invisible on a white button |
| 2026-11-20 | `SectionCTA` keeps a transparent full-width link cell (`line-block` plus `cell-interactive`) and draws the button look on its inner label | A solid full-width band | A white or blue band would dominate the page and an opaque cell breaks the line model (not seen in a render: no page uses it yet) |
| 2026-11-20 | Hero text fades up 8px (`.hero-reveal`, `--reveal-index`, 60ms stagger, `--motion-slow`, `--ease-enter`), first viewport only, off under reduced motion | No entrance | C8. The home hero in `src/sections/home/` still needs the class |
| 2026-11-20 | `CardIconMosaic` ambient loops pause off-screen (IntersectionObserver, `.is-paused`) and never run under reduced motion | Loops always running | C8 |
| 2026-11-20 | Review-ready draft marker: accent blue, label "Review", eye icon, 40% blue corner border, 2px blue edge bar (`DraftBadge` `review`); plain drafts stay amber | One amber draft marker | C2. Told apart at a glance with an existing token; only the owner sets `published: true` |
| 2026-11-20 | Dev-only note "Hidden in production (n published)" is a `DraftBadge` with a custom `label`; series with fewer than 2 published parts are hidden in production (`src/lib/blog/visibility.ts`) | No marker for thin series | C2. The author sees in dev what production hides; it takes no layout space |
| 2026-11-20 | `SectionHeader` gains a default slot, `eyebrowIcon` and `compact`; series and category headers use it (eyebrow style, `section-subhead`: text-lg, `fg-secondary`, mt-4) | Hand-built `border-b border-line` header blocks; `text-xs` eyebrow and `text-fg-muted` tagline | One primitive owns the line under the header; `compact` avoids the 7rem banner padding on listing pages |
| 2026-11-20 | Dev-only mockups at `/mockups/<name>` from `registry.ts`; the real page stays untouched until the owner accepts. Mockup label is a square 4px warn chip (`MockupDevLabel`: "Mockup", "Draft copy") | Ad-hoc mockup pages | C1 and C5 need a reversible comparison; the label follows `DraftBadge` and adds no colour |
| 2026-11-20 | C1 mockup series cell: eyebrow (layers icon, part count), `card-title` h3, tagline, accent "Start with part 1" link, "Latest" block pinned to the bottom, existing overlay and stretched link; series row `--cols-wide: 4`, `--cols-medium: 2`, `--cols-narrow: 1`, no `fill-last` | `SeriesCard` list of parts in a feed cell | A series is an entry point, not a list; 4 cells always fill a 4 or 2 column row |
| 2026-11-20 | Category chips outside a grid: borderless 4px chip, text colour at 8%, accent wash 12% on hover, 2px focus outline at offset 2px, in a padded block | Rounded bordered `Tag` pill | C6. Never inside a cell |
| 2026-11-20 | C5 dev heading switch: `zoom: 1.13` on `main :is(h1,h2,h3)` through `--headings-scale`; the 200 variant also sets nav links to weight 400; footer headings and navbar excluded | Sizes edited in tokens, utilities and SCSS in many places | One multiplier compares the variants at every breakpoint; side effect: heading margins scale 13%. If 300 wins, use real token steps |
| 2026-11-20 | `/demo` is the dev-only component gallery: line-grid sections, meta block a plain div, `PostNav` in a named `after` slot, `ContactForm` in a `data-prose-widget` box, no second Hero, cell and meta padding `clamp(1rem, 2.5vw, 2rem)`, sample content from the real blog collection | Old `demo.astro` with ad-hoc containers | Passes the same line checks as real pages; stacked grids and nested sections double lines |
| 2026-11-20 | The gallery test exempts `src/components/blog/mockups/` as a directory (`EXEMPT_DIRS`) and matches components by path relative to `src/components` | Per-file exemptions; basename matching (two `BentoCard` files) | Mockup components arrive often; each exemption has a reason |
| 2026-11-20 | Footer: Blog, Offer, Company and Elsewhere as four equal 2-column groups beside a 4-column About block (12-column grid, scoped `.footer-ia`; 2 columns on tablet, 1 on mobile), reusing `.footer-heading` | 5/2/3/2 column layout with four text items | C4: one route per topic, external blogs under "Elsewhere". `FOOTER_GROUPS` in `Footer.astro` assumes `/series/<slug>` exists for every slug with a visible post |
| 2026-11-20 | Canonical routes `/about/capabilities` and `/about/capabilities/backstage`; `/capabilities` and `/offer/backstage` redirect in `astro.config.mjs` | Stub pages | C4. Moving Backstage under `/offer/` stays open |
| 2026-11-20 | Article blocks (`BoxGrid`, `Flow`, `FileTree`, `Figure`, `Disclosure`, `Term`) are prose widgets: root carries `data-prose-widget` and the guard skips them for doubled-line and floating checks; box = square 1px `--color-line-strong` on `--color-surface-raised`, `--radius-none`; highlighted steps `--color-text-secondary`; `Figure` frame transparent with `--color-line`; `Disclosure` bar 1px `line-strong`; no dashed lines; `Term` underline dotted `--color-text-muted` with the global focus ring | Raw grays, 0.375-0.5rem radii, translucent navy fills, 2px bar, dashed separators, local blue outline | C6, C7 and the 2026-11-19 blockquote decision: tokens only, one line weight, one focus ring |
