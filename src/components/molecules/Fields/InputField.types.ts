import type { InputHTMLAttributes } from 'react'
import type { BaseFieldProps } from './BaseField.types'

/**
 * Type for input-based form fields (extends HTML input attributes)
 */
export type InputFieldProps = BaseFieldProps & InputHTMLAttributes<HTMLInputElement>