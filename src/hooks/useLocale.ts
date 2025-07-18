import { useTranslation } from 'react-i18next'

export function useLocale(): 'de-CH' | 'fr-CH' | 'it-CH' | 'en' {
  const { i18n } = useTranslation()

  // Map i18n locales to Swiss locales
  switch (i18n.language) {
    case 'de':
      return 'de-CH'
    case 'fr':
      return 'fr-CH'
    case 'it':
      return 'it-CH'
    case 'en':
    default:
      return 'en'
  }
}
