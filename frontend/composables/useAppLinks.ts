import { appLegalUrl, appUrl, saasConfig, type AppLegalDoc } from '~/config/saas.config'

/** Liens vers l'application, dans la langue de la page (voir config/saas.config.ts). */
export function useAppLinks() {
  const { locale } = useI18n()

  return {
    signupUrl: computed(() => appUrl(saasConfig.signupPath, locale.value)),
    loginUrl: computed(() => appUrl(saasConfig.loginPath, locale.value)),
    legalUrl: (doc: AppLegalDoc) => appLegalUrl(doc, locale.value),
  }
}
