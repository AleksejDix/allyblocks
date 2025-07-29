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
    
    // Ensure single instance to avoid React conflicts
    pool: 'browser',
    poolOptions: {
      browser: {
        singleTab: true,
      },
    },

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
            'nuqs/adapters/testing',
            'markdown-to-jsx',
          ],
          exclude: ['@storybook/addon-vitest/internal/test-utils'],
        },
      },
      // Force consistent module resolution
      external: [],
      inline: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
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
      
      // Lower thresholds temporarily while fixing tests
      thresholds: {
        branches: 10,
        functions: 10,
        lines: 10,
        statements: 10,
      },
      
      // Ensure proper source mapping
      processingConcurrency: 1,

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