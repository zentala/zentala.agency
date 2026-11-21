/**
 * Outgoing link extraction.
 *
 * Reads built HTML and returns every `<a href>` that points to http(s) on a host
 * other than the site itself, deduplicated, with the pages each link appears on.
 * mailto:, tel:, #anchors and relative links are skipped.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { Parser } from 'htmlparser2'

/** Hosts that are the site itself (production and the local dev copy). */
export const OWN_HOSTS = new Set(['zentala.agency', 'www.zentala.agency', 'agency.internal', 'agency.mitx.lan', 'zentala.internal'])

const SITE_BASE = 'https://zentala.agency/'
const CHECKABLE_PROTOCOLS = new Set(['http:', 'https:'])

/**
 * Canonical key of an outgoing link, or null when the href is not one.
 * The fragment is dropped: `#section` does not change what the server answers.
 * @param {string} href raw href attribute
 * @param {string} [base] page URL used to resolve protocol-relative hrefs
 * @returns {string | null}
 */
export function linkKey(href, base = SITE_BASE) {
  let url
  try {
    url = new URL(href.trim(), base)
  } catch {
    return null
  }
  if (!CHECKABLE_PROTOCOLS.has(url.protocol) || OWN_HOSTS.has(url.hostname)) return null
  url.hash = ''
  return url.href
}

/**
 * Outgoing link keys in one HTML document, first occurrence order, no duplicates.
 * @param {string} html
 * @param {string} [pageUrl]
 * @returns {string[]}
 */
export function extractFromHtml(html, pageUrl = SITE_BASE) {
  const found = new Set()
  const parser = new Parser({
    onopentag(name, attribs) {
      if (name !== 'a' || typeof attribs.href !== 'string') return
      const key = linkKey(attribs.href, pageUrl)
      if (key) found.add(key)
    },
  })
  parser.write(html)
  parser.end()
  return [...found]
}

/** @param {string} dir @returns {string[]} absolute paths of every .html file below dir */
export function listHtmlFiles(dir) {
  const files = []
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) files.push(...listHtmlFiles(path))
    else if (entry.endsWith('.html')) files.push(path)
  }
  return files
}

/** Site path of a built file: `a/b/index.html` is `/a/b/`, `x.html` is `/x.html`. */
export function pagePath(distDir, file) {
  const rel = relative(distDir, file).split(sep).join('/')
  if (rel === 'index.html') return '/'
  return rel.endsWith('/index.html') ? `/${rel.slice(0, -'index.html'.length)}` : `/${rel}`
}

/**
 * Every outgoing link in a build output.
 * @param {string} distDir
 * @returns {{ links: Map<string, string[]>, pageCount: number }} link -> pages it appears on
 * @throws when distDir does not exist
 */
export function extractLinks(distDir) {
  let files
  try {
    files = listHtmlFiles(distDir)
  } catch (error) {
    throw new Error(`Cannot read build output "${distDir}": ${error.message}`, { cause: error })
  }
  const links = new Map()
  for (const file of files) {
    const page = pagePath(distDir, file)
    for (const key of extractFromHtml(readFileSync(file, 'utf8'))) {
      const pages = links.get(key) ?? []
      pages.push(page)
      links.set(key, pages)
    }
  }
  for (const pages of links.values()) pages.sort()
  return { links, pageCount: files.length }
}
