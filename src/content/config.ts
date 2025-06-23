import { defineCollection, z } from 'astro:content'

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
  }),
})

const categoryDescriptionsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
  }),
})

export const collections = {
  blog: blogCollection,
  authors: authorCollection,
  'category-descriptions': categoryDescriptionsCollection,
}
