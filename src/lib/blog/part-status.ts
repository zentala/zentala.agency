/**
 * Status of one series part for the badge after its title on the /blog index.
 * The blog data knows three states: published, draft (`published: false`) and
 * review (`published: false` plus `review: true`). There are no planned parts.
 */
export type PartStatus = 'published' | 'draft' | 'review'

interface StatusCandidate {
  data: { published?: boolean; review?: boolean }
}

export function partStatus(post: StatusCandidate): PartStatus {
  if (post.data.published !== false) return 'published'
  return post.data.review === true ? 'review' : 'draft'
}
