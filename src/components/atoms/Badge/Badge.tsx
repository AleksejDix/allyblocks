import { memo } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'
import { badgeVariants } from './Badge.variants'
import type { BadgeProps } from './Badge.types'

/**
 * Badge component for displaying labels, status indicators, and categorization.
 *
 * Features:
 * - 22+ color variants with WCAG AAA contrast compliance
 * - 3 size variants (sm, md, lg)
 * - Automatic dark mode support
 * - Can render as child element via asChild prop
 * - Optimized for icons and text content
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Badge color="blue" size="md">New</Badge>
 *
 * // With icon
 * <Badge color="green">
 *   <CheckIcon />
 *   <span>Verified</span>
 * </Badge>
 *
 * // As a link
 * <Badge asChild color="purple">
 *   <a href="/profile">Profile</a>
 * </Badge>
 * ```
 */
export const Badge = memo(function Badge({ className, color, size, asChild = false, children, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : 'span'

  // Edge case: Handle empty children gracefully
  if (!children && !asChild) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        'Badge: Empty children provided. Badge will not render. Consider providing content or using asChild prop.',
      )
    }
    return null
  }

  return (
    <Comp data-slot="badge" className={cn(badgeVariants({ color, size }), className)} {...props}>
      {children}
    </Comp>
  )
})
