import { articleLocale } from '~/config/blog.config'

/** Blog index: articles of ?locale=, newest first, + languages that have articles */
export default defineEventHandler(async (event) => {
  const locale = blogLocaleParam(event)
  const [articles, all] = await Promise.all([
    queryArticles(event)
      .where('path', 'LIKE', `/blog/${locale}/%`)
      .order('date', 'DESC')
      .select('path', 'title', 'description', 'date', 'image', 'imageAlt', 'feature')
      .all(),
    queryArticles(event).select('path').all(),
  ])
  return { articles, locales: [...new Set(all.map(a => articleLocale(a.path)))] }
})
