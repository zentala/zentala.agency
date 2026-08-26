# Backlog — zentala.agency

Bugs and small tasks found in passing. Entry format:
`- [ ] **<symptom>** — cause/trace, how found, (Importance, Points)`

## Open

- [ ] **Strona autora `/about/me` nie istnieje — każdy link z nazwiskiem prowadzi
  w 404** — `src/content/authors/zentala.yaml` miał `profileUrl: /about/me`,
  a w `src/pages/` są tylko `/about` i `/about/capabilities`. Doraźnie
  przekierowane na `/about` (task 008, reguła „martwy link zamieniasz na nowy").
  Do decyzji: zbudować prawdziwą stronę autora, czy trwale wyciąć linkowanie
  nazwiska (dziś i tak ukryte przez `SHOW_AUTHOR = false` w `src/config/blog.ts`).
  Znalezione 2026-08-26 przy przebudowie meta bloga. (Medium, 3)

- [ ] **Share-bar na stronie posta ma ręczne inline SVG zamiast `astro-icon`** —
  `src/pages/blog/[postSlug].astro:244-341` rysuje ikony X/LinkedIn/Facebook/link
  wklejonym `<svg>`, mimo że repo ma `astro-icon` + `@iconify-json/lucide` i `ph`
  skonfigurowane w `astro.config.mjs`. Dwie konwencje ikon w jednym pliku;
  stroke-width i rozmiary nie zgadzają się z resztą strony. Do ujednolicenia po
  przyjęciu line-iconów w blogu. Znalezione 2026-08-26. (Low, 2)

- [ ] **`PostCard` deklaruje nieużywany prop `imageUrl`** —
  `src/components/cards/PostCard.astro` przyjmuje `imageUrl?`, ale nigdzie go nie
  renderuje (okładki postów nigdy nie istniały, patrz wpis w `## Fixed`). Martwy
  interfejs sugeruje kolejnym agentom, że karta obsługuje obrazek. Usunąć prop
  albo faktycznie go użyć. Znalezione 2026-08-26. (Low, 1)

- [ ] **Line icons jako kierunek dla całej strony, nie tylko bloga** — Paweł,
  2026-08-26: „Trzeba zapisać sobie, generalnie, że implementujemy je mocno na
  tej stronie, żeby była infograficzna." Blog dostał `PostMeta` z ikonami lucide
  (data, kategoria, część serii) w tasku 008; reszta strony — usługi, portfolio,
  homepage, stopka — dalej jest samym tekstem. Do przejrzenia sekcja po sekcji.
  (Medium, 5)

- [ ] **E2E na CI: 50 testów failed, przebieg trwa 40 minut** — run
  [`32970968295`](https://github.com/zentala/zentala.agency/actions/runs/32970968295)
  (commit `4ead727`, 2026-08-26) skończył się `failure` po ~40 min, `50 failed`.
  Trzy skupiska, wszystkie wyglądają na realne, nie na infrastrukturę:
  (1) `expect(intro).toBeVisible()` — `tests/e2e/*:8`; (2) wysokość hero poza
  tolerancją ±2 px — `:36-37` i `:52`; (3) `scrollIndicator` niewidoczny — `:61`;
  do tego seria `Test timeout of 30000ms exceeded` na `locator.evaluate`.
  Osobno leci błąd konsoli podnoszony do CRITICAL:
  `Origin http://localhost:4321 is not allowed by Access-Control-Allow-Origin.
  Status code: 200` — trzeba ustalić, który zasób go zwraca (podejrzenie: coś
  z huba albo z zewnętrznego CDN-u ładowanego na stronie).
  Suita jest czerwona od dawna — dopóki jest, CI nie mówi nic o żadnej nowej
  zmianie. (Importance: High, Points: 8)
- [ ] **Workflow `E2E Tests` nie ma żadnego limitu czasu — może wisieć 6 godzin** —
  `.github/workflows/test.yml` nie deklaruje `timeout-minutes` na jobie `test`,
  więc obowiązuje domyślny limit GitHuba: 360 minut. Zaobserwowane 2026-08-26:
  przebieg `32970968295` (commit `f51bf57`) chodził ponad 25 minut przy typowym
  czasie kilku minut, i nie dało się odróżnić „wolno" od „zawiesiło się" — logi
  GitHub udostępnia dopiero po zakończeniu przebiegu. Ta sama rodzina co wpis
  niżej: brak sygnału wygląda tak samo jak zdrowie. Do zrobienia:
  `timeout-minutes: 20` na jobie (i osobno na kroku `Run E2E tests`), plus
  ustalenie, co ten przebieg tak długo robi. (Medium, 2)

- [ ] **Czerwony deploy nie daje żadnego sygnału — 21 dni produkcja stała w
  miejscu i nikt tego nie wiedział** — `Deploy to GitHub Pages` padał od
  2026-08-05 do 2026-08-26 (3 pushe), a jedynym sposobem, żeby to zobaczyć, było
  ręczne `gh run list`. Kanał sukcesu i kanał awarii są tu tym samym kanałem:
  ciszą. Do zrobienia: powiadomienie o czerwonym buildzie main (mail z GitHuba to
  minimum, wpis w `inbox.internal` byłoby lepsze) **oraz** sprawdzenie, że
  wdrożona wersja jest świeża — np. build stamp w HTML i cotygodniowe
  porównanie z `HEAD`. Znalezione 2026-08-26 przy naprawie widgetu. (High, 3)

- [x] **The chat widget is disabled site-wide until its host serves real JS** —
  `src/layouts/Layout.astro:96` was commented out. History: `hub.zentala.io`
  died with the domain (503 on every page load); migrated 2026-08-26 to
  `hub.zentala.agency`, which answered **200 but with
  `content-type: text/html`** — an SPA index.html fallback on every path. That
  is worse than the 503: the browser parses HTML as JavaScript and throws
  `SyntaxError` on every page, for every visitor.
  **Closed 2026-08-26.** Two separate bugs in the `cloudflare` repo, both
  fixed and deployed (`hub-worker-production` `2dc0d91c`): (1) the worker
  proxied `/widget.js` to the deleted `bot.zentala.io` host and laundered its
  `error code: 1016` into `200 application/javascript`; (2) the Cloudflare
  route pattern `hub.zentala.agency/widget.js` had no trailing `*`, so the
  `?site=` URL used here never reached the worker at all. `curl -I` now
  returns `application/javascript`, and a browser agent held a real Polish
  conversation in the widget. Embed uncommented. (Medium, 2)
- [ ] **The portfolio page has no images, and never did** — 5 of the 9
  entries in `src/pages/portfolio.astro` carry an `image:` field
  (`/images/portfolio/{rtls,smart-home,backstage,open-smart-desk,robot}.jpg`),
  `public/images/portfolio/` does not exist, and `PortfolioItem.astro:30` has
  the `<img>` commented out — which is the only reason the page does not show
  five broken images. Same pattern as the blog covers: the fields were written
  before the files. Either source the pictures and un-comment the tag, or drop
  the `image:` fields. Found 2026-08-26 while writing task 007. (Medium, 3)
- [ ] **`PostCard` declares an `imageUrl` prop it never renders** —
  `src/components/cards/PostCard.astro:8` takes it, the template ignores it,
  and two call sites still pass it (`src/pages/category/[category].astro:99`,
  `src/pages/series/[series].astro:113`). Harmless today, but it is exactly
  the prop someone will set expecting a cover to appear. Either render it or
  delete it from all three files. Found 2026-08-26 while removing the covers.
  (Low, 1)
- [ ] **Every `*.zentala.io` link on the site is dead** — the domain was
  dropped. Verified 2026-08-26, all six answer nothing (curl exit 6, no DNS):
  `desk.`, `ihome.`, `gpnf.`, `ideas.`, `wifi.`, `dev.`. They are linked as
  live portfolio/product links from `src/pages/portfolio.astro:25,48,62`,
  `src/pages/index.astro:404,413,505` ("Visit desk.zentala.io →" etc.),
  `src/components/Footer.astro:102,107,112,117` and
  `src/pages/case-studies/zntl-desk.astro:285`. Needs his call: do those apps
  have new addresses, or do the links come out? Not something an agent should
  guess. (High, 3)
- [x] **`npm run build` fails: 276 `astro check` errors, all in `solid-chat`** —
  **Naprawione 2026-08-26.** `solid-chat/` + `Chatbot.astro` (martwy kod: nic ich
  nie importowało, `solid-js` nie było w `package.json`) zarchiwizowane przez
  `git mv` do `archive/` — poza `tsconfig.json` `include: ["src"]`, więc `astro
  check` ich nie widzi; `archive/ARCHIVED.md` mówi, czym były i jak je wrócić.
  Dwa prawdziwe błędy poza solid-chat naprawione w kodzie: `Props` zamiast
  `LinkedInPostProps` w `LinkedInPostCard.astro` (przez to `Astro.props` było
  `any`) i `?? ''` na opcjonalnym `linkedinPost`. `npm run build` → 0 błędów,
  26 stron. **Ważniejsze niż sam błąd:** przez niego deploy na GitHub Pages był
  czerwony od 2026-08-05 — trzy pushe nie trafiły na produkcję, a strona
  serwowała build z 2026-06-17. Nikt nie dostał sygnału.
  Poprzedni opis:
  `src/components/solid-chat/**` and `src/components/preview/LinkedInPostCard.astro`
  cannot resolve `solid-js` / `solid-element` type declarations, so every JSX
  element in them is typed against React's DOM types and fails. **Zero errors
  come from any page.** Because `build` is `astro check && astro build`, the
  site has not built through `npm run build` for a while; `npx astro build`
  succeeds and produces correct output. Already filed as the solid-js task in
  `.plan/TASKS.md` — recording it here too because it silently blocks every
  other task's verification. Found 2026-08-26. (High, 5)
- [ ] **`package.json` declares `packageManager: yarn@4.4.1` while the repo
  uses npm** — `package-lock.json` is committed and CI runs `npm ci`. A
  contributor running `corepack`-enabled tooling gets yarn. Found 2026-08-26.
  (Low, 1)
- [ ] **`Footer.astro:68` describes the agency's work as "education"** — the
  offer page bans that framing (Paweł rejected "edukator" explicitly), but the
  site-wide footer says it on every page, including the offer page itself.
  Needs his call on how the agency describes itself, not an agent's. Found
  2026-08-26 by the forbidden-word grep on the new offer page. (Medium, 1)
- [ ] **`src/layouts/BlogPost.astro` is dead code** — no page imports it; the
  real render path is `src/pages/blog/[postSlug].astro`. A task written against
  the epic pointed at it and would have wired a CTA into a layout nothing
  renders. Delete it or revive it. Found 2026-08-26. (Low, 1)
- [ ] **`capabilities.astro` and `offer/backstage.astro` are inline
  `Astro.redirect()` pages** — unlike the `redirects:`-config entries, these DO
  appear in the sitemap and carry no OG tags, so Google indexes two redirect
  stubs. Same bug class as the `/offer` page deleted today; same fix (move them
  into `astro.config.mjs` `redirects`). Found 2026-08-26. (Medium, 2)
- [ ] **No real 301 is possible on GitHub Pages** — static hosting cannot
  issue redirect status codes, so `/offer` ships a `noindex` + canonical
  meta-refresh page (the best a static host can do). A true 301 needs a host
  with a redirect layer. Not a bug to fix now; a constraint to remember before
  any URL move. Found 2026-08-26. (Low, ?)

## Fixed

- [x] **6 blog cover images never existed** — 9 posts carried an `imageUrl`
  pointing at a file that is nowhere: not on disk, not in the git history of
  any of the five repos (cdn.zentala.io, cdn.zentala.agency, zentala.agency,
  DevStage.IO, zntl-portal), not in the R2 bucket dump
  (`cdn.zentala.agency/assets/files.json`, 2026-07-14, 364 files, only
  `avatar.jpg` under `images/`). Two of the nine pointed at `example.com`.
  Not a CDN-migration regression — the covers were simply never made. Fixed
  2026-08-26 on Pawel's call: the `imageUrl` frontmatter line is deleted from
  all 9 posts, so `og:image` falls back to `/og-default.png` instead of
  advertising a 404 to every crawler and every social-media unfurl. The
  optional schema field and the `og:image` plumbing stay, so a real cover
  works the day one is drawn. (Medium, 1)
- [x] **`astro build` (and `npm run build`) shares `node_modules/.vite` with the
  `astro dev` PM3 service, so every build poisons the running dev server's
  pre-bundled `react/jsx-dev-runtime`** — root cause of `TypeError: jsxDEV is
  not a function` crashing `BlogVersionPanel` (and any other React island) on
  every blog post page. Vite's dep optimizer bakes
  `process.env.NODE_ENV === 'production'` into the esbuild `define` at
  pre-bundle time using the command that ran, not `pm3.yaml`'s
  `env: { NODE_ENV: development }`; the cache dir has no `command`/`mode` in
  its invalidation hash, so a `build` run's output silently gets reused by the
  already-running `dev` server (which loaded it into memory at startup and
  won't re-scan without a restart). Reproduced 2026-08-26: cleared
  `node_modules/.vite/deps`, ran `npx astro build`, `grep`'d the regenerated
  `react_jsx-dev-runtime.js` — `if (true) { …production.js… }`, i.e. `jsxDEV`
  undefined. Fixed 2026-08-26 in `astro.config.mjs`: `vite.cacheDir` now
  splits on `process.argv.includes('build')` —
  `node_modules/.vite-build` for builds, `node_modules/.vite-dev` for the dev
  server, so neither run can poison the other. The proposed workaround
  ("restart the dev service after every build") was rejected: the repo's own
  git rule runs `npm run build` before every commit, so the workaround would
  never stop being needed. Verified: after deleting all three cache dirs and
  running `npx astro build`, only `.vite-build` carries the production
  `react/jsx-dev-runtime` (`if (true) … production()`); `.vite-dev` was
  re-optimized separately by the dev server. (High, 3)
- [x] **Series card ranked by highest part number, not newest date** —
  `buildFeed` took the series' date from the last part in `part` order. Parts
  are written out of order (part 8 is dated 2026-08-07, parts 3-7 are dated
  2026-08-08), so the card sat a day lower in the feed than it should and the
  freshness window was measured from the wrong date — breaking the one promise
  the card exists for. Fixed 2026-08-26: ranks by newest date, ties break to
  the higher part. Regression test confirmed to FAIL on the reverted fix.
  (Medium, 2)
- [x] **Blog feed is unsorted** — `src/pages/blog/index.astro` rendered
  `getCollection('blog')` in filesystem order. Fixed 2026-08-26: sorts by date
  descending. This is a stopgap; E005/T2's `buildFeed` replaces it. (High, 2)
- [x] **`/blog/index.old` is a live indexable route** —
  `src/pages/blog/index.old.astro` was published as a stale second copy of the
  feed. Fixed 2026-08-26: file deleted, path added to `astro.config.mjs`
  `redirects` → `/blog`. (Medium, 1)
- [x] **`/offer` is a meta-refresh, not a 301** — `src/pages/offer.astro`
  called `Astro.redirect()` in a static build. Fixed 2026-08-26: page deleted,
  replaced by an `astro.config.mjs` `redirects` entry, which emits
  `noindex` + an absolute canonical. Still not a 301 — see the open entry
  above for why that is not achievable here. (Medium, 1)
- [x] **Series page and blog feed passed props `PostCard` does not declare** —
  both passed `authorName`, `authorAvatar`, `authorRole`; `PostProps` declares
  none of them (the card resolves the author itself from `authorVersion`), so
  they were silently dropped. Fixed 2026-08-26: both pass
  `authorVersion={post.data.author}`; the dead `authors` lookups are gone.
  (Low, 1)
- [x] **No `site` in `astro.config.mjs`** — blocked `@astrojs/sitemap` and any
  absolute canonical URL. Fixed 2026-08-26: `site: 'https://zentala.agency'`.
  (High, 1)

## See also

- [ADR-001 — a series is one feed entry](ADR/001-series-as-a-feed-group.md)
  — the decision behind the grouped card, and what it knowingly gets wrong.
- [E005 — series as a feed group](epics/E005-2026-08-26-series-as-feed-group/PLAN.md)
  — the epic these were found under.
- [E004 — edu knowledge hubs](epics/E004-2026-08-26-edu-knowledge-hubs/PLAN.md)
  — deferred.

- [ ] **Portfolio linkuje do trzech martwych domen `*.zentala.io`** — `src/pages/portfolio.astro:25,48,62` (`ihome.zentala.io`, `desk.zentala.io`, `gpnf.zentala.io`). Strefa `zentala.io` zniknęła z Cloudflare 2026-07-10, więc to martwe linki na żywej publicznej stronie. Znalezione podczas planowania migracji `zentala.io` → `zentala.agency` (repo `cloudflare`, epik E011, 2026-08-26). Decyzja do podjęcia per link: usunąć pozycję z portfolio albo odtworzyć podstronę pod `.agency`. (Importance: High, Points: 2)
- [ ] **Sześć artykułów bloga ma `imageUrl` do okładek, których nigdy nie zrobiono.** Nie chodzi o migrację CDN — pliki nie istnieją ani na dysku, ani w historii gita, ani w zrzucie bucketu R2 (`cloudflare/cdn.zentala.agency/assets/files.json`, 2026-07-14: pod `images/` tylko `avatar.jpg`). Brakuje: `documentation-as-substrate.jpg`, `continuous-onboarding.jpg`, `understanding-developer-experience.jpg`, `developer-portals-ai-bridge.jpg`, `kickstart-backstage-implementation.jpg`, `future-of-workflow-automation.jpg`. Do decyzji: zrobić okładki i wgrać na `cdn.zentala.agency/images/`, albo usunąć `imageUrl` z frontmatteru i zostawić posty bez okładki. Ten sam zestaw jest linkowany także z `DevStage.IO` (tam pod `zentala.agency/images/...`). Znalezione podczas śledztwa E011 w repo `cloudflare`. (Medium, 3)

- [ ] **Ukryte artykuły odblokowywane tokenem dla znajomych** — znajomy dostaje
  link z tokenem, token ląduje w `localStorage`, dzięki temu widzi wpisy
  oznaczone jako ukryte i może je oceniać. Twardy warunek, który przesądza o
  architekturze: **ukryty artykuł nie może być w bundlu ani w żadnym
  zbudowanym pliku** — nie wolno go pobrać bez tokena. Statyczny build na
  GitHub Pages tego nie zrobi (wszystko, co Astro zbuduje, jest publiczne pod
  jakimś URL-em, `noindex` niczego nie chroni), więc treść musi mieszkać poza
  buildem i być dociągana po weryfikacji tokena — osobny endpoint, który
  sprawdza token po stronie serwera i dopiero wtedy oddaje treść. Na liście
  wpis ma być widoczny jako „ukryty", żeby znajomy wiedział, że coś tam jest.
  Do rozstrzygnięcia w planie: gdzie stoi ten endpoint (Cloudflare Worker przy
  `hub.zentala.agency`?), jak tokeny są wydawane i odwoływane, co widzi ktoś
  bez tokena, i czy ocenianie zapisuje się gdziekolwiek poza `localStorage`.
  Zlecone przez Pawła 2026-08-26 wprost jako wpis do backlogu, nie do
  zrobienia teraz. (Importance: Medium, Points: 8)
- [ ] **Kolejne artykuły serii Multi-Interface** — kierunek podyktowany przez
  Pawła 2026-08-26: (a) **Markdown i MDX jako podstawa przekazywania wiedzy**
  w multi-interfejsie; (b) **„Agent Native"** — architektura pluginu
  wystawionego jednocześnie przez **A2A, MCP i API**. Seria niesie „dlaczego",
  Harness niesie „jak". (Medium, 8)
- [ ] **Zaciągnąć materiał z warsztatu `zntl-portal` do serii tutaj** —
  `~/code/ws/zntl-portal/src/content/ideas/` ma gotowe szkice dokładnie na te
  tematy, m.in. `multi-interface-jedna-tresc-dla-czlowieka-i-agenta.mdx`,
  `polimorficzne-linki-graf-wiedzy-agent-native.mdx`,
  `agent-native-jak-firma-przetwarza-dane-w-przyszlosci.mdx`,
  `progressive-disclosure-komunikacja-bez-przeciazenia.mdx`,
  `autogenerowanie-tresci-dla-agenta.mdx`, `point-dont-describe-deixis-mcp.md`
  oraz katalog `agentic-harness/` (`cdlc.md`, `mcp-gw.md`,
  `distributed-systems.md`). Przejrzeć, wybrać, przenieść — **kopiując pliki,
  nie streszczając ich**. (Medium, 5)
- [ ] **Sześć przeniesionych szkiców ma polską treść pod angielskim nagłówkiem** —
  `markdown-and-mdx-as-the-substrate.md`,
  `agent-native-how-a-company-processes-data.md`,
  `point-dont-describe-deixis.md`, `polymorphic-links-knowledge-graph.md`
  (nowe, seria `multi-interface`) oraz uzupełnione zaślepki
  `autogenerowanie-tresci-dla-agenta.md` i
  `progressive-disclosure-komunikacja-bez-przeciazenia.md` (seria
  `agent-native-harness`). Treść przeniesiona **dosłownie z warsztatu**
  (`zntl-portal/src/content/ideas/`), więc jest po polsku, a strona jest
  angielska. Wszystkie mają `published: false`, więc na produkcję nic nie
  wyciekło. Przed publikacją: przetłumaczyć i wyciąć draftowe nagłówki
  („## Why", „## Teza"), które są językiem szkicu, nie artykułu. (Medium, 8)
