import '../src/styles/index.css'
import { withBrandTest } from './decorators/brand.test'
import { withI18nextTest } from './decorators/i18n.test'
import { withNuqsTest } from './decorators/nuqs.test'
import type { Preview } from '@storybook/react-vite'

// Minimal preview configuration for tests
// Disabling problematic decorators (withI18next, withQuery, withNuqs) that cause hook errors
const parameters: Preview['parameters'] = {
  backgrounds: {
    disable: true,
  },
  docs: {
    toc: true,
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  options: {
    storySort: {
      order: [
        'Docs',
        ['Introduction', 'Atomic Design', 'Component Categories'],
        'Atoms',
        ['Input', 'Action', 'Display', 'Layout'],
        'Molecules',
        'Organisms',
      ],
    },
  },
  a11y: {
    config: {
      rules: [
        {
          id: 'color-contrast',
          enabled: true,
        },
      ],
    },
    test: 'todo',
  },
}

const globalTypes: Preview['globalTypes'] = {
  brand: {
    name: 'Brand',
    description: 'Brand',
    defaultValue: 'schadcn',
    toolbar: {
      icon: 'contrast',
      items: [
        { value: 'medidata', title: 'MediData' },
        { value: 'schadcn', title: 'schadcn' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'de',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', title: 'English' },
        { value: 'de', title: 'Deutsch' },
        { value: 'fr', title: 'Français' },
        { value: 'it', title: 'Italiano' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
}

const preview: Preview = {
  // Use test-safe decorators that don't cause hook errors
  decorators: [withBrandTest, withI18nextTest, withNuqsTest],
  globalTypes,
  parameters,
}

export default preview