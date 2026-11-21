/**
 * Live site crawl: the page list comes from the site's sitemap, the links from each
 * page's HTML. Used by `just links-live` to check what is actually deployed.
 */
import { extractFromHtml } from './extract.mjs'

const LOC_PATTERN = /<loc>\s*([^<\s]+)\s*<\/loc>/g
const PAGE_FETCH_TIMEOUT_MS = 15_000
const PAGE_CONCURRENCY = 8

const locs = (xml) => [...xml.matchAll(LOC_PATTERN)].map((match) => match[1])

async function fetchText(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(PAGE_FETCH_TIMEOUT_MS) })
  if (!response.ok) throw new Error(`${url} answered ${response.status}`)
  return response.text()
}

/**
 * Page URLs from `<base>/sitemap-index.xml` (follows child sitemaps) or a plain sitemap.
 * @param {string} baseUrl e.g. https://zentala.agency
 * @returns {Promise<string[]>}
 * @throws when the sitemap cannot be read or lists no pages
 */
export async function sitemapPages(baseUrl) {
  const index = await fetchText(new URL('/sitemap-index.xml', baseUrl).href)
  const entries = locs(index)
  const sitemaps = entries.filter((url) => url.endsWith('.xml'))
  const pages = sitemaps.length > 0 ? (await Promise.all(sitemaps.map(async (url) => locs(await fetchText(url))))).flat() : entries
  if (pages.length === 0) throw new Error(`Sitemap of ${baseUrl} lists no pages`)
  return [...new Set(pages)]
}

/**
 * Outgoing links of every page in the sitemap.
 * @param {string} baseUrl
 * @returns {Promise<{ links: Map<string, string[]>, pageCount: number, pageErrors: string[] }>}
 */
export async function crawlLive(baseUrl) {
  const pages = await sitemapPages(baseUrl)
  const queue = [...pages]
  const links = new Map()
  const pageErrors = []
  async function worker() {
    for (let url = queue.shift(); url; url = queue.shift()) {
      try {
        const path = new URL(url).pathname
        for (const key of extractFromHtml(await fetchText(url), url)) {
          links.set(key, [...(links.get(key) ?? []), path])
        }
      } catch (error) {
        pageErrors.push(`${url}: ${error.message}`)
      }
    }
  }
  await Promise.all(Array.from({ length: PAGE_CONCURRENCY }, worker))
  return { links, pageCount: pages.length - pageErrors.length, pageErrors }
}
