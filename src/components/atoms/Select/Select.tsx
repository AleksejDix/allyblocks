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
  ActionMenuRadioGroup,
  ActionMenuRadioItem,
} from '@/components/molecules/ActionMenu'

import type {
  SelectProps,
  SelectTriggerProps,
  SelectContentProps,
  SelectItemProps,
  SelectValueProps,
  SelectGroupProps,
  SelectLabelProps,
  SelectSeparatorProps,
} from './Select.types'

import { selectContentVariants, selectItemVariants } from './Select.variants'

import { SelectContext, useSelect } from './Select.context'

export function Select({
  mode = 'multiple',
  value,
  defaultValue,
  onValueChange,
  disabled,
  id: customId,
  required,
  children,
  className,
  ...props
}: SelectProps) {
  // Initialize with proper default based on mode
  const getDefaultValue = () => {
    if (defaultValue !== undefined) return defaultValue
    return mode === 'single' ? '' : []
  }
  
  const [internalValue, setInternalValue] = useState<string | string[]>(getDefaultValue())
  const generatedId = useId()
  const id = customId ?? generatedId

  // Use provided value if controlled, internal state if uncontrolled
  const currentValue = value !== undefined ? value : internalValue

  const handleValueChange = useCallback(
    (newValue: string | string[]) => {
      setInternalValue(newValue)
      onValueChange?.(newValue)
    },
    [onValueChange],
  )

  // Handle state changes from ActionMenu
  const handleActionMenuValueChange = useCallback(
    (_value: string, _event: Event, context?: Record<string, unknown>) => {
      if (context?.itemValue && typeof context.itemValue === 'string') {
        const itemValue = context.itemValue
        const isSelected = context.checked as boolean

        if (mode === 'single') {
          // For single mode, just set the value directly
          handleValueChange(itemValue)
        } else {
          // For multiple mode, handle as array
          const currentArray = currentValue as string[]
          if (isSelected) {
            // Add value if checked and not already selected
            if (!currentArray.includes(itemValue)) {
              handleValueChange([...currentArray, itemValue])
            }
          } else {
            // Remove value if unchecked
            if (currentArray.includes(itemValue)) {
              handleValueChange(currentArray.filter((v) => v !== itemValue))
            }
          }
        }
      }
    },
    [currentValue, handleValueChange, mode],
  )

  return (
    <SelectContext.Provider
      value={{
        mode,
        value: currentValue,
        onValueChange: handleValueChange,
        disabled,
        required,
        id,
      }}
    >
      <ActionMenu onValueChange={handleActionMenuValueChange}>
        <div className={cn('relative', className)} data-slot="select-container" {...props}>
          {children}
        </div>
      </ActionMenu>
    </SelectContext.Provider>
  )
}

export function SelectTrigger({
  className,
  children,
  variant = 'outline',
  size = 'default',
  ...props
}: SelectTriggerProps) {
  const { disabled, id, required } = useSelect()

  return (
    <ActionMenuTrigger asChild>
      <Button
        id={id}
        type="button"
        variant={variant}
        size={size}
        className={cn('justify-between', className)}
        data-slot="select-trigger"
        aria-required={required}
        disabled={disabled}
        {...props}
      >
        {children}
      </Button>
    </ActionMenuTrigger>
  )
}

export function SelectValue({
  className,
  placeholder = 'Select options',
  selectedText = 'Selected',
  maxDisplayItems = 2,
  showSelectedLabels = true,
}: SelectValueProps) {
  const { mode, value } = useSelect()

  const getDisplayText = () => {
    if (mode === 'single') {
      // For single mode, value is a string
      if (!value || value === '') return placeholder
      
      // Just capitalize the value
      return (value as string).charAt(0).toUpperCase() + (value as string).slice(1)
    } else {
      // For multiple mode, value is an array
      const valueArray = value as string[]
      const selectedCount = valueArray.length
      
      if (selectedCount === 0) return placeholder

      if (!showSelectedLabels) {
        return `${selectedText}: ${selectedCount}`
      }

      const selectedLabels = valueArray
        .map((val) => {
          // Just capitalize the value
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
  }

  const hasValue = mode === 'single' ? !!value && value !== '' : (value as string[]).length > 0

  return (
    <span className={cn('text-left', !hasValue && 'text-muted-foreground', 'truncate', className)}>{getDisplayText()}</span>
  )
}

export function SelectGroup({ className, children, ...props }: SelectGroupProps) {
  return (
    <ActionMenuGroup className={className} data-slot="select-group" {...props}>
      {children}
    </ActionMenuGroup>
  )
}

export function SelectContent({
  className,
  children,
  width = 'auto',
  side = 'bottom',
  align,
  sideOffset,
  ...props
}: SelectContentProps) {
  const { mode, value, onValueChange } = useSelect()
  
  return (
    <ActionMenuContent
      className={cn(selectContentVariants({ width, className }))}
      data-slot="select-content"
      side={side}
      align={align}
      sideOffset={sideOffset}
      {...props}
    >
      {mode === 'single' ? (
        <ActionMenuRadioGroup value={value as string} onValueChange={onValueChange}>
          {children}
        </ActionMenuRadioGroup>
      ) : (
        children
      )}
    </ActionMenuContent>
  )
}

export function SelectLabel({ className, children, ...props }: SelectLabelProps) {
  return (
    <ActionMenuLabel
      className={cn('px-2 py-1.5 text-xs text-muted-foreground', className)}
      data-slot="select-label"
      {...props}
    >
      {children}
    </ActionMenuLabel>
  )
}

export function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <ActionMenuSeparator
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      data-slot="select-separator"
      {...props}
    />
  )
}

export function SelectItem({
  className,
  children,
  value: itemValue,
  disabled,
  context: _externalContext, // Unused, we handle context internally
  onCheckedChange: _onCheckedChange, // Exclude from props spread
  checked: _checked, // Exclude from props spread
  onAction: _onAction, // Exclude from props spread
  ...props
}: SelectItemProps) {
  const { mode, value, onValueChange } = useSelect()
  
  // Check if selected based on mode
  const isSelected = mode === 'single' 
    ? value === itemValue 
    : (value as string[]).includes(itemValue)

  // Handle immediate checked state change
  const handleCheckedChange = (checked: boolean) => {
    if (mode === 'single') {
      // For single mode, just set the value
      if (checked) {
        onValueChange(itemValue)
      }
    } else {
      // For multiple mode, handle as array
      const currentArray = value as string[]
      if (checked) {
        // Add value if checked and not already selected
        if (!currentArray.includes(itemValue)) {
          onValueChange([...currentArray, itemValue])
        }
      } else {
        // Remove value if unchecked
        if (currentArray.includes(itemValue)) {
          onValueChange(currentArray.filter((v) => v !== itemValue))
        }
      }
    }
  }

  // Determine display text from children if they're a string
  const displayText = typeof children === 'string' ? children : undefined

  // Create internal context
  const itemContext = {
    itemValue,
    checked: isSelected,
    displayText,
  }

  // Use radio item for single mode, checkbox for multiple
  if (mode === 'single') {
    return (
      <ActionMenuRadioItem
        className={cn(selectItemVariants({ className }))}
        value={itemValue}
        disabled={disabled}
        {...props}
      >
        {children}
      </ActionMenuRadioItem>
    )
  }

  return (
    <ActionMenuCheckboxItem
      className={cn(selectItemVariants({ className }))}
      checked={isSelected}
      disabled={disabled}
      onCheckedChange={handleCheckedChange}
      data-slot="select-item"
      context={itemContext}
      {...props}
    >
      {children}
    </ActionMenuCheckboxItem>
  )
}
