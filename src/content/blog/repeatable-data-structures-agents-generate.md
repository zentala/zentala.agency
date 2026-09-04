---
title: 'Make Your Agent Generate Data, Not Prose'
date: '2026-09-04'
category: 'Harness'
excerpt: "A task file is not a note. It is a record with a schema — points, agent, model class, effort, confidence, acceptance criteria, context links. Once every task looks the same, a system can iterate over them. The trick is not inventing the schema. It is showing what consumes it."
authorRole: 'DevEx Consultant'
published: false
series: 'agent-native-harness'
part: 12
---

## Szkic — do rozwinięcia

Status: brief, nie gotowy artykuł. Zapisany 2026-09-04 z dyktowanego brain dumpu Pawła.
Stan pól i propozycja rozszerzenia: [`.plan/reports/2026-09-04-pipeline-zmiany-propozycja.md`](int://mATX.lan/C:/Users/zentala/.claude/.plan/reports/2026-09-04-pipeline-zmiany-propozycja.md) §4.

## Teza

Agent, planując, **generuje dane** — nie notatki. Jeżeli te dane mają za każdym razem
ten sam kształt, system może po nich iterować i wypełniać instrukcje w powtarzalny
sposób. Powtarzalna struktura danych jest warunkiem automatyzacji pętli z części 10.

I od razu druga połowa tezy, bez której artykuł jest bezużyteczny: **nie sztuka
zdefiniować powtarzalną strukturę. Sztuka pokazać, co ją konsumuje.** „Rób commity w tej
konwencji" bez pokazania, kto te commity czyta i po co, to jest cargo cult. Dlatego każdy
przykład w tym artykule idzie w parze: **oto struktura → oto kto ją czyta → oto co z tego
robi.**

## Szkielet

1. **Task jako rekord.** Pola, które niesie u nas plik zadania: `id`, `epic`, `status`,
   `agent`, `points`, `branch`, daty. I te, które dopisujemy: `model` (cheap / standard /
   high-capability), `effort` (routine / focused / research), `confidence` (1-5),
   `summary` (dwa zdania dla człowieka i dla UI).
2. **Kto to konsumuje.** `points` + `effort` + `model` razem odpowiadają na pytanie „komu
   to wydać" — tanio i rutynowo idzie do taniego modelu w worktree; research
   i high-capability zostaje w drogim kontekście. `agent` omija zgadywanie po słowach
   kluczowych. `confidence` jest przepustnicą: przy wysokiej wdrażasz do 5 punktów bez
   pytania, przy średniej do 2.
3. **Handoff jako drugi rekord.** Kryteria akceptacji — dla agenta walidującego, żeby je
   przeleciał. Linki do plików — żeby agent wdrażający miał kontekst i nie szukał.
4. **Pozostałe powtarzalne struktury i czym się różnią.** `BACKLOG.md`, `PLAN.md`,
   `HANDOFF.md`, rekord dowodu. Każda ma innego konsumenta i to jest cała różnica między
   nimi. Najważniejsza jest ta pierwsza — to ona orkiestruje wykonanie zadania przez
   agenta-orkiestratora.
5. **Test na dobrą strukturę:** czy da się po niej iterować bez czytania treści? Jeśli
   trzeba przeczytać, żeby wiedzieć, co zrobić — to jeszcze nie jest struktura, tylko
   tekst z nagłówkami.

## Do rozstrzygnięcia przy pisaniu

- Pokazać realne pliki czy przykłady? Realne są mocniejsze, ale odsłaniają projekty.
- Czy `confidence` zasługuje na osobny artykuł — jest już część 8 o punktach jako
  przepustnicy; uważać, żeby się nie powtórzyć.

## Dyktat źródłowy (nie skracać, materiał surowy)

> Robię takie rzeczy, że każdemu agentowi w każdym z tych tasków zapisywać metadata: jaka
> to jest złożoność modelu potrzebna, jakiego typu — high capability i tak dalej — do
> rozwiązania tego. Jaki jest effort level. Być może metadata jeszcze jest jakiś krótki
> opis taska; jeżeli nie, to powinien być, bo pokazuje się w UI: tytuł czytany, opis ładny,
> krótki, ze dwa zdania na przykład. No i ilość punktów scrumowych, to jest istotne.
> Dzięki ilości punktów scrumowych i effort level wiadomo, jakiemu modelowi wydawać te
> polecenia, i jeszcze jakiemu agentowi to wydelegować, jaki typ agenta. Z kolei
> w handoffie są rozpisane takie rzeczy jak acceptance criteria — dla agenta walidującego,
> żeby je przeleciał, i dla agenta wdrażającego. I są też linki do plików, żeby był
> kontekst. W ten sposób tworzymy dane, po których później system może iterować, które są
> powtarzalne. Agent generuje w powtarzalny sposób dane, po których później nasz system
> może iterować i wypełniać te instrukcje. Bo to nie jest sztuka robić powtarzalne
> struktury danych, jeżeli nie pokażemy ludziom, jak wykorzystywać te powtarzalne
> struktury danych, które tworzymy. Dlatego chciałbym, żeby to było coś takiego: oto jest
> powtarzalna struktura danych, którą wykorzystuję w ten sposób.
