import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { textVariants } from './Text.variants'
import type { TextProps, TextRef } from './Text.types'

/**
 * Text component for displaying text content with consistent typography.
 *
 * A flexible and comprehensive text component with multiple variant systems:
 *
 * Features:
 * - Semantic variants (display, h1-h6, body, label, caption, lead, code)
 * - Granular size control (xs to 6xl)
 * - Font weight options (light to extrabold)
 * - Color variants (default, muted, success, warning, error, info)
 * - Text alignment (left, center, right, justify)
 * - Text transformations (uppercase, lowercase, capitalize)
 * - Text decorations (underline, strikethrough)
 * - Line height control (none, tight, normal, relaxed, loose)
 * - Letter spacing control (tighter to widest)
 * - Truncation support (single line, multi-line clamp)
 * - Visually hidden text for accessibility
 * - Polymorphic component (can render as any HTML element)
 *
 * @example
 * ```tsx
 * // Semantic variants
 * <Text variant="display">Hero Title</Text>
 * <Text variant="h1" as="h1">Page Title</Text>
 * <Text variant="body">Default body text</Text>
 * <Text variant="label">Form Label</Text>
 * <Text variant="caption" color="muted">Helper text</Text>
 *
 * // Size and weight combinations
 * <Text size="2xl" weight="bold">Large bold text</Text>
 * <Text size="sm" weight="medium" color="muted">Small medium text</Text>
 *
 * // Styling options
 * <Text decoration="underline" color="info">Underlined link</Text>
 * <Text transform="uppercase" tracking="wide">Spaced uppercase</Text>
 * <Text leading="tight" align="center">Centered tight text</Text>
 *
 * // Truncation
 * <Text truncate>Single line truncation</Text>
 * <Text truncate="3">Three line clamp</Text>
 *
 * // Accessibility
 * <Text visuallyHidden>Screen reader only</Text>
 * ```
 */
export const Text = forwardRef<TextRef, TextProps>(function Text(
  {
    className,
    variant,
    size,
    weight,
    color,
    align,
    transform,
    decoration,
    leading,
    tracking,
    truncate,
    as: Component = 'span',
    visuallyHidden = false,
    breakWord = true,
    style,
    children,
    ...props
  },
  ref,
) {
  // Combine custom styles
  const customStyles = {
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
          size,
          weight,
          color,
          align,
          transform,
          decoration,
          leading,
          tracking,
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
