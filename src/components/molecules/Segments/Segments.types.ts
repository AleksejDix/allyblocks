import type { ComponentPropsWithoutRef, ComponentRef } from 'react'
import type * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import type { VariantProps } from 'class-variance-authority'
import type { segmentsRootVariants, segmentItemVariants } from './Segments.variants'

/**
 * Props for the Segments root component
 */
export type SegmentsProps = Omit<
  ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>,
  'type' | 'value' | 'defaultValue' | 'onValueChange'
> &
  VariantProps<typeof segmentsRootVariants> & {
    /**
     * The controlled value of the segments
     */
    value?: string
    /**
     * The default value when uncontrolled
     */
    defaultValue?: string
    /**
     * Callback fired when the value changes
     */
    onValueChange?: (value: string) => void
  }

/**
 * Props for individual Segment items
 */
export type SegmentProps = ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof segmentItemVariants>

/**
 * Ref types
 */
export type SegmentsRef = ComponentRef<typeof ToggleGroupPrimitive.Root>
export type SegmentRef = ComponentRef<typeof ToggleGroupPrimitive.Item>
