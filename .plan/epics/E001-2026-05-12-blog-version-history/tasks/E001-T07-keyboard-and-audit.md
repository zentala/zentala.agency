---
id: E001-T07
epic: E001
status: todo
created: 2026-05-12
revised: 2026-05-12 (CEO review — CI bundle audit step is mandatory, not optional)
branch: feat/E001-T07-polish-and-audit
---

# E001-T07 — Keyboard shortcut, sanitization audit, prod bundle audit

## Goal

Final polish task. Add the keyboard shortcut, prove DOMPurify is correctly applied, prove the dev panel does not leak into production, ship the E2E suite.

## Files to create / edit

- Edit `src/components/react-stuff/dev/blog-version-panel/BlogVersionPanel.tsx` — `Ctrl+H` global listener
- Edit `src/components/react-stuff/dev/blog-version-panel/DiffView.tsx` — verify DOMPurify; pin allowed tags/attrs
- Create `tests/security/dompurify-diff.test.ts`
- Create `scripts/audit-prod-bundle.mjs` — fails CI if dev modules leak into `dist/`
- Edit `package.json` — add `audit:prod` script
- Edit `.husky/pre-push` (if present) — call `npm run audit:prod`
- Edit `.github/workflows/deploy.yml` — add `audit:prod` step in `test` job after `Build application` and before `Run E2E link validation tests`. Exit-non-zero blocks deploy.
- Edit `.github/workflows/test.yml` — same insertion. PR signal arrives before merge.
- Create `tests/e2e/blog-version-panel.spec.ts` — full Playwright suite

## Implementation steps

1. Global keyboard shortcut:
   - `useEffect` in `BlogVersionPanel` adding a `keydown` listener on `window`
   - `Ctrl+H` (or `Cmd+H` on macOS) toggles collapsed state
   - `preventDefault` to override browser default (history)
   - Document the shortcut in panel chrome ("Ctrl+H to toggle")
2. DOMPurify hardening in DiffView:
   - Configure with explicit allowlist of tags used by diff2html: `div, span, table, tbody, tr, td, code, pre, label, input` (input only for line-number anchors)
   - Strip `style` attribute; we control style via SCSS
   - Strip `on*` handlers (default)
3. Sanitization test:
   - Build a synthetic diff where one of the "added" lines contains `<img src=x onerror=alert(1)>`. Run through `buildDiffHtml` + DOMPurify, assert the resulting HTML contains no `onerror` attribute and no inline script.
4. Prod bundle audit script (`scripts/audit-prod-bundle.mjs`):
   - Walk `dist/` recursively
   - For each `.js` / `.css` / `.html`, search for **minifier-stable forbidden strings**:
     - `'simple-git'` — package name string literal preserved in any CJS/ESM import call
     - `'diff2html'` — package name string literal
     - `d2h-wrapper`, `d2h-ins`, `d2h-del`, `d2h-files-diff` — diff2html CSS class names (survive minification because they're string literals matched against DOM)
     - `dev/blog-version-panel` — directory path (would only appear via import side-effects)
     - `/api/dev/` — URL path (would only appear if SSR endpoint accidentally compiled into client)
     - `@astrojs/markdown-remark` package name (Astro's own internal use is statically resolved at build time, so this exact string in client bundles is suspicious)
   - Do **NOT** grep for component identifiers like `BlogVersionPanel` — minifier renames them to single chars, false negative
   - Exit code 1 with a list of offending files + matching lines if any match
   - Exit code 0 if clean
   - Print "audited N files, K MB, 0 forbidden strings" on success
   - Note: in `output: 'static'` mode (current config) API routes never reach `dist/` anyway. Audit catches mount-side regressions (Layout gate or React tree-shake failing) and future mode switches to `'server'`/`'hybrid'`.
5. Wire into `package.json` as `"audit:prod": "node scripts/audit-prod-bundle.mjs"` and add to pre-push (or document as manual run before publish).
6. **GitHub Actions CI step** — both workflows. In `.github/workflows/deploy.yml` job `test` and in `.github/workflows/test.yml` job `test`, insert this step right after `Build application` and before any `Run E2E …` step:
   ```yaml
   - name: Verify dev modules absent from prod bundle
     run: npm run audit:prod
   ```
   Defense-in-depth — if Layout mount gate, React include glob, or static-output behavior ever regresses, this CI step blocks the bad build.
6. E2E test suite covers full acceptance criteria from PLAN.md.

## Tests

**Unit (security):**

```
DOMPurify on diff HTML
  ✓ strips onerror attribute from img tags
  ✓ strips <script> tags
  ✓ strips style attributes
  ✓ preserves diff2html structural classes (.d2h-ins, .d2h-del, .d2h-wrapper)
```

**Bundle audit:**
- After `npm run build`, run `npm run audit:prod` → exits 0
- Sanity check: temporarily import `simple-git` from a prod-reachable file → audit should exit 1 → revert

**E2E (Playwright) — final acceptance suite:**

```
Blog Version Panel — E2E
  ✓ panel mounts on /blog/autonomous-agents-on-backstage in dev
  ✓ panel does NOT mount on the same URL in `npm run preview`
  ✓ timeline shows >= 1 entry
  ✓ snapshot mode: clicking a SHA replaces article body
  ✓ diff mode: selecting two SHAs shows diff with both .d2h-ins and .d2h-del
  ✓ URL hash #v=<sha> restores snapshot mode on reload
  ✓ URL hash #diff=<a>..<b> restores diff mode on reload
  ✓ Ctrl+H toggles panel collapsed state
  ✓ collapsed state persists across reload (localStorage)
```

## Done criteria

- All 10 acceptance-criteria boxes from PLAN.md tick
- `npm run build` succeeds
- `npm run audit:prod` exits 0
- `npm run lint` clean
- E2E suite green locally
- `npm run preview` shows blog posts without panel and without any `/api/dev/*` requests in network tab

## Commits

- `feat(E001-T07): add Ctrl+H global toggle shortcut`
- `chore(E001-T07): harden DOMPurify config and add sanitization tests`
- `chore(E001-T07): add prod-bundle audit script and wire into pre-push`
- `test(E001-T07): full Playwright suite for blog version panel`
