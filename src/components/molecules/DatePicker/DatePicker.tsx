import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { Calendar } from '@/components/organisms/Calendar'
import { Icon } from '@/components/atoms/Icon'
import { cn } from '@/lib/utils'
import {
  datePickerVariants,
  datePickerInputVariants,
  datePickerTriggerVariants,
  datePickerPopoverVariants,
  datePickerCalendarVariants,
} from './DatePicker.variants'
import { useDatePicker, useDatePickerKeyboard } from './DatePicker.hooks'
import type {
  DatePickerProps,
  DatePickerInputProps,
  DatePickerTriggerProps,
  DatePickerMode,
  DatePickerValue,
} from './DatePicker.types'

/**
 * DatePicker - A comprehensive date selection component
 *
 * Features:
 * - Single, multiple, and range selection modes
 * - Keyboard navigation and accessibility
 * - Integration with existing Calendar component
 * - Form-friendly with proper validation states
 * - Customizable date formatting
 *
 * @example
 * ```tsx
 * // Single date selection
 * <DatePicker
 *   placeholder="Select a date"
 *   onValueChange={(date) => console.log(date)}
 * />
 *
 * // Date range selection
 * <DatePicker
 *   mode="range"
 *   placeholder="Select date range"
 *   onValueChange={(range) => console.log(range.from, range.to)}
 * />
 *
 * // Multiple date selection
 * <DatePicker
 *   mode="multiple"
 *   placeholder="Select dates"
 *   onValueChange={(dates) => console.log(dates)}
 * />
 * ```
 */
export function DatePicker<T extends DatePickerMode = 'single'>({
  mode = 'single' as T,
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Pick a date',
  disabled = false,
  required = false,
  className,
  calendarProps,
  inputProps,
  dateFormat = 'PPP',
  id,
  name,
  size = 'md',
  variant = 'default',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  ...props
}: DatePickerProps<T>) {
  const {
    value: selectedValue,
    setValue,
    displayValue,
    isOpen,
    open,
    close,
    toggle,
    clear,
    hasValue,
  } = useDatePicker({
    mode,
    value,
    defaultValue,
    onValueChange,
    dateFormat,
  })

  const { handleKeyDown } = useDatePickerKeyboard({
    isOpen,
    open,
    close,
  })

  const handleCalendarSelect = React.useCallback(
    (newValue: any) => {
      setValue(newValue as DatePickerValue<T>)
      if (mode === 'single') {
        close()
      }
    },
    [setValue, mode, close],
  )

  const handleInputClick = React.useCallback(() => {
    if (!disabled) {
      toggle()
    }
  }, [disabled, toggle])

  const handleClear = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation()
      clear()
    },
    [clear],
  )

  return (
    <div className={cn(datePickerVariants({ size, variant }), className)} {...props}>
      <PopoverPrimitive.Root open={isOpen} onOpenChange={(isOpen) => (isOpen ? open() : close())}>
        <PopoverPrimitive.Trigger asChild>
          <DatePickerInput
            value={displayValue}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            onClick={handleInputClick}
            onKeyDown={handleKeyDown}
            className={cn(datePickerInputVariants({ size, variant }))}
            id={id}
            name={name}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedby}
            aria-expanded={isOpen}
            aria-haspopup="dialog"
            {...inputProps}
          />
        </PopoverPrimitive.Trigger>

        <DatePickerTrigger
          disabled={disabled}
          onClick={handleInputClick}
          className={cn(datePickerTriggerVariants({ size }))}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label="Open calendar"
        >
          {hasValue ? (
            <Icon name="x" className="h-4 w-4 cursor-pointer hover:text-destructive" onClick={handleClear} />
          ) : (
            <Icon name="calendar" className="h-4 w-4" />
          )}
        </DatePickerTrigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content className={cn(datePickerPopoverVariants())} align="start" sideOffset={4}>
            <Calendar
              mode={mode}
              selected={selectedValue as any}
              onSelect={handleCalendarSelect}
              className={cn(datePickerCalendarVariants())}
              initialFocus
              {...calendarProps}
            />
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    </div>
  )
}

/**
 * DatePickerInput - Input component for date picker
 */
export function DatePickerInput({
  value,
  placeholder,
  disabled,
  required,
  onClick,
  onKeyDown,
  className,
  id,
  name,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  'aria-expanded': ariaExpanded,
  'aria-haspopup': ariaHaspopup,
  ...props
}: DatePickerInputProps) {
  return (
    <input
      type="text"
      value={value || ''}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      readOnly
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={cn(className)}
      id={id}
      name={name}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHaspopup}
      {...props}
    />
  )
}

/**
 * DatePickerTrigger - Trigger button for date picker
 */
export function DatePickerTrigger({
  onClick,
  disabled,
  className,
  children,
  'aria-expanded': ariaExpanded,
  'aria-haspopup': ariaHaspopup,
  'aria-label': ariaLabel,
  ...props
}: DatePickerTriggerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(className)}
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHaspopup}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  )
}

// Set display names for debugging
DatePicker.displayName = 'DatePicker'
DatePickerInput.displayName = 'DatePickerInput'
DatePickerTrigger.displayName = 'DatePickerTrigger'
