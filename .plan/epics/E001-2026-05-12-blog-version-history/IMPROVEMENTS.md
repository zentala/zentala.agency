# E001 — Improvements (open TODOs surfaced during epic)

Scratch pad for items surfaced during execution that are NOT in current task scope. Triage with user at epic close: implement, promote to `.plan/IMPROVEMENTS.md`, or drop.

---

### [ ] MDX snapshot fidelity via experimental_AstroContainer
- **Problem:** Snapshot mode degrades MDX custom components to `<div class="mdx-stub">` placeholders. Acceptable for current pure-`.md` blog series, but a real gap once MDX adoption grows (notes, future posts).
- **Proposed fix:** Evaluate Astro 5's `experimental_AstroContainer` for true MDX render inside the version endpoint. Trade-off: heavier dev deps, more complex pipeline, potential breakage on Astro upgrades.
- **Triggered by:** CEO review 2026-05-12 (decided to scope V1 to `.md` fidelity only).

### [ ] Property-based fuzz tests for parseGitLog
- **Problem:** `git log --numstat` output has many corner forms (merges, empty commits, binary `-` markers, renames, octal-escaped paths with unicode). Fixture-based tests cover knowns; unknowns will bite.
- **Proposed fix:** Add `fast-check` as devDep, generate random commit logs with weighted edge-case probability, assert `parseGitLog` never throws and outputs are well-formed.
- **Triggered by:** CEO review 2026-05-12.

### [ ] Pre-cache last 5 visited versions in SnapshotView
- **Problem:** Switching between historical snapshots costs a fresh round-trip every time. On large posts the markdown-remark render can be 50-200ms.
- **Proposed fix:** LRU of size 5 in the React component, keyed by `${collection}:${slug}:${sha}`. Server cache handles the backend; this is just client-side memo to avoid the fetch.
- **Triggered by:** CEO review 2026-05-12 (perf section).

### [ ] Word-level diff toggle in DiffView
- **Problem:** Line-level diff is coarse for prose. Single-word edits show as full line replacements.
- **Proposed fix:** Add toggle "line | word"; word mode uses `diff.diffWordsWithSpace` then converts to a `diff2html`-compatible structure, or replaces the renderer entirely with a custom inline highlighter.
- **Triggered by:** PLAN.md follow-ups list.

### [ ] Lazy-load diff2html (~50KB bundle weight)
- **Problem:** diff2html + CSS is the heaviest dev dep loaded eagerly when panel mounts. Hits every blog page in dev even if user never switches to diff mode.
- **Proposed fix:** Convert DiffView's `import { html as diff2htmlHtml } from 'diff2html'` to dynamic `await import('diff2html')` triggered only when mode flips to diff. SCSS for `d2h-*` classes can stay eager (cheap).
- **Triggered by:** Eng review 2026-05-12 (perf section).

### [ ] Explicit mode-switch abort logic in BlogVersionPanel state machine
- **Problem:** When user switches from snapshot to diff mid-fetch, the in-flight snapshot fetch should be aborted to free the connection and avoid stale state writes. Current plan handles this implicitly via `AbortController` on unmount; mode-switch is structurally different.
- **Proposed fix:** Centralize an `activeFetchController` ref in `BlogVersionPanel`; abort it on every mode change as well as unmount/slug change. State diagram in code comment.
- **Triggered by:** Eng review 2026-05-12.

### [ ] Author attribution in timeline
- **Problem:** Multi-author repos won't surface "who wrote this commit".
- **Proposed fix:** Extend git log format with `%an` and `%ae`; render as small avatar/initials in timeline row.
- **Triggered by:** PLAN.md follow-ups list. Lower priority for solo dev.
