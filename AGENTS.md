# Repository instructions

All published site content is English. The hub chat defaults to English for instructions, greetings and prompts, and replies in the visitor's language. Draft translations must remain unpublished until ready.

## Development and verification

- Astro 5 static site, TypeScript, React islands, Tailwind and SCSS.
- Install dependencies with `npm-install-internal.cmd`; `@internal/*` comes from the private Gitea registry configured in `.npmrc`. Never commit registry credentials.
- `npm run dev` starts development; `npm run build` runs Astro type checking and builds `dist/`.
- `npm run test:unit` runs Vitest; `npm run test:e2e` runs Playwright against the preview server. Build first. CI sets `PUBLIC_PLAYWRIGHT_TEST=true` to disable the external chat for link tests.
- Read [DESIGN.md](DESIGN.md) before visual changes.
- Run `just check` for the build/typecheck, unit suite and critical Playwright flow. The check uses the existing tools; maintain it following the shared `just-check` skill. Use `npm run test:e2e` for the full browser suite.

## Critical workflows

- Navigate through the header and return with browser Back without a full document reload.
- Open the hamburger menu after navigation, including when a side panel reduces the available header width.
- Enter a blog post from the feed and highlight its current section in the table of contents.
- Before delivery of chat changes, additionally verify the live hub iframe keeps its document, conversation and open panel through three internal links and Back at 1200px and 1920px, using a real browser with scrollbars.

## Navigation and hub chat

The shared layout uses Astro `ClientRouter` and `@internal/hub-chat-astro/HubChat.astro`. Keep the package embed once in the layout; do not replace it with a plain widget script. The hub owns chat behavior and English chat configuration.

Initialize page elements on `astro:page-load`. Module scripts execute once; inline body scripts can execute on each swap. Register document/window listeners once, and disconnect observers and clear timers on `astro:before-swap`. The header must respond to its available container width, including when the chat panel pushes it.

## Delivery

Work in an isolated worktree and preserve unrelated changes. Fetch and update from `origin/main` before committing/integrating. Commit each completed step. Verify the source and critical browser flows before merging.

Push verified changes to `main` to trigger `.github/workflows/deploy.yml`: link tests, Astro build, then GitHub Pages deployment. Watch the workflow and verify https://zentala.agency after deployment; a successful local build alone is not deployment evidence. Private package access must work in CI before delivery can be considered complete.
