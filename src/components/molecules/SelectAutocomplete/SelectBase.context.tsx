import { createContext, useContext } from 'react'
import type { SelectAutocompleteOption } from './SelectAutocomplete.types'

// Base context interface that all select variants will implement
export interface SelectBaseContextValue {
  options: SelectAutocompleteOption[]
  filteredOptions: SelectAutocompleteOption[]
  selectedOptions: SelectAutocompleteOption[]
  inputValue: string
  isOpen: boolean
  highlightedIndex: number
  disabled: boolean
  inputRef: React.RefObject<HTMLInputElement>
  
  // Downshift prop getters
  getItemProps: (options: any) => any
  getInputProps: (options?: any) => any
  getToggleButtonProps: (options?: any) => any
  getMenuProps: (options?: any) => any
  getLabelProps: (options?: any) => any
  
  // Actions
  selectOption: (option: SelectAutocompleteOption | null) => void
  removeOption: (option: SelectAutocompleteOption) => void
  openMenu: () => void
  closeMenu: () => void
  setInputValue: (value: string) => void
  setIsOpen: (open: boolean) => void
  reset: () => void
  
  // Mode identifier
  mode: 'single' | 'multiple' | 'combobox'
}

export const SelectBaseContext = createContext<SelectBaseContextValue | null>(null)

export function useSelectBase() {
  const context = useContext(SelectBaseContext)
  if (!context) {
    throw new Error('useSelectBase must be used within a Select provider component')
  }
  return context
}