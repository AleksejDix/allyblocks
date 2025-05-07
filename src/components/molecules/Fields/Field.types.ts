import type { InputSize } from "@/components/atoms/Input/Input.types";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import React from "react";

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
  /** The size of the field */
  size?: InputSize;
};

/**
 * Type for input-based form fields (extends HTML input attributes)
 */
export type InputFieldProps = BaseFieldProps &
  InputHTMLAttributes<HTMLInputElement>;

/**
 * Type for textarea-based form fields
 */
export type TextareaFieldProps = BaseFieldProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    /** Minimum height of the textarea */
    minHeight?: number;
    /** Maximum height of the textarea (for auto-resize) */
    maxHeight?: number;
    /** Whether the textarea should auto-resize */
    autoResize?: boolean;
  };

/**
 * Type for select-based form fields
 */
export type SelectFieldProps = BaseFieldProps &
  React.SelectHTMLAttributes<HTMLSelectElement> & {
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
 * Type for upload-based form fields
 */
export type UploadFieldProps = BaseFieldProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
    /** Accepted file types */
    accept?: string;
    /** Allow multiple file uploads */
    multiple?: boolean;
    /** Maximum file size in bytes */
    maxSize?: number;
    /** Custom validation function */
    validateFile?: (file: File) => string | null;
    /** Help text for upload instructions */
    helpText?: string;
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

/**
 * Type for checkbox-based form fields
 */
export type CheckboxFieldProps = BaseFieldProps &
  InputHTMLAttributes<HTMLInputElement>;
