import { useState, useCallback, useMemo } from 'react'
import { format } from 'date-fns'
import type { DatePickerMode, DatePickerValue, UseDatePickerReturn } from './DatePicker.types'

/**
 * Main hook for DatePicker functionality
 * Inspired by Vue composables architecture from pickle project
 */
export function useDatePicker<T extends DatePickerMode = 'single'>({
  mode = 'single' as T,
  defaultValue,
  value: controlledValue,
  onValueChange,
  dateFormat = 'PPP',
}: {
  mode?: T
  defaultValue?: DatePickerValue<T>
  value?: DatePickerValue<T>
  onValueChange?: (value: DatePickerValue<T>) => void
  dateFormat?: string
} = {}): UseDatePickerReturn<T> {
  const [uncontrolledValue, setUncontrolledValue] = useState<DatePickerValue<T>>(defaultValue as DatePickerValue<T>)
  const [isOpen, setIsOpen] = useState(false)
  
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue

  const setValue = useCallback(
    (newValue: DatePickerValue<T>) => {
      if (!isControlled) {
        setUncontrolledValue(newValue)
      }
      onValueChange?.(newValue)
    },
    [isControlled, onValueChange],
  )

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

  const clear = useCallback(() => {
    const clearedValue = (mode === 'single' ? undefined : mode === 'multiple' ? [] : undefined) as DatePickerValue<T>
    setValue(clearedValue)
  }, [mode, setValue])

  const displayValue = useMemo(() => {
    if (!value) return ''

    switch (mode) {
      case 'single':
        return value instanceof Date ? format(value, dateFormat) : ''
      case 'multiple':
        return Array.isArray(value) && value.length > 0
          ? value.length === 1
            ? format(value[0], dateFormat)
            : `${format(value[0], dateFormat)} (+${value.length - 1} more)`
          : ''
      case 'range':
        if (value && typeof value === 'object' && 'from' in value) {
          const { from, to } = value
          if (from && to) {
            return `${format(from, dateFormat)} - ${format(to, dateFormat)}`
          } else if (from) {
            return format(from, dateFormat)
          }
        }
        return ''
      default:
        return ''
    }
  }, [value, mode, dateFormat])

  const hasValue = useMemo(() => {
    if (!value) return false

    switch (mode) {
      case 'single':
        return value instanceof Date
      case 'multiple':
        return Array.isArray(value) && value.length > 0
      case 'range':
        return value && typeof value === 'object' && 'from' in value && !!value.from
      default:
        return false
    }
  }, [value, mode])

  return {
    value,
    setValue,
    displayValue,
    isOpen,
    open,
    close,
    toggle,
    clear,
    hasValue,
  }
}

/**
 * Hook for managing popover state
 */
export function useDatePickerPopover() {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

  return { isOpen, open, close, toggle }
}

/**
 * Hook for date formatting utilities
 */
export function useDateFormatting(dateFormat: string = 'PPP') {
  const formatDate = useCallback(
    (date: Date | undefined) => {
      return date ? format(date, dateFormat) : ''
    },
    [dateFormat],
  )

  const formatDateRange = useCallback(
    (from: Date | undefined, to: Date | undefined) => {
      if (from && to) {
        return `${format(from, dateFormat)} - ${format(to, dateFormat)}`
      } else if (from) {
        return format(from, dateFormat)
      }
      return ''
    },
    [dateFormat],
  )

  const formatMultipleDates = useCallback(
    (dates: Date[]) => {
      if (dates.length === 0) return ''
      if (dates.length === 1) return format(dates[0], dateFormat)
      return `${format(dates[0], dateFormat)} (+${dates.length - 1} more)`
    },
    [dateFormat],
  )

  return {
    formatDate,
    formatDateRange,
    formatMultipleDates,
  }
}

/**
 * Hook for keyboard navigation
 */
export function useDatePickerKeyboard({
  isOpen,
  open,
  close,
  onEnter,
}: {
  isOpen: boolean
  open: () => void
  close: () => void
  onEnter?: () => void
}) {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case 'Enter':
        case ' ':
          event.preventDefault()
          if (!isOpen) {
            open()
          } else {
            onEnter?.()
          }
          break
        case 'Escape':
          if (isOpen) {
            event.preventDefault()
            close()
          }
          break
        case 'ArrowDown':
          if (!isOpen) {
            event.preventDefault()
            open()
          }
          break
      }
    },
    [isOpen, open, close, onEnter],
  )

  return { handleKeyDown }
}
