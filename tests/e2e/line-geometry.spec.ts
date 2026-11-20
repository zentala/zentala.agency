import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { expect, test, type Page } from '@playwright/test'

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
/** Dev and runtime widgets that are not page lines. */
const HIDDEN_WIDGETS_CSS =
  'astro-dev-toolbar, [class*=chat], [id*=chat], [id*=agentation], [data-agentation] { display: none !important } iframe { visibility: hidden !important }'

/** Floating-segment check: ON fails a route that has a vertical line joining nothing. */
const FLOATING_SEGMENT_CHECK = true
const FLOATING_MIN_LENGTH = 80
/** Prose widgets draw their own boxes; their lines are not grid lines. */
const PROSE_WIDGET_SELECTOR =
  'table, pre, code, blockquote, .li-card, input, textarea, select, button, [class*=li-card]'

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

interface Rect {
  x: number
  y: number
  w: number
  h: number
}

interface LineReport {
  adjacentHorizontal: string[]
  adjacentVertical: string[]
  floatingVertical: string[]
  lineAtLeftEdge: boolean
  lineAtRightEdge: boolean
}

interface AnalyzeInput {
  dataUrl: string
  excluded: Rect[]
  checkFloating: boolean
  floatingMinLength: number
}

/** Runs inside the page: finds runs of line-coloured pixels in a screenshot. */
async function analyzeLines(input: AnalyzeInput): Promise<LineReport> {
  const LINE_COLOURS = [
    [31, 41, 55],
    [55, 65, 81],
  ]
  const MIN_RUN = 48
  const MIN_OVERLAP = 8
  const JOIN_TOLERANCE = 2
  const img = await new Promise<HTMLImageElement>((resolve) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.src = input.dataUrl
  })
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, 0, 0)
  const { data, width, height } = ctx.getImageData(0, 0, img.width, img.height)
  const isLine = (x: number, y: number) => {
    const o = (y * width + x) * 4
    return LINE_COLOURS.some(
      ([r, g, b]) => data[o] === r && data[o + 1] === g && data[o + 2] === b,
    )
  }
  type Run = { at: number; from: number; to: number }
  const collect = (
    outer: number,
    inner: number,
    pick: (a: number, b: number) => boolean,
  ) => {
    const runs: Run[] = []
    for (let a = 0; a < outer; a++) {
      let start = -1
      for (let b = 0; b <= inner; b++) {
        const on = b < inner && pick(a, b)
        if (on && start < 0) start = b
        if (!on && start >= 0) {
          if (b - start >= MIN_RUN) runs.push({ at: a, from: start, to: b })
          start = -1
        }
      }
    }
    return runs
  }
  const horizontal = collect(height, width, (y, x) => isLine(x, y))
  const vertical = collect(width, height, (x, y) => isLine(x, y))
  const overlap = (a: Run, b: Run) =>
    Math.min(a.to, b.to) - Math.max(a.from, b.from)
  const adjacent = (runs: Run[]) => {
    const byPosition = new Map<number, Run[]>()
    runs.forEach((r) =>
      byPosition.set(r.at, [...(byPosition.get(r.at) ?? []), r]),
    )
    const touches = (r: Run, at: number) =>
      (byPosition.get(at) ?? []).some((o) => overlap(r, o) >= MIN_OVERLAP)
    const found: string[] = []
    for (const r of runs)
      for (const q of byPosition.get(r.at + 1) ?? []) {
        // A filled area is thicker than 2px; only a bare pair counts as a doubled line
        if (
          overlap(r, q) >= MIN_OVERLAP &&
          !touches(r, r.at - 1) &&
          !touches(q, q.at + 1)
        )
          found.push(`${r.at}/${q.at} overlap ${overlap(r, q)}px`)
      }
    return found
  }
  const edgeHasLine = (x: number) => vertical.some((r) => r.at === x)
  const inExcluded = (x: number, y: number) =>
    input.excluded.some(
      (r) =>
        x >= r.x - JOIN_TOLERANCE &&
        x <= r.x + r.w + JOIN_TOLERANCE &&
        y >= r.y - JOIN_TOLERANCE &&
        y <= r.y + r.h + JOIN_TOLERANCE,
    )
  // An end joins when a horizontal line crosses its column there, or the page ends
  const endJoins = (x: number, y: number, pageEdge: boolean) =>
    pageEdge ||
    horizontal.some(
      (h) =>
        Math.abs(h.at - y) <= JOIN_TOLERANCE &&
        x >= h.from - JOIN_TOLERANCE &&
        x <= h.to + JOIN_TOLERANCE,
    )
  const floating = (): string[] =>
    vertical
      .filter((r) => r.to - r.from >= input.floatingMinLength)
      .filter((r) => !inExcluded(r.at, (r.from + r.to) / 2))
      .filter(
        (r) =>
          !endJoins(r.at, r.from, r.from <= JOIN_TOLERANCE) &&
          !endJoins(r.at, r.to, r.to >= height - JOIN_TOLERANCE),
      )
      .map((r) => `x=${r.at} y=${r.from}-${r.to} (${r.to - r.from}px)`)
  return {
    adjacentHorizontal: adjacent(horizontal),
    adjacentVertical: adjacent(vertical),
    floatingVertical: input.checkFloating ? floating() : [],
    lineAtLeftEdge: edgeHasLine(0),
    lineAtRightEdge: edgeHasLine(width - 1),
  }
}

async function measureLines(page: Page): Promise<LineReport> {
  // The fixed header and widgets would repeat or hide lines in a full-page capture
  await page.addStyleTag({
    content: `header, .fixed { position: absolute !important } ${HIDDEN_WIDGETS_CSS} a[class*="bg-gray-800"], button { visibility: hidden !important }`,
  })
  const excluded = await page.evaluate((selector) => {
    return [...document.querySelectorAll(selector)].map((el) => {
      const r = el.getBoundingClientRect()
      return {
        x: r.left + window.scrollX,
        y: r.top + window.scrollY,
        w: r.width,
        h: r.height,
      }
    })
  }, PROSE_WIDGET_SELECTOR)
  const shot = await page.screenshot({ fullPage: true })
  const dataUrl = `data:image/png;base64,${shot.toString('base64')}`
  return page.evaluate(analyzeLines, {
    dataUrl,
    excluded,
    checkFloating: FLOATING_SEGMENT_CHECK,
    floatingMinLength: FLOATING_MIN_LENGTH,
  })
}

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
