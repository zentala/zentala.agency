import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import {
  appendJobSummary,
  buildNotification,
  buildReport,
  summaryMarkdown,
  writeReport,
} from '../../../scripts/links/report.mjs'

const link = (url: string, status: string, code: number | null = 200, error: string | null = null) => ({
  url,
  status,
  code,
  error,
  pages: ['/'],
  checkedAt: '2026-11-21T10:00:00.000Z',
})
const MIXED = [
  link('https://ok.example/', 'ok'),
  link('https://dead.example/', 'dead', 404),
  link('https://blocked.example/', 'unverified', 403),
  link('https://gone.example/', 'dead', null, 'ENOTFOUND'),
]
const META = { source: 'dist', pageCount: 7, disabled: 2 }
const dirs: string[] = []
afterEach(() => dirs.splice(0).forEach((dir) => rmSync(dir, { recursive: true, force: true })))

describe('report', () => {
  it('counts links per status', () => {
    expect(buildReport(MIXED, META).counts).toEqual({ total: 4, ok: 1, dead: 2, unverified: 1 })
  })

  it('writes JSON that reads back, creating the folder', () => {
    const dir = mkdtempSync(join(tmpdir(), 'links-report-'))
    dirs.push(dir)
    const path = writeReport(buildReport(MIXED, META), join(dir, 'nested', 'report.json'))
    const read = JSON.parse(readFileSync(path, 'utf8'))
    expect(read.links).toHaveLength(4)
    expect(read).toMatchObject({ source: 'dist', pageCount: 7, disabled: 2 })
  })

  it('empty: a report with no links is valid', () => {
    expect(buildReport([], { source: 'dist', pageCount: 1 }).counts.total).toBe(0)
  })
})

describe('summary and notification', () => {
  it('summary lists dead rows before unverified ones', () => {
    const md = summaryMarkdown(buildReport(MIXED, META))
    expect(md).toContain('4 links on 7 pages: 1 ok, 2 dead, 1 unverified, 2 disabled')
    expect(md.indexOf('dead.example')).toBeLessThan(md.indexOf('blocked.example'))
    expect(md).not.toContain('ok.example')
  })

  it('summary says so when nothing is wrong', () => {
    const md = summaryMarkdown(buildReport([link('https://ok.example/', 'ok')], META))
    expect(md).toContain('No dead or unverified links.')
  })

  it('appends to the job summary file only when a path is given', () => {
    const dir = mkdtempSync(join(tmpdir(), 'links-summary-'))
    dirs.push(dir)
    const report = buildReport(MIXED, META)
    expect(appendJobSummary(report, undefined)).toBe(false)
    expect(appendJobSummary(report, join(dir, 'summary.md'))).toBe(true)
    expect(readFileSync(join(dir, 'summary.md'), 'utf8')).toContain('Outgoing link check')
  })

  it('notification is high priority with dead links and names them', () => {
    const note = buildNotification(buildReport(MIXED, META))
    expect(note?.priority).toBe('high')
    expect(note?.message).toContain('https://dead.example/')
    expect(note?.message).toContain('Unverified: 1')
  })

  it('notification is normal priority with only unverified links', () => {
    const note = buildNotification(buildReport([link('https://b.example/', 'unverified', 403)], META))
    expect(note?.priority).toBe('normal')
  })

  it('nothing to report means no notification', () => {
    expect(buildNotification(buildReport([link('https://ok.example/', 'ok')], META))).toBeNull()
    expect(buildNotification(buildReport([], META))).toBeNull()
  })
})
