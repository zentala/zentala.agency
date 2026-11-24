/**
 * Generated post cover for the design board: a small line-grid "floor plan"
 * subdivided from the post slug. Same slug, same cover; no image files.
 */

export interface CoverBlock {
  col: number
  row: number
  colSpan: number
  rowSpan: number
  /** 0 is empty; 1 to 3 are rising neutral tints. */
  tone: 0 | 1 | 2 | 3
}

interface Rect {
  col: number
  row: number
  colSpan: number
  rowSpan: number
}

const MAX_DEPTH = 4
const STOP_CHANCE = 0.28
const TONE_THRESHOLDS = [0.32, 0.64, 0.88] as const

/** FNV-1a hash of the seed text, as an unsigned 32-bit integer. */
function hashSeed(seed: string): number {
  let hash = 0x811c9dc5
  for (const char of seed) {
    hash ^= char.charCodeAt(0)
    hash = Math.imul(hash, 0x01000193)
  }
  return hash >>> 0
}

/** mulberry32: a small deterministic generator, enough for a pattern. */
function createRandom(seed: number): () => number {
  let state = seed
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pickTone(value: number): CoverBlock['tone'] {
  if (value < TONE_THRESHOLDS[0]) return 0
  if (value < TONE_THRESHOLDS[1]) return 1
  if (value < TONE_THRESHOLDS[2]) return 2
  return 3
}

function splitRect(rect: Rect, random: () => number): [Rect, Rect] {
  const splitColumns =
    rect.colSpan > rect.rowSpan * 2 ||
    (rect.colSpan > 1 && (rect.rowSpan === 1 || random() < 0.5))
  if (splitColumns) {
    const cut = 1 + Math.floor(random() * (rect.colSpan - 1))
    return [
      { ...rect, colSpan: cut },
      { ...rect, col: rect.col + cut, colSpan: rect.colSpan - cut },
    ]
  }
  const cut = 1 + Math.floor(random() * (rect.rowSpan - 1))
  return [
    { ...rect, rowSpan: cut },
    { ...rect, row: rect.row + cut, rowSpan: rect.rowSpan - cut },
  ]
}

/** Subdivides a `cols` by `rows` lattice into blocks, seeded by `seed`. */
export function buildCover(
  seed: string,
  cols: number,
  rows: number,
): CoverBlock[] {
  const random = createRandom(hashSeed(seed))
  const blocks: CoverBlock[] = []

  const visit = (rect: Rect, depth: number) => {
    const isUnit = rect.colSpan === 1 && rect.rowSpan === 1
    const stops = depth >= 2 && random() < STOP_CHANCE
    if (isUnit || depth >= MAX_DEPTH || stops) {
      blocks.push({ ...rect, tone: pickTone(random()) })
      return
    }
    const [first, second] = splitRect(rect, random)
    visit(first, depth + 1)
    visit(second, depth + 1)
  }

  visit({ col: 0, row: 0, colSpan: cols, rowSpan: rows }, 0)
  if (blocks.every((block) => block.tone === 0)) blocks[0].tone = 2
  return blocks
}

/** Index of the block with the largest area: the place for a cover label. */
export function largestBlockIndex(blocks: CoverBlock[]): number {
  return blocks.reduce(
    (best, block, index) =>
      block.colSpan * block.rowSpan >
      blocks[best].colSpan * blocks[best].rowSpan
        ? index
        : best,
    0,
  )
}
