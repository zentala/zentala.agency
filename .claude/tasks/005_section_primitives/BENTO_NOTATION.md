# Bento Grid Layout Notation System

## 🎯 Purpose
Standardize how we communicate about Bento grid layouts to avoid confusion and make layouts easy to describe, understand, and implement.

---

## 📐 Notation Format

### Basic Span Notation: `colSpan:rowSpan`

**Format:** `[columns]:[rows]`

**Examples:**
- `1:1` - 1 column wide, 1 row tall (square)
- `2:1` - 2 columns wide, 1 row tall (wide/horizontal)
- `1:2` - 1 column wide, 2 rows tall (tall/vertical)
- `2:2` - 2 columns wide, 2 rows tall (large square)

---

## 📊 Grid Layout Description

### Visual ASCII Grid

Describe layout using ASCII art with cell labels:

```
┌─────┬─────┬─────┬─────┐
│ A   │ B   │ B   │ C   │  Row 1
│ 1:2 │ 2:1       │ 1:2 │
├─────┼─────┼─────┼─────┤
│     │ D   │ E   │     │  Row 2
│     │ 1:1 │ 1:1 │     │
├─────┼─────┼─────┼─────┤
│ F   │ G   │ G   │ H   │  Row 3
│ 1:2 │ 2:1       │ 1:2 │
├─────┼─────┼─────┼─────┤
│     │ I   │ J   │     │  Row 4
│     │ 1:1 │ 1:1 │     │
└─────┴─────┴─────┴─────┘
 Col1  Col2  Col3  Col4
```

**Reading this:**
- **A (1:2)** - Starts at Col 1, Row 1, spans 1 column × 2 rows
- **B (2:1)** - Starts at Col 2, Row 1, spans 2 columns × 1 row
- **C (1:2)** - Starts at Col 4, Row 1, spans 1 column × 2 rows
- etc.

---

### Shorthand List Format

For quick communication:

```
Layout: 4-column bento, rowHeight=0.8fr

Cards:
1. Avatar Image (1:2) - Col 1, Rows 1-2
2. Quote (2:1) - Cols 2-3, Row 1
3. Business (1:2) - Col 4, Rows 1-2
4. Stack (1:1) - Col 2, Row 2
5. Years (1:1) - Col 3, Row 2
6. Fast (1:2) - Col 1, Rows 3-4
7. Delivery (2:1) - Cols 2-3, Row 3
8. Workspace (1:2) - Col 4, Rows 3-4
9. Team (1:1) - Col 2, Row 4
10. Innovation (1:1) - Col 3, Row 4
```

---

### Code Format (Most Precise)

Order cards in **visual reading order** (left-to-right, top-to-bottom):

```astro
<SectionBento rowHeight="0.8fr">
  <!-- Row 1-2, Col 1: Avatar (1:2) -->
  <BentoCard colSpan={1} rowSpan={2}>...</BentoCard>

  <!-- Row 1, Col 2-3: Quote (2:1) -->
  <BentoCard colSpan={2} rowSpan={1}>...</BentoCard>

  <!-- Row 1-2, Col 4: Business (1:2) -->
  <BentoCard colSpan={1} rowSpan={2}>...</BentoCard>

  <!-- Row 2, Col 2: Stack (1:1) -->
  <BentoCard colSpan={1} rowSpan={1}>...</BentoCard>

  <!-- Row 2, Col 3: Years (1:1) -->
  <BentoCard colSpan={1} rowSpan={1}>...</BentoCard>

  <!-- Continue... -->
</SectionBento>
```

---

## 🗣️ Communication Protocol

### When Describing a Layout

**Good:**
> "Chcę 4-column bento grid. Row height: 0.8fr (80%).
>
> Karty:
> - Col 1: Avatar image (1:2)
> - Cols 2-3: Quote (2:1)
> - Col 4: Feature (1:2)
> - Row 2, Cols 2-3: 2x małe (1:1)
> - Etc..."

**Even Better (ASCII):**
```
┌─────┬─────┬─────┬─────┐
│ Img │ Quote     │ Feat│
│ 1:2 │ 2:1       │ 1:2 │
│     ├─────┬─────┤     │
│     │ A   │ B   │     │
│     │ 1:1 │ 1:1 │     │
└─────┴─────┴─────┴─────┘
```

**Bad (ambiguous):**
> "Obraz na górze, potem quote, potem jakieś małe karty..."

---

### When Asking for Changes

**Good:**
> "W Row 1, Cols 2-3 mam teraz 2:1 quote, ale chcę 2x 1:1 features zamiast tego"

**Bad:**
> "Ten quote jest za szeroki, zmień na mniejsze"

---

## 📋 Bento Grid Configuration

### Grid Settings

**rowHeight** - Controls row aspect ratio:
- `1fr` - Square rows (100% of column width)
- `0.8fr` - 80% of column width (shorter rows)
- `0.6fr` - 60% of column width (very short rows)
- `200px` - Fixed pixel height
- `60%` - 60% of container width

**Columns:**
- Always 4 columns on desktop (base grid)
- Auto-collapse: 4 → 2 (tablet) → 1 (mobile)

---

## 🎨 Card Types & Spans

### Common Patterns

**1:1 (Small Square)**
- Use for: Short features, stats, small content blocks
- Padding: `sm` (8px)
- Content: SectionContent with short text

**2:1 (Wide/Horizontal)**
- Use for: Quotes, wide features, headlines
- Padding: `sm` or `md`
- Content: BlockQuote, SectionContent

**1:2 (Tall/Vertical)**
- Use for: Images, tall features, detailed content
- Padding: `sm` for text, `none` for images
- Content: SectionImage, SectionContent with more text

**2:2 (Large Square)**
- Use for: Hero images, major features
- Padding: `none` for images, `md` for content
- Content: Large SectionImage, rich SectionContent

---

## 🛠️ Developer-Friendly Config

### Ideal Format (Pseudo-Code)

```typescript
const bentoLayout = {
  grid: {
    columns: 4,
    rowHeight: '0.8fr',
  },
  cards: [
    { span: '1:2', content: 'avatar-image', col: 1, row: 1 },
    { span: '2:1', content: 'quote', col: 2, row: 1 },
    { span: '1:2', content: 'feature', col: 4, row: 1 },
    { span: '1:1', content: 'feature', col: 2, row: 2 },
    { span: '1:1', content: 'feature', col: 3, row: 2 },
    // ...
  ],
}
```

### Current Astro Implementation

```astro
<SectionBento rowHeight="0.8fr">
  {cards.map(card => (
    <BentoCard
      colSpan={card.colSpan}
      rowSpan={card.rowSpan}
      padding={card.padding}
    >
      {card.content}
    </BentoCard>
  ))}
</SectionBento>
```

**Is this easy for developers?**
✅ **YES** - Simple props, visual output with dev labels
❌ **NO** - Manual positioning can be tricky with `grid-auto-flow: dense`

---

## 🎯 Recommended Workflow

### 1. **Sketch Layout (ASCII)**
Draw the grid first:
```
┌────┬────┬────┬────┐
│ A  │ B  │ C  │ D  │
└────┴────┴────┴────┘
```

### 2. **Add Spans**
```
┌────┬─────────┬────┐
│ A  │    B    │ D  │
│1:2 │   2:1   │1:2 │
└────┴─────────┴────┘
```

### 3. **List Cards in Order**
```
1. A (1:2) - Avatar
2. B (2:1) - Quote
3. D (1:2) - Feature
```

### 4. **Implement in Astro**
```astro
<BentoCard colSpan={1} rowSpan={2}>Avatar</BentoCard>
<BentoCard colSpan={2} rowSpan={1}>Quote</BentoCard>
<BentoCard colSpan={1} rowSpan={2}>Feature</BentoCard>
```

### 5. **Verify with Dev Labels**
In browser (dev mode), check blue badges show correct spans

---

## 🚨 Common Mistakes

### ❌ Mistake: Confusing Column vs Row Count

**Wrong:**
> "Chcę 2:1 tall card"

**Right:**
> "Chcę 1:2 tall card" (1 column wide, 2 rows tall)

**Remember:** `colSpan:rowSpan` - columns first, then rows!

---

### ❌ Mistake: Overlapping Cells

**Problem:**
```
Row 1: [1:2] [2:1    ]
Row 2:       [1:1][1:1]  <- Gap in Col 1!
```

**Solution:**
Use `grid-auto-flow: dense` OR manually position all cards

---

### ❌ Mistake: Wrong Row Height Expectations

**Problem:**
> "Dlaczego 1:1 nie jest square?"

**Answer:**
- `rowHeight="1fr"` → 1:1 = square
- `rowHeight="0.8fr"` → 1:1 = rectangle (80% height)
- `rowHeight="200px"` → 1:1 = 1 column wide, 200px tall

---

## 📚 Example Layouts

### Layout 1: Balanced Mix
```
┌─────┬─────┬─────┬─────┐
│ Img │ Quote     │ Feat│
│ 1:2 │ 2:1       │ 1:2 │
│     ├─────┬─────┤     │
│     │ A   │ B   │     │
│     │ 1:1 │ 1:1 │     │
└─────┴─────┴─────┴─────┘

Cards: 1x (1:2) + 1x (2:1) + 1x (1:2) + 2x (1:1)
```

### Layout 2: Hero Image Focus
```
┌─────────────┬─────┬─────┐
│             │ A   │ B   │
│    Hero     │ 1:1 │ 1:1 │
│    2:2      ├─────┼─────┤
│             │ C   │ D   │
│             │ 1:1 │ 1:1 │
└─────────────┴─────┴─────┘

Cards: 1x (2:2) + 4x (1:1)
```

### Layout 3: Current Homepage
```
┌─────┬─────┬─────┬─────┐
│ Avt │ Quote     │ Biz │  Row 1
│ 1:2 │ 2:1       │ 1:2 │
│     ├─────┬─────┤     │
│     │ Stk │ Yrs │     │  Row 2
│     │ 1:1 │ 1:1 │     │
├─────┼─────┴─────┼─────┤
│ Fst │ Delivery  │ Wks │  Row 3
│ 1:2 │ 2:1       │ 1:2 │
│     ├─────┬─────┤     │
│     │ Tem │ Inn │     │  Row 4
│     │ 1:1 │ 1:1 │     │
└─────┴─────┴─────┴─────┘

Cards:
- 3x (1:2): Avatar, Business, Fast, Workspace
- 2x (2:1): Quote, Delivery
- 4x (1:1): Stack, Years, Team, Innovation

Total: 9 cards, 4 rows, 4 columns
```

---

## ✅ Best Practices

1. **Always specify span in comments:**
   ```astro
   <!-- Avatar (1:2) -->
   <BentoCard colSpan={1} rowSpan={2}>
   ```

2. **Use dev labels in development:**
   - Blue badges show `colSpan:rowSpan`
   - Verify layout visually

3. **Draw ASCII grid first:**
   - Prevents miscommunication
   - Easy to visualize

4. **Order cards logically:**
   - Top-to-bottom, left-to-right
   - OR by explicit row/col position

5. **Document rowHeight:**
   ```astro
   <SectionBento rowHeight="0.8fr"> <!-- 80% height = shorter cards -->
   ```

---

## 🎓 Quick Reference

**Span Notation:**
- `1:1` = small square
- `2:1` = wide horizontal
- `1:2` = tall vertical
- `2:2` = large square

**Row Height:**
- `1fr` = 100% (square 1:1)
- `0.8fr` = 80% (shorter)
- `0.6fr` = 60% (very short)

**Card Padding:**
- `none` = images
- `sm` = small cards (1:1)
- `md` = medium cards (default)
- `lg` = large content blocks

---

**Created:** 2025-10-05
**Status:** Documentation complete
