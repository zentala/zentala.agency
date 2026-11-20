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
- Design source: [DESIGN.md](DESIGN.md) (tokens, the line model in section 3, primitives and props, decisions). How to build with it: the [line-grid-layout skill](.agents/skills/line-grid-layout/SKILL.md).
- A component never writes `border`, `overflow: hidden`, a fixed `aspect-ratio`, an opaque background, or `margin` / `transform` / `z-index` for layout or hover on a grid cell. Reuse or extend a primitive.
- Colour, type, motion and breakpoints come from tokens: no hex in `.astro` files, no `transition: all`, never mix SCSS and Tailwind breakpoints in one rule. Plain CSS `<style>` blocks take only `/* */` comments.
- A visual choice that DESIGN.md does not cover goes into its Decisions table first, then into code.
- The line guard `tests/e2e/line-geometry.spec.ts` discovers routes from `dist/` itself; a new page needs no edit there. See [tests/e2e/README.md](tests/e2e/README.md).
- Check the render at 1920, 1450, 1280, 1024, 768 and 390 and look at it; green tests do not prove lines.
- UI work follows the owner's global UI rules (mockup acceptance, independent visual review).

## Project structure

```
src/
├── components/
│   ├── primitives/         # UI primitives (CardBackgroundIcon, NoteBox, Tag, DraftBadge, ...)
│   │   └── sections/       # line-grid primitives: Section, SectionHeader, SectionGrid, SectionBento, BentoCard, ...
│   ├── cards/              # CardContainer, PostCard, SeriesCard, OfferCard, PortfolioItem
│   ├── blog/               # post page components (PostMeta, PostNav, PostToc, ...)
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
- **Environment:** Windows 11, PowerShell 7.x, Node per `.nvmrc`, npm.
- Spacing is responsive (16 to 64px) through the mixins and classes described in DESIGN.md section 2.

## Blog and content

- The blog register is architecture and strategy, for DevEx practitioners and agent-builders; every post gives a working mechanism or argues a position backed by a running system.
- Load the skill `authorship` before drafting or editing any post. Four series, frontmatter contract and LinkedIn sidecars (`_<slug>.li.md`) are in [docs/agents/blog-content.md](docs/agents/blog-content.md).
- Drafts use `published: false` (visible in dev, absent in production).

## Local dev runs as `zentala.internal`, under PM3 — never `localhost:PORT`

Three rules, one after the other (owner, 2026-08-26):

1. **The local site is `http://zentala.internal`.** That is the address of the development copy of zentala.agency on this machine. It is registered in the `internal-domains` registry, proxied by Caddy on port 2080 and resolved through the PAC file. `astro.config.mjs` already allows the host (`vite.server.allowedHosts`).
2. **PM3 owns the process.** `pm3.yaml` in the repo root defines service `dev` (`node node_modules/astro/astro.js dev --port 4300 --host`, health check on 4300; it injects the Agentation token through the password broker, see DESIGN.md and `pm3.yaml`). Start it with `pm3 start zentala-agency/dev` (that is what `just dev` does), never with a loose `npm run dev` in a shell: an unsupervised dev server dies with its terminal and nothing notices.
3. **[CRITICAL] Every link handed to the owner is `http://zentala.internal`**, in chat, in a report, in a task file. Never `localhost:4321`, `localhost:4300` or `127.0.0.1:PORT`. A raw `host:port` is for the agent's own `curl` diagnostics only. Astro's startup banner prints `localhost`: do not copy it. If the dev server picked another port because 4300 was taken, that is a bug to fix, not a link to paste.

## Git and commit rules

1. **ALWAYS `npm run build` before commit** (catches type errors).
2. Commit messages: short, single-line, English.
3. **NEVER commit without user approval**: stage and propose the message.
4. **NEVER push**: the user does it manually.
5. Use `--no-pager`: `git --no-pager log`, `git --no-pager diff`.
6. Reference task numbers: `"feat: add hero #001"`.

<!-- CAVEAT(owner): rules 3 and 4 predate the owner's newer global push and merge decisions; kept unchanged until the owner decides which wins for this public repo. -->

## Planning

Work is tracked in `.plan/`: epics in `.plan/epics/` (taskmd usage in [.plan/epics/CLAUDE.md](.plan/epics/CLAUDE.md)), plus `.plan/TASKS.md` and `.plan/BACKLOG.md`. The old `.claude/tasks/` system is legacy, kept for history.

## Other docs

- [DESIGN.md](DESIGN.md): the design reference. Superseded decisions: [docs/design/decisions-history.md](docs/design/decisions-history.md). Bento span notation: [docs/design/bento-notation.md](docs/design/bento-notation.md).
- [.claude/CLAUDE.META.md](.claude/CLAUDE.META.md): SEO and meta strategy (read for SEO work).
- [tests/e2e/README.md](tests/e2e/README.md): e2e specs and the line guard.
- [README.md](README.md), [KNOW-HOW.md](KNOW-HOW.md): overview and developer links.
- [.claude/CLAUDE.THEMING.md](.claude/CLAUDE.THEMING.md): RETIRED, do not follow it.
