import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync, mkdirSync } from 'node:fs'
import { request, createServer, type Server } from 'node:http'
import type { AddressInfo } from 'node:net'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import {
  appendAnswers,
  localDate,
  MAX_NOTE_LENGTH,
  readAnswers,
  validateAnswers,
} from '@/lib/admin/answers'
import { handleAnswersRequest, MAX_BODY_BYTES } from '@/lib/admin/answers-handler'
import { parseDecide } from '@/lib/admin/decide'
import { refusalReason } from '@/lib/admin/request-guard'

const DECIDE = [
  '## G',
  '- [ ] 2026-11-23 · T-1: Pytanie · options: A (recommended) tak → dobrze / B nie',
  '- [ ] 2026-11-23 · T-2: Drugie · options: A raz / B dwa / C trzy',
].join('\n')
const items = parseDecide(DECIDE).items

const dirs: string[] = []
const freshPlan = (withDecide = true) => {
  const dir = mkdtempSync(join(tmpdir(), 'answers-'))
  dirs.push(dir)
  if (withDecide) writeFileSync(join(dir, 'DECIDE.md'), DECIDE, 'utf8')
  return dir
}
afterEach(() => dirs.splice(0).forEach((dir) => rmSync(dir, { recursive: true, force: true })))

describe('validateAnswers', () => {
  it('accepts a known id with one of its letters and defaults the note to empty', () => {
    expect(validateAnswers({ answers: [{ id: 'T-2', choice: 'C' }] }, items)).toEqual({
      ok: true,
      answers: [{ id: 'T-2', choice: 'C', note: '' }],
    })
  })

  it('accepts a note-only answer with null or omitted choice', () => {
    const expected = { ok: true, answers: [{ id: 'T-1', choice: null, note: 'najpierw pytanie' }] }
    expect(validateAnswers({ answers: [{ id: 'T-1', choice: null, note: 'najpierw pytanie' }] }, items)).toEqual(expected)
    expect(validateAnswers({ answers: [{ id: 'T-1', note: 'najpierw pytanie' }] }, items)).toEqual(expected)
  })

  it('rejects an empty answer, a blank note without choice, and a non-string choice', () => {
    expect(validateAnswers({ answers: [{ id: 'T-1', choice: null }] }, items)).toMatchObject({ ok: false })
    expect(validateAnswers({ answers: [{ id: 'T-1' }] }, items)).toMatchObject({ ok: false })
    expect(validateAnswers({ answers: [{ id: 'T-1', choice: null, note: '  ' }] }, items)).toMatchObject({ ok: false })
    expect(validateAnswers({ answers: [{ id: 'T-1', choice: 1, note: 'x' }] }, items)).toMatchObject({ ok: false })
    expect(validateAnswers({ answers: [{ id: 'NOPE', note: 'x' }] }, items)).toMatchObject({ ok: false })
  })

  it('rejects an unknown id, a letter the item does not have and a long note', () => {
    expect(validateAnswers({ answers: [{ id: 'NOPE', choice: 'A' }] }, items)).toMatchObject({ ok: false })
    expect(validateAnswers({ answers: [{ id: 'T-1', choice: 'C' }] }, items)).toMatchObject({ ok: false })
    const long = 'x'.repeat(MAX_NOTE_LENGTH + 1)
    expect(validateAnswers({ answers: [{ id: 'T-1', choice: 'A', note: long }] }, items)).toMatchObject({
      ok: false,
    })
    expect(
      validateAnswers({ answers: [{ id: 'T-1', choice: 'A', note: 'x'.repeat(MAX_NOTE_LENGTH) }] }, items),
    ).toMatchObject({ ok: true })
  })

  it('rejects a body of the wrong shape and accepts an empty answers array', () => {
    expect(validateAnswers(null, items)).toMatchObject({ ok: false })
    expect(validateAnswers({ answers: 'A' }, items)).toMatchObject({ ok: false })
    expect(validateAnswers({ answers: [{ id: 1, choice: 'A' }] }, items)).toMatchObject({ ok: false })
    expect(validateAnswers({ answers: [] }, items)).toEqual({ ok: true, answers: [] })
  })
})

describe('answers store', () => {
  it('creates the answers folder and appends one JSON line per answer in today file', () => {
    const plan = freshPlan()
    const now = new Date(2026, 10, 23, 10, 42)
    expect(appendAnswers(plan, [{ id: 'T-1', choice: 'A', note: 'zażółć' }, { id: 'T-2', choice: 'B', note: '' }], now)).toBe(2)
    const file = join(plan, 'answers', `${localDate(now)}.jsonl`)
    expect(localDate(now)).toBe('2026-11-23')
    const lines = readFileSync(file, 'utf8').trimEnd().split('\n').map((l) => JSON.parse(l))
    expect(lines).toEqual([
      { at: now.toISOString(), id: 'T-1', choice: 'A', note: 'zażółć' },
      { at: now.toISOString(), id: 'T-2', choice: 'B', note: '' },
    ])
  })

  it('writes nothing for an empty list', () => {
    const plan = freshPlan()
    expect(appendAnswers(plan, [])).toBe(0)
    expect(readdirSync(plan)).toEqual(['DECIDE.md'])
  })

  it('stores and reads back a note-only answer with choice null', () => {
    const plan = freshPlan()
    appendAnswers(plan, [{ id: 'T-1', choice: null, note: 'hmm' }])
    expect(readAnswers(plan)).toMatchObject([{ id: 'T-1', choice: null, note: 'hmm' }])
  })

  it('reads none when the answers folder is missing', () => {
    expect(readAnswers(freshPlan())).toEqual([])
  })

  it('keeps the latest answer per id across files and skips a damaged line', () => {
    const plan = freshPlan()
    mkdirSync(join(plan, 'answers'))
    const line = (at: string, id: string, choice: string) => JSON.stringify({ at, id, choice, note: '' })
    writeFileSync(
      join(plan, 'answers', '2026-11-22.jsonl'),
      [line('2026-11-22T09:00:00.000Z', 'T-1', 'A'), '{"half', line('2026-11-22T09:00:00.000Z', 'T-2', 'B')].join('\n'),
    )
    writeFileSync(join(plan, 'answers', '2026-11-23.jsonl'), line('2026-11-23T09:00:00.000Z', 'T-1', 'B') + '\n')
    const byId = Object.fromEntries(readAnswers(plan).map((a) => [a.id, a.choice]))
    expect(byId).toEqual({ 'T-1': 'B', 'T-2': 'B' })
  })
})

describe('refusalReason', () => {
  const ok = { remoteAddress: '127.0.0.1', forwardedFor: undefined, origin: undefined }
  it('allows loopback sockets in all three spellings, with and without a good Origin', () => {
    for (const remoteAddress of ['127.0.0.1', '::1', '::ffff:127.0.0.1']) {
      expect(refusalReason({ ...ok, remoteAddress })).toBeNull()
    }
    expect(refusalReason({ ...ok, origin: 'http://agency.internal' })).toBeNull()
    expect(refusalReason({ ...ok, origin: 'http://localhost:4300', forwardedFor: '127.0.0.1, ::1' })).toBeNull()
  })

  it('refuses a LAN socket, a LAN forwarded entry and a foreign Origin', () => {
    expect(refusalReason({ ...ok, remoteAddress: '192.168.1.20' })).not.toBeNull()
    expect(refusalReason({ ...ok, remoteAddress: undefined })).not.toBeNull()
    expect(refusalReason({ ...ok, forwardedFor: '127.0.0.1, 192.168.1.20' })).not.toBeNull()
    expect(refusalReason({ ...ok, origin: 'http://evil.example' })).not.toBeNull()
    expect(refusalReason({ ...ok, origin: 'http://agency.internal.evil.example' })).not.toBeNull()
  })
})

describe('POST handler on a real server', () => {
  let server: Server
  let port: number
  let plan: string

  beforeAll(async () => {
    plan = freshPlan()
    server = createServer((req, res) => void handleAnswersRequest(req, res, plan))
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
    port = (server.address() as AddressInfo).port
  })
  afterAll(() => new Promise<void>((resolve) => server.close(() => resolve())))

  const post = (body: string, headers: Record<string, string> = {}) =>
    new Promise<{ status: number; json: { ok: boolean; saved?: number; error?: string } }>((resolve, reject) => {
      const req = request(
        { host: '127.0.0.1', port, method: 'POST', path: '/__admin/answers', headers: { 'content-type': 'application/json', ...headers } },
        (res) => {
          let text = ''
          res.on('data', (c) => (text += c))
          res.on('end', () => resolve({ status: res.statusCode ?? 0, json: JSON.parse(text) }))
        },
      )
      req.on('error', reject)
      req.end(body)
    })
  const one = JSON.stringify({ answers: [{ id: 'T-1', choice: 'B', note: 'ok' }] })

  it('saves a valid answer and the store reads it back', async () => {
    const res = await post(one, { origin: 'http://agency.internal' })
    expect(res).toEqual({ status: 200, json: { ok: true, saved: 1 } })
    expect(readAnswers(plan).find((a) => a.id === 'T-1')).toMatchObject({ choice: 'B', note: 'ok' })
  })

  it('refuses a foreign Origin and a non-loopback X-Forwarded-For with 403 and writes nothing', async () => {
    const before = readAnswers(plan).length
    expect((await post(one, { origin: 'http://evil.example' })).status).toBe(403)
    expect((await post(one, { 'x-forwarded-for': '192.168.1.20' })).status).toBe(403)
    expect(readAnswers(plan).length).toBe(before)
  })

  it('rejects an unknown id and a bad choice with 400', async () => {
    expect((await post(JSON.stringify({ answers: [{ id: 'NOPE', choice: 'A' }] }))).status).toBe(400)
    expect((await post(JSON.stringify({ answers: [{ id: 'T-1', choice: 'Z' }] }))).status).toBe(400)
  })

  it('rejects non-JSON content, invalid JSON and a body over 64 KB', async () => {
    expect((await post(one, { 'content-type': 'text/plain' })).status).toBe(415)
    expect((await post('{nope')).status).toBe(400)
    const big = JSON.stringify({ answers: [{ id: 'T-1', choice: 'A', note: 'x'.repeat(MAX_BODY_BYTES) }] })
    expect((await post(big)).status).toBe(413)
  })

  it('saves a note-only answer and rejects an empty one with 400', async () => {
    mkdirSync(plan, { recursive: true }) // afterEach removed the shared plan folder
    writeFileSync(join(plan, 'DECIDE.md'), DECIDE, 'utf8')
    expect((await post(JSON.stringify({ answers: [{ id: 'T-2', note: 'tylko notatka' }] }))).json).toEqual({ ok: true, saved: 1 })
    expect(readAnswers(plan).find((a) => a.id === 'T-2')).toMatchObject({ choice: null, note: 'tylko notatka' })
    expect((await post(JSON.stringify({ answers: [{ id: 'T-2', choice: null, note: '' }] }))).status).toBe(400)
  })

  it('accepts an empty answers array and saves nothing', async () => {
    expect(await post(JSON.stringify({ answers: [] }))).toEqual({ status: 200, json: { ok: true, saved: 0 } })
  })
})
