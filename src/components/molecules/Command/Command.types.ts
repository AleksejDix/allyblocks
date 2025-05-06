import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";

export interface CommandProps extends React.ComponentProps<typeof CommandPrimitive> {
  /** Additional CSS classes */
  className?: string;
  
  /** Size variant */
  size?: "default" | "sm" | "md" | "lg";
}

export interface CommandDialogProps extends React.ComponentProps<typeof CommandPrimitive> {
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
}

export interface CommandInputProps extends React.ComponentProps<typeof CommandPrimitive.Input> {
  /** Additional CSS classes */
  className?: string;
  
  /** Placeholder text */
  placeholder?: string;
  
  /** Input variant */
  variant?: "default" | "subtle";
  
  /** Input size */
  size?: "default" | "sm" | "lg";
}

export interface CommandListProps extends React.ComponentProps<typeof CommandPrimitive.List> {
  /** Additional CSS classes */
  className?: string;
  
  /** Child elements */
  children?: React.ReactNode;
}

export interface CommandEmptyProps extends React.ComponentProps<typeof CommandPrimitive.Empty> {
  /** Child elements */
  children?: React.ReactNode;
}

export interface CommandGroupProps extends React.ComponentProps<typeof CommandPrimitive.Group> {
  /** Additional CSS classes */
  className?: string;
  
  /** Group heading */
  heading?: React.ReactNode;
  
  /** Child elements */
  children?: React.ReactNode;
}

export interface CommandSeparatorProps extends React.ComponentProps<typeof CommandPrimitive.Separator> {
  /** Additional CSS classes */
  className?: string;
}

export interface CommandItemProps extends React.ComponentProps<typeof CommandPrimitive.Item> {
  /** Additional CSS classes */
  className?: string;
  
  /** Whether the item is disabled */
  disabled?: boolean;
  
  /** Child elements */
  children?: React.ReactNode;
  
  /** Callback when item is selected */
  onSelect?: (value: string) => void;
}

export interface CommandShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Additional CSS classes */
  className?: string;
} 