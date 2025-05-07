import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";

export type CommandProps = React.ComponentProps<typeof CommandPrimitive> & {
  /** Additional CSS classes */
  className?: string;

  /** Size variant */
  size?: "default" | "sm" | "md" | "lg";
};

export type CommandDialogProps = React.ComponentProps<
  typeof CommandPrimitive
> & {
  /** Dialog title */
  title?: string;

  /** Dialog description */
  description?: string;

  /** Whether the dialog is open */
  open?: boolean;

  /** Callback when dialog open state changes */
  onOpenChange?: (open: boolean) => void;

  /** Child elements */
  children?: React.ReactNode;
};

export type CommandInputProps = Omit<
  React.ComponentProps<typeof CommandPrimitive.Input>,
  "size"
> & {
  /** Additional CSS classes */
  className?: string;

  /** Placeholder text */
  placeholder?: string;

  /** Input variant */
  variant?: "default" | "subtle";

  /** Input size */
  size?: "default" | "sm" | "lg";
};

export type CommandListProps = React.ComponentProps<
  typeof CommandPrimitive.List
> & {
  /** Additional CSS classes */
  className?: string;

  /** Child elements */
  children?: React.ReactNode;
};

export type CommandEmptyProps = React.ComponentProps<
  typeof CommandPrimitive.Empty
> & {
  /** Child elements */
  children?: React.ReactNode;
};

export type CommandGroupProps = React.ComponentProps<
  typeof CommandPrimitive.Group
> & {
  /** Additional CSS classes */
  className?: string;

  /** Group heading */
  heading?: React.ReactNode;

  /** Child elements */
  children?: React.ReactNode;
};

export type CommandSeparatorProps = React.ComponentProps<
  typeof CommandPrimitive.Separator
> & {
  /** Additional CSS classes */
  className?: string;
};

export type CommandItemProps = React.ComponentProps<
  typeof CommandPrimitive.Item
> & {
  /** Additional CSS classes */
  className?: string;

  /** Whether the item is disabled */
  disabled?: boolean;

  /** Child elements */
  children?: React.ReactNode;

  /** Callback when item is selected */
  onSelect?: (value: string) => void;
};

export type CommandShortcutProps = React.HTMLAttributes<HTMLSpanElement> & {
  /** Additional CSS classes */
  className?: string;
};
