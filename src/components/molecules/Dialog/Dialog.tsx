"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Icon } from "@/components/atoms/Icon";

import { cn } from "@/lib/utils";
import { useActionProvider, useActionHandler } from "@/lib/useAction";
import type {
  DialogRootProps,
  DialogTriggerProps,
  DialogContentProps,
  DialogCloseProps,
  DialogHeaderProps,
  DialogFooterProps,
  DialogTitleProps,
  DialogDescriptionProps,
} from "./Dialog.types";
import { DialogContext, useDialog } from "./Dialog.context";

/**
 * Dialog - Root component for the dialog system
 */
function Dialog({ children, onValueChange, ...props }: DialogRootProps) {
  const { action, setAction } = useActionProvider();

  return (
    <DialogContext.Provider value={{ action, setAction, onValueChange }}>
      <DialogPrimitive.Root data-slot="dialog" {...props}>
        {children}
      </DialogPrimitive.Root>
    </DialogContext.Provider>
  );
}

/**
 * DialogTrigger - The button that opens the dialog
 */
function DialogTrigger({ ...props }: DialogTriggerProps) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

/**
 * DialogPortal - Portal for dialog content
 */
function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

/**
 * DialogClose - Button to close the dialog with action support
 */
function DialogClose({ onAction, value, context, ...props }: DialogCloseProps) {
  const dialogContext = useDialog();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (value || onAction) {
      dialogContext.setAction({
        callback: onAction,
        value,
        context,
        event: event as unknown as Event,
      });
    }

    // The original onClick will be called by Radix
  };

  return (
    <DialogPrimitive.Close
      data-slot="dialog-close"
      onClick={handleClick}
      {...props}
    />
  );
}

/**
 * DialogOverlay - Background overlay for the dialog
 */
function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  );
}

/**
 * DialogContent - The content container for the dialog
 */
function DialogContent({ className, children, ...props }: DialogContentProps) {
  const actionContext = useDialog();
  const handleAnimationEnd = useActionHandler(actionContext);

  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "sm:border bg-background",
          "sm:rounded-lg",
          "fixed z-50",
          "top-1/2 left-1/2",
          "md:top-1/2 md:left-1/2",
          "duration-200",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "grid grid-cols-1 grid-rows-[auto_1fr_auto] w-full md:w-auto md:min-w-lg md:max-w-[calc(100%-2rem)] gap-4 p-6 sm:shadow-lg sm:max-w-lg",
          // Make the dialog full screen on mobile devices
          "-translate-x-1/2 -translate-y-1/2",
          "md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-lg",
          "sm:max-h-[85dvh] sm:h-auto",
          "max-[100dvh] h-[100dvh] ",
          className
        )}
        onAnimationEnd={handleAnimationEnd}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="cursor-pointer ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <Icon name="x" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

/**
 * DialogHeader - Container for dialog title and description
 */
function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("text-left", className)}
      {...props}
    />
  );
}

/**
 * DialogFooter - Container for dialog actions
 */
function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end [&>*]:max-w-full",
        className
      )}
      {...props}
    />
  );
}

/**
 * DialogTitle - Title component for the dialog
 */
function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("", className)}
      {...props}
    />
  );
}

/**
 * DialogDescription - Description component for the dialog
 */
function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
