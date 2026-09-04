---
title: 'The Backlog Is a Data Structure for Self-Improvement'
date: '2026-09-04'
category: 'Harness'
excerpt: "Part 12 was about the data an agent generates to execute work. This one is about the simpler structure it generates to improve itself: the backlog and the improvements list. One rule makes the difference between a backlog that decays and one that stays executable — every entry carries links to the files it is about."
authorRole: 'DevEx Consultant'
published: false
series: 'agent-native-harness'
part: 13
---

## Szkic — do rozwinięcia

Status: brief, nie gotowy artykuł. Zapisany 2026-09-04 z dyktowanego brain dumpu Pawła.

## Teza

Część 12 mówiła o powtarzalnej strukturze danych **do wykonywania pracy**. Ta jest o
prostszej strukturze **do ulepszania samego siebie**: backlog i lista usprawnień.

Zasada, na której to stoi: **znalezisko, które wylądowało tylko w odpowiedzi w czacie,
jest znaleziskiem zgubionym.** Raport umiera razem z sesją; backlog jest tym, co ktoś
naprawdę przegląda. Każdy wykryty błąd i każda rzecz do poprawy kończy się jednym
z dwóch ruchów: naprawiasz albo wpisujesz. Trzeciej opcji nie ma.

## Szkielet

1. **Dlaczego czat nie jest kanałem zapisu.** Sesja agenta ma pamięć jednej rozmowy;
   plik ma pamięć projektu.
2. **Który z dwóch ruchów — decyduje pewność, nie wielkość.** Pewny i technicznie sensowny
   → naprawiasz sam i meldujesz jednym zdaniem. Niepewny albo to decyzja gustu, zakresu
   czy architektury → wpis, żeby ocenił człowiek. Progi ilościowe: wysoka pewność do
   5 punktów, średnia do 2.
3. **Wpis niesie link do plików, których dotyczy — zawsze.** To jest reguła, którą ten
   artykuł ma sprzedać. Wpis „naprawić walidację portów" kosztuje następnego agenta
   dziesięć minut szukania. Wpis z `bin/wt-remove.ps1:71` kosztuje zero. **Link nie jest
   uprzejmością wobec czytelnika — jest oszczędnością kontekstu**, a kontekst jest tym,
   za co płacisz.
4. **Backlog należy do repo, w którym siedzi błąd.** Sesja w repo A, która znalazła błąd
   w repo B, pisze do backlogu B. Inaczej wiedza ląduje u tego, kto jej nie potrzebuje.
5. **Druga lista: usprawnienia.** Backlog to „coś jest zepsute", improvements to „coś da
   się zrobić lepiej". Rozdzielone, bo mają inny próg wejścia i innego odbiorcę.
6. **Konsument tej struktury.** Agent triażujący czyta całość, klastruje i zamienia
   w plan naprawy. To domyka pętlę: harness zgłasza własne defekty i sam je zamyka,
   człowiek zatwierdza kierunek.

## Do rozstrzygnięcia przy pisaniu

- Pokazać realny fragment naszego `BACKLOG.md`? Wpis o `wt-remove` i symlinkach pnpm jest
  idealną ilustracją reguły z punktu 3 — konkretny plik, konkretna linia, konkretny objaw.
- Uważać na zazębienie z częścią 2 (agenci zostawiają feedback o toolingu). Tamta jest
  o feedbacku z narzędzi, ta o backlogu jako strukturze. Granicę trzeba nazwać wprost.

## Dyktat źródłowy (nie skracać, materiał surowy)

> Kolejny artykuł będzie o takich rzeczach jak improvements i backlog. To będzie omówienie
> kolejnego typu powtarzalnej struktury danych, ale tym razem do self-improvements. Czyli
> ostatnim razem mówiliśmy o powtarzalnej strukturze danych do wykonywania; tutaj mam
> prostszą powtarzalną strukturę danych — backlog oraz coś tam jeszcze. I jeszcze w ogóle
> do tego backlogu pewnie trzeba będzie dodać u nas do instrukcji, że zawsze w backlogu
> dawać linki do reference file. Nie wiem, czy my to mamy, ale jeżeli nie mamy, to trzeba
> by to dodać — żeby dawać linki do reference file. I napisać też, że zawsze backlog
> tego dotyka, dzięki czemu oszczędzamy agentowi czas na szukanie. Że to jest taka reguła:
> kiedy dopisujemy coś do backlogu, to zawsze musimy dopisywać łącznie z linkami do
> reference file, po to, żeby oszczędzić agentowi czas na szukanie. Takie reguły trzeba
> ustawić i też zapisać. W artykule.
