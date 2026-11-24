#!/usr/bin/env node
/**
 * Prod bundle audit — fails if dev-only modules leak into dist/.
 * Greps for minifier-stable forbidden strings (package names, CSS class prefixes,
 * URL paths) in every .js / .css / .html under dist/.
 *
 * Component identifiers like `BlogVersionPanel` are NOT matched because minifiers
 * rename them; only string-literals that survive minification are checked.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = process.cwd()
const DIST = join(ROOT, 'dist')

/**
 * Forbidden strings split by file kind. JS/HTML must be 100% clean — any hit there
 * means dev code is actually executing in prod. CSS may carry orphaned diff2html
 * classes (the React island that uses them is tree-shaken; only dead CSS survives),
 * so for `.css` we only fail on strings that imply real JS/data-leak, not on the
 * structural d2h-* class names themselves.
 */
const FORBIDDEN_JS_HTML = [
  'simple-git',
  'diff2html',
  'd2h-wrapper',
  'd2h-ins',
  'd2h-del',
  'd2h-files-diff',
  'dev/blog-version-panel',
  '/api/dev/',
  '@astrojs/markdown-remark',
  'agentation',
  'dev/agentation',
  '/__agentation',
  'Inter Variable',
  'heading-switch',
  'review-layer',
  'data-rv-src',
  'rv-thread',
]

const FORBIDDEN_CSS = [
  'dev/blog-version-panel',
  '/api/dev/',
  'agentation',
  '/__agentation',
  'Inter Variable',
  'heading-switch',
  'review-layer',
  'data-rv-src',
  'rv-thread',
]

/** The only webfont that ships is the self-hosted Open Sans (src/styles/fonts.scss). */
const FONT_FILE_EXT = new Set(['.woff', '.woff2', '.ttf', '.otf', '.eot'])
const SHIPPED_FONT_FILE = /^open-sans-latin-(300|400|600)-normal\.[\w-]+\.woff2$/

const SCAN_EXT = new Set(['.js', '.mjs', '.cjs', '.css', '.html'])

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      walk(full, files)
    } else if (stat.isFile()) {
      const dot = entry.lastIndexOf('.')
      const ext = dot >= 0 ? entry.slice(dot).toLowerCase() : ''
      if (SCAN_EXT.has(ext) || FONT_FILE_EXT.has(ext)) files.push(full)
    }
  }
  return files
}

import { dirname, normalize, resolve as pathResolve } from 'node:path'

const FORBIDDEN_RUNTIME = [
  'simple-git',
  'dev/blog-version-panel',
  '/api/dev/',
  '@astrojs/markdown-remark',
  'Blog version history',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'cdn.jsdelivr.net',
  'Expand blog version panel',
  'agentation',
  'dev/agentation',
  '/__agentation',
  'Inter Variable',
  'heading-switch',
  'review-layer',
  'data-rv-src',
  'rv-thread',
]

function collectReferences(html, htmlPath) {
  const refs = new Set()
  const scriptRe = /<script[^>]+src=["']([^"']+)["']/g
  const linkRe = /<link[^>]+href=["']([^"']+)["']/g
  let m
  while ((m = scriptRe.exec(html))) refs.add(m[1])
  while ((m = linkRe.exec(html))) refs.add(m[1])
  const resolved = []
  for (const ref of refs) {
    if (ref.startsWith('http')) continue
    const abs = ref.startsWith('/')
      ? pathResolve(DIST, '.' + ref)
      : pathResolve(dirname(htmlPath), ref)
    resolved.push(normalize(abs))
  }
  return resolved
}

function main() {
  let distStat
  try {
    distStat = statSync(DIST)
  } catch {
    console.error(`audit-prod-bundle: dist/ not found at ${DIST}. Run "npm run build" first.`)
    process.exit(2)
  }
  if (!distStat.isDirectory()) {
    console.error('audit-prod-bundle: dist/ is not a directory')
    process.exit(2)
  }

  // Audit checks reachability from prod HTML, not dead files in _astro/.
  // Vite emits chunks for tree-shaken islands but HTML never links them.
  const allFiles = walk(DIST)
  const htmlFiles = allFiles.filter((f) => f.endsWith('.html'))
  const reachable = new Set()
  for (const html of htmlFiles) {
    reachable.add(html)
    const content = readFileSync(html, 'utf8')
    for (const ref of collectReferences(content, html)) {
      try {
        const s = statSync(ref)
        if (s.isFile()) reachable.add(ref)
      } catch {
        // missing referenced asset — ignore
      }
    }
  }

  const failures = []
  for (const file of reachable) {
    const content = readFileSync(file, 'utf8')
    const lines = content.split('\n')
    for (const needle of FORBIDDEN_RUNTIME) {
      if (content.includes(needle)) {
        const idx = lines.findIndex((l) => l.includes(needle))
        failures.push({ file: file.replace(ROOT, ''), needle, line: idx + 1 })
      }
    }
  }

  for (const file of allFiles) {
    const dot = file.lastIndexOf('.')
    const isShipped = SHIPPED_FONT_FILE.test(file.split(/[\\/]/).pop() ?? '')
    if (FONT_FILE_EXT.has(file.slice(dot).toLowerCase()) && !isShipped) {
      failures.push({ file: file.replace(ROOT, ''), needle: 'font file', line: 0 })
    }
  }

  let totalBytes = 0
  for (const f of allFiles) totalBytes += statSync(f).size
  const mb = (totalBytes / 1024 / 1024).toFixed(2)

  if (failures.length > 0) {
    console.error(`audit-prod-bundle: FOUND ${failures.length} runtime-reachable dev strings\n`)
    for (const f of failures) {
      console.error(`  ${f.file}:${f.line}  →  "${f.needle}"`)
    }
    console.error(
      `\naudited ${reachable.size} reachable files of ${allFiles.length} total (${mb} MB) — FAIL`,
    )
    process.exit(1)
  }
  console.log(
    `audit-prod-bundle: ${reachable.size} reachable files clean (${allFiles.length} total, ${mb} MB) — OK`,
  )
  process.exit(0)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main()
}
