import type { ComponentProps } from 'react'

export type PriceCardProps = ComponentProps<'div'> & {
  /**
   * Content to display inside the price card
   */
  children?: React.ReactNode
}
