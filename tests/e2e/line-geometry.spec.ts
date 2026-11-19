import { expect, test, type Page } from '@playwright/test'

/**
 * Line geometry guard (DESIGN.md section 3, "one line model").
 * Reads the rendered pixels at device scale 1 and fails when:
 * - two parallel line segments sit 1px apart (a doubled line),
 * - a vertical line shows at the viewport edge at 1450px and below,
 * - hovering a cell changes any layout rect.
 */

const WIDTHS = [1920, 1280, 768, 390]
const PAGES = ['/', '/blog', '/capabilities', '/portfolio']
const INTERACTIVE_CELL =
  ':is(.cards-grid, .line-grid) > :is(a, .cell-interactive, .card-container--hover)'
const CONTAINER_SIDE_LINES_MIN_WIDTH = 1451

interface LineReport {
  adjacentHorizontal: string[]
  adjacentVertical: string[]
  lineAtLeftEdge: boolean
  lineAtRightEdge: boolean
}

/** Runs inside the page: finds runs of line-coloured pixels in a screenshot. */
async function analyzeLines(dataUrl: string): Promise<LineReport> {
  const LINE_COLOURS = [
    [31, 41, 55],
    [55, 65, 81],
  ]
  const MIN_RUN = 48
  const MIN_OVERLAP = 8
  const img = await new Promise<HTMLImageElement>((resolve) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.src = dataUrl
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
  return {
    adjacentHorizontal: adjacent(horizontal),
    adjacentVertical: adjacent(vertical),
    lineAtLeftEdge: edgeHasLine(0),
    lineAtRightEdge: edgeHasLine(width - 1),
  }
}

async function measureLines(page: Page): Promise<LineReport> {
  // The fixed header and widgets would repeat or hide lines in a full-page capture
  await page.addStyleTag({
    content:
      'header, .fixed { position: absolute !important } astro-dev-toolbar, [class*=chat] { display: none !important }',
  })
  const shot = await page.screenshot({ fullPage: true })
  const dataUrl = `data:image/png;base64,${shot.toString('base64')}`
  return page.evaluate(analyzeLines, dataUrl)
}

const layoutSnapshot = (page: Page) =>
  page.evaluate((selector) => {
    const rects = [...document.querySelectorAll(selector)].map((el) => {
      const r = el.getBoundingClientRect()
      return [r.x, r.y, r.width, r.height].map((n) => Math.round(n * 100) / 100)
    })
    return { rects, scrollHeight: document.documentElement.scrollHeight }
  }, `${INTERACTIVE_CELL}, :is(.cards-grid, .line-grid)`)

for (const width of WIDTHS) {
  test.describe(`line geometry at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 }, deviceScaleFactor: 1 })

    for (const path of PAGES) {
      test(`${path}: no doubled lines, no edge line`, async ({ page }) => {
        await page.goto(path)
        await page.waitForLoadState('networkidle')
        const report = await measureLines(page)
        expect(report.adjacentHorizontal, 'horizontal lines 1px apart').toEqual(
          [],
        )
        expect(report.adjacentVertical, 'vertical lines 1px apart').toEqual([])
        if (width < CONTAINER_SIDE_LINES_MIN_WIDTH) {
          expect(report.lineAtLeftEdge, 'line at left viewport edge').toBe(
            false,
          )
          expect(report.lineAtRightEdge, 'line at right viewport edge').toBe(
            false,
          )
        }
      })
    }
  })
}

test.describe('hover keeps the layout still', () => {
  test.use({ viewport: { width: 1920, height: 1000 }, deviceScaleFactor: 1 })

  for (const path of PAGES) {
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
