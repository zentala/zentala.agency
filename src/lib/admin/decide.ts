/**
 * Parser for the owner's decision list (`.plan/DECIDE.md`), pure: text in, items out.
 * Line format (documented in the file header):
 * `- [ ] YYYY-MM-DD · CODE: title — question · options: A (recommended) text → consequence / B text · blocks: … · from: … · link: …`
 * Two further forms:
 * - Preview link: an option may end with `[podgląd: <url>]`, e.g.
 *   `A kształt T → skutek [podgląd: http://agency.internal/mockups/x#a]`. The marker is removed
 *   from text and consequence and returned as `preview`; an empty URL (`[podgląd: ]`) is dropped
 *   without an error. Options are split on " / ", so a URL must contain no spaces.
 * - Question item: a line without an `options:` segment is an open question (`kind: 'question'`,
 *   no options), answered with a note only. An `options:` segment that cannot be read is still an error.
 */

export interface DecideOption {
  letter: string
  recommended: boolean
  text: string
  consequence?: string
  /** URL from a trailing `[podgląd: …]`, as written. */
  preview?: string
}

export interface DecideItem {
  /** The code before the colon, e.g. `E008-1`. */
  id: string
  date: string
  title: string
  question?: string
  /** `choice`: pick an option; `question`: no options, answered with a note. */
  kind: 'choice' | 'question'
  options: DecideOption[]
  blocks?: string
  from?: string
  link?: string
  /** Segments with a key this parser does not know, kept as written. */
  extra: Record<string, string>
  /** The nearest preceding `## ` heading, empty before the first one. */
  group: string
  deferred: boolean
  /** Checkbox ticked: answered and left in the file. */
  done: boolean
  /** 1-based line in the file. */
  line: number
}

export interface DecideError {
  raw: string
  error: string
  line: number
}

export interface DecideParse {
  items: DecideItem[]
  errors: DecideError[]
}

const ITEM_LINE = /^- \[( |x|X)\] (.*)$/
const DATE = /^\d{4}-\d{2}-\d{2}$/
const CODE_AND_TITLE = /^([A-Za-z0-9][A-Za-z0-9-]*):\s*(.+)$/
const KEY_VALUE = /^([A-Za-z]+):\s*(.*)$/
const OPTION = /^([A-Z])(\s+\(recommended\))?\s+(\S.*)$/
const PREVIEW_MARKER = /\s*\[podgląd:([^\]]*)\]\s*$/
const DEFERRED_MARKER = /^\(później\)\s*/i
const KNOWN_KEYS = ['options', 'blocks', 'from', 'link']
const SEGMENT_SEPARATOR = ' · '
const OPTION_SEPARATOR = ' / '
const CONSEQUENCE_SEPARATOR = ' → '
const QUESTION_SEPARATOR = ' — '

/** Splits at the first occurrence only, so the rest of the text stays intact. */
function splitOnce(value: string, separator: string): [string, string | undefined] {
  const at = value.indexOf(separator)
  return at < 0 ? [value, undefined] : [value.slice(0, at), value.slice(at + separator.length)]
}

function parseOption(source: string): DecideOption | null {
  const previewMatch = PREVIEW_MARKER.exec(source)
  const preview = previewMatch?.[1].trim()
  const match = OPTION.exec((previewMatch ? source.slice(0, previewMatch.index) : source).trim())
  if (!match) return null
  const [text, consequence] = splitOnce(match[3], CONSEQUENCE_SEPARATOR)
  return {
    letter: match[1],
    recommended: Boolean(match[2]),
    text: text.trim(),
    ...(consequence?.trim() ? { consequence: consequence.trim() } : {}),
    ...(preview ? { preview } : {}),
  }
}

function parseOptions(value: string): DecideOption[] | null {
  const options = value.split(OPTION_SEPARATOR).map(parseOption)
  return options.every((option) => option !== null) ? (options as DecideOption[]) : null
}

/** One item line, or the reason it cannot be read. */
function parseItem(body: string, done: boolean, group: string, line: number): DecideItem | string {
  const [date, head, ...rest] = body.split(SEGMENT_SEPARATOR)
  if (!DATE.test(date)) return 'the first segment is not a YYYY-MM-DD date'
  if (head === undefined) return 'no "CODE: title" segment'
  const deferred = DEFERRED_MARKER.test(head)
  const codeAndTitle = CODE_AND_TITLE.exec(head.replace(DEFERRED_MARKER, ''))
  if (!codeAndTitle) return 'the second segment does not start with "CODE:"'
  const [title, question] = splitOnce(codeAndTitle[2], QUESTION_SEPARATOR)
  const fields: Record<string, string> = {}
  for (const segment of rest) {
    const pair = KEY_VALUE.exec(segment)
    if (!pair) return `segment "${segment.slice(0, 40)}" is not "key: value"`
    fields[pair[1].toLowerCase()] = pair[2].trim()
  }
  const kind = fields.options === undefined ? 'question' : 'choice'
  const options = fields.options === undefined ? [] : parseOptions(fields.options)
  if (!options || (kind === 'choice' && options.length === 0)) return 'missing or unreadable "options:" (each option is "A text → consequence")'
  const { blocks, from, link } = fields
  const extra = { ...fields }
  for (const known of KNOWN_KEYS) delete extra[known]
  return {
    id: codeAndTitle[1],
    date,
    title: title.trim(),
    ...(question?.trim() ? { question: question.trim() } : {}),
    kind,
    options,
    blocks,
    from,
    link,
    extra,
    group,
    deferred,
    done,
    line,
  }
}

/**
 * Parses the whole file. Item lines that cannot be read come back in `errors` with their raw
 * text, never dropped; headings, prose and blank lines are not items.
 */
export function parseDecide(text: string): DecideParse {
  const result: DecideParse = { items: [], errors: [] }
  let group = ''
  text.split(/\r?\n/).forEach((raw, index) => {
    const line = index + 1
    if (raw.startsWith('## ')) {
      group = raw.slice(3).trim()
      return
    }
    const item = ITEM_LINE.exec(raw)
    if (!item) return
    const parsed = parseItem(item[2], item[1] !== ' ', group, line)
    if (typeof parsed === 'string') result.errors.push({ raw, error: parsed, line })
    else result.items.push(parsed)
  })
  return result
}
