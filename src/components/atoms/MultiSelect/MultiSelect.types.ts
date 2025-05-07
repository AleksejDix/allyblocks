import * as React from "react";
import type { ButtonProps } from "@/components/atoms/Button/Button.types";

export type MultiSelectSize = "sm" | "default" | "lg" | "icon";
export type MultiSelectVariant =
  | "default"
  | "ghost"
  | "outline"
  | "destructive"
  | "secondary"
  | "link";
export type MultiSelectWidth = "auto" | "full";

export type MultiSelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export interface MultiSelectRootProps {
  /** The currently selected values */
  value?: string[];

  /** Default selected values */
  defaultValue?: string[];

  /** Callback when values change */
  onValueChange?: (value: string[]) => void;

  /** Whether the select is disabled */
  disabled?: boolean;

  /** Additional CSS classes */
  className?: string;

  /** ID used for accessibility */
  id?: string;

  /** Whether the field is required */
  required?: boolean;

  /** Children elements */
  children?: React.ReactNode;

  /** Options to render in the dropdown */
  options?: MultiSelectOption[];
}

export interface MultiSelectTriggerProps extends Omit<ButtonProps, "onChange"> {
  /** Children elements */
  children?: React.ReactNode;
}

export interface MultiSelectValueProps {
  /** Placeholder text when no options are selected */
  placeholder?: string;

  /** Text to show before the selected count */
  selectedText?: string;

  /** Maximum number of visible selected items before truncation */
  maxDisplayItems?: number;

  /** Whether to show item labels or just count */
  showSelectedLabels?: boolean;

  /** Additional CSS classes */
  className?: string;
}

export interface MultiSelectGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Children elements */
  children: React.ReactNode;
}

export interface MultiSelectContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Children elements */
  children?: React.ReactNode;

  /** Width variant */
  width?: "auto" | "trigger";

  /** Side of the trigger to render content */
  side?: "top" | "right" | "bottom" | "left";

  /** Alignment of content relative to trigger */
  align?: "start" | "center" | "end";

  /** Offset distance from the trigger */
  sideOffset?: number;
}

export interface MultiSelectLabelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Children elements */
  children: React.ReactNode;
}

export interface MultiSelectSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional CSS classes */
  className?: string;
}

export interface MultiSelectItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Label content */
  children: React.ReactNode;

  /** Item value */
  value: string;

  /** Whether the item is checked */
  checked?: boolean;

  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean) => void;

  /** Whether the item is disabled */
  disabled?: boolean;

  /** Optional explicit label for the item */
  label?: string;
}

// Aliased for cleaner imports
export type MultiSelectProps = MultiSelectRootProps;
