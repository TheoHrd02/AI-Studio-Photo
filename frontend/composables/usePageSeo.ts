/**
 * Titre, description et Open Graph/Twitter d'une page, en un appel.
 * `title` omis = page d'accueil (titre par défaut traduit, cf. app.vue).
 * Le getter est réactif : les valeurs suivent la langue courante.
 */
export const usePageSeo = (meta: () => { title?: string, description: string, noindex?: boolean }) => {
  const { t } = useI18n()
  const fullTitle = () => {
    const title = meta().title
    return title ? `${title} – Glint Studio` : t('meta.title')
  }

  useSeoMeta({
    title: () => meta().title,
    description: () => meta().description,
    ogTitle: fullTitle,
    ogDescription: () => meta().description,
    twitterTitle: fullTitle,
    twitterDescription: () => meta().description,
    robots: () => meta().noindex ? 'noindex, follow' : undefined,
  })
}

/**
 * Pages that exist in some locales only (blog): locale code → path of each version.
 * app.vue then limits hreflang / og:locale:alternate to these. Keyed by route path so a
 * value left by a previous page is ignored. Unset = the page exists in every locale.
 */
export const usePageAlternates = () =>
  useState<{ path: string, paths: Record<string, string> } | null>('page-alternates', () => null)
