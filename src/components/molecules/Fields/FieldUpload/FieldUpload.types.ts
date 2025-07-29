import type { InputHTMLAttributes } from 'react'
import type { BaseFieldProps } from '../BaseField.types'

/**
 * Type for upload-based form fields
 */
export type UploadFieldProps = BaseFieldProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    /** Accepted file types */
    accept?: string
    /** Allow multiple file uploads */
    multiple?: boolean
    /** Maximum file size in bytes */
    maxSize?: number
    /** Custom validation function */
    validateFile?: (file: File) => string | null
    /** Help text for upload instructions */
    helpText?: string
  }