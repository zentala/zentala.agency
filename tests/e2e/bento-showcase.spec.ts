import { expect, test } from '@playwright/test'

test.describe('Bento Showcase', () => {
  test('renders the featured tiles and keeps the approved typography color', async ({ page }) => {
    await page.goto('/')
    const section = page.locator('#bento-showcase')
    await expect(section).toBeVisible()

    const expectedHeadlines = [
      '20+ Years',
      'Innovation',
      'Business Focus',
      'Complete Stack',
      'Hands-On CTO for Innovation Projects',
      'Fast Execution',
    ]

    for (const headline of expectedHeadlines) {
      const heading = section.getByRole('heading', { name: headline, exact: true })
      await expect(heading).toBeVisible()
    }

    await expect(section.locator('.section-image')).toHaveCount(3)

    const headingColor = await section
      .locator('.section-content__body h3')
      .first()
      .evaluate((el) => getComputedStyle(el).color)
    expect(headingColor).toBe('rgb(17, 24, 39)')

    const paragraphColor = await section
      .locator('.section-content__body p')
      .first()
      .evaluate((el) => getComputedStyle(el).color)
    expect(paragraphColor).toBe('rgb(17, 24, 39)')
  })
})
