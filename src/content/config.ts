import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    category: z.string(),
    imageUrl: z.string().optional(),
    excerpt: z.string().optional(),
    authorName: z.string(),
    authorAvatar: z.string().optional(),
    authorRole: z.string().optional(),
  }),
})

export const collections = {
  blog: blogCollection,
}
