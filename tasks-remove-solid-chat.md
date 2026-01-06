# Sync: Remove `solid-chat` (Flowise/Solid embed) safely

This is a mid-dev friendly runbook. Follow it top-to-bottom to remove the embedded chat without breaking the site.

## Goal

Remove `src/components/solid-chat/**` and all integration points so the website builds and runs without the chat.

## Non-goals

- Replacing chat with a new solution
- Styling/design of any future chat
- Any backend/Flowise infrastructure changes

## Current wiring (quick context)

- **Global render**: `src/layouts/Layout.astro` imports and renders `<Chatbot />`
- **Chat gate**: `src/components/Chatbot.astro` uses `import.meta.env.FLOWISE_CHAT_ENABLED === 'true'`
- **Chat code**: `src/components/solid-chat/**`
- **Astro integration**: `astro.config.mjs` includes `solidJs({ include: ['src/components/solid-chat/**/*'] })`

## Preconditions

- You are on a clean working tree (no unrelated changes).
- You can run `npm ci` and `npm run build` locally.
- You understand that **pushing is out of scope** here (someone else will push after verification).

## Execution checklist (do in this order)

### 1) Remove global chat usage from the layout

1. Edit `src/layouts/Layout.astro`:
   - Remove `import Chatbot from '../components/Chatbot.astro'`
   - Remove `<Chatbot />`
   - Remove the commented legacy script line (`init-chat.js`) if it is no longer relevant
2. Verify:
   - `rg "Chatbot\\.astro|<Chatbot" src -n` returns **0 matches**

### 2) Delete `Chatbot.astro`

1. Delete `src/components/Chatbot.astro`
2. Verify:
   - `rg "Chatbot\\.astro|<Chatbot" src -n` returns **0 matches**

### 3) Delete the entire `solid-chat` directory

1. Delete directory `src/components/solid-chat/`
2. Verify:
   - `rg "solid-chat" src -n` returns **0 matches**

### 4) Remove Solid integration from Astro config

1. Edit `astro.config.mjs`:
   - Remove `import solidJs from '@astrojs/solid-js'`
   - Remove `solidJs({ include: ['src/components/solid-chat/**/*'] })` from `integrations`
2. Verify:
   - `npm run build` succeeds

### 5) Dependency cleanup (only if unused)

Do not blindly delete dependencies—verify usage first.

1. Search usage:
   - `rg "@astrojs/solid-js|solid-js|solid-element|fetch-event-source|device-detector-js" -S .`
2. If unused after removal, remove the relevant packages from `package.json`.
3. Verify:
   - `npm ci` succeeds
   - `npm run build` succeeds

### 6) Remove chat assets only if unused

1. Check whether `public/chat.svg` is referenced:
   - `rg "/chat\\.svg|chat\\.svg" src public -n`
2. If unused, delete `public/chat.svg`.
3. Verify:
   - `npm run build` succeeds

### 7) Test + acceptance

- Build:
  - `npm run build`
- E2E (links):
  - `npm run test:e2e` (or at minimum run the link suite if you have a dedicated script)

## Definition of Done (DoD)

- No `solid-chat` code remains in repo.
- No Solid integration remains in `astro.config.mjs` (unless used elsewhere).
- `npm run build` passes.
- Link E2E checks pass.
- No chat UI appears on any page.

## Suggested commit message

- `Remove solid-chat integration`
