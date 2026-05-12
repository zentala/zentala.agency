# HANDOFF — E001 Blog Version History (zamknięte)

**Data:** 2026-05-12
**Status:** ✅ DONE — wszystkie 4 fale wdrożone + iteracje feedbacku
**Branch:** `main` (15 commitów ponad origin/main, do push'a ręcznie)

## Co działa

Dev-only floating panel w prawym dolnym rogu na każdej stronie `/blog/*`.
Pokazuje pełną historię commitów dla danego posta z git, pozwala
oglądać snapshoty wersji historycznych i porównywać dwie wersje obok siebie.

- Mountuje się tylko w `astro dev` (nie w preview/build)
- Timeline: HEAD-row z badge `current`, klik = restore live; inne SHA = snapshot mode
- Snapshot mode podmienia: `#post-content` (body), `h1` (tytuł), excerpt, datę
- Diff mode: `Compare…` → wybór dwóch SHA → fullscreen `<dialog>` z side-by-side diff
- DiffDialog: dark theme + dark scrollbars, GH icon przy „Open on GitHub", czerwony Close
- GitHub icon per row → `<repo>/commit/<sha>` (tooltip)
- Ctrl+H toggle, URL hash sync (`#v=<sha>` / `#diff=<a>..<b>`)
- Nawigacja klawiaturą ↑/↓ po timeline, Enter/Space wybór

## Architektura

```
[Vite dev plugin]      [React panel — dev-only]
src/lib/dev/           src/components/react-stuff/dev/
└── git-history/       └── blog-version-panel/
    ├── vitePlugin.ts      ├── BlogVersionPanel.tsx  (top state)
    ├── getHistory.ts      ├── PanelChrome.tsx
    ├── getVersion.ts      ├── VersionTimeline.tsx
    ├── parseGitLog.ts     ├── SnapshotView.tsx
    ├── renderMarkdown.ts  ├── DiffDialog.tsx
    ├── heuristics.ts      ├── sanitize.ts
    ├── resolveSlug.ts     ├── summarizeHistory.ts
    ├── validators.ts      ├── formatRelative.ts
    └── types.ts           └── BlogVersionPanelMount.astro
```

**Klucz architektury:** `vitePlugin.ts` z `configureServer + apply: 'serve'`
— middleware na `/api/dev/history/*` i `/api/dev/version/*` istnieje TYLKO
w dev serverze. Prod build nie ma żadnych API routes ani server endpoints
— `output: 'static'` zachowane, deploy na GH Pages bez adaptera.

## Decyzje produktowe (po iteracjach feedbacku)

| Pierwotny plan | Wynik po feedbacku |
|---|---|
| 3 mode pills: Live / Snapshot / Diff | Brak pills. HEAD-row = live, klik inny = snapshot, button `Compare…` w toolbarze |
| Diff inline w 360px panelu | Diff w fullscreen `<dialog>` z dark scrollbars |
| Major = `≥30% LUB ≥50 linii` | Major = `≥30%` (blog-tuned, drop absolute clause) |
| Tylko dot indicator | Dot + legend (`● major ○ minor`) + tooltip z progiem |
| Snapshot tylko body | Snapshot body + title + excerpt + date z frontmattera |
| Brak linków GH | GH icon per row + GH button w DiffDialog |

## Testy (zielone)

- **57/57 unit** (vitest) — parseGitLog rename, getHistory cache+remote,
  getVersion frontmatter rescue, renderMarkdown, DOMPurify XSS, heuristics,
  summarizeHistory, formatRelative
- **10/10 E2E** (playwright.dev.config.ts) — mount, timeline, Ctrl+H, snapshot
  swap, HEAD restore, diff dialog open, endpoints history/version, 400 errors

## CI gates

- `.github/workflows/test.yml` — unit + audit:prod + E2E (link suite)
- `.github/workflows/deploy.yml` — audit:prod przed deploy
- `audit:prod` (`scripts/audit-prod-bundle.mjs`) — reachability check:
  greppe TYLKO pliki linkowane z prod HTML, ignoruje dead chunks w `_astro/`
- 34/38 plików reachable clean (4 dead chunks dev-only, niegroźne)

## Commity (15 ponad origin/main)

```
66374ba feat(E001): swap title + excerpt + date from frontmatter in snapshot
2d88b15 fix(E001): fullscreen diff dialog, dark scrollbars, red close + GH icon
8d5b89a feat(E001): recalibrate major threshold, date tooltip, GH icon, keyboard
f5abbb8 fix(E001): dark-theme diff dialog + legend + scrollbar styling
deef521 refactor(E001): drop Live mode, move diff to full-screen dialog, GH link
c5adadc fix(E001): replace Astro API routes with Vite dev-server middleware
ec333b8 feat(E001-T07): Ctrl+H toggle, URL hash sync, prod bundle audit + CI
81d27ff feat(E001-T06): major-change badge + revisions summary
2ba616f feat(E001-T05): diff mode (jsdiff + diff2html + DOMPurify)
f4464c1 feat(E001-T04): snapshot mode with DOMPurify-sanitized body swap
fdeb83b feat(E001-T03): blog version panel shell + timeline (live mode)
2d43e48 feat(E001-T02): version endpoint with markdown-remark renderer
b1c50f6 feat(E001-T01): history endpoint with git-log parser + rename tracking
```

## Otwarte improvements (parked)

- Snapshot author/category/TOC swap (obecnie current values stay)
- Reading-time recompute na snapshot body
- Disable GH icon dla un-pushed commits (`git merge-base --is-ancestor`)
- Frontmatter changes jako osobna sekcja w diff (vs zlanie z body)
- Pre-cache adjacent SHAs (smoother arrow-nav)
- Hash restore reload E2E test (zapis tested, restore nie)
