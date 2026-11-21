/** Integration: real extractor, checker, rewriter and report writer over a fixture dist and a local server. */
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { runDist } from '../../../scripts/links/run.mjs'
import { startTestServer, type TestServer } from './server'

const CHECK = { timeoutMs: 300, retryDelayMs: 10 }
let server: TestServer
const dirs: string[] = []
beforeAll(async () => {
  server = await startTestServer()
})
afterAll(() => server.close())
afterEach(() => dirs.splice(0).forEach((dir) => rmSync(dir, { recursive: true, force: true })))

function fixture() {
  const root = mkdtempSync(join(tmpdir(), 'links-run-'))
  dirs.push(root)
  const pages: Record<string, string> = {
    'index.html': `<a href="${server.origin}/ok">fine</a> <a href="${server.origin}/notfound">gone</a> <a href="/about">own</a>`,
    'about/index.html': `<a href="${server.origin}/notfound">gone again</a> <a href="${server.origin}/forbidden">blocked</a> <a href="${server.origin}/hang">slow</a>`,
  }
  for (const [path, html] of Object.entries(pages)) {
    mkdirSync(dirname(join(root, 'dist', path)), { recursive: true })
    writeFileSync(join(root, 'dist', path), html)
  }
  return { dist: join(root, 'dist'), reportPath: join(root, 'cache', 'report.json') }
}

describe('runDist', () => {
  it('checks every link once, disables only dead ones and writes the report', async () => {
    const { dist, reportPath } = fixture()
    const report = await runDist({ distDir: dist, reportPath, rewrite: true, check: CHECK })

    expect(report.counts).toEqual({ total: 4, ok: 1, dead: 1, unverified: 2 })
    expect(report.pageCount).toBe(2)
    expect(report.disabled).toBe(2)

    const home = readFileSync(join(dist, 'index.html'), 'utf8')
    expect(home).toContain(`<span class="link-disabled" data-dead-href="${server.origin}/notfound">gone</span>`)
    expect(home).toContain(`<a href="${server.origin}/ok">fine</a>`)
    const about = readFileSync(join(dist, 'about', 'index.html'), 'utf8')
    expect(about).toContain('link-disabled')
    expect(about).toContain(`<a href="${server.origin}/forbidden">blocked</a>`)
    expect(about).toContain(`<a href="${server.origin}/hang">slow</a>`)

    const onDisk = JSON.parse(readFileSync(reportPath, 'utf8'))
    const dead = onDisk.links.find((entry: { status: string }) => entry.status === 'dead')
    expect(dead).toMatchObject({ code: 404, pages: ['/', '/about/'] })
  })

  it('reports without touching dist when rewrite is off', async () => {
    const { dist, reportPath } = fixture()
    const before = readFileSync(join(dist, 'index.html'), 'utf8')
    const report = await runDist({ distDir: dist, reportPath, check: CHECK })
    expect(report.counts.dead).toBe(1)
    expect(report.disabled).toBe(0)
    expect(readFileSync(join(dist, 'index.html'), 'utf8')).toBe(before)
  })

  it('error: a dist without HTML fails instead of reporting a clean scan', async () => {
    const root = mkdtempSync(join(tmpdir(), 'links-run-empty-'))
    dirs.push(root)
    await expect(runDist({ distDir: root, reportPath: join(root, 'r.json'), check: CHECK })).rejects.toThrow(/No HTML files/)
  })
})
