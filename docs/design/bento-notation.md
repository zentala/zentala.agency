# Bento grid notation

Moved from `.claude/CLAUDE.THEMING.md` (chapter "Bento Grid Notation System", 2026-11-20), which is retired. The span notation and the communication protocol still apply. Where the chapter shows borders or transparent-border mechanics, [DESIGN.md](../../DESIGN.md) section 3 wins: bento cards are transparent line-grid cells.

## 📐 Bento Grid Notation System

**NEW (2025-10-05):** Standardized communication protocol for Bento layouts.

### Span Notation: `colSpan:rowSpan`

**Format:** `[columns]:[rows]`

**Examples:**
- `1:1` - 1 column wide, 1 row tall (small square)
- `2:1` - 2 columns wide, 1 row tall (wide/horizontal)
- `1:2` - 1 column wide, 2 rows tall (tall/vertical)
- `2:2` - 2 columns wide, 2 rows tall (large square)

**CRITICAL:** Columns first, then rows! `2:1` = wide, `1:2` = tall

---

### Visual ASCII Grid Layout

Describe layouts using ASCII art with cell labels:

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

---

### Card Types & Common Patterns

**1:1 (Small Square)**
- Use for: Short features, stats, small content blocks
- Padding: `sm` (8px)
- Content: SectionContent with short text

**2:1 (Wide/Horizontal)**
- Use for: Quotes, wide features, headlines
- Padding: `sm` or `md`
- Content: SectionBlockQuote, SectionContent

**1:2 (Tall/Vertical)**
- Use for: Images, tall features, detailed content
- Padding: `sm` for text, `none` for images
- Content: SectionImage, SectionContent with more text

**2:2 (Large Square)**
- Use for: Hero images, major features
- Padding: `none` for images, `md` for content
- Content: Large SectionImage, rich SectionContent

---

### Row Height Configuration

**rowHeight** - Controls row aspect ratio via `<SectionBento>` prop:
- `1fr` - Square rows (100% of column width)
- `0.8fr` - 80% of column width (shorter rows) ⭐ Recommended
- `0.6fr` - 60% of column width (very short rows)
- `200px` - Fixed pixel height
- `60%` - 60% of container width

**Example:**
```astro
<SectionBento rowHeight="0.8fr">
  <!-- Cards with 80% height = more compact layout -->
</SectionBento>
```

**How it affects cards:**
- `rowHeight="1fr"` → 1:1 = square
- `rowHeight="0.8fr"` → 1:1 = rectangle (80% height)
- `rowHeight="0.6fr"` → 1:1 = very short rectangle

---

### Communication Protocol

**✅ Good (Clear spans):**
> "Chcę 4-column bento grid. Row height: 0.8fr.
>
> Karty:
> - Col 1: Avatar image (1:2)
> - Cols 2-3: Quote (2:1)
> - Col 4: Feature (1:2)
> - Row 2, Cols 2-3: 2x małe (1:1)"

**✅ Better (ASCII art):**
```
┌─────┬─────────┬─────┐
│ Img │ Quote   │ Feat│
│ 1:2 │ 2:1     │ 1:2 │
│     ├────┬────┤     │
│     │ A  │ B  │     │
│     │1:1 │1:1 │     │
└─────┴────┴────┴─────┘
```

**❌ Bad (ambiguous):**
> "Obraz na górze, potem quote, potem jakieś małe karty..."

---

### Code Format & Best Practices

**1. Always specify spans in comments:**
```astro
<!-- Avatar (1:2) - Col 1, Rows 1-2 -->
<BentoCard colSpan={1} rowSpan={2}>
  <SectionImage src="..." alt="..." />
</BentoCard>
```

**2. Order cards in visual reading order:**
Top-to-bottom, left-to-right (or use explicit positioning)

**3. Use dev labels in development:**
- Blue badges show `colSpan:rowSpan`
- Verify layout visually in browser

**4. Document rowHeight:**
```astro
<SectionBento rowHeight="0.8fr"> <!-- 80% height = shorter cards -->
```

---

### Common Mistakes

**❌ Mistake: Confusing Column vs Row Count**

**Wrong:**
> "Chcę 2:1 tall card"

**Right:**
> "Chcę 1:2 tall card" (1 column wide, 2 rows tall)

**Remember:** `colSpan:rowSpan` - columns first!

---

**❌ Mistake: Overlapping Cells**

**Problem:**
```
Row 1: [1:2] [2:1    ]
Row 2:       [1:1][1:1]  <- Gap in Col 1!
```

**Solution:** Use `grid-auto-flow: dense` (enabled by default in SectionBento)

---

**❌ Mistake: Wrong Row Height Expectations**

**Problem:**
> "Dlaczego 1:1 nie jest square?"

**Answer:**
- `rowHeight="1fr"` → 1:1 = square
- `rowHeight="0.8fr"` → 1:1 = rectangle (80% height)

---

### Example Layouts

**Layout 1: Current Homepage Pattern**
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
- 4x (1:2): Avatar, Business, Fast, Workspace
- 2x (2:1): Quote, Delivery
- 4x (1:1): Stack, Years, Team, Innovation

Total: 10 cards, 4 rows, 4 columns
```

---

**For complete Bento notation details:** [.claude/tasks/005_section_primitives/BENTO_NOTATION.md](../../.claude/tasks/005_section_primitives/BENTO_NOTATION.md)

---
