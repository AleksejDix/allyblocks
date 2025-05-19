# Language Menu Component

This is a decoupled language switcher component designed for microfrontend architectures. It follows a URL-based approach to language selection.

## How It Works

1. The language menu only updates the URL query parameter (`?lang=xx`).
2. It doesn't directly update the application's i18n instance.
3. Each microfrontend is responsible for reading the URL parameter and updating its own i18n instance.

## Implementation in Shell Application

The shell application includes this language menu component which:

- Provides the UI for language selection
- Updates the URL query parameter when a language is selected
- Preserves other URL parameters during language switches
- Defaults to German (`de`) if no language is specified

## Implementation in Microfrontends

Each microfrontend should implement its own logic to:

1. Watch for changes to the URL `lang` parameter
2. Update its own i18n instance when the parameter changes

### Example Implementation for Microfrontends

```tsx
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useQueryState } from 'nuqs'

function LanguageObserver() {
  const { i18n } = useTranslation()
  const [lang] = useQueryState('lang', { defaultValue: 'de' })

  useEffect(() => {
    // Update this microfrontend's i18n instance when URL language changes
    i18n.changeLanguage(lang)
  }, [lang, i18n])

  return null // This is just an observer component with no UI
}

// Add this component to your microfrontend's root component
```

## Benefits

- **Decoupled Architecture**: The language selection UI is separated from the language application logic
- **Consistent UX**: A single language switcher controls the language for all microfrontends
- **Shareable URLs**: Language preference is captured in the URL and can be shared
- **Independent Updates**: Microfrontends can update their translations independently
