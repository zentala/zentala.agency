/**
 * Heuristics for classifying commits as "major" changes.
 * Major = ≥30% of the file changed OR ≥50 lines added+removed.
 */

export const MAJOR_PERCENT_THRESHOLD = 30
export const MAJOR_ABSOLUTE_THRESHOLD = 50

export function clampPercent(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0
  if (value > 100) return 100
  return value
}

export function computeIsMajor(
  percentChanged: number,
  linesAdded: number,
  linesRemoved: number,
): boolean {
  if (percentChanged >= MAJOR_PERCENT_THRESHOLD) return true
  if (linesAdded + linesRemoved >= MAJOR_ABSOLUTE_THRESHOLD) return true
  return false
}
