import { articleSlug } from '~/config/blog.config'

/**
 * Article ?locale=&slug= with its translations and related articles (same feature).
 * Unknown in this locale but known in another (the language switcher keeps the slug):
 * { redirect } to the translation, else to the blog index.
 */
export default defineEventHandler(async (event) => {
  const locale = blogLocaleParam(event)
  const slug = String(getQuery(event).slug)
  if (!/^[a-z0-9-]+$/.test(slug)) throw createError({ statusCode: 404, statusMessage: 'Article not found' })

  const article = await queryArticles(event).path(`/blog/${locale}/${slug}`).first()
  if (!article) {
    const source = await queryArticles(event).where('path', 'LIKE', `/blog/%/${slug}`).select('translationKey').first()
    if (!source) throw createError({ statusCode: 404, statusMessage: 'Article not found' })
    const translation = source.translationKey
      ? await queryArticles(event)
          .where('translationKey', '=', source.translationKey)
          .where('path', 'LIKE', `/blog/${locale}/%`)
          .select('path')
          .first()
      : null
    return { redirect: translation ? `/blog/${articleSlug(translation.path)}` : '/blog' }
  }

  const [translations, related] = await Promise.all([
    article.translationKey
      ? queryArticles(event).where('translationKey', '=', article.translationKey).select('path').all()
      : [{ path: article.path }],
    article.feature
      ? queryArticles(event)
          .where('feature', '=', article.feature)
          .where('path', 'LIKE', `/blog/${locale}/%`)
          .where('path', '<>', article.path)
          .order('date', 'DESC')
          .limit(3)
          .select('path', 'title', 'description')
          .all()
      : [],
  ])
  return { article, translations, related }
})
