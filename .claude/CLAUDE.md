# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Zentala Agency is a personal innovation consulting and prototyping agency website built with Astro.js. The site showcases services, portfolio, and blog content.

**Live Site:** https://zentala.agency/
**Main Branch:** `main`
**Deployment:** GitHub Pages via GitHub Actions (automatic on push to main)

## Essential Commands

```bash
# Development
npm run dev          # Start dev server at localhost:4321
npm run build        # Type-check + build (MUST pass before commit!)
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Format with Prettier

# Git Workflow - IMPORTANT
npm run build        # ALWAYS run before committing
git add .
git commit -m "..."  # Short, single-line, English only
# User pushes manually - NEVER auto-push
```

## Project Structure

```
src/
├── components/
│   ├── cards/              # Card components
│   ├── primitives/         # Base UI primitives (ImageCircle, NoteBox, etc.)
│   ├── react-stuff/        # React components (isolated)
│   ├── solid-chat/         # SolidJS chat (isolated)
│   └── Header.astro, Footer.astro, Hero.astro, etc.
├── layouts/
│   └── Layout.astro        # Base layout
├── pages/                  # File-based routing
├── styles/
│   ├── global.scss
│   ├── variables.scss      # Design tokens, mixins, breakpoints
│   └── components/         # Modular SCSS
└── content/                # MDX content

.claude/
├── CLAUDE.md               # This file
├── CLAUDE.TASKS.md         # Task management guide
├── CLAUDE.THEMING.md       # Design system guide ⭐
└── tasks/NNN_task_name/    # Structured task folders
```

## Tech Stack

- **Framework:** Astro 5.x (static site generation)
- **Styling:** Tailwind CSS + SCSS (custom design system)
- **Content:** MDX for blog/content
- **TypeScript:** Full type safety
- **UI Frameworks:** Astro (primary), React (react-stuff only), SolidJS (solid-chat only)

## Design System

**⚠️ CRITICAL: This project has a sophisticated custom design system.**

**When working on ANY styling/layout:**
1. **Read [.claude/CLAUDE.THEMING.md](.claude/CLAUDE.THEMING.md)** first
2. Follow the established patterns
3. Never add borders to card components (grid handles it)
4. Use responsive mixins, not fixed pixels

**Quick Reference:**
- Dark theme: Black background (`#000`), gray-800 borders, white text
- Spacing: Auto-scales via mixins (16px→24px→32px→48px→64px)
- Grid system: 3 cols desktop → 2 tablet → 1 mobile
- Containers: `.container-bordered`, `.container-padded`, `.container-simple`
- Path alias: `@/` = `/src`

**For complete details:** [.claude/CLAUDE.THEMING.md](.claude/CLAUDE.THEMING.md)

## Task Management

Tasks follow structured organization documented in [.claude/CLAUDE.TASKS.md](.claude/CLAUDE.TASKS.md).

**⚠️ ALWAYS read [.claude/tasks/PRIORITIES.md](.claude/tasks/PRIORITIES.md) before working on tasks!**

**Quick points:**
- Tasks in `.claude/tasks/NNN_task_name/` with `README.md` index
- Task numbers in `.claude/SEQUENCE.md`
- Move files with `mv`/`Move-Item` commands (NEVER Write/Edit tools)
- Completed tasks → `.claude/tasks/done/`
- Backlog (unrefined) → `.claude/tasks/backlog/`

**Current priorities (see PRIORITIES.md for details):**
- **MEGA PRIORITY:** Beautiful homepage with reusable design system
- After homepage: Light theme → Animations → SEO
- Defer: Image placeholders, content strategy, technical debt

## Blog content

### What this author shares, and who reads it

The register is **architecture and strategy** (Paweł's own words) — not
tutorials for beginners, not opinion without a mechanism behind it. Every
post either gives the reader a working mechanism they can hand to their own
agent, or argues a position backed by a system that actually runs, not a
hypothetical. Readers are DevEx practitioners, engineering leads weighing an
internal developer portal or a Backstage rollout, and people building
agent-native tooling of their own — competent by default; nothing gets
explained from zero for them. Before drafting or editing any post, load the
skill `authorship` (`~/.claude/skills/authorship/SKILL.md`) — it holds the
reader-first rules and the editor's checklist this register runs on.

### Four series, one split by question

The blog runs **four article series** (`src/content/series-descriptions/`),
and most new posts belong to one of them. The split is by the question a
post answers, not by its topic:

| Series | Slug | Answers | Holds |
|---|---|---|---|
| **Agent-Native Harness** | `agent-native-harness` | **how** | the machinery that already runs: agent registry, bang commands, PM3, the knowledge base, the feedback loop, the main-branch lease |
| **Multi-Interface** | `multi-interface` | **why** | UX, DX and AX as one discipline: content negotiation, Markdown/MDX as the substrate, agent-native architecture (A2A + MCP + API at once), addressing, brokers |
| **Developer Experience** | `developer-experience` | **why it pays, how to start** | DevEx as a practice, why an internal developer portal is the usual first move, how a Backstage rollout survives contact with a real organization, and the turn where the same catalog data an internal portal built for humans turns out to be what an AI agent needs too |
| **Information Architecture** | `information-architecture` | **how people and agents learn** | taxonomy, ontology, metadata and navigation as engineering concerns; documentation written for two readers at once (the next developer and the next agent); onboarding as continuous, not a first week |

Harness links to Multi-Interface as its justification; Multi-Interface links to
Harness as its proof. A post that explains a mechanism goes to Harness. A post
that argues a position goes to Multi-Interface. Developer Experience and
Information Architecture each read standalone — read their full descriptions
in `src/content/series-descriptions/*.md` before assigning a post to one, they
carry more than the one-line "answers" column above.

A post that fits none of the four stays outside `series:` entirely (see
`static-webistes-no-time.md`, `agenci-zostawiaja-feedback-o-toolingu.md` for
examples already in the tree) — do not force a series assignment a post
doesn't earn.

### Which blog, first

Which blog gets an article at all is a global rule (`~/.claude/CLAUDE.md`):
commercial topics — harness, agent-native, multi-interface, AI agency, DevEx —
are written **here**, straight away. Everything else goes to `log.zentala.pl`
(repo `zntl-portal`). That repo's `src/content/ideas/` is the workshop and stays
the source: drafts may be **moved here as files, never summarized**.

### Frontmatter contract (`src/content/config.ts`, `blogCollection`)

| Field | Required | Meaning |
|---|---|---|
| `title` | yes | Post title, single-quoted string |
| `date` | yes | `'YYYY-MM-DD'` |
| `category` | yes | One of the existing categories (`DevEx`, `Harness`, `Agent Orchestration`, `IA`, `Innovation`, `Knowledge & Leverage`, `WebDev`) unless the post genuinely starts a new one — a `category-descriptions/<slug>.md` entry is needed for a new category (only `devex.md` exists today; others render without one, but adding the description is still the contract) |
| `excerpt` | yes | 1–3 sentences, reader-facing — this is the card/preview copy, held to the same reader-first rule as the post itself |
| `author` | no | Defaults to `pawel-zentala` (`src/content/authors/zentala.yaml`) |
| `authorRole` | no | e.g. `'DevEx Consultant'` |
| `published` | no | `false` keeps a post out of the production build while leaving it visible in `npm run dev` — draft posts stay `false` until reviewed |
| `series` | no | One of the four slugs above; a series page only materializes if at least one post carries its slug (`getStaticPaths` groups by posts, not by the description file) |
| `part` | no | A number, only meaningful alongside `series` |
| `linkedinPost` | no | The LinkedIn companion text — its own shape per the `authorship` skill's "LinkedIn companion" format, never the article truncated |
| `imageUrl` / `bannerEnd` | no | Optional visual fields |

## Local dev runs as `zentala.internal`, under PM3 — never `localhost:PORT`

Three rules, one after the other. They are not suggestions (Paweł, 2026-08-26).

1. **The local site is `http://zentala.internal`.** That is the address of the
   development copy of zentala.agency on this machine. Registered in the
   `internal-domains` registry, proxied by Caddy on port 2080, resolved through
   the PAC file. `astro.config.mjs` already allows the host
   (`vite.server.allowedHosts`).
2. **PM3 owns the process.** `pm3.yaml` in the repo root defines service `dev`
   (`npm run dev -- --port 4300 --host`, health check on 4300). Start it with
   `pm3 start zentala-agency/dev`, never with a loose `npm run dev` in a shell —
   an unsupervised dev server dies with its terminal and nothing notices.
3. **[CRITICAL] Every link handed to Paweł is `http://zentala.internal`** — in
   chat, in a report, in a task file. Never `localhost:4321`, never
   `localhost:4300`, never `127.0.0.1:PORT`. A raw `host:port` is for the
   agent's own `curl` diagnostics and nothing else. Astro's own startup banner
   prints `localhost` — do not copy it. If the dev server picked a different
   port because 4300 was taken, that is a bug to fix, not a link to paste.

## Git & Commit Rules

1. **ALWAYS `npm run build` before commit** (catches type errors)
2. Commit messages: Short, single-line, English
3. **NEVER commit without user approval** - stage & propose message
4. **NEVER push** - user does it manually
5. Use `--no-pager` flag: `git --no-pager log`, `git --no-pager diff`
6. Reference task numbers: `"feat: add hero #001"`

## Development Guidelines

### Component Creation
- **Prefer editing existing components** over creating new ones
- Check `src/components/primitives/` for reusable elements
- Follow single responsibility principle
- Define TypeScript interfaces for props

### Styling Strategy
```
Quick prototyping?        → Tailwind classes in template
Complex responsive?       → SCSS with mixins (see CLAUDE.THEMING.md)
Shared across components? → src/styles/components/
Component-specific?       → <style> in .astro file
```

### File Naming
- Components: `PascalCase.astro`
- Utilities: `camelCase.ts`
- Styles: `_kebab-case.scss`
- Task docs: `SCREAMING_SNAKE_CASE.md`

## Common Patterns

### New Page Template
```astro
---
import Layout from '@/layouts/Layout.astro'
import Hero from '@/components/Hero.astro'
---

<Layout title="Page Title">
  <Hero title="Title" subtitle="Subtitle" />

  <section class="section-full">
    <div class="container-bordered">
      <!-- Content -->
    </div>
  </section>
</Layout>
```

### Card Grid
```astro
<div class="cards-grid">
  <CardContainer href="/link">
    <!-- Card content -->
  </CardContainer>
</div>
```

### Responsive Spacing
```html
<div class="py-responsive-md">   <!-- Auto-scales: 16→64px -->
<div class="px-responsive-sm">   <!-- Smaller scale for nav -->
<div class="py-responsive-lg">   <!-- For heroes: 24→96px -->
```

## Environment

- **OS:** Windows 11
- **Shell:** PowerShell 7.x
- **Node:** See `.nvmrc`
- **Package Manager:** npm

## Key Config Files

- `astro.config.mjs` - Astro setup, integrations
- `tailwind.config.js` - Tailwind customization
- `src/styles/variables.scss` - Design tokens, mixins
- `.prettierrc` - Single quotes, no semicolons, trailing commas
- `.env.example` - Environment variables template

## Critical Reminders

### Theming
- **Read [CLAUDE.THEMING.md](.claude/CLAUDE.THEMING.md) when working on UI/styles**
- Grid system uses transparent border pattern (no double borders)
- All spacing should be responsive (use mixins)
- Never mix SCSS breakpoints with Tailwind breakpoints

### Build Process
- Type errors will fail the build
- Run `npm run build` frequently during development
- Fix all TypeScript errors before committing

### Documentation
- Notes in code are normal (WIP project)
- Commented code is OK (compiler strips it)
- Extensive context for LLM-assisted development

---

**For UI/styling work:** Read [.claude/CLAUDE.THEMING.md](.claude/CLAUDE.THEMING.md)
**For task priorities:** Read [.claude/tasks/PRIORITIES.md](.claude/tasks/PRIORITIES.md) ⭐
**For task workflow:** Read [.claude/CLAUDE.TASKS.md](.claude/CLAUDE.TASKS.md)
**For SEO/meta strategy:** Read [.claude/CLAUDE.META.md](.claude/CLAUDE.META.md)
**For project overview:** Read [README.md](README.md)

**Last Updated:** 2025-10-05