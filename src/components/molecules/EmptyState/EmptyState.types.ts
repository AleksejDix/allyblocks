import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { emptyStateVariants, emptyStateContentVariants } from './EmptyState.variants'

export type EmptyStateProps = React.ComponentProps<'section'> &
  VariantProps<typeof emptyStateVariants> & {
    /**
     * Additional CSS classes for the empty state container
     */
    className?: string
  }

export type EmptyStateContentProps = React.ComponentProps<'div'> &
  VariantProps<typeof emptyStateContentVariants> & {
    /**
     * Additional CSS classes for the content container
     */
    className?: string
    /**
     * Content to display inside the empty state
     */
    children?: React.ReactNode
  }
