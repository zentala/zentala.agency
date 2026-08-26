---
title: 'Markdown and MDX as the Substrate — One Body of Content, Two Interfaces'
date: '2026-08-19'
category: 'DevEx'
excerpt: 'The same page serves HTML to a person and Markdown to an agent, from one source, chosen by content negotiation. No second API, no second copy to keep in sync — the agent reads what the reader reads, minus the chrome.'
authorRole: 'DevEx Consultant'
published: false
series: 'multi-interface'
part: 2
---

## Part 2 of the multi-interface series

## Why

Wiedzę w harnessie czytają dwaj klienci o sprzecznych potrzebach: człowiek chce
wyrenderowaną stronę (nagłówek, komponenty, timeline), agent chce surowe źródło
(mało tokenów, zero szumu HTML). Zwykle robi się dwa systemy (docs + pliki dla
agenta) i one się rozjeżdżają. Pattern: **jedno źródło MDX, dwa interfejsy z tej
samej ścieżki** — i wiedza przestaje się dublować.

## Angle

To nie nowy wynalazek, tylko **stary HTTP content negotiation użyty do AI
harnessu** — i to jest teza:

1. **Jeden URL, nagłówek decyduje.** `Accept: text/html` → wyrenderowana strona;
   `Accept: text/markdown` → surowy plik źródłowy MDX. Ewolucja wcześniejszej
   wersji patternu (sufiks `.md` w adresie) — sufiks zostaje jako fallback dla
   ludzi, negocjacja jest dla maszyn.
2. **MDX jest dwujęzyczny z natury.** Frontmatter → meta strony dla człowieka,
   ustrukturyzowane dane dla agenta. Komponent JSX → widoczny widget na stronie;
   dla agenta sama nazwa `<Timeline>` mówi, czym jest ten blok. Źródło jest
   czytelne bez renderowania — to kryterium jakości treści.
3. **Agent dostaje narzędzie, nie scraper.** Małe narzędzie (tool/skill), które
   czyta strony `*.internal` z `Accept: text/markdown` — agent „przegląda
   intranet" po plikach źródłowych, człowiek te same adresy otwiera w Chrome.
4. **Pod domenami `*.internal`** całość daje zorganizowaną, adresowalną wiedzę:
   niski koszt przyswojenia, progressive disclosure, wysoki DevEx — dla obu
   gatunków czytelników.

## Outline (LinkedIn-short)

- Problem: dwa silosy wiedzy (ładne docs vs pliki dla agenta) zawsze się rozjadą.
- Pattern: single source (MDX) + content negotiation (`Accept`) + domeny internal.
- Diagram (Mermaid): jeden URL → [Accept?] → HTML render / raw MD → człowiek / agent.
- Snippet: middleware/route w Astro zwracający źródło przy `text/markdown`.
- Puenta: agent-native nie znaczy „osobna appka dla agenta" — znaczy „ta sama
  appka, drugi interfejs".
