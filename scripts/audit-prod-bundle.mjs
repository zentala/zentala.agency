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

const FORBIDDEN = [
  'simple-git',
  'diff2html',
  'd2h-wrapper',
  'd2h-ins',
  'd2h-del',
  'd2h-files-diff',
  'dev/blog-version-panel',
  '/api/dev/',
  '@astrojs/markdown-remark',
]

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
      if (SCAN_EXT.has(ext)) files.push(full)
    }
  }
  return files
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

  const files = walk(DIST)
  let totalBytes = 0
  const hits = []
  for (const file of files) {
    const content = readFileSync(file, 'utf8')
    totalBytes += content.length
    for (const needle of FORBIDDEN) {
      if (content.includes(needle)) {
        const lines = content.split('\n')
        const idx = lines.findIndex((l) => l.includes(needle))
        hits.push({ file: file.replace(ROOT, ''), needle, line: idx + 1 })
      }
    }
  }

  const mb = (totalBytes / 1024 / 1024).toFixed(2)
  if (hits.length > 0) {
    console.error(`audit-prod-bundle: FOUND ${hits.length} forbidden strings in dist/\n`)
    for (const h of hits) {
      console.error(`  ${h.file}:${h.line}  →  "${h.needle}"`)
    }
    console.error(`\naudited ${files.length} files, ${mb} MB — FAIL`)
    process.exit(1)
  }
  console.log(`audit-prod-bundle: audited ${files.length} files, ${mb} MB, 0 forbidden strings — OK`)
  process.exit(0)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main()
}
