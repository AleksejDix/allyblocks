import type { BaseFieldProps } from '../BaseField.types'

/**
 * Type for select-based form fields
 */
export type SelectFieldProps = BaseFieldProps & {
  /** Placeholder text for the select field */
  placeholder?: string
  /** The select options as children (SelectContent, SelectItem, etc.) */
  children?: React.ReactNode
  /** Selection mode - single or multiple */
  mode?: 'single' | 'multiple'
  /** The width of the dropdown menu */
  width?: string | number
  /** Text to show in front of the selected count (for multiple mode) */
  selectedText?: string
  /** Additional CSS classes */
  className?: string
}