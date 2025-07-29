import * as SelectPrimitive from '@radix-ui/react-select'
import { Icon } from '@/components/atoms/Icon'

import { cn } from '@/lib/utils'
import { radixSelectTriggerVariants, radixSelectContentVariants, radixSelectItemVariants } from './RadixSelect.variants'
import type {
  RadixSelectProps,
  RadixSelectGroupProps,
  RadixSelectValueProps,
  RadixSelectTriggerProps,
  RadixSelectContentProps,
  RadixSelectLabelProps,
  RadixSelectItemProps,
  RadixSelectSeparatorProps,
  RadixSelectScrollUpButtonProps,
  RadixSelectScrollDownButtonProps,
} from './RadixSelect.types'

/**
 * @deprecated Use Select with mode="single" instead for better consistency and features
 */
function RadixSelect({ ...props }: RadixSelectProps) {
  return <SelectPrimitive.Root data-slot="radix-select" {...props} />
}

/**
 * @deprecated Use Select with mode="single" instead
 */
function RadixSelectGroup({ ...props }: RadixSelectGroupProps) {
  return <SelectPrimitive.Group data-slot="radix-select-group" {...props} />
}

/**
 * @deprecated Use Select with mode="single" instead
 */
function RadixSelectValue({ ...props }: RadixSelectValueProps) {
  return <SelectPrimitive.Value data-slot="radix-select-value" {...props} />
}

/**
 * @deprecated Use Select with mode="single" instead
 */
function RadixSelectTrigger({ className, variant, size = 'md', width, children, ...props }: RadixSelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="radix-select-trigger"
      role="combobox"
      aria-expanded={props['aria-expanded']}
      aria-invalid={props['aria-invalid']}
      aria-describedby={props['aria-describedby']}
      className={cn(radixSelectTriggerVariants({ variant, size, width, className }))}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <Icon name="chevron-down" className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

/**
 * @deprecated Use Select with mode="single" instead
 */
function RadixSelectContent({ className, children, position = 'popper', ...props }: RadixSelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="radix-select-content"
        className={cn(radixSelectContentVariants({ position, className }))}
        position={position}
        {...props}
      >
        <RadixSelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1',
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <RadixSelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

/**
 * @deprecated Use Select with mode="single" instead
 */
function RadixSelectLabel({ className, ...props }: RadixSelectLabelProps) {
  return (
    <SelectPrimitive.Label
      data-slot="radix-select-label"
      className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
      {...props}
    />
  )
}

/**
 * @deprecated Use Select with mode="single" instead
 */
function RadixSelectItem({ className, children, variant, ...props }: RadixSelectItemProps) {
  return (
    <SelectPrimitive.Item data-slot="radix-select-item" className={cn(radixSelectItemVariants({ variant, className }))} {...props}>
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Icon name="check" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

/**
 * @deprecated Use Select with mode="single" instead
 */
function RadixSelectSeparator({ className, ...props }: RadixSelectSeparatorProps) {
  return (
    <SelectPrimitive.Separator
      data-slot="radix-select-separator"
      className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}

/**
 * @deprecated Use Select with mode="single" instead
 */
function RadixSelectScrollUpButton({ className, ...props }: RadixSelectScrollUpButtonProps) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="radix-select-scroll-up-button"
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <Icon name="chevron-up" />
    </SelectPrimitive.ScrollUpButton>
  )
}

/**
 * @deprecated Use Select with mode="single" instead
 */
function RadixSelectScrollDownButton({ className, ...props }: RadixSelectScrollDownButtonProps) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="radix-select-scroll-down-button"
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <Icon name="chevron-down" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  RadixSelect,
  RadixSelectContent,
  RadixSelectGroup,
  RadixSelectItem,
  RadixSelectLabel,
  RadixSelectScrollDownButton,
  RadixSelectScrollUpButton,
  RadixSelectSeparator,
  RadixSelectTrigger,
  RadixSelectValue,
}
