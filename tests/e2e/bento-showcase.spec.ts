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
 * button. The cell has no padding of its own; the caption layer supplies it (p-6 / p-10 at the
 * sides and top, pb-4 under the button, the same 16px the avatar overlay keeps). The distance from the button's bottom to the cell's bottom must equal that
 * bottom padding plus the cell border and nothing else: no empty element, reserved row or margin
 * below the button. Expected values are fixed pixels, not read back from the caption's style.
 */
const CASES = [
  { width: 1536, expectedPadding: 16 },
  { width: 1024, expectedPadding: 16 },
  { width: 390, expectedPadding: 16 },
]
const TOLERANCE_PX = 1

for (const { width, expectedPadding } of CASES) {
  test(`Portfolio cell ends ${expectedPadding}px under its last button at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')

    const measured = await page.evaluate(() => {
      const link = document.querySelector<HTMLElement>('#bento-about-me a[href="/portfolio"]')
      const cell = link?.closest<HTMLElement>('.bento-card')
      const lastButton = link?.querySelector<HTMLElement>('.portfolio-caption')?.lastElementChild
      if (!cell || !lastButton) return null
      return {
        cellChildren: cell.children.length,
        isButton: lastButton.tagName === 'SPAN' && !!lastButton.textContent?.trim(),
        gap: cell.getBoundingClientRect().bottom - lastButton.getBoundingClientRect().bottom,
        borderBottom: parseFloat(getComputedStyle(cell).borderBottomWidth),
      }
    })

    expect(measured).not.toBeNull()
    expect(measured!.cellChildren).toBe(1)
    expect(measured!.isButton).toBe(true)
    expect(Math.abs(measured!.gap - measured!.borderBottom - expectedPadding)).toBeLessThanOrEqual(
      TOLERANCE_PX,
    )
  })
}
