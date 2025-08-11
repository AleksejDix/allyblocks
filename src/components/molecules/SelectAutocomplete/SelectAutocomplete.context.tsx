import { createContext, useContext } from 'react'
import type { SelectAutocompleteContextValue } from './SelectAutocomplete.types'

export const SelectAutocompleteContext = createContext<SelectAutocompleteContextValue | null>(null)

export function useSelectAutocomplete() {
  const context = useContext(SelectAutocompleteContext)
  if (!context) {
    throw new Error('useSelectAutocomplete must be used within a SelectAutocomplete component')
  }
  return context
}