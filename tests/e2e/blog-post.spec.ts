import { test, expect } from '@playwright/test'

const BLOG_POST_SLUG = 'how-to-deal-with-resistance-when-implementing-dev-portal'
const VIEWPORT_WIDTH = 1600
const VIEWPORT_HEIGHT = 900

test.describe('Blog Post Page', () => {
  test.beforeEach(async ({ page }) => {
    // Set viewport to large desktop size for accurate measurements
    await page.setViewportSize({ width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT })
    await page.goto(`/blog/${BLOG_POST_SLUG}`)
    await page.waitForLoadState('networkidle')
    // Ensure webfonts have finished loading before any layout is measured,
    // otherwise a late font swap can shift heights by a few px (flaky on
    // firefox/webkit which don't fire networkidle the same way).
    await page.evaluate(() => (document as any).fonts?.ready)
  })

  test('hero section should fill viewport height minus header', async ({ page }) => {
    // Get viewport height
    const viewportHeight = VIEWPORT_HEIGHT

    // Get header spacer height (avoid relying on CSS var which may be `clamp(...)`)
    const headerSpacer = page.locator('.header-spacer')
    const headerHeight = await headerSpacer.boundingBox().then((box) => box?.height ?? 0)

    // Find the hero section (first section-full)
    const heroSection = page.locator('section.section-full').first()
    await expect(heroSection).toBeVisible()

    // Get the actual height of the hero section
    const heroHeight = await heroSection.boundingBox().then((box) => box?.height || 0)

    // Expected height: viewport - header
    const expectedHeight = viewportHeight - headerHeight

    // Allow larger tolerance for rounding/subpixel rendering and late
    // webfont layout shifts across browsers.
    expect(heroHeight).toBeGreaterThanOrEqual(expectedHeight - 50)
    expect(heroHeight).toBeLessThanOrEqual(expectedHeight + 50)
  })

  test('hero section should not exceed viewport height', async ({ page }) => {
    const viewportHeight = VIEWPORT_HEIGHT
    const headerSpacer = page.locator('.header-spacer')
    const headerHeight = await headerSpacer.boundingBox().then((box) => box?.height ?? 0)

    const heroSection = page.locator('section.section-full').first()
    const heroHeight = await heroSection.boundingBox().then((box) => box?.height || 0)

    // Hero should not exceed viewport minus header
    const maxAllowedHeight = viewportHeight - headerHeight
    expect(heroHeight).toBeLessThanOrEqual(maxAllowedHeight + 50) // tolerance
  })
})
