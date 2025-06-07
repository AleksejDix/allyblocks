import type { ComponentProps } from 'react'
import type { StackProps } from '@/components/atoms/Stack/Stack.types'
import type { IconProps } from '@/components/atoms/Icon/Icon.types'

export type BulletListItem = {
  /**
   * The text content of the list item
   */
  text: string

  /**
   * Icon name to use as bullet (from Icon component)
   * @default 'check'
   */
  icon?: IconProps['name']

  /**
   * Whether this item is disabled/muted
   * @default false
   */
  disabled?: boolean
}

export type BulletListProps = ComponentProps<'ul'> & {
  /**
   * Gap between list items (from Stack component)
   * @default 'sm'
   */
  gap?: StackProps['gap']

  /**
   * Content to display in bullet list
   */
  children?: React.ReactNode
}
