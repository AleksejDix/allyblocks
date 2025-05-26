import * as React from 'react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import type { VariantProps } from 'class-variance-authority'
import { segmentsRootVariants, segmentItemVariants } from './Segments.variants'

/**
 * Props for the Segments root component.
 * Based on Radix UI ToggleGroup with additional styling variants.
 */
export type SegmentsProps = Omit<
  React.ComponentProps<typeof ToggleGroupPrimitive.Root>,
  'type' | 'value' | 'defaultValue' | 'onValueChange'
> &
  VariantProps<typeof segmentsRootVariants> & {
    /**
     * Whether multiple segments can be selected at once.
     * @default "single"
     */
    type?: 'single' | 'multiple'

    /**
     * The controlled value of the segments. Can be a string for single selection
     * or an array of strings for multiple selection.
     */
    value?: string | string[]

    /**
     * The default value when uncontrolled. Can be a string for single selection
     * or an array of strings for multiple selection.
     */
    defaultValue?: string | string[]

    /**
     * Event handler called when the value changes.
     */
    onValueChange?: (value: string | string[]) => void

    /**
     * Whether the segments are disabled.
     * @default false
     */
    disabled?: boolean

    /**
     * Whether to loop through segments when using keyboard navigation.
     * @default true
     */
    loop?: boolean

    /**
     * The orientation of the segments.
     * @default "horizontal"
     */
    orientation?: 'horizontal' | 'vertical'

    /**
     * The reading direction of the segments.
     * @default "ltr"
     */
    dir?: 'ltr' | 'rtl'

    /**
     * Whether a segment must always be selected.
     * Only applies when type is "single".
     * @default false
     */
    rovingFocus?: boolean
  }

/**
 * Props for individual Segment items.
 */
export type SegmentProps = React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof segmentItemVariants> & {
    /**
     * The value of the segment. Must be unique within the segments group.
     */
    value: string

    /**
     * The content of the segment.
     */
    children?: React.ReactNode
  }

export type SegmentsRef = React.ComponentRef<typeof ToggleGroupPrimitive.Root>
export type SegmentRef = React.ComponentRef<typeof ToggleGroupPrimitive.Item>
