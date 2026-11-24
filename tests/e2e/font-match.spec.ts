import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test } from '@playwright/test'

/**
 * Font match guard (DESIGN.md "Typography", T39): 'Open Sans Matched' (size-adjust,
 * src/styles/fonts.scss) must draw a paragraph within 3% of the width Segoe UI gives it,
 * and the production CSS must hold no third-party font URL. The width check needs
 * Segoe UI on the machine and skips with a message where it is missing.
 */

const MAX_WIDTH_DIFFERENCE = 0.03
const FORBIDDEN_CSS_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com', 'jsdelivr']
const SAMPLE =
  'We build prototypes and shape the architecture behind them, from the first sketch to a running system your team owns.'

test('production CSS holds no third-party font URL', () => {
  const dir = join(process.cwd(), 'dist', '_astro')
  const cssFiles = readdirSync(dir).filter((file) => file.endsWith('.css'))
  expect(cssFiles.length).toBeGreaterThan(0)
  for (const file of cssFiles) {
    const css = readFileSync(join(dir, file), 'utf8')
    for (const host of FORBIDDEN_CSS_HOSTS) expect(css, `${file} names ${host}`).not.toContain(host)
  }
})

for (const weight of [300, 400, 600]) {
  test(`Open Sans Matched is within 3% of Segoe UI width at weight ${weight}`, async ({ page }) => {
    await page.goto('/about')
    const hasSegoe = await page.evaluate(() => document.fonts.check("16px 'Segoe UI'"))
    test.skip(!hasSegoe, 'Segoe UI is not installed on this machine, so there is nothing to compare')

    const widthWith = (family: string) =>
      page.evaluate(
        async ([text, font, fontWeight]) => {
          const paragraph = document.createElement('p')
          paragraph.textContent = text
          paragraph.style.cssText = `position:absolute;white-space:nowrap;font-size:20px;font-weight:${fontWeight};font-family:${font}`
          document.body.append(paragraph)
          await document.fonts.load(`${fontWeight} 20px ${font}`, text)
          const width = paragraph.getBoundingClientRect().width
          paragraph.remove()
          return width
        },
        [SAMPLE, family, String(weight)],
      )

    const segoe = await widthWith("'Segoe UI'")
    const matched = await widthWith("'Open Sans Matched'")
    expect(Math.abs(matched - segoe) / segoe).toBeLessThanOrEqual(MAX_WIDTH_DIFFERENCE)
  })
}
