import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { badgeVariants } from './Badge.variants'

/**
 * Allowed child elements when using asChild prop
 */
type AllowedChildElements =
  | React.ReactElement<React.ComponentProps<'div'>, 'div'>
  | React.ReactElement<React.ComponentProps<'span'>, 'span'>
  | React.ReactElement<React.ComponentProps<'a'>, 'a'>
  | React.ReactElement<React.ComponentProps<'button'>, 'button'>

/**
 * Props for the Badge component.
 * Extends all standard span element props plus Badge-specific variants.
 */
export type BadgeProps = React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> &
  (
    | {
        /**
         * When false, renders as a span element (default behavior).
         * @default false
         */
        asChild?: false
        children?: React.ReactNode
      }
    | {
        /**
         * When true, merges props and renders as the immediate child element.
         * Only div, span, a, and button elements are allowed for proper semantics.
         * @default false
         */
        asChild: true
        children: AllowedChildElements
      }
  )
