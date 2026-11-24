import { expect, test } from '@playwright/test'

test.describe('Homepage bento showcase', () => {
  test('shows BentoAboutMe section with key content and the CTA section', async ({
    page,
  }) => {
    await page.goto('/')

    const bento = page.locator('#bento-about-me')
    await expect(bento).toBeVisible()
    await expect(
      bento.getByRole('heading', { name: 'Discovery & Strategy' }),
    ).toBeVisible()
    await expect(
      bento.getByRole('heading', {
        name: 'Your Hands-On CTO for an innovative project',
      }),
    ).toBeVisible()

    const portfolioLink = bento.getByRole('link', { name: /See the portfolio/i })
    await expect(portfolioLink).toBeVisible()
    await expect(portfolioLink).toHaveAttribute('href', '/portfolio')

    const cta = page.locator('#cta')
    await expect(cta).toBeVisible()
  })
})

/**
 * R3 (owner feedback 2026-11-24): no empty slot under the last button of the home Portfolio
 * cell. The distance from the bottom of its last button to the bottom of the cell must be the
 * cell's own bottom padding, and the same padding the text cells around it use.
 */
const WIDTHS = [1536, 1024, 390]
const TOLERANCE_PX = 1

for (const width of WIDTHS) {
  test(`Portfolio cell ends one cell padding under its last button at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')

    const measured = await page.evaluate(() => {
      const link = document.querySelector<HTMLElement>(
        '#bento-about-me a[href="/portfolio"]',
      )
      const cell = link?.closest<HTMLElement>('.bento-card')
      const caption = link?.querySelector<HTMLElement>('.portfolio-caption')
      const lastButton = link?.querySelector<HTMLElement>('.portfolio-caption > span:last-child')
      const textCell = document.querySelector<HTMLElement>(
        '#bento-about-me .bento-card--padding-sm',
      )
      if (!cell || !caption || !lastButton || !textCell) return null
      return {
        gap: cell.getBoundingClientRect().bottom - lastButton.getBoundingClientRect().bottom,
        captionPadding: parseFloat(getComputedStyle(caption).paddingBottom),
        textCellPadding: parseFloat(getComputedStyle(textCell).paddingBottom),
      }
    })

    expect(measured).not.toBeNull()
    expect(Math.abs(measured!.gap - measured!.captionPadding)).toBeLessThanOrEqual(TOLERANCE_PX)
    expect(Math.abs(measured!.captionPadding - measured!.textCellPadding)).toBeLessThanOrEqual(
      TOLERANCE_PX,
    )
  })
}
