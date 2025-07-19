import type { Decorator } from '@storybook/react-vite'
import * as React from 'react'

export const withBrand: Decorator = (Story, context) => {
  const { brand } = context.globals

  React.useEffect(() => {
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
  }, [brand])

  return <Story />
}
