# E001 — Orchestrator

**Plan:** [PLAN.md](./PLAN.md) · **Architecture:** [ARCH.md](./ARCH.md)
**Strategy:** waves of parallelizable tasks; solo dev so sequential within each wave is fine

## Status

- Current wave: 0 (planning complete + CEO review applied 2026-05-12, ready to start Wave 1)
- All tasks: [ ] not started
- **Review history:** CEO review 2026-05-12 → 8 decisions applied (see JOURNAL.md). Endpoints parametrized by collection; snapshot uses `@astrojs/markdown-remark`; rename-tracking added; CI bundle audit mandatory.

## Waves

### Wave 1 — server foundation (parallel-safe if multi-agent)

Goal: dev-server endpoints exist, return correct JSON for known fixtures.

- [ ] **[E001-T01](./tasks/E001-T01-history-endpoint.md)** — history API endpoint + git-log parser
- [ ] **[E001-T02](./tasks/E001-T02-version-endpoint.md)** — version (single-SHA) API endpoint + frontmatter parser

Wave done when: both endpoints respond correctly in dev, unit tests pass, integration tests against fixture git repo pass.

### Wave 2 — client shell

Goal: panel mounts on blog posts in dev mode, shows timeline, supports live mode only.

- [ ] **[E001-T03](./tasks/E001-T03-panel-shell-and-timeline.md)** — `<BlogVersionPanel/>` shell + `VersionTimeline` (live mode default, no snapshot/diff yet)

Wave done when: panel hydrates on every `/blog/*` page in dev, timeline populated from T01 endpoint, hidden in prod build, basic SCSS in place.

### Wave 3 — view modes (parallel-safe within wave)

Goal: snapshot and diff modes operational.

- [ ] **[E001-T04](./tasks/E001-T04-snapshot-mode.md)** — snapshot mode (consumes pre-rendered HTML from endpoint; renderer is `@astrojs/markdown-remark` server-side)
- [ ] **[E001-T05](./tasks/E001-T05-diff-mode.md)** — diff mode (jsdiff + diff2html, two-version select UX)

Wave done when: both modes work end-to-end, URL hash updates and restores state.

### Wave 4 — polish + safety net

Goal: badge, keyboard shortcut, sanitization, prod bundle audit.

- [ ] **[E001-T06](./tasks/E001-T06-major-change-badge.md)** — major-change heuristic + visual badge in timeline
- [ ] **[E001-T07](./tasks/E001-T07-keyboard-and-audit.md)** — `Ctrl+H` toggle, DOMPurify on diff HTML, prod bundle audit, E2E test pass

Wave done when: full acceptance criteria from PLAN.md all green.

## Merge order

Solo dev, single working branch — no worktree dance needed for V1.

If this turns multi-agent later, merge order is:
1. T01 + T02 (server endpoints, isolated files)
2. T03 (depends on T01, creates new component dir)
3. T04 + T05 (depend on T03 component skeleton + T02 endpoint)
4. T06 + T07 (depend on everything; can be parallel)

## Dependencies graph

```
T01 ──┬──> T03 ──┬──> T04 ──┬──> T06
T02 ──┘         └──> T05 ──┴──> T07
```

## Done definition (epic-level)

All boxes in PLAN.md "Acceptance criteria" checked, `npm run build` clean, `npm run lint` clean, E2E suite green, IMPROVEMENTS.md triaged with user.
