---
formatVersion: 1
type: adr
status: accepted
date: 2026-08-26
epic: E005
---

# ADR-001 — A series is one feed entry, not N cards

## Status

Accepted, 2026-08-26. Introduced by
[E005](../epics/E005-2026-08-26-series-as-feed-group/PLAN.md).

## Context

`/blog` rendered every post as its own card. A single eight-part series
therefore occupied eight of roughly seventeen cards and pushed everything else
off the first screen. A reader could not tell the eight belonged together, and
could not tell where the series started.

The blog is a static Astro build (`output: 'static'`), so anything the feed
computes is computed once, at build time.

## Decision

A series collapses into **one** feed entry, rendered as a taller card that
lists its parts. Standalone posts stay one card each. The grouping lives in
`src/lib/blog/feed.ts` as a pure function:

```ts
buildFeed(posts, { now, freshDays }): FeedEntry[]
```

Three properties were deliberate:

1. **Pure, with `now` injected.** No `astro:content` import, no `Date.now()`
   inside. That is the whole reason it is unit-testable without a build.
2. **It does not filter by `published`.** The caller applies the existing
   `DEV || PUBLIC_PREVIEW || published !== false` rule and passes what
   survives. Filtering in both places is what made the series card vanish in
   preview during implementation.
3. **A series ranks by its most recently DATED part, not its
   highest-numbered one.** Parts get written out of order — in this repo part
   8 is dated a day *before* parts 3 to 7 — so ranking by `part` would sink a
   series that had just gained a post. Ties break toward the higher `part`.
   Guarded by a regression test that was confirmed to fail on the reverted
   fix.

## Freshness marker, and where it lies

The newest part is marked fresh when its date is within `freshDays` (14) of
**build time**. A static site has no live clock: a series whose newest part
crosses day 15 keeps its marker until the next deploy. Since publishing means
pushing and pushing means building, it can only be wrong while nothing is
being published. Accepted knowingly rather than discovered later.

## Alternatives rejected

| Option | Why not |
|---|---|
| Series card spans two grid columns | Changes the rhythm of the whole feed; with two series it reads as a list, not a grid |
| Always show at most 3 parts plus a counter | Safest visually, weakest informationally — the point of grouping is to show what is inside |
| Group in the page template instead of a lib function | Untestable without a build; the bug above would have shipped |

## Consequences

- A tall card in a CSS grid affects its row-mates. `PostCard` is locked to
  `aspect-ratio: 1/1`; a taller sibling under the default `align-items:
  stretch` distorts the two cards next to it. Measured in a real browser
  (469×738 instead of 469×470) and fixed separately — the grid's alignment is
  now part of this feature's surface, not an unrelated style detail.
- `/series/<slug>` remains the canonical place a series lives; the card is a
  pointer to it.
- Adding a second series needs no code — a `series` field in frontmatter plus
  an entry in the `series-descriptions` collection is enough.

## See also

- [E005 PLAN.md](../epics/E005-2026-08-26-series-as-feed-group/PLAN.md)
- [E005 PRES.md](../epics/E005-2026-08-26-series-as-feed-group/PRES.md) —
  decision 2, the card-collapse options as they were presented
- [BACKLOG.md](../BACKLOG.md)
