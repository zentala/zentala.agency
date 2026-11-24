import type { BoardIconSpec } from '../icons-controls/board-icons'
import { partStatus, type PartStatus } from '@/lib/blog/part-status'

export { partStatus, type PartStatus }

export const SMALL_ICON_SIZE = 16

const STATUS_ICON_NAME: Record<PartStatus, string> = {
  published: 'calendar-blank',
  draft: 'pencil-simple-line',
  review: 'eye',
}

export const STATUS_LABEL: Record<Exclude<PartStatus, 'published'>, string> = {
  draft: 'Draft',
  review: 'Review',
}

/** Phosphor Regular at a whole-pixel size: thin weights blur at 24 px and below. */
export function smallIcon(name: string): BoardIconSpec {
  return { set: 'ph', name, weight: 'regular', size: SMALL_ICON_SIZE }
}

export const statusIcon = (status: PartStatus) =>
  smallIcon(STATUS_ICON_NAME[status])
