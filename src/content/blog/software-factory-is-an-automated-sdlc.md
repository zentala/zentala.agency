---
title: 'The Software Factory Is Just an Automated SDLC (And SOPs Are the Missing Half)'
date: '2026-09-04'
category: 'Harness'
excerpt: "Everyone wants to ship software automatically. The answer is not a bigger harness — it is automating the software development lifecycle itself, step by step, with a gate on every step. And the thing that makes those steps automatable is something boring: standard operating procedures."
authorRole: 'DevEx Consultant'
published: false
series: 'agent-native-harness'
part: 10
---

## Szkic — do rozwinięcia

Status: brief, nie gotowy artykuł. Zapisany 2026-09-04 z dyktowanego brain dumpu Pawła.
Materiał źródłowy: [`.plan/reports/2026-09-04-software-factory-ras-mic.md`](int://mATX.lan/C:/Users/zentala/.claude/.plan/reports/2026-09-04-software-factory-ras-mic.md)
oraz [`.plan/reports/2026-09-04-pipeline-zmiany-propozycja.md`](int://mATX.lan/C:/Users/zentala/.claude/.plan/reports/2026-09-04-pipeline-zmiany-propozycja.md).

## Teza

Automatyczne wydawanie dużej ilości oprogramowania to mokry sen dzisiejszego harness
engineera. Odpowiedzią nie jest większy harness, tylko **zautomatyzowanie całego cyklu
życia oprogramowania** — kroku po kroku, z warunkiem przejścia na każdym kroku.

Cała automatyzacja dzieje się **wokół pętli**, nie wewnątrz pojedynczego promptu. Jest
główny wrapper, który iteruje po cyklu: od taska, przez pracę nad nim, testy, dowody,
review, aż po odbiór.

## Szkielet

1. **Czym jest SDLC, gdy wykonawcą jest agent.** Te same etapy co zawsze, inny wykonawca
   i inna cena błędu: agent nie męczy się powtarzaniem, ale też nie zauważy, że krok
   niczego nie sprawdził.
2. **Sześć kroków i sześć bramek.** Rozpoznaj → izoluj → odtwórz → zbuduj → udowodnij →
   przeglądnij w pętli → oddaj. Kluczowa myśl artykułu: **krok bez bramki jest
   dekoracją.** Bramka musi być sprawdzalna komendą, nie ocenna.
3. **Nasza wersja każdego kroku.** Tu wchodzi to, co mamy ponad standard: dowód, który
   sam się unieważnia po zmianie kodu; worktree z rejestrem agentów; weryfikacja
   przeglądarkowa, która chodzi po trzech stronach i klika w nawigację.
4. **Szczytem tego rozwoju jest agent-orchestrator.** Wrapper, który spina pętlę w całość
   i iteruje po SDLC dla kolejnych tasków i epików, w sposób zorganizowany — robi review,
   przechodzi do następnego, wraca do poprzedniego, gdy bramka nie przeszła.
5. **Rola SOP — i to jest druga połowa artykułu.** Na wytwarzanie oprogramowania można
   spojrzeć jak na **standardowe procedury operacyjne**: w jaki sposób to robisz. Te
   procedury trzeba zdefiniować wszędzie tam, gdzie to możliwe, **po to, żeby zostawić
   człowiekowi albo agentowi decyzję tylko tam, gdzie procedury nie ma** — czyli przy
   rzeczach nietypowych, nie przy powtarzalnych.
6. **Centralna baza SOP i ADR.** Ludzie implementują skille; my próbujemy zrobić centralną
   bazę standardowych procedur operacyjnych, która pełni też funkcję ADR. To ma być baza,
   na podstawie której pisze się oprogramowanie. W repozytorium harness: `.plan/SOP/`
   i `.plan/ADR/`, i tam po prostu je rozpisać.

## Do rozstrzygnięcia przy pisaniu

- Czy SOP + ADR to osobny artykuł, czy druga połowa tego? Materiału jest na osobny.
- Ile pokazać z naszego realnego `SOP/README.md` — to jest dowód, ale też odsłonięcie kuchni.
- Zakończenie: jeszcze nie wiadomo. Prawdopodobnie „im więcej procedur zapiszesz, tym
  mniej agenta w pętli — i o to chodzi".

## Dyktat źródłowy (nie skracać, materiał surowy)

> Automatyzacja wydawania oprogramowania, dużej ilości oprogramowania w sposób
> automatyczny, to taki mokry sen obecnej chwili harness engineera. Doszliśmy do wniosku,
> że najlepszy sposób, aby to zrobić, to po prostu zautomatyzowanie całego cyklu Software
> Development Lifecycle. Cała automatyzacja następuje wokół tej pętli, wokół tego procesu,
> więc jest taki main wrapper. Szczytem tego rozwoju jest agent-orchestrator, który
> orkiestruje, żeby to było robione w pętli, ileś tasków po kolei, spina tę pętlę w całość
> i iteruje po niej — po Software Development Lifecycle dla poszczególnych tasków, epików,
> w sposób zorganizowany. Trzeba także wspomnieć o roli SOP: zbiór wytwarzania
> oprogramowania można potraktować jak standardowe procedury operacyjne i je
> zautomatyzować. Te procedury trzeba sobie zdefiniować, gdzie tylko to jest możliwe, po
> to aby pozostawić człowiekowi albo agentowi do podjęcia decyzji tylko tam, gdzie tych
> procedur nie ma — w szczególności tam, gdzie są nietypowe rzeczy, a nie powtarzalne.
> Próbuję zrobić centralną bazę standardowych procedur operacyjnych, która by miała pełnić
> funkcję ADR. Żeby one były taką bazą, na podstawie której pisze się oprogramowanie.
