import { test, expect } from '@playwright/test'

const POST_URL = '/blog/autonomous-agents-on-backstage'

test.describe('Blog Version Panel', () => {
  test('panel mounts on blog post in dev', async ({ page }) => {
    await page.goto(POST_URL)
    const panel = page.locator('[aria-label="Blog version history"], [aria-label="Expand blog version panel"]')
    await expect(panel.first()).toBeVisible({ timeout: 10_000 })
  })

  test('timeline shows at least one entry', async ({ page }) => {
    await page.goto(POST_URL)
    await page.waitForResponse((res) => res.url().includes('/api/dev/history/'))
    const rows = page.locator('[role="listitem"][data-sha]')
    await expect(rows.first()).toBeVisible({ timeout: 10_000 })
  })

  test('Ctrl+H toggles panel collapsed state', async ({ page }) => {
    await page.goto(POST_URL)
    const expanded = page.locator('[aria-label="Blog version history"]')
    await expect(expanded).toBeVisible({ timeout: 10_000 })
    await page.keyboard.press('Control+h')
    const collapsed = page.locator('[aria-label="Expand blog version panel"]')
    await expect(collapsed).toBeVisible()
    await page.keyboard.press('Control+h')
    await expect(expanded).toBeVisible()
  })

  test('clicking a SHA enters snapshot mode and writes URL hash', async ({ page }) => {
    await page.goto(POST_URL)
    await page.waitForResponse((res) => res.url().includes('/api/dev/history/'))
    const firstRow = page.locator('[role="listitem"][data-sha]').first()
    const sha = await firstRow.getAttribute('data-sha')
    await firstRow.click()
    await page.waitForResponse((res) => res.url().includes('/api/dev/version/'))
    const url = page.url()
    expect(url).toContain(`#v=${sha}`)
    const article = page.locator('#post-content')
    await expect(article).toHaveAttribute('data-snapshot-sha', sha!)
  })
})
