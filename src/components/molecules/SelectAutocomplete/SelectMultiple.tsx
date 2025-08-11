'use client'

import { useState, useCallback, useMemo, useRef } from 'react'
import { useMultipleSelection, useCombobox } from 'downshift'
import { cn } from '@/lib/utils'
import { Popover } from '@/components/molecules/Popover'
import { SelectBaseContext } from './SelectBase.context'
import type { SelectAutocompleteOption } from './SelectAutocomplete.types'

interface SelectMultipleProps {
  children: React.ReactNode
  options: SelectAutocompleteOption[]
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void
  disabled?: boolean
  className?: string
}

export function SelectMultiple({
  children,
  options,
  value,
  defaultValue,
  onChange,
  disabled = false,
  className,
}: SelectMultipleProps) {
  const [inputValue, setInputValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Handle multiple selection
  const {
    selectedItems,
    addSelectedItem,
    removeSelectedItem,
    reset: resetSelection,
  } = useMultipleSelection({
    initialSelectedItems: options.filter((option) => {
      const values = value ?? defaultValue ?? []
      return values.includes(option.value)
    }),
    onSelectedItemsChange: ({ selectedItems: newSelectedItems }) => {
      onChange?.(newSelectedItems?.map((item) => item.value) || [])
    },
  })

  // Filter options based on input (for search)
  const filteredOptions = useMemo(() => {
    if (!inputValue) return options
    return options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    )
  }, [options, inputValue])

  // Use combobox for the dropdown interaction
  const {
    getItemProps,
    getMenuProps,
    getInputProps: getComboboxInputProps,
    getToggleButtonProps,
    getLabelProps,
    highlightedIndex,
  } = useCombobox({
    items: filteredOptions,
    inputValue,
    isOpen,
    onIsOpenChange: ({ isOpen: newIsOpen }) => {
      setIsOpen(newIsOpen || false)
    },
    onInputValueChange: ({ inputValue: newValue }) => {
      setInputValue(newValue || '')
      // Open dropdown when typing
      if (newValue && !isOpen) {
        setIsOpen(true)
      }
    },
    itemToString: (item) => (item ? item.label : ''),
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges
      
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          if (changes.selectedItem) {
            const isAlreadySelected = selectedItems.some(
              (item) => item.value === changes.selectedItem?.value
            )
            
            if (isAlreadySelected) {
              removeSelectedItem(changes.selectedItem)
            } else {
              addSelectedItem(changes.selectedItem)
            }
          }
          
          return {
            ...changes,
            isOpen: true, // Keep open for multiple selection
            highlightedIndex: state.highlightedIndex,
            inputValue: '', // Clear input after selection
          }
        default:
          return changes
      }
    },
  })

  // Enhanced input props with typeahead
  const getInputProps = useCallback((props?: any) => {
    const baseProps = getComboboxInputProps(props)
    return {
      ...baseProps,
      ref: inputRef,
      onKeyDown: (e: React.KeyboardEvent) => {
        baseProps.onKeyDown?.(e)
        
        // Handle backspace to remove last selected item
        if (e.key === 'Backspace' && !inputValue && selectedItems.length > 0) {
          removeSelectedItem(selectedItems[selectedItems.length - 1])
        }
      },
    }
  }, [getComboboxInputProps, inputValue, selectedItems, removeSelectedItem])

  const handleReset = useCallback(() => {
    resetSelection()
    setInputValue('')
    setIsOpen(false)
  }, [resetSelection])

  const handleRemoveOption = useCallback((option: SelectAutocompleteOption) => {
    removeSelectedItem(option)
  }, [removeSelectedItem])

  const contextValue = useMemo(
    () => ({
      options,
      filteredOptions,
      selectedOptions: selectedItems,
      inputValue,
      isOpen,
      highlightedIndex,
      disabled,
      inputRef,
      getItemProps,
      getInputProps,
      getToggleButtonProps,
      getMenuProps,
      getLabelProps,
      selectOption: (option: SelectAutocompleteOption | null) => {
        if (option) {
          const isSelected = selectedItems.some((item) => item.value === option.value)
          if (isSelected) {
            removeSelectedItem(option)
          } else {
            addSelectedItem(option)
          }
        }
      },
      removeOption: handleRemoveOption,
      openMenu: () => setIsOpen(true),
      closeMenu: () => setIsOpen(false),
      setInputValue,
      setIsOpen,
      reset: handleReset,
      mode: 'multiple' as const,
    }),
    [
      options,
      filteredOptions,
      selectedItems,
      inputValue,
      isOpen,
      highlightedIndex,
      disabled,
      getItemProps,
      getInputProps,
      getToggleButtonProps,
      getMenuProps,
      getLabelProps,
      addSelectedItem,
      removeSelectedItem,
      handleRemoveOption,
      handleReset,
    ]
  )

  return (
    <SelectBaseContext.Provider value={contextValue}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <div className={cn('relative w-full', className)}>
          {children}
        </div>
      </Popover>
    </SelectBaseContext.Provider>
  )
}