import { expect, test, type Page } from '@playwright/test'

/**
 * Left edge guard (DESIGN.md "Left edge", owner choice S1-C): the logo, the first
 * section header text and the first content text start on one vertical line.
 * Measured on the built site at wide, tablet and mobile widths.
 */

const ROUTES = [
  '/',
  '/blog',
  '/portfolio',
  '/about/capabilities',
  '/about/capabilities/backstage',
  '/offer/harness-engineering',
  '/contact',
  '/series/developer-experience',
  '/category/devex',
]
/**
 * Pages that render no SectionHeader at all (a bare listing or their own hero): there is
 * no header text to measure. Every other route, home included, must show one.
 */
const ROUTES_WITHOUT_HEADER = [
  '/blog',
  '/portfolio',
  '/about/capabilities',
]
const WIDTHS = [1440, 1024, 390]
const EDGE_TOLERANCE_PX = 1

const SELECTORS = {
  logo: '#header .logo-container svg, #header .logo-container img',
  headerText: '.section-header :is(.section-eyebrow, .section-headline)',
  contentText: ':is(.line-grid, .cards-grid, .content-grid) > :not(:empty)',
}

/**
 * Left of the first visible match: its first rendered text, or its box. A header is
 * measured by box because an eyebrow icon may precede its text.
 */
const measureLeft = (page: Page, selector: string, useText: boolean) =>
  page.evaluate(
    ({ selector, useText }) => {
      const els = [...document.querySelectorAll(selector)].filter((el) => {
        const r = el.getBoundingClientRect()
        return r.width > 0 && r.height > 0
      })
      for (const el of els) {
        if (!useText) return el.getBoundingClientRect().left
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
          if (!n.textContent?.trim()) continue
          const range = document.createRange()
          range.selectNodeContents(n)
          const r = range.getBoundingClientRect()
          if (r.width > 0) return r.left
        }
      }
      return null
    },
    { selector, useText },
  )

for (const width of WIDTHS) {
  test.describe(`left edge at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 }, deviceScaleFactor: 1 })

    for (const path of ROUTES) {
      test(`${path}: logo, section header and content share one left edge`, async ({
        page,
      }) => {
        await page.goto(path)
        await page.waitForLoadState('networkidle')
        const logo = await measureLeft(page, SELECTORS.logo, false)
        const header = await measureLeft(page, SELECTORS.headerText, false)
        const content = await measureLeft(page, SELECTORS.contentText, true)
        expect(logo, 'logo found').not.toBeNull()
        expect(content, 'content text found').not.toBeNull()
        if (!ROUTES_WITHOUT_HEADER.includes(path)) {
          expect(header, 'section header text found').not.toBeNull()
          expect(Math.abs((header ?? 0) - (logo ?? 0))).toBeLessThanOrEqual(
            EDGE_TOLERANCE_PX,
          )
        }
        expect(Math.abs((content ?? 0) - (logo ?? 0))).toBeLessThanOrEqual(
          EDGE_TOLERANCE_PX,
        )
      })
    }
  })
}
