/**
 * Dev-only source map for the link monitor: where in the source a dead URL is written.
 * Searches the text files under `src/` (templates, data, content collections) for the exact URL.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

export interface SourceLocation {
  /** Path relative to the project root, forward slashes. */
  file: string
  /** 1-based line number. */
  line: number
}

const SEARCH_DIRS = ['src']
const TEXT_EXTENSIONS = /\.(astro|ts|tsx|js|mjs|jsx|md|mdx|json|ya?ml|scss|css)$/
const MAX_FILE_BYTES = 1024 * 1024

function listTextFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    const stat = statSync(full)
    if (stat.isDirectory()) return listTextFiles(full)
    return TEXT_EXTENSIONS.test(name) && stat.size <= MAX_FILE_BYTES ? [full] : []
  })
}

/** The spellings one link can have in source: as reported, without the added trailing slash, HTML-escaped. */
export function urlSpellings(url: string): string[] {
  const bare = url.endsWith('/') ? url.slice(0, -1) : url
  return [...new Set([url, bare, url.replaceAll('&', '&amp;')])]
}

const URL_CONTINUATION = /[A-Za-z0-9_\-/.%?#=&~+]/

/** True when `needle` is in `text` and is not just the start of a longer URL. */
export function containsUrl(text: string, needle: string): boolean {
  for (let at = text.indexOf(needle); at >= 0; at = text.indexOf(needle, at + 1)) {
    const next = text[at + needle.length]
    if (next === undefined || !URL_CONTINUATION.test(next)) return true
  }
  return false
}

/**
 * Finds every line that contains each URL. A URL written nowhere in `src/` (generated or
 * redirected links) maps to an empty list.
 * @param urls exact URLs from the link report
 * @param root project root holding `src/`
 */
export function locateUrls(urls: string[], root = process.cwd()): Record<string, SourceLocation[]> {
  const found: Record<string, SourceLocation[]> = Object.fromEntries(urls.map((url) => [url, []]))
  const spellings = urls.map((url) => ({ url, needles: urlSpellings(url) }))
  for (const dir of SEARCH_DIRS) {
    let files: string[]
    try {
      files = listTextFiles(join(root, dir))
    } catch {
      continue
    }
    for (const path of files) {
      const file = relative(root, path).split(sep).join('/')
      readFileSync(path, 'utf8')
        .split(/\r?\n/)
        .forEach((text, index) => {
          for (const { url, needles } of spellings) {
            if (needles.some((needle) => containsUrl(text, needle))) {
              found[url].push({ file, line: index + 1 })
            }
          }
        })
    }
  }
  return found
}
