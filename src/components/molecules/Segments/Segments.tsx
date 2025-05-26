import { forwardRef, createContext, useContext } from 'react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { cn } from '@/lib/utils'
import { segmentsRootVariants, segmentItemVariants } from './Segments.variants'
import type { SegmentsProps, SegmentProps, SegmentsRef, SegmentRef } from './Segments.types'

// Context for sharing variant props between Segments and Segment
const SegmentsContext = createContext<{
  size?: 'sm' | 'default' | 'lg'
  variant?: 'surface' | 'classic'
}>({
  size: undefined,
  variant: undefined,
})

/**
 * Segments component for creating toggle button groups.
 *
 * Based on Radix UI ToggleGroup with styling inspired by Radix Themes SegmentedControl.
 * Now matches Button component sizing for better visual alignment.
 *
 * Features:
 * - Single or multiple selection modes
 * - Keyboard navigation support
 * - Accessible by default
 * - Customizable size and variant styling
 * - Support for disabled state
 * - Horizontal and vertical orientations
 * - Matches Button component heights and font styling
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
 * // Different sizes matching Button sizes
 * <Segments size="lg" variant="classic" defaultValue="option1">
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
    size = 'default',
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
  const baseClassName = cn(
    segmentsRootVariants({ size, variant }),
    orientation === 'vertical' && 'flex-col h-auto w-auto',
    className,
  )

  return (
    <SegmentsContext.Provider
      value={{ size: size as 'sm' | 'default' | 'lg', variant: variant as 'surface' | 'classic' }}
    >
      {type === 'single' ? (
        <ToggleGroupPrimitive.Root
          ref={ref}
          type="single"
          orientation={orientation}
          loop={loop}
          className={baseClassName}
          value={value as string}
          defaultValue={defaultValue as string}
          onValueChange={onValueChange as (value: string) => void}
          {...props}
        >
          {children}
        </ToggleGroupPrimitive.Root>
      ) : (
        <ToggleGroupPrimitive.Root
          ref={ref}
          type="multiple"
          orientation={orientation}
          loop={loop}
          className={baseClassName}
          value={value as string[]}
          defaultValue={defaultValue as string[]}
          onValueChange={onValueChange as (value: string[]) => void}
          {...props}
        >
          {children}
        </ToggleGroupPrimitive.Root>
      )}
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
  const effectiveSize = size ?? context.size ?? 'default'
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
