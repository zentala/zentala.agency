set windows-shell := ["pwsh", "-NoProfile", "-Command"]

export PUBLIC_PLAYWRIGHT_TEST := 'true'
export SKIP_BROWSERSLIST_UPDATE := '1'

# Type checking, unit coverage and the critical navigation flow.
check:
    npm run build
    npm run test:unit -- --maxWorkers=1 --hookTimeout=60000
    npx playwright test tests/e2e/client-navigation.spec.ts --project=chromium --headed --workers=1
