import { test, expect } from '@playwright/test'

const POST_URL = '/blog/autonomous-agents-on-backstage'

test.describe('Blog Version Panel', () => {
  test('panel mounts on blog post in dev', async ({ page }) => {
    await page.goto(POST_URL)
    const panel = page.locator(
      '[aria-label="Blog version history"], [aria-label="Expand blog version panel"]',
    )
    await expect(panel.first()).toBeVisible({ timeout: 15_000 })
  })

  test('timeline shows at least one entry', async ({ page }) => {
    await page.goto(POST_URL)
    const rows = page.locator('[role="listitem"][data-sha]')
    await expect(rows.first()).toBeVisible({ timeout: 20_000 })
    expect(await rows.count()).toBeGreaterThan(0)
  })

  test('Ctrl+H toggles panel collapsed state', async ({ page }) => {
    await page.goto(POST_URL)
    const expanded = page.locator('[aria-label="Blog version history"]')
    await expect(expanded).toBeVisible({ timeout: 15_000 })
    await page.keyboard.press('Control+h')
    const collapsed = page.locator('[aria-label="Expand blog version panel"]')
    await expect(collapsed).toBeVisible()
    await page.keyboard.press('Control+h')
    await expect(expanded).toBeVisible()
  })

  test('clicking a SHA enters snapshot mode and writes URL hash', async ({ page }) => {
    await page.goto(POST_URL)
    const firstRow = page.locator('[role="listitem"][data-sha]').first()
    await expect(firstRow).toBeVisible({ timeout: 20_000 })
    const sha = await firstRow.getAttribute('data-sha')
    expect(sha).toBeTruthy()
    await firstRow.click()
    const article = page.locator('#post-content')
    await expect(article).toHaveAttribute('data-snapshot-sha', sha!, { timeout: 15_000 })
    expect(page.url()).toContain(`#v=${sha}`)
  })

  test('snapshot mode replaces article body, restores when switching to live', async ({ page }) => {
    await page.goto(POST_URL)
    const firstRow = page.locator('[role="listitem"][data-sha]').first()
    await expect(firstRow).toBeVisible({ timeout: 20_000 })
    const originalText = await page.locator('#post-content').innerText()
    await firstRow.click()
    await expect(page.locator('#post-content')).toHaveAttribute('data-snapshot-sha', /.+/, {
      timeout: 15_000,
    })
    const livePill = page.locator('[role="tab"]', { hasText: 'Live' })
    await livePill.click()
    await expect(page.locator('#post-content')).not.toHaveAttribute('data-snapshot-sha', /.+/)
    const restored = await page.locator('#post-content').innerText()
    expect(restored).toBe(originalText)
  })

  test('history endpoint returns valid JSON in dev', async ({ request }) => {
    const res = await request.get(`/api/dev/history/blog/autonomous-agents-on-backstage.json`)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.collection).toBe('blog')
    expect(Array.isArray(body.entries)).toBe(true)
    expect(body.entries.length).toBeGreaterThan(0)
    expect(body.entries[0]).toHaveProperty('sha')
    expect(body.entries[0]).toHaveProperty('shortSha')
    expect(body.entries[0]).toHaveProperty('isMajor')
  })

  test('version endpoint returns body + html for a real SHA', async ({ request }) => {
    const histRes = await request.get(`/api/dev/history/blog/autonomous-agents-on-backstage.json`)
    const hist = await histRes.json()
    const sha = hist.entries[0].sha as string
    const verRes = await request.get(
      `/api/dev/version/blog/autonomous-agents-on-backstage/${sha}.json`,
    )
    expect(verRes.status()).toBe(200)
    const body = await verRes.json()
    expect(body.sha).toBe(sha)
    expect(typeof body.body).toBe('string')
    expect(typeof body.html).toBe('string')
    expect(body.html.length).toBeGreaterThan(0)
  })

  test('invalid collection returns 400', async ({ request }) => {
    const res = await request.get('/api/dev/history/secrets/foo.json')
    expect(res.status()).toBe(400)
  })

  test('invalid slug returns 400', async ({ request }) => {
    const res = await request.get('/api/dev/history/blog/Bad Slug.json')
    expect([400, 404]).toContain(res.status())
  })
})
