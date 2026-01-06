# Image Placeholder Component

**Status:** Backlog (not started)
**Priority:** Medium
**Estimated effort:** 1 day

## 🎯 Goal

Create reusable `<ImagePlaceholder />` primitive component for fallback when images are missing or loading.

## 🎨 Design Spec

### Visual Design
- **Background:** Black (#000)
- **Center:** logo.ext.svg with padding
- **Background decoration:** 2 random Lucide icons
  - Opacity: 10-15%
  - Partially overflow (cut off edges)
  - Random selection from icon set
- **Animation:** Pulsing effect (like heartbeat) during image loading

### Usage
- **Initial:** Homepage only (index.astro)
- **Future:** Everywhere images are missing (blog, portfolio, etc.)

## 🛠️ Technical Spec

### Component API
```astro
<ImagePlaceholder
  loading={true}      // Shows pulse animation
  icons={['code', 'rocket']}  // Optional: specific icons, else random
/>
```

### Animation States
1. **Loading:** Pulsing animation (1.5s cycle)
2. **Static:** No animation (when this IS the final image)

## 📁 File Location

`src/components/primitives/ImagePlaceholder.astro`

## 🎲 Icon Selection Strategy

**Options:**
1. **Random per load** - different icons each time
2. **Fixed set** - same icons always
3. **Per category** - blog vs portfolio different icons

**Decision needed:** Which approach?

## ✅ Success Criteria

- [ ] Component created in primitives/
- [ ] Logo centered with proper padding
- [ ] 2 background icons with low opacity
- [ ] Icons partially overflow container
- [ ] Pulsing animation works smoothly
- [ ] Implemented on homepage
- [ ] Documented in CLAUDE.THEMING.md

---

**Next Steps:**
1. Choose icon selection strategy
2. Create component
3. Add to homepage
4. Test responsive behavior
5. Document usage pattern