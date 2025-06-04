import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { textVariants } from './Text.variants'
import type { TextProps, TextRef } from './Text.types'

/**
 * Text component for displaying text content with systematic typography.
 *
 * A type-based typography system with two main categories:
 *
 * Features:
 * - Type system: 'body' (4 sizes) and 'heading' (6 sizes)
 * - Numerical font weights (100-900) matching CSS standards
 * - Tone variants for semantic color meanings
 * - Text decoration options (underline, strikethrough)
 * - Text alignment and truncation support
 * - Accessibility features (visually hidden text)
 * - Polymorphic component (can render as any HTML element)
 *
 * @example
 * ```tsx
 * // Body text variants
 * <Text type="body" size={1}>Small body text</Text>
 * <Text type="body" size={2}>Default body text</Text>
 * <Text type="body" size={3}>Large body text</Text>
 * <Text type="body" size={4}>Extra large body text</Text>
 *
 * // Heading variants
 * <Text type="heading" size={1} as="h1">Main title</Text>
 * <Text type="heading" size={2} as="h2">Section title</Text>
 * <Text type="heading" size={3} as="h3">Subsection title</Text>
 *
 * // Weight and tone combinations
 * <Text weight={700} tone="success">Bold success message</Text>
 * <Text weight={300} tone="muted">Light muted text</Text>
 *
 * // Styling options
 * <Text decoration="underline">Underlined text</Text>
 * <Text align="center">Centered text</Text>
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
    type,
    size,
    weight,
    tone,
    decoration,
    align,
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
          type,
          size,
          weight,
          tone,
          decoration,
          align,
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
