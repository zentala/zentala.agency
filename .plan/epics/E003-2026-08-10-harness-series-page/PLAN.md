# E003 — Harness Series in the Blog (fields, not a new collection) + private pipeline preview

**Status:** planning (v3 — adds the LinkedIn post model + preview, see PRES.md)
**Created:** 2026-08-10
**Owner:** zentala
**Architecture:** see [ARCH.md](./ARCH.md)
**Tasks:** see [ORCHESTRATOR.md](./ORCHESTRATOR.md)
**Source ideas:** [`knowdlege/articles-ideas/CLAUDE.md`](../../../../.claude/knowdlege/articles-ideas/CLAUDE.md) (private repo `~/.claude`, not this repo)

## TLDR

Series is not a new content type — it is two new fields (`series`, `part`) on
the existing `blog` collection, plus a top-level `/series/[series]` route
that groups posts the same way `/category/[category]` already groups by
category. A series article gets prev/next-in-series links in its side rail.
Separately, and more important to Paweł: he wants to see **all 8 harness
articles rendered as real pages himself**, including ones still at
idea/outline stage, the way a future reader would — a private full-pipeline
preview, not per-article `published: true` toggling. The plan extends the
already-existing `import.meta.env.DEV` visibility bypass (confirmed live in
`/blog/index.astro` and `/blog/[postSlug].astro` today) with a second,
build-time bypass (`PUBLIC_PREVIEW` env var) for an unlisted preview deploy,
so he gets the same "as a reader sees it" view without a local dev server
running and without anything reaching the public production build.

**v3 addition:** every article now has a second content piece, not just the
long-form post — a short LinkedIn snippet (3-5 "tweet"-length sentences that
promote the article and link back to it, already named as the intended
channel in the root `CLAUDE.md` content-marketing strategy, never modeled
before this epic). It lives as one more field on the same `blog` entry (not
a second collection — see "Content model decision" below) and gets its own
private preview surface, styled to read like a LinkedIn post, gated by the
exact same `DEV`/`PUBLIC_PREVIEW` bypass as everything else in this epic.

## What

1. Two new optional fields on the existing `blog` collection schema:
   `series: z.string().optional()`, `part: z.number().optional()`. No new
   collection.
2. 8 seed entries in `src/content/blog/` for `agent-native-harness`
   (`series: 'agent-native-harness'`, `part: 1..8`, `published: false`),
   ported from the idea index — title/excerpt/category/tags only, no body
   required yet (a stub body is fine, first paragraph from the idea file).
3. `/src/pages/series/[series].astro` — top-level route, same shape as
   `/category/[category].astro`: groups blog posts by `series` field, sorted
   by `part`, using the existing `PostCard` (see point 4).
4. `PostCard.astro` gets one optional prop, `partLabel?: string` (e.g.
   `"Part 3/8"`) rendered as a small badge — no new card component, no new
   design system. Series membership is a badge on the existing card, not a
   different visual language.
5. `/blog/[postSlug].astro` side rail: when a post has a `series` field, add
   a "Series" block above/alongside the existing back-link + share block,
   listing every part in order with the current one highlighted and
   prev/next links. This replaces the "recommend similar articles" idea from
   the earlier draft — Paweł asked for in-series navigation, not generic
   recommendations.
6. **Private pipeline preview** (new scope, was missing from v1): extend the
   visibility filter used in `/blog/index.astro`, `/blog/[postSlug].astro`,
   and `/category/[category].astro` from
   `import.meta.env.DEV || post.data.published !== false` to
   `import.meta.env.DEV || import.meta.env.PUBLIC_PREVIEW === 'true' || post.data.published !== false`.
   `PUBLIC_PREVIEW` is set only on a separate, unlisted preview deploy target
   (see "Preview mechanism" below) — production build never sets it, so
   production output is byte-identical to today's behavior.
7. One low-key nav link from `/blog` into `/series/agent-native-harness`
   (the index page itself is not secret — the unpublished articles inside
   it still won't build on production, preview flag or not).
8. **LinkedIn post field + preview** (v3): `linkedinPost` field on `blog`;
   `/linkedin-preview/[postSlug]` route rendering it as a styled post card;
   a small "LinkedIn draft" indicator on `/series/[series]` when an entry
   has one — detail in "Content model decision — LinkedIn posts" below.

## Why

The harness series (8 idea files, private KB) is the content-marketing proof
point CLAUDE.md names for "agent orchestration / DevEx" — the channel meant
to fix the stated bottleneck ("za słaby content"). Two needs, corrected from
the first draft after Paweł's voice feedback:

- **Reader-facing:** series is part of the blog's own identity, not a
  side-quest with its own design system or its own hidden-until-flagged
  collection. It should read exactly like `/category/[category]` — same
  data source, same card, same everything, plus grouping and in-series nav.
- **Author-facing (Paweł himself):** before writing article 2, he wants to
  see how article 1 reads as a finished page, and see the whole 8-part arc
  laid out — "będę widział, jak inni to widzą, będę w stanie wyobrazić sobie
  perspektywę czytelnika." `published: false` alone does not give him that;
  it hides drafts from everyone, including him, on any deploy but his own
  local dev server. He explicitly compared this to a feature-flag preview
  tool.
- **Two content pieces per article, not one (v3):** the root `CLAUDE.md`
  content-marketing strategy already names "Social snippets — LinkedIn/
  Reddit — 'short architectural insight' (3–5 tweetów) z linkiem do bloga"
  as the second half of every article's distribution — but nothing in this
  repo has ever modeled or stored one. This epic is the first place that
  bullet point becomes real content, and Paweł needs to evaluate a LinkedIn
  draft the same way he needs to evaluate an article draft: rendered, not
  as raw markdown, and privately.

## Scope

### In scope

- `series` + `part` fields added to the existing `blog` collection schema.
- 8 seed entries under `src/content/blog/`, `published: false`.
- `/series/[series].astro` route (mirrors `/category/[category].astro`).
- `PostCard.astro`: one new optional prop (`partLabel`), additive only.
- `/blog/[postSlug].astro`: series prev/next block in the side rail.
- `PUBLIC_PREVIEW` env-gated visibility bypass across the three routes that
  already filter by `published` (`blog/index`, `blog/[postSlug]`,
  `category/[category]`).
- One nav link from `/blog` to `/series/agent-native-harness`.
- `linkedinPost` field on the `blog` collection (v3).
- `/linkedin-preview/[postSlug].astro` route + `LinkedInPostCard` component
  (v3), gated by the same `DEV`/`PUBLIC_PREVIEW` bypass, never built on a
  plain production build regardless of `published`.
- "LinkedIn draft" indicator on `/series/[series]` in preview mode (v3).
- Playwright smoke test (extended to cover the LinkedIn preview route).

### Out of scope (non-goals)

- Any third-party or shared design system — same call as v1, still correct:
  the site's own primitives are enough.
- A new `series` content collection — explicitly rejected this round; series
  is fields on `blog`, not a parallel content type.
- Writing the 8 article bodies — separate content work, ported piece by
  piece from `~/.claude/knowdlege/articles-ideas/` as each is drafted.
- The "zentala.pl — postulaty" political series — different channel, own
  epic (`E009-blog-zentala-pl`), different domain, never cross-linked.
- Migrating the 9 existing `/blog` posts to anything — `series`/`part` are
  optional fields, existing posts are untouched (both stay `undefined`).
- A real access-control/password layer on the preview deploy. See "Preview
  mechanism" below for the actual guarantee this gives instead.
- Per-article publication decisions (flipping `published: true` for real) —
  that stays a separate, later, per-article call, made when each piece is
  actually ready for readers. This epic only builds the pipe.
- CMS, comments, newsletter, admin panel, automatic daily publisher.
- Actually posting to LinkedIn (API integration, scheduling, OAuth) — this
  epic gives Paweł a private preview to draft and evaluate the snippet
  against, not a publish button. Posting stays a manual copy-paste, same as
  today.
- A pixel-accurate LinkedIn UI clone — the preview card mimics LinkedIn's
  post shape (avatar, name, text, a muted like/comment/share row) closely
  enough to judge tone and length; it is not a maintained clone of
  LinkedIn's actual UI and will not track LinkedIn's redesigns.
- Reddit snippets, or any other channel named in the content-marketing
  strategy — LinkedIn is the one with a concrete ask this round; Reddit
  gets the same treatment in a future epic if/when it becomes concrete.

## Preview mechanism — decision, not an open question

**Recommendation: two independent bypasses, both already-additive to the
existing filter, aimed at two different moments Paweł needs to see the
work.**

1. **Local, zero-cost, already exists:** `import.meta.env.DEV` already
   bypasses the `published` filter in all three routes today — confirmed by
   reading the current code. Running `pnpm dev` (or `npm run dev`) already
   shows every draft, series or not, exactly as a reader would see the
   rendered page. No new code needed for this half. This alone covers "let
   me read article 1 before I write article 2."
2. **New: a build-time bypass for an unlisted preview deploy**, because
   local dev is not what he asked for when he said "będę widział, jak inni
   to widzą" — a dev server with HMR, error overlays, and unminified output
   is not the same experience as a deployed page. Add
   `import.meta.env.PUBLIC_PREVIEW === 'true'` as a second bypass condition
   (same three routes, same expression as the DEV check). Set
   `PUBLIC_PREVIEW=true` **only** in the environment of a separate,
   unlisted deploy target — a preview branch/deployment, not the production
   domain. Production's env has no `PUBLIC_PREVIEW`, so production output
   does not change at all; this is additive, not a fork of the filter logic.

**Assumed default (confirm):** this repo has no `wrangler.toml`/CF Pages
config checked in, so the actual deploy host for `zentala.agency` is not
verifiable from the repo alone. The plan assumes a host that supports a
per-branch/per-deployment env var override (Cloudflare Pages preview
deployments do this natively: every non-production branch gets its own
unlisted `*.pages.dev` URL with its own env vars) — if the real host works
differently, T-preview in ORCHESTRATOR.md swaps the mechanism for whatever
that host's equivalent is (e.g. a separate Vercel preview env, or a second
`astro build` output directory served locally via `astro preview` with
`PUBLIC_PREVIEW=true` set by hand, which works on any host as a fallback and
needs zero infra).

**Guarantee stated honestly:** an unlisted preview URL is "not linked, not
in the sitemap, not indexed" — the same non-guarantee the v1 draft already
flagged for `published: false` on production. It is not a password wall. If
that is ever not enough, that is a new, separate epic (see v1's identical
non-goal, carried forward).

## Content model decision — LinkedIn posts (v3)

**Decision: one more optional field on the existing `blog` entry
(`linkedinPost: z.string().optional()`), not a second collection.**

Considered and rejected: a separate `linkedin-posts` content collection,
cross-referenced to `blog` by slug. That shape earns its cost when the two
things it relates have independent lifecycles — some LinkedIn posts with no
matching article, or articles with several LinkedIn posts over time (e.g. a
re-promotion). Checked both against the actual ask: the strategy doc and
Paweł's own framing both describe the LinkedIn snippet as *the promotion
of* a specific article ("z linkiem do bloga") — a 1:1, always-paired
relationship, never standalone. A second collection would need its own
schema, its own `getCollection` calls, and its own cross-reference lookup
to solve a many-to-many case that does not exist here. One field solves the
real case with zero new machinery: the LinkedIn draft is authored,
previewed, and (eventually) posted in lockstep with its article, inherits
`series`/`part` for free because it is the same entry, and disappears from
every filter the exact same way the article does. If a real one-to-many
case shows up later (e.g. quarterly re-promotion of an evergreen post), a
second collection is a clean follow-up epic — not a reason to over-build now.

Field type is `z.string().optional()` — plain text/markdown, not a
sub-schema. LinkedIn posts are short (3-5 sentences); the content collection
does not need a `.render()`-able MDX body for this, `Content` is not needed,
a simple string field rendered with the same markdown pipeline used for
`excerpt` is enough (see T12 in ORCHESTRATOR.md for the exact render call).

## Constraints

- Keep each new/changed file's added lines proportionate; no file crosses
  250 lines because of this epic.
- No new npm dependency.
- `partLabel` on `PostCard` and the series block on `/blog/[postSlug].astro`
  must look like they were always part of the site, not a bolted-on style —
  reviewed against the existing card/hero side by side.
- Production build behavior is unchanged unless `PUBLIC_PREVIEW=true` is
  explicitly set in that build's environment — verified by acceptance
  criterion 5 below (a plain `npm run build` with no env var must produce
  identical output to before this epic, modulo the 8 new unpublished seed
  files which never generate routes).

## Schema impact

Extend the existing `blogCollection` in `src/content/config.ts` — no new
collection:

```ts
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    category: z.string(),
    imageUrl: z.string().optional(),
    excerpt: z.string(),
    author: z.string().default('pawel-zentala'),
    authorRole: z.string().optional(),
    bannerEnd: z.string().optional(),
    published: z.boolean().optional(),
    series: z.string().optional(), // e.g. 'agent-native-harness'
    part: z.number().optional(), // 1-based order within the series
    linkedinPost: z.string().optional(), // 3-5 sentence LinkedIn draft, v3
  }),
})
```

`authors`, `category-descriptions`, `notes` collections: unchanged.

**LinkedIn preview visibility — same bypass, one difference.** The
`/linkedin-preview/[postSlug]` route (v3) uses the identical
`import.meta.env.DEV || import.meta.env.PUBLIC_PREVIEW === 'true'` check,
but does **not** OR in `published !== false` — a LinkedIn draft has no
"published on the site" state of its own (it gets posted to LinkedIn
directly, by hand, never served from this domain as a destination page), so
its route only ever exists under the two preview bypasses, full stop, on
every build including a plain production one with an article already
`published: true`.

## Acceptance criteria

1. All 9 existing `/blog` posts still build and render unchanged (`series`/
   `part` stay `undefined` for them) — regression check, not new behavior.
2. `/series/agent-native-harness` builds and renders 0 cards on a plain
   `npm run build` (no `PUBLIC_PREVIEW`) while all 8 seed entries stay
   `published: false` — expected state at merge time, not a bug.
3. `npm run build` with `PUBLIC_PREVIEW=true` set renders all 8 seed entries
   on `/series/agent-native-harness`, in `part` order, and each has a
   working article route with the same hero/TOC/share-rail structure as an
   existing blog post, plus the series prev/next block.
4. Flipping one seed entry to `published: true` (+ a short body) makes it
   appear on a **plain** `npm run build` (no preview flag) — proves the two
   bypasses are independent, not aliases of each other.
5. A plain `npm run build` (no `PUBLIC_PREVIEW`) with all 8 seeds still
   `published: false` produces the same route count as before this epic
   plus zero — i.e. the preview var genuinely gates the new visibility, it
   is not accidentally always-on.
6. `PostCard` with `partLabel` set is visually consistent with a
   `PostCard` without it (verified by manual side-by-side check).
7. `astro check` passes; Playwright smoke test (T-preview + T-series) green.
8. Visual check in a real browser, both plain build and `PUBLIC_PREVIEW=true`
   build — per the "seen it work" rule, not "the build succeeded" as proxy.
9. `/linkedin-preview/<slug>` returns 404 on a plain `npm run build` for
   every entry, including one with `published: true` and a `linkedinPost`
   set — proves the LinkedIn route is never reachable on production, not
   even for a live article.
10. `/linkedin-preview/<slug>` renders the `LinkedInPostCard` (avatar, name,
    the `linkedinPost` text, a link back to `/blog/<slug>`) on a
    `PUBLIC_PREVIEW=true` build, for every seed entry that has a
    `linkedinPost` set.
11. `/series/agent-native-harness` shows a "LinkedIn draft" indicator next
    to entries with `linkedinPost` set, only when the page itself is being
    viewed under a preview bypass — never on a plain build (the series page
    itself may be visible with 0 or some cards; the indicator is an
    additional, separately-gated detail on top of that).

## Test strategy

**Build checks:** `astro check && astro build` (plain) and a second
`PUBLIC_PREVIEW=true astro build` run — both must succeed, and their route
counts must differ by exactly the 8 seed articles (assuming none flipped to
`published: true` yet).

**Playwright:**
- `/series/agent-native-harness` card count matches published-fixture count
  on a plain build.
- Series prev/next block on a published fixture's article page links to the
  correct neighbor by `part`.
- Direct navigation to an unpublished slug on a plain build returns 404;
  the same slug renders on a `PUBLIC_PREVIEW=true` build.
- `/linkedin-preview/<slug>` 404s on a plain build (including a published
  article); renders `LinkedInPostCard` content on a `PUBLIC_PREVIEW=true`
  build.
- "LinkedIn draft" indicator on `/series/[series]` appears only under a
  preview bypass, and only for entries with `linkedinPost` set.

**Manual visual QA:** `PostCard` with and without `partLabel`, side by side;
series prev/next block next to the existing share-rail block on a real blog
post hero; `LinkedInPostCard` next to a real LinkedIn post (screenshot or
open linkedin.com side by side) to sanity-check it reads as "a LinkedIn
post," not a styled `<pre>` block.

## Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| `PUBLIC_PREVIEW` bypass leaks into a production build by accident (wrong env var scope on the host) | Low | High | Acceptance criterion 5 is a CI-checkable regression test; document the exact env var name once, in ARCH.md, single source of truth |
| Actual deploy host does not support per-branch env vars the way assumed | Medium | Low | Fallback documented in "Preview mechanism": local `astro build` + `astro preview` with the var set by hand works everywhere, zero infra dependency |
| Series prev/next block visually crowds the existing share-rail aside | Medium | Low | Acceptance criterion 6 + manual QA before merge, not just automated tests |
| Scope creep into rewriting `/blog` index layout (e.g. a full "grouped series module") | Medium | Medium | Explicit non-goal-adjacent: this epic ships the nav link only; a richer grouped-on-index view is a follow-up, noted in ORCHESTRATOR.md as a deferred idea, not built here |
| `linkedinPost` field accidentally treated as publishable content (e.g. someone adds it to the RSS/sitemap generator later) | Low | Medium | The field is plain text with no route of its own outside preview; acceptance criterion 9 is a standing regression test that the route never builds in production |
| `LinkedInPostCard` over-invested into a pixel clone of LinkedIn's UI, eating time meant for actual article writing | Medium | Low | Explicit non-goal above caps scope to "reads like a LinkedIn post," not a maintained clone |

## Architecture impact

No new content collection, no new route tree beyond two files
(`/series/[series].astro`, `/linkedin-preview/[postSlug].astro`), one new
small preview-only component (`LinkedInPostCard`). Two existing routes gain
one extra OR-condition in an existing filter expression; `PostCard` gains
one optional prop; `/blog/[postSlug].astro` gains one new aside block.
Detail in [ARCH.md](./ARCH.md).

## Cross-references

- Idea source: `~/.claude/knowdlege/articles-ideas/CLAUDE.md` (harness
  series index) — private KB repo, not part of this repo.
- Related, separate channel: `E009-blog-zentala-pl` (political series, own
  repo `zentala.pl`, do not cross-link content between the two).
- Superseded approach (v1): a separate `series` content collection with its
  own `SeriesCard` component and its own `/series/[series]/[slug]` route
  tree, hidden only by `published: false` with no private-preview mechanism.
  Rejected 2026-08-10 after voice feedback — see PRES.md "Co się zmieniło".
