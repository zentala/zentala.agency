import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const authorCollection = defineCollection({
  type: 'data',
  schema: z.array(
    z.object({
      slug: z.string(),
      name: z.string(),
      role: z.string(),
      avatar: z.string().url(),
      profileUrl: z.string(),
    }),
  ),
})

console.log('Defining author collection') // debug

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    category: z.string(),
    imageUrl: z.string().optional(),
    excerpt: z.string(),
    author: z.string().default('pawel-zentala'),
    authorRole: z.string().optional(),
    bannerEnd: z.string().optional(),
    published: z.boolean().optional(),
    series: z.string().optional(),
    part: z.number().optional(),
    linkedinPost: z.string().optional(),
  }),
})

// LinkedIn sidecars: `_<slug>.li.md`, one per post that has a LinkedIn
// companion, living next to the article in src/content/blog/. The leading
// underscore is Astro's own content-collection exclusion convention — it
// keeps the file out of `blogCollection` (which requires title/date/
// category/excerpt) without a separate top-level directory. Body is plain
// markdown, no frontmatter: what's in the file is what goes on LinkedIn.
const linkedinCollection = defineCollection({
  loader: glob({
    pattern: '_*.li.md',
    base: './src/content/blog',
    // Astro's default id generation slugifies the whole basename and drops
    // dots, so `_slug.li.md` would collide into `slugli`. Keep the id as
    // the blog post's own slug — that is the only thing callers need.
    generateId: ({ entry }) => entry.replace(/^_/, '').replace(/\.li\.md$/, ''),
  }),
  schema: z.object({}),
})

const categoryDescriptionsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
  }),
})

const notesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string().optional(),
  }),
})

const seriesDescriptionsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string().optional(),
    ctaVariant: z.string().optional(),
  }),
})

export const collections = {
  blog: blogCollection,
  linkedin: linkedinCollection,
  authors: authorCollection,
  'category-descriptions': categoryDescriptionsCollection,
  notes: notesCollection,
  'series-descriptions': seriesDescriptionsCollection,
}
