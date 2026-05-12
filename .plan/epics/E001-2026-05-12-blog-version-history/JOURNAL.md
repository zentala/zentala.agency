# E001 — Journal

Live findings (real-time appends) + session summaries (at `done.`).

---

## Session 2026-05-12 — epic scaffolding

- **Goal:** Scaffold the epic — ARCH, PLAN, ORCHESTRATOR, 7 task files.
- **Done:** All planning files in place. No code yet.
- **Decisions:**
  - Dev-only tool — three layers of prod isolation (endpoint gate, mount gate, bundle audit)
  - markdown-it (not full MDX) for snapshot rendering — accept fidelity gap on custom components, document with placeholder strategy
  - Read-only git operations only — no checkout, no stash, no working-tree mutation
  - Single working branch (solo dev) — worktree dance not needed for V1; would adopt if multi-agent
- **Findings this session:** none yet (no code).
- **Next:** Start Wave 1 → T01 history endpoint.

## Session 2026-05-12 14:30 — CEO review + plan revision

- **Goal:** Run `/plan-ceo-review` on the freshly scaffolded epic and apply any worthwhile findings before code starts.
- **Mode chosen:** HOLD SCOPE — personal dev tool, plan already right-sized; no expansion useful, only sharpening.
- **Critical decision: Approach C migration.** Original plan rendered historical markdown via `markdown-it` (parallel pipeline). Switched to `@astrojs/markdown-remark` — the same library Astro uses internally — so for `.md` posts the snapshot render is byte-identical to production. Eliminates the "this is a slightly different render" footgun that would have undermined the core value prop.
- **Decisions applied (8):**
  1. Approach C — `@astrojs/markdown-remark` instead of `markdown-it`. Endpoint returns `html` pre-rendered server-side; SnapshotView just consumes it.
  2. Mode = HOLD SCOPE (committed, no silent drift).
  3. Endpoints parametrized by `collection`: `/api/dev/history/[collection]/[slug].json` and `/api/dev/version/[collection]/[slug]/[sha].json`. Allowlist (`['blog']`) keeps V1 scope tight; extending to `notes/` is a one-line change later.
  4. Rename-tracking: `parseGitLog` now extracts `pathAtCommit` from `--numstat` rename markers; `getVersion` uses it instead of the current path so renamed files don't surface as "empty timeline" or "file not present at SHA".
  5. Frontmatter parse rescue: `gray-matter` throw → `{ frontmatter: {}, warnings: ['frontmatter parse failed'] }` rather than 500.
  6. Markdown render rescue: `@astrojs/markdown-remark` throw → fallback HTML + warning, body still returned for raw display.
  7. CI bundle audit step (`.github/workflows/*`) — mandatory. Local `audit:prod` is necessary but not sufficient; CI is the load-bearing guarantee.
  8. UI state coverage explicit in T03: loading skeleton, empty-history message, error+retry, TOC/share-rail collision tests across breakpoints, first-visit ⌨ affordance for `Ctrl+H`.
- **Deps adjusted:** removed `markdown-it` + `@types/markdown-it`. Added `@astrojs/markdown-remark`. Net: same number of dev deps, but renderer fidelity hugely improved.
- **Files edited:** ARCH.md (rewrite), PLAN.md (scope/risks/acceptance/tests), T01 (collection+rename), T02 (rewrite for markdown-remark + frontmatter rescue), T03 (UI states + collision tests), T04 (rewrite — no parallel renderer, just consume endpoint HTML), T05 (auto-order, abort, edge cases), T07 (CI bundle audit step + extended forbidden-strings list), ORCHESTRATOR.md (review history line), IMPROVEMENTS.md (5 entries seeded from review).
- **Open items parked to IMPROVEMENTS.md:** experimental_AstroContainer for MDX, property-based fuzz for parseGitLog, client-side pre-cache, word-level diff, author attribution.
- **Next:** Wave 1 → T01 history endpoint (collection-aware, rename-tracking).

## Session 2026-05-12 15:00 — Eng review + plan revision (round 2)

- **Goal:** Run `/plan-eng-review` after CEO review and catch anything that would block implementation.
- **Recon highlights:**
  - `astro.config.mjs` → `output: 'static'`, `react({ include: ['src/components/react-stuff/**/*'] })`, zero remark/rehype plugins
  - `.github/workflows/` exists: `deploy.yml` (test → build → deploy) + `test.yml` (PR + push). Both run `npm run build` — natural anchor for the audit step.
  - Astro 5 with `@astrojs/mdx` integration installed (so `.mdx` is on the table; current series is pure `.md`).
- **Critical finding (would have blocked implementation):** plan placed React components in `src/components/dev/blog-version-panel/`. That path is **outside** the `react()` include glob — JSX would have been emitted as raw `.tsx` without compilation. Moved to `src/components/react-stuff/dev/blog-version-panel/`. ARCH + all task files updated via bulk replace.
- **Other decisions applied (4):**
  1. **Static-output semantics documented explicitly.** In `output: 'static'`, API routes never reach `dist/`; the env-gate is now framed as belt-and-suspenders (Layer 2 of 5) rather than load-bearing.
  2. **Snapshot fidelity regression test (T02).** Renders one representative post through both Astro's real content collection and our `renderMarkdown` wrapper; CI fails if HTML drifts. Catches the "someone added a remark plugin and the dev tool silently went out of sync" failure mode.
  3. **Bundle audit pinned to minifier-stable strings.** Was grepping `BlogVersionPanel` (gets minified to a single char → false negative). Now grepping package-name string literals + CSS class prefixes (`'simple-git'`, `d2h-wrapper`, etc.).
  4. **Cross-platform temp dir for test fixtures.** `mktemp` is Unix-only; user runs Windows. Helper uses `os.tmpdir() + crypto.randomUUID()` + `mkdtempSync`. Each test gets a unique dir → parallel Vitest workers don't collide.
- **CI integration:** audit step lands in BOTH `deploy.yml` (post-build, pre-E2E) AND `test.yml` (PR signal before merge).
- **Parked to IMPROVEMENTS.md (P2/P3):** lazy-load diff2html, explicit mode-switch abort logic.
- **Files edited:** ARCH.md (revision log + section 9 rewrite + path replace across doc), PLAN.md (constraints + risks), T01 (cross-platform temp dir), T02 (fidelity regression test), T03/T04/T05/T06/T07 (path replace), T07 (audit strings + CI integration explicit for both workflows), IMPROVEMENTS.md (+2 entries).
- **Next:** Wave 1 → T01.
