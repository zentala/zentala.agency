# Know-How

How to develop this website.
List of usefull links and technologies to use.

## Astro

- [Astro](https://astro.build/) - web framework for content-first, client-side web apps
- https://github.com/natemoo-re/astro-icon#readme
  - https://iconify.design/
  - https://github.com/astro-community/icons#readme
- https://github.com/RafidMuhymin/astro-imagetools#readme
- https://docs.astro.build/en/guides/integrations-guide/sitemap/
- https://github.com/jonasmerlin/astro-seo#readme
- https://astro-i18next.yassinedoghri.com/
- https://github.com/astro-community
-

### Wanna use

- https://giscus.app/pl - comments
- https://docs.astro.build/en/guides/integrations-guide/sitemap/
- https://astro-embed.netlify.app/
- https://github.com/onwidget/astrolib/tree/main/packages/seo
- https://github.com/delucis/astro-og-canvas/tree/latest/packages/astro-og-canvas
- https://www.npmjs.com/package/lucide-astro
- https://docs.astro-breadcrumbs.kasimir.dev/
- Potential extentions
  - https://clerk.com/docs/references/astro/overview - payments?
  - https://www.sanity.io/astro-cms - cms?
  - https://www.lemonsqueezy.com/wedges/docs/installation/astro - another payments?

## Tailwind

- [Tailwind CSS Framework](https://tailwindcss.com/)
- [Daisy UI Tailwind Plugin](https://daisyui.com/) - semantic classes
- https://www.eldoraui.site/docs/components/
- https://www.shadcnblocks.com/ & https://ui.shadcn.com/blocks
- https://kitwind.io/products/kometa
- https://originui.com/ ciekawe inspiracje
- https://kokonutui.com/
- https://reactbits.dev/

## Maintenance

### Browserslist DB (caniuse-lite)

Astro/Vite may warn that `caniuse-lite` is outdated. We auto-update it **only when stale** (default: every 60 days).

- **Manual**: `npm run browserslist:update`
- **Auto (stale check)**: runs on `predev`, `prestart`, `prebuild` via `npm run browserslist:update:if-stale`
- **Cache file**: `/.cache/browserslist-update.json` (gitignored)
- **Disable locally**: set `SKIP_BROWSERSLIST_UPDATE=1`
- **Force update**: set `FORCE_BROWSERSLIST_UPDATE=1`

## Components

### Cards and layout

Cards, grids, lines and hover are documented in [DESIGN.md](DESIGN.md) (section 3 line model, section 4 primitives and props, section 5 component rules). To build a page, section or card, load the agent skill [line-grid-layout](.agents/skills/line-grid-layout/SKILL.md) and copy from its [page recipes](.agents/skills/line-grid-layout/page-recipes.md). Shared card typography placeholders (`%card-title`, `%card-content`) still live in `src/styles/components/_cards.scss`. The path alias is `@/` (the old section used `~/`).

### Infile styles

whenver possible use

```astro
<style lang="postcss"></style>
```

i dziedzciz style za pomocą `@apply` z tailwind i innych klas jakie mamy, bo chcemy miec max reuzywanlny kod
