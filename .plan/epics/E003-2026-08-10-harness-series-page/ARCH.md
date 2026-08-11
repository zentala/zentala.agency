# E003 — Architecture impact

**Plan:** [PLAN.md](./PLAN.md)

## No new dependency

This epic uses only what the repo already has: Astro content collections,
the existing `Tag.astro` primitive, `PostCard.astro`, `BlogPost` route
structure. No design system, no new collection type.

## Extended content collection (not a new one)

`blogCollection` (`src/content/config.ts`) gains three optional fields:
`series: z.string().optional()`, `part: z.number().optional()`,
`linkedinPost: z.string().optional()` (v3 — the LinkedIn draft, decision +
reasoning in PLAN.md "Content model decision"). Existing 9 posts are
unaffected (all three fields stay `undefined`). First series seeded in this
epic: `agent-native-harness` (8 parts), as regular entries under
`src/content/blog/`.

## Visibility mechanism — two independent bypasses

`src/pages/blog/index.astro`, `src/pages/blog/[postSlug].astro`, and
`src/pages/category/[category].astro` each filter posts with:

```ts
import.meta.env.DEV || post.data.published !== false
```

confirmed live in all three files before this epic. This epic adds one more
OR-condition, same expression, same three files:

```ts
import.meta.env.DEV ||
  import.meta.env.PUBLIC_PREVIEW === 'true' ||
  post.data.published !== false
```

- `import.meta.env.DEV` — true only under `astro dev`, unchanged behavior,
  already gives local full-pipeline visibility today.
- `import.meta.env.PUBLIC_PREVIEW` — new. A build-time env var, `undefined`
  in the production build's environment (so production output is unchanged
  by this epic), set to `'true'` only in a separate, unlisted preview
  deploy or a manually-flagged local `astro build`. See PLAN.md "Preview
  mechanism" for the deploy-target decision and its fallback.
- `post.data.published !== false` — unchanged, still the only guarantee for
  the actual production domain.

No shared helper function was introduced for this three-way OR — three call
sites is below the threshold where extracting a helper pays for itself; a
fourth call site would tip that.

## New routes — exact paths (this section is the answer to "gdzie jest kod do tego")

- `src/pages/series/[series].astro` — top-level, single file (no nested
  `[series]/index.astro` — mirrors the flat `category/[category].astro`
  pattern, not a directory-per-series). Groups `blog` entries by the
  `series` field the same way `category/[category].astro` groups by
  `category`, sorted by `part`, rendered with `PostCard`. Also renders the
  v3 "LinkedIn draft" indicator per entry (see below).
- `src/pages/linkedin-preview/[postSlug].astro` — **new, v3**. Top-level,
  one file, `getStaticPaths` filtered to `import.meta.env.DEV ||
  import.meta.env.PUBLIC_PREVIEW === 'true'` (no `published` branch —
  intentional, see PLAN.md) AND `post.data.linkedinPost` is set. Renders
  `LinkedInPostCard` (below) inside the shared `Layout`.

## New component — exact path

- `src/components/preview/LinkedInPostCard.astro` — **new, v3**. New
  directory (`components/preview/`, does not exist yet) signals "internal
  tool, not a public-site component" the same way `components/cards/` and
  `components/primitives/` already signal their own scope. Props: `title`,
  `text` (the `linkedinPost` field, rendered through the same markdown
  pipeline as `excerpt`), `articleLink`, `authorName`, `authorAvatar`.
  Styled to read as a LinkedIn post shape (avatar + name row, body text, a
  link-back pill, a muted non-interactive like/comment/share row) — not a
  pixel clone, see PLAN.md non-goals.

## Changed components

- `src/components/cards/PostCard.astro` — one new optional prop,
  `partLabel?: string`, rendered as a small badge in the existing meta row.
  Existing callers (`/blog/index.astro`, `/category/[category].astro`) pass
  nothing and see no change.
- `src/pages/blog/[postSlug].astro` — one new conditional block in the left
  aside (`.blog-aside--left`), rendered only when `post.data.series` is
  set: series parts in order, current one highlighted, prev/next links by
  `part` number. Everything else in this file (hero, TOC, share rail,
  banner) is untouched.
- `src/pages/series/[series].astro` (v3) — per-entry conditional: when
  `post.data.linkedinPost` is set AND the page itself is rendering under a
  preview bypass, render a small link to `/linkedin-preview/<slug>` next to
  that entry's `PostCard`.

## Explicitly not touched

`src/content/authors`, `category-descriptions`, `notes` collections; the 9
existing blog posts' frontmatter; the visual shell of `PostCard`/`BlogPost`
beyond the additive changes above; no changes to `/blog/index.astro` or
`/category/[category].astro` beyond the already-documented `PUBLIC_PREVIEW`
filter change (T02) — neither gains LinkedIn-specific UI, that lives only on
`/series/[series]` and the dedicated preview route.

## Data flow

```text
~/.claude/knowdlege/articles-ideas/*.mdx  (private KB, idea capture)
        │  (manual port, T01 + future per-article content tasks)
        ▼
src/content/blog/*.md  (this repo — series/part/linkedinPost fields, published: false)
        │
        ├─ import.meta.env.DEV ──────────────┐
        ├─ PUBLIC_PREVIEW === 'true' ─────────┤─→ visible (preview reader)
        └─ published !== false ───────────────┘  (article routes only —
        │                                          linkedin-preview ignores
        │                                          this third branch)
        ▼ (only entries that pass the active bypass build a route)
/series/agent-native-harness         (grouped index, PostCard + partLabel
        │                             + "LinkedIn draft" indicator in preview)
        ├──────────────────────────────────────────┐
        ▼                                           ▼
/blog/<slug>                          /linkedin-preview/<slug>
(article route, series prev/next      (LinkedInPostCard — DEV/PUBLIC_PREVIEW
 block)                                only, no `published` branch, ever)
```

## Deploy-target confirmation (resolved — T03)

Confirmed from `.github/workflows/deploy.yml`: `zentala.agency` deploys to
**GitHub Pages** (`withastro/action` build → `actions/deploy-pages`), not
Cloudflare Pages as first assumed. GitHub Pages has no built-in per-branch
unlisted preview URL — every push to `main` publishes straight to the single
public site, and there is no second, non-public deploy target without adding
new infrastructure (a second Pages environment, a separate hosting account).
Standing up one is out of scope for this epic (no new dependency, per the
top of this doc).

**Mechanism actually used:** the local fallback, run on demand, not a CI
target:

```sh
PUBLIC_PREVIEW=true npm run build && npm run preview
```

This builds statically with the bypass active and serves it via `astro
preview` on localhost — real production-shaped HTML (not `astro dev`), just
run by hand instead of through CI. The GitHub Pages `deploy.yml` workflow is
untouched by this epic: it never sets `PUBLIC_PREVIEW`, so the public site's
output is unaffected.
