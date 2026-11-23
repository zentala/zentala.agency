# DESIGN.md

## TLDR

Dark, square, line-grid site that is minimal, readable and subtle: black surface, 1px gray-800 lines, blue only as a small accent, no warm colours, light-weight type, thin icons. Section "Principles" below is the owner's ruling of 2026-11-20 and wins over any older row. All colour, type, radius, motion and breakpoint values come from tokens (CSS custom properties in `src/styles/tokens.scss`, mirrored in `tailwind.config.js`). All lines come from one line model (section 3): cells draw only their left and top line, hover is an overlay on lines that already exist. Anything not in this file is a design decision: record it in the Decisions table (section 10) first, then implement it. This file is the reference; to build a page, section or card, load the agent skill [line-grid-layout](.agents/skills/line-grid-layout/SKILL.md) (procedure, recipes, failure modes). Incomplete last rows of variable-length card grids use `line-grid--fill-last` (section 4); blog helpers and components are named in section 5. Every component is shown, with its variants, in the dev-only gallery at `/demo` (`src/pages/demo/[...slug].astro`, `src/components/demo/`); owner-facing mockups of undecided changes live at `/mockups/<name>` (dev only, registry `src/components/blog/mockups/registry.ts`). Neither ships to production and neither is covered by the line guard (section 9).

## Principles

Owner rulings of 2026-11-20 (answers file kept by the owner). The site is minimal, readable and subtle. Every colour added in earlier waves was too intense. Each principle names the test that enforces it; "none" means only review and the render catch it, so look at screenshots.

| # | Principle | Rule in practice | Guard |
| --- | --- | --- | --- |
| P1 | No orange, amber or yellow, ever | No `--color-warn`, no amber, orange or yellow class or hex, no warm gradient. Brand logos in warm hues take the neutral hover colour (`src/data/tech-icons.ts`) | `tests/unit/design-guards.test.ts`, describe "colour restraint" (3 tests) |
| P2 | Blue is a small accent | `--color-accent` for links, an icon, a chevron or a thin highlight. Never a large fill, a tinted cell or bento background, a wash, or a gradient. Solid `--color-accent-solid` is not used for fills | none |
| P3 | Hover is neutral | A hovered cell gets `--color-surface-hover` (white at 4% over black) and the `line-strong` overlay. No blue wash anywhere | none (tokens in `src/styles/tokens.scss`) |
| P4 | No bold type in components | Weight ceiling 500 (`font-medium`). Titles 300, body 400. Global `strong`, `b`, `th` and prose `code` render at 500 | `design-guards.test.ts`, describe "no bold type" |
| P5 | No underlines on links | Hover is a brighter colour. No `underline` utility, no `text-decoration: underline`, no animated underline bar | `design-guards.test.ts`, describe "no underlined links" |
| P6 | One arrow: a chevron that moves | `<SiteIcon name="caret-right" size="sm" class="arrow-nudge" />` inside the link, button or `.group`. No text arrows (`→`), no shaft icons. The nudge is CSS in `src/styles/motion.scss` and off under reduced motion | none |
| P7 | One thin icon set | UI icons only through `SiteIcon` (Phosphor Light; sizes 16, 20, 24). Technology logos only through `TechIcon` (simple-icons). No Lucide, no other Phosphor weight, no inline icon `<svg>` | `tests/unit/icon-set.test.ts` |
| P8 | Forms sit on the line grid | A field is a grid cell: no own border or radius, label inside top left, value below. See `ThemedInput` and `ContactForm` | line guard sees dangling lines on `/contact` |
| P9 | One tag primitive | Every chip, badge and tag list renders through `Tag` (`Badge`, `TagGroup`, `TagList` wrap it): 24px, 4px radius, neutral fill, no border | none (the gallery test requires an entry for each component) |
| P10 | Quiet ambient motion | Slow, low-opacity loops (`CardIconMosaic`); nothing flashes or glows; reduced motion switches everything off | none |
| P11 | Delicate markers | Draft and review markers (`DraftBadge`, `MockupDevLabel`, `NoteBox`) use a neutral dashed or solid thin border or bar, weight 400, no colour | none (P1 and P4 apply) |

How to check the guards that exist: `npm run test:unit` (or `just test`) runs both test files; each has a decoy test that proves the pattern fires.

## 1. Visual direction

- Black (`#000`) surface; content is defined by 1px lines, not by shadows or radii.
- White type, light weight (300) for page titles and hero text; no weight above 500.
- Single accent `#60a5fa`, used small (principle P2). No solid bright call-to-action button: buttons are outlined (section 5).
- Cards and containers are square. Chips, tags and badges are square too (4px); pills (`--radius-full`) are for avatars only.
- Dev-only affordances (bento span labels, DRAFT badges, mockup labels, version-history panel) never render in production.

## 2. Tokens

Source of truth: `src/styles/tokens.scss` (`:root`). SCSS aliases in `src/styles/variables.scss` (`$border-color`, `$border-color-hover`, `$surface-base`, `$surface-hover`, `$color-accent`) point at the same variables.

### Colour roles

| Role                  | CSS variable             | Value                                                   | Tailwind             |
| --------------------- | ------------------------ | ------------------------------------------------------- | -------------------- |
| Surface               | `--color-surface`        | `#000`                                                  | `bg-surface`         |
| Surface raised        | `--color-surface-raised` | `#0d0d0d` (neutral: chips, code, popovers)               | `bg-surface-raised`  |
| Surface hover         | `--color-surface-hover`  | `color-mix(in srgb, #fff 4%, var(--color-surface))` (neutral wash) | `bg-surface-hover`   |
| Line                  | `--color-line`           | `#1f2937`                                               | `border-line`        |
| Line strong (hover)   | `--color-line-strong`    | `#374151`                                               | `border-line-strong` |
| Line focus            | `--line-focus`           | `rgba(255,255,255,.55)`                                 |                      |
| Text                  | `--color-text`           | `#fff`                                                  | `text-fg`            |
| Text secondary        | `--color-text-secondary` | `rgba(255,255,255,.75)` (about 10:1)                    | `text-fg-secondary`  |
| Text muted            | `--color-text-muted`     | `rgba(255,255,255,.60)` (about 7.4:1)                   | `text-fg-muted`      |
| Text subtle           | `--color-text-subtle`    | `rgba(255,255,255,.55)` (6.3:1, the FLOOR for any text) | `text-fg-subtle`     |
| Accent                | `--color-accent`         | `#60a5fa` (8.3:1)                                       | `text-accent`        |
| Accent hover          | `--color-accent-hover`   | `#93c5fd`                                               | `text-accent-hover`  |
| Accent solid          | `--color-accent-solid`   | `#2563eb` (kept as a token; no component fills with it)  | `bg-accent-solid`    |
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
| `#0a0a0a`, `#0b0f17`, `#0d0d0d`                                                       | `bg-surface-raised`                                                       |
| `#1f2937`, `border-gray-800`, `$border-color`                                         | `var(--color-line)` / `border-line`                                       |
| `#374151`, `border-gray-700`, `$border-color-hover`                                   | `var(--color-line-strong)` / `border-line-strong`                         |
| amber, orange, yellow (any shade)                                                     | delete it: no warm colour exists (P1); use a neutral token                |
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
- Weights: 300 titles, 400 body, 500 at most for labels and card titles (P4). Never 600 or 700.
- Label style: uppercase, `.6875rem`, weight 400 to 500, tracking `.12em`, `text-fg-subtle` or brighter. Tailwind: `text-label` (sets size, tracking, line-height).
- Font Inter / InterVariable; buttons inherit (`font: inherit`).
- Reading column 65-75ch; line-height 1.65-1.7.

### Spacing

- Responsive scale 16, 24, 32, 48, 64px via the mixins `padding-responsive`, `px-responsive`, `py-responsive` and the `py-responsive-*` classes. Vertical `xs`-`xl` are 8/16/32/64/96px.
- No hand-written `p-8` or `px-16` on controls.

### Radii

`--radius-none` 0 (cards, containers, article widgets); `--radius-sm` 4px (chips, tags, badges, code, inputs; Tailwind `rounded-chip`); `--radius-full` 9999px (avatars only, never a chip).

### Motion

- Durations: `--motion-fast` 150ms (colour, border, chevron nudge), `--motion-base` 250ms (background, opacity, reveal), `--motion-slow` 600ms (hero or bento stage changes). Tailwind: `duration-fast|base|slow`.
- Easing: `--ease-standard` `cubic-bezier(.2,.8,.2,1)`, `--ease-enter` `cubic-bezier(.16,1,.3,1)`. Tailwind: `ease-standard|enter`.
- Properties that may transition: `color`, `background-color`, `border-color`, `box-shadow`, `opacity`, and the `transform` of inner glyphs (arrows, icons, image zoom inside a clipped wrapper). Never `transition: all`.
- Shared keyframes: `appear` (opacity plus `translateY(8px)`), in `src/styles/motion.scss`.
- Hero reveal: `.hero-reveal` fades up 8px over `--motion-slow` with `--ease-enter`; `--reveal-index` (0 or 1) staggers by 60ms; CSS only, first viewport only, `animation: none` under reduced motion.
- Ambient loops (`CardIconMosaic`: glow 0.07 white, float 28s over 4px, breathe 20s) pause off-screen through an IntersectionObserver (class `.is-paused`) and never run under reduced motion.
- Chevron nudge: the global `.arrow-nudge` class (`motion.scss`) moves a chevron 4px right on hover or focus of its `a`, `button` or `.group` parent, only when motion is allowed. `Button` and `SectionCTA` set 3px locally.
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
| Page header            | `Hero` (its own `section-grid`), or `.section-full` plus `SectionHeader`                          |
| Equal card grid        | `.cards-grid` (modifiers `--halves`, `--two-one`) or `SectionGrid columns={2..5}`                |
| Prose or mixed content | `.content-grid` (modifiers `--halves`, `--two-one` 1.67fr/1fr, `--one-two`)                      |
| Any other grid         | `.line-grid` with `--cols-wide`, `--cols-medium`, `--cols-narrow`                                |
| Home bento             | `SectionBento` with spans (`BentoCard`)                                                          |
| Containers             | `.container-bordered` (lines, sections), `.container-padded` (padding only), `.container-simple` |
| Prose cell in a grid   | `.content-grid__text` (padding and vertical centring) or a plain cell with `padding-responsive-md` |
| Form                   | `ThemedInput`, `ThemedTextarea` and a submit `Button` as grid cells (section 5, Forms)           |

Do not add a seventh border system. New grids use `.line-grid`. Path alias `@/` = `/src`.

**`Section` or `section-full`.** Both own the `border-bottom` (mixin `section-borders`); `.section-grid` also paints the grid pattern background. Use the `Section` primitive (`section-grid` plus `container-bordered`) for a section with a `SectionHeader` and a grid, as on the offer pages. Use a hand-written `<section class="section-full"><div class="container-bordered">` around a bare `.cards-grid` or `.line-grid` listing (portfolio, blog index). `Hero` is its own `section-grid` with `container-padded`: its title is the page `h1` and its subtitle an `h2`, so on a page with a `Hero` the next `SectionHeader` keeps `tag="h2"` (the default), never `h1`.

### API for components

- **Columns.** `--cols-wide` (above 1000px, default 3), `--cols-medium` (771-1000px, default 2), `--cols-narrow` (770px and below, default 1). `--cols` is derived. Set them on the element (`style="--cols-wide: 4"`); `.content-grid` defaults to 2 / 1 / 1. Custom proportions: `--grid-columns: 1.67fr 1fr` (replaces the whole template).
- **Mixins** (`src/styles/variables.scss`): `line-grid`, `line-cell`, `line-block`, `cell-interactive`, plus the existing `padding-responsive`, `px-responsive`, `py-responsive`, `tablet`, `medium`, `medium-up`, `container-borders`, `container-side-lines`, `section-borders`.
- **Classes**: `.line-grid`, `.line-grid--fill-last`, `.cards-grid`, `.content-grid`, `.cell-interactive`.
- **Incomplete last row (`line-grid--fill-last`, all constraints).** Grids whose cell count varies (blog index, series, category) add it: the last cell spans the remaining columns, so no stray or missing line is left (measured at 1920, 1280 and 1024 on `/blog`, `/series/agent-native-harness`, `/category/innovation`). (1) Default 3 / 2 / 1 columns only: grid placement cannot span "the rest", so the spans are written out in `_grids.scss`; never combine it with custom `--cols-*` or `--grid-columns`. (2) Every child has the same tag: the rule counts `:last-of-type` and `nth-of-type`, so a mix of `<a>` and `<div>` cells mis-spans silently (`CardContainer` renders one tag for all cards of a list, so a card list is safe; a list that mixes linked and static cards is not). (3) Not for bento grids. The default wrapper filler stays for grids that do not opt in; with a gap it draws a vertical line on the last column only and leaves the last cell without a right line, so it is not used for listings.
- **A component opts into being a grid cell** by being a direct child of one of the grid classes: it gets its lines automatically and must not draw a border, `overflow: hidden`, a fixed `aspect-ratio` or an opaque background. A direct-child `<a>` is interactive automatically (a `<div>` is not, even in `.cards-grid`). Any other interactive cell adds `class="cell-interactive"` or `@include cell-interactive` in its own style (add `position: relative` only through the mixin). Inside the cell, wrap content that needs clipping in an inner element with `overflow: clip` (see `CardContainer`).
- **Do not** put `margin`, `border`, `transform` or `z-index` rules on a cell for hover or layout.
- **Prose in a cell.** Plain markup in a cell has no padding and no vertical centring: use `.content-grid__text` (in `_grids.scss`) or `padding-responsive-md`. Unstyled headings and paragraphs are not white by default and can render near black on the black surface: give headings `text-fg` and body `text-fg-secondary`, or wrap the text in `prose prose-blog` (which sets both). Look at the screenshot: no test catches dark text.

### Primitives and props

Props verified against the source files on 2026-11-20 (wave 6). Files are in `src/components/primitives/sections/` unless stated.

| Component | Draws | Props (default; options) | Example |
| --- | --- | --- | --- |
| `Section` | section (`section-grid` plus `container-bordered`) | `id`, `class` | `<Section id="cta">` |
| `SectionHeader` | header block with the line below it | `headline`, `subhead`, `eyebrow`, `icon`, `logoSrc`, `logoAlt`, `eyebrowIcon`, `compact` (false; plain header padding when an eyebrow is set), default slot (body under the subhead), `tag` (`h2`; `h1`, `h3`), `align` (`left`; `center`), `interactive` (deprecated, no effect) | `<SectionHeader headline="Services" subhead="..." />` |
| `SectionGrid` | `.line-grid` of equal cells | `columns` (3; 2 to 5) | `<SectionGrid columns={4}>` |
| `SectionContent` | one cell or a full block of prose. Transparent, no hover state and no z-index (the grid cell around it owns lines and hover); colours and sizes from tokens. New prose cells may still prefer `.content-grid__text` | `context` (`auto`, which resolves to `full`; `full`, `grid`), `prose` (true) | `<SectionContent context="grid" prose={false}>` |
| `SectionBento` | bento `.line-grid`, 4 / 2 / 1 columns, filler off | `rowHeight` (`1fr`) | `<SectionBento rowHeight="1fr">` |
| `BentoCard` | bento cell | `colSpan` (1; 1 to 4), `rowSpan` (1; 1 to 3), `padding` (`md`; `none`, `sm`, `lg`) | `<BentoCard colSpan={2} rowSpan={2}>` |
| `SectionCTA` | standalone block (`line-block`): full-width link cell; the label is drawn as the Button look, with a chevron that nudges 3px. No solid fill | `href`, `text`, `icon`, `arrow` (true), `variant` (`primary`; `secondary`, `accent`, `ghost`), `external`, `bgText` (a quiet background word in normal case, 8rem, 6% opacity, cropped by the cell; never upper case), `class` | `<SectionCTA href="/contact" text="Get started" bgText="Contact" />` |
| `SectionBlockQuote` | standalone block (`line-block`) | `quote`, `author`, `role`, `variant` (`default`; `large`, `minimal`), `class` | `<SectionBlockQuote quote="..." author="..." />` |
| `SectionImage` | image cell or background | `src`, `alt`, `class`, `loading` (`lazy`), `aspectRatio` (`square`; `16/9`, `4/3`, `auto`), `objectFit` (`cover`), `background`, `animateIn`, `hoverZoom` (true), `overlayPosition` (`bottom-left`) | `<SectionImage src="..." alt="..." />` |
| `CardContainer` (`src/components/cards/`) | grid cell, a link when `href` is set | `href`, `hasHover` (true when `href`), `backgroundIcon`, `class`, `target` (`_self`) | `<CardContainer href="/x">` |
| `Button` (`src/components/`) | link styled as a button, never solid: 1px border on every variant | `href`, `text`, `target`, `variant` (`primary`; `secondary`, `accent`, `ghost`), `icon`, `arrow` (true: chevron that nudges on hover and focus) | `<Button href="/contact" text="Contact" variant="primary" />` |
| `Tag` (`src/components/primitives/`) | the one chip: 24px, 4px radius, neutral fill, no border; accepts a slot | `text`, `href`, `prefix` (`#`), `theme` (`chip`; `simple`, `label`), `icon` (SiteIcon name), `tech` (technology name, logo when `src/data/tech-icons.ts` has one), `accent`, `class` | `<Tag text="astro" tech="Astro" />` |
| `TagGroup`, `TagList`, `Badge` | wrappers of `Tag` (P9) | `TagGroup`: `tags`, `theme`, `prefix`, `hrefPrefix`, `class`, `tagClass`, `tech` (false). `TagList` (`src/components/`): `tags`, `className`. `Badge`: `variant` (`tech`; `accent`), `size` (`sm`; `md`, no effect), `tech`, `class` | `<TagGroup tags={['a', 'b']} />` |
| `DraftBadge` (`src/components/primitives/`) | dev-only marker, no layout space; neutral dashed (draft) or solid (review) thin border | `placement` (`corner`; `edge`, `inline`), `review` (false), `label` | `<DraftBadge review />` |
| `NoteBox` (`src/components/primitives/`) | callout: neutral 1px left rule, label-style title, thin icon per variant, no fill | `variant` (`default`; `info`, `success`, `warning`), `title`, `icon` | `<NoteBox variant="info" title="Note">...</NoteBox>` |
| `SiteIcon` (`src/components/primitives/`) | the only UI icon renderer: Phosphor Light via `resolveIconName` (`src/lib/siteIcon.ts`) | `name` (short name, for example `caret-right`), `size` (`md` 20; `sm` 16, `lg` 24), `class` | `<SiteIcon name="calendar" size="sm" />` |
| `TechIcon` (`src/components/primitives/`) | technology logo from simple-icons, monochrome unless `brand` is set | `name` (simple-icons slug), `size`, `brand`, `class` | `<TechIcon name="astro" />` |
| `TechIconGrid` (`.../sections/`) | section of logo cells (static; the name shows on hover or focus) | `items` (all logos in `tech-icons.ts`), `columns` (`5`; `4`), `id` | `<TechIconGrid columns={4} />` |
| `ThemedInput`, `ThemedTextarea` (`src/components/`) | form field as a grid cell: label inside top left, value below, 3.5rem high | `placeholder` (the label text), `id`, `name`, `icon`, `size` (`default`; `large`), `required`, `disabled`, `error`; `ThemedInput` also `type`, `multiline`, `class` | `<ThemedInput name="email" type="email" placeholder="Email" />` |
| `Hero` (`src/components/`) | page header, its own `section-grid` with `container-padded`; `h1` title, `h2` subtitle | `title`, `subtitle`, `eyebrow` | `<Hero title="Portfolio" subtitle="..." />` |
| `OfferCard` (`src/components/cards/`) | numbered offer cell on `CardContainer` | `number` (required string), `title`, `description`, `icon`, `href` | `<OfferCard number="01" title="..." description="..." icon="lightbulb" href="/x" />` |
| `Banner` (`src/components/banners/`) | standalone block (`line-block`) | `variant` (`simple`, `simpleWithImage`), `title`, `description`, `linkText`, `linkHref`, `image`, `class` | `<Banner variant="simple" ... />` |

A `line-block` component needs a `container-bordered` parent. Header and Footer are page chrome: the header draws its own bottom line (`container-header`, lines only) and the footer bands use `section-bordered`.

### Component gallery and mockups (dev only)

- **`/demo`** is the component gallery (`src/pages/demo/[...slug].astro`, `src/components/demo/`): every component with file path, purpose, props and rendered variants, in ordinary line-grid sections, with sample content from the real blog collection (`samples.ts`). Add each new or changed component in the same change: a row in `src/components/demo/manifest.ts` (or a file in `groups/`) and a `<GalleryEntry>` in the matching `Gallery*.astro`. `tests/unit/component-gallery.test.ts` fails when a component has no entry; it checks existence, not that the variants are current.
- **`/mockups/<name>`** (`src/pages/mockups/[mockup].astro`) shows owner-facing mockups of undecided changes: one entry in `src/components/blog/mockups/registry.ts` plus its component. `getStaticPaths` returns `[]` outside DEV, so nothing is built. The gallery test exempts the `mockups/` directory; when the owner accepts a mockup, move the component out so the test requires a gallery entry. The mockup markers `MockupNotice` and `MockupDevLabel` are thin neutral chips like `DraftBadge` (P11).
- **Typography comparison (C5):** the Typography section of `/demo` (`src/components/demo/GalleryTypography.astro`) shows three named heading variants side by side; Inter is loaded only on that dev-only page. The old `src/dev/heading-switch.ts` is deleted. `npm run audit:prod` (`scripts/audit-prod-bundle.mjs`) checks that no dev loader, font file or dev-only string reaches `dist/`; it passed on the `dist/` of 2026-11-20.

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
- **Badges and meta:** one DraftBadge (props `placement` `corner|edge|inline`, `review`, `label`; weight 400, no colour: a plain draft is a dashed neutral border or bar in `line-strong`, `review` is a solid one with the label "Review", `label` replaces the text of a dev note); one `formatDate` (en-GB, UTC, with `<time>`); one part label ('Part n of N' only when contiguous, else 'Part n'); the category display name is the badge text and is used in the h1, the document title and the slug.
- **Blog helpers** (`src/lib/blog/`): `formatDate`, `partLabel`, `slugify`, `isVisiblePost` / `getVisiblePosts` (one visibility rule, `SHOW_DRAFTS`), plus the `DraftBadge` primitive. Pages never inline these rules.
- **Blog components** (`src/components/blog/`): `PostMeta` (`tone="muted"` for the post hero at 14px `text-fg-muted`; listings keep `subtle`), `SeriesRail`, `PostNav`, `PostToc`, `ShareButtons`.
- **Background icons** (`CardBackgroundIcon`): .06 at rest, hover capped at `--icon-bg-max-opacity` (.12); decorative icons never exceed it.
- **Tags and labels (P9):** `Tag` is the only chip: 24px tall, 4px square (`--radius-sm`), `surface-raised` fill, 11px uppercase text at weight 400, no border (a bordered chip in a grid cell draws a dangling line). Themes: `chip` (default), `simple` (no fill), `label` (muted). `Badge`, `TagGroup` and `TagList` wrap it. The `#` is its own glyph at 1.25em, 70% opacity. A tech tag shows a 16px logo instead of the `#`. A chip row outside a grid sits in a padded block and hovers neutral.
- **CTA cells and quotes:** the same overlay hover; no `translateY`, scale or z-index jumps; the chevron nudges (P6).
- **SectionHeader:** `eyebrowIcon`, `compact` and the default slot are in section 4; the `interactive` prop is deprecated and has no effect (the 1.1x scale was removed). Centred subheads centre their box (`margin-inline: auto`).
- **Buttons:** no solid fill, no bold, no underline. `primary` and `accent`: 1px `text-subtle` border, white at 4% fill, hover a white border and 8% fill; `accent` differs only in the blue icon and chevron. `secondary`: `line-strong` border, muted text. `ghost`: text and chevron only (a transparent border keeps the height). `light`, `outline` and `filled` are removed. Every variant has a 1px border so buttons in a row have equal height. The chevron nudges 3px. All CTAs use the shared `Button`/`CTA` component; `PostCta` only supplies copy to `CTA`.
- **Forms (P8):** a field is a grid cell, as in `ThemedInput`: no border or radius, label inside top left at 11px muted, value below, 3.5rem high, optional 20px left icon; an error is a small `--color-danger` message under the value; disabled is 50% opacity; hover and focus come from the cell overlay. Fields and the submit cell share the grid lines.
- **Links (P5):** no underline anywhere. Prose links are `--color-accent`, hover `--color-accent-hover`; nav and footer links are `text-fg-muted`, hover `text-fg`; the current nav page is `text-fg`. An arrow link ends in the chevron (P6), including the PortfolioItem link title.
- **Icons (P7):** `SiteIcon` (Phosphor Light, 16 / 20 / 24px) for UI, `TechIcon` for technology logos. Mosaic icons are 24px (20px on mobile); eyebrow, series and meta icons 16px. Thin strokes blur at fractional sizes, so sizes are whole pixels.
- **NoteBox:** neutral 1px left rule, label-style title and a thin icon per variant (lightbulb, info, check-circle, warning); variants differ by glyph and label, never by colour. In a grid cell its bar reads as a floating line to the guard: use it in prose, or wrap it in `data-prose-widget`.

## 6. Interaction states

- **Hover:** overlay `line-strong` plus the neutral `surface-hover` background (P3), 150ms. The blue wash of C7 was reversed by the owner on 2026-11-20.
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

- `just check` includes the geometry spec (`tests/e2e/line-geometry.spec.ts`) and the unit tests, among them the owner-ruling guards: `tests/unit/design-guards.test.ts` (P1, P4, P5), `tests/unit/icon-set.test.ts` (P7) and `tests/unit/component-gallery.test.ts` (every component has a gallery entry).
- Greps that must return nothing in `src/`: hex colours in `.astro` files, `text-gray-(500|600|700)`, `text-white/<55`, `transition: all`, `nth-child` border rules, `amber|orange|yellow`, `underline`, `font-semibold|font-bold`, `lucide:`. Also review any `border` in an `.astro` component that sits in a grid, and any `client:only`.
- Look at screenshots for the principles with no guard (P2, P3, P6, P8 to P11): is it subtle, is anything blue and large, is anything heavy or jagged?
- **Line analysis, reusable:** `analyzeLines` and `measureLines` are exported from `tests/e2e/lib/line-analysis.ts` (the guard spec imports them). For one URL run `node scripts/visual-check.mjs <url> [width ...]`; it needs Node 22.6 or newer (native TypeScript stripping; `.nvmrc` still says 18, so use a Node 22). Scratch scripts import that module and never copy the function.
- **Running the guard against a preview.** `just check` does it all. By hand: build with `PUBLIC_PLAYWRIGHT_TEST=true npm run build`, then `npx playwright test --project=chromium tests/e2e/line-geometry.spec.ts --workers=2`. Playwright starts its own preview (`reuseExistingServer: false`) on the port of `PLAYWRIGHT_TEST_BASE_URL` (default `http://localhost:4333`): stop any preview you started on that port, or set the variable to a free port and start none. With many workers the specs time out under load.
- **`astro preview` binds to `[::1]`, not 127.0.0.1.** `curl` and Playwright against `http://127.0.0.1:<port>` get a refused connection; use `http://localhost:<port>`, or start it with `npm run preview -- --host 127.0.0.1`. The dev server under PM3 answers on `http://127.0.0.1:4300`. Stopping a background preview can leave its node child listening: find the PID and end it.
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

Blog index structure (C1: the mockup at `/mockups/blog-series` awaits the owner's pick), about/mission fate (C3), heading weight and size (C5: compare the variants in the Typography section of `/demo`; if 300 wins, set real token steps of about `--text-h3` 1.7rem, `--text-h2` 2.1rem, `--text-h1-page` 2.55rem).

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
| 2026-11-19 | Share buttons square; copied state uses the success colour via Tailwind group variants | 6px radius, scoped CSS | Astro scoped CSS did not reach spread-prop svgs |
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
| 2026-11-19 | `/faq` removed | Placeholder store-FAQ copy on a light slate block | Not linked, off-system; rebuild on the line model when real content exists |
| 2026-11-19 | Non-linked bento cards and static offer cards stay non-interactive (no focus, no overlay) | Hover-only highlight | Static cells stay quiet; linked cards are `<a>` and focusable |
| 2026-11-19 | Focus ring is 2px (`--focus-ring-width`) at `inset: -1px`: it covers the shared line pixel and one pixel inward; no column detection | Edge-column pull-in via `:nth-of-type` and `@container style(--cols)` | Position heuristics misplaced the ring on spanning bento cards; a 2px ring stays visible when a viewport edge clips its outer pixel and meets WCAG 2.2 focus-appearance size |
| 2026-11-19 | Containers are full width up to 1450px; the 1408px (8xl) cap starts at 1451px together with the side lines | 8xl cap at every width | Between 1409 and 1450px the container was narrower than the viewport with no side lines, so row lines stopped 21px short of the edge and edge-cell rings floated |
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
| 2026-11-20 | Footer bands use `section-bordered`; no new shared class was added | Own borders in the footer | The existing class already owns the line below a band |
| 2026-11-20 | Floating-segment check is on in the guard | No check for vertical segments that join no other line | Catches post rails, PostNav boxes and case-study boxes automatically; prose widgets are excluded because they draw their own boxes |
| 2026-11-20 | The guard derives its route list from `dist/` at test time (redirect stubs replaced by their destination, `/linkedin-preview/` excluded) | A hard-coded 4-route list | A new page is covered without editing the spec |
| 2026-11-20 | Agent instructions: `AGENTS.md` is canonical, `CLAUDE.md` is `@AGENTS.md`, the how-to is the repo skill `.agents/skills/line-grid-layout` | `.claude/CLAUDE.md` plus `.claude/CLAUDE.THEMING.md` | One source for every client; reference (this file) is kept apart from procedure (the skill) |
| 2026-11-20 | `.claude/CLAUDE.THEMING.md` is retired; the bento span notation lives in `docs/design/bento-notation.md` | THEMING.md as a live design guide | It teaches the removed transparent-border model and deleted components |
| 2026-11-20 | This table keeps rows that describe live behaviour; superseded rows move to `docs/design/decisions-history.md` | One ever-growing table | Readability; the history stays one link away |
| 2026-11-20 | Chips, tags and badges are square (`--radius-sm`), filled with `surface-raised`, no border; `--radius-full` is for avatars only. `Tag` theme `pill` is renamed `chip`; `Badge` is the same square chip; `CardIconMosaic` tiles use `--radius-sm` | `rounded-full` and bordered pills; theme `pill`; an empty `Badge`; 0.75rem tiles | C6. A bordered chip in a grid cell draws a dangling line |
| 2026-11-20 | Hero text fades up 8px (`.hero-reveal`, `--reveal-index`, 60ms stagger, `--motion-slow`, `--ease-enter`), first viewport only, off under reduced motion | No entrance | C8. The home hero in `src/sections/home/` still needs the class |
| 2026-11-20 | `CardIconMosaic` ambient loops pause off-screen (IntersectionObserver, `.is-paused`) and never run under reduced motion | Loops always running | C8 |
| 2026-11-20 | Dev-only note "Hidden in production (n published)" is a `DraftBadge` with a custom `label`; series with fewer than 2 published parts are hidden in production (`src/lib/blog/visibility.ts`) | No marker for thin series | C2. The author sees in dev what production hides; it takes no layout space |
| 2026-11-20 | `SectionHeader` gains a default slot, `eyebrowIcon` and `compact`; series and category headers use it (eyebrow style, `section-subhead`: text-lg, `fg-secondary`, mt-4) | Hand-built `border-b border-line` header blocks; `text-xs` eyebrow and `text-fg-muted` tagline | One primitive owns the line under the header; `compact` avoids the 7rem banner padding on listing pages |
| 2026-11-20 | C1 mockup series cell: eyebrow (layers icon, part count), `card-title` h3, tagline, accent "Start with part 1" link, "Latest" block pinned to the bottom, existing overlay and stretched link; series row `--cols-wide: 4`, `--cols-medium: 2`, `--cols-narrow: 1`, no `fill-last` | `SeriesCard` list of parts in a feed cell | A series is an entry point, not a list; 4 cells always fill a 4 or 2 column row |
| 2026-11-20 | `/demo` is the dev-only component gallery: line-grid sections, meta block a plain div, `PostNav` in a named `after` slot, `ContactForm` in a `data-prose-widget` box, no second Hero, cell and meta padding `clamp(1rem, 2.5vw, 2rem)`, sample content from the real blog collection | Old `demo.astro` with ad-hoc containers | Passes the same line checks as real pages; stacked grids and nested sections double lines |
| 2026-11-20 | The gallery test exempts `src/components/blog/mockups/` as a directory (`EXEMPT_DIRS`) and matches components by path relative to `src/components` | Per-file exemptions; basename matching (two `BentoCard` files) | Mockup components arrive often; each exemption has a reason |
| 2026-11-20 | Footer: Blog, Offer, Company and Elsewhere as four equal 2-column groups beside a 4-column About block (12-column grid, scoped `.footer-ia`; 2 columns on tablet, 1 on mobile), reusing `.footer-heading` | 5/2/3/2 column layout with four text items | C4: one route per topic, external blogs under "Elsewhere". `FOOTER_GROUPS` in `Footer.astro` assumes `/series/<slug>` exists for every slug with a visible post |
| 2026-11-20 | Canonical routes `/about/capabilities` and `/about/capabilities/backstage`; `/capabilities` and `/offer/backstage` redirect in `astro.config.mjs` | Stub pages | C4. Moving Backstage under `/offer/` stays open |
| 2026-11-20 | Article blocks (`BoxGrid`, `Flow`, `FileTree`, `Figure`, `Disclosure`, `Term`) are prose widgets: root carries `data-prose-widget` and the guard skips them for doubled-line and floating checks; box = square 1px `--color-line-strong` on `--color-surface-raised`, `--radius-none`; highlighted steps `--color-text-secondary`; `Figure` frame transparent with `--color-line`; `Disclosure` bar 1px `line-strong`; no dashed lines; `Term` underline dotted `--color-text-muted` with the global focus ring | Raw grays, 0.375-0.5rem radii, translucent navy fills, 2px bar, dashed separators, local blue outline | C6, C7 and the 2026-11-19 blockquote decision: tokens only, one line weight, one focus ring |
| 2026-11-20 | Owner rulings become the Principles section (P1 to P11) at the top of this file, each with its guard test | Rulings only in chat and wave reports | A future agent reads one place and keeps the site minimal, readable and subtle |
| 2026-11-20 | Neutral cell hover: white at 4% over the surface (`--color-surface-hover`); `--color-surface-raised` is neutral `#0d0d0d` | Accent blue at 10% (C7 blue wash); `#0b0f17` blue tint | The owner reversed the C7 blue tint and wash after seeing it: hover is neutral everywhere and blue is a small accent only |
| 2026-11-20 | Warm colour role removed: no `--color-warn`, no amber, orange or yellow in `src`; `design-guards.test.ts` fails if one returns | Amber for draft and warning states | Owner ruling: no orange, amber or yellow anywhere, ever ("eye-searing, cheap") |
| 2026-11-20 | `DraftBadge`: a draft is a dashed neutral border or bar in `line-strong`, a review is a solid one with the label "Review"; weight 400; no layout space (corner, edge, inline placements) | Amber draft, blue review, weight 600 | Markers should be delicate and carry no colour |
| 2026-11-20 | `NoteBox`: neutral 1px left rule, label-style title, a thin SiteIcon per variant (lightbulb, info, check-circle, warning), no fill | 3px coloured left border, tinted background, bold title | Variants differ by glyph and label, not by colour |
| 2026-11-20 | Mockup labels (`MockupDevLabel`, `MockupNotice`) are thin neutral chips like `DraftBadge` | Square warn chips | P1 and P11 |
| 2026-11-20 | One arrow: SiteIcon `caret-right` plus the global `.arrow-nudge` class (4px `translateX` on hover or focus of the parent `a`, `button` or `.group`, only without reduced motion); `Button` and `SectionCTA` nudge 3px; `Flow` connectors are shaft-less CSS chevrons | Text arrows, shaft icons (lucide `arrow-right`) that sat still | Owner ruling: one chevron style that moves on hover |
| 2026-11-20 | One icon set: Phosphor Light through `SiteIcon` (sizes 16, 20, 24; no stroke props); mosaic icons 24px (20 on mobile), eyebrow, series and meta icons 16px | Lucide, Phosphor Thin and inline SVGs with mixed stroke widths; 25.6, 13, 14 and 12px sizes | Light draws crisp, evenly thin outlines at small sizes; Lucide at stroke 1 rendered heavy and Thin was jagged. Whole pixels avoid blur. Guard: `icon-set.test.ts` |
| 2026-11-20 | Technology logos come from simple-icons through `TechIcon`, monochrome unless a `brand` hex is passed; logos listed in `src/data/tech-icons.ts`; hover colour is the brand mixed 75% toward white, with warm brands and brands too dark for black taking neutral light grey | No tech logos | A separate source for brand marks keeps the UI set Phosphor Light; no orange or yellow even in logos |
| 2026-11-20 | Social and share marks (LinkedIn, GitHub, Teams) use Phosphor logo glyphs; only the site `Logo` and two dev-only React panels keep inline SVG (allowlist in `icon-set.test.ts`) | Hand-pasted brand SVG paths; Font Awesome glyphs in the footer | One visual weight across the icon row |
| 2026-11-20 | Weight ceiling 500: global `strong`, `b`, `th` and prose `code` render at 500; no `font-semibold` or `font-bold` in `src`. Guard: `design-guards.test.ts` | Plugin weights 600 and 700; 600 labels and card titles | No bold type in components |
| 2026-11-20 | Links: no underline anywhere; hover is a brighter colour. Prose links accent blue (hover lighter blue); nav `text-fg-muted`, hover and current `text-fg`; footer link hover is a colour change only | White prose links underlined at 40%, an animated underline bar under the nav, `hover:underline`, the footer `::after` highlight bar | Owner ruling: no underlines on links. Guard: `design-guards.test.ts` |
| 2026-11-20 | Buttons: `primary` and `accent` are a 1px `text-subtle` border with a white 4% fill (hover white border, 8% fill); `accent` differs only in the blue icon and chevron; `secondary` has a `line-strong` border and muted text; `ghost` is text and chevron; `light`, `outline` and `filled` are removed | Solid white and solid blue fills, an outlined `secondary`, aliases | Owner ruling: no solid bright CTA button |
| 2026-11-20 | `SectionCTA` keeps a transparent full-width link cell (`line-block` plus `cell-interactive`); the label takes the Button look; the `bgText` word is normal case, 8rem (5rem on mobile), 6% opacity, centred and cropped by the cell | 60px, weight 100, uppercase, 10% opacity word | The owner called the condensed all-caps text ugly and asked for a normal, slightly transparent word cropped top and bottom |
| 2026-11-20 | `CTA` and `PostCta` stay one component: `PostCta` supplies copy and passes the same buttons to `CTA` | Merging the two | They already render through `CTA.astro` |
| 2026-11-20 | Form field is a line-grid cell: no border or radius, label inside top left at 11px muted, value below, 3.5rem high, optional 20px left icon, danger-coloured message under the value, disabled at 50% opacity | A bordered box with a floating label and 2rem padding | Fields share the grid lines and the label stays visible. The `/contact` page has a "Write to me" form section |
| 2026-11-20 | One tag look: `Tag` is 24px tall, 4px radius, neutral `surface-raised` fill, weight 400, 11px uppercase text; themes change text colour and fill only (`chip`, `label`, `simple`); `Badge`, `TagGroup` and `TagList` wrap it; the hash is its own glyph at 1.25em, 70% opacity; a tech tag shows a 16px logo instead of the hash | Three chip builds (Tag, Badge, TagList) with weight 600 and a white label hover | One geometry so tags look the same everywhere and nothing flashes bright on hover. Chip rows outside a grid hover neutral too |
| 2026-11-20 | `TechIconGrid` has 60 logos so the last row is full at 5, 4 and 3 columns; cells are static, the name shows on hover or focus | A mixed number of logos with an incomplete last row | No dangling cells at any width |
| 2026-11-20 | `CardIconMosaic` is quiet: no dot grid, no cell fill or blur, glow 0.07 white, borders 0.08 white, float 28s over 4px, breathe 20s | Dot grid, slate glow 0.3, filled cells, 11s float over 7px | Ambient motion sits beside the rest of the site |
| 2026-11-20 | `PortfolioItem` link title is a `caret-right` chevron that moves on card hover, no underline, no arrow character | `-> text` with underline on hover | P5 and P6 |
| 2026-11-20 | The `/demo` props toggle (plain or TypeScript) is one page-wide setting kept in localStorage; where-used is computed from the import graph; syntax colours are text colour, accent-blue types and muted strings; banners sit at half scale side by side; the Typography section compares three named heading variants (Inter only on that page) | One monospace props string per entry; hand-written where-used lists; the heading switch that changed the navbar | The owner wanted a global switch, and where-used cannot go stale |
| 2026-11-20 | Series: Information Architecture is merged into Developer Experience (parts 5, 6, 7) and `/series/information-architecture` redirects (301) to `/series/developer-experience`; eight Polish slugs are English | Four series; Polish slugs | Wave 6 content change (see `docs/agents/blog-content.md`) |
| 2026-11-20 | `SectionContent` is a plain content block: transparent, no `:hover`, no `z-index`, `--color-text*` and `--text-h*` tokens, rem max-width; the LEGACY exception is gone | Opaque `#000` cell, `z-index: 10` on hover, hex colours and px sizes | It no longer breaks the cell rules; new and old pages share one model |
| 2026-11-20 | `Quote`: the `gradient` variant is a neutral `--color-surface-hover` wash with a 1px `line-strong` left edge; quote marks are white at 8% (12% minimal); the `sans-serif` mark variant is removed (props `typographic`, `heavy`) | Accent blue 10% tint and blue marks; a `sans-serif` variant that rendered serif marks like the others | P2: no blue tints. The variant was never distinct, so it is deleted, not wired |
| 2026-11-20 | `SimpleWithImage` banner image is capped at `max-height: 14rem` (full width, `object-fit: cover`) | No cap: the image set the banner height | Owner: the banner was far too big; the cap is in the component, not in the gallery |
| 2026-11-20 | `MockupNotice` takes a `label` prop (default "Mockup of decision"); the review mockup says "Mockup of epic" | A fixed "decision" wording for an epic | E008 is an epic, not a decision |
| 2026-11-20 | The site chat widget is not loaded on `/mockups/*` (dev-only routes) | Bubble covering the review layer's thread margin | The review layer needs the lower right corner; mockups never ship, so production is unchanged |
| 2026-11-20 | `.nvmrc` is 22 and `just preview` binds `127.0.0.1` | Node 18; `astro preview` on `[::1]` | `scripts/visual-check.mjs` imports a `.ts` file (Node 22.6+); `127.0.0.1` links work |
| 2026-11-20 | Text arrows (`←`) in `PostNav` and the post aside are `caret-left` chevrons with class `arrow-nudge-back` (moves 4px left on hover, only without reduced motion) | Shaft arrows | P6: chevrons without a shaft, everywhere |
| 2026-11-20 | `Button`, `SectionCTA` and `ContactForm` arrows use `arrow-nudge` from `motion.scss`; per-component `translateX(3px)` rules are gone | Three private nudges (3px, not off under reduced motion) | One arrow behaviour, 4px, quiet under reduced motion |
| 2026-11-20 | `.cta__buttons` has 1.5rem inline padding | Buttons touching both viewport edges at 768px | A button border read as a line on the viewport edge |
| 2026-11-20 | `ProjectCard` images are shown grayscale at 55% opacity | Full-colour image: a white block with a saturated blue map | P1/P2: nothing brighter than the page; neutral images |
| 2026-11-20 | Home hero `profile` layout wraps (`flex-wrap`) and its photo is at most 14rem wide | A 35% photo that squeezed the text columns and pushed the buttons out of the container | The layout overflowed in a wide container |
| 2026-11-20 | `Tag` has one look: `simple` renders the same neutral chip as `chip` (theme names kept for callers) | Three looks: filled chip, bare text, label | Owner notes 37/38: one tag primitive |
| 2026-11-20 | `Quote` marks are centred above and below the text, 4 to 6rem, 14% white | Huge marks offset over the first and last words | Marks sat on the text |
| 2026-11-20 | `ProjectCard` image adds `brightness(0.55)` to grayscale and 55% opacity | Mid-gray slab, the brightest block on the page | P1/P2: nothing brighter than the page |
| 2026-11-20 | `line-block` zeroes its top margin after a `.line-grid` through `:global(.line-grid) + &` | A `.line-grid + &` selector that scoping made unmatchable, so a CTA after a grid drew a second line at fractional heights | Doubled line above the CTA at 768px |
| 2026-11-20 | Gallery banners render at natural size, not `zoom: 0.55` | A zoomed frame that showed 10px text | The zoom made real type look too small |
| 2026-11-23 | Dev-only admin pages (`/admin`, `/admin/decisions`, upgraded `/monitor/links`): decision options are borderless raised-fill blocks inside one grid cell (checked = hover wash plus a filled check icon, the recommended option carries a neutral `Tag` with a star); the summary bar is three neutral grey segments, no status colours; the sticky save bar is a raised fill with no line | Coloured status or a bordered option box | Principles P1 to P3 and the no-ad-hoc-border rule; dev only, never in dist |
| 2026-11-23 | Admin decision board, review fixes: the selected option is a neutral 11% white wash over the page surface (the same mix the variant chip uses) with full-strength text, unselected option text is secondary; a card whose choice or note differs from the saved state shows "zmieniona, niezapisana" in its muted code line; the recommended marker is muted inline text with a star at option-text size instead of a `Tag`; the sticky bar right-aligns its buttons (compact "Zapisz" / "Kopiuj" labels, left padding 7rem under 480px) so the dev "Warianty" chip at the bottom-left never overlaps a control, and the page reserves 5rem under the content | Selected state equal to the 4% hover wash (invisible); full-width stacked buttons under the chip | Owner review found the selection unreadable and the chip covering the bar controls at 390, 768 and 1280 |
