# E004 — Edu knowledge hubs (`/edu`, `/edu/harness`) + SEO base + Cloudflare Pages

**Status:** deferred 2026-08-26 — kierunek zmieniony na serie w blogu, patrz [E005](../E005-2026-08-26-series-as-feed-group/PLAN.md). Plan zostaje nietkniety; nic z niego nie ginie.
**Created:** 2026-08-26
**Owner:** zentala
**Architecture:** see [ARCH.md](./ARCH.md)
**Presentation for approval:** see [PRES.md](./PRES.md)
**Supersedes in part:** E003 (`/series/[series]`) — see "Relation to E003"

## TLDR

Paweł wants a second content surface: an index of topical knowledge sites
plus one site per topic, starting with the agent harness, sharing the main
site's design, published from this repo, hosted on Cloudflare Pages, and
interlinked with `zentala.agency` to support search ranking. This plan
delivers exactly that content product, but rejects the requested URL shape:
it builds the hubs as **paths on the main domain** (`zentala.agency/edu`,
`/edu/harness`) and turns `edu.zentala.agency` into a 301 vanity host, because
subdomain interlinking transfers no ranking value between hosts of the same
registrable domain while splitting the site's topical authority across
hostnames that each start from zero. The content model, the routes and the
components are identical in both shapes — only the deploy config differs — so
the URL decision stays reversible in one wave. ~31 points across 5 waves;
waves 1-4 (23 pts) are the shippable product. **Decision needed: approve the
path-based URL shape and the migration of the 8 existing harness posts.**

## Why now

Three facts make this cheap today and expensive later:

1. The 8 harness articles already exist in `src/content/blog/` with
   `series: 'agent-native-harness'` (E003, merged 2026-08-26). The hub has
   content on day one; nothing must be written to ship it.
2. The site has **no sitemap, no robots.txt, no canonical link and no OG
   tags** (verified: `public/` holds 4 SVGs; `src/layouts/Layout.astro`
   emits only `<meta name="description">`). Any ranking ambition is blocked
   at the floor, independent of URL shape.
3. Traffic and backlinks are near zero, so moving 8 URLs costs nothing now
   and costs real ranking later.

## Scope

### In

1. Content model: `edu` content collection (articles) + `edu-hubs` data
   collection (hub definitions), mirroring the existing
   `category-descriptions` pattern.
2. Routes: `/edu` (catalogue of hubs), `/edu/[hub]` (hub home), and
   `/edu/[hub]/[slug]` (article).
3. Migration of the 8 `agent-native-harness` blog posts into
   `edu/harness/`, with 301 redirects from the old `/blog/<slug>` and
   `/series/agent-native-harness` URLs.
4. SEO base for the whole site (not only `/edu`): `@astrojs/sitemap`,
   `robots.txt`, canonical + OpenGraph/Twitter tags in `Layout.astro`,
   JSON-LD `Article` on edu articles.
5. Interlinking: every edu article carries a CTA block linking to
   `zentala.agency` (offer/contact); every hub links to `/edu` and to the
   main site; `/edu` links to every hub with a real description.
6. Deploy cutover: one Cloudflare Pages project serving the whole site,
   custom domains `zentala.agency`, `www`, `edu`; Cloudflare Redirect Rule
   mapping `*.edu.zentala.agency/*` → `zentala.agency/edu/<label>/*`.

### Out (explicitly)

- A monorepo, npm workspaces, or a `packages/ui` design-system package.
  One repo, one build, one deploy — see ARCH.md "Why no package yet" for
  the trigger that would change this.
- `ui-internal`. That design system serves the `*.internal` ecosystem; the
  public agency site has its own brand and stays on its own components.
- A contact form on edu pages. Edu converts by linking to the main site.
- Any KB→edu automated import (deferred to wave 5, optional).

## Relation to E003

E003 shipped `series`/`part` fields and `/series/[series]`. A hub is a
strictly richer version of a series: ordered parts, an editorial intro, a
description, and its own landing page. This plan does not delete the series
mechanism (other series may stay in the blog), but it moves the harness
series out of `/blog` and into `/edu/harness`, and 301s the old routes.
`PostCard.astro` and its `partLabel` prop are reused unchanged.

## Content model decision — blog vs edu

One rule, no overlap: **an article lives in exactly one collection.**

| | `blog` | `edu` |
|---|---|---|
| Axis | chronological | structural |
| Voice | opinion, news, "what I think now" | reference, "how this works" |
| Ages | yes — dated | no — maintained, `updated:` field |
| Entry point | `/blog` feed | `/edu/<hub>` hub page |
| Ordering | by date | by `part`, inside `section` |

An article that would be evergreen how-to goes to `edu`. That is why all 8
harness posts move.

## Test strategy

The site has Playwright e2e (`tests/e2e/all-links.spec.ts`, run in CI) and
vitest units. Each feature names the assertion that fails today:

- **Collections + routes (W1)** — e2e: `/edu` renders one card per hub;
  `/edu/harness` renders 8 article links in `part` order; a hub with zero
  articles renders an empty-state, not a crash. Fails today: routes 404.
  File: `tests/e2e/edu-hubs.spec.ts`.
- **Migration + redirects (W2)** — e2e: every old `/blog/<slug>` of the 8
  migrated posts resolves (via redirect) to its `/edu/harness/<slug>`
  target with the article body present. Fails today: no `/edu` target
  exists. File: `tests/e2e/edu-redirects.spec.ts`. Plus the existing
  `all-links.spec.ts` must stay green — it is the regression net for the
  migration.
- **SEO base (W3)** — unit: `sitemap-index.xml` exists in `dist/` and
  contains every `/edu/` route (assert the COUNT of edu URLs equals the
  number of edu entries, never merely "the file exists"). Unit: every page
  emits exactly one `<link rel="canonical">` and a non-empty `og:title`.
  Fails today: no sitemap at all, no canonical anywhere. Files:
  `tests/unit/seo-sitemap.test.ts`, `tests/unit/seo-meta.test.ts`.
- **Interlinking (W4)** — e2e: every `/edu/**` page contains at least one
  link to an apex `zentala.agency` route. Fails today: no such pages.
  Extends `tests/e2e/edu-hubs.spec.ts`.
- **Deploy (W4)** — manual, browser-verified against the live host after
  cutover: apex, `/edu/harness`, and one `edu.zentala.agency` vanity URL
  that must land on the path URL with a 301. A build log is not evidence.

## Acceptance criteria

1. `zentala.agency/edu` lists every hub with title, description and article
   count, using the existing card/grid design (no new visual language).
2. `zentala.agency/edu/harness` renders the 8 harness articles in order,
   with an editorial intro and links back to `/edu` and to the main site.
3. Every old harness URL 301s to its new location; `all-links.spec.ts`
   green.
4. `sitemap-index.xml` and `robots.txt` are served, and the sitemap's edu
   URL count equals the edu entry count.
5. Every page emits a canonical URL and OG tags; edu articles emit JSON-LD.
6. The whole site is served by Cloudflare Pages; `edu.zentala.agency/x`
   301s to `zentala.agency/edu/x`; verified in a real browser, not by curl.

## Waves

| # | Wave | Points | Depends on |
|---|---|---|---|
| W1 | Content model + `/edu` routes + hub/article components | 8 | — |
| W2 | Migrate 8 harness posts + redirects | 5 | W1 |
| W3 | SEO base (sitemap, robots, canonical/OG, JSON-LD, CTA blocks) | 5 | — |
| W4 | Cloudflare Pages cutover + domains + redirect rule + browser verify | 5 | W1-W3 |
| W5 | Optional: `edu.internal` → `/edu` publishing pipeline | 8 | W1 |

W1+W3 are independent and can run in parallel.
