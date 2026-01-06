# Build Warnings Cleanup

**Status:** Backlog (not started)
**Priority:** Low
**Estimated effort:** 4-6 hours

## 🎯 Goal

Fix all build warnings to have clean builds and avoid future Sass/Astro breaking changes.

## ⚠️ Current Warnings

### 1. SCSS Mixed Declarations (41 warnings)

**Issue:** Sass deprecation warning for declarations after nested rules

**Files affected:**
- `src/styles/components/_grids.scss:21`
- `src/styles/components/_home.scss:331`

**Fix:** Move declarations before nested rules
More info: https://sass-lang.com/d/mixed-decls

### 2. Content Collections Auto-generation

**Warning:** Auto-generating collections for "notes" - deprecated

**Fix:** Define collections explicitly in `src/content.config.ts`

### 3. TypeScript Unused Variables

**Files:**
- `src/components/solid-chat/components/treeview/TreeView.tsx` - unused vars
- `src/components/solid-chat/types/chat.ts` - unused types
- `src/pages/category/[category].astro:27` - unused Props

**Fix:** Remove or use these variables

### 4. JSDoc to TypeScript Types

**Files:**
- `src/components/solid-chat/utils/audioRecording.ts`

**Fix:** Convert JSDoc types to proper TypeScript types

## ✅ Success Criteria

```bash
npm run build
# Result: 0 errors, 0 warnings, 0 hints
```

---

**Next Steps:**
1. Fix SCSS mixed-decls (biggest issue)
2. Fix content collections config
3. Clean up TypeScript warnings
4. Verify clean build