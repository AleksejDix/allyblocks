import type { IconButtonProps } from '@/components/atoms/IconButton'
import type { TooltipProps } from '@/components/molecules/Tooltip'
import type React from 'react'

/**
 * Props for the Copy component.
 * Combines IconButton functionality with Tooltip and copy-to-clipboard behavior.
 */
export interface CopyProps extends Omit<IconButtonProps, 'children' | 'aria-label'> {
  /** The text content to copy to clipboard */
  value: string

  /** Tooltip text to show on hover (defaults to "Copy") */
  tooltip?: string

  /** Tooltip text to show after successful copy (defaults to "Copied!") */
  copiedTooltip?: string

  /** Duration in milliseconds to show the copied state (defaults to 2000) */
  copiedDuration?: number

  /** Callback function called when copy operation succeeds */
  onCopySuccess?: (value: string) => void

  /** Callback function called when copy operation fails */
  onCopyError?: (error: Error) => void

  /** Custom aria-label for the button */
  'aria-label'?: string

  /** Props to pass to the underlying Tooltip component */
  tooltipProps?: Omit<TooltipProps, 'children'>

  /**
   * Change the default rendered element for the one passed as a child,
   * merging their props and behavior.
   */
  asChild?: boolean

  /** Custom children when using asChild */
  children?: React.ReactNode

  /**
   * Custom icon render function or React element.
   * Receives the current state (isCopied) and size.
   * If not provided, defaults to clipboard/clipboard-check icons.
   */
  icon?: React.ReactNode | ((state: { isCopied: boolean; size: 'sm' | 'md' | 'lg' }) => React.ReactNode)
}

/**
 * Ref type for the Copy component.
 */
export type CopyRef = HTMLButtonElement
