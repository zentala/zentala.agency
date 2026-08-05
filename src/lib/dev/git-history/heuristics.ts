/**
 * Heuristics for classifying commits as "major" changes.
 * Blog-tuned: percent-only. Absolute-line threshold was dropped because
 * 50-line additions to a 500-line post (10%) shouldn't flag as major.
 */

export const MAJOR_PERCENT_THRESHOLD = 30

export function clampPercent(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0
  if (value > 100) return 100
  return value
}

export function computeIsMajor(
  percentChanged: number,
  _linesAdded: number,
  _linesRemoved: number,
): boolean {
  return percentChanged >= MAJOR_PERCENT_THRESHOLD
}
