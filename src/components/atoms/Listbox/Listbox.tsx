'use client'

import React, { useCallback, useRef, useEffect } from 'react'
import { composeEventHandlers } from '@radix-ui/primitive'
import { useComposedRefs } from '@radix-ui/react-compose-refs'
import { cn } from '@/lib/utils'
import { listboxVariants, listboxItemVariants, listboxGroupVariants, listboxLabelVariants } from './Listbox.variants'
import { ListboxProvider, useListboxContext, type ListboxContextValue } from './Listbox.context'
import { useListbox } from './Listbox.hooks'
import type {
  ListboxProps,
  ListboxItemProps,
  ListboxGroupProps,
  ListboxLabelProps,
  ListboxRef,
  ListboxItemRef,
  ListboxGroupRef,
  ListboxLabelRef,
} from './Listbox.types'

/**
 * Listbox component for selecting one or more items from a list.
 *
 * Features:
 * - Keyboard navigation with arrow keys, Home/End, PageUp/PageDown
 * - Typeahead search by typing characters
 * - Single or multiple selection
 * - Proper ARIA semantics
 * - Customizable sizing and styling
 * - Disabled state support
 *
 * @example
 * ```tsx
 * <Listbox value={value} onValueChange={setValue} aria-label="Choose option">
 *   <ListboxItem value="option1">Option 1</ListboxItem>
 *   <ListboxItem value="option2">Option 2</ListboxItem>
 *   <ListboxItem value="option3" disabled>Option 3</ListboxItem>
 * </Listbox>
 * ```
 */
const Listbox = React.forwardRef<ListboxRef, ListboxProps>(
  (
    {
      className,
      size = 'md',
      value,
      onValueChange,
      multiple = false,
      disabled = false,
      orientation = 'vertical',
      loop = true,
      children,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const {
      registerItem,
      unregisterItem,
      highlightedValue,
      setHighlightedValue,
      handleKeyDown: hookHandleKeyDown,
    } = useListbox(value, onValueChange, multiple, orientation, loop, disabled)

    // Combine hook keyboard handler with custom onKeyDown using Radix composition
    const handleKeyDown = composeEventHandlers(onKeyDown, hookHandleKeyDown)

    // Get the ID of the highlighted item for aria-activedescendant
    const highlightedItemId = highlightedValue ? `listbox-item-${highlightedValue}` : undefined

    const contextValue: ListboxContextValue = {
      value,
      onValueChange,
      multiple,
      disabled,
      orientation,
      size: size as 'sm' | 'md' | 'lg',
      highlightedValue,
      setHighlightedValue,
      registerItem,
      unregisterItem,
    }

    return (
      <ListboxProvider value={contextValue}>
        <div
          ref={ref}
          role="listbox"
          aria-multiselectable={multiple}
          aria-disabled={disabled}
          aria-orientation={orientation}
          aria-activedescendant={highlightedItemId}
          className={cn(listboxVariants({ size, className }))}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          {...props}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === ListboxItem) {
              return React.cloneElement(child as React.ReactElement<any>)
            }
            return child
          })}
        </div>
      </ListboxProvider>
    )
  },
)

Listbox.displayName = 'Listbox'

/**
 * ListboxGroup component for grouping related listbox items.
 */
const ListboxGroup = React.forwardRef<ListboxGroupRef, ListboxGroupProps>(({ className, ...props }, ref) => {
  return <div ref={ref} role="group" className={cn(listboxGroupVariants({ className }))} {...props} />
})

ListboxGroup.displayName = 'ListboxGroup'

/**
 * ListboxLabel component for labeling groups of listbox items.
 */
const ListboxLabel = React.forwardRef<ListboxLabelRef, ListboxLabelProps>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn(listboxLabelVariants({ className }))} {...props} />
})

ListboxLabel.displayName = 'ListboxLabel'

/**
 * ListboxItem component for individual selectable items within a Listbox.
 */
const ListboxItem = React.forwardRef<ListboxItemRef, ListboxItemProps>(
  (
    {
      className,
      size: sizeProp,
      value: itemValue,
      disabled: itemDisabled = false,
      textValue,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const context = useListboxContext()
    const {
      value: selectedValue,
      onValueChange,
      multiple,
      disabled: listboxDisabled,
      size: contextSize,
      highlightedValue,
      setHighlightedValue,
      registerItem,
      unregisterItem,
    } = context

    const disabled = itemDisabled || listboxDisabled
    const elementRef = useRef<HTMLDivElement>(null)
    const composedRefs = useComposedRefs(ref, elementRef)
    const size = sizeProp ?? contextSize ?? 'md'

    // Get the item's textContent as default strategy for typeahead textValue
    const [textContent, setTextContent] = React.useState('')
    React.useEffect(() => {
      const menuItem = elementRef.current
      if (menuItem) {
        setTextContent((menuItem.textContent ?? '').trim())
      }
    }, [children])

    const finalTextValue = textValue ?? textContent

    // Determine if this item is selected
    const isSelected = multiple
      ? Array.isArray(selectedValue) && selectedValue.includes(itemValue)
      : selectedValue === itemValue

    const isHighlighted = highlightedValue === itemValue

    // Register/unregister with parent
    useEffect(() => {
      const element = elementRef.current
      if (element && registerItem) {
        registerItem(itemValue, element, finalTextValue, disabled || false)
        return () => unregisterItem?.(itemValue)
      }
    }, [itemValue, registerItem, unregisterItem, finalTextValue, disabled])

    const handleClick = useCallback(() => {
      if (disabled) return

      let newValue: string | string[]

      if (multiple) {
        const currentArray = Array.isArray(selectedValue) ? selectedValue : []
        if (currentArray.includes(itemValue)) {
          newValue = currentArray.filter((v) => v !== itemValue)
        } else {
          newValue = [...currentArray, itemValue]
        }
      } else {
        newValue = itemValue
      }

      onValueChange?.(newValue)
      // Set highlighted value when clicking
      setHighlightedValue?.(itemValue)
    }, [disabled, multiple, selectedValue, itemValue, onValueChange, setHighlightedValue])

    // Generate consistent ID for aria-activedescendant
    const itemId = `listbox-item-${itemValue}`

    return (
      <div
        ref={composedRefs}
        id={itemId}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled}
        data-selected={isSelected}
        data-highlighted={isHighlighted}
        data-disabled={disabled ? '' : undefined}
        className={cn(listboxItemVariants({ size, className }))}
        onClick={composeEventHandlers(onClick, handleClick)}
        tabIndex={-1}
        {...props}
      >
        {children}
      </div>
    )
  },
)

ListboxItem.displayName = 'ListboxItem'

export { Listbox, ListboxGroup, ListboxLabel, ListboxItem }
