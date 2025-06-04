import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { stackVariants } from './Stack.variants'
import type { StackProps, StackRef } from './Stack.types'

/**
 * Stack component for displaying children in vertical or horizontal arrangements.
 * Based on CSS Flexbox, similar to Shopify Polaris BlockStack.
 *
 * Features:
 * - Flexible gap spacing with t-shirt sizes
 * - Alignment control for both main and cross axis
 * - Support for different flex directions
 * - Polymorphic component (can render as any HTML element)
 * - Reverse order capability
 *
 * @example
 * ```tsx
 * // Basic vertical stack
 * <Stack gap="md">
 *   <Text>First item</Text>
 *   <Text>Second item</Text>
 * </Stack>
 *
 * // Horizontal stack with center alignment
 * <Stack direction="row" justify="center" gap="sm">
 *   <Button>Action 1</Button>
 *   <Button>Action 2</Button>
 * </Stack>
 *
 * // Custom spacing and alignment
 * <Stack gap="xl" justify="center" align="center">
 *   <Text>Centered content</Text>
 * </Stack>
 * ```
 */
export const Stack = forwardRef<StackRef, StackProps>(function Stack(
  { className, gap, justify, align, direction, as: Component = 'div', reverseOrder = false, children, style, ...props },
  ref,
) {
  // Handle reverse order by converting children to array and reversing
  const processedChildren = reverseOrder && children ? React.Children.toArray(children).reverse() : children

  return (
    <Component
      ref={ref as any}
      className={cn(
        stackVariants({
          gap,
          justify,
          align,
          direction,
        }),
        className,
      )}
      style={style}
      {...props}
    >
      {processedChildren}
    </Component>
  )
})

Stack.displayName = 'Stack'
