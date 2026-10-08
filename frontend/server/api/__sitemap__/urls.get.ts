import { articleLocale, articleSlug } from '~/config/blog.config'
import { SITEMAP_URLS } from '~/config/sitemap-urls'

// Static pages: every locale (_i18nTransform), no lastmod (a fake "now" teaches Google to ignore it).
// Blog: only the languages each article exists in, lastmod = frontmatter date.
export default defineSitemapEventHandler(async (event) => {
  const { defaultLocale, locales: localeOptions } = useRuntimeConfig().public.i18n
  const locales = localeOptions as { code: string, language?: string }[]
  const language = (code: string) => locales.find(l => l.code === code)?.language ?? code
  const localized = (code: string, path: string) => code === defaultLocale ? path : `/${code}${path}`

  const articles = await queryArticles(event).select('path', 'date', 'updated', 'translationKey').all()

  // One entry per (locale, path) with the hreflang alternates of the group
  const entry = (code: string, path: string, group: { code: string, path: string }[], lastmod?: string) => ({
    loc: localized(code, path),
    lastmod,
    _sitemap: language(code),
    alternatives: [
      ...group.map(g => ({ hreflang: language(g.code), href: localized(g.code, g.path) })),
      ...group.filter(g => g.code === defaultLocale).map(g => ({ hreflang: 'x-default', href: localized(g.code, g.path) })),
    ],
  })

  const blogArticles = articles.map((a) => {
    const group = articles
      .filter(o => o === a || (a.translationKey && o.translationKey === a.translationKey))
      .map(o => ({ code: articleLocale(o.path), path: `/blog/${articleSlug(o.path)}` }))
    return entry(articleLocale(a.path), `/blog/${articleSlug(a.path)}`, group, a.updated ?? a.date)
  })

  const blogIndexes = [...new Set(articles.map(a => articleLocale(a.path)))]
    .map((code, _, codes) => entry(code, '/blog', codes.map(c => ({ code: c, path: '/blog' }))))

  return [
    ...SITEMAP_URLS.map(loc => ({ loc, _i18nTransform: true })),
    ...blogIndexes,
    ...blogArticles,
  ]
})
