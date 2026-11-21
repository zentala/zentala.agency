---
title: 'I Start From the Prototype'
date: '2026-11-21'
category: 'Agent Orchestration'
excerpt: 'Agents now write the code faster than anyone can decide what it should look like. The new bottleneck is interface design, and these are the rules that keep an agent from turning it into a pile of one-off components.'
authorRole: 'DevEx Consultant'
published: false
series: 'agent-native-harness'
part: 17
---

<!-- TODO(owner): part 16 is already taken by software-factory-tour.mdx in this series, so this draft uses 17. Confirm the order. -->

## The bottleneck moved

Give an agent a clear spec and it produces backend and frontend code far faster than anyone can review it. What it cannot give you is a decision about how the screen should work. That decision still takes a person looking at something, and it now sets the pace of the whole project.

So prototyping and UX design come first. Code that touches the interface does not start until a mockup has passed review. The rest of this post is the set of rules that make that cheap and keep the result maintainable. Each one is a mechanism you can hand to your own agent.

## 1. Mock in the target stack, nothing in between

Mock in the components the product will ship: JSX if the app is React, Vue single-file components if it is Vue. Not in a design tool, not in a throwaway HTML page.

An in-between mockup is a translation job. An agent that rebuilds a picture as components guesses at spacing, states and structure, and it guesses a little differently each time. A mockup written in the real stack has nothing to translate: the accepted file is the starting point of the implementation.

## 2. Mock inside the existing application

For a product that already exists, clone it and build the clickable mockup there, on a mockup branch, with the real shell, styles and components. Only the data is fake. Once the mockup is accepted, the agent writes the backend against the same components the reviewer clicked through.

Two costs drop. The reviewer judges the change in its real surroundings: the actual column, the neighbouring cards, the real navigation. And the agent rewrites almost nothing, because the front end it will connect to already exists.

This site works that way. A mockup is a component plus one entry in a registry file, and a single dev-only route renders it at `/mockups/<name>` inside the real layout. While it is a mockup, the component sits in a directory the gallery test exempts, each exemption with a written reason. When the product owner accepts it, the component is promoted out of that directory into the real component tree, and from then on the gallery test requires it to have an entry. A dev-only design board uses the same route to put several variants of one decision (button styles, hover treatments, spacing, icon weights) next to each other. The product owner picks one, the choice goes into `DESIGN.md` as a dated row with the alternatives it beat, and only then does it reach the shipped components. Dev-only routes stay out of the production build, and a bundle audit in the check gate fails if one leaks.

## 3. A UI kit and a skill, from day one

Ask the agent for two things before the first page:

- a kit of components with their variants and states;
- a skill file that tells the agent how to compose pages from it: which primitive for which job, which props, a recipe per page type.

The kit gives consistency. The skill gives control over the agent, which is the harder problem. Without it, every new page is a chance for the agent to invent a card, a button or a tag that is nearly like the existing one. With it, the question "what do I use here?" has a written answer the agent reads every time.

The skill is not written once. When the kit changes, the skill is rebuilt, or the agent works from a map that no longer matches the territory.

This repository carries one: a `line-grid-layout` skill. It holds a lookup table from need to component (button, arrow, icon, tag, form, card), page recipes copied from real files, and one rule that does most of the work: do not duplicate, read the existing primitives before writing CSS. The tables in it point to numbers in `DESIGN.md` instead of repeating them, so there is one place to update.

## 4. One kit for a family of services

If you build several related products, design the kit once for all of them, and give each product its own token set: colours, and whatever else should differ.

Take four apps that belong together: a furniture designer, an apartment floor-plan editor, an inventory app that shows what sits in which box on which shelf and prints the labels, and an electrical wiring planner. The apps exchange data, and a user moves between them. With one set of components, a table, a picker or a dialog behaves identically in all four, and a shared widget works unchanged wherever the data goes. Four colour palettes make the apps feel related and still tell them apart at a glance.

<!-- TODO(owner): say whether this family is built or planned, and whether the shared kit and token sets exist yet, and which concrete data flows between the four apps (the repo does not show any). The text above stays at what the brief says. -->

The cost of skipping this is concrete. The front end is a large share of the code you will maintain. Let an agent grow it page by page and you get what people call AI slop: working screens that share no structure, an inconsistent experience and a codebase nobody wants to touch. Plan for scale at the start, when it costs one decision, not at the third rewrite.

## 5. Rules for the agent: some enforced, some process

Agents follow rules they can check, so short rules help. Four of the rules below have a test or script behind them: the gallery rule, the icon rule, the line geometry check and the production bundle audit. The rest are process rules, checked by a reviewer looking at the render. Each rule below says which it is.

**No one-off components in page files (process rule).** Everything a page uses comes from the shared set. Variants are fine. A private component needs a stated reason, in writing, next to it. No test enforces this; it is a review item, and the gallery test only catches the component that never reaches the gallery.

**Every component appears in a gallery (test-enforced).** A dev-only gallery page shows each component with its variants. A unit test walks the component directories and fails when a file has no import in the gallery, no manifest row or no rendered entry. The only way around it is an exemption map where each entry carries a reason. The agent cannot add a component quietly, and a reviewer gets one page to see the whole kit. Storybook does the same job if your stack has it.

**No frontend code before a reviewed mockup, no implementation plan before the product owner accepts it (process rule).** Order matters because an agent will plan against whatever exists. If the plan comes first, the mockup becomes a rubber stamp for it.

**Feedback attaches to the mockup (process rule).** A review toolbar (Agentation) is mounted on every page when review mode is switched on in development, so a comment is pinned to the element it is about. The annotations reach the agent through Agentation's MCP server. In this repo the toolbar is wired through a dev-only Astro integration behind an environment switch, needs a broker-supplied token for the sync proxy, and does not exist in the production build.

**`DESIGN.md` is the design source (process rule, partly guarded).** Principles, tokens, primitives with their props, and a table of decisions. A visual choice it does not cover is written into the decisions table first, then into code. The agent never introduces a new look silently. Tests guard colour, underlines and bold type; the rest is checked in the render.

**Icons go through one map (test-enforced).** UI icons are imported only through a single wrapper, and a typo in an icon name fails the build instead of rendering an empty box. Direct imports of an icon library are blocked by a unit test that scans the source tree. The rule behind it: an icon is registered once, so each icon has one meaning across the product, and a reviewer who learns a symbol does not meet it again with a different job.

On sets: this site uses Phosphor Light for interface icons, picked after comparing it with Lucide and other weights on real pages (Lucide at a thin stroke rendered heavy, Phosphor Thin looked jagged), and simple-icons for technology logos, through a second wrapper so brand marks never mix with the interface set. Sizes are whole pixels, because thin strokes blur at fractional ones.

<!-- TODO(owner): add the icon sets you recommend beyond these two, and why. -->

## 6. The agent checks its own render

Passing unit tests say nothing about pixels. A layout can be green and still show a doubled line or a clipped control, so the acceptance cycle runs on screenshots and measurements, not on code review:

1. The agent renders the page at the widths that matter, here from a desktop width down to a phone.
2. A script measures it. In this repo a geometry check finds doubled, missing and floating lines. It reads the routes from the built output, so a new page is covered without editing the test, and a second script runs the same analysis on dev-only pages and drafts, which the build never contains.
3. The agent looks at screenshots, reads the findings and fixes them, then repeats.
4. A person reviews the result after that, not before.

The agent does the tedious loop. The person's review time goes to judgement.

## Other habits that pay off

- **Decisions as dated rows.** Each choice records what it replaced and why, so the next agent does not reopen it.
- **One source for each design concern.** Tokens, the icon map, the arrow, the button: each lives in one place and every page reuses it. A page-local variant is a defect.
- **Say how each rule is checked.** A rule is either a test or a review item, and it states which. A review item names what to look at in the render.

## Start with this

1. Ask the agent for a UI kit and a composition skill before the first page.
2. Mock in your real stack, inside your real app.
3. Add a gallery test that fails on a component with no entry.
4. Route icons through one map and block direct imports.
5. Write `DESIGN.md`, and make "decision first, code second" a rule.
6. Hold the implementation plan until the mockup is accepted.

<!-- TODO(owner): add how much code an agent produces per session if you want a figure here; any numbers you can stand behind (time saved, rewrites avoided) would strengthen section 2. -->
