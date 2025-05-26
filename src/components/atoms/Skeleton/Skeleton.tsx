import { memo } from 'react'
import { cn } from '@/lib/utils'
import { skeletonVariants } from './Skeleton.variants'
import type { SkeletonProps } from './Skeleton.types'

/**
 * Skeleton component for displaying loading placeholders.
 *
 * Follows Radix UI Skeleton API pattern.
 *
 * Features:
 * - Loading state control with children support
 * - Simple width and height props
 * - Automatic pulse animation
 * - Accessibility optimized with aria-hidden
 * - Respects user's reduced motion preferences
 * - Preserves dimensions of children when hidden
 * - Disables interactive elements when loading
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Skeleton />
 *
 * // With specific dimensions
 * <Skeleton width="48px" height="48px" />
 *
 * // With children (controlled loading)
 * <Skeleton loading={false}>
 *   <Button>Click me</Button>
 * </Skeleton>
 *
 * // Text skeleton
 * <Skeleton>Lorem ipsum dolor sit amet</Skeleton>
 * ```
 */
export const Skeleton = memo(function Skeleton({
  className,
  loading = true,
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  children,
  style,
  ...props
}: SkeletonProps) {
  // Combine dimension styles
  const dimensionStyles = {
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    ...style,
  }

  if (!loading && children) {
    return (
      <span data-slot="skeleton" className={className} style={style} {...props}>
        {children}
      </span>
    )
  }

  return (
    <span
      data-slot="skeleton"
      aria-hidden="true"
      className={cn(skeletonVariants(), className)}
      style={dimensionStyles}
      {...props}
    >
      {loading ? undefined : children}
    </span>
  )
})
