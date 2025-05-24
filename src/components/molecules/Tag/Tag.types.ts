import * as React from 'react'
import type { BadgeProps } from '@/components/atoms/Badge'

/**
 * Props for the Tag component.
 * Extends Badge props and adds removable functionality.
 */
export type TagProps = Omit<BadgeProps, 'asChild'> & {
  /**
   * Callback fired when the tag is removed via X button or keyboard.
   * This prop is required as Tag is designed to be removable.
   */
  onRemove: () => void

  /**
   * Optional label for the remove button for accessibility.
   * @default "Remove tag"
   */
  removeLabel?: string

  /**
   * Whether the tag can be removed.
   * When false, the X button is hidden and keyboard removal is disabled.
   * @default true
   */
  removable?: boolean

  /**
   * Whether the tag is currently being removed (for exit animations).
   * @default false
   */
  removing?: boolean
}
