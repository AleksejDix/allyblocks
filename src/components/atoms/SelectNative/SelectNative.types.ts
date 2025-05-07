import type { ReactNode } from "react";

/**
 * Available variants for SelectNative component
 */
export type SelectNativeVariant = "default" | "ghost";

/**
 * Available size variants for SelectNative component
 */
export type SelectNativeSize = "sm" | "md" | "lg";

/**
 * Available width variants for SelectNative component
 */
export type SelectNativeWidth = "auto" | "full";

/**
 * Props for the SelectNative component
 */
export interface SelectNativeProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  /**
   * The content of the select (typically option elements)
   */
  children: ReactNode;

  /**
   * Additional CSS classes to apply to the select element
   */
  className?: string;

  /**
   * Custom icon to use for the dropdown indicator
   * @default ChevronDown icon
   */
  icon?: ReactNode;

  /**
   * The visual style variant of the select
   * @default "default"
   */
  variant?: SelectNativeVariant;

  /**
   * The size variant of the select
   * @default "md"
   */
  sizeVariant?: SelectNativeSize;

  /**
   * The width behavior of the select
   * @default "auto"
   */
  width?: SelectNativeWidth;
}
