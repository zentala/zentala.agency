import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { expect, test, type Page } from '@playwright/test'
import { measureLines } from './lib/line-analysis'

/**
 * Line geometry guard (DESIGN.md section 3, "one line model").
 * Reads the rendered pixels at device scale 1 and fails when:
 * - two parallel line segments sit 1px apart (a doubled line),
 * - a vertical line shows at the viewport edge at 1450px and below,
 * - a vertical line segment floats (both ends touch no other line),
 * - hovering a cell changes any layout rect.
 *
 * Routes are discovered from the production build (dist/**\/index.html), so a
 * new page is covered automatically. See tests/e2e/README.md.
 */

const DIST_DIR = join(process.cwd(), 'dist')
const WIDTHS_ALL_ROUTES = [1920, 1450, 768, 390]
const WIDTH_CORE_ROUTES_ONLY = 1280
const CORE_ROUTES = ['/', '/blog', '/about/capabilities', '/portfolio']
/** Pages that mock a third-party UI and are allowed to draw their own lines. */
const EXCLUDED_ROUTE_PREFIXES = ['/linkedin-preview/']
/** A path that is not built, so the preview serves the 404 page. */
const NOT_FOUND_ROUTE = '/nope-404-guard'
const REDIRECT_STUB_MARKER = 'Redirecting to:'
const CONTAINER_SELECTOR =
  '.container-bordered, .container-padded, .container-header, .container-footer-small'
const INTERACTIVE_CELL =
  ':is(.cards-grid, .line-grid) > :is(a, .cell-interactive, .card-container--hover)'
const CONTAINER_SIDE_LINES_MIN_WIDTH = 1451

function listHtmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) return listHtmlFiles(full)
    return name === 'index.html' ? [full] : []
  })
}

function redirectTarget(html: string): string | null {
  if (!html.slice(0, 300).includes(REDIRECT_STUB_MARKER)) return null
  return /url=([^"'>]+)/.exec(html)?.[1] ?? null
}

/** Every static page of the build; a redirect stub is replaced by its destination. */
function discoverRoutes(): string[] {
  const routes = new Set<string>()
  for (const file of listHtmlFiles(DIST_DIR)) {
    const dir = relative(DIST_DIR, file).split(sep).slice(0, -1).join('/')
    const route = dir === '' ? '/' : `/${dir}`
    const target = redirectTarget(readFileSync(file, 'utf8'))
    routes.add(target ?? route)
  }
  routes.add(NOT_FOUND_ROUTE)
  return [...routes]
    .map((r) => (r.length > 1 ? r.replace(/\/$/, '') : r))
    .filter((r) => !EXCLUDED_ROUTE_PREFIXES.some((p) => r.startsWith(p)))
    .sort()
}

const ROUTES = discoverRoutes()

const layoutSnapshot = (page: Page) =>
  page.evaluate((selector) => {
    const rects = [...document.querySelectorAll(selector)].map((el) => {
      const r = el.getBoundingClientRect()
      return [r.x, r.y, r.width, r.height].map((n) => Math.round(n * 100) / 100)
    })
    return { rects, scrollHeight: document.documentElement.scrollHeight }
  }, `${INTERACTIVE_CELL}, :is(.cards-grid, .line-grid)`)

const routesAt = (width: number) =>
  width === WIDTH_CORE_ROUTES_ONLY
    ? ROUTES.filter((r) => CORE_ROUTES.includes(r))
    : ROUTES

test('route discovery finds the built pages', () => {
  expect(ROUTES.length, 'routes discovered from dist/').toBeGreaterThan(CORE_ROUTES.length)
  for (const route of CORE_ROUTES) expect(ROUTES).toContain(route)
  expect(ROUTES.filter((r) => r.startsWith('/linkedin-preview'))).toEqual([])
})

for (const width of [...WIDTHS_ALL_ROUTES, WIDTH_CORE_ROUTES_ONLY]) {
  test.describe(`line geometry at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 }, deviceScaleFactor: 1 })

    for (const path of routesAt(width)) {
      test(`${path}: no doubled lines, no edge line, no floating line`, async ({
        page,
      }) => {
        await page.goto(path)
        await page.waitForLoadState('networkidle')
        const report = await measureLines(page)
        expect(report.adjacentHorizontal, 'horizontal lines 1px apart').toEqual(
          [],
        )
        expect(report.adjacentVertical, 'vertical lines 1px apart').toEqual([])
        expect(
          report.floatingVertical,
          'vertical line segments that join no other line',
        ).toEqual([])
        if (width < CONTAINER_SIDE_LINES_MIN_WIDTH) {
          expect(report.lineAtLeftEdge, 'line at left viewport edge').toBe(
            false,
          )
          expect(report.lineAtRightEdge, 'line at right viewport edge').toBe(
            false,
          )
        }
      })

      if (width < CONTAINER_SIDE_LINES_MIN_WIDTH) {
        // Without side lines the container must span the viewport, or row
        // lines stop short of the edge and look dangling.
        test(`${path}: containers span the viewport`, async ({ page }) => {
          await page.goto(path)
          await page.waitForLoadState('networkidle')
          const widths = await page.evaluate(
            (selector) =>
              [...document.querySelectorAll(selector)].map((el) =>
                Math.round(el.getBoundingClientRect().width),
              ),
            CONTAINER_SELECTOR,
          )
          expect(widths.length).toBeGreaterThan(0)
          for (const w of widths) expect(w).toBe(width)
        })
      }
    }
  })
}

test.describe('hover keeps the layout still', () => {
  test.use({ viewport: { width: 1920, height: 1000 }, deviceScaleFactor: 1 })

  for (const path of ROUTES) {
    test(`${path}: hovering a cell changes no rect`, async ({ page }) => {
      await page.goto(path)
      await page.waitForLoadState('networkidle')
      const cell = page.locator(INTERACTIVE_CELL).first()
      test.skip((await cell.count()) === 0, 'no interactive cell on this page')
      await cell.scrollIntoViewIfNeeded()
      const before = await layoutSnapshot(page)
      await cell.hover()
      await page.waitForTimeout(400)
      expect(await layoutSnapshot(page)).toEqual(before)
    })
  }
})
