'use client'

import { useId, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/atoms/Button'
import {
  ActionMenu,
  ActionMenuContent,
  ActionMenuTrigger,
  ActionMenuGroup,
  ActionMenuLabel,
  ActionMenuSeparator,
  ActionMenuCheckboxItem,
} from '@/components/molecules/ActionMenu'

import type {
  MultiSelectProps,
  MultiSelectTriggerProps,
  MultiSelectContentProps,
  MultiSelectItemProps,
  MultiSelectValueProps,
  MultiSelectGroupProps,
  MultiSelectLabelProps,
  MultiSelectSeparatorProps,
  MultiSelectOption,
} from './MultiSelect.types'

import { multiSelectContentVariants, multiSelectItemVariants } from './MultiSelect.variants'

import { MultiSelectContext, useMultiSelect } from './MultiSelect.context'

export function MultiSelect({
  value,
  defaultValue = [],
  onValueChange,
  disabled,
  id: customId,
  required,
  children,
  className,
  options,
  ...props
}: MultiSelectProps) {
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue || [])
  const generatedId = useId()
  const id = customId ?? generatedId

  // Use provided value if controlled, internal state if uncontrolled
  const currentValue = value !== undefined ? value : internalValue

  const handleValueChange = useCallback(
    (newValue: string[]) => {
      setInternalValue(newValue)
      onValueChange?.(newValue)
    },
    [onValueChange],
  )

  // Handle checkbox state changes from ActionMenu
  const handleActionMenuValueChange = useCallback(
    (_value: string, _event: Event, context?: Record<string, unknown>) => {
      if (context?.itemValue && typeof context.itemValue === 'string') {
        const itemValue = context.itemValue
        const isSelected = context.checked as boolean

        // We don't need a separate handler for each item anymore
        // This central handler manages all selection changes
        if (isSelected) {
          // Add value if checked and not already selected
          if (!currentValue.includes(itemValue)) {
            handleValueChange([...currentValue, itemValue])
          }
        } else {
          // Remove value if unchecked
          if (currentValue.includes(itemValue)) {
            handleValueChange(currentValue.filter((v) => v !== itemValue))
          }
        }
      }
    },
    [currentValue, handleValueChange],
  )

  return (
    <MultiSelectContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
        options,
        disabled,
        required,
        id,
      }}
    >
      <ActionMenu onValueChange={handleActionMenuValueChange}>
        <div className={cn('relative', className)} data-slot="multi-select-container" {...props}>
          {children}
          {options && (
            <MultiSelectContent>
              {options.map((option: MultiSelectOption) => (
                <MultiSelectItem key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </MultiSelectItem>
              ))}
            </MultiSelectContent>
          )}
        </div>
      </ActionMenu>
    </MultiSelectContext.Provider>
  )
}

export function MultiSelectTrigger({
  className,
  children,
  variant = 'outline',
  size = 'default',
  ...props
}: MultiSelectTriggerProps) {
  const { disabled, id, required } = useMultiSelect()

  return (
    <ActionMenuTrigger asChild>
      <Button
        id={id}
        type="button"
        variant={variant}
        size={size}
        className={className}
        data-slot="multi-select-trigger"
        aria-required={required}
        disabled={disabled}
        {...props}
      >
        {children}
      </Button>
    </ActionMenuTrigger>
  )
}

export function MultiSelectValue({
  className,
  placeholder = 'Select options',
  selectedText = 'Selected',
  maxDisplayItems = 2,
  showSelectedLabels = true,
}: MultiSelectValueProps) {
  const { value, options } = useMultiSelect()
  const selectedCount = value.length

  const getDisplayText = () => {
    if (selectedCount === 0) return placeholder

    if (!showSelectedLabels) {
      return `${selectedText}: ${selectedCount}`
    }

    const selectedLabels = value
      .map((val) => {
        // Find matching option label or fallback to capitalized value
        const option = options?.find((opt) => opt.value === val)
        if (option) return option.label || option.value

        // If no option found, just capitalize the value
        return val.charAt(0).toUpperCase() + val.slice(1)
      })
      .filter(Boolean)

    if (selectedLabels.length <= maxDisplayItems) {
      return selectedLabels.join(', ')
    } else {
      const visibleLabels = selectedLabels.slice(0, maxDisplayItems)
      const remainingCount = selectedLabels.length - maxDisplayItems
      return `${visibleLabels.join(', ')} +${remainingCount} more`
    }
  }

  return (
    <span className={cn(!selectedCount && 'text-muted-foreground', 'truncate', className)}>{getDisplayText()}</span>
  )
}

export function MultiSelectGroup({ className, children, ...props }: MultiSelectGroupProps) {
  return (
    <ActionMenuGroup className={className} data-slot="multi-select-group" {...props}>
      {children}
    </ActionMenuGroup>
  )
}

export function MultiSelectContent({
  className,
  children,
  width = 'auto',
  side,
  align,
  sideOffset,
  ...props
}: MultiSelectContentProps) {
  return (
    <ActionMenuContent
      className={cn(multiSelectContentVariants({ width, className }))}
      data-slot="multi-select-content"
      side={side}
      align={align}
      sideOffset={sideOffset}
      {...props}
    >
      {children}
    </ActionMenuContent>
  )
}

export function MultiSelectLabel({ className, children, ...props }: MultiSelectLabelProps) {
  return (
    <ActionMenuLabel
      className={cn('px-2 py-1.5 text-xs text-muted-foreground', className)}
      data-slot="multi-select-label"
      {...props}
    >
      {children}
    </ActionMenuLabel>
  )
}

export function MultiSelectSeparator({ className, ...props }: MultiSelectSeparatorProps) {
  return (
    <ActionMenuSeparator
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      data-slot="multi-select-separator"
      {...props}
    />
  )
}

export function MultiSelectItem({
  className,
  children,
  value: itemValue,
  disabled,
  context: externalContext,
  ...props
}: MultiSelectItemProps) {
  const { value } = useMultiSelect()
  const isSelected = value.includes(itemValue)

  // Determine display text from children if they're a string
  const displayText = typeof children === 'string' ? children : undefined

  // Combine external context with our internal context
  const itemContext = {
    itemValue,
    checked: isSelected,
    displayText,
    ...externalContext,
  }

  return (
    <ActionMenuCheckboxItem
      className={cn(multiSelectItemVariants({ className }))}
      checked={isSelected}
      disabled={disabled}
      data-slot="multi-select-item"
      context={itemContext}
      {...props}
    >
      {children}
    </ActionMenuCheckboxItem>
  )
}
