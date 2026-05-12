---
id: E001-T03
epic: E001
status: todo
created: 2026-05-12
revised: 2026-05-12 (CEO review — collection param + UI state coverage + TOC collision)
branch: feat/E001-T03-panel-shell
---

# E001-T03 — Panel shell + version timeline (live mode only)

## Goal

Mount a floating React panel in dev mode on every blog post, populate the timeline from `/api/dev/history`, support "live" mode (which is just normal page view + visible panel). No snapshot / diff yet.

## Files to create

- `src/components/react-stuff/dev/blog-version-panel/BlogVersionPanel.tsx` — top-level container, state machine
- `src/components/react-stuff/dev/blog-version-panel/PanelChrome.tsx` — floating outer shell, collapse/expand
- `src/components/react-stuff/dev/blog-version-panel/VersionTimeline.tsx` — list of `HistoryEntry`
- `src/components/react-stuff/dev/blog-version-panel/ModeSwitcher.tsx` — 3 pills (Live | Snapshot | Diff); Snapshot/Diff disabled in T03
- `src/components/react-stuff/dev/blog-version-panel/types.ts` — re-export shared types from `src/lib/dev/git-history/types`
- `src/components/react-stuff/dev/blog-version-panel/BlogVersionPanel.module.scss`
- `src/components/react-stuff/dev/blog-version-panel/index.ts` — barrel
- `src/components/react-stuff/dev/blog-version-panel/BlogVersionPanelMount.astro` — wrapper hydrated `client:idle`
- Edit: `src/layouts/Layout.astro` to conditionally render mount on blog posts in dev

## Implementation steps

1. Scaffold the component directory with barrel + types re-export.
2. Implement `PanelChrome` — fixed-position bottom-right, ~360px wide, dark theme matching site, collapsible to a 32×32 button.
3. Implement `VersionTimeline` — vertical list, each row shows: relative date ("3d ago"), short SHA, commit message (truncated, full on hover), `+X / -Y` lines, dot indicator (filled if major). Selected row highlights.
4. Implement `ModeSwitcher` — three pill buttons; Snapshot/Diff render with `aria-disabled` and tooltip "Coming in T04/T05".
5. Implement `BlogVersionPanel` — fetches `/api/dev/history/${collection}/${slug}.json` on mount, manages state `{ mode, primarySha, secondarySha, collection, slug }`. In T03, mode is always `'live'`. Use `AbortController` on unmount and on slug change to prevent stale fetches.
6. Implement `BlogVersionPanelMount.astro`:
   ```astro
   ---
   const { collection, slug } = Astro.props;
   const isDev = import.meta.env.DEV;
   ---
   {isDev && (
     <BlogVersionPanel client:idle collection={collection} slug={slug} />
   )}
   ```
7. Edit `Layout.astro` — if frontmatter exists and path starts with `/blog/`, render `<BlogVersionPanelMount collection="blog" slug={...} />`.
8. SCSS: match theme — `#000` bg, `gray-800` border, white text, monospace SHA. Use existing variables from `src/styles/variables.scss`. **z-index above the blog post TOC sidebar and share rail** (TOC + share added in commit dc1e177). Define a `--blog-version-panel-z` token so future floats can reason about layer order.
9. **Responsive collision behavior:** at viewport <1280px the share rail moves to a different position; at <1024px TOC is hidden. The panel anchors bottom-right with 24px gutter and never overlaps either element at any breakpoint.
10. **Explicit UI states** (no blank panels at any moment):
    - **Loading:** skeleton rows in timeline + animated stripe
    - **Empty history** (`200 []`): friendly message "No commits found for this post yet." + the live page below is fully usable
    - **Error** (network / 5xx): "Couldn't load history. Check dev console." with retry button
    - **Cold start** (slug exists but file under `.mdx`): same flow, no special UI
    - **First-visit affordance**: small ⌨ icon in panel chrome with tooltip "Press Ctrl+H to toggle" (implemented now even though the listener lands in T07, so the affordance discoverability is built-in from day 1)

## Tests

**Unit (Vitest + React Testing Library):**

```
VersionTimeline
  ✓ renders one row per entry
  ✓ highlights selected SHA
  ✓ shows full commit message on hover
  ✓ shows major-change indicator only when isMajor === true

ModeSwitcher
  ✓ renders 3 buttons
  ✓ Snapshot and Diff buttons have aria-disabled="true" in T03

BlogVersionPanel
  ✓ fetches /api/dev/history on mount (mocked fetch)
  ✓ renders timeline after fetch resolves
  ✓ shows loading state during fetch
  ✓ shows error state on fetch failure
```

**E2E (Playwright):**
- Navigate to `/blog/autonomous-agents-on-backstage` in dev → assert panel visible
- Click collapse button → assert panel collapses to icon
- Reload → assert panel state persists (collapsed/expanded via localStorage)
- At viewport 1440×900 → panel does NOT overlap `.toc-sidebar` or `.share-rail` bounding boxes
- At viewport 1024×768 → panel does NOT overlap visible page content beyond its 360×N footprint
- At viewport 375×667 (mobile) → panel either hides or shrinks; never blocks the post body
- Fresh repo with single commit → empty history doesn't crash, shows friendly message
- Endpoint returning 500 → error state visible with retry button; clicking retry re-fetches

## Done criteria

- Panel mounts in dev on every blog post page
- Panel never mounts in production build (verified by visiting `npm run preview`)
- Timeline populated from real endpoint with no errors
- TypeScript strict mode passes
- Each new file ≤ 250 lines
- TSDoc on public exports
- Lint clean

## Commits

- `feat(E001-T03): scaffold dev panel chrome and barrel exports`
- `feat(E001-T03): implement version timeline with major-change dot`
- `feat(E001-T03): wire panel mount into Layout.astro behind DEV flag`
