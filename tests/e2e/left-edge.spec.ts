import { expect, test } from '@playwright/test'

/**
 * Left edge guard (DESIGN.md "Left edge", owner choice S1-C): the logo, every left-aligned
 * section header and the first content text of every section start on one vertical line.
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
const WIDTHS = [1440, 1024, 390]
const EDGE_TOLERANCE_PX = 1
/**
 * A form field and its foot row are controls, not content cells: they keep its own inset and a leading icon
 * (DESIGN.md "Forms"), so it is skipped here. Ghost numbers (`aria-hidden`) are skipped too.
 */

/** Routes with a `SectionContent context="full"` block: the route must measure at least one. */
const FULL_CONTEXT_ROUTE = '/offer/harness-engineering'

const LOGO = '#header .logo-container svg, #header .logo-container img'
const HEADER = 'main section .section-header:not([data-align="center"])'
const CONTENT =
  ':is(.line-grid, .cards-grid, .content-grid) > :not(:empty, .field, .form-foot), .section-content--full'

type EdgeSample = { what: string; left: number }

/** Lefts of the headers and first content text per section, read in the page. */
const measureEdges = (page: import('@playwright/test').Page) =>
  page.evaluate(
    ({ HEADER, CONTENT }) => {
      const visible = (el: Element) => {
        const r = el.getBoundingClientRect()
        return r.width > 0 && r.height > 0
      }
      const textLeft = (el: Element) => {
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
          if (!n.textContent?.trim()) continue
          if (n.parentElement?.closest('[aria-hidden="true"]')) continue
          const range = document.createRange()
          range.selectNodeContents(n)
          const r = range.getBoundingClientRect()
          if (r.width > 0) return r.left
        }
        return null
      }
      const samples: { what: string; left: number }[] = []
      document.querySelectorAll('main section').forEach((section, i) => {
        const header = [...section.querySelectorAll(HEADER)].find(visible)
        const label = header?.querySelector(
          '.section-eyebrow, .section-headline',
        )
        if (label && visible(label)) {
          samples.push({
            what: `section ${section.id || i} header`,
            left: label.getBoundingClientRect().left,
          })
        }
        const content = [...section.querySelectorAll(CONTENT)].find(visible)
        const left = content ? textLeft(content) : null
        if (left !== null)
          samples.push({
            what: `section ${section.id || i} content (${content?.className})`,
            left,
          })
      })
      return samples
    },
    { HEADER, CONTENT },
  )

for (const width of WIDTHS) {
  test.describe(`left edge at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 }, deviceScaleFactor: 1 })

    for (const path of ROUTES) {
      test(`${path}: logo, section headers and content share one left edge`, async ({
        page,
      }) => {
        await page.goto(path)
        await page.waitForLoadState('networkidle')
        const logo = await page.evaluate(
          (sel) =>
            [...document.querySelectorAll(sel)]
              .map((el) => el.getBoundingClientRect())
              .find((r) => r.width > 0)?.left ?? null,
          LOGO,
        )
        expect(logo, 'logo found').not.toBeNull()
        const samples: EdgeSample[] = await measureEdges(page)
        expect(samples.length, 'edges measured').toBeGreaterThan(0)
        for (const s of samples) {
          expect(
            Math.abs(s.left - (logo ?? 0)),
            `${path} ${s.what} at ${s.left}px vs logo ${logo}px`,
          ).toBeLessThanOrEqual(EDGE_TOLERANCE_PX)
        }
        if (path === FULL_CONTEXT_ROUTE) {
          const full = await page.locator('.section-content--full').count()
          expect(full, 'full-context blocks present').toBeGreaterThan(0)
        }
      })
    }
  })
}
