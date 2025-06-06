import type { VariantProps } from 'class-variance-authority'
import type React from 'react'

/**
 * Variant options for the Box component.
 * Controls the background color and visual appearance.
 */
export type BoxVariant =
  // System colors
  | 'default'
  | 'muted'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'transparent'
  | 'card'
  | 'popover'
  | 'destructive'
  | 'sidebar'
  | 'sidebar-primary'
  | 'sidebar-accent'
  // Bright colors
  | 'blue'
  | 'red'
  | 'green'
  | 'yellow'
  | 'purple'
  | 'orange'
  | 'pink'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'indigo'
  | 'violet'
  | 'fuchsia'
  | 'rose'
  | 'amber'
  | 'lime'
  // Neutral colors
  | 'zinc'
  | 'slate'
  | 'gray'
  | 'neutral'
  | 'stone'

/**
 * Shadow variant options for the Box component.
 * Controls the shadow/depth appearance.
 */
export type BoxShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Width options for the Box component.
 * Controls the width of the box.
 */
export type BoxWidth =
  | 'auto'
  | 'full'
  | 'screen'
  | 'min'
  | 'max'
  | 'fit'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'

/**
 * Height options for the Box component.
 * Controls the height of the box.
 */
export type BoxHeight =
  | 'auto'
  | 'full'
  | 'screen'
  | 'min'
  | 'max'
  | 'fit'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'

/**
 * Box component variant props derived from CVA.
 */
export interface BoxVariants {
  /** Variant controlling background color */
  variant?: BoxVariant
  /** Shadow variant controlling shadow depth */
  shadow?: BoxShadow
  /** Width of the box */
  width?: BoxWidth
  /** Height of the box */
  height?: BoxHeight
}

/**
 * Props for the Box component.
 *
 * @example
 * ```tsx
 * <Box variant="card" shadow="md" width="lg" height="sm">
 *   Content goes here
 * </Box>
 * ```
 *
 * @example
 * ```tsx
 * <Box variant="blue" width="full">
 *   Blue colored box
 * </Box>
 * ```
 */
export interface BoxProps extends React.HTMLAttributes<HTMLElement>, BoxVariants {
  /**
   * The HTML element or React component to render as.
   * @default "div"
   */
  as?: React.ElementType
}

/**
 * Ref type for the Box component.
 * Since Box can render as any HTML element, the ref type is HTMLElement.
 */
export type BoxRef = HTMLElement
