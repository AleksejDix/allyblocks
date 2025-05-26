import { forwardRef, createContext, useContext } from 'react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { cn } from '@/lib/utils'
import { segmentsRootVariants, segmentItemVariants } from './Segments.variants'
import type { SegmentsProps, SegmentProps, SegmentsRef, SegmentRef } from './Segments.types'

// Context for sharing variant props between Segments and Segment
const SegmentsContext = createContext<{
  size?: 'sm' | 'md' | 'lg'
  variant?: 'surface' | 'classic'
  orientation?: 'horizontal' | 'vertical'
}>({
  size: undefined,
  variant: undefined,
  orientation: undefined,
})

/**
 * Segments component for creating single-selection toggle button groups.
 *
 * Based on Radix UI ToggleGroup with styling inspired by Radix Themes SegmentedControl.
 * Represents mutually exclusive options like tabs or radio buttons.
 *
 * Features:
 * - Single selection mode (proper segmented control semantics)
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
    size,
    variant,
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
    orientation === 'vertical' && 'flex-col h-auto w-full',
    className,
  )

  return (
    <SegmentsContext.Provider
      value={{
        size: size as 'sm' | 'md' | 'lg',
        variant: variant as 'surface' | 'classic',
        orientation: orientation as 'horizontal' | 'vertical',
      }}
    >
      <ToggleGroupPrimitive.Root
        ref={ref}
        type="single"
        orientation={orientation}
        loop={loop}
        className={baseClassName}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        {...props}
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
  const effectiveSize = size ?? context.size ?? 'md'
  const effectiveVariant = variant ?? context.variant ?? 'surface'
  const effectiveOrientation = context.orientation ?? 'horizontal'

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        segmentItemVariants({ size: effectiveSize, variant: effectiveVariant }),
        effectiveOrientation === 'vertical' && 'w-full justify-start',
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

Segments.displayName = 'Segments'
Segment.displayName = 'Segment'
