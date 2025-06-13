# PostCard.astro – NOTES & ARCHITECTURE

## Cel
- Cała karta (PostCard) ma być klikalna (overlay anchor), ale linki wewnętrzne (autor, kategoria) muszą być klikalne niezależnie.
- Excerpt (opis posta) ma zajmować maksymalnie tyle miejsca, ile zostaje pod tytułem, ale nie wychodzić poza padding karty.
- Excerpt ma być przycinany z 3 kropkami na końcu, nawet jeśli tytuł jest bardzo długi.
- Rozwiązanie ma działać dobrze z samym CSS (fallback) i jeszcze lepiej z JS (jeśli dostępny).

## Co działa (i zostawić!)
- Overlay anchor: `<a href=... class="absolute inset-0 z-0">` na całą kartę, linki wewnętrzne mają `z-10`.
- Excerpt:
  - CSS fallback: `flex-1 min-h-0 overflow-hidden text-ellipsis` + `display: -webkit-box; -webkit-box-orient: vertical;` na `<p>`. To przycina tekst do dołu karty, ale może uciąć w połowie linii (brak 3 kropek na końcu).
  - JS enhancement: funkcja `truncateExcerpt()` progressive enhancement - sprawdza czy tekst się mieści, a jeśli nie, to przycina z zachowaniem pełnych linii i dodaniem `…` na końcu.

## Dlaczego takie rozwiązanie
- **Nie można użyć `line-clamp`** - wysokość tytułu jest zmienna, więc nie wiemy ile linii zostaje dla excerpta
- **Nie można użyć stałej wysokości** - tytuły mają różną długość, czasem 1 linię, czasem 3
- **Biblioteka shave.js nie działała** - problemy z importem, konfliktami i kalkulacją wysokości w kontekście flex
- **Potrzeba było progressive enhancement** - CSS fallback + JS improvement

## Jak działa implementacja JS

### 1. Strategia renderowania
```javascript
// Najpierw pokazuje pełny tekst
excerpt.textContent = originalText

// Potem sprawdza w requestAnimationFrame (po renderowaniu)
requestAnimationFrame(() => { ... })
```
**Dlaczego:** Browser potrzebuje czasu na renderowanie, żeby dokładnie zmierzyć wysokości.

### 2. Wykrywanie overflow
```javascript
const isOverflowing = excerpt.scrollHeight > excerpt.offsetHeight || 
                     card.scrollHeight > cardHeight
```
**Dlaczego:** Sprawdzamy oba - excerpt może się mieścić w swoim kontenerze, ale karta jako całość może wychodzić poza `aspect-ratio: 1/1`.

### 3. Binary search dla optymalnej długości
```javascript
while (left < right) {
  const mid = Math.floor((left + right + 1) / 2)
  // testuje długość tekstu...
}
```
**Dlaczego:** Wydajne - zamiast testować każdy znak, znajduje optymalną długość w ~log(n) iteracjach.

### 4. Testowanie z ellipsis
```javascript
const textWithEllipsis = mid < originalText.length ? testText + '…' : testText
```
**Dlaczego:** `…` zajmuje miejsce, więc musi być uwzględniony przy testowaniu czy tekst się mieści.

## Kluczowe elementy implementacji

### CSS fallback (zawsze działa)
- `flex-1 min-h-0` - pozwala excerptowi zajmować pozostałą przestrzeń
- `overflow-hidden text-ellipsis` - przycina tekst poziomo
- `-webkit-box` - wieloliniowe przycinanie (może uciąć w połowie linii)

### JS enhancement (lepsze UX)
- Pełne linie tekstu (nie ucina w połowie)
- Zawsze `…` na końcu gdy przycięte
- Respektuje dokładnie dostępną przestrzeń w karcie

### Timing i performance
- `requestAnimationFrame` - synchronizacja z renderowaniem
- `setTimeout(100)` na resize - throttling dla wydajności
- Binary search - O(log n) zamiast O(n)

## Czego nie zmieniać

### CSS
- Nie usuwać CSS fallback - jedyny sposób działania bez JS
- Nie ustawiać `line-clamp` - psuje elastyczność względem tytułu
- Nie zmieniać `flex-1 min-h-0` - kluczowe dla zajmowania przestrzeni

### JavaScript
- Nie usuwać `requestAnimationFrame` - bez tego źle mierzy wysokości
- Nie usuwać sprawdzania `isOverflowing` - optymalizacja (nie przycina gdy niepotrzebne)
- Nie zmieniać logiki binary search - wydajność i precyzja
- Nie usuwać `data-excerpt` z HTML - potrzebny do selekcji

### HTML struktura
- Excerpt musi być w elemencie z `data-excerpt`
- Karta musi mieć `aspect-ratio: 1/1` i klasę `.post-card`
- Zachować overlay anchor z `z-0` i linki wewnętrzne z `z-10`

## Status implementacji
✅ **DZIAŁA** - tekst przycina się dokładnie do dostępnej przestrzeni, zawsze z `…` na końcu, z CSS fallback.

## Możliwe ulepszenia
- **Throttling resize** - dodać lepsze throttling dla resize eventów
- **MutationObserver** - reagowanie na zmiany zawartości karty
- **IntersectionObserver** - uruchamianie tylko dla widocznych kart
- **Web Workers** - przeniesienie binary search do web workera (dla dużych tekstów)
