import type { BaseFieldProps } from '../BaseField.types'

/**
 * Type for OTP-based form fields
 */
export type OTPFieldProps = BaseFieldProps & {
  /** Maximum length of the OTP code */
  maxLength?: number
}