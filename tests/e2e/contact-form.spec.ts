/**
 * Contact form F1-B (DESIGN.md P8): fields are borderless grid cells with no inner
 * padding on the cell, the label floats on focus, and focus is neutral (no blue).
 */
import { test, expect } from '@playwright/test'

const LABEL_FLOAT_MS = 300
const BLUE_CHANNEL_MARGIN = 20

test.use({ viewport: { width: 1450, height: 900 } })

test('/contact: a field is a line-grid cell and its label floats on focus', async ({ page }) => {
  await page.goto('/contact')
  const field = page.locator('.contact-form .field').first()
  const control = field.locator('.field__control')
  const label = field.locator('.field__label')

  // The cell draws only the grid's left and top line; the control inside has no border of its own.
  const [cell, inner] = await Promise.all(
    [field, control].map((locator) =>
      locator.evaluate((el) => {
        const style = getComputedStyle(el)
        return {
          borders: [style.borderTopWidth, style.borderRightWidth, style.borderBottomWidth, style.borderLeftWidth],
          radius: style.borderTopLeftRadius,
          padding: style.padding,
        }
      }),
    ),
  )
  expect(cell.borders).toEqual(['1px', '0px', '0px', '1px'])
  expect(cell.radius).toBe('0px')
  expect(cell.padding).toBe('0px')
  expect(inner.borders).toEqual(['0px', '0px', '0px', '0px'])
  expect(inner.radius).toBe('0px')

  const restingTop = (await label.boundingBox())?.y ?? 0
  await control.focus()
  await page.waitForTimeout(LABEL_FLOAT_MS)
  expect((await label.boundingBox())?.y ?? 0).toBeLessThan(restingTop)

  const focus = await control.evaluate((el) => {
    const style = getComputedStyle(el)
    return { outline: style.outlineStyle, shadow: style.boxShadow }
  })
  expect(focus.outline).toBe('none')
  expect(focus.shadow).toBe('none')

  const [red, green, blue] = (
    await label.evaluate((el) => getComputedStyle(el).color)
  )
    .match(/\d+/g)!
    .map(Number)
  expect(blue - Math.max(red, green)).toBeLessThan(BLUE_CHANNEL_MARGIN)
})
