# Prompt dla LM do Tworzenia Notatek i Artykułów

## Szablon Nagłówka:

```md
---
title: 'Tytuł Artykułu: Krótki i Zwięzły Opis Tematu'
date: [Data Utworzenia Artykułu w formacie RRRR-MM-DD]
author: "['Paweł Żentała' lub 'Autor Anonimowy' w przypadku braku danych]"
tags: ['tag1', 'tag2', 'tag3', ...] # Kluczowe słowa związane z tematem
slug: unikalny-identyfikator-url-artykułu
lang: [kod języka, np. pl]
source: '[Nazwa Źródła/Publikacji](URL do źródła)'
type: 'typ zawartości (np. note, summary, article)'
---
```

#### Instrukcje do Streszczenia i Formatowania Tekstu dla LLM:

1. **Bądź Zwięzły**: Staraj się używać małej ilości tokenów, aby przekazać maksymalną ilość informacji. Twoje streszczenie powinno być krótkie, ale zawierać wszystkie kluczowe punkty oryginalnego tekstu.

2. **Infograficzna Czytelność**: Upewnij się, że treść jest przedstawiona w sposób "infograficzny", co ułatwia czytelnikowi zrozumienie i przyswajanie informacji. Użyj list, wypunktowań lub krótkich akapitów, aby zwiększyć czytelność.

3. **Nagłówek z TL;DR**: W nagłówku umieść tag `TL;DR` (Too Long; Didn't Read), w którym jednym zdaniem streszczasz główną ideę lub przesłanie tekstu. To pomoże czytelnikowi szybko zorientować się, o czym jest treść.

#### Zakończenie:

Po stworzeniu streszczenia, przeglądaj je pod kątem zwięzłości, klarowności i upewnij się, że główna myśl jest łatwo zauważalna. Skup się na dostarczeniu czytelnikowi esencji treści w jak najbardziej przystępnej formie.
