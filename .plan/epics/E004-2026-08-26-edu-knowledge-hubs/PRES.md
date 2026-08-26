# E004 — Strony edukacyjne (`/edu`, `/edu/harness`): prezentacja do decyzji

## TLDR

Chcesz drugą powierzchnię contentową: indeks stron tematycznych plus jedną
stronę na temat (na start harness), w tym samym designie, z tego samego repo,
na Cloudflare Pages, podlinkowaną z `zentala.agency` pod pozycjonowanie.
Dostajesz dokładnie ten produkt — ale **odradzam kształt adresów, o który
prosisz**. Subdomeny nie przekazują sobie mocy linkowej w sposób, na który
liczysz (to ta sama domena, więc linki między nimi są wewnętrzne, nie
zapleczowe), a rozbijają autorytet tematyczny na kilka hostów, z których
każdy startuje od zera. Robimy `zentala.agency/edu` i
`zentala.agency/edu/harness`, a `edu.zentala.agency` zostaje **ładnym
adresem, który przekierowuje 301** na ścieżkę. Masz adres do wymawiania,
Google ma jeden korpus. Model treści, trasy i komponenty są **identyczne w
obu wariantach** — różni je wyłącznie config deploya, więc decyzja jest
odwracalna w jednej fali.
**~31 pkt w 5 falach; fale 1-4 (23 pkt) to produkt do wydania.
Decyzja: klepnąć kształt URL-i i przeniesienie 8 istniejących artykułów.**

---

## Rzecz, którą musisz wiedzieć, zanim cokolwiek zdecydujesz

**Treść o harnessie już jest w tym repo.** 8 wpisów w `src/content/blog/`
z polem `series: 'agent-native-harness'` i trasa `/series/[series]` —
zmergowane dzisiaj (E003, commit `75f6fc0`). Gdybyśmy zbudowali
`harness.edu.zentala.agency` obok tego, masz albo dwie wersje tych samych
tekstów (Google wybiera jedną, obie tracą), albo migrację, o której trzeba
zdecydować świadomie. Ten plan wybiera migrację i mówi to wprost.

---

## Pozycja 1 — kształt adresów (subdomeny vs ścieżki)

**Kontekst.** Dziś cała strona to jeden statyczny build Astro pod
`zentala.agency`, wystawiany przez GitHub Pages. Nie ma żadnej subdomeny.
Nie ma `sitemap.xml`, nie ma `robots.txt`, nie ma `<link rel="canonical">`,
nie ma tagów OpenGraph — sprawdziłem: `public/` zawiera cztery pliki SVG,
a `Layout.astro` wypuszcza tylko `<meta name="description">`.

**Problem.** Chcesz, żeby te strony robiły za zaplecze SEO i podbijały
`zentala.agency`. Zaplecze działa, gdy linki idą z **innej domeny**.
`harness.edu.zentala.agency` i `zentala.agency` to ta sama domena
rejestrowalna — link między nimi Google traktuje jak link wewnętrzny, mniej
więcej jak link ze stopki. Zysk bliski zeru. Koszt realny: cztery hosty, z
których każdy buduje własną historię i własne zaufanie od zera, i cztery
razy więcej rzeczy do utrzymania. To klasyczna pomyłka: pomysł wygląda jak
sieć witryn, a jest jedną witryną pociętą na kawałki.

**Rozwiązanie.** `zentala.agency/edu` (katalog) i `zentala.agency/edu/harness`
(strona tematyczna). Każdy nowy artykuł wzmacnia tę jedną domenę, która
faktycznie sprzedaje konsulting. `edu.zentala.agency` rejestrujemy i
ustawiamy na nim regułę przekierowania 301 na ścieżkę — dostajesz adres,
który da się powiedzieć na wizytówce, bez dzielenia korpusu.

**Po zmianie.** Wpisujesz `edu.zentala.agency/harness` → lądujesz na
`zentala.agency/edu/harness`. Wszystkie artykuły w jednej sitemapie, jedna
domena rośnie.

**Zyski:** cały autorytet w jednym miejscu; jeden build, jeden deploy;
adres wizytówkowy zachowany; decyzja odwracalna.
**Wady:** URL jest dłuższy; nie wygląda jak osobny serwis.
**Ryzyka:** żadnych technicznych. Ryzyko jest po drugiej stronie — po roku
pisania na czterech subdomenach cofnięcie tego kosztuje przenoszenie
kilkudziesięciu adresów.

**Punkty:** sama decyzja 0 (zmienia tylko config).
**Importance: High. Decyzja: zgadzasz się na ścieżki + 301 z subdomeny?**

---

## Pozycja 2 — przeniesienie 8 artykułów o harnessie z bloga do `/edu`

**Kontekst.** Osiem tekstów o harnessie siedzi dziś w kolekcji `blog` i
pokazuje się na `/blog` oraz `/series/agent-native-harness`.

**Problem.** Blog jest osią czasu (co myślę teraz), edu jest strukturą (jak
to działa). Ten sam tekst w obu miejscach to duplikat, a „zostawimy na blogu
i napiszemy nowe na edu" znaczy, że będziesz pisał dwa razy o tym samym.

**Rozwiązanie.** Jedna zasada: **artykuł żyje w dokładnie jednej kolekcji.**
Evergreen how-to idzie do `edu`. Wszystkie 8 przenosimy do `edu/harness/`,
stare adresy `/blog/<slug>` i `/series/agent-native-harness` dostają 301.

**Po zmianie.** `/edu/harness` to strona tematyczna ze wstępem i 8 częściami
po kolei. Blog zostaje dla opinii i nowinek.

**Zyski:** zero duplikatów; hub ma treść w dniu startu — nic nie trzeba
napisać, żeby wydać; migracja teraz kosztuje nic, bo ruch jest bliski zeru.
**Wady:** `/blog` chudnie o 8 wpisów.
**Ryzyka:** zepsute linki — łapie je istniejący test `all-links.spec.ts`
w CI plus nowy test na same przekierowania.

**Punkty: 5. Importance: High. Decyzja: przenosimy czy zaczynamy edu od
zera nowymi tekstami?**

---

## Pozycja 3 — monorepo i design jako paczka

**Kontekst.** Pytasz, czy wydzielić design do osobnej paczki albo monorepo,
a strony zrobić jako `apps/*`.

**Problem.** Paczka kupuje separację między **konsumentami**. Konsument jest
jeden — to repo. Workspaces dokładają drugi `package.json`, drugi graf
instalacji, krok linkowania i rozjazd wersji, w zamian za nic, czego ten
epic potrzebuje.

**Rozwiązanie.** Jedno repo, jeden build, jeden deploy. Granica przez
katalog: komponent używany i przez stronę główną, i przez edu →
`src/components/`; wyłącznie edu → `src/components/edu/`. Do tego zapisany
w ARCH.md **wyzwalacz wydzielenia**: paczkę robimy dopiero, gdy komponentów
potrzebuje DRUGIE REPO (nie druga trasa, nie druga subdomena).

**Po zmianie.** `npm run build` dalej buduje wszystko jedną komendą.

**Zyski:** zero nowej złożoności; nic nie blokuje wydzielenia później.
**Wady:** brak twardej bariery — ktoś może wstawić edu-owy komponent do
wspólnego katalogu.
**Ryzyka:** żadnych. Wydzielenie z jednego repo jest tanie; scalanie
przedwczesnej paczki z powrotem jest drogie.

Osobno: **`ui-internal` tu nie wchodzi.** Ten design system obsługuje
ekosystem `*.internal`; strona publiczna ma własną markę i zostaje na
swoich komponentach.

**Punkty: 0 (świadoma rezygnacja z zakresu). Importance: Medium.
Decyzja: akceptujesz „jedno repo, paczka dopiero na wyzwalacz"?**

---

## Pozycja 4 — fundament SEO, którego dziś nie ma

**Kontekst.** Strona nie ma sitemapy, `robots.txt`, canonicali ani OG.

**Problem.** Bez tego każda ambicja rankingowa jest zablokowana na parterze —
niezależnie od tego, czy zrobisz subdomeny, czy ścieżki. Brak OG oznacza też,
że każdy Twój link na LinkedInie wygląda jak goły adres bez obrazka.

**Rozwiązanie.** `@astrojs/sitemap`, `robots.txt`, canonical i tagi
OG/Twitter w `Layout.astro`, JSON-LD `Article` na artykułach edu.

**Po zmianie.** Google widzi komplet adresów, LinkedIn pokazuje kartę z
tytułem i obrazkiem.

**Zyski:** największy stosunek efektu do kosztu w całym planie; działa na
CAŁĄ stronę, nie tylko na edu.
**Wady:** brak. **Ryzyka:** brak.

**Punkty: 5. Importance: High. Decyzja: żadna — to robimy tak czy inaczej,
i moim zdaniem powinno pójść jako pierwsze.**

---

## Pozycja 5 — Cloudflare Pages zamiast GitHub Pages

**Kontekst.** Dziś deploy leci przez `withastro/action` na GitHub Pages.

**Problem.** Chcesz Cloudflare Pages dla edu. Trzymanie strony głównej na
GitHub Pages, a edu na Cloudflare, to dwa pipeline'y i dwa modele myślowe
dla jednej witryny — to jest realne ryzyko, nie migracja.

**Rozwiązanie.** Przenosimy **całość** na jeden projekt Cloudflare Pages
(domeny: apex, `www`, `edu`). Przekierowanie z subdomeny robi **reguła
Redirect Rule na poziomie strefy**, nie plik `_redirects` — `_redirects`
w Pages dopasowuje wyłącznie ścieżkę i nie widzi hosta.

**Po zmianie.** Jeden push, jeden build, cała witryna. Plus podglądy per
gałąź, których GitHub Pages nie daje.

**Zyski:** jeden pipeline; darmowe preview deploys; reguły przekierowań i
nagłówki na miejscu.
**Wady:** jednorazowa przesiadka DNS.
**Ryzyka:** przerwa w dostępności podczas przełączania — DNS przełączamy na
końcu, sprawdzam w prawdziwej przeglądarce, rollback to poprzedni host.

**Punkty: 5. Importance: Medium. Decyzja: przenosimy całość czy tylko edu?
Rekomendacja: całość.**

---

## Pozycja 6 (opcjonalna) — pipeline `edu.internal` → `/edu`

**Kontekst.** Twoja wiedza siedzi na wewnętrznych subdomenach `*.internal`
i to z niej mają powstawać materiały publiczne.

**Problem.** Bez ścieżki z KB do publikacji `/edu` będzie miało pięć stron,
nie pięćdziesiąt. Hosting nigdy nie był wąskim gardłem — jest nim to, ile
kosztuje przerobienie notatki w publiczny artykuł.

**Rozwiązanie.** Pole `source:` w artykule edu wskazujące dokument źródłowy
w KB, plus komenda publikująca, która robi szkic z notatki — z ręcznym
krokiem sanityzacji, bo nic wewnętrznego nie wychodzi automatycznie.

**Zyski:** to jedyna pozycja, która realnie zmienia ilość wydawanej treści.
**Wady:** 8 pkt i łatwo się rozrasta.
**Ryzyka:** wyciek treści wewnętrznej — dlatego krok ręczny jest nieusuwalny.

**Punkty: 8. Importance: Medium (strategicznie wysoka, ale nie blokuje
wydania). Decyzja: fala 5 czy osobny epic?**

---

## Co dzięki temu osiągasz — uczciwie

- **Realnie:** jedno miejsce, w którym Twoja wiedza wygląda jak produkt, a
  nie jak strumień wpisów; długi ogon fraz w wąskiej niszy (harness dla
  agentów, DevEx), gdzie konkurencja prawie nie pisze; dowód kompetencji do
  podlinkowania w ofercie; fundament SEO, który dziś nie istnieje.
- **Czego NIE osiągniesz:** subdomeny nie zrobią za zaplecze linkowe. Nic
  w tym planie nie zastąpi objętości i wąskiej specjalizacji — pozycję
  zbuduje pięćdziesiąt tekstów o rzeczach, których nikt inny nie opisuje,
  a nie architektura adresów. Architektura ma tylko nie przeszkadzać.

## Low-hanging fruit — od czego zacząć, gdybyś miał zrobić tylko część

| # | Rzecz | Pkt | Dlaczego to |
|---|---|---|---|
| 1 | sitemap + robots.txt | 1 | dziś nie istnieją; działa na całą stronę |
| 2 | canonical + OG/Twitter w `Layout.astro` | 2 | naprawia też wygląd linków na LinkedInie |
| 3 | `/edu` + `/edu/harness` na istniejących komponentach | 8 | treść już jest, zero nowego designu |
| 4 | Blok CTA na każdej stronie edu | 2 | bez tego edu nie konwertuje wcale |
| 5 | 301 ze starych adresów | 3 | tanie dziś, drogie za rok |

Pozycje 1, 2 i 4 to razem 5 punktów i dają wartość niezależnie od tego, czy
klepniesz resztę epiku.

## Czego świadomie NIE robimy

Monorepo. Paczki z designem. `ui-internal` na stronie publicznej.
Formularza kontaktowego na edu. Automatycznego importu z KB w fali 1.
