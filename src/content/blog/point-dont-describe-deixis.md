---
title: "Point, Don't Describe — Solving Deixis in Human-Agent Collaboration"
date: '2026-08-12'
category: 'Agent Orchestration'
excerpt: 'Describing which thing you mean is expensive and lossy. Pointing at it is neither. Treating the UI as a channel from user to agent — not only the other way round — removes a whole class of misunderstanding.'
authorRole: 'DevEx Consultant'
published: false
series: 'multi-interface'
part: 4
---

## Part 4 of the multi-interface series

- **Kategoria:** Agent Orchestration
- **Status:** WDROŻONE (2026-08-12) — epik 013 zmergowany, e2e zweryfikowane; gotowe do rozpisania
- **Źródło:** meblarz (szafka), epik `013-adnotacje-3d-mcp` + ADR-036
- **Feedback Pawła (2026-08-12):** „bardzo, bardzo przydatne"; szerszy frame:
  **UI jako kanał komunikacji user→agent** (nie tylko 3D); pokazać kilka dem;
  wyjaśnić w artykule „bez podpinania serwera MCP" i co znaczy stateless/bez sesji
  (sam o to pytał — czytelnik też zapyta).

## Teza

Największa strata w pracy człowiek↔agent nad aplikacją wizualną to deixis:
„popraw TO" nie przechodzi przez tekst. Screenshot nie wystarcza — daje
piksele, nie identyfikator w modelu domeny. Rozwiązanie: aplikacja sama
wystawia MCP i mówi agentowi, co user wskazał. Szerzej: **każdy interfejs
może być dwustronny** — user klika dla agenta, nie tylko dla siebie.

## Dema (zbierać kolejne — każde wzmacnia tezę)

1. **meblarz** (gotowe, kod w repo): klik w płytę w 3D → `PanelRef
   {unitId, panelId, role}` → komentarz z referencjami `[półka #p12]` →
   agent czyta `annotations_list` / `selection_get`, zamyka `annotations_resolve`.
2. _(Paweł miał w głowie drugi przykład — dopisać, gdy sobie przypomni;
   kandydaci z KB: adnotacje dokumentów `repo:path@version` z kotwicami
   cytatowymi — goal 084; decision-broker/consent-broker jako „UI mówi
   agentowi decyzję usera".)_

## Szkielet artykułu

1. Historia porażki: nietypowa zabudowa w konfiguratorze, agent gubi się
   w opisach słownych („ta deska po lewej u góry w drugiej szafce").
2. Wzorzec (5 klocków): stabilne ID w modelu → selekcja klikiem → ludzkie
   nazwy na hover (wspólny język) → komentarz z wklejanymi referencjami
   `[półka #p12]` (jak referencja kodu w edytorze) → MCP endpoint
   w samej aplikacji (Streamable HTTP, stateless), tools:
   `annotations_list` / `selection_get` / `annotations_resolve`.
3. **„Zero infrastruktury": bez osobnego serwera MCP.** MCP ≠ osobny proces:
   to protokół; endpoint `/mcp` to ~100 linii middleware'u w dev-serwerze,
   który apka i tak ma. `.mcp.json` z `type: http` — Claude Code łączy się
   sam. Sekcja-wyjaśnienie „stateless / bez sesji" (patrz niżej) — pytanie,
   które zada każdy czytelnik.
4. Pull vs push: trigger-frazy w CLAUDE.md kontra budzenie agenta hookiem.
5. Orphaned targets: adnotacja przeżywa edycję modelu (nigdy nie kasuj).
6. Kod: middleware Vite + `@modelcontextprotocol/sdk` (fragmenty z repo).
7. Bug-story do sekcji „lessons": kontekst Reacta nie przenika do sceny R3F —
   zielone testy, martwy klik; złapane tylko weryfikacją live.

## Stateless / „bez sesji" — notatka do sekcji 3 (własnymi słowami)

Chodzi o sesję PROTOKOŁU MCP (klient↔serwer), nie o sesję użytkownika.
Klasycznie serwer MCP po `initialize` trzyma w pamięci obiekt sesji per
klient (session id w nagłówku, stan handshake'u). W trybie stateless
tworzymy świeży transport per żądanie HTTP i nic nie pamiętamy między
callami — wolno nam, bo cały stan domenowy (adnotacje, selekcja) żyje
w storze aplikacji, nie w warstwie MCP. Zyski: middleware przeżywa restart
dev-serwera i HMR, żadnego sprzątania sesji, dowolny klient może strzelić
pojedynczym żądaniem. To ten sam argument co „REST bez sticky sessions".

## Dlaczego to proof point

Pragmatyzm (kod, nie teoria), batch-tested (własna apka, realny ból),
systemowe myślenie (pętla feedbacku user→agent, nie jednorazowy fix).
Bonus: wydawalne jako skill/szablon dla dowolnej lokalnej apki z canvasem.
