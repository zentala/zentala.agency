# DESIGN.md

## TLDR

Dark, square, line-grid site: black surface, 1px gray-800 lines, one blue accent, light-weight type. All colour, type, radius, motion and breakpoint values come from tokens (CSS custom properties in `src/styles/tokens.scss`, mirrored in `tailwind.config.js`). All lines come from one line model (section 3): cells draw only their left and top line, hover is an overlay on lines that already exist. Anything not in this file is a design decision: record it in the Decisions table (section 10) first, then implement it. Legacy primitive docs stay in [.claude/CLAUDE.THEMING.md](.claude/CLAUDE.THEMING.md); this file supersedes it where they differ. Incomplete last rows of variable-length card grids use `line-grid--fill-last` (section 4); blog helpers and components are named in section 5.

## 1. Visual direction

- Black (`#000`) surface; content is defined by 1px lines, not by shadows or radii.
- White type, light weight (300) for page titles and hero text.
- Single accent `#60a5fa`; filled buttons use `#2563eb`.
- Cards and containers are square. Radii only on chips, avatars, code and inputs.
- Dev-only affordances (bento span labels, DRAFT badges, version-history panel) never render in production.

## 2. Tokens

Source of truth: `src/styles/tokens.scss` (`:root`). SCSS aliases in `src/styles/variables.scss` (`$border-color`, `$border-color-hover`, `$surface-base`, `$surface-hover`, `$color-accent`) point at the same variables.

### Colour roles

| Role                  | CSS variable             | Value                                                   | Tailwind             |
| --------------------- | ------------------------ | ------------------------------------------------------- | -------------------- |
| Surface               | `--color-surface`        | `#000`                                                  | `bg-surface`         |
| Surface raised        | `--color-surface-raised` | `#0a0a0a` (blue-tint option `#0b0f17` awaits the owner) | `bg-surface-raised`  |
| Surface hover         | `--color-surface-hover`  | `#111827`                                               | `bg-surface-hover`   |
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
| `#0a0a0a`                                                                             | `bg-surface-raised`                                                       |
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

`--radius-none` 0 (cards, containers); `--radius-sm` 4px (chips, code, inputs); `--radius-full` 9999px (avatars; pills only if approved).

### Motion

- Durations: `--motion-fast` 150ms (colour, border, arrow nudge), `--motion-base` 250ms (background, opacity, reveal), `--motion-slow` 600ms (hero or bento stage changes). Tailwind: `duration-fast|base|slow`.
- Easing: `--ease-standard` `cubic-bezier(.2,.8,.2,1)`, `--ease-enter` `cubic-bezier(.16,1,.3,1)`. Tailwind: `ease-standard|enter`.
- Properties that may transition: `color`, `background-color`, `border-color`, `box-shadow`, `opacity`, and the `transform` of inner glyphs (arrows, icons, image zoom inside a clipped wrapper). Never `transition: all`.
- Shared keyframes: `appear` (opacity plus `translateY(8px)`), in `src/styles/motion.scss`.
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
8. **Focus is the same overlay** in `--line-focus` (`:focus-visible`, and `:has(:focus-visible)` for cells that contain the focusable link). The cell's own `outline` is removed only because the overlay is present. Every other interactive element gets the global `:focus-visible { outline: 1px solid var(--line-focus); outline-offset: -2px }` from `motion.scss`. Anything reachable by hover is also reachable by focus.
9. **Standalone blocks** (SectionCTA, SectionBlockQuote, banners) outside a `.line-grid` use mixin `line-block`: `border-top` plus `margin-top: -1px` (overlapping the line above), reset to `0` directly after a `.line-grid`, whose filler already draws that line. They also include `cell-interactive`.
10. **Guard:** `tests/e2e/line-geometry.spec.ts` reads rendered pixels at 1920, 1280, 768 and 390 on `/`, `/blog`, `/capabilities`, `/portfolio`. It fails if two line segments sit 1px apart, if a vertical line shows at the viewport edge at 1450px and below, or if hovering a cell changes a layout rect.

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

## 5. Component rules

- **Cards** (PostCard, SeriesCard, OfferCard, PortfolioItem, CardContainer): no borders, no `overflow: hidden`, no fixed aspect-ratio (`min-height`), interactive overlay from the mixin, titles wrap (`line-clamp-2`), excerpt line-clamp, one title size per grid.
- **Badges and meta:** one DraftBadge (icon plus uppercase text-xs, warn colour); one `formatDate` (en-GB, UTC, with `<time>`); one part label ('Part n of N' only when contiguous, else 'Part n'); the category display name is the badge text and is used in the h1, the document title and the slug.
- **Blog helpers** (`src/lib/blog/`): `formatDate`, `partLabel`, `slugify`, `isVisiblePost` / `getVisiblePosts` (one visibility rule, `SHOW_DRAFTS`), plus the `DraftBadge` primitive. Pages never inline these rules.
- **Blog components** (`src/components/blog/`): `PostMeta` (`tone="muted"` for the post hero at 14px `text-fg-muted`; listings keep `subtle`), `SeriesRail`, `PostNav`, `PostToc`, `ShareButtons`.
- **Background icons** (`CardBackgroundIcon`): .06 at rest, hover capped at `--icon-bg-max-opacity` (.12); decorative icons never exceed it.
- **Tags and labels:** the one label style; 4px square chips.
- **CTA cells and quotes:** the same overlay hover; no `translateY`, scale or z-index jumps; the arrow nudges `translateX(4px)`.
- **SectionHeader:** the `interactive` prop is deprecated and has no effect (the 1.1x scale was removed). Centred subheads centre their box (`margin-inline: auto`).
- **Buttons:** primary solid white, secondary outlined (colours pending the owner); all CTAs use the shared Button/CTA component.
- **Inputs:** `surface-raised` fill, line border, focus uses the focus ring; buttons and fields in a row have equal height.
- **Links:** accent, hover accent-hover, underline on hover for arrow links (including the PortfolioItem link title).

## 6. Interaction states

- **Hover:** overlay `line-strong` plus `surface-hover` background, 150ms.
- **Focus-visible:** the same overlay in `line-focus` on cells; global 1px inset ring for everything else. Every hover affordance has a focus and touch equivalent.
- **Active:** no scale.
- **Reduced motion:** one global block in `motion.scss` sets animation and transition durations to `.01ms`, iteration count 1, `scroll-behavior: auto`, and zeroes transforms on `[data-motion]`. Colour changes stay. JS-driven zoom must check `prefers-reduced-motion` itself.
- **Reveal (if approved):** 8px fade-up (`appear`), 60ms stagger, first viewport only, never starts hidden without JS.

## 7. Responsive

- Columns: 3 above 1000, 2 from 771 to 1000, 1 at 770 and below.
- Container side lines only at 1451px and above; below, `overflow-x: clip` hides the outer line.
- Header 56px at 390.
- Post navigation is available below 1280px (details and end-of-article block).
- Verify at 1920, 1440, 1280, 1024, 768 and 390.

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
- Greps that must return nothing in `src/`: hex colours in `.astro` files, `text-gray-(500|600|700)`, `text-white/<55`, `transition: all`, `nth-child` border rules.

## 10. Decisions

| Date       | Decision                                                                                                                                                                                   | Replaces                                                                                        | Why                                                                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-11-19 | One line model: cells draw only left and top lines, the wrapper overlaps the line above and the container line, hover and focus are an `::after` overlay                                   | Six copy-pasted border systems (transparent borders, `nth-child`, `margin -1px`, hover borders) | Doubled and missing lines; per the design audit                                                                                                                                                      |
| 2026-11-19 | Border model, not a gradient model, for dividers                                                                                                                                           | Wrapper `repeating-linear-gradient` proposal                                                    | Fractional stops are not pixel-snapped; opaque cells paint over a wrapper gradient                                                                                                                   |
| 2026-11-19 | Semantic tokens as CSS custom properties, mirrored in Tailwind                                                                                                                             | SCSS-only variables plus raw hex                                                                | One vocabulary for SCSS, Tailwind and inline styles                                                                                                                                                  |
| 2026-11-19 | Text floor `text-subtle` (.55 alpha)                                                                                                                                                       | gray-500/600/700 and white/30-50                                                                | Contrast                                                                                                                                                                                             |
| 2026-11-19 | Motion tokens 150/250/600ms, standard easing; no `transition: all`                                                                                                                         | 150-700ms, ms and s mixed                                                                       | One motion language                                                                                                                                                                                  |
| 2026-11-19 | Tailwind md 771 and lg 1001 aligned to SCSS; xl 1280 retained                                                                                                                              | Tailwind defaults 768 and 1024                                                                  | Blog rail depends on xl; md and lg now switch with the SCSS tablet and medium edges                                                                                                                  |
| 2026-11-19 | Global `:focus-visible` inset ring in `--line-focus`; cells use the overlay                                                                                                                | Browser default ring                                                                            | Visible, consistent focus                                                                                                                                                                            |
| 2026-11-19 | One global reduced-motion block                                                                                                                                                            | Six local handlers                                                                              | Gaps on the hero, hamburger and floating labels                                                                                                                                                      |
| 2026-11-19 | `.container-bordered` is `display: flow-root` and clips `overflow-x` at 1450px and below                                                                                                   | none                                                                                            | Grid negative margins must not collapse through the container; no stray line at the viewport edge                                                                                                    |
| 2026-11-19 | Eyebrow label uses the label style (11px, 600, tracking .12em, `text-subtle`)                                                                                                              | 12px, 400, .2em, white/50                                                                       | One label style, contrast                                                                                                                                                                            |
| 2026-11-19 | `SectionHeader` `interactive` scale hover removed; prop kept as deprecated no-op until importers drop it                                                                                   | scale 1.1, shadow, z-index 10                                                                   | Scaling a cell breaks every shared line                                                                                                                                                              |
| 2026-10-19 | Header navigation responds to the header's available inline size; below 1180px use the existing hamburger menu, below 600px hide the agency descriptor. Keep logo and controls on one row. | Viewport-only navigation breakpoints and wrapping logo text.                                    | An open hub chat panel reduces the page width while the viewport remains wide; all navigation must remain reachable down to a 400px page width. (lives on `feat/hub-chat-adoption`, not yet on main) |
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
| 2026-11-19 | Tag `label` and `simple` chips fg-muted on tint, fg-subtle on black; `pill` stays rounded-full (C6 open) | Hard-coded greys | Tokens |
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

Pending owner rows: blog index structure (C1), about/mission/faq fate (C3), nav and footer IA (C4), heading weight (C5), chip shape (C6), surface tint and buttons (C7), ambient motion (C8).
