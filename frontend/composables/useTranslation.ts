import frTranslations from '~/locales/fr.json'
import enTranslations from '~/locales/en.json'

export const useTranslation = () => {
  const locale = useState<'fr' | 'en'>('locale', () => 'fr')

  const translations = {
    fr: frTranslations,
    en: enTranslations,
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: unknown = translations[locale.value]

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      }
      else {
        return key // Retourne la clé si non trouvée
      }
    }

    return typeof value === 'string' ? value : key
  }

  const setLocale = (newLocale: 'fr' | 'en') => {
    locale.value = newLocale
  }

  return {
    t,
    locale,
    setLocale,
  }
}
