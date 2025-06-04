import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { stackVariants } from './Stack.variants'

/**
 * Props for the Stack component.
 * A layout component for arranging children in vertical or horizontal stacks.
 */
export type StackProps = React.HTMLAttributes<HTMLElement> & {
  /**
   * The HTML element to render
   * @default "div"
   */
  as?: 'div' | 'span' | 'ul' | 'ol' | 'li' | 'fieldset' | 'section' | 'article' | 'nav' | 'aside'

  /**
   * Stack content
   */
  children?: React.ReactNode

  /**
   * Reverse the render order of child items
   * @default false
   */
  reverseOrder?: boolean
} & VariantProps<typeof stackVariants>

/**
 * Stack component ref type
 */
export type StackRef = HTMLElement
