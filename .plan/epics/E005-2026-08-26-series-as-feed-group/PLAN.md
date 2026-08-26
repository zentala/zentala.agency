# E005 — Series as one feed entry on the blog + SEO base + conversion CTA

**Status:** in progress — W4 fixes + `site` landed 2026-08-26; W1-W3 open (29 pts)
**Created:** 2026-08-26
**Owner:** zentala
**Tasks:** see [HANDOFF.md](./HANDOFF.md)
**Presentation:** see [PRES.md](./PRES.md)
**Replaces for now:** [E004](../E004-2026-08-26-edu-knowledge-hubs/PLAN.md) — the
`/edu` hubs idea is deferred, not cancelled. Everything in this epic is a
prerequisite for it anyway, and nothing here blocks it later.
**Builds on:** E003 (`series`/`part` fields, `/series/[series]` route)

## TLDR

A series stops being N loose cards in the blog feed and becomes **one grouped
entry**: a card with the series title on top and a compact list of its parts
(link plus inline metadata), which floats to the top of the feed whenever a
new part lands, with a freshness marker on that newest part. Around it, three
things the site needs regardless: the SEO floor it does not have today
(`site`, sitemap, robots, canonical, OpenGraph, JSON-LD), a conversion block
at the end of every post pointing at harness-engineering services, and a real
redirect layer. ~36 points in 4 waves. **Decisions needed: the CTA target
(a new `/offer/harness-engineering` page or the existing capabilities page),
and how a long series collapses in the card.**

## Why now

Four things verified in the repo today, each of which makes a task here
cheaper than it will ever be again:

1. **The blog feed is not sorted at all.** `src/pages/blog/index.astro`
   renders `getCollection('blog')` in filesystem order — no `.sort()`
   anywhere. Whatever the grouping design is, feed ordering has to be written
   from scratch, so writing it once, correctly, costs nothing extra.
2. **`astro.config.mjs` has no `site`.** Without it `@astrojs/sitemap` emits
   nothing usable and canonical URLs cannot be absolute. This is a one-line
   fix that unblocks the whole SEO wave.
3. **`src/pages/blog/index.old.astro` is a live route.** Astro's file router
   publishes it as `/blog/index.old` — a stale copy of the feed, indexable,
   with no link pointing to it.
4. **`/offer.astro` is a runtime `Astro.redirect` in a static build.** It
   emits a meta-refresh page, not a 301. Search engines treat the two very
   differently.

## Scope

### In

1. **Series grouping in the feed.** One `SeriesCard` per series, replacing
   that series' individual `PostCard`s in `/blog`. Parts listed as compact
   rows: title, part number, date. Sorted by `part`.
2. **Feed ordering.** The feed becomes a sorted list of *entries*, where an
   entry is either a standalone post or a series. A series' sort key is the
   date of its newest part, so updating a series moves the card up.
3. **Freshness marker.** The newest part of a series carries a marker when
   its date is within 14 days of the build. Explicit, bounded, and stated as
   build-time — see "Known limits".
4. **`series-descriptions` collection.** So `/series/agent-native-harness`
   stops printing a raw slug as its headline. Mirrors the existing
   `category-descriptions` collection exactly.
5. **SEO floor, site-wide:** `site` in the config, `@astrojs/sitemap`,
   `robots.txt`, canonical + OpenGraph + Twitter tags in `Layout.astro`, a
   default OG image, JSON-LD `Article` on posts and `ItemList` on the series
   page.
6. **Conversion block** at the end of every blog post and on the series page,
   pointing at services. Reuses the existing `CTA.astro`.
7. **Redirect layer:** a single redirect map, honoured both by
   `astro.config.mjs` `redirects` and by a Cloudflare-compatible
   `public/_redirects`, covering `/offer` and the deleted `/blog/index.old`.

### Out

- `/edu`, subdomains, Cloudflare Pages cutover — deferred with E004.
- A new visual language. Everything reuses `container-bordered`,
  `cards-grid`, `CTA.astro`, `Button.astro`.
- Pagination of the feed. Not needed at 17 posts; revisit past ~40 entries.

## Content model — no schema change to `blog`

`series` and `part` already exist on the `blog` collection (E003) and are
enough. The only new collection is descriptive:

```
src/content/series-descriptions/agent-native-harness.md
---
title: Agent-native harness
tagline: How to build a repo an AI agent can actually work in
ctaVariant: harness        # optional, selects the CTA copy for this series
---
Body = the editorial intro shown on /series/<slug>.
```

A series with no description entry still renders — the slug is the fallback
headline, and the build does not fail. A description for a series with no
posts renders nothing in the feed. Neither case is an error.

## Feed entry model

The grouping lives in one pure function so it can be unit-tested without
rendering Astro:

```ts
// src/lib/blog/feed.ts
type FeedEntry =
  | { kind: 'post'; post: BlogEntry; date: string }
  | { kind: 'series'; slug: string; parts: BlogEntry[]; date: string;
      newestSlug: string; isFresh: boolean }

buildFeed(posts, { now, freshDays }): FeedEntry[]
```

Rules, in order:

1. Filter by the existing visibility rule (`DEV || PUBLIC_PREVIEW ||
   published !== false`) — unchanged, and it must keep working for parts
   inside a series.
2. Posts with a `series` are pulled out of the standalone list and grouped.
   A post appears in the feed **exactly once**, never both ways.
3. Series parts sort by `part` ascending; a part with no `part` value sorts
   last, by date.
4. Entry date: a post's own date; a series' newest part's date.
5. Entries sort by date, descending.
6. `isFresh` is true when the newest part's date is within `freshDays` of
   `now`. `now` is injected, never read inside the function — that is what
   makes it testable.

## Known limits, stated up front

- **The freshness marker is computed at build time.** A series whose newest
  part turns 15 days old keeps its marker until the next deploy. Given that
  every publication is a push and every push rebuilds, the marker is wrong
  only on a site nobody is publishing to. Accepted; the alternative is
  client-side date maths for a decorative badge.
- **A long series makes a tall card.** `cards-grid` cells are locked to a
  1:1 aspect ratio by `PostCard`. `SeriesCard` deliberately breaks that lock.
  See the open decision in PRES.md.

## Architecture impact

This repo has no `.arch/ARCHITECTURE.md` and no `.plan/ADR/` — verified.
Impact is **minor but real**: one new content collection, one new derived
data structure (`FeedEntry`) that becomes the blog's canonical read model,
and a change to what a blog "entry" means. That last one is worth recording,
so this epic creates the repo's first ADR:

- `.plan/ADR/001-series-as-a-feed-group.md` — why a series collapses into a
  single feed entry instead of appearing as N cards, and what that costs
  (a series' individual parts lose their standalone slot in the feed and are
  discoverable through the card, the series page, and search only).

No new service, no new integration, no new deploy target — so no
`.arch/ARCHITECTURE.md` is created here.

## Test strategy

Existing nets: `tests/e2e/all-links.spec.ts` (runs in CI, gates deploy) and
vitest units. Per feature, the assertion that fails today:

- **`buildFeed` (W1)** — unit, `tests/unit/blog-feed.test.ts`. Fails today:
  the module does not exist. Cases: a series collapses to one entry; no post
  appears twice; a series with a newer part outranks a newer standalone post;
  `isFresh` flips exactly at the `freshDays` boundary with injected `now`;
  an unpublished part is excluded but does not remove the series; a part
  with no `part` value sorts last. **Assert entry COUNTS, not just shapes** —
  a grouping bug that drops posts otherwise passes silently.
- **Feed rendering (W1)** — e2e, `tests/e2e/blog-feed.spec.ts`. `/blog`
  shows exactly one card for `agent-native-harness` containing 8 part links,
  and shows zero standalone cards for those 8 slugs. Fails today: 8
  standalone cards.
- **Series page (W1)** — e2e: `/series/agent-native-harness` headline reads
  the description title, not the slug. Fails today: renders
  `Series: agent-native-harness`.
- **SEO (W2)** — unit, `tests/unit/seo.test.ts`, run against `dist/`:
  `sitemap-index.xml` exists **and** the URL count equals the number of
  published routes; every HTML file has exactly one `<link rel="canonical">`
  and a non-empty `og:title`. Fails today: no sitemap, no canonical anywhere.
- **CTA (W3)** — e2e: every `/blog/<slug>` page contains a link to the CTA
  target. Fails today: blog posts have no CTA.
- **Redirects (W4)** — e2e: `/offer` resolves to the capabilities page;
  `/blog/index.old` is gone (404 or redirect, not a second copy of the
  feed). Fails today: `/blog/index.old` serves a stale feed with HTTP 200.

## Acceptance criteria

1. `/blog` shows the harness series as one card: series title, 8 part links
   with part number and date inline, newest part marked.
2. Publishing a new part moves that card to the top of `/blog` on the next
   build, verified by a unit test on `buildFeed`, not by eyeballing.
3. No post is reachable as both a standalone card and a series part.
4. `/series/agent-native-harness` shows a human title and an intro.
5. `sitemap-index.xml` and `robots.txt` are served; the sitemap URL count
   matches the route count; every page emits a canonical and OG tags.
6. Every blog post ends with a CTA block linking to services.
7. `/blog/index.old` no longer exists; `/offer` is a redirect in the
   redirect map, not a runtime `Astro.redirect`.
8. `npm run build` passes `astro check`, and `all-links.spec.ts` is green.
9. The feed and one series page verified in a real browser before anyone
   calls this done — grid layout is the one thing no test here proves.
