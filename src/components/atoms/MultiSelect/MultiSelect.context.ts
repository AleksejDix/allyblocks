import { createContext, useContext } from 'react'
import type { MultiSelectOption } from './MultiSelect.types'

/**
 * Type for multiselect context value
 */
export type MultiSelectContextValue = {
  /** Currently selected values */
  value: string[]
  
  /** Callback to update selected values */
  onValueChange: (value: string[]) => void
  
  /** Available options */
  options?: MultiSelectOption[]
  
  /** Whether the select is disabled */
  disabled?: boolean
  
  /** Whether the field is required */
  required?: boolean
  
  /** ID for accessibility */
  id: string
}

/**
 * Context for sharing MultiSelect state across components
 */
export const MultiSelectContext = createContext<MultiSelectContextValue | undefined>(undefined)

/**
 * Hook to use the MultiSelect context
 * @throws Error if used outside of a MultiSelect component
 */
export function useMultiSelect(): MultiSelectContextValue {
  const context = useContext(MultiSelectContext)
  if (!context) {
    throw new Error('MultiSelect components must be used within a MultiSelect root')
  }
  return context
} 