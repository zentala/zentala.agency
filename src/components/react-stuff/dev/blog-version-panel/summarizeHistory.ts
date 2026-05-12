import type { HistoryEntry } from './types'

/** Returns "N revisions · M major" with correct pluralization. */
export function summarizeHistory(entries: HistoryEntry[]): string {
  const total = entries.length
  const major = entries.filter((e) => e.isMajor).length
  const unit = total === 1 ? 'revision' : 'revisions'
  return `${total} ${unit} · ${major} major`
}
