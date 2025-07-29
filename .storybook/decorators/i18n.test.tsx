import * as React from 'react'
import type { Decorator } from '@storybook/react-vite'
import { I18nextProvider } from 'react-i18next'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Ensure React is available
if (typeof window !== 'undefined' && !window.React) {
  window.React = React
}

// Create a test-safe i18n instance
const testI18n = i18n.createInstance()

testI18n
  .use(initReactI18next)
  .init({
    lng: 'de',
    fallbackLng: 'de',
    supportedLngs: ['de', 'en', 'fr', 'it'],
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'translation',
    ns: ['translation', 'language-switcher'],
    resources: {
      en: {
        translation: {
          hello: 'Hello',
        },
        'language-switcher': {
          language_switcher_trigger_label: 'Change language, current language is {{language}}',
          select_language_label: 'Select language',
          change_language_to: 'Change language to {{language}}',
        },
      },
      de: {
        translation: {
          hello: 'Hallo',
        },
        'language-switcher': {
          language_switcher_trigger_label: 'Sprache ändern, aktuelle Sprache ist {{language}}',
          select_language_label: 'Sprache auswählen',
          change_language_to: 'Sprache ändern zu {{language}}',
        },
      },
      fr: {
        translation: {
          hello: 'Bonjour',
        },
        'language-switcher': {
          language_switcher_trigger_label: 'Changer de langue, langue actuelle: {{language}}',
          select_language_label: 'Sélectionner la langue',
          change_language_to: 'Changer la langue en {{language}}',
        },
      },
      it: {
        translation: {
          hello: 'Ciao',
        },
        'language-switcher': {
          language_switcher_trigger_label: 'Cambia lingua, lingua corrente: {{language}}',
          select_language_label: 'Seleziona lingua',
          change_language_to: 'Cambia lingua in {{language}}',
        },
      },
    },
  })

export const withI18nextTest: Decorator = (StoryFn, context) => {
  const locale = context.globals.locale || 'de'
  
  // Change language if needed
  if (testI18n.language !== locale) {
    testI18n.changeLanguage(locale)
  }

  return (
    <I18nextProvider i18n={testI18n}>
      <StoryFn />
    </I18nextProvider>
  )
}