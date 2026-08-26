# E005 — Seria jako jeden wpis na blogu: prezentacja do decyzji

## TLDR

Seria przestaje być ośmioma luźnymi kartami w feedzie i staje się **jednym
boksem**: tytuł serii na górze, pod nim zwarta lista części (link plus
metadane w tej samej linii), a karta wędruje na górę bloga za każdym razem,
gdy dochodzi nowa część — najnowsza dostaje znacznik świeżości. Dookoła tego
trzy rzeczy, których strona potrzebuje niezależnie od serii: fundament SEO
(dziś nie istnieje), blok CTA na końcu każdego wpisu kierujący na usługi, i
prawdziwa warstwa przekierowań. **36 pkt w 4 falach. Dwie decyzje do
podjęcia: cel CTA i to, jak zwija się długa seria w karcie.**

---

## Odpowiedź na Twoje pytanie: po co to CTA i co ma robić

Tak, na usługi. Konkretnie: **czytelnik, który właśnie przeczytał artykuł o
harnessie, jest w najlepszym momencie, w jakim będzie** — wie, że masz na to
metodę, i wie, że sam tego nie poukłada. Bez bloku na końcu wpis kończy się
niczym i człowiek wraca na LinkedIna.

Blok robi trzy rzeczy, w tej kolejności:

1. **Nazywa usługę** — „harness engineering", czyli dokładnie to, o czym był
   artykuł. Nie „skontaktuj się", nie „zobacz ofertę". Nazwa usługi musi być
   tą samą frazą, o której właśnie czytał.
2. **Daje jedno główne działanie** — rozmowa przez `cal.com/zentala`, bo to
   już masz podpięte w `CTASection.astro` na stronie głównej i działa.
3. **Daje drugie, tańsze wyjście** — link do strony usługi dla kogoś, kto nie
   jest gotowy na rozmowę. I tu jest problem, patrz decyzja niżej.

Copy różni się per seria (pole `ctaVariant` w opisie serii), więc seria o
harnessie kieruje na harness engineering, a przyszła seria o czym innym —
gdzie indziej. Komponent jest jeden, `CTA.astro`, który już istnieje i już
przyjmuje `headline`, `subhead`, `buttons`, `footerItems`. Nie budujemy
niczego nowego, tylko cienką nakładkę z copy.

---

## Decyzja 1 — ROZSTRZYGNIĘTA 2026-08-26: opcja A

Paweł: budujemy stronę usługi. Nazwa: **Harness Engineering Architecture**.
Nie kurs, nie szkolenie — **kontrakt**: firma zatrudnia go na jakiś czas jako
kontraktora, on przychodzi do biura, rozmawia z deweloperami, pomaga zrobić
architekturę, robi review ich rozwiązań, prowadzi spotkania, wspólnie
projektują i ulepszają, pokazuje jak rozwiązywać problemy i automatyzować
fragmenty własnej pracy. Do tego krótkie płatne konsultacje — godzina albo 15
minut, cena stała albo godzinowa, **bez podanej kwoty na stronie**.

Ramka wejścia: „Porozmawiajmy o Twoim projekcie" + przycisk na
`cal.com/zentala`. Nie goły „kontakt".

**Słowo zakazane: „edukator".** Odrzucone wprost. Zostają: architekt z
zewnątrz, architekt-konsultant, *Harness Architecture Evangelist*.

Pełny brief dla wykonawcy siedzi w [HANDOFF.md](./HANDOFF.md) → T9. Zostawione
świadomie nierozstrzygnięte: czy krótkie konsultacje to osobny produkt, czy
sposób wejścia w kontrakt — copy ma znieść obie lektury.

Poniżej oryginalna analiza, dla zapisu.

### (archiwum) Decyzja 1 — gdzie właściwie ma prowadzić „zobacz usługę"

**Kontekst.** Sprawdziłem: `/offer.astro` to trzy linijki robiące
`Astro.redirect('/about/capabilities')`. Strony usługi „harness engineering"
nie ma. Jedyna istniejąca strona usługowa to
`/about/capabilities/backstage.astro`.

**Problem.** CTA po artykule o harnessie, które prowadzi na ogólną stronę
„capabilities", konwertuje słabo — czytelnik przechodzi z bardzo konkretnego
tematu na listę wszystkiego, co robisz, i się rozmywa.

**Opcje:**

| | Co robimy | Pkt | Kiedy to wybrać |
|---|---|---|---|
| **A (rekomendacja)** | Nowa strona `/offer/harness-engineering` — czym to jest, dla kogo, jak wygląda współpraca, przycisk do kalendarza | 5 | jeśli harness engineering to usługa, którą naprawdę chcesz sprzedawać |
| **B** | CTA celuje w `cal.com` + `/about/capabilities`, strona usługi później | 0 | jeśli chcesz najpierw zobaczyć, czy seria w ogóle przyciąga ruch |

Rekomenduję **A**, ale z zastrzeżeniem: **nie napiszę tego copy za Ciebie z
powietrza.** Potrzebuję od Ciebie trzech zdań — co konkretnie sprzedajesz pod
tą nazwą, komu, i jak wygląda pierwszy tydzień współpracy. Resztę strony
złożę na istniejącym szablonie. Jeśli nie chcesz teraz tego rozstrzygać,
bierzemy B, a T9 wypada z zakresu — reszta epiku jest od tego niezależna.

---

## Decyzja 2 — jak zachowuje się karta serii przy ośmiu częściach

**Kontekst.** Feed to CSS grid (`cards-grid`), a `PostCard` ma na sztywno
`aspect-ratio: 1 / 1` — wszystkie karty są kwadratowe. Osiem linków w
kwadracie się nie mieści.

**Opcje:**

| | Jak wygląda | Ryzyko |
|---|---|---|
| **A (rekomendacja)** | Karta serii łamie proporcję 1:1, rośnie do swojej treści; przy >6 częściach pokazuje 5 pierwszych i „Zobacz wszystkie (8) →" | jeden wysoki kafelek w rzędzie robi dziurę w siatce — do zobaczenia w przeglądarce, nie do rozstrzygnięcia w planie |
| **B** | Karta serii zajmuje dwie kolumny na desktopie, zawsze pokazuje wszystkie części | mocno zmienia rytm strony głównej bloga; przy dwóch seriach feed wygląda jak lista, nie jak siatka |
| **C** | Zawsze maksymalnie 3 części plus licznik | najbezpieczniejsze wizualnie, najsłabsze informacyjnie — po to grupujemy, żeby było widać, co jest w środku |

Rekomenduję **A**. To jedyna rzecz w tym epiku, której żaden test nie
udowodni — dlatego w zadaniu T3 jest wprost napisane: sprawdzić w prawdziwej
przeglądarce, jak siatka znosi wysoki kafelek.

---

## Znacznik świeżości — jak to działa i gdzie kłamie

Najnowsza część serii dostaje znacznik, jeśli jej data jest w granicach 14
dni od **momentu builda**. Strona jest statyczna, więc nie ma tu żywej daty:
seria, której najnowsza część kończy 15. dzień, trzyma znacznik do
najbliższego deploya. Ponieważ każda publikacja to push, a każdy push to
build, znacznik myli się wyłącznie wtedy, gdy nic nie publikujesz. Piszę to
wprost, żeby to była Twoja świadoma zgoda, a nie niespodzianka za miesiąc.

---

## Co znalazłem przy okazji — trzy realne błędy

**Wszystkie trzy naprawione 2026-08-26**, na Twoje polecenie, poza kolejnością
epiku. Szczegóły w `.plan/BACKLOG.md` → „Fixed". Poniżej opis, jak wyglądały:

1. **Feed bloga nie jest w ogóle sortowany.** `src/pages/blog/index.astro`
   renderuje `getCollection('blog')` w kolejności plików na dysku — nigdzie
   nie ma `.sort()`. Kolejność wpisów na `/blog` jest dziś przypadkowa.
2. **`/blog/index.old` to żywa, indeksowalna trasa.** Plik
   `src/pages/blog/index.old.astro` router Astro publikuje jako stronę —
   druga, nieaktualna kopia feedu, do której nic nie linkuje.
3. **`/offer` nie jest przekierowaniem, tylko meta-refreshem.**
   `Astro.redirect` w buildzie `output: 'static'` wypuszcza stronę
   przeładowującą się skryptem, nie odpowiedź 301. Dla Google to dwie różne
   rzeczy.

Do tego drobiazg: strona serii przekazuje do `PostCard` trzy propsy
(`authorName`, `authorAvatar`, `authorRole`), których ten komponent w ogóle
nie deklaruje — są po cichu ignorowane.

Wszystkie cztery są w epiku jako zadania (T2, T10, T11) i wylądowały też w
`.plan/BACKLOG.md`, na wypadek gdyby epic poszedł w innym kierunku.

---

## 301 ze starych adresów — mniej roboty, niż zakładaliśmy

Powiedziałeś, że 301 trzeba zrobić — zgoda co do zasady, ale uczciwie:
**skoro nie przenosimy artykułów do `/edu`, nie ma masowej migracji adresów.**
Zostają dwa realne przypadki (`/offer` i `/blog/index.old`) plus warstwa,
która sprawi, że następne przekierowanie będzie kosztowało jedną linijkę:
jedna mapa w `src/lib/redirects.ts`, czytana i przez `astro.config.mjs`, i
przez wygenerowany `public/_redirects` (format Cloudflare — nieszkodliwy na
GitHub Pages, gotowy, gdyby host się kiedyś zmienił).

---

## Fale i punkty

| Fala | Co | Pkt | Uwaga |
|---|---|---|---|
| W1 | Seria jako jeden wpis w feedzie (T1-T4) | 15 | rdzeń epiku |
| W2 | Fundament SEO: `site`, sitemap, robots, canonical, OG, JSON-LD (T5-T7) | 8 | niezależna od W1, może iść równolegle |
| W3 | CTA po wpisie + strona usługi (T8-T9) | 8 | T9 czeka na decyzję 1 |
| W4 | Mapa przekierowań, kasowanie martwej trasy, ADR (T10-T12) | 5 | na końcu, bo kasuje trasę |

**Razem 36 pkt.** Gdybyś chciał wydać tylko część: W2 (8 pkt) daje wartość
całej stronie natychmiast i nie zależy od niczego — to bym puścił pierwsze
albo równolegle.

## Czego świadomie NIE robimy

`/edu` i subdomen (odłożone jako E004 — plan zostaje na dysku, nic nie
ginie). Przesiadki na Cloudflare Pages. Paginacji feedu — przy 17 wpisach
nie ma sensu, wracamy do tego koło 40. Nowego języka wizualnego: wszystko
stoi na `container-bordered`, `cards-grid`, `CTA.astro` i `Button.astro`,
które już istnieją.
