# Overview

I am developing this website with ChatGPT, so I collected here some prompts to reuse them when asking questions, so I could give them to ChatGPT as context of my questions.

## Project tech stack and principles

In every new chat about coding:

```prompt
I am making website in VSCode DevContainer with Gatsby, antdesign, React, TypeScript, JSS. I use Semantic Versioning guidelines for CHANGELOG.md Prefer antd-way of doing stuff - the way proffesional React dev with experience in Antd would make it.

Rozmawiajmy po polsku, ale kiedy piszesz kod to komentarze do niego i nazwy komponetów, class, plikow itd pisz po angielsku - w kodzie używasz ZAWSZE, również do komentowania, angielskiego, a po za nim polskiego. Dotyczy to również plików markdown i innej dokumenacji.
```

## Design style and color pallete

When asking to generate images, in order to to get consistient style:

```prompt
Kolory profesjonalne, odpowiadające powadze agencji (innowacji). Styl: straight lines and sharp corners, emulating the look of a calculator's digital display. Plaski obraz 2d. Ikona. W eleganckim i ekskluzywnym stylu, skupić się na stonowanych, profesjonalnych odcieniach, takich jak szary, granatowy lub male ilosci purpury, z dodatkiem złotych lub srebrnych akcentów, metalicznych akcentow.

isolated on white background
sleek and simple shapes, clean lines,
cubism vector art, geometric abstraction
negative space, subtle gradients
color scheme: Deep Chestnut Brown, Dark Plum Purple, Lustrous Golden Tan, Rich Mahogany Brown, Faded Graphite Gray
```

#818082 - Muted Slate Gray
#5f4732 - Deep Chestnut Brown
#fff - Pure White
#533755 - Dark Plum Purple
#705940 - Warm Earthy Brown
#674e39 - Rich Mahogany Brown
#ddb17b - Lustrous Golden Tan
#7c776d - Smoky Charcoal Gray
#807e79 - Faded Graphite Gray

## Other

### Font

Nexa bold

### Ideas

## Fonts

### Font icons to consider

https://ionic.io/ionicons
https://feathericons.com/
https://themify.me/themify-icons

### Emojis

uzywam font https://fonts.google.com/noto/specimen/Noto+Color+Emoji
z ikonami UTF8, które mozna przegadac tutaj:
https://fonts.google.com/noto/specimen/Noto+Color+Emoji/glyphs?preview

## Bagdes an logos

https://shields.io/badges/static-badge
https://simpleicons.org/

### Tłuymaczenia

https://github.com/wiziple/gatsby-plugin-intl

# Future Contnet

Initial promt:

```
uzywam gatsby i antd i ts i jss
chce zrobic nowy typ tresci, typ ten to beda nowosci dt innowacji i furuologli, golwnie linki do innych stron, obrazki (np infografiki), cytyaty + linki do zrodel, embeddowane filmy, czasami moze jakies nagrania audio, wszystko to moze by opatrzone moim komentarzem ale najwaznejsza bedzie zewnetrzna tresc. bede ja zbieral dla swoich cyztelnikow po to aby mogli w jednym miejscu znalexc insiracje co juz istnieje i mozna wdrozyc. chce tez w przyszoosci porzadnie otagowac te tresc (pewne uzyje do tego ML), a nawet moze zrobic jej transkrypcje czy streszczenia (tez z ML) oraz pogrupowac. wazne beda tez daty publikacji tresci (jais timeline), oraz grupwanie ich tematycznie, np moga byc katrgoeie bedace chmurami tagow, czasami beda sie one jakos blisko przenikac, np spi i usb sa protokolami komunikacji, etc.

potrzebuje abys pomysl mi zaprogramowac strukture do tego w gatsby. zakladajac ze tresc bedzie dostarczaja osobnym skryptyem, jaki pozniej dopiszmy, moze bedzie jakas wtyczka chrome gdzie bede wklejal linki i one beda sie tam dodwac, mzoze przy dodawaniu tresc bedzie przechodzla przez jakis pipelne (np nadajacy tagi), moze bede w przszlosci potrzebowal panelu adminina dla tego.

ale na razie chce sie skupic na tym zeby tresc sie ladnie wywietla userom i aby posty nie musialbyc tej samej wysokosci ale dopasowywaly sie tak aby wypelnic elastycznie strone. czasam tez karty beda mialy inne kolory (np w zaleznosci od rodzaju zagadanien np iot vs innowacje spoleczne). do tego bedzie jakas szukajaka tych tresci pomagajaca je sobie filtrowac.

drugim zadaniem tego rodzaju tresci bedze dstarczenie contentu seo.

potrzebuje pomocy abys pomogl mi to ustukuturyzowac, zadal dodatkowe pytania klawyrfikujace, a na koncu podal wyczeroujaca instrukcje jak zaprojektujemy taka sekcje na strone (sekcja zentala.agency)
```

```md
# Projektowanie Sekcji Innowacji i Futurologii na Stronie zentala.agency

## 1. Struktura Danych i Typy Treści

- **Typy Treści**: Linki, obrazki (infografiki), cytaty, źródła, filmy, nagrania audio, komentarze.
- **Metadata**: Data publikacji, tagi (dla późniejszej klasyfikacji ML), kategorie tematyczne.
- **Przetwarzanie Treści**: Rozważ utworzenie pipeline'u, który automatycznie dodaje tagi, robi transkrypcje i streszczenia przy użyciu ML.

## 2. Wygląd i UX

- **Elastyczne Wyświetlanie Treści**: Użyj masonry layout lub podobnego rozwiązania, aby karty treści dopasowywały się do zawartości i wypełniały stronę elastycznie.
- **Kolorystyka**: Definiuj kolory kart w zależności od kategorii tematycznych (np. IoT, innowacje społeczne).
- **Wyszukiwarka i Filtry**: Implementuj mechanizm wyszukiwania i filtrowania treści, by ułatwić nawigację.

## 3. SEO

- **Optymalizacja Treści**: Upewnij się, że treści są zoptymalizowane pod SEO, z odpowiednimi metadanymi, opisami, tagami alt dla obrazów itp.
- **Strukturyzowane Dane**: Rozważ dodanie strukturyzowanych danych (JSON-LD) dla lepszego indeksowania przez wyszukiwarki.

## 4. Zarządzanie Treścią

- **Panel Admina**: Planuj stworzenie panelu administracyjnego do zarządzania treściami.
- **Automatyzacja Dodawania Treści**: Rozważ wtyczkę Chrome lub inne narzędzia do automatycznego zbierania i dodawania treści.

## 5. Implementacja w Gatsby z Ant Design i JSS

- **Komponenty Gatsby**: Użyj GraphQL do pobierania i wyświetlania danych.
- **Stylowanie Ant Design i JSS**: Wykorzystaj Ant Design dla komponentów UI i JSS do niestandardowego stylowania.

## Pytania Klaryfikujące:

1. Jakie są preferowane źródła treści? Czy mają być wyłącznie zewnętrzne, czy również własne?
2. Jakie szczegółowe kategorie tematyczne planujesz wprowadzić?
3. Czy masz preferencje dotyczące technologii ML do automatycznego tagowania i streszczania treści?
4. Jakie funkcje powinien zawierać panel admina w przyszłości?
5. Czy masz już określoną strategię SEO, czy potrzebujesz wskazówek w tym zakresie?

## Wyczerpująca Instrukcja Projektowania:

1. **Definicja Struktury Danych**: Określ strukturę danych dla różnych typów treści. Użyj GraphQL w Gatsby do ich obsługi.
2. **Projektowanie UI/UX**: Stwórz szkice i prototypy interfejsu użytkownika. Wykorzystaj Ant Design do tworzenia komponentów i JSS do niestandardowych stylów.
3. **Implementacja Front-endu**: Rozwijaj komponenty Gatsby z wykorzystaniem GraphQL. Zastosuj elastyczne układy treści.
4. **Integracja Backendu**: Przygotuj backend (lub headless CMS) do zarządzania treściami i ich metadanymi.
5. **SEO i Strukturyzowane Dane**: Wprowadź optymalizacje SEO i strukturyzowane dane dla lepszego pozycjonowania w wyszukiwarkach.
6. **Testowanie i Iteracja**: Testuj, uzyskuj feedback i iteruj, aby poprawić UX/UI i funkcjonalności.

Zacznij od określenia struktury danych i UX, a następnie przejdź do projektowania i implementacji. Pamiętaj o regularnym testowaniu i aktualizowaniu projektu.
```

Chat: https://chat.openai.com/c/174d8853-a1a7-41ff-b04a-fce62a352bed
