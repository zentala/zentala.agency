import type { CollectionEntry } from 'astro:content'
import { getVisiblePosts } from '@/lib/blog/visibility'

/**
 * Real content-collection entries for the gallery, so PostCard, SeriesCard,
 * PostNav and SeriesRail show what the blog actually renders.
 */
export interface GallerySamples {
  /** A published post that belongs to a series, falling back to any post. */
  post: CollectionEntry<'blog'>
  /** The series with the most visible parts, in part order. */
  seriesSlug: string
  seriesTitle: string
  seriesParts: CollectionEntry<'blog'>[]
  /** Other posts for the related-posts variant of PostNav. */
  related: CollectionEntry<'blog'>[]
}

const RELATED_COUNT = 3

export async function loadGallerySamples(): Promise<GallerySamples> {
  const { getCollection } = await import('astro:content')
  const posts = await getVisiblePosts()
  const bySeries = new Map<string, CollectionEntry<'blog'>[]>()
  for (const post of posts) {
    if (!post.data.series) continue
    bySeries.set(post.data.series, [
      ...(bySeries.get(post.data.series) ?? []),
      post,
    ])
  }
  const [seriesSlug, parts] = [...bySeries.entries()].sort(
    (a, b) => b[1].length - a[1].length,
  )[0]
  const seriesParts = [...parts].sort(
    (a, b) => (a.data.part ?? 0) - (b.data.part ?? 0),
  )
  const descriptions = await getCollection('series-descriptions')
  const seriesTitle =
    descriptions.find((entry) => entry.slug === seriesSlug)?.data.title ??
    seriesSlug
  const post = seriesParts[0]
  const related = posts
    .filter((candidate) => candidate.slug !== post.slug)
    .slice(0, RELATED_COUNT)
  return { post, seriesSlug, seriesTitle, seriesParts, related }
}
