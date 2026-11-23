/**
 * Node request handler of POST /__admin/answers (dev only). Plain `http` types so it runs
 * the same behind the Astro dev middleware and in tests.
 */
import type { IncomingMessage, ServerResponse } from 'node:http'
import { appendAnswers, validateAnswers } from './answers'
import { readDecideFile } from './decide-file'
import { resolvePlanDir } from './plan-dir'

export const ANSWERS_ROUTE = '/__admin/answers'
export const MAX_BODY_BYTES = 64 * 1024

const header = (req: IncomingMessage, name: string): string | undefined => {
  const value = req.headers[name]
  return Array.isArray(value) ? value.join(',') : value
}

function send(res: ServerResponse, status: number, body: object): void {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

/** Reads the whole body, or null when it exceeds the limit (the rest is drained and dropped). */
function readBody(req: IncomingMessage): Promise<string | null> {
  return new Promise((resolve) => {
    const chunks: Buffer[] = []
    let size = 0
    req.on('data', (chunk: Buffer) => {
      size += chunk.length
      if (size > MAX_BODY_BYTES) chunks.length = 0
      else chunks.push(chunk)
    })
    req.on('end', () =>
      resolve(size > MAX_BODY_BYTES ? null : Buffer.concat(chunks).toString('utf8')),
    )
  })
}

/**
 * Answers a POST from any device that reaches the dev server (owner decision INF-5, no origin
 * check): 405 for another method, 415 for non-JSON,
 * 413 for a body over 64 KB, 400 for invalid answers, otherwise `{ ok, saved }`.
 * @param planDir plan folder; resolved per request when omitted
 */
export async function handleAnswersRequest(
  req: IncomingMessage,
  res: ServerResponse,
  planDir?: string,
): Promise<void> {
  if (req.method !== 'POST') return send(res, 405, { ok: false, error: 'POST only' })
  if (!header(req, 'content-type')?.toLowerCase().startsWith('application/json')) {
    return send(res, 415, { ok: false, error: 'Content-Type must be application/json' })
  }
  const text = await readBody(req)
  if (text === null) return send(res, 413, { ok: false, error: 'body over 64 KB' })
  let body: unknown
  try {
    body = JSON.parse(text)
  } catch {
    return send(res, 400, { ok: false, error: 'invalid JSON' })
  }
  const dir = planDir ?? resolvePlanDir()
  const validation = validateAnswers(body, readDecideFile(dir).items)
  if (!validation.ok) return send(res, 400, { ok: false, error: validation.error })
  send(res, 200, { ok: true, saved: appendAnswers(dir, validation.answers) })
}
