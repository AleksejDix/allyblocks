import * as React from 'react'
import type { DayPicker } from 'react-day-picker'
import type { VariantProps } from 'class-variance-authority'
import { datePickerVariants } from './DatePicker.variants'

/**
 * Date selection modes
 */
export type DatePickerMode = 'single' | 'multiple' | 'range'

/**
 * Date value types for different modes
 */
export type DatePickerValue<T extends DatePickerMode = 'single'> = T extends 'single'
  ? Date | undefined
  : T extends 'multiple'
    ? Date[] | undefined
    : T extends 'range'
      ? { from: Date | undefined; to: Date | undefined } | undefined
      : never

/**
 * Props for the DatePicker component
 */
export type DatePickerProps<T extends DatePickerMode = 'single'> = {
  /** Selection mode */
  mode?: T
  /** Selected date(s) */
  value?: DatePickerValue<T>
  /** Default selected date(s) */
  defaultValue?: DatePickerValue<T>
  /** Callback when date selection changes */
  onValueChange?: (value: DatePickerValue<T>) => void
  /** Placeholder text for the input */
  placeholder?: string
  /** Whether the date picker is disabled */
  disabled?: boolean
  /** Whether the date picker is required */
  required?: boolean
  /** Custom className */
  className?: string
  /** Props passed to the calendar */
  calendarProps?: Omit<React.ComponentProps<typeof DayPicker>, 'mode' | 'selected' | 'onSelect'>
  /** Props passed to the input trigger */
  inputProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'placeholder'>
  /** Date format string */
  dateFormat?: string
  /** Whether to show the time picker as well */
  includeTime?: boolean
  /** ID for the input element */
  id?: string
  /** Name for the input element */
  name?: string
  /** ARIA label */
  'aria-label'?: string
  /** ARIA describedby */
  'aria-describedby'?: string
} & VariantProps<typeof datePickerVariants>

/**
 * Props for DatePickerInput component
 */
export type DatePickerInputProps = {
  /** Input value */
  value?: string
  /** Placeholder text */
  placeholder?: string
  /** Whether input is disabled */
  disabled?: boolean
  /** Whether input is required */
  required?: boolean
  /** Click handler */
  onClick?: () => void
  /** Keyboard handler */
  onKeyDown?: (event: React.KeyboardEvent) => void
  /** Custom className */
  className?: string
  /** ID for accessibility */
  id?: string
  /** Name attribute */
  name?: string
  /** ARIA attributes */
  'aria-label'?: string
  'aria-describedby'?: string
  'aria-expanded'?: boolean
  'aria-haspopup'?: boolean
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onClick' | 'onChange'>

/**
 * Props for DatePickerTrigger component
 */
export type DatePickerTriggerProps = {
  /** Whether trigger is active/open */
  isOpen?: boolean
  /** Click handler */
  onClick?: () => void
  /** Whether trigger is disabled */
  disabled?: boolean
  /** Custom className */
  className?: string
  /** Children content */
  children?: React.ReactNode
  /** ARIA attributes */
  'aria-expanded'?: boolean
  'aria-haspopup'?: boolean
  'aria-label'?: string
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>

/**
 * Hook return type for useDatePicker
 */
export type UseDatePickerReturn<T extends DatePickerMode = 'single'> = {
  /** Current selected value */
  value: DatePickerValue<T>
  /** Update the selected value */
  setValue: (value: DatePickerValue<T>) => void
  /** Formatted display value */
  displayValue: string
  /** Whether popover is open */
  isOpen: boolean
  /** Open the popover */
  open: () => void
  /** Close the popover */
  close: () => void
  /** Toggle the popover */
  toggle: () => void
  /** Clear the selection */
  clear: () => void
  /** Whether there is a selected value */
  hasValue: boolean
}
