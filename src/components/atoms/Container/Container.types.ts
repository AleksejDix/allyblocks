import type React from 'react'

/**
 * Container size variants for responsive design
 */
export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

/**
 * Container padding variants
 */
export type ContainerPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Props for the Container component.
 * A responsive container component that centers content and provides consistent max-widths.
 */
export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The HTML element to render as.
   * @default 'div'
   */
  as?: React.ElementType

  /**
   * Maximum width of the container.
   * Uses Tailwind's container breakpoints by default, or custom sizes.
   * @default undefined (uses Tailwind's responsive container)
   */
  size?: ContainerSize

  /**
   * Horizontal padding for the container.
   * @default 'md'
   */
  padding?: ContainerPadding

  /**
   * Whether to center the container horizontally.
   * @default true
   */
  centered?: boolean

  /**
   * Custom className to apply to the container.
   */
  className?: string

  /**
   * Children to render inside the container.
   */
  children?: React.ReactNode
}

/**
 * Ref type for the Container component.
 */
export type ContainerRef = HTMLElement
