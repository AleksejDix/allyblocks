'use client'

import { useState, useCallback, useMemo, useRef } from 'react'
import { useSelect } from 'downshift'
import { cn } from '@/lib/utils'
import { Popover } from '@/components/molecules/Popover'
import { SelectBaseContext } from './SelectBase.context'
import type { SelectAutocompleteOption } from './SelectAutocomplete.types'

interface SelectSingleProps {
  children: React.ReactNode
  options: SelectAutocompleteOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  disabled?: boolean
  className?: string
}

export function SelectSingle({
  children,
  options,
  value,
  defaultValue,
  onChange,
  disabled = false,
  className,
}: SelectSingleProps) {
  const [inputValue, setInputValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Get selected option
  const selectedOption = useMemo(() => {
    const selectedValue = value ?? defaultValue
    return options.find((option) => option.value === selectedValue) || null
  }, [options, value, defaultValue])

  // Filter options based on input (for keyboard navigation/search)
  const filteredOptions = useMemo(() => {
    if (!inputValue) return options
    return options.filter((option) =>
      option.label.toLowerCase().startsWith(inputValue.toLowerCase())
    )
  }, [options, inputValue])

  // Use Downshift's useSelect for single selection
  const {
    getItemProps,
    getMenuProps,
    getToggleButtonProps,
    getLabelProps,
    highlightedIndex,
    selectedItem,
    isOpen: downshiftIsOpen,
  } = useSelect({
    items: filteredOptions,
    selectedItem: selectedOption,
    isOpen,
    onIsOpenChange: ({ isOpen: newIsOpen }) => {
      setIsOpen(newIsOpen || false)
      if (!newIsOpen) {
        setInputValue('')
      }
    },
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
      if (newSelectedItem) {
        onChange?.(newSelectedItem.value)
        setIsOpen(false)
        setInputValue('')
      }
    },
    itemToString: (item) => (item ? item.label : ''),
    onHighlightedIndexChange: ({ highlightedIndex, type }) => {
      // Handle typeahead - when user types, highlight matching option
      if (type === useSelect.stateChangeTypes.InputKeyDownArrowDown ||
          type === useSelect.stateChangeTypes.InputKeyDownArrowUp) {
        return
      }
    },
  })

  // Handle input for typeahead
  const getInputProps = useCallback((props?: any) => {
    return {
      ...props,
      ref: inputRef,
      value: inputValue,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setInputValue(value)
        
        // Open menu when typing
        if (value && !isOpen) {
          setIsOpen(true)
        }
        
        // Typeahead: highlight first matching option
        if (value) {
          const matchingIndex = options.findIndex((option) =>
            option.label.toLowerCase().startsWith(value.toLowerCase())
          )
          if (matchingIndex >= 0) {
            // We'd need to expose setHighlightedIndex from downshift
          }
        }
      },
      onKeyDown: (e: React.KeyboardEvent) => {
        // Handle enter to select highlighted option
        if (e.key === 'Enter' && highlightedIndex >= 0) {
          const option = filteredOptions[highlightedIndex]
          if (option) {
            onChange?.(option.value)
            setIsOpen(false)
            setInputValue('')
          }
        }
        // Clear on escape
        if (e.key === 'Escape') {
          setInputValue('')
          setIsOpen(false)
        }
      },
    }
  }, [inputValue, isOpen, highlightedIndex, filteredOptions, onChange, options])

  const handleReset = useCallback(() => {
    onChange?.('')
    setInputValue('')
    setIsOpen(false)
  }, [onChange])

  const handleRemoveOption = useCallback((option: SelectAutocompleteOption) => {
    // In single select, removing means clearing
    if (selectedOption?.value === option.value) {
      handleReset()
    }
  }, [selectedOption, handleReset])

  const contextValue = useMemo(
    () => ({
      options,
      filteredOptions,
      selectedOptions: selectedOption ? [selectedOption] : [],
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
          onChange?.(option.value)
        }
      },
      removeOption: handleRemoveOption,
      openMenu: () => setIsOpen(true),
      closeMenu: () => setIsOpen(false),
      setInputValue,
      setIsOpen,
      reset: handleReset,
      mode: 'single' as const,
    }),
    [
      options,
      filteredOptions,
      selectedOption,
      inputValue,
      isOpen,
      highlightedIndex,
      disabled,
      getItemProps,
      getInputProps,
      getToggleButtonProps,
      getMenuProps,
      getLabelProps,
      onChange,
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