import type React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { keyboardKeyVariants } from './KeyboardKey.variants'

/**
 * Common keyboard key names for better UX
 */
export type CommonKeyName =
  | 'ctrl'
  | 'cmd'
  | 'alt'
  | 'shift'
  | 'tab'
  | 'enter'
  | 'space'
  | 'esc'
  | 'delete'
  | 'backspace'
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'home'
  | 'end'
  | 'pageup'
  | 'pagedown'
  | 'f1'
  | 'f2'
  | 'f3'
  | 'f4'
  | 'f5'
  | 'f6'
  | 'f7'
  | 'f8'
  | 'f9'
  | 'f10'
  | 'f11'
  | 'f12'

/**
 * Allowed child elements when using asChild prop
 */
type AllowedChildElements =
  | React.ReactElement<React.ComponentProps<'kbd'>, 'kbd'>
  | React.ReactElement<React.ComponentProps<'span'>, 'span'>
  | React.ReactElement<React.ComponentProps<'code'>, 'code'>

/**
 * Props for the KeyboardKey component.
 * Displays keyboard keys with proper styling and accessibility.
 */
export type KeyboardKeyProps = React.ComponentProps<'kbd'> &
  VariantProps<typeof keyboardKeyVariants> &
  (
    | {
        /**
         * When false, renders as a kbd element (default behavior).
         * @default false
         */
        asChild?: false
        children?: React.ReactNode
      }
    | {
        /**
         * When true, merges props and renders as the immediate child element.
         * Only kbd, span, and code elements are allowed for proper semantics.
         * @default false
         */
        asChild: true
        children: AllowedChildElements
      }
  ) & {
    /**
     * Common key name for automatic formatting and accessibility.
     * When provided, automatically formats the key display and aria-label.
     */
    keyName?: CommonKeyName

    /**
     * Whether to show platform-specific key names (e.g., Cmd on Mac, Ctrl on Windows).
     * Only applies when keyName is provided.
     * @default true
     */
    platformSpecific?: boolean
  }

/**
 * Ref type for the KeyboardKey component.
 */
export type KeyboardKeyRef = HTMLElement
