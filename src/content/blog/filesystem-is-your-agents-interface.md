---
title: 'The Filesystem Is Your Agent Interface'
date: '2026-09-04'
category: 'Harness'
excerpt: "Your agent does not talk to your app. It talks to your filesystem. Give the folders and filenames a naming system it can learn, and it stops asking where things go — it already knows. Here is mine, folder by folder, with the instruction block cut straight out of my own config."
authorRole: 'DevEx Consultant'
published: false
series: 'agent-native-harness'
part: 11
---

## Szkic — do rozwinięcia

Status: brief, nie gotowy artykuł. Zapisany 2026-09-04 z dyktowanego brain dumpu Pawła.

## Teza

**System plików jest tym, co komunikuje się z twoim agentem.** Powinieneś myśleć o nim
jak o interfejsie — i to interfejsie **samoopisującym się**. Jeżeli wprowadzisz
odpowiednią nomenklaturę dla swoich plików i nauczysz jej agenta, wprowadzasz
powtarzalność: dla niego staje się oczywiste, czego gdzie szukać, co gdzie zapisywać,
co się gdzie znajduje.

To odwraca zwykłe pytanie. Nie „jak wytłumaczyć agentowi projekt", tylko „jak ułożyć
projekt, żeby nie wymagał tłumaczenia".

## Szkielet

1. **Folder jako typ, nie jako szuflada.** `.plan/epics/` nie jest miejscem na pliki
   o epikach — jest deklaracją, że wszystko w środku JEST epikiem i ma jego kształt.
2. **Moja struktura, folder po folderze.** `.plan/` (STATE, BACKLOG, IMPRO, HISTORY,
   ADR, epics, investigations, reports), `.claude/worktrees/`, `SOP/`, `rules/`,
   `skills/`, `agents/`, `bin/`. Przy każdym: **dlaczego akurat tak** — bez tego to
   tylko czyjeś `tree`.
3. **Nazwa pliku ma wzorzec, nie treść.** `E<NNN>-T<NN>`, `YYYY-MM-DD-temat.md`,
   `NNN-tytul.md` dla ADR. Wzorzec jest adresem: agent umie go **wygenerować**, zanim
   plik powstanie, a to jest cała różnica.
4. **Jeden plik w folderze jest wejściem.** Gdzie jest `index`/`README` — jest; gdzie
   go nie ma, jego brak też coś znaczy.
5. **Instrukcja żywcem wycięta z mojej konfiguracji.** Nie opis instrukcji — sama
   instrukcja, do skopiowania: „tak i tak masz organizować swoją pracę".
6. **Czego u siebie nie używam i dlaczego to usunąłem.** Statusy, których nikt nie
   czyta, są gorsze niż ich brak — udają informację. Ten punkt jest ważniejszy niż
   wygląda: pokazuje, że to system utrzymywany, a nie wymyślony raz.

## Do rozstrzygnięcia przy pisaniu

- Zweryfikować przed publikacją, których statusów realnie używamy, i wyciąć resztę
  także z instrukcji, nie tylko z artykułu.
- Czy pokazywać `.plan/` jako osobne repo w środku repo aplikacji (appka publiczna,
  plan prywatny) — to mocny, mało znany wzorzec, ale wymaga akapitu wyjaśnienia.

## Dyktat źródłowy (nie skracać, materiał surowy)

> System plików jest tym, co się komunikuje z twoim agentem. Powinieneś o nim myśleć jako
> o interfejsie dla swojego agenta, który jest self-descriptive. Jeżeli wprowadzisz
> odpowiednią nomenklaturę dla swoich plików i nauczysz swojego agenta, wprowadzasz
> powtarzalność. Dla niego będzie oczywiste, co gdzie szukać, co gdzie zapisywać, co się
> gdzie znajduje. Jak rozumieć projekt? Jak go uporządkować? Oto jest moja nomenklatura —
> i rozpisujesz strukturę folderów: `.plan`, worktree, epics, handoffy, i tak dalej.
> Następny przykład: każda nazwa pliku ma swoją strukturę, pattern, do każdego folderu.
> Jeżeli jest index, to index; jeżeli nie ma, to nie ma. Jakie tam są jeszcze pliki:
> tags, backlog, pewnie inne statusy. A co, że statusu nie korzystam? To pewnie trzeba
> będzie usunąć — nie robić tego statusu, tylko te, z których korzystam realnie.
> Rozpisać moją strukturę plików, dlaczego taka. No i przykładowe krótkie instrukcje dla
> agenta, albo nawet struktura plików jako instrukcja dla agenta, żywcem wycięta z moich
> instrukcji.
