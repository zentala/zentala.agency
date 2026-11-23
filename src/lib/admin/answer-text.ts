/** Plain-text form of the owner's answers, for the "copy as text" button. */

/** `E008-1: A` or `E008-1: A — note`; line breaks in the note become spaces. */
export function formatAnswerLine(id: string, choice: string, note: string): string {
  const flat = note.replace(/\s+/g, ' ').trim()
  return flat ? `${id}: ${choice} — ${flat}` : `${id}: ${choice}`
}
