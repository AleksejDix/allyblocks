import type { TextareaHTMLAttributes } from 'react'
import type { BaseFieldProps } from '../BaseField.types'

/**
 * Type for textarea-based form fields
 */
export type TextareaFieldProps = BaseFieldProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    /** Minimum height of the textarea */
    minHeight?: number
    /** Maximum height of the textarea (for auto-resize) */
    maxHeight?: number
    /** Whether the textarea should auto-resize */
    autoResize?: boolean
  }