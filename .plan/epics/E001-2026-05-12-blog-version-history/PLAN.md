# E001 — Blog Version History (dev tool)

**Status:** planning
**Created:** 2026-05-12
**Owner:** zentala
**Architecture:** see [ARCH.md](./ARCH.md)
**Tasks:** see [ORCHESTRATOR.md](./ORCHESTRATOR.md)

## What

A dev-only floating panel on every blog post page that lets the author:

1. See a timeline of every commit that touched this post (SHA, date, message, lines changed)
2. Visually distinguish "major" changes (heuristic: ≥30% lines changed or ≥50 line delta)
3. Switch between three modes:
   - **Live** — current working-tree version (default; identical to normal page view)
   - **Snapshot** — render any historical version of the post
   - **Diff** — unified side-by-side diff between any two selected versions
4. Share a deep link to a specific version or diff via URL hash (`#v=<sha>`, `#diff=<a>..<b>`)
5. Toggle the panel with a keyboard shortcut (`Ctrl+H` proposed)

## Why

Three concrete reasons:

1. **The series of three articles just written** (`autonomous-agents-on-backstage.md`, `async-continous-onboarding-on-demand.md`, `documentation-as-substrate.md`) will go through multiple revision passes before publication. Being able to flip between "what did this look like before I rewrote it?" and "what's the diff against the version I shipped at 2026-05-12 1500?" without leaving the rendered page accelerates editing.
2. **Long-form content benefits from compare-and-iterate.** Currently, comparing two drafts means opening the GitHub diff in a separate tab and mentally reconciling against the rendered page. This collapses both into one workflow.
3. **The pattern is reusable.** Once this exists for blog posts, the same primitive can extend to category descriptions, notes, and other content collections with one prop change.

## Scope

### In scope (V1)

- `.md` blog posts only (in `src/content/blog/`)
- Linear git history (single branch, no merge-commit handling needed)
- Dev mode only (`import.meta.env.DEV`); zero prod impact
- Three view modes, keyboard shortcut, URL-hash deep links
- Major-change visual badge in timeline

### Explicitly out of scope (V1)

- MDX component fidelity in snapshot mode (degrades to placeholders; documented). For pure `.md` posts (current blog series) the snapshot render IS byte-identical to prod because both use `@astrojs/markdown-remark`.
- Branch comparison ("show this post on `dev` vs `main`")
- Multi-file diff (e.g. image changes referenced by the post)
- Notes / category descriptions / other content collections — endpoints are already parametrized by `collection`; enabling another collection is a single allowlist line, deferred to follow-up so V1 stays scoped
- Any kind of git mutation (commits, checkouts, stashes)

## Constraints

- **Production bundle must be unaffected.** Bundle audit task at end of epic verifies no dev modules leak. Audit pins minifier-stable strings (`'simple-git'`, `d2h-wrapper`, etc.), not React identifiers.
- **Panel lives inside `src/components/react-stuff/`.** This is the only path covered by `react()` integration's `include` glob in `astro.config.mjs`. Putting React components elsewhere → JSX won't compile.
- **File-length cap 250 lines** per project rule; each task delivers components under that.
- **TypeScript with TSDoc** on every public function.
- **Path alias `@/`** instead of relative `../../`.
- **No new prod dependencies.** All additions are `devDependencies`.
- **Read-only git operations.** Architectural principle, also a security boundary.

## Acceptance criteria

The epic is done when **all** of these hold:

1. Open `npm run dev`, visit any blog post → floating panel visible bottom-right (does not collide with TOC sidebar or share rail at any viewport ≥1024px)
2. Timeline shows ≥1 entry; entries that exceeded the rename boundary still show correctly (rename-aware history)
3. Click any historical SHA → page body re-renders as the historical content using the **same markdown pipeline as prod** (byte-identical for `.md`)
4. Click two SHAs in diff mode → side-by-side unified diff renders; auto-orders A=older, B=newer; Swap button works
5. URL hash updates on selection; reloading restores the view; unknown SHA falls back gracefully to live mode with warning
6. `Ctrl+H` toggles panel visibility (collapsed state persists in localStorage)
7. `npm run build` succeeds; `npm run audit:prod` returns zero forbidden strings (`simple-git`, `diff2html`, `BlogVersionPanel`, `/api/dev/`, `dev/blog-version-panel`)
8. CI workflow includes the bundle audit step; merge blocked if it fails
9. `npm run lint` clean
10. All unit + integration + E2E tests pass, including: rename-tracking integration test, frontmatter-parse-failure unit test, sanitization regression test (XSS payload in diff)
11. Panel does not appear when running `npm run preview` (production build) and no `/api/dev/*` request is made
12. Empty/loading/error states designed and visible in their respective conditions (no blank panels)

## Test strategy

Per project's `test-strategy.md` rule, every epic must define this.

**Unit (Vitest):**
- `parseGitLog()` — fixtures covering: single commit, multi-commit, rename-tracked commit (`{old => new}/file.md`), binary marker `-` in numstat, empty input
- `computeIsMajor()` — boundary cases at 29/30/31% and 49/50/51 lines
- `validateSha()`, `validateSlug()`, `validateCollection()` — accept good, reject bad (including injection attempts, `..`, spaces, unicode)
- `renderMarkdown()` (the `@astrojs/markdown-remark` wrapper) — known MD input → expected HTML; code-block shiki classes present
- `buildDiffHtml()` — two known strings → expected diff2html output structure
- `sanitizeDiffHtml()` — XSS payloads (`<img onerror>`, `<script>`, inline `style`) stripped; structural classes preserved
- frontmatter rescue — malformed YAML → `{ frontmatter: {}, warnings: ['frontmatter parse failed'] }`

**Integration (Vitest + test git fixture):**
- Initialize a temp git repo with 3 known commits to a markdown file → call `getHistory('blog', slug)` → assert ordered list, percentages, major flags
- Rename scenario: commit creates `foo.md`, then `git mv foo.md bar.md`, then edit bar.md → `getHistory('blog', 'bar')` must return all 3 entries with correct `pathAtCommit`
- Call `getVersion('blog', slug, sha)` for each commit → assert frontmatter + body + rendered HTML match
- `getVersion` against a pre-creation SHA → returns warnings, no throw

**E2E (Playwright):**
- Boot dev server → navigate to a blog post → assert panel mounts
- Click timeline entry → assert page body changes to historical content
- Switch to diff mode, pick two versions → assert `.d2h-wrapper` rendered with expected hunk count
- Press `Ctrl+H` twice → assert panel hides then shows

**Coverage targets:**
- `src/lib/dev/git-history/` (pure logic): 100%
- `src/pages/api/dev/**` (endpoints): ≥80%
- `src/components/react-stuff/dev/blog-version-panel/` (React UI): ≥70%

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| `simple-git`/`diff2html` accidentally bundled into prod | Low | High | 5-layer defense: static-output (structural) + env gate + Layout gate + local audit + **CI audit** in both `deploy.yml` and `test.yml` |
| Historical render silently drifts from prod after future Astro config changes | **Medium** | Medium | Snapshot-fidelity regression test (T02) compares dev tool output vs Astro real render; CI fails on drift |
| Historical render diverges from prod for `.md` posts at HEAD | **Eliminated** | — | Snapshot uses `@astrojs/markdown-remark` (same lib as Astro); MDX components degrade to placeholders, documented |
| React components in `src/components/dev/…` won't compile (outside include glob) | Eliminated | — | Components live under `src/components/react-stuff/dev/blog-version-panel/`, inside the existing `react()` include glob |
| `git log --follow` misses renames | Medium | High | Parse rename markers from `--numstat` → `pathAtCommit` per entry → fed back into `git show` |
| Endpoints slow on long histories (>500 commits/file) | Low | Low | Cap at 500; cache by `${collection}:${slug}@${HEAD-sha}` |
| Path traversal via crafted slug | Low | High | Strict slug regex + collection allowlist + path containment + no symlink follow |
| diff2html HTML injection (untrusted markdown across two SHAs) | Low | Medium | DOMPurify with pinned allowlist; sanitization regression test (XSS payload in T07) |
| Malformed historical frontmatter crashes endpoint | Medium | Medium | gray-matter wrapped; falls back to `{}` + warning; body still renders |
| Float panel collides with blog post TOC sidebar / share rail | Medium | Low | T03 enforces z-index + collision tests at responsive breakpoints |

## Out-of-scope follow-ups (parking lot → IMPROVEMENTS.md at epic close)

- Extend to `src/content/notes/` and other collections
- Branch-aware comparison (this post on `dev` vs `main`)
- MDX-aware snapshot rendering
- Word-level diff toggle (currently line-level)
- Author attribution in timeline (read `git log --format=%an`)
- Export "all versions" as a single markdown bundle for archive

## Cross-references

- Project conventions: [CLAUDE.md](../../../.claude/CLAUDE.md)
- Theming rules: [.claude/CLAUDE.THEMING.md](../../../.claude/CLAUDE.THEMING.md)
- Test strategy: [~/.claude/rules/test-strategy.md] (global)
- Modular architecture: [~/.claude/rules/modular-architecture.md] (global)
