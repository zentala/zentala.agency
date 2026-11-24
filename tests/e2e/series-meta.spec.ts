import { expect, test } from '@playwright/test'

/** Two-line post meta and the series page rows (DESIGN.md "Series block", E007-T30j). */
const SERIES_SLUG = 'developer-experience'
const SERIES_POST = '/blog/devex-purpose'
const WIDE = { width: 1440, height: 900 }
const NARROW = { width: 390, height: 844 }
const X_TOLERANCE_PX = 1

test.describe('Post meta and series rows', () => {
  test('a series post shows date and tags on line one, "Part n of series" on line two', async ({
    page,
  }) => {
    await page.setViewportSize(WIDE)
    await page.goto(SERIES_POST)
    const date = page.locator('[data-blog-date]').first()
    const lineOne = date.locator('xpath=ancestor::div[1]')
    const lineTwo = lineOne.locator('xpath=following-sibling::p[1]')
    await expect(lineTwo).toContainText(/Part\s+\d+\s+of\s+Developer Experience/)
    await expect(lineTwo.getByRole('link')).toHaveAttribute(
      'href',
      `/series/${SERIES_SLUG}`,
    )
    const [one, two] = await Promise.all([lineOne.boundingBox(), lineTwo.boundingBox()])
    expect(two!.y).toBeGreaterThan(one!.y + one!.height - 1)
  })

  for (const viewport of [WIDE, NARROW]) {
    test(`series page uses rows, not corner-badge cards, at ${viewport.width}px`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport)
      await page.goto(`/series/${SERIES_SLUG}`)
      await expect(page.locator('.post-card')).toHaveCount(0)
      await expect(page.locator('.series-part .draft-tag--corner')).toHaveCount(0)
      const titles = page.locator('.series-part__title')
      expect(await titles.count()).toBeGreaterThanOrEqual(2)
      const xs = await titles.evaluateAll((els) =>
        els.map((el) => el.getBoundingClientRect().x),
      )
      for (const x of xs) expect(Math.abs(x - xs[0])).toBeLessThanOrEqual(X_TOLERANCE_PX)
      const wrapped = await page
        .locator('.series-part .status-badge')
        .evaluateAll((els) =>
          els.filter((el) => el.getClientRects().length > 1).length,
        )
      expect(wrapped).toBe(0)
    })
  }
})
