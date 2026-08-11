# E003 — Orchestrator

**Plan:** [PLAN.md](./PLAN.md) · **Architecture:** [ARCH.md](./ARCH.md)
**Strategy:** schema fields first (cheap, unblocks everything), then the
preview bypass (independent of the route work, needed to test it), then the
series route + card + nav-block, then the LinkedIn post field + its own
preview route (v3, added after the LinkedIn requirement), then the nav link
and tests.

## Status

- Current wave: 5 (done)
- All tasks: [x] complete — implemented in worktree .claude/worktrees/E003-series-linkedin-preview, branch feat/E003-series-linkedin-preview

## Waves

### Wave 1 — schema + seed (2 pts)

Goal: `blog` collection carries series data; 8 harness-series entries exist,
unpublished.

- [x] **T01 — `series`/`part` fields on `blogCollection` + 8 seed entries**
  (2 pts). Add the two optional fields to `src/content/config.ts` (see
  PLAN.md). Create 8 `.md` files under `src/content/blog/` for the harness
  series (title/excerpt/category/tags/series/part), ported from the idea
  index in `~/.claude/knowdlege/articles-ideas/CLAUDE.md`. All start
  `published: false`; a short stub body (first paragraph of the idea's
  "Why") is enough, full bodies are separate content work.

Wave done when: schema validates, 8 seed entries exist, `astro check`
passes, the 9 existing blog posts still build unchanged.

### Wave 2 — preview mechanism (5 pts)

Goal: Paweł can see the full pipeline (all 8 entries, any `published`
value) rendered as real pages, without touching production.

- [x] **T02 — `PUBLIC_PREVIEW` bypass in the three published-filters**
  (3 pts). Change the filter expression in `/blog/index.astro`,
  `/blog/[postSlug].astro`, `/category/[category].astro` from
  `import.meta.env.DEV || post.data.published !== false` to
  `import.meta.env.DEV || import.meta.env.PUBLIC_PREVIEW === 'true' || post.data.published !== false`.
  Same expression, three places — do not centralize into a shared helper
  unless a fourth call site shows up (no premature abstraction).
- [x] **T03 — Preview deploy target + docs** (2 pts). Set up whichever
  unlisted deploy target the actual host supports (see PLAN.md "Preview
  mechanism" — confirm host, wire `PUBLIC_PREVIEW=true` into that
  deployment's env only) OR, if no such per-branch target exists yet,
  document the local fallback (`PUBLIC_PREVIEW=true npm run build && npm run
  preview`) in this epic's ARCH.md as the interim mechanism. Either way:
  production env must NOT set `PUBLIC_PREVIEW`.

Wave done when: a plain `npm run build` output is unchanged from before this
epic (route count identical apart from the 8 new-but-unpublished seeds
which build zero routes); a `PUBLIC_PREVIEW=true` build renders all 8 seed
entries end to end.

### Wave 3 — series route + card badge + in-article nav (6 pts)

Goal: the reader-facing part exists and matches the site's own visual
language, series posts link to their neighbors.

- [x] **T04 — `/src/pages/series/[series].astro`** (3 pts). Copy the
  grouping pattern from `/category/[category].astro` (`getStaticPaths`
  grouping by field instead of `category`), sort group members by `part`,
  render with `PostCard` (see T05 for the new prop). Filtered by the same
  bypass expression as T02.
- [x] **T05 — `PostCard` `partLabel` prop** (1 pt). One optional prop, one
  small badge in the existing meta row (reuse `Tag.astro` `theme="pill"`
  or a plain span matching that style) — additive, existing callers
  unaffected.
- [x] **T06 — Series prev/next block in `/blog/[postSlug].astro`** (2 pts).
  When `post.data.series` is set, add a block to the left aside (next to
  the existing back-link/share block) listing series parts in order,
  current one highlighted, with prev/next links. No "similar articles"
  recommender — explicitly not what was asked for.

Wave done when: `/series/agent-native-harness` builds (empty on a plain
build, populated on `PUBLIC_PREVIEW=true`); a published fixture's article
page shows correct prev/next; side-by-side visual check against existing
`PostCard`/`BlogPost` passes.

### Wave 4 — LinkedIn post model + preview (6 pts, v3)

Goal: every article can carry a LinkedIn draft, and Paweł can evaluate it
as a rendered post — privately, under the same bypass as everything else.

- [x] **T10 — `linkedinPost` field on `blogCollection`** (1 pt). Add
  `linkedinPost: z.string().optional()` to `src/content/config.ts` (see
  PLAN.md "Content model decision"). Backfill a short draft into 2-3 of the
  8 harness-series seed entries from T01, enough to exercise the preview —
  not all 8, writing the copy for all of them is separate content work.
- [x] **T11 — `LinkedInPostCard` component** (2 pts). New file,
  `src/components/preview/LinkedInPostCard.astro` — author avatar/name (reuse
  the `authors` collection lookup pattern from `PostCard`), the
  `linkedinPost` text, a "🔗 Link to article" pill pointing at `/blog/
  <slug>`, and a muted, non-interactive like/comment/share icon row so it
  reads as a post shape, not a text dump. Not a pixel clone — see PLAN.md
  non-goals.
- [x] **T12 — `/src/pages/linkedin-preview/[postSlug].astro`** (2 pts).
  `getStaticPaths` returns paths only when `import.meta.env.DEV ||
  import.meta.env.PUBLIC_PREVIEW === 'true'` (no `published` OR-branch — see
  PLAN.md, a LinkedIn draft has no production-visible state of its own),
  filtered to entries that have `linkedinPost` set. Renders
  `LinkedInPostCard` inside the existing `Layout`.
- [x] **T13 — "LinkedIn draft" indicator on `/series/[series]`** (1 pt).
  When the series page itself is being rendered under a preview bypass, add
  a small link/badge next to any entry with `linkedinPost` set, pointing at
  `/linkedin-preview/<slug>`. No indicator at all on a plain production
  build, matching the route's own visibility.

Wave done when: `/linkedin-preview/<slug>` 404s on a plain build for every
entry (published or not); renders correctly under `PUBLIC_PREVIEW=true` for
every seed entry with a `linkedinPost`; the series page shows the indicator
only under a preview bypass.

### Wave 5 — nav link + tests + ARCH triage (4 pts)

- [x] **T07 — Link from `/blog` into the series index** (1 pt). One line,
  same visual weight as existing nav links.
- [x] **T08 — Playwright smoke test** (2 pts, +1 pt from v2 to cover the
  LinkedIn route). Two build variants: plain build asserts 0 series cards,
  404 on unpublished slugs, and 404 on every `/linkedin-preview/<slug>`
  including a published article; a `PUBLIC_PREVIEW=true` build (or
  equivalent env override in test setup) asserts all 8 series cards render,
  prev/next links resolve, and every seed entry with `linkedinPost` renders
  its `LinkedInPostCard`.
- [x] **T09 — ARCH.md + IMPROVEMENTS triage** (1 pt). Confirm ARCH.md
  matches what was actually built, including the confirmed (not assumed)
  deploy host for the preview mechanism, and the exact paths for the
  LinkedIn field/route/component ("gdzie jest kod do tego" — see PLAN.md).
  Triage IMPROVEMENTS.md entries opened during the epic. Note the deferred
  "grouped series module on `/blog` index" idea and "Reddit snippet field"
  as candidates for future epics, not built here.

Wave done when: all PLAN.md acceptance criteria pass, `npm run build`
succeeds with and without `PUBLIC_PREVIEW`, Playwright is green, real-browser
check done for both build variants including the LinkedIn preview route.

## Dependencies graph

```text
T01 ─┬─> T02 ─┬─> T04 ─┬─> T06 ─┬─> T08
     │        │        │        │
     │        └─> T03  └─> T05 ─┤
     │                          │
     ├─> T10 ─┬─> T12 ─┬────────┤
     │        │        │        │
     │        └─> T11 ─┘        │
     │                          │
     └──> T04 ──> T13 ──────────┤
                                 │
     └──────────────────────────> T07 ──> T08
                                            │
                                            T09 (last)
```

## Merge order

1. T01
2. T02 + T03 + T10 (parallel — env plumbing, deploy-target setup, schema
   field; T10 touches the same file as T01 but not the same lines, merge
   after T01 lands)
3. T04 + T05 + T11 (parallel)
4. T06 + T12 (parallel — T12 needs T10, not T04/T05)
5. T13 (needs T04 + T10)
6. T07
7. T08
8. T09

## Done definition

All PLAN.md acceptance criteria pass, `npm run build` succeeds both with and
without `PUBLIC_PREVIEW=true`, Playwright series/preview/LinkedIn tests
pass, real-browser visual check done for both build variants (including the
LinkedIn preview card), IMPROVEMENTS.md triaged.
