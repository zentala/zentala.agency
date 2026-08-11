# E003 — Seria "agent-native harness" w blogu + prywatny podgląd pipeline'u (blog + LinkedIn): prezentacja do decyzji (v3)

## TLDR

Poprzednia wersja tego planu (v1) była zbudowana na złym zrozumieniu Twojego
feedbacku. v2 to naprawiła: seria to **pola na istniejącej kolekcji `blog`**
(`series`, `part`), nie osobna kolekcja; trasa `/series/[series]` na
poziomie top-level, dokładnie jak dziś działa `/category/[category]`; na
stronie artykułu — nawigacja prev/next w ramach serii zamiast rekomendacji
podobnych; i **prywatny podgląd całego pipeline'u dla Ciebie**, żebyś widział
wszystkie 8 artykułów jako realne, wyrenderowane strony, zanim cokolwiek
stanie się publiczne. **v3 (ta wersja) dokłada drugi rodzaj treści: każdy
artykuł ma teraz DWA posty** — długi na bloga (już zaplanowany) i krótki na
LinkedIn (nowość, wcześniej istniał tylko jako punkt w strategii
content-marketingowej, nigdy jako realny model danych) — plus jego własny,
prywatny podgląd, wyrenderowany jak realny post na LinkedInie, pod tym samym
mechanizmem `DEV`/`PUBLIC_PREVIEW`. **~23 pkt w 5 falach. Decyzja: klepnąć
zakres.**

## Co się zmieniło od poprzedniej wersji (v1)

Trzy poprawki wynikające wprost z Twojego voice feedbacku:

1. **Seria ≠ osobny byt.** Powiedziałeś: "seria nie powinna być czymś
   osobnym... może `/blog/series/...`, tak jak masz `/blog/kategoria/...`".
   v1 budowało osobną kolekcję `series` z osobną trasą `/series/[series]/
   [slug]` — dwa równoległe systemy obok `blog`. v2: `series`/`part` to
   dwa nowe, opcjonalne pola na **tej samej** kolekcji `blog`, a trasa
   `/series/[series]` grupuje wpisy dokładnie tak, jak dziś robi to
   `/category/[category]` — sprawdziłem kod, wzorzec już istnieje, tylko
   trzeba go powielić dla nowego pola.
2. **Nawigacja w serii, nie rekomendacje.** Chciałeś, żeby przy artykule
   było widać "następny artykuł w serii", nie generyczne "podobne
   artykuły". v2 dodaje blok prev/next w bocznym pasku strony artykułu
   (obok istniejącego "Share"), zamiast jakiegokolwiek silnika rekomendacji.
3. **To był mój błąd interpretacji, nie Twój.** Powiedziałeś wprost: "źle
   mnie zrozumiałeś" — nie chodziło o ukrywanie wszystkiego przed
   wszystkimi (to już robi `published: false`), tylko o to, że **Ty sam**
   chcesz widzieć cały pipeline — wszystkie 8 artykułów, nawet te na etapie
   pomysłu — jako realne strony, żeby ułożyć sobie w głowie, jak to wygląda
   z perspektywy czytelnika, zanim zdecydujesz co i kiedy publikować. To
   porównałeś do narzędzia typu feature-flag preview. Ta funkcja w ogóle
   nie istniała w v1 — jest nowym, głównym punktem tej wersji planu.

## Co się zmieniło w v3 — drugi rodzaj postu (LinkedIn)

Powiedziałeś: "Będzie zarówno krótki post na LinkedInie, jak i długi post
na bloga... Brakuje podglądu tych postów na LinkedInie... muszą być
widoczne tylko dla mnie, ale muszę mieć miejsce, żeby to się gdzieś
wyświetlało." To nie jest pomysł znikąd — root `CLAUDE.md` (sekcja "Content
marketing") już nazywa "Social snippets — LinkedIn/Reddit — short
architectural insight (3-5 tweetów) z linkiem do bloga" jako drugą połowę
dystrybucji każdego artykułu. Tylko że do tej pory nic w repo tego nie
modelowało — to była linijka w dokumencie strategii, nie realna treść.

**Decyzja modelu danych:** jedno nowe pole `linkedinPost` na tym samym
wpisie `blog`, NIE osobna kolekcja. Sprawdziłem: post na LinkedIn zawsze
promuje konkretny artykuł ("z linkiem do bloga") — to relacja 1:1, nie ma
tu przypadku "LinkedIn bez artykułu" ani "jeden artykuł, wiele postów w
czasie" (to drugie mogłoby się zdarzyć przy re-promocji, ale to nie ten
epik). Jedno pole = zero nowej infrastruktury, automatycznie dziedziczy
`series`/`part` po artykule, znika z każdego filtra dokładnie tak samo jak
artykuł.

**Gdzie jest podgląd:** nowa trasa `/linkedin-preview/[postSlug]`
(`src/pages/linkedin-preview/[postSlug].astro`) renderuje nowy, mały
komponent `LinkedInPostCard`
(`src/components/preview/LinkedInPostCard.astro`) — awatar, imię, treść
posta, plakietka z linkiem do artykułu, wyciszony rządek
like/comment/share dla wyglądu. Nie kopia pikselowa LinkedIna — na tyle,
żeby ocenić ton i długość, nie więcej (żeby nie przepalić czasu na UI
zamiast na pisanie). Ta trasa działa **tylko** pod tym samym bypassem co
reszta epiku (`DEV` albo `PUBLIC_PREVIEW=true`) — i, w odróżnieniu od
artykułów, NIGDY pod `published: true`, bo post na LinkedIn nie ma własnego
stanu "opublikowany na stronie" — publikujesz go ręcznie, bezpośrednio na
LinkedInie.

Dodatkowo: na `/series/[series]`, w trybie podglądu, przy wpisie z
ustawionym `linkedinPost` pojawia się mała plakietka "LinkedIn draft" z
linkiem do jego podglądu — żebyś widział oba typy treści dla danej części
serii w jednym miejscu.

## Kontekst — co jest dziś

`zentala.agency` to działający Astro-blog z 9 artykułami — własny
`PostCard.astro`, płaski indeks `/blog`, kategorie pod `/category/
[category]`, mechanizm `published: boolean` chowający szkice z listy i z
builda. Sprawdziłem kod: **w trybie `astro dev` ten filtr jest już dziś
pomijany** (`import.meta.env.DEV || published !== false`) — czyli lokalnie,
odpalając `npm run dev`, już dziś widzisz wszystkie szkice tak, jak
wyglądałyby opublikowane. To połowa tego, czego potrzebujesz — reszta
(widok "jak na produkcji, ale niepubliczny") nie istnieje jeszcze.

W prywatnej bazie `~/.claude/knowdlege/articles-ideas/` leży 8 gotowych
pomysłów na serię "agent-native harness" — żaden nie ma jeszcze napisanej
pełnej treści.

## Problem

Dwa problemy, nie jeden:

1. **Czytelnik** — 8 tematów jest gotowych, ale nie mają gdzie wylądować
   jako spójna seria (nawigacja część→część), nie jako 8 osobnych,
   niepowiązanych wpisów.
2. **Ty jako autor** — piszesz artykuł 2, nie widząc jak realnie wygląda
   artykuł 1 jako gotowa strona (nie markdown w edytorze, tylko
   wyrenderowana strona z hero/TOC/share-rail). Bez tego trudno ocenić ton,
   długość, czy diagram działa, czy seria "trzyma się kupy" jako całość.

## Rozwiązanie

**Część czytelnicza:** dwa nowe pola (`series`, `part`) na kolekcji `blog`;
trasa `/series/agent-native-harness` (top-level, wzorzec z `/category`);
`PostCard` dostaje jeden opcjonalny prop — plakietkę "Part 3/8"; strona
artykułu dostaje blok prev/next w pasku bocznym, gdy wpis ma `series`.

**Część "prywatny pipeline" (nowa):** rozszerzenie istniejącego już filtra
widoczności o drugi, niezależny bypass — zmienną środowiskową buildu
`PUBLIC_PREVIEW=true`. Ustawiona **tylko** na osobnym, nieopublikowanym
(nielinkowanym, poza sitemapą) deployu preview — produkcyjny build jej nie
widzi, więc zero ryzyka wycieku. Rekomendacja: jeśli hosting to Cloudflare
Pages (najbardziej prawdopodobne wg Twojego stack prefs, ale nie
potwierdzone w repo — brak `wrangler.toml`), to naturalnie każdy branch
poza produkcyjnym dostaje własny, nielinkowany URL z własnymi zmiennymi
środowiskowymi — zero dodatkowej infrastruktury. Jeśli hosting działa
inaczej, fallback który działa wszędzie: `PUBLIC_PREVIEW=true npm run build
&& npm run preview` lokalnie, na żądanie.

## Po zmianie

- Dopisanie kolejnej części serii = plik `.md` w `src/content/blog/` z
  `series`/`part`, `published: false` — pojawia się od razu na podglądzie
  (`astro dev` albo preview-deploy), znika z produkcji, dopóki go nie
  opublikujesz.
- Wchodzisz na URL preview-deploya (albo odpalasz lokalnie z flagą) → widzisz
  całą serię, wszystkie 8 części, dokładnie tak jak zobaczyłby ją czytelnik
  po opublikowaniu — hero, TOC, plakietka części, nawigacja prev/next.
- Publikacja pojedynczego artykułu (`published: true`) zostaje osobną,
  późniejszą decyzją per-artykuł — ten epik buduje rurę, nie naciska
  "publish" za Ciebie.

## Zyski / Wady / Ryzyka

- **Zyski:** mniej nowego kodu niż v1 (żadnej nowej kolekcji, żadnego
  nowego komponentu karty — jeden prop na istniejącej); prawdziwy podgląd
  "jak czytelnik", nie tylko markdown w edytorze; produkcja nietknięta,
  dopóki ktoś świadomie nie ustawi `PUBLIC_PREVIEW` w jej środowisku.
- **Wady:** druga zmienna środowiskowa do pilnowania (`PUBLIC_PREVIEW`) —
  błędnie ustawiona na produkcji pokazałaby wszystkie szkice publicznie;
  mitygacja: kryterium akceptacji w PLAN.md explicite testuje, że plain
  build bez tej zmiennej zachowuje się identycznie jak dziś.
- **Ryzyka:** (1) nieznany faktyczny hosting — plan zakłada Cloudflare
  Pages, ale nie jest to potwierdzone w repo; jeśli się myli, T03 ma
  wbudowany fallback działający wszędzie; (2) "hidden"/"unlisted" to nadal
  NIE prawdziwa kontrola dostępu — tylko brak linku i brak w sitemapie,
  jawny non-goal, tak jak w v1.

## Punkty i decyzja

| Fala | Zakres | Pkt |
|---|---|---|
| W1 | pola `series`/`part` na `blog` + 8 wpisów-zalążków (`published: false`) | 2 |
| W2 | bypass `PUBLIC_PREVIEW` w 3 istniejących filtrach + deploy-target/fallback | 5 |
| W3 | trasa `/series/[series]` + plakietka na `PostCard` + prev/next na stronie artykułu | 6 |
| W4 | **(v3)** pole `linkedinPost` + `LinkedInPostCard` + trasa `/linkedin-preview/[postSlug]` + plakietka na `/series` | 6 |
| W5 | link z `/blog` + testy (rozszerzone o LinkedIn) + triage ARCH.md | 4 |
| **Razem** | | **23** |

Dla porównania: v1 (odrzucone) = 21 pkt, bez funkcji prywatnego podglądu i
bez LinkedIna w ogóle. v2 = 16 pkt (taniej niż v1 mimo dodania preview,
dzięki reużyciu kolekcji/komponentu). v3 dokłada realną nową funkcję
(LinkedIn) — stąd wzrost do 23, nie cięcie kosztów.

Importance: **High** — bezpośrednio adresuje wąskie gardło strategii
(za słaby content), Twoją bieżącą potrzebę zobaczenia efektu pracy nad
serią zanim cokolwiek opublikujesz, ORAZ realizuje kanał social-snippet,
który do tej pory istniał tylko jako zdanie w dokumencie strategii.

**Potrzebna decyzja:**
1. Akceptacja zakresu v3 (fields-not-collection dla serii I dla LinkedIna,
   dwa niezależne mechanizmy podglądu pod tym samym bypassem).
2. Potwierdzenie hostingu `zentala.agency` — jeśli to Cloudflare Pages,
   T03 idzie prosto; jeśli coś innego, powiedz co, żeby T03 nie zgadywał.
3. Akceptacja, że `LinkedInPostCard` to stylizowana karta, nie kopia
   pikselowa LinkedIna — jeśli chcesz więcej wierności wizualnej, to
   zwiększa punkty W4.

Po akceptacji: T01 rusza od razu (schema + seed), T02/T03/T10 równolegle
zaraz potem (T10 to pole `linkedinPost`, nie zależy od trasy `/series`),
T04/T05/T11 równolegle, T06+T12 równolegle po T05/T10, T13 po T04+T10,
potem T07-T09.

---
Status: **DRAFT — czeka na Twoją decyzję.** Plan: [PLAN.md](PLAN.md) ·
taski: [ORCHESTRATOR.md](ORCHESTRATOR.md) · architektura: [ARCH.md](ARCH.md)
