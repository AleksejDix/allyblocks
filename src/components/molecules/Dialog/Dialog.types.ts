import type { ComponentPropsWithoutRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import type {
  ActionContextType,
  ActionTriggerProps,
  ActionProviderProps,
} from "@/lib/useAction";

export type DialogAction = Record<string, unknown>;

export type DialogContextType = ActionContextType<DialogAction>;

export type DialogProps = {
  className?: string;
};

export type DialogRootProps = DialogProps &
  ComponentPropsWithoutRef<typeof DialogPrimitive.Root> &
  ActionProviderProps<DialogAction>;

export type DialogTriggerProps = DialogProps &
  ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>;

export type DialogContentProps = DialogProps &
  Omit<
    ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    "onAnimationEnd"
  >;

export type DialogCloseProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Close
> &
  ActionTriggerProps<DialogAction>;

export type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

export type DialogTitleProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Title
>;

export type DialogDescriptionProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Description
>;
