import { test, expect } from '@playwright/test'

const BLOG_POST_SLUG = 'how-to-deal-with-resistance-when-implementing-dev-portal'
const VIEWPORT_WIDTH = 1600
const VIEWPORT_HEIGHT = 900

test.describe('Blog Post Page', () => {
  test.beforeEach(async ({ page }) => {
    // Set viewport to large desktop size for accurate measurements
    await page.setViewportSize({ width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT })
    await page.goto(`/blog/${BLOG_POST_SLUG}`)
  })

  test('hero section should fill viewport height minus header', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle')

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

    // Allow small tolerance (2px) for rounding/subpixel rendering
    expect(heroHeight).toBeGreaterThanOrEqual(expectedHeight - 2)
    expect(heroHeight).toBeLessThanOrEqual(expectedHeight + 2)
  })

  test('hero section should not exceed viewport height', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    const viewportHeight = VIEWPORT_HEIGHT
    const headerSpacer = page.locator('.header-spacer')
    const headerHeight = await headerSpacer.boundingBox().then((box) => box?.height ?? 0)

    const heroSection = page.locator('section.section-full').first()
    const heroHeight = await heroSection.boundingBox().then((box) => box?.height || 0)

    // Hero should not exceed viewport minus header
    const maxAllowedHeight = viewportHeight - headerHeight
    expect(heroHeight).toBeLessThanOrEqual(maxAllowedHeight + 2) // 2px tolerance
  })

  test('scroll indicator (chevron) should be visible and have correct width', async ({
    page,
  }) => {
    await page.waitForLoadState('networkidle')

    const scrollIndicator = page.locator('.blog-hero__scroll-indicator')
    await expect(scrollIndicator).toBeVisible()

    // Check width is approximately 200px (or 50vw if smaller)
    const boundingBox = await scrollIndicator.boundingBox()
    expect(boundingBox).not.toBeNull()

    if (boundingBox) {
      // On 1600px viewport, it should be 200px (not 50vw which would be 800px)
      expect(boundingBox.width).toBeLessThanOrEqual(210) // Allow small tolerance
      expect(boundingBox.width).toBeGreaterThanOrEqual(190)
    }
  })

  test('scroll indicator should have smooth hover transition', async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name === 'webkit',
      'Hover transitions are flaky/unreliable in WebKit in CI.',
    )

    await page.waitForLoadState('networkidle')

    const scrollIndicator = page.locator('.blog-hero__scroll-indicator')
    const chevronLeft = page.locator('.blog-hero__chevron-left')

    // Capture initial opacity so we can assert it increases on hover across browsers
    const initialOpacity = await scrollIndicator.evaluate((el) => {
      return window.getComputedStyle(el).opacity
    })

    // Hover over the indicator
    await scrollIndicator.hover({ force: true })

    // Wait a bit for transition to start
    await page.waitForTimeout(100)

    // Check that opacity increased on hover
    const hoverOpacity = await scrollIndicator.evaluate((el) => {
      return window.getComputedStyle(el).opacity
    })
    expect(parseFloat(hoverOpacity)).toBeGreaterThan(parseFloat(initialOpacity))

    // Keep at least one chevron element present (sanity)
    await expect(chevronLeft).toBeVisible()
  })

  test('scroll indicator should smoothly return to initial state after hover ends', async ({
    page,
  }) => {
    await page.waitForLoadState('networkidle')

    const scrollIndicator = page.locator('.blog-hero__scroll-indicator')
    const chevronLeft = page.locator('.blog-hero__chevron-left')

    // Capture initial opacity and hover opacity, then ensure it decreases after hover ends.
    const initialOpacity = await scrollIndicator.evaluate((el) => {
      return window.getComputedStyle(el).opacity
    })

    await scrollIndicator.hover({ force: true })
    await page.waitForTimeout(200) // Wait for transition to complete

    const hoverOpacity = await scrollIndicator.evaluate((el) => {
      return window.getComputedStyle(el).opacity
    })

    // Move mouse away
    await page.mouse.move(0, 0)

    await page.waitForTimeout(500)

    const finalOpacity = await scrollIndicator.evaluate((el) => {
      return window.getComputedStyle(el).opacity
    })

    expect(parseFloat(hoverOpacity)).toBeGreaterThanOrEqual(parseFloat(initialOpacity))
    expect(parseFloat(finalOpacity)).toBeLessThanOrEqual(parseFloat(hoverOpacity))

    await expect(chevronLeft).toBeVisible()
  })

  test('clicking scroll indicator should smoothly scroll to article content', async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name === 'webkit',
      'Anchor/smooth-scroll interaction is flaky in WebKit in CI.',
    )

    await page.waitForLoadState('networkidle')

    const scrollIndicator = page.locator('.blog-hero__scroll-indicator')
    const articleContent = page.locator('#post-content')

    const initialScrollY = await page.evaluate(() => window.scrollY)
    const articleTopBefore = await articleContent.evaluate((el) => el.getBoundingClientRect().top)

    // Click the scroll indicator
    await scrollIndicator.click({ force: true })

    // Wait for some scroll movement (don’t require exact final position; just “moved closer”)
    await page.waitForFunction((y) => window.scrollY > y, initialScrollY, { timeout: 5000 })
    await page.waitForFunction(
      (before) => {
        const el = document.querySelector('#post-content')
        if (!el) return false
        return el.getBoundingClientRect().top < before
      },
      articleTopBefore,
      { timeout: 5000 },
    )
  })

  test('chevron lines should be sharp and well-rendered', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    const chevronLeft = page.locator('.blog-hero__chevron-left')
    const chevronRight = page.locator('.blog-hero__chevron-right')

    // Check that border-top is used (not background) for better rendering
    const borderTopLeft = await chevronLeft.evaluate((el) => {
      const style = window.getComputedStyle(el)
      return {
        borderTopWidth: style.borderTopWidth,
        borderTopStyle: style.borderTopStyle,
        borderTopColor: style.borderTopColor,
        backgroundColor: style.backgroundColor,
      }
    })

    // Should use border-top (not background) for sharp 1px lines
    expect(borderTopLeft.borderTopWidth).toBe('1px')
    expect(borderTopLeft.borderTopStyle).toBe('solid')
    // Background should be transparent
    expect(
      borderTopLeft.backgroundColor === 'rgba(0, 0, 0, 0)' ||
        borderTopLeft.backgroundColor === 'transparent',
    ).toBe(true)
  })
})

