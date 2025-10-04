# Chat Feature Flag - Build Optimization

**Status:** Backlog (not started)
**Priority:** Low
**Estimated effort:** 2-4 hours

## 🎯 Problem

Bubble.js (866kB) builds even when chat is disabled via feature flag, bloating bundle size unnecessarily.

## 🔍 Current State

**Build warning:**
```
dist/_astro/Bubble.D7HDOqhJ.js  866.14 kB │ gzip: 215.28 kB
(!) Some chunks are larger than 500 kB after minification.
```

**Feature flag:** Exists in `.env` (check `.env.example`)

## ✅ Solution

Implement conditional import based on environment variable:

```typescript
// Only import/build if chat enabled
const CHAT_ENABLED = import.meta.env.PUBLIC_CHAT_ENABLED === 'true'

if (CHAT_ENABLED) {
  // Import chat components
}
```

## 📁 Files to Check

- `src/components/Chatbot.astro`
- `src/layouts/Layout.astro` (where Chatbot is imported)
- `.env.example` - feature flag definition
- `astro.config.mjs` - possible conditional integration

## ✅ Success Criteria

- [ ] Chat only builds when feature flag enabled
- [ ] Build size reduced when chat disabled
- [ ] No breaking changes when chat enabled
- [ ] Documentation updated

## 📊 Expected Impact

**Bundle size reduction:** ~866kB (215kB gzipped) when chat disabled

---

**Next Steps:**
1. Check current feature flag implementation
2. Add conditional import logic
3. Test both enabled/disabled states
4. Update docs