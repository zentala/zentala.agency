# Build error: SolidJS primitives import

**Problem:**  
Build fails with errors like `'Show' cannot be used as a JSX component` in `Bot.tsx`.  
Cause: SolidJS primitives (`For`, `Show`, `Switch`, `Match`) are imported from `solid-js/web` instead of `solid-js`.

**Fix:**  
Change import in `src/components/solid-chat/components/Bot.tsx` to:
import { For, Show, Switch, Match } from 'solid-js'

**Note:**  
Other files use correct import.  
This is required for SolidJS v1.6+ and Astro integration.

# Build errors: SolidJS/TypeScript/Astro integration

## 1. SolidJS primitives import

- All components must import `For`, `Show`, `Switch`, `Match` from `solid-js`, not `solid-js/web`.

## 2. Compilation as React instead of SolidJS

- All errors about `class`/`className`, style props, event handlers, SVG props, etc. are due to the code being type-checked as React, not SolidJS.
- Check Astro and Vite config: ensure SolidJS integration is active for all `solid-chat` files.
- Check `tsconfig.json`:
  - `"jsx": "preserve"`
  - `"jsxImportSource": "solid-js"`
  - Path aliases for `@/` and `@astrojs/solid-js` present.

## 3. Remove all React-specific types/imports

- No `import React` or React types in any `solid-chat` file.
- All event handler types, SVG types, etc. must be from SolidJS.

## 4. Fix event handler and ref types

- Use SolidJS event types and ref patterns.

## 5. Fix invalid HTML/SVG props

- Only use allowed values for `type` (no `"menu"`).
- Fix all ref assignments to match element types.

## 6. Defensive checks for possibly undefined values

- Add checks before using possibly undefined objects (e.g. in `[category].astro`).

## 7. After config fixes, re-run build and address any remaining per-file errors.

## Detailed per-file checklist (extracted from build.log)

> NOTE Po każdej zmianie uruchom `npm run build` – lista błędów powinna się skracać. Poniżej znajdują się wszystkie pliki zgłaszające **errors** w `build.log` oraz konkretne zadania do wykonania.

### Global

- `tsconfig.json`
  - add `"jsxImportSource": "solid-js"` under `compilerOptions`
  - optionally add `"types": ["solid-js"]` to silence DOM attribute typings

---

### src/components/solid-chat/components/Bot.tsx

- ✅ import from `solid-js` (poprawione)
- camelCase inline styles:
  - `background-color` → `backgroundColor`
  - `margin-right`|`margin-left` if present
- `<Show> / <For> / <Switch>` errors będą znikać po poprawce `tsconfig.json`

### src/components/solid-chat/components/FeedbackContentDialog.tsx

- camelCase all inline style keys (`background-color` → `backgroundColor`)
- `rows` attr powinien być liczbą => `rows={4}`
- `ref`-y: użyj `ref={el => (inputRef = el)}` bez castów
- usuń atrybut `class` warnings po `tsconfig` fix – nie dotykać

### src/components/solid-chat/components/TypingBubble.tsx

- camelCase style keys if any
- brak React-owych handlerów (`onChange` ➜ `onInput`, itp.)

### src/components/solid-chat/components/avatars/Avatar.tsx + DefaultAvatar.tsx

- `<Show>` errors (znikną po config)
- camelCase `background-color` etc.

### src/components/solid-chat/components/bubbles/\*_/_

Wszystkie bubble-komponenty mają te same klasy błędów:

1. camelCase style keys (`backgroundColor`, `fontSize`, `whiteSpace`, `marginRight`, `marginLeft`)
2. Usuń `type="menu"` → `type="button"`
3. Event types: `onClick={(e) => ...}` ok, ale `onChange={(e) => ...}` na inputach ➜ użyj `onInput`
4. Ref casts => funkcje

Lista plików:

- AgentReasoningBubble.tsx
- BotBubble.tsx
- FollowUpPromptBubble.tsx
- GuestBubble.tsx
- LeadCaptureBubble.tsx
- LoadingBubble.tsx
- SourceBubble.tsx
- StarterPromptBubble.tsx

### src/components/solid-chat/components/buttons/\*_/_

- Usuń `type="menu"`
- camelCase style keys
- Spinner components use `<Show>` – OK po config

### src/components/solid-chat/components/icons/\*_/_

- SVGs: zamień `class` → `className` **tylko** wewnątrz pliku `.svg|tsx` **jeśli** nadal błąd po config (SolidJS SVGProps oczekuje `class` ale TS typy od Reacta wymagają `className` – po dodaniu `jsxImportSource` problem zniknie ⇒ zostawić `class`)

### src/components/solid-chat/components/inputs/textInput/\*_/_

- camelCase style keys (`fontFamily`, `fontSize`)
- Replace React event types (`onChange`) with SolidJS (`onInput` + proper event typing)
- Ref casts ➜ funkcja

### src/components/solid-chat/components/treeview/\*_/_

- Import `Dynamic` może pozostać z `solid-js/web`
- `<Show>` errors znikną po config
- camelCase style
- Replace React specific props (`children` expecting ReactNode) – po config zniknie

### src/components/solid-chat/features/\*_/_

- Bubble / Full / Popup components: te same poprawki (style keys, event types, `<Show>` etc.)

### src/pages/category/[category].astro

- Guard against undefined: `if (!categoryDescriptionEntry) return` …

---

## Search-and-replace hints

1. **Imports** `import { For, Show, Switch, Match } from 'solid-js/web'` ⇒ `from 'solid-js'`
2. **Bad button type** `type="menu"` ⇒ `type="button"`
3. **Inline style keys** Regex `'(background|font|white|margin|transform|z)-[a-z-]+'` → convert to camelCase.

Po wykonaniu powyższych kroków ponownie uruchom `npm run build`. Pozostałe błędy, jeśli się pojawią, będą już specyficzne i łatwe do poprawienia.
