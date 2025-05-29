'use client'

import React, { createContext, useContext } from 'react'

/**
 * Context value type for sharing state between Listbox and ListboxItem components.
 */
export type ListboxContextValue = {
  /** The selected value(s). Can be a string for single selection or array for multiple selection. */
  value?: string | string[]
  /** Callback fired when the selection changes. */
  onValueChange?: (value: string | string[]) => void
  /** Whether multiple items can be selected. */
  multiple?: boolean
  /** Whether the listbox is disabled. */
  disabled?: boolean
  /** The orientation of the listbox for keyboard navigation. */
  orientation?: 'horizontal' | 'vertical'
  /** The size variant of the listbox. */
  size?: 'sm' | 'md' | 'lg'
  /** The currently highlighted value for keyboard navigation. */
  highlightedValue?: string
  /** Function to set the highlighted value. */
  setHighlightedValue?: (value: string | undefined) => void
  /** Function to register an item with the listbox. */
  registerItem?: (value: string, element: HTMLElement, textValue: string, disabled: boolean) => void
  /** Function to unregister an item from the listbox. */
  unregisterItem?: (value: string) => void
}

/**
 * Context for sharing props and state between Listbox and ListboxItem components.
 */
export const ListboxContext = createContext<ListboxContextValue>({})

/**
 * Provider component for the Listbox context.
 */
export type ListboxProviderProps = {
  /** The context value to provide to child components. */
  value: ListboxContextValue
  /** Child components that will have access to the context. */
  children: React.ReactNode
}

export const ListboxProvider: React.FC<ListboxProviderProps> = ({ value, children }) => {
  return <ListboxContext.Provider value={value}>{children}</ListboxContext.Provider>
}

/**
 * Hook to access the Listbox context.
 * Must be used within a ListboxProvider.
 *
 * @returns The current listbox context value
 * @throws Error if used outside of a ListboxProvider
 */
export const useListboxContext = (): ListboxContextValue => {
  const context = useContext(ListboxContext)

  if (context === undefined) {
    throw new Error('useListboxContext must be used within a ListboxProvider')
  }

  return context
}

/**
 * Hook to safely access the Listbox context without throwing an error.
 * Returns undefined if used outside of a ListboxProvider.
 *
 * @returns The current listbox context value or undefined
 */
export const useOptionalListboxContext = (): ListboxContextValue | undefined => {
  return useContext(ListboxContext)
}
