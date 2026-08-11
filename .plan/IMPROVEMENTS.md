# .plan/IMPROVEMENTS.md — global cross-cutting TODOs

Cross-cutting quality / UX / DevEx / architecture ideas that outlast any single epic.

Entry format: `### [ ] summary` + Problem / Proposed fix / Triggered by lines.
Flip to `[x]` when fixed; cross-link the JOURNAL session that did it.

---

## Indexes

- [TASKS.md](./TASKS.md) — concrete actionable tasks outside any single epic.

## Reports

- [Animations review](./animations-review/README.md) - motion-language audit and
  implementation recommendations for navigation, footer, CTAs, bento, and blog
  interactions. Implementation epic:
  [E002 — Animation Language](./epics/E002-2026-05-26-animation-language/PLAN.md).

---

### [ ] Reusable "dev-only modules absent from prod bundle" CI guard
- **Problem:** E001 introduces `scripts/audit-prod-bundle.mjs` for one specific module. The pattern (grep `dist/` for forbidden strings, fail CI) is reusable for any future dev-only tooling. Currently inlined into E001.
- **Proposed fix:** Once E001 lands, extract the script to take a config file (e.g. `audit.config.json` with `forbidden: string[]`) and document the pattern. Future dev tools (e.g. design grid overlay, performance overlay) declare their forbidden strings and the same CI step covers them.
- **Triggered by:** E001 CEO review 2026-05-12.

### [ ] Grouped series module on `/blog` index
- **Problem:** `/blog/index.astro` lists every post flat; a reader with no context on the "agent-native harness" series has to click into a random part or discover the small `View series →` link (T07) to find the series exists.
- **Proposed fix:** a dedicated section on `/blog` grouping series entries together (e.g. one row per series showing part 1's card plus a count), separate from the flat recent-posts grid. Needs its own design pass — out of scope for E003.
- **Triggered by:** E003 (2026-08-10), ORCHESTRATOR.md Wave 5 T09.

### [ ] Reddit snippet field on `blogCollection`
- **Problem:** E003 adds a `linkedinPost` field for one social channel. The content-marketing strategy (root `CLAUDE.md`) also names Reddit (r/ai, r/devops) as a promotion channel, with its own tone/format constraints distinct from LinkedIn.
- **Proposed fix:** a `redditPost` field (title + body, Reddit's own conventions) plus a matching preview route, mirroring the `linkedinPost`/`linkedin-preview` pattern from E003 once there's real content to exercise it.
- **Triggered by:** E003 (2026-08-10), ORCHESTRATOR.md Wave 5 T09.
