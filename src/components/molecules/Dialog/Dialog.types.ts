import type { ComponentPropsWithoutRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import type {
  ActionContextType,
  ActionTriggerProps,
  ActionProviderProps,
} from "@/lib/useAction";

/**
 * Type for dialog-specific context
 */
export type DialogAction = Record<string, unknown>;

/**
 * Context type for the Dialog using shared action mechanism
 */
export type DialogContextType = ActionContextType<DialogAction>;

/**
 * Common props for Dialog components
 */
export type DialogProps = {
  /**
   * Optional custom class name
   */
  className?: string;
};

/**
 * Props for the Dialog component
 */
export type DialogRootProps = DialogProps &
  ComponentPropsWithoutRef<typeof DialogPrimitive.Root> &
  ActionProviderProps<DialogAction>;

/**
 * Props for DialogTrigger component
 */
export type DialogTriggerProps = DialogProps &
  ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>;

/**
 * Props for DialogContent component
 */
export type DialogContentProps = DialogProps &
  Omit<
    ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    "onAnimationEnd"
  >;

/**
 * Props for DialogClose component with action support
 */
export type DialogCloseProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Close
> &
  ActionTriggerProps<DialogAction>;

/**
 * Props for DialogHeader component
 */
export type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Props for DialogFooter component
 */
export type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Props for DialogTitle component
 */
export type DialogTitleProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Title
>;

/**
 * Props for DialogDescription component
 */
export type DialogDescriptionProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Description
>;
