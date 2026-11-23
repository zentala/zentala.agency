# AGENTS.md

Guidance for coding agents working in this repository. `CLAUDE.md` only imports this file.

## TLDR

Zentala Agency is an Astro 5 static site (Tailwind + SCSS, MDX content) with a black "line-grid" design: content is separated by 1px lines that join into one continuous grid. Read [DESIGN.md](DESIGN.md) before any UI change, and load the skill [line-grid-layout](.agents/skills/line-grid-layout/SKILL.md) before you create or change a page, section, card, grid, banner or CTA.

**Live site:** https://zentala.agency/ · **Main branch:** `main` · **Deployment:** GitHub Pages via GitHub Actions (automatic on push to `main`)

## Commands

`just` is the command interface; npm scripts stay as the fallback.

```bash
just dev        # dev server under the process manager (see "Local dev")
just build      # astro check + production build (type errors fail it; run before every commit)
just check      # pre-commit gate: lint, build, unit tests, prod-bundle audit, critical e2e incl. the line guard
just lint       # ESLint            just fix   # ESLint autofix + Prettier
just test       # unit tests        just typecheck
# fallbacks: npm run dev | build | preview | lint | lint:fix | format
```

## Layout and design (always on)

- Every page is built from the line-grid primitives (`Section`, `SectionHeader`, `SectionGrid`, `.line-grid`, `line-block`), never from ad-hoc borders.
- Principles (owner rulings of 2026-11-20, amended 2026-11-21 and 2026-11-23; the rule, its guard and the decision rows are in [DESIGN.md](DESIGN.md) "Principles" P1 to P11 and section 10): the site is minimal, readable and subtle. Read DESIGN.md for the details; do not copy values into code or docs from here.
  - Colour: P1 (no warm colour in the site's own UI), P2 (blue is a small accent; the one CTA button per screen is the only blue fill), P3 (hover is the lighter card background).
  - Type and links: P4 (no bold), P5 (no underlines), the font is the system font (section 2).
  - Arrows, icons, buttons: P6 (one chevron that moves, `<SiteIcon name="caret-right" class="arrow-nudge" />`), P7 (icons only through `SiteIcon`, weight by size, one icon map; logos only through `TechIcon`; never import `astro-icon` or draw an inline icon `<svg>` elsewhere), buttons through `Button` and its four tiers (section 5).
  - Forms, tags, markers: P8, P9, P11. Section headers keep four named variants (section 5).
  - A rule marked "target" in DESIGN.md is decided but not built until E007-T30: the code is the truth until then.
  - Guards: `tests/unit/design-guards.test.ts` (colour, underline, bold), `tests/unit/icon-set.test.ts` (icons), the line guard. The rest is checked by looking at the render.
- Design source: [DESIGN.md](DESIGN.md) (principles, tokens, the line model in section 3, primitives and props, decisions). How to build with it: the [line-grid-layout skill](.agents/skills/line-grid-layout/SKILL.md).
- A component never writes `border`, `overflow: hidden`, a fixed `aspect-ratio`, an opaque background, or `margin` / `transform` / `z-index` for layout or hover on a grid cell. Reuse or extend a primitive.
- Colour, type, motion and breakpoints come from tokens: no hex in `.astro` files, no `transition: all`, never mix SCSS and Tailwind breakpoints in one rule. Plain CSS `<style>` blocks take only `/* */` comments.
- A visual choice that DESIGN.md does not cover goes into its Decisions table first, then into code.
- One source of truth for everything design-related (owner, 2026-11-20): tokens, the icon map, the arrow, the button, animations, colours and line rules each live in exactly one place and every page reuses them, so changing it there changes the whole site. Never start a second system or a page-local variant; extend the shared piece instead.
- No user-interface change without the owner's global UX skill (it holds the process: variants on a real page, owner choice recorded in DESIGN.md, then implementation). Until that skill exists in Harness, the dev-only `/mockups/design-board` is the place to show options.
- The line guard `tests/e2e/line-geometry.spec.ts` discovers routes from `dist/` itself; a new page needs no edit there. See [tests/e2e/README.md](tests/e2e/README.md).
- Check the render at 1920, 1450, 1280, 1024, 768 and 390 and look at it; green tests do not prove lines. The guard runs a subset for speed: 1920, 1450, 768 and 390 on every route, 1280 on the four core routes, and never 1024.
- Dev-only routes (`/demo`, `/mockups/*`) and drafts (`published: false`) are not in `dist/`, so the guard cannot see them. Check them with `node scripts/visual-check.mjs <url> [widths...]` against the dev server (default widths: all six above); it shares `tests/e2e/lib/line-analysis.ts` with the guard. It needs Node 22.6 or newer (`.nvmrc` is 22). How to run the guard against a preview and the `astro preview` binding to `[::1]`: DESIGN.md section 9.
- UI work follows the owner's global UI rules (mockup acceptance, independent visual review).
- Component gallery: every new or changed component appears at `/demo` (dev only) with its variants, in the same change: add a row to `src/components/demo/manifest.ts` (or a file in `groups/`) and a `<GalleryEntry>` in the matching `src/components/demo/Gallery*.astro`. `tests/unit/component-gallery.test.ts` fails otherwise. Show the owner components at http://agency.internal/demo.
- Owner-facing mockups live at `/mockups/<name>` (dev only, `src/pages/mockups/[mockup].astro`). The real page changes only after the owner accepts the mockup.

## Gotchas

- `getStaticPaths` is hoisted out of the component scope: it cannot read constants from the frontmatter. Define data inside it or import it from a module.
- Git Bash rewrites arguments that start with `/` into Windows paths: set `MSYS_NO_PATHCONV=1` when passing a route.
- `networkidle` never settles on the dev server: use `waitUntil: 'load'` plus a 3 s wait, and retry when the dev server hot-reloads ("Execution context was destroyed").
- Screenshot pages taller than about 16k px in chunks: a single capture shows black rectangles and false floating-line findings.
- A bordered chip inside a grid cell draws a dangling line: chip rows go outside the grid as borderless filled chips (DESIGN.md).
- No webfont is loaded on real pages: the stack is `--font-sans` (Segoe UI, Selawik by local name only, then system fallbacks; `src/styles/tokens.scss`), and `tailwind.config.js` `sans` reads it. Inter is gone. Weight 200 cannot render and Segoe UI has no 500, so Tailwind `font-medium` is 600. The owner chose the system font on 2026-11-23 (DESIGN.md section 2). The dev font axis of the Warianty switcher loads the comparison fonts only in `astro dev`.
- `astro preview` listens on `[::1]` only: use `http://localhost:<port>` (or `--host 127.0.0.1`), not `127.0.0.1`. The dev server on 4300 does answer on `127.0.0.1`.
- Unstyled text in a grid cell can be near black on black: give headings `text-fg`, or use `.content-grid__text` and `prose` (DESIGN.md section 4).

## Project structure

```
src/
├── components/
│   ├── primitives/         # UI primitives (CardBackgroundIcon, NoteBox, Tag, DraftBadge, ...)
│   │   └── sections/       # line-grid primitives: Section, SectionHeader, SectionGrid, SectionBento, BentoCard, ...
│   ├── cards/              # CardContainer, PostCard, SeriesCard, OfferCard, PortfolioItem
│   ├── blog/               # post page components (PostMeta, PostNav, PostToc, ...)
│   ├── demo/               # the /demo gallery (dev only): manifest, GalleryEntry, Gallery* sections
│   ├── banners/            # banner system (see its README)
│   ├── react-stuff/        # React components (isolated)
│   └── Header.astro, Footer.astro, Hero.astro, CTA.astro, Button.astro, ...
├── sections/               # page-specific sections (home/, banners/)
├── layouts/Layout.astro    # base layout
├── pages/                  # file-based routing
├── styles/
│   ├── tokens.scss         # design tokens (CSS custom properties), mirrored in tailwind.config.js
│   ├── variables.scss      # SCSS aliases, breakpoints, mixins (line-grid, line-cell, line-block, cell-interactive)
│   ├── global.scss, motion.scss, footer.scss
│   └── components/         # _grids.scss, _containers.scss, _spacing.scss, _typography.scss, ...
└── content/                # MDX / Markdown content
```

- **Stack:** Astro 5 (static), Tailwind CSS + SCSS, MDX, TypeScript. UI frameworks: Astro first; React only in `react-stuff`. The SolidJS chat is archived in `archive/`.
- **Path alias:** `@/` = `/src`.
- **Components:** prefer editing an existing one; check `src/components/primitives/` first; one responsibility each; TypeScript interface for props.
- **Styling strategy:** quick prototype uses Tailwind classes; complex responsive uses SCSS with the mixins in `variables.scss`; shared styles go to `src/styles/components/`; component-specific styles go in the component's `<style>`.
- **Naming:** components `PascalCase.astro`, utilities `camelCase.ts`, styles `_kebab-case.scss`, task docs `SCREAMING_SNAKE_CASE.md`.
- **Config files:** `astro.config.mjs`, `tailwind.config.js`, `src/styles/variables.scss`, `.prettierrc` (single quotes, no semicolons, trailing commas), `.env.example`.
- **Environment:** mATX, Windows 11, PowerShell 7.x and Git Bash, Node per `.nvmrc`, npm (2026-11-21 to 2026-11-23 briefly mITX, Fedora Linux).
- Spacing is responsive (16 to 64px) through the mixins and classes described in DESIGN.md section 2.

## Blog and content

- The blog register is architecture and strategy, for DevEx practitioners and agent-builders; every post gives a working mechanism or argues a position backed by a running system.
- Load the skill `authorship` before drafting or editing any post. Three series, frontmatter contract and LinkedIn sidecars (`_<slug>.li.md`) are in [docs/agents/blog-content.md](docs/agents/blog-content.md).
- Drafts use `published: false` (visible in dev, absent in production).
- Never set `published: true` without the owner's separate review. A draft you judge ready gets `review: true` (shown as the Review marker in dev); details in [docs/agents/blog-content.md](docs/agents/blog-content.md).

## Local dev runs on mATX as `agency.internal`, under PM3 — never `localhost:PORT`

Development runs on mATX (Windows 11, PowerShell) again since 2026-11-23: mITX broke after the 2026-11-21 move, so the owner moved back. The served checkout is the worktree `.plan/worktrees/dev` (branch `dev`); `main` is the deployed branch (a push to `main` deploys to GitHub Pages, a push to `dev` deploys nothing). Three rules, one after the other (owner, 2026-08-26, domain updated 2026-11-21):

1. **The development site is `http://agency.internal` on mATX and `http://agency.matx.lan:4300` from every other computer on the home LAN or VPN** (the owner's laptop included). On mATX the browser reaches `agency.internal` through the system PAC file and the local Caddy on port 2080, so router DNS does not matter there. Other devices cannot use `agency.internal`: the router answers every `*.internal` name with `192.168.1.10`, which nobody holds (see `.plan/DECIDE.md` INF-1). The router resolves `*.matx.lan` to mATX (192.168.1.3), the dev server listens on all interfaces, and the Windows firewall allows `node.exe` on the private network. Vite HMR connects to `agency.matx.lan:4300` (`DEV_LAN_HOST` in `pm3.yaml`), so it works on both addresses. `astro.config.mjs` allows `agency.internal`, `agency.matx.lan`, `agency.mitx.lan` and `localhost` (`vite.server.allowedHosts`). Saving answers on `/admin/decisions` works from any computer that reaches the dev server (owner decision INF-5: no origin restriction); "Kopiuj" stays as a fallback. The old address `zentala.internal` is retired and unregistered.
2. **PM3 owns the process.** `pm3.yaml` in the repo root defines service `dev` (`node node_modules/astro/astro.js dev --port 4300 --host`, health check on 4300, domain `agency.internal`, registered by PM3 itself). Start, stop and restart it only with `pm3 start|stop|restart dev` from the served worktree (that is what `just dev` does), never with a loose `npm run dev` and never by killing its process: when PM3 refuses, report the refusal and fix PM3 instead of working around it. Do not `pm3 reload` from another worktree: every worktree's `pm3.yaml` has the same project name, and the last one loaded takes the service over.
3. **[CRITICAL] Every link handed to the owner is `http://agency.internal`**, or `http://agency.matx.lan:4300` when the owner works from another computer, in chat, in a report, in a task file. Never `localhost:4321`, `localhost:4300` or `127.0.0.1:PORT`. A raw `host:port` is for the agent's own `curl` diagnostics only. Astro's startup banner prints `localhost`: do not copy it. If the dev server picked another port because 4300 was taken, that is a bug to fix, not a link to paste.

## Git and commit rules

1. **ALWAYS `npm run build` before commit** (catches type errors).
2. Commit messages: short, single-line, English.
3. **Commit and push `dev` freely** (owner, 2026-11-23): no approval needed for commits or pushes to `dev`. Merging `dev` into `main` deploys the live site, so it waits for the owner's go.
4. Use `--no-pager`: `git --no-pager log`, `git --no-pager diff`.
5. Reference task numbers: `"feat: add hero #001"`.

## Planning

At the start of every session read `.plan/STATE.md` (section "Resume here": where the work stopped, what waits for the owner, what to do with each answer) and `.plan/DECIDE.md`. The private part of `.plan/` is not in this public repository: on mATX it lives in the main checkout `C:/Users/zentala/code/zentala.agency/.plan/` (a worktree's own `.plan/` holds only the tracked public files), with a copy in the private Gitea repository `zentala/zentala.agency-plan`. The owner answers open decisions on the dev-only page http://agency.internal/admin/decisions; saved answers land in `.plan/answers/`.

Work is tracked in `.plan/`: epics in `.plan/epics/` (taskmd usage in [.plan/epics/CLAUDE.md](.plan/epics/CLAUDE.md)), plus `.plan/TASKS.md` and `.plan/BACKLOG.md`. The old `.claude/tasks/` system is legacy, kept for history.

## Other docs

- [DESIGN.md](DESIGN.md): the design reference. Superseded decisions: [docs/design/decisions-history.md](docs/design/decisions-history.md). Bento span notation: [docs/design/bento-notation.md](docs/design/bento-notation.md).
- [.claude/CLAUDE.META.md](.claude/CLAUDE.META.md): SEO and meta strategy (read for SEO work).
- [tests/e2e/README.md](tests/e2e/README.md): e2e specs and the line guard.
- [README.md](README.md), [KNOW-HOW.md](KNOW-HOW.md): overview and developer links.
- [.claude/CLAUDE.THEMING.md](.claude/CLAUDE.THEMING.md): RETIRED, do not follow it.
