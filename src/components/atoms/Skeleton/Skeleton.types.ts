import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { skeletonVariants } from './Skeleton.variants'

/**
 * Props for the Skeleton component.
 * Follows Radix UI Skeleton API pattern.
 */
export type SkeletonProps = Omit<React.ComponentProps<'span'>, 'children'> & {
  /**
   * Whether to show the skeleton or its children
   * @default true
   */
  loading?: boolean

  /**
   * Width of the skeleton
   */
  width?: string

  /**
   * Minimum width of the skeleton
   */
  minWidth?: string

  /**
   * Maximum width of the skeleton
   */
  maxWidth?: string

  /**
   * Height of the skeleton
   */
  height?: string

  /**
   * Minimum height of the skeleton
   */
  minHeight?: string

  /**
   * Maximum height of the skeleton
   */
  maxHeight?: string

  /**
   * Children to show when loading is false
   */
  children?: React.ReactNode
} & VariantProps<typeof skeletonVariants>

export type SkeletonRef = React.ComponentRef<'span'>
