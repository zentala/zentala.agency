import { expect, test, type Locator, type Page } from '@playwright/test'

/**
 * Technology logo wall on /about/capabilities (owner feedback 2026-11-24, R7, R9, R13): every logo is centred in
 * its cell at rest, the hover belongs to one cell, a tile with a note expands over its neighbours without moving
 * any grid rect, the keyboard reaches every tile, and a tap toggles the note.
 */

const ROUTE = '/about/capabilities'
const WALL = '.logo-wall'
const ITEM = '.logo-wall__item'
const TILE = '.logo-wall__tile'
const LOGO_COUNT = 32
const CENTRE_TOLERANCE_PX = 1
const EDGE_TOLERANCE_PX = 1
const SETTLE_MS = 450
const MAX_REDUCED_SECONDS = 0.001
const LAST_CELL_INDEX = LOGO_COUNT - 1

type Box = { x: number; y: number; width: number; height: number }

const itemRects = (page: Page) =>
  page.$$eval(ITEM, (items) =>
    items.map((item) => {
      const r = item.getBoundingClientRect()
      return { x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: r.height }
    }),
  )

const box = async (locator: Locator): Promise<Box> => {
  const found = await locator.boundingBox()
  if (!found) throw new Error('element has no box')
  return found
}

const openRoute = async (page: Page) => {
  await page.goto(ROUTE)
  await page.locator(WALL).scrollIntoViewIfNeeded()
}

for (const width of [1536, 390]) {
  test.describe(`logo wall at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } })

    test('every logo is centred in its cell at rest', async ({ page }) => {
      await openRoute(page)
      const cells = await page.$$eval(ITEM, (items) =>
        items.map((item) => {
          const cell = item.getBoundingClientRect()
          const logo = item.querySelector('.logo-wall__tile .logo-wall__logo')!.getBoundingClientRect()
          return {
            dx: logo.x + logo.width / 2 - (cell.x + cell.width / 2),
            dy: logo.y + logo.height / 2 - (cell.y + cell.height / 2),
          }
        }),
      )
      expect(cells).toHaveLength(LOGO_COUNT)
      for (const { dx, dy } of cells) {
        expect(Math.abs(dx)).toBeLessThanOrEqual(CENTRE_TOLERANCE_PX)
        expect(Math.abs(dy)).toBeLessThanOrEqual(CENTRE_TOLERANCE_PX)
      }
    })

    test('the last row is full', async ({ page }) => {
      await openRoute(page)
      const rects = await itemRects(page)
      const lastRowTop = Math.max(...rects.map((r) => Math.round(r.y)))
      const inLastRow = rects.filter((r) => Math.round(r.y) === lastRowTop).length
      const columns = rects.filter((r) => Math.round(r.y) === Math.round(rects[0].y)).length
      expect(inLastRow).toBe(columns)
    })

    test('the last tile with a note opens inside the wall without moving a cell', async ({ page }) => {
      await openRoute(page)
      const before = await itemRects(page)
      const wall = await box(page.locator(WALL))
      const withNote = page.locator(`${ITEM}:has(.logo-wall__panel)`).last()
      await withNote.hover()
      await page.waitForTimeout(SETTLE_MS)
      const panel = await box(withNote.locator('.logo-wall__panel'))
      expect(panel.x).toBeGreaterThanOrEqual(wall.x - EDGE_TOLERANCE_PX)
      expect(panel.x + panel.width).toBeLessThanOrEqual(wall.x + wall.width + EDGE_TOLERANCE_PX)
      expect(panel.y).toBeGreaterThanOrEqual(wall.y - EDGE_TOLERANCE_PX)
      expect(panel.y + panel.height).toBeLessThanOrEqual(wall.y + wall.height + EDGE_TOLERANCE_PX)
      expect(await itemRects(page)).toEqual(before)
    })
  })
}

test.describe('logo wall pointer and keyboard', () => {
  test.use({ viewport: { width: 1536, height: 900 } })

  test('hovering one tile lights only that cell and opens its note over the neighbours', async ({ page }) => {
    await openRoute(page)
    const before = await itemRects(page)
    const items = page.locator(ITEM)
    const target = items.nth(0)
    const other = items.nth(5)
    const glow = (cell: Locator) =>
      cell.evaluate((el) => getComputedStyle(el, '::before').opacity)
    await target.hover()
    await page.waitForTimeout(SETTLE_MS)
    expect(Number(await glow(target))).toBe(1)
    expect(Number(await glow(other))).toBe(0)
    const panel = target.locator('.logo-wall__panel')
    await expect(panel).toBeVisible()
    await expect(panel).toContainText('Main language in 64 of my repositories.')
    const cell = await box(target)
    const open = await box(panel)
    expect(open.width).toBeGreaterThan(cell.width * 1.9)
    expect(open.height).toBeGreaterThan(cell.height * 1.9)
    expect(await itemRects(page)).toEqual(before)
  })

  test('the name is out of the flow: hovering does not move the logo', async ({ page }) => {
    await openRoute(page)
    const logo = page.locator(`${ITEM} ${TILE} .logo-wall__logo`).nth(2)
    const rest = await box(logo)
    await page.locator(ITEM).nth(2).hover()
    await page.waitForTimeout(SETTLE_MS)
    expect(await box(logo)).toEqual(rest)
  })

  test('the keyboard reaches every tile and opens, then Escape closes the note', async ({ page }) => {
    await openRoute(page)
    expect(await page.locator(TILE).count()).toBe(LOGO_COUNT)
    const tile = page.locator(ITEM).nth(0).locator(TILE)
    await tile.focus()
    await page.keyboard.press('Shift+Tab')
    await page.keyboard.press('Tab')
    await expect(tile).toBeFocused()
    const panel = page.locator(ITEM).nth(0).locator('.logo-wall__panel')
    await expect(panel).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(panel).toBeHidden()
    for (let step = 0; step < LOGO_COUNT - 1; step += 1) await page.keyboard.press('Tab')
    await expect(page.locator(TILE).nth(LAST_CELL_INDEX)).toBeFocused()
  })

  test('a logo without a note has no panel, only its name', async ({ page }) => {
    await openRoute(page)
    const noNote = page.locator(`${ITEM}:not(:has(.logo-wall__panel))`).first()
    expect(await noNote.locator('.logo-wall__panel').count()).toBe(0)
    await noNote.hover()
    await page.waitForTimeout(SETTLE_MS)
    expect(Number(await noNote.locator('.logo-wall__name').evaluate((el) => getComputedStyle(el).opacity))).toBe(1)
  })

  test('reduced motion: the note opens without a transition', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await openRoute(page)
    const duration = await page
      .locator('.logo-wall__panel')
      .first()
      .evaluate((el) => getComputedStyle(el).transitionDuration)
    // the global reduced-motion rule clamps durations to 0.01 ms
    expect(duration.split(', ').every((part) => parseFloat(part) <= MAX_REDUCED_SECONDS)).toBe(true)
  })
})

test.describe('logo wall on a touch screen', () => {
  test.use({ viewport: { width: 390, height: 800 }, hasTouch: true })

  test('a tap toggles the note, a second tap elsewhere closes it', async ({ page }) => {
    await openRoute(page)
    const tile = page.locator(ITEM).nth(0).locator(TILE)
    await expect(tile).toHaveAttribute('aria-expanded', 'false')
    await tile.tap()
    await expect(tile).toHaveAttribute('aria-expanded', 'true')
    await expect(page.locator(ITEM).nth(0).locator('.logo-wall__panel')).toBeVisible()
    await page.locator('h1').first().tap()
    await expect(tile).toHaveAttribute('aria-expanded', 'false')
  })
})
