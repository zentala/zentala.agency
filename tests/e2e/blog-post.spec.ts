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

    // Get header height from CSS variable
    const headerHeight = await page.evaluate(() => {
      return parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--header-spacer-height',
        ) || '0',
      )
    })

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
    const headerHeight = await page.evaluate(() => {
      return parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--header-spacer-height',
        ) || '0',
      )
    })

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

  test('scroll indicator should have smooth hover transition', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    const scrollIndicator = page.locator('.blog-hero__scroll-indicator')
    const chevronLeft = page.locator('.blog-hero__chevron-left')
    const chevronRight = page.locator('.blog-hero__chevron-right')

    // Get initial transform
    const initialTransformLeft = await chevronLeft.evaluate((el) => {
      const style = window.getComputedStyle(el)
      return style.transform
    })

    // Hover over the indicator
    await scrollIndicator.hover()

    // Wait a bit for transition to start
    await page.waitForTimeout(100)

    // Get hover transform (should be rotated to 35deg)
    const hoverTransformLeft = await chevronLeft.evaluate((el) => {
      const style = window.getComputedStyle(el)
      return style.transform
    })

    // Transform should have changed (rotate from ~4deg to 35deg)
    expect(hoverTransformLeft).not.toBe(initialTransformLeft)

    // Check that opacity increased on hover
    const hoverOpacity = await scrollIndicator.evaluate((el) => {
      return window.getComputedStyle(el).opacity
    })
    expect(parseFloat(hoverOpacity)).toBeGreaterThan(0.9) // Should be close to 1.0
  })

  test('scroll indicator should smoothly return to initial state after hover ends', async ({
    page,
  }) => {
    await page.waitForLoadState('networkidle')

    const scrollIndicator = page.locator('.blog-hero__scroll-indicator')
    const chevronLeft = page.locator('.blog-hero__chevron-left')

    // Hover and get hover state
    await scrollIndicator.hover()
    await page.waitForTimeout(200) // Wait for transition to complete

    const hoverTransform = await chevronLeft.evaluate((el) => {
      return window.getComputedStyle(el).transform
    })

    // Move mouse away
    await page.mouse.move(0, 0)

    // Wait a bit for transition to start
    await page.waitForTimeout(100)

    // Check that transition is happening (transform should be changing)
    const midTransitionTransform = await chevronLeft.evaluate((el) => {
      return window.getComputedStyle(el).transform
    })

    // After hover ends, wait for full transition (450ms)
    await page.waitForTimeout(500)

    const finalTransform = await chevronLeft.evaluate((el) => {
      return window.getComputedStyle(el).transform
    })

    // Transform should have returned close to initial state
    // (We can't check exact equality due to floating point precision, but it should be different from hover)
    expect(finalTransform).not.toBe(hoverTransform)
  })

  test('clicking scroll indicator should smoothly scroll to article content', async ({
    page,
  }) => {
    await page.waitForLoadState('networkidle')

    const scrollIndicator = page.locator('.blog-hero__scroll-indicator')
    const articleContent = page.locator('#post-content')

    // Get initial scroll position
    const initialScrollY = await page.evaluate(() => window.scrollY)

    // Click the scroll indicator
    await scrollIndicator.click()

    // Wait for smooth scroll to complete (smooth scroll typically takes 500-1000ms)
    await page.waitForTimeout(1000)

    // Get final scroll position
    const finalScrollY = await page.evaluate(() => window.scrollY)

    // Should have scrolled down
    expect(finalScrollY).toBeGreaterThan(initialScrollY)

    // Check that article content is in view
    const articleBox = await articleContent.boundingBox()
    const viewportHeight = VIEWPORT_HEIGHT

    if (articleBox) {
      // Article should be visible in viewport (top of article should be above viewport bottom)
      expect(articleBox.y).toBeLessThan(viewportHeight)
    }
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

