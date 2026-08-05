# HANDOFF — E001 Blog Version History (do agenta wdrażającego)

**Data:** 2026-05-12
**Od:** sesja planowania (CEO review + Eng review)
**Do:** kolejnej sesji, która rusza implementację
**Commit z planem:** `1e9d2f7` (`docs(E001): plan blog version history dev tool (CEO + Eng reviewed)`)
**Branch:** `main` (planning landed bezpośrednio bo to dokumentacja)

---

## TL;DR

Plan dla dev-only blog version panel (timeline + snapshot + diff) jest **gotowy do implementacji**. Przeszedł CEO review (8 decyzji) i Eng review (5 decyzji, 1 critical). Wszystkie blocking findings naprawione w planie. Zacznij od **Wave 1 → T01**.

```
.plan/epics/E001-2026-05-12-blog-version-history/
├── ARCH.md            ← architektura (czytaj sekcje 3, 5, 6, 9)
├── PLAN.md            ← what/why/scope/acceptance criteria
├── ORCHESTRATOR.md    ← 4 fale, dep graph, merge order
├── JOURNAL.md         ← 3 sesje (scaffold, CEO review, Eng review)
├── IMPROVEMENTS.md    ← 7 świadomie zaparkowanych follow-ups
└── tasks/             ← 7 task files, każdy z testami i done criteria
```

---

## Co robisz dokładnie (kolejność)

### Krok 0 — przeczytaj
1. `PLAN.md` (what/why)
2. `ARCH.md` (komponenty, error registry — sekcja na końcu)
3. `ORCHESTRATOR.md` (kolejność fal i zadań)
4. `JOURNAL.md` (zwłaszcza sesja **15:00 — Eng review** — tam są critical findings które muszą być respektowane)

### Krok 1 — przygotuj branch
```bash
git checkout -b feat/E001-blog-version-history main
# Albo wtree per task (patrz "Worktree strategy" niżej)
```

### Krok 2 — Wave 1 (równolegle: T01 + T02)
- `tasks/E001-T01-history-endpoint.md` — history API
- `tasks/E001-T02-version-endpoint.md` — version API + markdown render

Po obu tasach: `npm run build` musi przejść, unit + integration testy zielone.

### Krok 3 — Wave 2 (T03)
Panel shell + timeline w live mode.

### Krok 4 — Wave 3 (równolegle: T04 + T05)
Snapshot + diff modes.

### Krok 5 — Wave 4 (T06 + T07)
Badge, Ctrl+H, sanitization audit, **prod bundle audit (lokalny + CI)**, E2E suite.

---

## NIE-NEGOCJOWALNE rzeczy z planu (jeśli pominiesz — psujesz produkcję)

1. **React komponenty MUSZĄ żyć w `src/components/react-stuff/dev/blog-version-panel/`**
   Powód: `astro.config.mjs` linia `react({ include: ['src/components/react-stuff/**/*'] })` jest jedynym miejscem gdzie React JSX się kompiluje. Inny path = `.tsx` nie zostanie sparsowany.

2. **Endpointy w `src/pages/api/dev/[collection]/...`** — parametryzowane przez collection (nie hardcoded "blog").
   Collection allowlist: `['blog']` w validatorze. Trywialne rozszerzenie później.

3. **`@astrojs/markdown-remark` zamiast `markdown-it`** dla snapshot mode.
   Powód: byte-identical fidelity z prod renderem. Eng review uznał `markdown-it` za fundamentalny defekt.

4. **Rename tracking przez `--numstat` markery** w `parseGitLog`.
   Powód: `git log --follow` bez tego daje wrong-empty wyniki dla zrenamowanych plików.

5. **Bundle audit pinowany na minifier-stable strings** (NIE na `BlogVersionPanel`).
   Lista forbidden w `T07.md` sekcja "Prod bundle audit script".

6. **CI step w OBU workflowach** (`.github/workflows/deploy.yml` + `test.yml`), nie tylko jednym.

7. **Read-only git operations.** Żadnego `checkout`, `stash`, mutacji working tree. `simple-git` z parametryzowanymi komendami.

8. **`output: 'static'` w `astro.config.mjs` zostaje.** Nie zmieniaj na 'server' albo 'hybrid' — env-gates w endpointach polegają strukturalnie na tym, że static build nie wypluwa API routes do `dist/`.

---

## Critical findings które plan już naprawił (nie wracaj do starego stanu)

| Co | Stara wersja (zła) | Nowa wersja (właściwa) |
|----|---------------------|-------------------------|
| Lokacja React | `src/components/dev/...` | `src/components/react-stuff/dev/...` |
| Snapshot renderer | `markdown-it` | `@astrojs/markdown-remark` |
| URL endpointu history | `/api/dev/history/[slug].json` | `/api/dev/history/[collection]/[slug].json` |
| URL endpointu version | `/api/dev/version/[slug]/[sha].json` | `/api/dev/version/[collection]/[slug]/[sha].json` |
| Bundle audit strings | `BlogVersionPanel` | `'simple-git'`, `d2h-wrapper`, `d2h-ins`, ... |
| Test temp dir | `mktemp` (Unix-only) | `os.tmpdir() + crypto.randomUUID()` |
| CI audit | tylko local pre-push | local + `deploy.yml` + `test.yml` |

---

## Worktree strategy (opcjonalnie)

Per CLAUDE.md projekt używa worktreesów dla parallel agentów. Dla solo dev:
- Sekwencyjnie na jednej gałęzi `feat/E001-blog-version-history` — najprostsze.
- Z worktreesami: każdy task w osobnym worktree `feat/E001-T01-history-endpoint`, etc. Po skończonej fali merge do `feat/E001`.

ORCHESTRATOR ma już rozpisaną merge order.

---

## Acceptance gates per Wave (Done = wszystkie zielone)

### Wave 1
- `curl http://localhost:4321/api/dev/history/blog/<slug>.json` zwraca JSON w dev
- `curl http://localhost:4321/api/dev/version/blog/<slug>/<sha>.json` zwraca JSON
- Oba endpointy zwracają 404 w prod (`NODE_ENV=production` lub `npm run preview`)
- Unit + integration testy zielone (w tym **rename scenario** w T01)
- `npm run build` przechodzi (typecheck OK)

### Wave 2
- Panel widoczny bottom-right na każdym `/blog/*` w dev
- Timeline pokazuje historię z endpointu T01
- Panel NIE pojawia się w `npm run preview`
- Stan empty/loading/error widoczny w odpowiednich warunkach
- Brak kolizji wizualnej z TOC sidebar i share rail przy >=1024px

### Wave 3
- Snapshot mode: kliknięcie SHA podmienia body na historyczną zawartość (przez `@astrojs/markdown-remark`)
- **Fidelity regression test** zielony (HEAD snapshot == prod render byte-for-byte)
- Diff mode: dwa SHA → side-by-side diff, auto-order A=older B=newer, Swap działa
- URL hash deep links działają w obie strony

### Wave 4 (epic done)
- Wszystkie 12 acceptance criteria z PLAN.md
- `npm run build` przechodzi
- `npm run audit:prod` exit code 0
- `npm run lint` clean
- E2E suite Playwright zielony lokalnie
- CI workflow z audit step land w obu plikach yml

---

## Co masz do dyspozycji (project conventions)

- **Path alias `@/`** → `/src`
- **TypeScript strict** + TSDoc na public funkcjach
- **File-length cap 250 linii**, function 50 linii
- **`npm` (nie `pnpm`)** — projekt używa npm per `.claude/CLAUDE.md`
- **Conventional commits** ze scope `E001-TNN`. Bez AI attribution. Imperative mood.
- **Build CIRCUIT**: `npm run build` = `astro check && astro build`
- **`.husky/pre-commit`** prawdopodobnie istnieje (sprawdź) — lint + format

---

## Pytania które mogą się pojawić w trakcie

**Q: gdzie żyje `Layout.astro`?**
A: `src/layouts/Layout.astro` — sprawdź jak blog post używa frontmatter zanim wstawisz mount gate.

**Q: jak Astro 5 wywołuje `@astrojs/markdown-remark` programowo?**
A: `import { createMarkdownProcessor } from '@astrojs/markdown-remark'`. Z minimalną konfiguracją (`astro.config.mjs` nie ma plugins) defaulty wystarczają. Sprawdź docs jeśli API się zmieniło.

**Q: czy `simple-git` na Windows ma quirky path handling?**
A: Tak. Używaj forward slashes w path arguments; `simple-git` normalizuje. Jeśli widzisz dziwne błędy z escapingiem — wrap path przez `path.resolve()` przed przekazaniem do `git.show()`.

**Q: czy DOMPurify w Node (SSR endpoint) potrzebuje jsdom?**
A: TAK by działać server-side. ALE plan sanitizuje wyłącznie client-side w SnapshotView/DiffView (DOMPurify w browserze działa natywnie z `window`). Nie dodawaj `jsdom`.

**Q: czy Playwright config już istnieje?**
A: Sprawdź `playwright.config.ts` w root. `test.yml` CI go używa, więc tak.

---

## Co znajdziesz w IMPROVEMENTS.md (świadomie zaparkowane)

NIE rób tych rzeczy w E001:
- MDX snapshot fidelity przez `experimental_AstroContainer`
- Property-based fuzz tests dla `parseGitLog`
- Pre-cache last 5 visited versions
- Word-level diff toggle
- Author attribution w timeline
- Lazy-load diff2html
- Centralized mode-switch abort logic

Jeśli któreś z tych spraw ci się "samo nasunie" w trakcie — odnotuj w epic IMPROVEMENTS.md i jedź dalej. NIE rozszerzaj scope.

---

## Bezpieczeństwo (recap)

Plan adresuje:
- SHA regex + slug regex + collection allowlist
- Path traversal block (no symlink follow, contained path resolution)
- DOMPurify na każdym injected-HTML path
- `simple-git` parametryzowane (no shell interpolation)
- XSS regression test w T07 (synthetic payload `<img onerror>`)

Dev-only + localhost → no auth. Wszystkie pozostałe layery są defense-in-depth.

---

## Jak otworzyć następną sesję

W nowej sesji Claude Code:
1. `cd C:\code\zentala.agency`
2. Powiedz: `czytaj .plan/handoffs/HANDOFF-2026-05-12-E001-implementation.md i kontynuuj od Wave 1 → T01`
3. Albo: `przeczytaj plan E001 i ruszamy T01`

Plan jest self-contained w `.plan/epics/E001-2026-05-12-blog-version-history/`. Nie potrzebujesz nic poza tym katalogiem + repo state.

---

## Sukces wygląda tak

Po skończeniu epica:
- Otwierasz `npm run dev`, idziesz na dowolny blog post
- Widzisz floating panel z timelinem 5-10 commitów
- Klikasz SHA → page body podmienia się na historyczną wersję, **wygląda identycznie jak prod render** dla `.md`
- Wybierasz dwa SHA, klikasz diff → widzisz side-by-side z dark-theme paletą
- `Ctrl+H` → panel chowa się i wraca
- `npm run build` przechodzi, `npm run audit:prod` zwraca 0, CI w PR widzi audit step zielony
- `npm run preview` → blog wygląda tak jak na prod, ZERO śladu panelu w network tab czy DOM

Powodzenia.
