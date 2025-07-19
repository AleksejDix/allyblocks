import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview'
import { beforeAll, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import { setProjectAnnotations } from '@storybook/react-vite'
import * as projectAnnotations from './preview'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

const annotations = setProjectAnnotations([a11yAddonAnnotations, projectAnnotations])

beforeAll(annotations.beforeAll)
