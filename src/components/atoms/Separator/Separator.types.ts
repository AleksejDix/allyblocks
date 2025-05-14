import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

export type SeparatorOrientation = 'horizontal' | 'vertical'

export type SeparatorProps = React.ComponentProps<typeof SeparatorPrimitive.Root> & {
  /**
   * Optional class name to apply custom styles
   */
  className?: string

  /**
   * The orientation of the separator
   * @default "horizontal"
   */
  orientation?: SeparatorOrientation

  /**
   * When true, indicates that the separator is purely visual and doesn't represent a semantic boundary
   * @default true
   */
  decorative?: boolean
}
