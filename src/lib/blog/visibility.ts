import { SHOW_DRAFTS } from '@/config/blog'

interface VisibilityCandidate {
  data: { published?: boolean }
}

/** The one visibility rule: unpublished posts show only where drafts are shown. */
export function isVisiblePost(
  post: VisibilityCandidate,
  showDrafts: boolean = SHOW_DRAFTS,
): boolean {
  return showDrafts || post.data.published !== false
}

/** All blog posts the current build may show. */
export async function getVisiblePosts() {
  const { getCollection } = await import('astro:content')
  return (await getCollection('blog')).filter((post) => isVisiblePost(post))
}
