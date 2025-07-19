/// <reference types="vitest" />
/// <reference types="@vitest/browser/providers/playwright" />
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import path from 'node:path'

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  extends: './vite.config.ts',
  plugins: [
    storybookTest({
      // The location of your Storybook config, main.js|ts
      configDir: path.join(dirname, '.storybook'),
      // This should match your package.json script to run Storybook
      // The --ci flag will skip prompts and not open a browser
      storybookScript: 'npm run storybook --ci',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    name: 'browser',
    globals: true,
    testTimeout: 30000,
    hookTimeout: 10000,

    include: [
      'src/**/*.stories.{js,ts,tsx}',
    ],

    setupFiles: ['./.storybook/vitest.setup.ts'],
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [
        {
          browser: 'chromium',
          context: {
            locale: 'de-DE',
          },
        },
      ],
      headless: true,
    },

    deps: {
      // Vite's dependency optimizer configuration for browser tests.
      optimizer: {
        web: {
          enabled: true,
          include: [
            'react',
            'react-dom',
            'react/jsx-runtime',
            'react/jsx-dev-runtime',
            '@radix-ui/**',
            'react-i18next',
            'i18next',
            '@storybook/react-vite',
            '@storybook/addon-vitest',
            '@testing-library/react',
            '@tanstack/react-query',
            'nuqs',
          ],
        },
      },
    },
    
    // prebundle common js modules
    server: {
      deps: {
        inline: ['react', 'react-dom', 'react-i18next', 'i18next', /@radix-ui\/.*/],
      },
    },

    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage/browser',

      thresholds: {
        branches: 20,
        functions: 20,
        lines: 20,
        statements: 20,
      },

      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        '**/*.stories.{ts,tsx}',
        '**/*.d.ts',
        'src/main.tsx',
        'src/App.tsx',
        '**/index.ts',
        'node_modules/**',
        'dist/**',
        '.storybook/**',
        '**/*.config.*',
        'scripts/**',
        'coverage/**',
        '**/lucide-react/**',
      ],
    },

    reporters: ['verbose'],
  },
})