/**
 * The owner's answers to DECIDE.md items: validation, an append-only store under
 * `<planDir>/answers/YYYY-MM-DD.jsonl` (one JSON object per line) and the reader for display.
 * Dev only: used by the admin pages and the dev answers endpoint.
 */
import { appendFileSync, existsSync, mkdirSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import type { DecideItem } from './decide'

export const ANSWERS_DIR = 'answers'
export const MAX_NOTE_LENGTH = 2000

export interface AnswerInput {
  id: string
  /** Letter of an option, or null for a note-only answer. */
  choice: string | null
  note?: string
}

export type CheckedAnswer = Required<AnswerInput>

export interface SavedAnswer extends CheckedAnswer {
  at: string
}

export type Validation = { ok: true; answers: CheckedAnswer[] } | { ok: false; error: string }

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

/** Checks a parsed request body against the current items: known id, a letter of that item or a note instead, short note. */
export function validateAnswers(body: unknown, items: DecideItem[]): Validation {
  if (!isRecord(body) || !Array.isArray(body.answers)) {
    return { ok: false, error: 'body must be { answers: [...] }' }
  }
  const byId = new Map(items.map((item) => [item.id, item]))
  const answers: CheckedAnswer[] = []
  for (const entry of body.answers) {
    const choice = isRecord(entry) ? (entry.choice ?? null) : null
    if (!isRecord(entry) || typeof entry.id !== 'string' || (choice !== null && typeof choice !== 'string')) {
      return { ok: false, error: 'each answer needs a string id and a string or null choice' }
    }
    const item = byId.get(entry.id)
    if (!item) return { ok: false, error: `unknown id ${entry.id}` }
    if (choice !== null && item.kind === 'question') {
      return { ok: false, error: `${entry.id} is a question without options` }
    }
    if (choice !== null && !item.options.some((option) => option.letter === choice)) {
      return { ok: false, error: `${entry.id} has no option ${choice}` }
    }
    const note = entry.note === undefined ? '' : entry.note
    if (typeof note !== 'string' || note.length > MAX_NOTE_LENGTH) {
      return {
        ok: false,
        error: `note of ${entry.id} is not a string of at most ${MAX_NOTE_LENGTH} characters`,
      }
    }
    if (choice === null && note.trim() === '') {
      return { ok: false, error: `${entry.id} has neither a choice nor a note` }
    }
    answers.push({ id: entry.id, choice, note })
  }
  return { ok: true, answers }
}

const pad = (value: number) => String(value).padStart(2, '0')

/** Local calendar date, the name of the day's file. */
export const localDate = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

/** Appends one JSON line per answer to today's file, creating the folder. Returns how many were written. */
export function appendAnswers(planDir: string, answers: CheckedAnswer[], now = new Date()): number {
  if (answers.length === 0) return 0
  const dir = join(planDir, ANSWERS_DIR)
  mkdirSync(dir, { recursive: true })
  const at = now.toISOString()
  const lines = answers.map((answer) => JSON.stringify({ at, ...answer }) + '\n').join('')
  appendFileSync(join(dir, `${localDate(now)}.jsonl`), lines, 'utf8')
  return answers.length
}

function parseLine(line: string): SavedAnswer | null {
  try {
    const answer = JSON.parse(line) as SavedAnswer
    return typeof answer.id === 'string' && typeof answer.at === 'string' ? answer : null
  } catch {
    return null
  }
}

/** Every saved answer, the latest per id; a missing folder gives none, a damaged line is skipped. */
export function readAnswers(planDir: string): SavedAnswer[] {
  const dir = join(planDir, ANSWERS_DIR)
  if (!existsSync(dir)) return []
  const latest = new Map<string, SavedAnswer>()
  for (const file of readdirSync(dir).filter((name) => name.endsWith('.jsonl')).sort()) {
    for (const line of readFileSync(join(dir, file), 'utf8').split(/\r?\n/)) {
      const answer = line.trim() ? parseLine(line) : null
      const previous = answer ? latest.get(answer.id) : undefined
      if (answer && (!previous || previous.at <= answer.at)) latest.set(answer.id, answer)
    }
  }
  return [...latest.values()]
}
