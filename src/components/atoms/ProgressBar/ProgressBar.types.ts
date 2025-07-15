import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { progressBarVariants } from './ProgressBar.variants'

/**
 * Props for the ProgressBar component.
 * Extends all standard div element props plus ProgressBar-specific variants.
 */
export type ProgressBarProps = React.ComponentProps<'div'> &
  VariantProps<typeof progressBarVariants> & {
    /**
     * Current progress value (0-100)
     */
    value: number
    /**
     * Maximum value for progress calculation
     * @default 100
     */
    max?: number
    /**
     * Label for screen readers and accessibility
     */
    label?: string
    /**
     * Show the percentage value visually
     * @default false
     */
    showValue?: boolean
    /**
     * Indeterminate loading state (ignores value)
     * @default false
     */
    indeterminate?: boolean
  }
