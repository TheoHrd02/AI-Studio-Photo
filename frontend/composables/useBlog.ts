/** 2026-10-06 → "6 octobre 2026" (UTC: same output on server and client) */
export const formatArticleDate = (date: string, locale: string) =>
  new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(date))

/** JSON-LD for useHead; `<` escaped so content can't close the script tag */
export const jsonLdScript = (data: object) => ({
  type: 'application/ld+json' as const,
  innerHTML: JSON.stringify(data).replace(/</g, '\\u003c'),
})
