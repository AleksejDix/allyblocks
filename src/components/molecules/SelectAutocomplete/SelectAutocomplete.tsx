'use client'

import { useState, type ReactNode } from 'react'
import { useSelect } from 'downshift'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SelectAutocompleteContext } from './SelectAutocomplete.context'
import { useSelectAutocomplete } from './SelectAutocomplete.context'
import type { 
  SelectAutocompleteOption, 
  SelectAutocompleteProps,
  SelectAutocompleteTriggerProps,
  SelectAutocompleteContentProps,
  SelectAutocompleteItemProps,
  SelectAutocompleteValueProps,
  SelectAutocompleteLabelProps,
  SelectAutocompleteSeparatorProps,
  SelectAutocompleteGroupProps,
  SelectAutocompleteEmptyProps,
} from './SelectAutocomplete.types'

/**
 * SelectAutocomplete - Root component for the select system
 * Following the compound component pattern like ActionMenu
 */
export function SelectAutocomplete({
  children,
  options,
  value,
  onChange,
  disabled = false,
}: SelectAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  // Find the selected item based on value prop
  const selectedItem = options.find(option => option.value === value) || null
  
  const {
    selectedItem: selected,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items: options,
    itemToString: (item) => item ? item.label : '',
    selectedItem,
    isOpen,
    onIsOpenChange: ({ isOpen: newIsOpen }) => {
      setIsOpen(newIsOpen || false)
    },
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
      if (newSelectedItem) {
        onChange?.(newSelectedItem.value)
      }
    },
    // Skip disabled items during keyboard navigation
    isItemDisabled: (item) => item?.disabled || false,
  })

  const contextValue = {
    options,
    selectedItem: selected,
    isOpen,
    setIsOpen,
    highlightedIndex,
    disabled,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
  }

  return (
    <SelectAutocompleteContext.Provider value={contextValue}>
      <div className="relative w-full">
        {children}
      </div>
    </SelectAutocompleteContext.Provider>
  )
}

/**
 * SelectAutocompleteTrigger - The button that opens the select dropdown
 */
export function SelectAutocompleteTrigger({ 
  children, 
  className,
  asChild = false,
  ...props 
}: SelectAutocompleteTriggerProps) {
  const { getToggleButtonProps, disabled, isOpen } = useSelectAutocomplete()
  
  const Component = asChild ? 'div' : 'button'
  
  return (
    <Component
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
        'placeholder:text-muted-foreground',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        disabled && 'cursor-not-allowed opacity-50',
        !disabled && 'cursor-pointer',
        className
      )}
      {...getToggleButtonProps({ disabled })}
      {...props}
    >
      {children}
      <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
    </Component>
  )
}

/**
 * SelectAutocompleteValue - Displays the selected value or placeholder
 */
export function SelectAutocompleteValue({ 
  placeholder = 'Select an option...',
  className,
}: SelectAutocompleteValueProps) {
  const { selectedItem } = useSelectAutocomplete()
  
  return (
    <span className={cn(
      selectedItem ? '' : 'text-muted-foreground',
      className
    )}>
      {selectedItem ? selectedItem.label : placeholder}
    </span>
  )
}

/**
 * SelectAutocompleteContent - The dropdown content container
 */
export function SelectAutocompleteContent({ 
  children,
  className,
  align = 'start',
  ...props 
}: SelectAutocompleteContentProps) {
  const { isOpen, getMenuProps } = useSelectAutocomplete()
  
  if (!isOpen) return null
  
  return (
    <div
      className={cn(
        'absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-popover p-1 text-popover-foreground shadow-md',
        'border border-border',
        'data-[align=start]:text-left data-[align=center]:text-center data-[align=end]:text-right',
        className
      )}
      data-align={align}
      {...getMenuProps()}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * SelectAutocompleteList - Container for list items (semantic wrapper)
 */
export function SelectAutocompleteList({ 
  children,
  className,
  ...props 
}: SelectAutocompleteGroupProps) {
  return (
    <div className={cn('py-1', className)} {...props}>
      {children}
    </div>
  )
}

/**
 * SelectAutocompleteItem - Individual selectable item
 */
export function SelectAutocompleteItem({
  option,
  index,
  children,
  className,
  showCheck = true,
  ...props
}: SelectAutocompleteItemProps) {
  const { getItemProps, highlightedIndex, selectedItem } = useSelectAutocomplete()
  
  const isHighlighted = highlightedIndex === index
  const isSelected = selectedItem?.value === option.value
  
  return (
    <div
      className={cn(
        'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
        'transition-colors',
        isHighlighted && 'bg-accent text-accent-foreground',
        isSelected && 'font-semibold',
        option.disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      {...getItemProps({ item: option, index, disabled: option.disabled })}
      {...props}
    >
      {children || (
        <>
          <span className="flex-1">{option.label}</span>
          {showCheck && isSelected && (
            <Check className="h-4 w-4 ml-2" />
          )}
        </>
      )}
    </div>
  )
}

/**
 * SelectAutocompleteGroup - Logical grouping of related items
 */
export function SelectAutocompleteGroup({ 
  children,
  className,
  ...props 
}: SelectAutocompleteGroupProps) {
  return (
    <div className={cn('py-1', className)} {...props}>
      {children}
    </div>
  )
}

/**
 * SelectAutocompleteLabel - Non-interactive label within the select
 */
export function SelectAutocompleteLabel({ 
  children,
  className,
  ...props 
}: SelectAutocompleteLabelProps) {
  return (
    <div 
      className={cn(
        'px-2 py-1.5 text-xs font-medium text-muted-foreground',
        className
      )} 
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * SelectAutocompleteSeparator - Visual separator between items
 */
export function SelectAutocompleteSeparator({ 
  className,
  ...props 
}: SelectAutocompleteSeparatorProps) {
  return (
    <div 
      className={cn('my-1 h-px bg-border', className)} 
      {...props} 
    />
  )
}

/**
 * SelectAutocompleteEmpty - Displayed when no options are available
 */
export function SelectAutocompleteEmpty({ 
  children = 'No options found',
  className,
  ...props 
}: SelectAutocompleteEmptyProps) {
  const { options } = useSelectAutocomplete()
  
  if (options.length > 0) return null
  
  return (
    <div 
      className={cn(
        'py-6 text-center text-sm text-muted-foreground',
        className
      )} 
      {...props}
    >
      {children}
    </div>
  )
}

// Export these as empty for now to maintain compatibility
export function SelectAutocompleteSearch({ children }: any) { return <>{children}</> }
export function SelectAutocompleteClear() { return null }
export function SelectAutocompleteLoading({ children }: any) { return <>{children}</> }