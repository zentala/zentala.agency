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
