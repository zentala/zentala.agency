# E004 — Architecture

## TLDR

One repo, one Astro build, one deploy. Hubs are data, not deployments: a
hub is a row in a data collection plus a filter over one content collection.
The URL shape (path vs subdomain) is a deploy-layer concern and touches no
content and no component, so it can be flipped later in one wave. No
workspaces, no design package — until a second repo needs the components.

## 1. Content model

Mirrors the `category-descriptions` pattern already in `src/content/`.

```
src/content/
  edu-hubs/                 # data collection — one entry per hub
    harness.json
  edu/                      # content collection — articles
    harness/
      01-what-is-a-harness.mdx
      ...
```

`edu-hubs/<hub>.json`:

```json
{
  "slug": "harness",
  "title": "Agent-native harness",
  "tagline": "How to build a repo an AI agent can actually work in",
  "description": "…120-180 chars, used on /edu cards and as og:description…",
  "sections": ["foundations", "workflow", "tooling"],
  "updated": "2026-08-26",
  "featured": true
}
```

`edu` article frontmatter — a superset of the `blog` schema minus `date`,
plus structure:

```yaml
hub: harness            # required, must match an edu-hubs slug
part: 3                 # ordering inside the hub
section: workflow       # optional grouping, must be in hub.sections
title, excerpt, author  # same fields, same defaults as blog
updated: 2026-08-26     # replaces blog's `date` — edu is maintained, not dated
published: true
source: kb://harness/…  # optional provenance, wave 5
```

**Validation is the point.** `hub` and `section` are checked against the
hub entry inside `src/content/config.ts` (a `superRefine`), so a typo fails
the build instead of silently producing an orphan article. A zero-article
hub renders an explicit empty state; it never disappears.

## 2. Routes

| Route | Renders |
|---|---|
| `/edu` | catalogue: one card per hub, existing `cards-grid` + a `HubCard` |
| `/edu/[hub]` | hub home: intro, sections, ordered article list, CTA back to the main site |
| `/edu/[hub]/[slug]` | article: existing `BlogPost.astro` shell + in-hub prev/next rail |

All three are `getStaticPaths` over the collections. `PostCard.astro` is
reused as-is (its `partLabel` prop, added in E003, is exactly what a hub
needs). New components, all in `src/components/edu/`:

- `HubCard.astro` — a `PostCard` sibling, not a fork of it; if the two
  diverge by less than two props, merge them instead.
- `HubRail.astro` — in-hub prev/next + "all parts" list, generalised from
  E003's series rail.
- `EduCta.astro` — the interlinking block, rendered on every edu page.

## 3. Layout and the shared design

`Layout.astro` gains three optional props — `canonical`, `ogImage`,
`section` — and emits canonical + OG/Twitter tags. That is the whole
"shared design" work: edu pages import the same `Layout`, the same
`global.scss`, the same `container-bordered` / `cards-grid` utilities.

### Why no package yet

Extracting `packages/ui` buys separation between consumers. There is one
consumer. Workspaces would add a second `package.json`, a second install
graph, a link step, and version drift, in exchange for nothing this epic
needs. The boundary is enforced by directory and convention instead.

**Extract when, and only when, one of these fires:**

- a second *repository* needs these components (not a second route, not a
  second subdomain — a second repo);
- the edu surface needs a component whose change must not be able to break
  the marketing homepage;
- the build time of one site becomes a reason not to touch the other.

Until then the rule is: a component used by both `/` and `/edu` lives in
`src/components/`; edu-only components live in `src/components/edu/`.
`ui-internal` is out of scope — it serves `*.internal`, this is public brand.

## 4. Deploy

One Cloudflare Pages project, `main` branch, build `npm run build`, output
`dist/`. Custom domains: `zentala.agency`, `www.zentala.agency`,
`edu.zentala.agency`. GitHub Pages is retired in the same change — running
two hosts for one site is the actual risk, not the migration.

The vanity subdomain is a **zone-level Cloudflare Redirect Rule**, not a
Pages `_redirects` entry: Pages `_redirects` matches on path only and
cannot see the hostname, so host-based rewriting has to happen at the zone.

```
when   http.host wildcard "*.edu.zentala.agency"
then   301 → https://zentala.agency/edu/${1}${http.request.uri.path}
also   http.host eq "edu.zentala.agency"
then   301 → https://zentala.agency/edu${http.request.uri.path}
```

Single Redirects are available on the free plan; two rules are needed.

### If the subdomain shape is chosen instead

Recorded so the decision stays cheap: the same repo builds N times in CI
(`astro build` with `site` and a `PUBLIC_EDU_HUB` env var filtering
`getStaticPaths` to one hub), publishing to N Pages projects. Content,
schema and components are untouched. Cost: N build minutes per push, N
projects to configure, and every hub starts its ranking from zero.

## 5. Risks

| Risk | Mitigation |
|---|---|
| Migration breaks inbound links | 301s + `all-links.spec.ts` in CI; do it now while traffic is ~0 |
| Blog/edu boundary blurs, articles land in both | one rule in PLAN.md; the `hub` field is required and validated |
| Two hosts live at once during cutover | flip DNS last, verify in a real browser, keep the Pages preview URL as the rollback |
| Hub with no articles ships empty | explicit empty state, asserted in e2e |
| Sitemap "green but empty" | assert the edu URL COUNT, never file existence |
