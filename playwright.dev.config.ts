import { defineConfig, devices } from '@playwright/test'

const PORT = 4321
const baseURL = `http://localhost:${PORT}`

/**
 * Playwright config for E2E tests that require the Astro dev server
 * (e.g. the blog version panel, which is dev-only and never present in `astro preview`).
 */
export default defineConfig({
  testDir: './tests/e2e',
  testMatch: 'blog-version-panel.spec.ts',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: `npm run dev -- --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
})
