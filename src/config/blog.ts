/**
 * Single switch for whether the author's name is shown across the blog.
 * Flip to `true` to bring author identity back into PostCard and the post
 * hero — it will render on its own line above the title, not back into the
 * meta line.
 */
export const SHOW_AUTHOR = false

/**
 * Whether the DRAFT badge should render. Mirrors the visibility rule the
 * pages use to decide whether an unpublished post shows up at all
 * (`DEV || PUBLIC_PREVIEW === 'true'`) — keeping this in one place stops the
 * badge from disagreeing with what the page is actually including.
 */
export const SHOW_DRAFTS =
  import.meta.env.DEV || import.meta.env.PUBLIC_PREVIEW === 'true'
