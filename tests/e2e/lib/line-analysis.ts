import type { Page } from '@playwright/test'

/**
 * Pixel analysis of the line model (DESIGN.md section 3), shared by the line
 * guard (tests/e2e/line-geometry.spec.ts) and scripts/visual-check.mjs. Keep
 * this file free of runtime imports so Node can load it directly (type
 * stripping) and analyzeLines can be serialised into the page.
 */

/** Dev and runtime widgets that are not page lines. */
export const HIDDEN_WIDGETS_CSS =
  'astro-dev-toolbar, [class*=chat], [id*=chat], [id*=agentation], [data-agentation], .heading-switch { display: none !important } iframe { visibility: hidden !important }'

/** Floating-segment check: a vertical line at least this long must join another line. */
export const FLOATING_MIN_LENGTH = 80

/**
 * Prose widgets draw their own boxes; their lines are not grid lines. Lines
 * inside these rects are skipped by BOTH the doubled-line and the
 * floating-segment checks. Article blocks (src/components/blog/rich/) mark
 * their root with data-prose-widget; tables, code and form controls are
 * listed by tag. Everything outside these rects stays strict.
 */
export const PROSE_WIDGET_SELECTOR =
  '[data-prose-widget], table, pre, code, blockquote, .li-card, input, textarea, select, button, [class*=li-card]'

export interface Rect {
  x: number
  y: number
  w: number
  h: number
}

export interface LineReport {
  adjacentHorizontal: string[]
  adjacentVertical: string[]
  floatingVertical: string[]
  lineAtLeftEdge: boolean
  lineAtRightEdge: boolean
}

export interface AnalyzeInput {
  dataUrl: string
  excluded: Rect[]
  checkFloating: boolean
  floatingMinLength: number
}

/** Runs inside the page: finds runs of line-coloured pixels in a screenshot. */
export async function analyzeLines(input: AnalyzeInput): Promise<LineReport> {
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
  const inExcluded = (x: number, y: number) =>
    input.excluded.some(
      (r) =>
        x >= r.x - JOIN_TOLERANCE &&
        x <= r.x + r.w + JOIN_TOLERANCE &&
        y >= r.y - JOIN_TOLERANCE &&
        y <= r.y + r.h + JOIN_TOLERANCE,
    )
  // A pair counts only outside prose widgets; "horizontal" runs have at=y, from/to=x
  const adjacent = (runs: Run[], isHorizontal: boolean) => {
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
        const mid = (Math.max(r.from, q.from) + Math.min(r.to, q.to)) / 2
        const inWidget = isHorizontal
          ? inExcluded(mid, r.at)
          : inExcluded(r.at, mid)
        if (
          !inWidget &&
          overlap(r, q) >= MIN_OVERLAP &&
          !touches(r, r.at - 1) &&
          !touches(q, q.at + 1)
        )
          found.push(`${r.at}/${q.at} overlap ${overlap(r, q)}px`)
      }
    return found
  }
  const edgeHasLine = (x: number) => vertical.some((r) => r.at === x)
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
    adjacentHorizontal: adjacent(horizontal, true),
    adjacentVertical: adjacent(vertical, false),
    floatingVertical: input.checkFloating ? floating() : [],
    lineAtLeftEdge: edgeHasLine(0),
    lineAtRightEdge: edgeHasLine(width - 1),
  }
}

export async function measureLines(page: Page, checkFloating = true): Promise<LineReport> {
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
    checkFloating,
    floatingMinLength: FLOATING_MIN_LENGTH,
  })
}
