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