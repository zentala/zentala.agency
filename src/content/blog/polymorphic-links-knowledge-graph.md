---
title: 'One Link Pattern, a Whole Knowledge Graph'
date: '2026-08-15'
category: 'Knowledge & Leverage'
excerpt: 'When everything in an app should link to everything, the instinct is a join table per pair of types — twenty tables named x_to_y. One polymorphic pattern replaces all of them, and turns out to be the foundation of a graph rather than a table.'
authorRole: 'DevEx Consultant'
published: false
series: 'multi-interface'
part: 5
---

## Part 5 of the multi-interface series

## Hook

Kiedy chcesz, żeby *wszystko* w apce linkowało się do *wszystkiego* — wpis do
leku, objaw do przyczyny, dowód do diagnozy — instynkt podpowiada tabelę
łączącą per para typów. To droga do dwudziestu tabel `x_to_y`. W moim health
trackerze (vitals) zamiast tego jest **jeden wzorzec**: polimorficzny link
`(sourceType, sourceId) → (targetType, targetKey)` + `relation`/`stance`/`note`.
Trzeci raz, gdy go użyłem, zrozumiem, że to nie tabela — to fundament grafu.

## Teza

- `condition_links` (dowód ↔ diagnoza, ze `stance: supports|refutes|context`),
- `knowledge_links` (explainer/resource ↔ dowolna encja),
- `mentions` (@-wzmianka w wolnym tekście ↔ dowolna encja),

to **ta sama forma**, nie trzy osobne feature'y. Nowy typ linku = nowy wiersz
konfiguracji, nie nowa tabela i nie nowy paradygmat. Integralność (czy target
istnieje) pilnuje **warstwa akcji**, nie schema — bo target jest polimorficzny i
FK by tego nie objął. To świadomy wybór: elastyczność grafu kupiona kosztem
walidacji przeniesionej o poziom wyżej.

## Czemu to ważne dla agenta

Agent nie musi znać N tabel relacji — pyta „co jest powiązane z tą encją?" jednym
`get-mentions`/`get-knowledge-cluster`. Graf jest jednorodny, więc kontekst,
który dostaje LLM, składa się z jednego kształtu. To jest ta różnica między
„apka z danymi" a „apka, po której agent potrafi się poruszać".

## Co pokazać w kodzie

- schemat jednej tabeli linków + dlaczego `targetKey` jest stringiem (encja LUB
  slug konceptu),
- „integrity in actions, not in schema" — walidacja w `defineAction`,
- jak `@`-parser rozwiązuje token do `(type, id)` przez wszystkie katalogi,
- pułapka: bez katalogu konceptów `targetKey` to wolny string → brak dedupu
  („post-przerywany" vs „intermittent fasting"); lek = tabela `concepts`.

## Kanał

Full artikel (blog zentala.agency) + snippet na LinkedIn („one link table to rule
them all"). Bonus: wydać jako skill/repo z minimalnym agent-native przykładem.
