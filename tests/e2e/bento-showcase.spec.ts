import { expect, test } from '@playwright/test'

test.describe('Homepage intro (vision.md)', () => {
  test('shows Intro + Positioning + Current focus sections', async ({ page }) => {
    await page.goto('/')

    const intro = page.locator('#intro')
    await expect(intro).toBeVisible()
    await expect(
      intro.getByRole('heading', { name: 'Hands-On CTO for Innovation Projects' }),
    ).toBeVisible()

    const positioning = page.locator('#positioning')
    await expect(positioning).toBeVisible()
    await expect(
      positioning.getByRole('heading', {
        name: 'Not Just a Developer. Hands-On CTO With Business & UX Understanding.',
      }),
    ).toBeVisible()

    const focus = page.locator('#focus')
    await expect(focus).toBeVisible()
    await expect(focus.getByRole('heading', { name: 'Current focus' })).toBeVisible()

    // Only Backstage card is clickable for now
    const backstageLink = focus.getByRole('link', { name: 'Explore Backstage offer' })
    await expect(backstageLink).toBeVisible()
    await expect(backstageLink).toHaveAttribute('href', '/offer/backstage')
  })
})
