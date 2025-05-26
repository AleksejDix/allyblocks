import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { textVariants } from './Text.variants'

/**
 * Props for the Text component.
 * Based on Shopify Polaris Text component API.
 */
export type TextProps = Omit<React.HTMLAttributes<HTMLElement>, 'color'> & {
  /**
   * The HTML element to render
   * @default "span"
   */
  as?: React.ElementType

  /**
   * Text content
   */
  children?: React.ReactNode

  /**
   * Visually hide the text (for screen readers only)
   * @default false
   */
  visuallyHidden?: boolean

  /**
   * Numeric value that controls the vertical spacing between lines of text
   */
  lineHeight?: string | number

  /**
   * Increase or decrease the spacing between characters
   */
  letterSpacing?: string | number

  /**
   * Whether the text should break to new lines
   * @default true
   */
  breakWord?: boolean
} & VariantProps<typeof textVariants>

export type TextRef = React.ComponentRef<'span'>
