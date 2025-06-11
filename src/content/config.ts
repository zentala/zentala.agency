import { defineCollection, z } from 'astro:content'

const authorCollection = defineCollection({
  type: 'data',
  schema: z.array(
    z.object({
      slug: z.string(),
      name: z.string(),
      role: z.string(),
      avatar: z.string(),
      profileUrl: z.string().default('/about/me'),
      version: z.string(),
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
    authorVersion: z.string(),
    imageUrl: z.string().optional(),
    excerpt: z.string().optional(),
    readingTime: z.number().optional(),
    tags: z.array(z.string()).optional(),
    bannerEnd: z.string().optional(),
    published: z.boolean().optional(),
  }),
})

export const collections = {
  blog: blogCollection,
  authors: authorCollection,
}
