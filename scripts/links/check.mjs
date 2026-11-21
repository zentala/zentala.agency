/**
 * Link checking: one URL at a time (HEAD, then GET) and a concurrent pool over many.
 *
 * Statuses:
 * - ok: 2xx, or a redirect that resolves to 2xx
 * - dead: 404, 410, DNS not found or connection refused, confirmed by a second attempt
 * - unverified: everything else (401, 403, 429, 999, 5xx, timeouts, TLS trouble).
 *   The site cannot tell a dead page from a blocking one, so it never disables these.
 */

export const STATUS = Object.freeze({ OK: 'ok', DEAD: 'dead', UNVERIFIED: 'unverified' })

export const DEFAULT_OPTIONS = Object.freeze({
  timeoutMs: 10_000,
  concurrency: 8,
  retryDelayMs: 3_000,
})

const DEAD_HTTP_CODES = new Set([404, 410])
const DEAD_ERROR_CODES = new Set(['ENOTFOUND', 'ECONNREFUSED'])
const BROWSER_HEADERS = Object.freeze({
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
  accept: 'text/html,application/xhtml+xml,*/*;q=0.8',
})

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/** Short, stable description of a fetch failure: an errno code, `timeout`, or the message. */
function describeError(error) {
  if (error?.name === 'TimeoutError' || error?.name === 'AbortError') return 'timeout'
  return error?.cause?.code ?? error?.code ?? error?.message ?? 'unknown error'
}

/** One request. Never throws: the outcome is `{ code }` or `{ error }`. */
async function request(url, method, timeoutMs) {
  try {
    const response = await fetch(url, {
      method,
      redirect: 'follow',
      signal: AbortSignal.timeout(timeoutMs),
      headers: BROWSER_HEADERS,
    })
    await response.body?.cancel()
    return { code: response.status }
  } catch (error) {
    return { error: describeError(error) }
  }
}

/**
 * Map one outcome to a status.
 * @param {{ code?: number, error?: string }} outcome
 */
export function classify({ code, error }) {
  if (code !== undefined) {
    if (code >= 200 && code < 300) return STATUS.OK
    return DEAD_HTTP_CODES.has(code) ? STATUS.DEAD : STATUS.UNVERIFIED
  }
  return DEAD_ERROR_CODES.has(error) ? STATUS.DEAD : STATUS.UNVERIFIED
}

/** HEAD first; GET when HEAD is not a 2xx (many servers refuse or mishandle HEAD). */
async function probe(url, timeoutMs) {
  const head = await request(url, 'HEAD', timeoutMs)
  return classify(head) === STATUS.OK ? head : request(url, 'GET', timeoutMs)
}

/**
 * Check one URL. A dead verdict is confirmed by a second probe after `retryDelayMs`.
 * @param {string} url
 * @param {Partial<typeof DEFAULT_OPTIONS>} [options]
 * @returns {Promise<{ status: string, code: number | null, error: string | null }>}
 */
export async function checkUrl(url, options = {}) {
  const { timeoutMs, retryDelayMs } = { ...DEFAULT_OPTIONS, ...options }
  let outcome = await probe(url, timeoutMs)
  if (classify(outcome) === STATUS.DEAD) {
    await sleep(retryDelayMs)
    outcome = await probe(url, timeoutMs)
  }
  return { status: classify(outcome), code: outcome.code ?? null, error: outcome.error ?? null }
}

/**
 * Check many links with a bounded number in flight.
 * @param {Map<string, string[]>} links link -> pages
 * @param {Partial<typeof DEFAULT_OPTIONS>} [options]
 * @returns {Promise<Array<{ url: string, status: string, code: number | null, error: string | null, pages: string[], checkedAt: string }>>}
 */
export async function checkAll(links, options = {}) {
  const { concurrency } = { ...DEFAULT_OPTIONS, ...options }
  const queue = [...links.entries()]
  const results = []
  async function worker() {
    for (let next = queue.shift(); next; next = queue.shift()) {
      const [url, pages] = next
      const verdict = await checkUrl(url, options)
      results.push({ url, ...verdict, pages, checkedAt: new Date().toISOString() })
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, queue.length) }, worker))
  return results.sort((a, b) => a.url.localeCompare(b.url))
}
