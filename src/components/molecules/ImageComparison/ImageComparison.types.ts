import * as React from 'react'

/**
 * Props for the ImageComparison component
 */
export type ImageComparisonProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Children content - must include Before and After components */
  children: React.ReactNode
  /** Controlled value (0-1) */
  value?: number
  /** Default value for uncontrolled component (0-1) */
  defaultValue?: number
  /** Callback when value changes */
  onValueChange?: (value: number) => void
  /** Show before/after labels */
  showLabels?: boolean
  /** Custom before label */
  beforeLabel?: string
  /** Custom after label */
  afterLabel?: string
}

/**
 * Ref for the ImageComparison component
 */
export type ImageComparisonRef = HTMLDivElement
