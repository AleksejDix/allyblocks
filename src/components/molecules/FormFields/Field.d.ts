import { InputHTMLAttributes } from "react";

/**
 * Base type for all form field props
 */
export type BaseFieldProps = {
  /** The name of the field, used for form submission and validation */
  name: string;
  /** The label text for the field */
  label?: string;
  /** A description or helper text for the field */
  description?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
};

/**
 * Type for input-based form fields (extends HTML input attributes)
 */
export type InputFieldProps = BaseFieldProps & InputHTMLAttributes<HTMLInputElement>;

/**
 * Type for select-based form fields
 */
export type SelectFieldProps = BaseFieldProps & {
  /** Placeholder text for the select field */
  placeholder?: string;
  /** Array of options for the select field */
  options: SelectOption[];
};

/**
 * Type for OTP-based form fields
 */
export type OTPFieldProps = BaseFieldProps & {
  /** Maximum length of the OTP code */
  maxLength?: number;
};

/**
 * Type for password-based form fields
 */
export type PasswordFieldProps = InputFieldProps & {
  /** Whether to show password strength indicator */
  showStrength?: boolean;
};

/**
 * Type for select options
 */
export type SelectOption = {
  /** The value of the option */
  value: string;
  /** The display label of the option */
  label: string;
}; 