/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    name: 'unit',
    globals: true,
    testTimeout: 5000,
    hookTimeout: 10000,
    environment: 'node',

    include: [
      'src/**/*.unit.test.{js,ts,tsx}',
      'src/**/*.unit.spec.{js,ts,tsx}',
      'src/**/*.test.{js,ts,tsx}', // Keep compatibility with existing tests
    ],
    exclude: [
      'src/**/*.stories.{js,ts,tsx}', 
      'node_modules', 
      'dist', 
      '.idea', 
      '.git', 
      '.cache'
    ],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage/unit',

      thresholds: {
        branches: 50,
        functions: 50,
        lines: 50,
        statements: 50,
      },

      include: ['src/**/*.{js,ts,tsx}'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.{test,spec}.{js,ts,tsx}',
        'src/**/*.stories.{js,ts,tsx}',
        'src/**/*.types.ts',
        'src/main.tsx',
        'src/App.tsx',
        '**/index.ts',
      ],
    },

    reporters: ['verbose'],
  },
})
