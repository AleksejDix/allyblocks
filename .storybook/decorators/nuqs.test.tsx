import * as React from 'react'
import type { Decorator } from '@storybook/react-vite'
import { NuqsTestingAdapter } from 'nuqs/adapters/testing'

// Ensure React is available
if (typeof window !== 'undefined' && !window.React) {
  window.React = React
}

export const withNuqsTest: Decorator = (StoryFn) => {
  return (
    <NuqsTestingAdapter>
      <StoryFn />
    </NuqsTestingAdapter>
  )
}