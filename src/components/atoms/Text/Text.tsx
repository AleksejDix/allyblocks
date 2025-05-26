import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { textVariants } from './Text.variants'
import type { TextProps, TextRef } from './Text.types'

/**
 * Text component for displaying text content with consistent typography.
 *
 * Based on Shopify Polaris Text component design system.
 *
 * Features:
 * - Comprehensive typography variants (heading3xl to bodyXs)
 * - Semantic tone variants (success, critical, warning, info, subdued)
 * - Font weight control (regular, medium, semibold, bold)
 * - Text alignment options (start, center, end, justify)
 * - Text decoration and transformation
 * - Truncation support (single line, multiline)
 * - Visually hidden text for accessibility
 * - Custom line height and letter spacing
 * - Polymorphic component (can render as any HTML element)
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Text>Default body text</Text>
 *
 * // Heading variants
 * <Text variant="heading2xl" as="h1">Page Title</Text>
 * <Text variant="headingMd" as="h2">Section Title</Text>
 *
 * // Body variants with tone
 * <Text variant="bodyLg" tone="subdued">Secondary information</Text>
 * <Text variant="bodySm" tone="critical">Error message</Text>
 *
 * // Text styling
 * <Text fontWeight="semibold" decoration="underline">Important link</Text>
 * <Text transform="uppercase" alignment="center">Centered uppercase</Text>
 *
 * // Truncation
 * <Text truncate>This text will be truncated with ellipsis</Text>
 * <Text truncate="multiline">This text will be clamped to 3 lines</Text>
 *
 * // Visually hidden (for screen readers)
 * <Text visuallyHidden>Screen reader only content</Text>
 * ```
 */
export const Text = forwardRef<TextRef, TextProps>(function Text(
  {
    className,
    variant,
    tone,
    fontWeight,
    alignment,
    decoration,
    transform,
    truncate,
    as: Component = 'span',
    visuallyHidden = false,
    lineHeight,
    letterSpacing,
    breakWord = true,
    style,
    children,
    ...props
  },
  ref,
) {
  // Combine custom styles
  const customStyles = {
    lineHeight,
    letterSpacing,
    wordBreak: breakWord ? ('break-word' as const) : undefined,
    ...style,
  }

  // Handle visually hidden text
  if (visuallyHidden) {
    return (
      <Component ref={ref} className={cn('sr-only', className)} style={customStyles} {...props}>
        {children}
      </Component>
    )
  }

  return (
    <Component
      ref={ref}
      className={cn(
        textVariants({
          variant,
          tone,
          fontWeight,
          alignment,
          decoration,
          transform,
          truncate,
        }),
        className,
      )}
      style={customStyles}
      {...props}
    >
      {children}
    </Component>
  )
})

Text.displayName = 'Text'
