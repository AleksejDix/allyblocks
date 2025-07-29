import type { InputSize } from '@/components/atoms/Input/Input.types'

/**
 * Base type for all form field props
 */
export type BaseFieldProps = {
  /** The name of the field, used for form submission and validation */
  name: string
  /** The label text for the field */
  label?: string
  /** A description or helper text for the field */
  description?: string
  /** Whether the field is required */
  required?: boolean
  /** Whether the field is disabled */
  disabled?: boolean
  /** The size of the field */
  size?: InputSize
}