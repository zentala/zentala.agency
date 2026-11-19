/**
 * "Part n of N" only when the visible part numbers run 1..N without a gap;
 * otherwise "Part n". A lone part is just "Part n". Unpublished parts would make N lie ("Part 9 of 1").
 */
export function partLabel(part: number, visibleParts: number[]): string {
  const sorted = [...new Set(visibleParts)].sort((a, b) => a - b)
  const isContiguous = sorted.every((value, index) => value === index + 1)
  return isContiguous && sorted.length > 1
    ? `Part ${part} of ${sorted.length}`
    : `Part ${part}`
}
