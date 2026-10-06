import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { blogAuthors } from './config/blog.config'
import { navFeatures } from './config/site.config'

const ids = <T extends string>(list: T[]) => list as [T, ...T[]]

export default defineContentConfig({
  collections: {
    // content/blog/{locale}/{slug}.md → path /blog/{locale}/{slug}. Writing guide: docs/BLOG.md
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        // title, description: built into page collections (description = meta description + lead)
        date: z.string().date(),
        updated: z.string().date().optional(),
        author: z.enum(ids(Object.keys(blogAuthors))),
        /** Glint feature the article leads to (nav id): CTA card + related articles */
        feature: z.enum(ids(navFeatures.map(f => f.id))).optional(),
        /** Cover / social image, absolute path under public/ (1200x630 recommended) */
        image: z.string().optional(),
        imageAlt: z.string().optional(),
        /** "Key takeaways" box shown under the title: short, self-contained answers */
        takeaways: z.array(z.string()).optional(),
        faq: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
        /** Same value on every translation of an article (hreflang + language switcher) */
        translationKey: z.string().optional(),
        /** Drafts are only visible with `pnpm dev` */
        draft: z.boolean().default(false),
      }),
    }),
  },
})
