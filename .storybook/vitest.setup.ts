// IMPORTANT: Load React first before any other imports
import * as React from 'react'
import * as ReactDOM from 'react-dom'

// Make React globally available to avoid hook errors
if (typeof window !== 'undefined') {
  window.React = React
  window.ReactDOM = ReactDOM
}

import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview'
import { beforeAll, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import { setProjectAnnotations } from '@storybook/react-vite'
// Use test-specific preview that disables problematic decorators
import * as projectAnnotations from './preview.test'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

const annotations = setProjectAnnotations([a11yAddonAnnotations, projectAnnotations])

beforeAll(annotations.beforeAll)
