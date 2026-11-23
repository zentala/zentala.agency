/** Plain-text form of the owner's answers, for the "copy as text" button. */

/** Shown where an answer has no option, only a note. */
export const NOTE_ONLY_LABEL = 'notatka bez wyboru'

/** `E008-1: A`, `E008-1: A — note` or `E008-1: — note`; line breaks in the note become spaces. */
export function formatAnswerLine(id: string, choice: string | null, note: string): string {
  const flat = note.replace(/\s+/g, ' ').trim()
  if (choice === null) return `${id}: — ${flat}`
  return flat ? `${id}: ${choice} — ${flat}` : `${id}: ${choice}`
}
