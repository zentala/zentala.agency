import { test, expect } from '@playwright/test'

test('header adapts to pushed page width and navigation keeps scripts active', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 900 })
  await page.goto('/')
  await page.evaluate(() => {
    ;(window as any).__navigationVisit = true
    document.getElementById('header')!.style.width = '825px'
  })
  await expect(page.locator('.desktop-nav')).toBeHidden()
  await expect(page.locator('#mobile-toggle')).toBeVisible()
  await page.locator('#mobile-toggle').click()
  await expect(page.locator('#mobile-nav')).toBeVisible()
  await page.locator('#mobile-nav a[href="/blog"]').click()
  await expect(page).toHaveURL(/\/blog\/?$/)
  expect(await page.evaluate(() => (window as any).__navigationVisit)).toBe(true)
  await expect(page.locator('#mobile-nav')).toBeHidden()

  await page.locator('.post-card a[href^="/blog/"]').first().click()
  await expect(page.locator('#post-content')).toBeVisible()
  await page.setViewportSize({ width: 1920, height: 1080 })
  const heading = page.locator('#post-content h2[id]').first()
  await heading.evaluate((element) => window.scrollTo({
    top: element.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.2,
    behavior: 'instant',
  }))
  await expect(page.locator('.blog-toc__item.is-active')).not.toHaveCount(0)
  await page.goBack()
  await expect(page).toHaveURL(/\/blog\/?$/)
  await page.setViewportSize({ width: 400, height: 900 })
  await page.locator('#mobile-toggle').click()
  await expect(page.locator('#mobile-nav')).toBeVisible()
  await page.locator('#mobile-nav a[href="/"]').click()
  await expect(page).toHaveURL(/\/$/)
  await page.locator('#mobile-toggle').click()
  await expect(page.locator('#mobile-nav')).toBeVisible()
  const header = await page.locator('#header').boundingBox()
  const toggle = await page.locator('#mobile-toggle').boundingBox()
  expect(toggle!.x + toggle!.width).toBeLessThanOrEqual(header!.x + header!.width)
})
