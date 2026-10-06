import { queryCollection } from '@nuxt/content/server'
import type { H3Event } from 'h3'

// Blog queries run on the server only: in the browser, Nuxt Content would download
// SQLite WASM (~850 KB) + the whole dump, and the CSP (no 'wasm-unsafe-eval') blocks it.

/** Blog articles; drafts (`draft: true`) only show up with `pnpm dev` */
export const queryArticles = (event: H3Event) => {
  const query = queryCollection(event, 'blog')
  return import.meta.dev ? query : query.where('draft', '=', false)
}

/** ?locale= validated against the i18n locales */
export const blogLocaleParam = (event: H3Event) => {
  const locale = String(getQuery(event).locale)
  const locales = useRuntimeConfig(event).public.i18n.locales as { code: string }[]
  if (!locales.some(l => l.code === locale)) throw createError({ statusCode: 400, statusMessage: 'Invalid locale' })
  return locale
}
