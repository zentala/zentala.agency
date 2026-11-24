/**
 * Header shrink: 88 px at the top, 61 px (bottom line included) once scrolled, from 771 px up;
 * nav icons from 1201 px; the mobile header keeps its hamburger below 771 px.
 */
import { test, expect, type Page } from '@playwright/test'

const TOP_PX = 88
const SCROLLED_PX = 61
const TOLERANCE_PX = 1
const SHRINK_TRANSITION_MS = 600
const PAGE_WITH_SCROLL = '/blog'

async function headerHeight(page: Page) {
  return page.locator('header').first().evaluate((el) => el.getBoundingClientRect().height)
}

for (const width of [771, 1024, 1440]) {
  test(`header shrinks from ${TOP_PX} to ${SCROLLED_PX} px on scroll at ${width} px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 })
    await page.goto(PAGE_WITH_SCROLL)
    expect(Math.abs((await headerHeight(page)) - TOP_PX)).toBeLessThanOrEqual(TOLERANCE_PX)
    await page.evaluate(() => window.scrollTo(0, 600))
    await page.waitForTimeout(SHRINK_TRANSITION_MS)
    expect(Math.abs((await headerHeight(page)) - SCROLLED_PX)).toBeLessThanOrEqual(TOLERANCE_PX)
  })
}

test('nav shows 18 px icons from 1201 px and none below', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 800 })
  await page.goto(PAGE_WITH_SCROLL)
  const icons = page.locator('.desktop-nav [data-icon-px="18"]')
  expect(await icons.count()).toBeGreaterThan(0)
  await expect(icons.first()).toBeVisible()
  await page.setViewportSize({ width: 1100, height: 800 })
  await expect(icons.first()).toBeHidden()
})

test('mobile header below 771 px keeps its menu button', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(PAGE_WITH_SCROLL)
  await expect(page.locator('header button').first()).toBeVisible()
})
