# .plan/TASKS.md — actionable tasks

Concrete, actionable tasks outside any single epic. Flip `[ ]` → `[x]` when done
and cross-link the commit/session that closed it.

---

### [ ] Fix pre-existing `astro check` failure — 274 errors from missing SolidJS deps
- **Importance:** Medium · **Points:** 5
- **Problem:** `npm run build` (`astro check && astro build`) fails with **274 errors**,
  almost all cascading from `src/components/solid-chat/**`: `Cannot find module 'solid-js'`
  and `'solid-element'`. Neither package is in `package.json`, so every SolidJS JSX type
  in the chat component is unresolved. This is a **pre-existing** condition — measured
  identical (274) on the pre-reconcile state and after the origin↔local merge (2026-08-05),
  so it is unrelated to that merge. The audit that confirmed the merge integrity flagged it.
- **Proposed fix (needs a short spike to pick a path):**
  1. **Keep solid-chat** → add `solid-js` + `solid-element` deps, wire `@astrojs/solid-js`
     in `astro.config.mjs`, and set the SolidJS JSX config in `tsconfig.json`
     (`jsxImportSource`), scoped so it does not clash with the React island config.
  2. **Retire solid-chat** → if the SolidJS chat is dead/experimental and superseded by
     the React/`solid-chat` usage elsewhere, delete the component and its references.
  - Decide keep-vs-retire first (is solid-chat shipped anywhere?), then implement.
- **Acceptance:** `npm run build` exits 0 (0 errors); no new runtime regression on the
  chat surface if kept.
- **Triggered by:** git-reconcile audit, 2026-08-05.
