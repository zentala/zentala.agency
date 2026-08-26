# 008 — Blog & serie: UI + druga seria

## TLDR

Dyktando Pawła z 2026-08-26 o ramce serii na `/blog`, stronie serii, stronie
posta i o tym, czym w ogóle jest seria „Agent-Native Harness". Zapis dosłowny
w sekcji **Źródło** — nic nie skracam i nic nie streszczam. Interpretacja i
podział na zadania stoją niżej, jawnie oznaczone jako moje, nie jego.

Plan wykonawczy: `~/.claude/plans/s-uchaj-ta-ramka-z-fuzzy-rainbow.md`.

---

## Źródło — Paweł, 2026-08-26, dosłownie

> Słuchaj ta ramka z listu artykułów ona jest na blogu nie. Tak jakby chodzi o
> to że inne jak się kliknie gdziekolwiek to można kliknąć gdziekolwiek i
> przechodzić na serię. A u mnie muszę kliknąć tylko w View series. A może być
> tak że cały tło kliknę i przechodzi na serię rozumiesz. Tylko jak najadę na
> poszczególny artykuł z serii to wtedy widzę. To wtedy jest hover na ten
> artykuł i mogę wejść do tego artykułu tak. Poza tym te part 1, part 2, part
> 3, part 4 te napisy part to źle wygląda. Tu powinno być po prostu 1 2 3 4
> tak. To jest jedno 2 Data i data powinna być w jakimś trochę ładniejszym albo
> dobra format jest to ok ale brakuje line icon który byłby przed datą który
> pokazywał by datę i niech będzie tak jakby niech nie będzie osobnym elementem
> w tabeli tylko bezpośrednio po tytule jest już i tak na szaro tylko jeszcze
> na szaro line icon w kalendarzach i data tak. I tyle i wtedy nie trzeba brać
> i rozumiesz i robić osobne kolumny i będzie to lepiej wyglądało, będzie
> więcej miejsca mam wrażenie, będzie to wyglądało nieco świeżej. Te party też
> nie jest potrzebne. Jeszcze na górze jest napisane Agent native harness czyli
> tam sekcja na tytuł i tytuł jest takim samym kolorze jak tło i w ogóle nie
> jest nagłówkiem, a powinien być nagłówkiem tak. Powinien być nagłówkiem i ja
> bym zrobił w ogóle w ten sposób że cała ta seria Agent native harness i to
> powinno być napisane że series tak to jest jedno nad tym powinno być taki sam
> series i powinno być takim samym jak nagłówki obok tak. I wtedy to miałoby
> sens większy. I musi zmniejszyć ilość tych elementów. Daje tylko na przykład
> jakoś tak że jest pierwszy drugi trzeci później są trzy kropki i później są
> na przykład trzy ostatnie tak i w ten sposób niech to będzie. I można
> zobaczyć całą serię. Jak się kliknie w 3 kropki czy coś to tam się potworzy
> też cała seria No bo ja nie wiem jak to wygląda ale ja myślę że to może coś
> do tego powiedzenia. Zauważyłem też, że jeżeli post jest z serii, to on
> powinien być, jak się kliknie "All posts", to powinno wracać na stronę serii,
> a nie na stronę całego bloga. Być może należałoby jakoś to rozróżnić, nawet
> po tytule, tak?
>
> Na stronie serii "Part 2x8" się nie mieści, wiesz, w ogóle w tej linii i już
> to brzydko wygląda, bo jest za dużo elementów. Wszystkie, np. imię i
> nazwisko, nie są w tej samej linii, tylko jedno nad drugim, tak?
>
> Z drugiej strony powiem Ci, że rozważam, żeby zrobić coś takiego. Myślę, że
> na tej serii, żeby imię i nazwisko oraz kategorię, albo kategorię, nie imię i
> nazwisko, przenieść na górę, samą, wiesz? Gdzieś "Paweł Żentała", ktoś tam,
> ktoś tam, a później na dole tylko daty. Daty, kategorie i która to jest część
> serii. Może część serii, gdzie powinna być pierwsza part, później data, a
> później kategoria, tak?
>
> I do tego wszystkiego potrzebne są line icons, tak? Do kalendarza, do
> kategorii, do partu. Tutaj potrzebna była line icons, to coś takiego jak
> Lucid Icons. Trzeba zapisać sobie, generalnie, że implementujemy je mocno na
> tej stronie, żeby była infograficzna.
>
> Jeszcze jedna rzecz: "Linked in draft" jest tak, jakby powinien być w tym
> samym kontenerze, w którym jest opis, a on teraz nie ma tego marginu i to
> brzydko wygląda. W sensie, przycisk **Linking Draft** jest tuż na granicy
> obok ramki, zamiast być w środku, tu gdzie content. O! Albo jeszcze lepiej. W
> tytule: Agent Native Harness: How to build an repo and AI agent can
> automatically/actually work in? Chociaż tak naprawdę to u mnie to nie jest
> tylko to. Ale też jak zbudować. To nie jest tylko właśnie o zbudowaniu repo.
> To jest o tym jak zbudować ekosystem w którym zarówno AI agent jak i
> developer może łatwo pracować. Mogo pracować równocześnie i być
> zsynchronizowani. Łatwo się zsynchronizować tak? Żeby oboje mieli małe
> friction. Żeby oboje mieli dobry experience: Developer Experience i Agent
> Experience. Ja myślę o Multi-interfejse w tej serii projektujemy coś co
> nazywam Multi-interfacem. Nie wiem czy to jest dobra nazwa może zaproponujesz
> inną? Projektujemy coś co nazywam Multi-interfejsem czyli interfejsem który
> jest zarówno projektowany z punktu widzenia User Experience i Developer
> Experience i Agent Experience. To znaczy, bo wiesz Agent Experience,
> Developer Experience to jest de facto rozszerzenie tej samej filozofii: User
> Experience. Czyli no właśnie tam są różne koncepty tak? I my tutaj staramy
> się je zaaplikować to znaczy chcemy żeby przede wszystkim żeby agent i
> człowiek miały niskie friction. Żeby miały Progressive Disclosure. Zarówno
> agent żeby nie było przytoczony zbyt ilością tokenów jak i człowiek. Trzeba
> napisać w ogóle na wstępie że mają paradoksalnie bardzo podobną rzecz to
> znaczy mają ograniczone zasoby poznawcze zarówno agent jak i człowiek. Kiedy
> jesteśmy przytłoczeni zbyt dużej ilości informacji szczególnie
> nieostrukturyzowanych chaotycznych jeszcze dodatkowo musimy je łączyć bardzo
> drogo nas to kosztuje zarówno agent jak i człowiek jesteśmy w tym podobni.
> Dlatego potrzebujemy Interfejsu w którym możemy pracować który przedstawia
> nam rzeczy w sposób ustrukturyzowany sposób progressive disclosure który
> stosuje jakieś dobre praktyki znane, patterny itd. Dzięki którym możemy
> zachować powtarzalność procesów i przewidywalność itd. I tych procesów które
> można zautomatyzować i odciążyć siebie od powtarzalnej pracy. I że tak
> naprawdę to ja uważam że te multi interfejsy to jest w ogóle gateway do tego
> żeby zacząć wykorzystywać moc modeli AI I że pracuję nad zbudowaniem pełnego
> nad automatyzacją Software Development Lifecycle za pomocą tego ale
> jednocześnie myśląc o tym jakie będzie miejsce dewelopera w tym wszystkim.
> Albo architekta systemu albo człowieka w tym projekcie i tworząc dla niego te
> miejsce. Tworząc dla niego te miejsce ułatwiając mu rozumienie tego co robi
> agendę debugowanie. Otrzymywanie od niego informacji uczenie się od niego itd
> itd. Współpracę z nim tak? I to jest o tym ja nie wiem czy to jest tylko
> Agent Native Harness ja nie wiem czy to jak to opisać ale z drugiej strony to
> jest to czego ludzie oczekują a może powinniśmy zrobić dwie sesje jedną o tym
> co Ci teraz powiedziałem a drugą o Agent Native Harness bo być może niektóre
> rzeczy są stricte Agent Native Harness i ponieważ ludzie tego oczekują dobrze
> jest zrobić o tym serię a to co Ci dałem to jest materiał na drugą serię
> powinieneś to rozważyć. Nie widzę też, które artykuły są opublikowane, a
> które są tylko lokalnie. To jest dla mnie istotne. Powinno być coś, co to
> oznacza.
>
> Nie wiem też, czy jest sens, żeby wszędzie pisać na blogu w nagłówku artykułu
> "Paweł Żentała". To jest takie trochę... i szczególnie, że to jestem tylko
> ja. To mi się średnio podoba, ale nie wiem, co z tym zrobić, bo z drugiej
> strony to wygląda dobrze.
>
> Być może ja bym trochę ukrył, żeby była opcja ukrycia tego. Ja bym to ukrył,
> szczególnie że kordę strona jest, aby do której to nie istnieje. To też
> trzeba dodać do bloga, żeby ją naprawić.
>
> Ja bym to ukrył, wyłączył, żeby opcja włączania i wyłączania była wyłączona.
> Do daty i kategorii dodałbym line icons i pewnie wtedy będzie to ładnie
> wyglądało.
>
> Aha, i przenieść tę linię pod nagłówek, nagłówek pierwszy, później dopiero ta
> ikona z datą i kategorią, a wyłączonym moim imieniem i nazwiskiem autora, a
> dopiero później streszczenie, bo teraz to się źle czyta i źle wygląda.

## Decyzje podjęte w tej samej sesji (odpowiedzi Pawła)

- **Dwie serie**, nie jedna. „Agent-Native Harness" zostaje techniczna i
  konkretna (to, czego ludzie szukają, 8 gotowych części). Nowa seria
  **Multi-Interface** niesie tezę filozoficzną.
- **Badge DRAFT tylko w dev.** Produkcja zostaje czysta dla czytelnika.

---

## Moja interpretacja (agent, nie Paweł)

Wspólny mianownik usterek: linie meta są zbudowane z gołego tekstu i kropek,
więc rosną na szerokość i zawijają się. Naprawa jest jedna — jeden komponent
`PostMeta` z ikonami liniowymi, używany wszędzie — a nie osiem osobnych łatek.

Nazwy „Multi-Interface" nie wymyślam od nowa: termin jest już ustalony w KB
Pawła jako skill `~/.claude/skills/multi-interface/SKILL.md` („jedno źródło
prawdy z dwoma wyjściami, projektowane razem, od pierwszego szkicu"). Seria na
blogu jest publiczną wersją tego samego pojęcia — spójność nazwy między
narzędziem a treścią jest warta więcej niż ładniejszy synonim.

Podział materiału między serie:

| | Agent-Native Harness | Multi-Interface |
|---|---|---|
| pytanie | **jak** | **dlaczego** |
| zawartość | rejestr równoległych agentów, bang-commands, PM3 + domeny, KB, pętla feedbacku | UX = DX = AX jako jedna filozofia, ograniczone zasoby poznawcze po obu stronach, progressive disclosure, content negotiation, adresowanie, brokery, miejsce człowieka w zautomatyzowanym SDLC |
| stan | 8 części, wszystkie `published: false` | do napisania |
| link | do Multi-Interface jako uzasadnienie | do Harness jako dowód |
