import * as React from 'react'
import { type StackProps } from '@/components/atoms/Stack/Stack.types'

export type EmptyProps = React.ComponentProps<'section'> & {
  /**
   * Gap spacing between child elements (from Stack component)
   */
  gap?: StackProps['gap']
  /**
   * Additional CSS classes for the empty container
   */
  className?: string
  /**
   * Content to display inside the empty state
   */
  children?: React.ReactNode
}
