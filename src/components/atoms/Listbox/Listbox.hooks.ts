'use client'

import { useCallback, useRef, useState } from 'react'
import { composeEventHandlers } from '@radix-ui/primitive'
import { useCallbackRef } from '@radix-ui/react-use-callback-ref'
import React from 'react'

/**
 * Wraps an array around itself at a given start index
 * Example: `wrapArray(['a', 'b', 'c', 'd'], 2) === ['c', 'd', 'a', 'b']`
 */
function wrapArray<T>(array: T[], startIndex: number) {
  return array.map<T>((_, index) => array[(startIndex + index) % array.length]!)
}

/**
 * Typeahead matching logic from Radix Menu.
 * Takes all values, search string, and current match, returns next match.
 */
function getNextMatch(values: string[], search: string, currentMatch?: string) {
  const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0])
  const normalizedSearch = isRepeated ? search[0]! : search
  const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1
  let wrappedValues = wrapArray(values, Math.max(currentMatchIndex, 0))
  const excludeCurrentMatch = normalizedSearch.length === 1
  if (excludeCurrentMatch) wrappedValues = wrappedValues.filter((v) => v !== currentMatch)
  const nextMatch = wrappedValues.find((value) => value.toLowerCase().startsWith(normalizedSearch.toLowerCase()))
  return nextMatch !== currentMatch ? nextMatch : undefined
}

/**
 * Hook for managing listbox keyboard navigation with typeahead search.
 * Handles arrow keys, Home/End keys, looping behavior, and character search.
 */
export const useListboxNavigation = (
  itemsRef: React.MutableRefObject<Map<string, { element: HTMLElement; textValue: string; disabled: boolean }>>,
  loop: boolean = true,
) => {
  const [highlightedValue, setHighlightedValue] = useState<string | undefined>()
  const searchRef = useRef('')
  const timerRef = useRef(0)

  // Get all available (non-disabled) item values
  const getItemValues = useCallback(() => {
    return Array.from(itemsRef.current.entries())
      .filter(([, item]) => !item.disabled)
      .map(([value]) => value)
  }, [itemsRef])

  // Get text values for typeahead search
  const getTextValues = useCallback(() => {
    return Array.from(itemsRef.current.entries())
      .filter(([, item]) => !item.disabled)
      .map(([, item]) => item.textValue)
  }, [itemsRef])

  // Navigate to next/previous/first/last item
  const navigate = useCallback(
    (direction: 'next' | 'previous' | 'first' | 'last') => {
      const items = getItemValues()
      if (items.length === 0) return

      let newIndex: number

      if (direction === 'first') {
        newIndex = 0
      } else if (direction === 'last') {
        newIndex = items.length - 1
      } else {
        const currentIndex = highlightedValue ? items.indexOf(highlightedValue) : -1

        if (direction === 'next') {
          newIndex = currentIndex + 1
          if (newIndex >= items.length) {
            newIndex = loop ? 0 : items.length - 1
          }
        } else {
          newIndex = currentIndex - 1
          if (newIndex < 0) {
            newIndex = loop ? items.length - 1 : 0
          }
        }
      }

      const newValue = items[newIndex]
      if (newValue && newValue !== highlightedValue) {
        setHighlightedValue(newValue)
      }
    },
    [highlightedValue, loop, getItemValues, setHighlightedValue],
  )

  // Handle typeahead search
  const handleTypeaheadSearch = useCallback(
    (key: string) => {
      const search = searchRef.current + key
      const textValues = getTextValues()
      const items = Array.from(itemsRef.current.entries()).filter(([, item]) => !item.disabled)

      const currentMatch = highlightedValue ? itemsRef.current.get(highlightedValue)?.textValue : undefined
      const nextMatch = getNextMatch(textValues, search, currentMatch)
      const newItemEntry = items.find(([, item]) => item.textValue === nextMatch)

      // Reset search after 1 second
      const updateSearch = (value: string) => {
        searchRef.current = value
        window.clearTimeout(timerRef.current)
        if (value !== '') {
          timerRef.current = window.setTimeout(() => updateSearch(''), 1000)
        }
      }

      updateSearch(search)

      if (newItemEntry) {
        const [newValue] = newItemEntry
        setHighlightedValue(newValue)
      }
    },
    [getTextValues, itemsRef, highlightedValue, setHighlightedValue],
  )

  return {
    highlightedValue,
    setHighlightedValue,
    navigate,
    getItemValues,
    handleTypeaheadSearch,
    searchRef,
  }
}

/**
 * Hook for managing listbox item registration with text values.
 * Keeps track of all items in the listbox for keyboard navigation and typeahead.
 */
export const useListboxItems = () => {
  const itemsRef = useRef<Map<string, { element: HTMLElement; textValue: string; disabled: boolean }>>(new Map())

  // Register an item with the listbox
  const registerItem = useCallback((itemValue: string, element: HTMLElement, textValue: string, disabled: boolean) => {
    itemsRef.current.set(itemValue, { element, textValue, disabled })
  }, [])

  // Unregister an item from the listbox
  const unregisterItem = useCallback((itemValue: string) => {
    itemsRef.current.delete(itemValue)
  }, [])

  return {
    itemsRef,
    registerItem,
    unregisterItem,
  }
}

/**
 * Hook for managing listbox selection logic.
 * Handles both single and multiple selection modes.
 */
export const useListboxSelection = (
  value: string | string[] | undefined,
  onValueChange: ((value: string | string[]) => void) | undefined,
  multiple: boolean = false,
) => {
  const handleValueChange = useCallbackRef(onValueChange)

  // Check if a value is selected
  const isSelected = useCallback(
    (itemValue: string): boolean => {
      if (multiple) {
        return Array.isArray(value) && value.includes(itemValue)
      }
      return value === itemValue
    },
    [value, multiple],
  )

  // Toggle selection of an item
  const toggleSelection = useCallback(
    (itemValue: string) => {
      if (!handleValueChange) return

      let newValue: string | string[]

      if (multiple) {
        const currentArray = Array.isArray(value) ? value : []
        if (currentArray.includes(itemValue)) {
          newValue = currentArray.filter((v) => v !== itemValue)
        } else {
          newValue = [...currentArray, itemValue]
        }
      } else {
        newValue = itemValue
      }

      handleValueChange(newValue)
    },
    [value, handleValueChange, multiple],
  )

  return {
    isSelected,
    toggleSelection,
  }
}

/**
 * Hook for handling listbox keyboard events.
 * Combines navigation, selection, and typeahead logic.
 */
export const useListboxKeyboard = (
  navigate: (direction: 'next' | 'previous' | 'first' | 'last') => void,
  toggleSelection: (itemValue: string) => void,
  handleTypeaheadSearch: (key: string) => void,
  highlightedValue: string | undefined,
  orientation: 'horizontal' | 'vertical' = 'vertical',
  disabled: boolean = false,
) => {
  const SELECTION_KEYS = ['Enter', ' ']
  const FIRST_KEYS = ['ArrowDown', 'PageUp', 'Home']
  const LAST_KEYS = ['ArrowUp', 'PageDown', 'End']
  const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS]

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return

      const { key } = event
      const isVertical = orientation === 'vertical'
      const isHorizontal = orientation === 'horizontal'
      const isModifierKey = event.ctrlKey || event.altKey || event.metaKey
      const isCharacterKey = key.length === 1

      // Handle typeahead search
      if (!isModifierKey && isCharacterKey) {
        handleTypeaheadSearch(key)
        return
      }

      // Handle navigation keys
      switch (key) {
        case 'ArrowDown':
          if (isVertical) {
            event.preventDefault()
            navigate('next')
          }
          break
        case 'ArrowUp':
          if (isVertical) {
            event.preventDefault()
            navigate('previous')
          }
          break
        case 'ArrowRight':
          if (isHorizontal) {
            event.preventDefault()
            navigate('next')
          }
          break
        case 'ArrowLeft':
          if (isHorizontal) {
            event.preventDefault()
            navigate('previous')
          }
          break
        case 'Home':
        case 'PageUp':
          event.preventDefault()
          navigate('first')
          break
        case 'End':
        case 'PageDown':
          event.preventDefault()
          navigate('last')
          break
        case 'Enter':
        case ' ':
          if (highlightedValue) {
            event.preventDefault()
            toggleSelection(highlightedValue)
          }
          break
      }
    },
    [disabled, orientation, navigate, highlightedValue, toggleSelection, handleTypeaheadSearch],
  )

  return { handleKeyDown }
}

/**
 * Main hook that combines all listbox functionality.
 * Provides a complete solution for listbox state management.
 */
export const useListbox = (
  value: string | string[] | undefined,
  onValueChange: ((value: string | string[]) => void) | undefined,
  multiple: boolean = false,
  orientation: 'horizontal' | 'vertical' = 'vertical',
  loop: boolean = true,
  disabled: boolean = false,
) => {
  const { itemsRef, registerItem, unregisterItem } = useListboxItems()
  const { highlightedValue, setHighlightedValue, navigate, handleTypeaheadSearch, searchRef } = useListboxNavigation(
    itemsRef,
    loop,
  )
  const { isSelected, toggleSelection } = useListboxSelection(value, onValueChange, multiple)
  const { handleKeyDown } = useListboxKeyboard(
    navigate,
    toggleSelection,
    handleTypeaheadSearch,
    highlightedValue,
    orientation,
    disabled,
  )

  // Initialize highlighted value based on W3C guidelines
  // This effect runs whenever the value changes or items are registered
  React.useEffect(() => {
    if (disabled) return

    const items = Array.from(itemsRef.current.entries()).filter(([, item]) => !item.disabled)
    if (items.length === 0) return

    let initialHighlighted: string | undefined

    if (multiple) {
      // For multi-select: focus on first selected item, or first item if none selected
      if (Array.isArray(value) && value.length > 0) {
        // Find first selected item that exists in the items
        initialHighlighted = items.find(([itemValue]) => value.includes(itemValue))?.[0]
      }
      if (!initialHighlighted) {
        initialHighlighted = items[0]?.[0]
      }
    } else {
      // For single-select: focus on selected item, or first item if none selected
      if (value && typeof value === 'string') {
        const selectedItem = items.find(([itemValue]) => itemValue === value)
        if (selectedItem) {
          initialHighlighted = selectedItem[0]
        }
      }
      if (!initialHighlighted) {
        initialHighlighted = items[0]?.[0]
      }
    }

    // Only set if we don't have a highlighted value or if the current one is invalid
    if (initialHighlighted && (!highlightedValue || !items.find(([itemValue]) => itemValue === highlightedValue))) {
      setHighlightedValue(initialHighlighted)
    }
  }, [value, multiple, disabled, setHighlightedValue]) // Removed itemsRef and highlightedValue from deps

  // Enhanced registerItem that triggers initialization
  const enhancedRegisterItem = React.useCallback(
    (itemValue: string, element: HTMLElement, textValue: string, disabled: boolean) => {
      registerItem(itemValue, element, textValue, disabled)

      // Trigger initialization if this is the first item or we don't have a highlighted value
      if (!highlightedValue || itemsRef.current.size === 1) {
        // Use setTimeout to ensure this runs after the current render cycle
        setTimeout(() => {
          const items = Array.from(itemsRef.current.entries()).filter(([, item]) => !item.disabled)
          if (items.length === 0) return

          let initialHighlighted: string | undefined

          if (multiple) {
            if (Array.isArray(value) && value.length > 0) {
              initialHighlighted = items.find(([itemValue]) => value.includes(itemValue))?.[0]
            }
            if (!initialHighlighted) {
              initialHighlighted = items[0]?.[0]
            }
          } else {
            if (value && typeof value === 'string') {
              const selectedItem = items.find(([itemValue]) => itemValue === value)
              if (selectedItem) {
                initialHighlighted = selectedItem[0]
              }
            }
            if (!initialHighlighted) {
              initialHighlighted = items[0]?.[0]
            }
          }

          if (initialHighlighted && !highlightedValue) {
            setHighlightedValue(initialHighlighted)
          }
        }, 0)
      }
    },
    [registerItem, highlightedValue, multiple, value, setHighlightedValue, itemsRef],
  )

  return {
    // Item management
    itemsRef,
    registerItem: enhancedRegisterItem,
    unregisterItem,

    // Navigation
    highlightedValue,
    setHighlightedValue,
    navigate,

    // Selection
    isSelected,
    toggleSelection,

    // Keyboard handling
    handleKeyDown,

    // Typeahead search
    handleTypeaheadSearch,
    searchRef,
  }
}
