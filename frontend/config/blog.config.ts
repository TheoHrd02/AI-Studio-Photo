/**
 * Blog: authors and path conventions. Articles live in content/blog/{locale}/{slug}.md
 * (collection in content.config.ts, writing guide in docs/BLOG.md).
 */

/** Article authors (frontmatter `author`). Role and bio are translated: blog.authors.{id}.role / .bio */
export const blogAuthors = {
  // TODO(content): confirm name, add LinkedIn / site URLs in sameAs (E-E-A-T signal + Person schema)
  theo: {
    name: 'Théo Heredia',
    sameAs: [] as string[],
  },
}

export type BlogAuthorId = keyof typeof blogAuthors

/** Collection path /blog/{locale}/{slug} → locale and slug */
export const articleLocale = (path: string) => path.split('/')[2]!
export const articleSlug = (path: string) => path.split('/')[3]!
