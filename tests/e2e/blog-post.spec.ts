import { test, expect, type Page } from '@playwright/test'

// Published posts only: the suite runs against the production build, where drafts do not exist.
const SERIES_POST = '/blog/devex-purpose'
const SERIES_NEXT_POST = '/blog/how-to-deal-with-resistance-when-implementing-dev-portal'
const STANDALONE_POST = '/blog/future-of-agentic-ai-automation'
const LONG_POST = '/blog/ia'

const WIDE = { width: 1440, height: 900 }
const NARROW_VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
]
const MIN_LINE_HEIGHT_RATIO = 1.6

async function open(page: Page, path: string, viewport = WIDE) {
  await page.setViewportSize(viewport)
  await page.goto(path)
  await page.evaluate(() => document.fonts?.ready)
}

test.describe('Blog post page', () => {
  test('article body is set at a readable line height', async ({ page }) => {
    await open(page, SERIES_POST)
    const { fontSize, lineHeight } = await page
      .locator('#post-content p')
      .first()
      .evaluate((el) => {
        const style = getComputedStyle(el)
        return {
          fontSize: parseFloat(style.fontSize),
          lineHeight: parseFloat(style.lineHeight),
        }
      })
    expect(lineHeight).toBeGreaterThanOrEqual(fontSize * MIN_LINE_HEIGHT_RATIO)
  })

  test('inline code shows no literal backticks', async ({ page }) => {
    await open(page, LONG_POST)
    const inlineCode = page.locator('#post-content :not(pre) > code').first()
    if ((await inlineCode.count()) === 0) test.skip(true, 'no inline code in post')
    const content = await inlineCode.evaluate((el) => ({
      before: getComputedStyle(el, '::before').content,
      after: getComputedStyle(el, '::after').content,
    }))
    expect(content.before).not.toContain('`')
    expect(content.after).not.toContain('`')
  })

  test('series rail shows the series title, not its slug', async ({ page }) => {
    await open(page, SERIES_POST)
    const rail = page.locator('aside nav[aria-label="Series navigation"]')
    await expect(rail).toBeVisible()
    await expect(rail).not.toContainText('developer-experience')
    await expect(rail.getByRole('link', { name: /See all \d+ parts/ })).toBeVisible()
  })

  for (const viewport of NARROW_VIEWPORTS) {
    test(`end-of-article navigation and collapsible lists at ${viewport.width}px`, async ({
      page,
    }) => {
      await open(page, SERIES_POST, viewport)

      const postNav = page.locator('[data-post-nav]')
      await postNav.scrollIntoViewIfNeeded()
      await expect(postNav).toBeVisible()
      await expect(
        postNav.getByRole('link', { name: /All \d+ parts/ }),
      ).toBeVisible()
      await expect(postNav.locator(`a[href="${SERIES_NEXT_POST}"]`)).toBeVisible()

      const seriesDetails = page.locator('[data-series-details]')
      await expect(seriesDetails).toBeVisible()
      await seriesDetails.locator('summary').click()
      await expect(seriesDetails.getByRole('navigation')).toBeVisible()

      const tocDetails = page.locator('[data-toc-details]')
      await expect(tocDetails).toBeVisible()
      await tocDetails.locator('summary').click()
      await expect(tocDetails.getByRole('link').first()).toBeVisible()
    })
  }

  test('a post outside a series ends with related posts or the blog link', async ({
    page,
  }) => {
    await open(page, STANDALONE_POST)
    const postNav = page.locator('[data-post-nav]')
    await expect(postNav.getByRole('link', { name: /All posts/ })).toBeVisible()
  })

  test('long post has one h1, a full TOC and no horizontal scroll at 390px', async ({
    page,
  }) => {
    await open(page, LONG_POST, NARROW_VIEWPORTS[0])
    await expect(page.locator('h1')).toHaveCount(1)

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    )
    expect(overflow).toBe(0)

    const toc = page.locator('[data-toc-details]')
    await toc.locator('summary').click()
    await expect(toc.getByRole('link', { name: 'Appendices' })).toBeVisible()
    await expect(toc.getByRole('link', { name: 'Conclusion' })).toBeVisible()
  })
})
