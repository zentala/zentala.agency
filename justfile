set windows-shell := ["pwsh", "-NoProfile", "-Command"]

# specs that guard the critical pages and the line grid
critical_specs := "tests/e2e/blog-post.spec.ts tests/e2e/bento-showcase.spec.ts tests/e2e/series-linkedin-preview.spec.ts tests/e2e/series-meta.spec.ts tests/e2e/line-geometry.spec.ts tests/e2e/header-shrink.spec.ts tests/e2e/left-edge.spec.ts tests/e2e/contact-form.spec.ts tests/e2e/logo-wall.spec.ts tests/e2e/font-match.spec.ts"

# list recipes
default:
    @just --list

# install dependencies
setup:
    npm ci

# start the dev server under PM3 (http://agency.internal)
dev:
    pm3 start dev

# astro check + production build
build:
    npm run build

# serve the production build
preview:
    npm run preview -- --host 127.0.0.1

# unit tests
test:
    npm run test:unit

# astro type check only
typecheck:
    npx astro check

# eslint
lint:
    npm run lint

# eslint with autofix, then prettier
fix:
    npm run lint:fix; npm run format

# check every outgoing link of the built site (run `just build` first), write .cache/links/report.json, notify via ntfy (LAN only)
links:
    node scripts/links/cli.mjs dist --notify

# check the outgoing links of the live site (sitemap crawl), notify via ntfy (LAN only)
links-live:
    node scripts/links/cli.mjs live --notify

# pre-commit gate: lint, build (widget off, as in CI), unit tests, prod-bundle audit, critical e2e on chromium
check:
    npm run lint
    $env:PUBLIC_PLAYWRIGHT_TEST = 'true'; npm run build
    npm run test:unit
    npm run audit:prod
    $env:PUBLIC_PLAYWRIGHT_TEST = 'true'; npx playwright test --project=chromium {{critical_specs}}

# remove build output
clean:
    Remove-Item -Recurse -Force -ErrorAction SilentlyContinue dist, .astro
