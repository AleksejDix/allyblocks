'use client'

import { useState, useCallback, useMemo, useRef } from 'react'
import { useCombobox } from 'downshift'
import { cn } from '@/lib/utils'
import { Popover } from '@/components/molecules/Popover'
import { SelectBaseContext } from './SelectBase.context'
import type { SelectAutocompleteOption } from './SelectAutocomplete.types'

interface SelectComboboxProps {
  children: React.ReactNode
  options: SelectAutocompleteOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onInputValueChange?: (value: string) => void
  disabled?: boolean
  filterFunction?: (option: SelectAutocompleteOption, inputValue: string) => boolean
  allowCustomValue?: boolean
  className?: string
}

const defaultFilterFunction = (option: SelectAutocompleteOption, inputValue: string) => {
  return option.label.toLowerCase().includes(inputValue.toLowerCase())
}

export function SelectCombobox({
  children,
  options,
  value,
  defaultValue,
  onChange,
  onInputValueChange,
  disabled = false,
  filterFunction = defaultFilterFunction,
  allowCustomValue = false,
  className,
}: SelectComboboxProps) {
  const [inputValue, setInputValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Get selected option
  const selectedOption = useMemo(() => {
    const selectedValue = value ?? defaultValue
    return options.find((option) => option.value === selectedValue) || null
  }, [options, value, defaultValue])

  // Filter options based on input
  const filteredOptions = useMemo(() => {
    if (!inputValue) return options
    return options.filter((option) => filterFunction(option, inputValue))
  }, [options, inputValue, filterFunction])

  // Use combobox for full autocomplete functionality
  const {
    getItemProps,
    getMenuProps,
    getInputProps: getComboboxInputProps,
    getToggleButtonProps,
    getLabelProps,
    highlightedIndex,
    selectedItem,
  } = useCombobox({
    items: filteredOptions,
    inputValue,
    selectedItem: selectedOption,
    isOpen,
    onIsOpenChange: ({ isOpen: newIsOpen }) => {
      setIsOpen(newIsOpen || false)
    },
    onInputValueChange: ({ inputValue: newValue }) => {
      setInputValue(newValue || '')
      onInputValueChange?.(newValue || '')
      
      // Open dropdown when typing
      if (newValue && !isOpen) {
        setIsOpen(true)
      }
    },
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
      if (newSelectedItem) {
        onChange?.(newSelectedItem.value)
        setInputValue(newSelectedItem.label)
        setIsOpen(false)
      }
    },
    itemToString: (item) => (item ? item.label : ''),
  })

  // Enhanced input props for combobox
  const getInputProps = useCallback((props?: any) => {
    const baseProps = getComboboxInputProps(props)
    return {
      ...baseProps,
      ref: inputRef,
      onBlur: (e: React.FocusEvent) => {
        baseProps.onBlur?.(e)
        
        // Handle custom value on blur if allowed
        if (allowCustomValue && inputValue && !selectedOption) {
          onChange?.(inputValue)
        }
      },
      onKeyDown: (e: React.KeyboardEvent) => {
        baseProps.onKeyDown?.(e)
        
        // Handle enter for custom value
        if (e.key === 'Enter' && allowCustomValue && inputValue && filteredOptions.length === 0) {
          onChange?.(inputValue)
          setIsOpen(false)
        }
      },
    }
  }, [getComboboxInputProps, allowCustomValue, inputValue, selectedOption, onChange, filteredOptions])

  const handleReset = useCallback(() => {
    onChange?.('')
    setInputValue('')
    setIsOpen(false)
  }, [onChange])

  const handleRemoveOption = useCallback((option: SelectAutocompleteOption) => {
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
          setInputValue(option.label)
        }
      },
      removeOption: handleRemoveOption,
      openMenu: () => setIsOpen(true),
      closeMenu: () => setIsOpen(false),
      setInputValue,
      setIsOpen,
      reset: handleReset,
      mode: 'combobox' as const,
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