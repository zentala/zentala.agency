#!/usr/bin/env node
/**
 * Line check for one page, at several widths. For dev-only routes, mockups and
 * drafts, which the line guard (built from dist/) cannot see.
 *
 *   node scripts/visual-check.mjs <url> [width ...]
 *
 * Default widths: 1920 1450 1280 1024 768 390. Prints doubled, edge and floating
 * line findings per width and exits 1 when any width has one. Works against the
 * dev server (http://127.0.0.1:4300/...) or a preview. A *.internal host goes
 * through the local Caddy proxy. In Git Bash set MSYS_NO_PATHCONV=1 when a
 * route argument starts with "/".
 */
import { chromium } from 'playwright'
import { analyzeLines, FLOATING_MIN_LENGTH, HIDDEN_WIDGETS_CSS, PROSE_WIDGET_SELECTOR } from '../tests/e2e/lib/line-analysis.ts'

const DEFAULT_WIDTHS = [1920, 1450, 1280, 1024, 768, 390]
const SETTLE_MS = 3000
const EDGE_CHECK_MAX_WIDTH = 1450
const TALL_PAGE_PX = 16000
const LOCAL_PROXY = 'http://127.0.0.1:2080'

const [url, ...widthArgs] = process.argv.slice(2)
if (!url) {
  console.error('usage: node scripts/visual-check.mjs <url> [width ...]')
  process.exit(2)
}
const widths = widthArgs.length ? widthArgs.map(Number) : DEFAULT_WIDTHS

async function measure(page) {
  await page.addStyleTag({
    content: `header, .fixed { position: absolute !important } ${HIDDEN_WIDGETS_CSS} a[class*="bg-gray-800"], button { visibility: hidden !important }`,
  })
  const excluded = await page.evaluate(
    (selector) =>
      [...document.querySelectorAll(selector)].map((el) => {
        const r = el.getBoundingClientRect()
        return { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height }
      }),
    PROSE_WIDGET_SELECTOR,
  )
  const shot = await page.screenshot({ fullPage: true })
  const dataUrl = `data:image/png;base64,${shot.toString('base64')}`
  return page.evaluate(analyzeLines, {
    dataUrl,
    excluded,
    checkFloating: true,
    floatingMinLength: FLOATING_MIN_LENGTH,
  })
}

async function checkWidth(browser, width) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 })
  const page = await context.newPage()
  // The dev server hot-reloads; retry when the page context is destroyed mid-run
  for (let attempt = 1; ; attempt++) {
    try {
      await page.goto(url, { waitUntil: 'load' })
      await page.waitForTimeout(SETTLE_MS)
      const hscroll = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)
      const height = await page.evaluate(() => document.documentElement.scrollHeight)
      const report = await measure(page)
      await context.close()
      return { width, hscroll, height, report }
    } catch (error) {
      if (attempt >= 3) throw error
    }
  }
}

function findings({ width, hscroll, report }) {
  const out = []
  const add = (kind, list) => list.forEach((item) => out.push(`${kind}: ${item}`))
  add('doubled horizontal', report.adjacentHorizontal)
  add('doubled vertical', report.adjacentVertical)
  add('floating vertical', report.floatingVertical)
  if (width <= EDGE_CHECK_MAX_WIDTH) {
    if (report.lineAtLeftEdge) out.push('edge: line at left viewport edge')
    if (report.lineAtRightEdge) out.push('edge: line at right viewport edge')
  }
  if (hscroll > 0) out.push(`horizontal scroll: ${hscroll}px`)
  return out
}

const proxy = new URL(url).hostname.endsWith('.internal') ? { server: LOCAL_PROXY } : undefined
const browser = await chromium.launch({ proxy })
let failed = false
for (const width of widths) {
  const result = await checkWidth(browser, width)
  const list = findings(result)
  const tall = result.height > TALL_PAGE_PX ? ` (page is ${result.height}px tall: capture over ~16k px can give false floating findings)` : ''
  console.log(`${width}px: ${list.length ? 'FINDINGS' : 'clean'}${tall}`)
  list.forEach((line) => console.log(`  ${line}`))
  failed ||= list.length > 0
}
await browser.close()
process.exit(failed ? 1 : 0)
