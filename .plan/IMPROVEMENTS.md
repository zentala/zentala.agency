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
