import * as React from 'react'
import type { Decorator } from '@storybook/react-vite'

// Ensure React is available
if (typeof window !== 'undefined' && !window.React) {
  window.React = React
}

export const withBrandTest: Decorator = (Story, context) => {
  const { brand = 'schadcn' } = context.globals

  // Set brand attribute directly without hooks
  if (typeof document !== 'undefined') {
    const html = document.documentElement
    switch (brand) {
      case 'medidata':
        html.setAttribute('data-brand', 'medidata')
        break
      case 'schadcn':
        html.setAttribute('data-brand', 'schadcn')
        break
      default:
        html.setAttribute('data-brand', 'schadcn')
        break
    }
  }

  return <Story />
}