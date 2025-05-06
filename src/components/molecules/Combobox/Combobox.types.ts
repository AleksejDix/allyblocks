import * as React from "react";

export type ComboboxOption = {
  /** The label to display */
  label: string;
  
  /** The value of the option */
  value: string;
  
  /** Whether the option is disabled */
  disabled?: boolean;
  
  /** Optional description or additional text */
  description?: string;
  
  /** Optional icon name */
  icon?: string;
};

export interface ComboboxRootProps {
  /** Selected value */
  value?: string;
  
  /** Default value for uncontrolled usage */
  defaultValue?: string;
  
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  
  /** Whether the combobox is disabled */
  disabled?: boolean;
  
  /** Options for the combobox */
  options: ComboboxOption[];
  
  /** Filter function for searching */
  filter?: (value: string, search: string) => boolean;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Child elements */
  children?: React.ReactNode;
  
  /** Placeholder text */
  placeholder?: string;
}

export interface ComboboxTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Additional CSS classes */
  className?: string;
  
  /** Child elements */
  children?: React.ReactNode;
}

export interface ComboboxValueProps {
  /** Placeholder text to show when no value is selected */
  placeholder?: string;
  
  /** Additional CSS classes */
  className?: string;
}

export interface ComboboxContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Child elements */
  children?: React.ReactNode;
  
  /** Width of the content */
  width?: "auto" | "trigger";
  
  /** Side of the trigger to render content */
  side?: "top" | "right" | "bottom" | "left";
  
  /** Alignment of content relative to trigger */
  align?: "start" | "center" | "end";
  
  /** Offset distance from the trigger */
  sideOffset?: number;
  
  /** Additional CSS classes */
  className?: string;
}

export interface ComboboxInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Additional CSS classes */
  className?: string;
  
  /** Input size variant */
  inputSize?: "sm" | "default" | "lg";
}

export interface ComboboxEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Child elements */
  children?: React.ReactNode;
}

export interface ComboboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The value of this item */
  value: string;
  
  /** Text to display */
  children: React.ReactNode;
  
  /** Whether the item is disabled */
  disabled?: boolean;
  
  /** Description text */
  description?: string;
  
  /** Icon name to display */
  icon?: string;
}

export interface ComboboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Header for the group */
  heading?: React.ReactNode;
  
  /** Child elements */
  children?: React.ReactNode;
}

export type ComboboxProps = ComboboxRootProps; 