/**
 * Liens vers l'application Glint Studio (https://app.glintstudio.ai) : seule source des redirections du site vitrine.
 * Composants : `useAppLinks()` (langue de la page) ; nuxt.config.ts : redirections 301 des anciennes pages légales.
 *
 * Routes vérifiées dans le dépôt de l'app (AI-Studio-Photo-App/frontend/pages/) :
 * - `/signin` (signin.vue) : connexion ET inscription, par OAuth (Google, GitHub, Microsoft selon la configuration).
 *   Un nouveau compte passe ensuite par `/signup/accept` (acceptation des CGU) et reçoit les crédits de bienvenue du
 *   plan Free (FREE_PLAN_WELCOME_CREDITS côté backend), sans carte bancaire. Il n'existe ni `/signup` ni `/login`.
 * - `/legal/{terms,sales,privacy,cookies,acceptable-use}` (legal/[document].vue) : textes versionnés servis par l'API.
 * - `/legal/notice` (legal/notice.vue) : mentions légales et sous-traitants.
 *
 * Langues de l'app : @nuxtjs/i18n en `prefix_except_default`, anglais par défaut (`/signin` = anglais, `/fr/signin`,
 * `/de/signin`…). Une adresse préfixée impose sa langue (app : utils/locale-resolution.ts).
 */

const SAAS_BASE_URL = 'https://app.glintstudio.ai'

/** Langue servie sans préfixe par l'app (différente de celle du site vitrine : fr). */
const APP_DEFAULT_LOCALE = 'en'
const APP_LOCALES: readonly string[] = ['en', 'fr', 'de', 'it', 'es']

/** Textes légaux de l'app, dans l'ordre du pied de page. */
export const appLegalDocs = ['notice', 'terms', 'sales', 'privacy', 'cookies', 'acceptable-use'] as const
export type AppLegalDoc = typeof appLegalDocs[number]

export const saasConfig = {
  /** Root of the SaaS application */
  baseUrl: SAAS_BASE_URL,

  /** Inscription : même page que la connexion (OAuth) */
  signupPath: '/signin',

  /** Connexion des utilisateurs existants */
  loginPath: '/signin',

  /** Contact entreprise : section contact de la page Aide du site vitrine (aucune prise de rendez-vous en ligne) */
  enterpriseContactPath: '/help#contact',
} as const

/** Adresse absolue d'une page de l'app, dans la langue donnée (code du site vitrine : fr, en, de, it, es). */
export function appUrl(path: string, locale: string): string {
  const prefix = locale !== APP_DEFAULT_LOCALE && APP_LOCALES.includes(locale) ? `/${locale}` : ''
  return `${SAAS_BASE_URL}${prefix}${path}`
}

/** Adresse absolue d'un texte légal de l'app, dans la langue donnée. */
export function appLegalUrl(doc: AppLegalDoc, locale: string): string {
  return appUrl(`/legal/${doc}`, locale)
}

export type SaasConfig = typeof saasConfig
