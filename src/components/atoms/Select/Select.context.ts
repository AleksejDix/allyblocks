import { createContext, useContext } from 'react'

/**
 * Type for multiselect context value
 */
export type SelectContextValue = {
  /** Selection mode - single or multiple */
  mode: 'single' | 'multiple'

  /** Currently selected values */
  value: string | string[]

  /** Callback to update selected values */
  onValueChange: (value: string | string[]) => void

  /** Whether the select is disabled */
  disabled?: boolean

  /** Whether the field is required */
  required?: boolean

  /** ID for accessibility */
  id: string
}

/**
 * Context for sharing Select state across components
 */
export const SelectContext = createContext<SelectContextValue | undefined>(undefined)

/**
 * Hook to use the Select context
 * @throws Error if used outside of a Select component
 */
export function useSelect(): SelectContextValue {
  const context = useContext(SelectContext)
  if (!context) {
    throw new Error('Select components must be used within a Select root')
  }
  return context
}
