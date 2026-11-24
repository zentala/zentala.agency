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
 * R3 (owner feedback 2026-11-24): the Portfolio cell had too much empty space under its last
 * button. The cell holds one link, the caption's last child is the button, and the distance from
 * the button's bottom to the cell's bottom is half the cell padding (at least 1rem), never more
 * than two button heights. The old caption padding (40px from 768px) fails the ceiling.
 */
const WIDTHS = [1536, 1024, 390]
const TOLERANCE_PX = 1
const MIN_BOTTOM_PX = 16
const MAX_BUTTON_HEIGHTS = 2

for (const width of WIDTHS) {
  test(`Portfolio cell ends close under its last button at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')

    const measured = await page.evaluate(() => {
      const link = document.querySelector<HTMLElement>('#bento-about-me a[href="/portfolio"]')
      const cell = link?.closest<HTMLElement>('.bento-card')
      const caption = link?.querySelector<HTMLElement>('.portfolio-caption')
      const lastButton = caption?.lastElementChild
      if (!cell || !caption || !lastButton) return null
      const button = lastButton.getBoundingClientRect()
      return {
        cellChildren: cell.children.length,
        isButton: lastButton.tagName === 'SPAN' && !!lastButton.textContent?.trim(),
        gap: cell.getBoundingClientRect().bottom - button.bottom,
        buttonHeight: button.height,
        cellPadding: parseFloat(getComputedStyle(caption).paddingLeft),
        borderBottom: parseFloat(getComputedStyle(cell).borderBottomWidth),
      }
    })

    expect(measured).not.toBeNull()
    expect(measured!.cellChildren).toBe(1)
    expect(measured!.isButton).toBe(true)
    const expected = Math.max(MIN_BOTTOM_PX, measured!.cellPadding / 2)
    expect(Math.abs(measured!.gap - measured!.borderBottom - expected)).toBeLessThanOrEqual(
      TOLERANCE_PX,
    )
    expect(measured!.gap).toBeLessThanOrEqual(
      measured!.buttonHeight * MAX_BUTTON_HEIGHTS + TOLERANCE_PX + measured!.borderBottom,
    )
  })
}
