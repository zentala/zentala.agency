import type { BoardIconSpec } from '../icons-controls/board-icons'
import type { BoardPost } from './data'

/**
 * Status of one series part for the badge after its title (B2, options E and F).
 * The blog data knows three states: published, draft (`published: false`) and
 * review (`published: false` plus `review: true`). There are no planned parts.
 */
export type PartStatus = 'published' | 'draft' | 'review'

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

export function partStatus(post: BoardPost): PartStatus {
  if (post.data.published !== false) return 'published'
  return post.data.review === true ? 'review' : 'draft'
}

/** Phosphor Regular at a whole-pixel size: thin weights blur at 24 px and below. */
export function smallIcon(name: string): BoardIconSpec {
  return { set: 'ph', name, weight: 'regular', size: SMALL_ICON_SIZE }
}

export const statusIcon = (status: PartStatus) =>
  smallIcon(STATUS_ICON_NAME[status])
