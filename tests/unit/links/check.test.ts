import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { checkAll, checkUrl, classify } from '../../../scripts/links/check.mjs'
import { closedPortOrigin, startTestServer, type TestServer } from './server'

const FAST = { timeoutMs: 300, retryDelayMs: 10 }
let server: TestServer
beforeAll(async () => {
  server = await startTestServer()
})
afterAll(() => server.close())

describe('classify', () => {
  it.each([
    [{ code: 200 }, 'ok'],
    [{ code: 204 }, 'ok'],
    [{ code: 404 }, 'dead'],
    [{ code: 410 }, 'dead'],
    [{ code: 401 }, 'unverified'],
    [{ code: 403 }, 'unverified'],
    [{ code: 429 }, 'unverified'],
    [{ code: 999 }, 'unverified'],
    [{ code: 500 }, 'unverified'],
    [{ code: 301 }, 'unverified'],
    [{ error: 'ENOTFOUND' }, 'dead'],
    [{ error: 'ECONNREFUSED' }, 'dead'],
    [{ error: 'timeout' }, 'unverified'],
    [{ error: 'EAI_AGAIN' }, 'unverified'],
    [{ error: 'CERT_HAS_EXPIRED' }, 'unverified'],
  ])('%j is %s', (outcome, status) => {
    expect(classify(outcome)).toBe(status)
  })
})

describe('checkUrl against a local server', () => {
  it.each([
    ['/ok', 'ok', 200],
    ['/redirect', 'ok', 200],
    ['/nohead', 'ok', 200],
    ['/notfound', 'dead', 404],
    ['/gone', 'dead', 410],
    ['/forbidden', 'unverified', 403],
    ['/linkedin', 'unverified', 999],
    ['/boom', 'unverified', 500],
  ])('%s is %s (%s)', async (path, status, code) => {
    expect(await checkUrl(server.origin + path, FAST)).toEqual({ status, code, error: null })
  })

  it('falls back to GET when HEAD is refused', async () => {
    server.requests.length = 0
    await checkUrl(`${server.origin}/nohead`, FAST)
    expect(server.requests).toEqual(['HEAD /nohead', 'GET /nohead'])
  })

  it('confirms a dead verdict with a second attempt', async () => {
    server.requests.length = 0
    await checkUrl(`${server.origin}/notfound`, FAST)
    expect(server.requests).toEqual([
      'HEAD /notfound',
      'GET /notfound',
      'HEAD /notfound',
      'GET /notfound',
    ])
  })

  it('a hanging endpoint times out as unverified', async () => {
    expect(await checkUrl(`${server.origin}/hang`, FAST)).toEqual({
      status: 'unverified',
      code: null,
      error: 'timeout',
    })
  })

  it('a refused connection is dead', async () => {
    const result = await checkUrl(`${await closedPortOrigin()}/x`, FAST)
    expect(result).toMatchObject({ status: 'dead', code: null, error: 'ECONNREFUSED' })
  })
})

describe('checkAll', () => {
  it('returns one sorted record per link with its pages', async () => {
    const links = new Map([
      [`${server.origin}/notfound`, ['/b/']],
      [`${server.origin}/ok`, ['/', '/a/']],
    ])
    const results = await checkAll(links, FAST)
    expect(results.map((r) => [r.url.replace(server.origin, ''), r.status, r.pages])).toEqual([
      ['/notfound', 'dead', ['/b/']],
      ['/ok', 'ok', ['/', '/a/']],
    ])
    expect(results[0].checkedAt).toMatch(/^\d{4}-\d\d-\d\dT/)
  })
  it('empty: no links, no results', async () => {
    expect(await checkAll(new Map(), FAST)).toEqual([])
  })
  it('never runs more than the concurrency limit', async () => {
    const links = new Map(
      Array.from({ length: 6 }, (_, i) => [`${server.origin}/hang?i=${i}`, ['/']] as [string, string[]]),
    )
    server.requests.length = 0
    const done = checkAll(links, { timeoutMs: 400, retryDelayMs: 1, concurrency: 2 })
    await new Promise((resolve) => setTimeout(resolve, 150))
    expect(new Set(server.requests).size).toBeLessThanOrEqual(2)
    await done
  })
})
