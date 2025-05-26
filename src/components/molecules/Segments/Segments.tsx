import { forwardRef, createContext, useContext } from 'react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { cn } from '@/lib/utils'
import { segmentsRootVariants, segmentItemVariants } from './Segments.variants'
import type { SegmentsProps, SegmentProps, SegmentsRef, SegmentRef } from './Segments.types'

// Context for sharing variant props between Segments and Segment
const SegmentsContext = createContext<{
  size?: '1' | '2' | '3'
  variant?: 'surface' | 'classic'
}>({})

/**
 * Segments component for creating toggle button groups.
 *
 * Based on Radix UI ToggleGroup with styling inspired by Radix Themes SegmentedControl.
 *
 * Features:
 * - Single or multiple selection modes
 * - Keyboard navigation support
 * - Accessible by default
 * - Customizable size and variant styling
 * - Support for disabled state
 * - Horizontal and vertical orientations
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Segments defaultValue="inbox">
 *   <Segment value="inbox">Inbox</Segment>
 *   <Segment value="drafts">Drafts</Segment>
 *   <Segment value="sent">Sent</Segment>
 * </Segments>
 *
 * // Multiple selection
 * <Segments type="multiple" defaultValue={["inbox", "drafts"]}>
 *   <Segment value="inbox">Inbox</Segment>
 *   <Segment value="drafts">Drafts</Segment>
 *   <Segment value="sent">Sent</Segment>
 * </Segments>
 *
 * // Different sizes and variants
 * <Segments size="3" variant="classic" defaultValue="option1">
 *   <Segment value="option1">Option 1</Segment>
 *   <Segment value="option2">Option 2</Segment>
 * </Segments>
 *
 * // Controlled usage
 * <Segments value={selectedValue} onValueChange={setSelectedValue}>
 *   <Segment value="view">View</Segment>
 *   <Segment value="edit">Edit</Segment>
 * </Segments>
 * ```
 */
export const Segments = forwardRef<SegmentsRef, SegmentsProps>(function Segments(
  {
    className,
    size = '2',
    variant = 'surface',
    type = 'single',
    orientation = 'horizontal',
    loop = true,
    children,
    value,
    defaultValue,
    onValueChange,
    ...props
  },
  ref,
) {
  // Prepare props for Radix ToggleGroup based on type
  const toggleGroupProps = {
    ...props,
    type,
    orientation,
    loop,
    ...(type === 'single'
      ? {
          value: value as string,
          defaultValue: defaultValue as string,
          onValueChange: onValueChange as (value: string) => void,
        }
      : {
          value: value as string[],
          defaultValue: defaultValue as string[],
          onValueChange: onValueChange as (value: string[]) => void,
        }),
  }

  return (
    <SegmentsContext.Provider value={{ size, variant }}>
      <ToggleGroupPrimitive.Root
        ref={ref}
        className={cn(
          segmentsRootVariants({ size, variant }),
          orientation === 'vertical' && 'flex-col h-auto w-auto',
          className,
        )}
        {...toggleGroupProps}
      >
        {children}
      </ToggleGroupPrimitive.Root>
    </SegmentsContext.Provider>
  )
})

/**
 * Individual segment item within a Segments group.
 *
 * @example
 * ```tsx
 * <Segment value="inbox">
 *   <Icon name="inbox" />
 *   Inbox
 * </Segment>
 *
 * <Segment value="settings" disabled>
 *   Settings
 * </Segment>
 * ```
 */
export const Segment = forwardRef<SegmentRef, SegmentProps>(function Segment(
  { className, size, variant, children, ...props },
  ref,
) {
  const context = useContext(SegmentsContext)
  const effectiveSize = size ?? context.size ?? '2'
  const effectiveVariant = variant ?? context.variant ?? 'surface'

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(segmentItemVariants({ size: effectiveSize, variant: effectiveVariant }), className)}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

Segments.displayName = 'Segments'
Segment.displayName = 'Segment'
