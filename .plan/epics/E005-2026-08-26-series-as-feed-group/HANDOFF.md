# E005 — Tasks

**TLDR:** 12 tasks, 4 waves, 36 points. W1 is the feature; W2 is the SEO floor
and can run in parallel with W1; W3 needs a decision on the CTA target before
T9 starts; W4 is cleanup and must come last because it deletes a route.

Read [PLAN.md](./PLAN.md) first. Every task states the files it touches, the
test that must fail before and pass after, and its points.

| Wave | Tasks | State | Points left |
|---|---|---|---|
| W1 — series as a feed group | T1-T4 | DONE 2026-08-26 | 0 |
| W2 — SEO floor | T5-T7 | DONE 2026-08-26 | 0 |
| W3 — conversion | T8-T9 | DONE 2026-08-26 | 0 |
| W4 — redirects & cleanup | T10-T12 | DONE 2026-08-26 | 0 |

**All 36 points landed on 2026-08-26**, executed by three `ts-dev` agents in
one orchestrated run, then walked in a real browser by the `browser` agent.
T12 closed the same day:
[ADR-001](../../ADR/001-series-as-a-feed-group.md) written,
[`.claude/CLAUDE.META.md`](../../../.claude/CLAUDE.META.md) refreshed with
what is actually wired up (the four `Layout.astro` SEO props, the JSON-LD
types in use, and the redirect trap — config `redirects:` are dropped from the
sitemap, inline `Astro.redirect()` pages are not).

Two defects the browser walk found, both fixed the same day: the tall series
card stretched its two row-mates from 469×470 to 469×738 under the grid's
default `align-items: stretch` (fixed with a scoped `.cards-grid--top-aligned`
modifier, so no other page that reuses `.cards-grid` changes), and a
`jsxDEV is not a function` crash in the dev-only blog version panel.

One defect found by reading the code rather than the page: `buildFeed` ranked
a series by its highest-numbered part instead of its most recently dated one.
Part 8 is dated a day before parts 3-7, so the card sat lower in the feed than
it should and freshness was measured from the wrong date — breaking acceptance
criterion 2, the reason the card exists. Fixed, with a regression test
confirmed to fail on the reverted fix.

## What landed, and what it is NOT

Built and unit-tested, **and walked in a real browser** — see the verdict
recorded in `.plan/BACKLOG.md` and the session notes. Do not re-verify from
scratch; do re-verify anything you change.

Carried forward, deliberately not done:

- **`Footer.astro:68` says "education"** in site-wide agency boilerplate. The
  offer page's forbidden-word grep trips on it. It is not offer copy and
  changing the agency's own description needs Paweł's call — filed in
  `.plan/BACKLOG.md`.
- **`src/layouts/BlogPost.astro` is dead code** — no page imports it. The real
  blog render path is `src/pages/blog/[postSlug].astro`. Delete or revive it,
  but do not add to it.
- **`src/pages/capabilities.astro` and `src/pages/offer/backstage.astro`** use
  inline `Astro.redirect()`, so unlike the `redirects:`-config pages they DO
  land in the sitemap and carry no OG tags. Same class of bug as the `/offer`
  page that was deleted today.
- **Whether short consultations are a separate product or a way into the
  contract** stays unresolved in the copy, on purpose. Paweł has not decided.


---

## W1 — Series as one feed entry (15 pts)

### T1 — `series-descriptions` collection (3 pts)

**Do:** add a `series-descriptions` content collection to
`src/content/config.ts`, copying the shape of the existing
`category-descriptions` collection. Schema: `title: z.string()`,
`tagline: z.string().optional()`, `ctaVariant: z.string().optional()`. Seed
one entry, `src/content/series-descriptions/agent-native-harness.md`, with a
title, a tagline, and a two-paragraph intro as the body.

**Do not:** touch the `blog` schema. `series` and `part` already exist.

**Tests:** none of its own — T4 asserts it through the page.

**Verify:** `npm run build` passes `astro check`.

---

### T2 — `buildFeed` (5 pts)

**Do:** create `src/lib/blog/feed.ts` exporting `buildFeed(posts, { now,
freshDays })`, implementing the six ordering rules in PLAN.md → "Feed entry
model". Pure function: no `astro:content` import, no `Date.now()` inside —
`now` is a parameter. That constraint is what makes it testable.

**Tests (write these first):** `tests/unit/blog-feed.test.ts`, covering every
case listed in PLAN.md → "Test strategy". Assert entry **counts**, not only
shapes: a grouping bug that silently drops posts must fail the suite.

**Fails today because:** the module does not exist.

---

### T3 — `SeriesCard.astro` + wire the feed (5 pts)

**Do:**
1. `src/components/cards/SeriesCard.astro` — series title as the heading, a
   compact list of parts (each: `Part N` badge, title as link, date), and a
   footer link to `/series/<slug>`. The newest part carries the freshness
   marker when `isFresh`. Auto height: this card deliberately does not take
   `PostCard`'s 1:1 aspect lock.
2. Rewrite `src/pages/blog/index.astro` to render `buildFeed(...)` — a
   `PostCard` for `kind: 'post'`, a `SeriesCard` for `kind: 'series'`.
   Delete the ad-hoc "View series:" link strip at the top of that file; the
   card replaces it.

**Reuse:** `container-bordered`, `cards-grid`, the existing `partLabel`
badge styling from `PostCard.astro`. No new colours, no new spacing scale.

**Tests:** `tests/e2e/blog-feed.spec.ts` — one card for the series holding 8
part links; zero standalone cards for those 8 slugs.

**Verify in a browser** (agent `browser`): the grid does not break when one
cell is much taller than its neighbours. This is the one risk no test covers.

---

### T4 — Series page reads its description (2 pts)

**Do:** `src/pages/series/[series].astro` — headline and intro come from the
`series-descriptions` entry; fall back to the slug when there is none. Keep
the existing preview/LinkedIn-draft behaviour untouched.

**Tests:** e2e — the headline is the description title, not
`Series: agent-native-harness`.

---

## W2 — SEO floor (8 pts) — independent of W1

### T5 — `site`, sitemap, robots (2 pts)

**Done 2026-08-26:** `site: 'https://zentala.agency'` is already in
`astro.config.mjs` (added with the W4 fixes — the redirect pages needed it to
emit absolute canonicals). 1 pt left, not 2.

**Do:** install
and register `@astrojs/sitemap`; add `public/robots.txt` pointing at
`https://zentala.agency/sitemap-index.xml`. Exclude preview-only routes
(`/linkedin-preview/**`) from the sitemap.

**Fails today because:** there is no `site` key at all, so nothing can build
an absolute URL.

**Tests:** part of T7's `tests/unit/seo.test.ts` — assert the sitemap URL
**count** equals the built route count, never merely that the file exists.

---

### T6 — canonical + OpenGraph in `Layout.astro` (3 pts)

**Do:** `src/layouts/Layout.astro` gains optional props `canonical`,
`ogImage`, `ogType`. It emits `<link rel="canonical">` (absolute, from
`Astro.site` + `Astro.url.pathname`), `og:title`/`og:description`/`og:image`/
`og:url`/`og:type`, and the `twitter:` equivalents. Add one default OG image
to `public/`. Thread a real `ogImage` from blog posts where the entry has an
`imageUrl`.

**Fails today because:** the layout emits only `<meta name="description">`.

**Side effect worth naming:** this is what makes your links render as cards
on LinkedIn instead of bare URLs.

---

### T7 — JSON-LD + the SEO test (3 pts)

**Do:** `Article` JSON-LD on `/blog/[postSlug]`, `ItemList` on
`/series/[series]`, `BreadcrumbList` on both. Write
`tests/unit/seo.test.ts`, run against `dist/` after a build: exactly one
canonical per page, non-empty `og:title` per page, sitemap URL count.

---

## W3 — Conversion (8 pts) — after W1

### T8 — `PostCta.astro` (3 pts)

**Do:** `src/components/PostCta.astro`, a thin wrapper over the existing
`CTA.astro` with copy aimed at a reader who just finished an article.
Rendered at the end of `src/layouts/BlogPost.astro` and at the bottom of the
series page. Copy is selected by the series' `ctaVariant` (T1), with a
default for standalone posts.

**Do not** build a new CTA component. `src/components/CTA.astro` already
takes `headline`, `subhead`, `buttons`, `footerItems`.

**Tests:** e2e — every `/blog/<slug>` contains a link to the CTA target.

---

### T9 — `/offer/harness-engineering` (5 pts) — UNBLOCKED 2026-08-26

**Decision 1 answered by Paweł, 2026-08-26:** build the page. The service is
named **Harness Engineering Architecture**.

**Do:** a service page at `/offer/harness-engineering`. Reuse the page shell
of `src/pages/about/capabilities/backstage.astro`, which already imports
`CTA.astro` — read it before writing anything. Language: English, like the
rest of the public site.

**The offer, dictated by Paweł — do not invent around it:**

It is a **contract engagement**, not a course and not a product. A company
hires him as a contractor for a period. Concretely, what he does inside that
period:

- comes to the office and talks with the developers;
- helps them do the architecture;
- reviews their solutions and gives feedback;
- runs working sessions — they show him their system and what they have
  built, and they design and improve it together;
- shows developers how to solve specific problems and reach their goals, and
  how to automate parts of their own work.

Positioning words he accepts: **an outside architect**, an
**architect-consultant**, a **Harness Architecture Evangelist** who comes in
and helps.

**Forbidden word: "educator" / "edukator".** He rejected it explicitly. Do not
use it, and do not reach for near-synonyms that reduce the offer to teaching
("trainer", "coach", "workshop provider"). The frame is a practitioner who
works inside the team, not someone who lectures it.

**Two ways in, both on the page:**

1. **A conversation first** — the framing is *"Let's talk about your
   project"*, with the button pointing at `https://cal.com/zentala`. This is
   the primary action. No bare "contact me" link.
2. **Short paid consultations** — bookable by the hour, or in a 15-minute
   slot. Pricing may be fixed per session or hourly. **Do not print a price
   on the page** — no number has been decided; describe the shape of the
   booking, let cal.com carry the rest.

**Why the blog series belongs next to this page:** the posts are the
demonstration. They show him building the architecture he is being hired to
build. The page should say that in one sentence and link to
`/series/agent-native-harness`.

**Tests:** e2e — the page renders, and it links to both `cal.com/zentala` and
the series page.

**Open, left to Paweł deliberately:** whether the short consultations are
framed as a separate product or as a way to start the contract. Write the
page so both readings survive; do not resolve it in copy.

---

## W4 — Redirects & cleanup — mostly DONE 2026-08-26

Paweł asked for the three bugs found during planning to be fixed on the spot,
so W4 was executed ahead of the epic. What is left is noted per task.

### T10 — Redirects — DONE, one part left (1 pt left of 2)

**Done 2026-08-26:** `src/pages/offer.astro` deleted; `astro.config.mjs`
gained `redirects: { '/offer': '/about/capabilities', '/blog/index.old':
'/blog' }` and `site: 'https://zentala.agency'`.

**What that actually buys — stated honestly.** GitHub Pages serves static
files and cannot issue a 301 at all, so **no configuration in this repo can
produce a real HTTP 301 while the site is hosted there.** What Astro's
`redirects` emits instead is strictly better than the hand-rolled page it
replaced: verified in `dist/offer/index.html` —

```
<meta http-equiv="refresh" content="0;url=/about/capabilities">
<meta name="robots" content="noindex">
<link rel="canonical" href="https://zentala.agency/about/capabilities">
```

`noindex` plus an absolute canonical is the strongest signal a static host
can send. A true 301 arrives only with a host that has a redirect layer
(Cloudflare Pages `_redirects`, or zone-level Redirect Rules).

**Left to do:** `src/lib/redirects.ts` as the single source, read by
`astro.config.mjs` and by a generated `public/_redirects`. Worth it only when
the third redirect appears, or on a move to Cloudflare. Do not build it for
two entries.

**Tests still owed:** e2e — `/offer` lands on the capabilities page.

---

### T11 — Dead route and prop mismatch — DONE 2026-08-26

- `src/pages/blog/index.old.astro` deleted (`git rm`). `/blog/index.old` now
  builds as a redirect to `/blog`, not a second copy of the feed.
- `src/pages/series/[series].astro` **and** `src/pages/blog/index.astro` both
  passed `authorName` / `authorAvatar` / `authorRole` to `PostCard`, which
  declares none of them. Both now pass `authorVersion={post.data.author}`,
  which is the prop the card actually reads. The dead `authors` collection
  lookups in both pages were removed with them.
- Bonus, same sweep: `src/pages/blog/index.astro` had **no `.sort()` at all**.
  It now sorts by date descending. T2's `buildFeed` replaces this sort — do
  not treat the inline sort as the final design, only as the stopgap that
  made the feed correct today.

**Verified:** `npx astro build` produces the feed newest-first (2025-01-16,
2024-12-27, 2024-12-14, …) and `dist/offer/index.html` as quoted above.

**Note for whoever runs `npm run build`:** it fails, and has been failing
before any of this — `astro check` reports **276 errors, every one of them in
`src/components/solid-chat/**` or `LinkedInPostCard.astro`** (missing
`solid-js` / `solid-element` type declarations). Zero errors come from any
page. That is the task already filed in `.plan/TASKS.md`. Use
`npx astro build` to verify page work until it is fixed.

---

### T12 — ADR + docs (1 pt) — DONE 2026-08-26

Landed: [ADR-001](../../ADR/001-series-as-a-feed-group.md) (linked from
`PLAN.md` and `.plan/BACKLOG.md`), and a "What is actually implemented"
section at the top of
[`.claude/CLAUDE.META.md`](../../../.claude/CLAUDE.META.md) separating the
wired-up SEO surface from the strategy targets that fill the rest of that file.

**Do:** write `.plan/ADR/001-series-as-a-feed-group.md` (this repo's first
ADR — create the directory): the decision, the alternative of leaving parts
as standalone cards, and the cost — a series' parts lose their individual
slot in the feed. Update `.claude/CLAUDE.META.md` with the canonical/OG/
sitemap facts now that they exist.

---

## Definition of done for the epic

Every acceptance criterion in PLAN.md, plus: `npm run build` green,
`npm run test:unit` green, `npm run test:e2e` green, and the feed plus one
series page **seen rendering in a real browser**. A green CI run is the
floor of evidence here, not the finish line — the one thing that can break
without failing a test is the grid layout under a tall card.
