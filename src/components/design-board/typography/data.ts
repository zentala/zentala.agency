import { getCollection, type CollectionEntry } from 'astro:content'
import { formatDate } from '@/lib/blog/format-date'
import { partLabel } from '@/lib/blog/part-label'
import { getVisiblePosts } from '@/lib/blog/visibility'

/** Real site content for the typography board, so every option shows what the site says. */

export type BoardPost = CollectionEntry<'blog'>

export interface TypographySamples {
  /** Hero of /about/capabilities. */
  hero: { title: string; subtitle: string }
  /** The series used as the sample section. */
  series: { title: string; tagline: string; note: string }
  /** Three newest parts of that series, newest first. */
  posts: { post: BoardPost; partLabel: string }[]
  /** A body paragraph from the newest post of the series that has a plain one. */
  paragraph: string
}

export const NAV_LINKS = [
  { text: 'Home', icon: 'house' },
  { text: 'Capabilities', icon: 'squares-four' },
  { text: 'Portfolio', icon: 'briefcase' },
  { text: 'Blog', icon: 'article' },
  { text: 'Contact', icon: 'envelope-simple' },
] as const

/** The nav item shown as the current page in every header mock. */
export const CURRENT_NAV = 'Blog'

export const TAGLINE = 'Innovation Agency'

const SAMPLE_SERIES = 'agent-native-harness'
const SAMPLE_POSTS = 3
const PARAGRAPH_LENGTH = { min: 220, max: 460 }

/** First prose paragraph of a Markdown body, without links or emphasis marks. */
function firstParagraph(body: string): string | undefined {
  return body
    .split(/\r?\n\s*\r?\n/)
    .map((block) =>
      block
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/[*_`]/g, ''),
    )
    .find(
      (block) =>
        block.length >= PARAGRAPH_LENGTH.min &&
        block.length <= PARAGRAPH_LENGTH.max &&
        /^[A-Z]/.test(block) &&
        !/[<>{}|]/.test(block),
    )
}

export async function loadTypographySamples(): Promise<TypographySamples> {
  const visible = await getVisiblePosts()
  const parts = visible
    .filter((post) => post.data.series === SAMPLE_SERIES)
    .sort((a, b) => (b.data.part ?? 0) - (a.data.part ?? 0))
  const partNumbers = parts.flatMap((post) =>
    post.data.part === undefined ? [] : [post.data.part],
  )
  const descriptions = await getCollection('series-descriptions')
  const description = descriptions.find((entry) => entry.slug === SAMPLE_SERIES)
  const newest = parts[0]

  return {
    hero: {
      title: 'Capabilities',
      subtitle: 'Areas of specialization — what I build and consult on',
    },
    series: {
      title: description?.data.title ?? SAMPLE_SERIES,
      tagline: description?.data.tagline ?? '',
      note: `${parts.length} parts · newest ${formatDate(newest.data.date).label}`,
    },
    posts: parts.slice(0, SAMPLE_POSTS).map((post) => ({
      post,
      partLabel: partLabel(post.data.part ?? 0, partNumbers),
    })),
    paragraph:
      parts.flatMap((post) => firstParagraph(post.body) ?? [])[0] ?? '',
  }
}
