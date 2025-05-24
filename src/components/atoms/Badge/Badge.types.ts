import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { badgeVariants } from './Badge.variants'

/**
 * Props for the Badge component.
 * Extends all standard span element props plus Badge-specific variants.
 */
export type BadgeProps = React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & {
    /**
     * When true, merges props and renders as the immediate child element instead of a span.
     * Useful for wrapping links, buttons, or other interactive elements.
     * @default false
     */
    asChild?: boolean

    /**
     * The color variant of the badge.
     * Colors are culturally neutral with no semantic meaning.
     * @default 'zinc'
     */
    color?:
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
      | 'zinc'
      | 'slate'
      | 'gray'
      | 'neutral'
      | 'stone'

    /**
     * The size variant of the badge.
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg'
  }
