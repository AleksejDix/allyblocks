import { useTranslation } from 'react-i18next'
import { Button } from '@/components/atoms/Button'
import {
  ActionMenu,
  ActionMenuContent,
  ActionMenuTrigger,
  ActionMenuLabel,
  ActionMenuSeparator,
  ActionMenuRadioGroup,
  ActionMenuRadioItem,
} from '@/components/molecules/ActionMenu'
import { Icon } from '@/components/atoms/Icon'

import { useQueryState } from 'nuqs'

// Import local translation files
import translationEN from './locales/en/language-switcher.json'
import translationDE from './locales/de/language-switcher.json'
import translationFR from './locales/fr/language-switcher.json'
import translationIT from './locales/it/language-switcher.json'

// Local translation hook for the language menu UI only
const useLocalTranslation = () => {
  const { t, i18n } = useTranslation('language-switcher')

  // Only load translations for the language menu UI
  if (!i18n.hasResourceBundle('en', 'language-switcher')) {
    i18n.addResourceBundle('en', 'language-switcher', translationEN)
    i18n.addResourceBundle('de', 'language-switcher', translationDE)
    i18n.addResourceBundle('fr', 'language-switcher', translationFR)
    i18n.addResourceBundle('it', 'language-switcher', translationIT)
  }

  return { t, i18n }
}

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
  { code: 'it', name: 'Italiano' },
]

export function LanguageMenu() {
  const { t } = useLocalTranslation()
  const [lang, setLang] = useQueryState('lang', { defaultValue: 'de', clearOnDefault: false })

  // Find the current language name based on the URL parameter
  const currentLanguage = LANGUAGES.find((language) => language.code === lang)?.name

  return (
    <ActionMenu>
      <ActionMenuTrigger asChild>
        <Button
          variant="ghost"
          aria-label={t('language_switcher_trigger_label', {
            language: currentLanguage,
          })}
        >
          <Icon name="languages" />
          {currentLanguage}
          <Icon name="chevron-down" />
        </Button>
      </ActionMenuTrigger>
      <ActionMenuContent align="end" className="min-w-[180px]">
        <ActionMenuLabel>{t('select_language_label')}</ActionMenuLabel>
        <ActionMenuSeparator />
        <ActionMenuRadioGroup value={lang} onValueChange={(value) => setLang(value)}>
          {LANGUAGES.map((language) => (
            <ActionMenuRadioItem
              key={language.code}
              value={language.code}
              aria-label={t('change_language_to', {
                language: language.name,
              })}
              lang={language.code}
              className="flex items-center gap-2 justify-between cursor-pointer"
            >
              {language.name}
            </ActionMenuRadioItem>
          ))}
        </ActionMenuRadioGroup>
      </ActionMenuContent>
    </ActionMenu>
  )
}
