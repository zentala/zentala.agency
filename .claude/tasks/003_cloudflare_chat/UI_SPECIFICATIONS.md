# Cloudflare Chat - UI/UX Specifications

## Visual Design Specifications

This document provides precise visual specifications for implementing the Cloudflare Chat expandable UI.

---

## 1. Layout States

### 1.1 Normal State (Chat Collapsed)

```
┌─────────────────────────────────────────────────┐
│ Header (fixed)                                  │
├─────────────────────────────────────────────────┤
│                                              ║C ║
│                                              ║H ║
│        Main Content Area                     ║A ║
│        (.container-bordered)                 ║T ║
│                                              ║  ║
│                                              ║C ║
│                                              ║H ║
│                                              ║A ║
│                                              ║T ║
└─────────────────────────────────────────────────┘
         Full width container              30px
                                         Trigger
```

### 1.2 Expanded State (Chat Open)

```
┌─────────────────────────────────────────────────┐
│ Header (fixed)                                  │
├────────────────────────────────┬───┬────────────┤
│                                │ C │            │
│                                │ H │   Chat     │
│   Main Content Area            │ A │   Panel    │
│   (.container-bordered)        │ T │            │
│                                │   │            │
│                                │ C │   500px    │
│                                │ H │            │
│                                │ A │            │
│                                │ T │            │
└────────────────────────────────┴───┴────────────┘
    Container (auto width)       30px    Chat
    Right border removed       Trigger   Panel
```

### 1.3 Mobile State (Overlay)

```
┌─────────────────────────────────┐
│ Header (fixed)               [×]│ ← Close button
├─────────────────────────────────┤
│                              ║C ║
│                              ║H ║
│     Chat Panel               ║A ║
│     (Full Screen)            ║T ║
│                              ║  ║
│     100% width               ║C ║
│                              ║H ║
│     Over backdrop            ║A ║
│                              ║T ║
└─────────────────────────────────┘
```

---

## 2. Chat Trigger Bar Specifications

### 2.1 Dimensions

| Breakpoint | Width | Height | Position |
|------------|-------|--------|----------|
| Desktop (>1000px) | 30px | 100vh - header | Fixed right: 0 |
| Tablet (771-1000px) | 24px | 100vh - header | Fixed right: 0 |
| Mobile (<771px) | 24px | 100vh - header | Fixed right: 0 |

### 2.2 Typography

**Vertical Text:**
- Font size: 12px (desktop), 10px (mobile)
- Font weight: 500 (Medium)
- Text transform: UPPERCASE
- Letter spacing: 0.2em (desktop), 0.15em (mobile)
- Color: rgba(255, 255, 255, 0.3) normal
- Color: rgba(255, 255, 255, 0.6) hover
- Writing mode: `vertical-rl`
- Transform: `rotate(180deg)` (so text reads bottom-to-top)

**Text Spacing:**
- Gap between "CHAT" labels: 80px (desktop), 60px (mobile)
- Top padding: 40px (desktop), 30px (mobile)

### 2.3 Colors & Borders

| State | Background | Border Left | Border Right |
|-------|-----------|-------------|--------------|
| Normal | #000 (black) | 1px solid #1f2937 | none |
| Hover | #111827 (gray-900) | 1px solid #374151 | none |
| Active | #111827 | 1px solid #374151 | none |

### 2.4 Visual Example (ASCII)

```
┃  C   ← Rotated 90° counter-clockwise
┃  H   ← Letter-spacing: 0.2em
┃  A   ← Font-size: 12px
┃  T   ← Color: rgba(255,255,255,0.3)
┃
┃  ↕ 80px gap
┃
┃  C
┃  H
┃  A
┃  T
┃
┃  ↕ 80px gap
┃
┃  C
┃  H
┃  A
┃  T
```

---

## 3. Chat Panel Specifications

### 3.1 Dimensions

| Breakpoint | Width | Height | Position |
|------------|-------|--------|----------|
| Desktop (>1440px) | 500px | 100vh - header | Fixed right: 0 |
| Large (1001-1440px) | 450px | 100vh - header | Fixed right: 0 |
| Medium (771-1000px) | 400px | 100vh - header | Fixed right: 0 |
| Tablet/Mobile (<771px) | 100% | 100vh - header | Fixed right: 0 |

### 3.2 Panel Structure

```
┌──────────────────────────────┐
│ Header                    [×]│ ← 1.5rem padding
│ "Cloudflare Chat"            │   Border bottom: 1px
├──────────────────────────────┤
│                              │
│                              │
│   Content Area               │ ← Flex: 1
│   (Scrollable)               │   Padding: 1.5rem
│   Placeholder message        │
│                              │
│                              │
├──────────────────────────────┤
│ Footer                       │ ← 1rem padding
│ "Powered by Cloudflare..."   │   Border top: 1px
└──────────────────────────────┘
```

### 3.3 Colors & Styling

**Panel Background:**
- Base color: #000 (black)
- Grid pattern overlay:
  - Line color: rgba(255, 255, 255, 0.02)
  - Grid size: 50px × 50px
  - Implementation: CSS linear-gradient

**Borders:**
- Left border: 1px solid #1f2937 (gray-800)
- Internal dividers: 1px solid #1f2937

**Text Colors:**
- Heading (h3): #fff (white)
- Body text: rgba(255, 255, 255, 0.5)
- Muted text: rgba(255, 255, 255, 0.3)

### 3.4 Header Section

```
Cloudflare Chat                      [×]
─────────────────────────────────────────
```

- Padding: 1.5rem (24px)
- Display: flex, justify-content: space-between
- H3 styling:
  - Font size: 1rem (16px)
  - Font weight: 600 (Semi-bold)
  - Text transform: UPPERCASE
  - Letter spacing: 0.05em
  - Color: #fff

- Close button (×):
  - Size: 32px × 32px
  - Font size: 2rem
  - Color: rgba(255, 255, 255, 0.5)
  - Hover: rgba(255, 255, 255, 0.9)
  - Display: none on desktop (use trigger bar instead)

### 3.5 Content Section

```
┌──────────────────────────────┐
│                              │
│                              │
│    Chat panel placeholder    │ ← Centered
│                              │
│  API integration coming...   │ ← Muted
│                              │
│                              │
└──────────────────────────────┘
```

- Padding: 1.5rem (24px)
- Display: flex, flex-direction: column
- Overflow-y: auto
- Placeholder:
  - Text align: center
  - Vertical align: center (flex center)
  - Font size: 1rem (primary text)
  - Font size: 0.875rem (muted text)

### 3.6 Footer Section

```
─────────────────────────────────────────
    Powered by Cloudflare Workers AI
```

- Padding: 1rem 1.5rem (16px 24px)
- Text align: center
- Font size: 0.75rem (12px)
- Color: rgba(255, 255, 255, 0.3)
- Border top: 1px solid #1f2937

---

## 4. Animations & Transitions

### 4.1 Panel Slide Animation

```scss
.chat-panel {
  transition: transform 0.3s ease-in-out;
  transform: translateX(100%); // Hidden
}

body.chat-expanded .chat-panel {
  transform: translateX(0); // Visible
}
```

**Timing:**
- Duration: 300ms
- Easing: ease-in-out
- Property: transform (GPU accelerated)

### 4.2 Trigger Bar Hover

```scss
.chat-trigger {
  transition: background 0.2s ease-in-out;
}

.chat-trigger:hover {
  background: #111827;
}

.chat-trigger:hover span {
  transition: color 0.2s ease-in-out;
  color: rgba(255, 255, 255, 0.6);
}
```

**Timing:**
- Duration: 200ms
- Easing: ease-in-out
- Properties: background-color, color

### 4.3 Container Border Fade

```scss
.container-bordered {
  transition: border-color 0.3s ease-in-out;
}

body.chat-expanded .container-bordered {
  border-right-color: transparent;
}
```

### 4.4 Mobile Backdrop

```scss
body.chat-expanded::before {
  content: '';
  opacity: 0;
  animation: fadeIn 0.3s ease-in-out forwards;
}

@keyframes fadeIn {
  to { opacity: 1; }
}
```

---

## 5. Responsive Breakpoints

### 5.1 Breakpoint Reference

| Name | Min Width | Max Width | Trigger Width | Panel Width |
|------|-----------|-----------|---------------|-------------|
| Mobile | - | 480px | 24px | 100% |
| Tablet | 481px | 770px | 24px | 100% |
| Medium | 771px | 1000px | 30px | 400px |
| Large | 1001px | 1440px | 30px | 450px |
| Desktop | 1441px | - | 30px | 500px |

### 5.2 Layout Behavior

**Desktop (>1000px):**
- Side-by-side layout (container + trigger + panel)
- Content container adjusts width automatically
- Panel slides in from right
- No backdrop overlay

**Tablet/Mobile (<1000px):**
- Overlay layout (panel over content)
- Panel takes full width
- Dark backdrop with blur (rgba(0,0,0,0.7) + 4px blur)
- Close button visible in panel header
- Body scroll locked when open

---

## 6. Grid Pattern Details

### 6.1 Implementation

```scss
background-image:
  linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
background-size: 50px 50px;
```

### 6.2 Visual Effect

```
  |   |   |   |   |   |
──┼───┼───┼───┼───┼───┼──
  |   |   |   |   |   |
──┼───┼───┼───┼───┼───┼──
  |   |   |   |   |   |
──┼───┼───┼───┼───┼───┼──
  |   |   |   |   |   |
```

- Line thickness: 1px
- Line color: rgba(255, 255, 255, 0.02) (very subtle)
- Grid spacing: 50px × 50px (matches existing site grid)

---

## 7. Accessibility Indicators

### 7.1 Focus States

**Trigger Button:**
```scss
.chat-trigger:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: -2px;
}
```

**Close Button:**
```scss
.chat-panel-close:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
}
```

### 7.2 Visual Feedback

- **Hover**: Background color change + border highlight
- **Active**: Maintain hover state
- **Focus**: Visible outline (keyboard navigation)
- **Disabled**: Not applicable (no disabled state)

---

## 8. Container Border Behavior

### 8.1 Normal State

```
┌─────────────────────────────────────────┐
│ .container-bordered                     │
│ border-left: 1px solid #1f2937          │
│ border-right: 1px solid #1f2937         │
│                                         │
└─────────────────────────────────────────┘
```

### 8.2 Expanded State

```
┌──────────────────────────────┬───┬──────┐
│ .container-bordered          │ T │ Chat │
│ border-left: 1px solid       │ r │      │
│ border-right: transparent    │ i │      │
│                              │ g │      │
└──────────────────────────────┴───┴──────┘
                                │
                    Border "moves" to trigger
```

**Implementation:**
```scss
body.chat-expanded .container-bordered {
  border-right-color: transparent;
}

.chat-trigger {
  border-left: 1px solid #1f2937;
  border-right: 1px solid #1f2937;
}
```

---

## 9. Z-Index Layering

```
Layer 5: Header (z-index: 50)
         Mobile Nav (z-index: 1100)
         ▼
Layer 4: Mobile Chat Panel (z-index: 45)
         ▼
Layer 3: Chat Panel Desktop (z-index: 40)
         Chat Trigger (z-index: 40)
         Mobile Overlay (z-index: 40)
         ▼
Layer 2: Mobile Backdrop (z-index: 39)
         ▼
Layer 1: Page Content (z-index: auto)
```

---

## 10. Color Palette Reference

| Element | Color Variable | Hex Value | Usage |
|---------|---------------|-----------|-------|
| Background | `#000` | Black | Panel, trigger, page |
| Border | `$border-color` | #1f2937 | Dividers, edges |
| Border Hover | `$border-color-hover` | #374151 | Interactive states |
| Text Primary | `#fff` | White | Headings |
| Text Secondary | `rgba(255,255,255,0.5)` | 50% white | Body text |
| Text Muted | `rgba(255,255,255,0.3)` | 30% white | Helper text |
| Hover BG | `#111827` | Gray-900 | Trigger hover |
| Grid Lines | `rgba(255,255,255,0.02)` | 2% white | Background pattern |

---

## 11. Typography Scale

| Element | Size | Weight | Transform | Letter Spacing |
|---------|------|--------|-----------|----------------|
| Panel Header (h3) | 16px (1rem) | 600 | UPPERCASE | 0.05em |
| Trigger Text | 12px (desktop) | 500 | UPPERCASE | 0.2em |
| Trigger Text (mobile) | 10px | 500 | UPPERCASE | 0.15em |
| Body Text | 16px (1rem) | 400 | none | 0 |
| Muted Text | 14px (0.875rem) | 400 | none | 0 |
| Footer Text | 12px (0.75rem) | 400 | none | 0 |

---

## 12. Spacing System

### 12.1 Internal Padding

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Panel Header | 1.5rem (24px) | 1.5rem | 1.5rem |
| Panel Content | 1.5rem (24px) | 1.5rem | 1.5rem |
| Panel Footer | 1rem (16px) | 1rem | 1rem |
| Trigger Vertical | 40px (top) | 30px | 30px |

### 12.2 Gaps & Margins

| Element | Size |
|---------|------|
| Trigger text gap | 80px (desktop), 60px (mobile) |
| Section dividers | 1px border |
| Focus outline offset | 2px (outside), -2px (inside) |

---

## 13. Interactive States Summary

### 13.1 Trigger Bar

| State | Background | Text Color | Border |
|-------|-----------|------------|--------|
| Normal | #000 | rgba(255,255,255,0.3) | #1f2937 |
| Hover | #111827 | rgba(255,255,255,0.6) | #374151 |
| Focus | #000 | rgba(255,255,255,0.3) | #1f2937 + outline |
| Active | #111827 | rgba(255,255,255,0.6) | #374151 |

### 13.2 Close Button

| State | Color | Background |
|-------|-------|------------|
| Normal | rgba(255,255,255,0.5) | transparent |
| Hover | rgba(255,255,255,0.9) | transparent |
| Focus | rgba(255,255,255,0.5) | transparent + outline |
| Active | rgba(255,255,255,0.9) | transparent |

---

## 14. Design Mockup (ASCII)

### Desktop Layout (Expanded)

```
┌─────────────────────────────────────────────────────────────────┐
│ Header: Żentała Innovation Agency          Home | Offer | Blog  │
├──────────────────────────────────┬──┬───────────────────────────┤
│                                  │ ║│ Cloudflare Chat        [×]│
│   ┌──────────────────────────┐   │C║├───────────────────────────┤
│   │ Hero Section             │   │H║│                           │
│   │                          │   │A║│   Chat panel placeholder  │
│   │   Hands-On CTO for       │   │T║│                           │
│   │   Innovation Projects    │   │ ║│   API integration coming  │
│   │                          │   │C║│   in Task 004             │
│   │   [Contact Me]           │   │H║│                           │
│   └──────────────────────────┘   │A║│                           │
│                                  │T║│                           │
│   ┌──────────────────────────┐   │ ║│                           │
│   │ Services Grid            │   │C║│                           │
│   │ ┌──────┬──────┬──────┐   │   │H║│                           │
│   │ │ IoT  │ BS   │ Rapid│   │   │A║├───────────────────────────┤
│   │ └──────┴──────┴──────┘   │   │T║│ Powered by Cloudflare AI  │
│   └──────────────────────────┘   │ ║└───────────────────────────┘
│                                  │ ║          500px
└──────────────────────────────────┴──┴───────────────────────────┘
        Container (auto)           30px
```

### Mobile Layout (Overlay)

```
┌────────────────────────────┐
│ Header                  [≡]│
├────────────────────────────┤
│ Cloudflare Chat         [×]│ ← Chat overlay
├────────────────────────────┤
│                            │
│  Chat panel placeholder    │
│                            │
│  API integration coming... │
│                            │
│                            │
│                            │
├────────────────────────────┤
│ Powered by Cloudflare AI   │
└────────────────────────────┘
      (100% width)
```

---

## 15. Visual Testing Checklist

### Desktop (>1000px)
- [ ] Trigger bar 30px wide, positioned at right edge
- [ ] Text "CHAT" repeated 3 times vertically
- [ ] Text rotated 90° counter-clockwise (reads bottom-to-top)
- [ ] 80px gap between "CHAT" labels
- [ ] Hover changes background to #111827
- [ ] Click expands panel smoothly (300ms)
- [ ] Panel slides in from right (500px wide)
- [ ] Container right border becomes transparent
- [ ] Grid pattern visible in panel background
- [ ] No layout shift or content jump

### Tablet (771-1000px)
- [ ] Trigger bar 24px wide
- [ ] Panel 400px wide when expanded
- [ ] All other desktop behaviors same

### Mobile (<771px)
- [ ] Trigger bar 24px wide
- [ ] Panel 100% width (full screen)
- [ ] Close button (×) visible in panel header
- [ ] Dark backdrop visible behind panel
- [ ] Backdrop blur effect (4px)
- [ ] Body scroll locked when panel open
- [ ] Tap outside closes panel

### Accessibility
- [ ] Tab key focuses trigger bar
- [ ] Enter/Space toggles panel
- [ ] Escape closes panel
- [ ] Focus outline visible (2px white)
- [ ] ARIA attributes correct (`aria-expanded`, `aria-label`)
- [ ] Screen reader announces panel state changes

### Cross-browser
- [ ] Chrome: All animations smooth
- [ ] Firefox: Grid pattern renders correctly
- [ ] Safari: Transform animations work
- [ ] Edge: No visual glitches

---

**Document Version**: 1.0
**Last Updated**: 2025-10-03
**Design System**: Zentala.agency Grid System v2