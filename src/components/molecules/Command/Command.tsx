import React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/molecules/Dialog";
import { Icon } from "@/components/atoms/Icon";

import {
  type CommandProps,
  type CommandDialogProps,
  type CommandInputProps,
  type CommandListProps,
  type CommandEmptyProps,
  type CommandGroupProps,
  type CommandSeparatorProps,
  type CommandItemProps,
  type CommandShortcutProps,
} from "./Command.types";

import {
  commandVariants,
  commandInputVariants,
  commandInputWrapperVariants,
  commandListVariants,
  commandEmptyVariants,
  commandGroupVariants,
  commandSeparatorVariants,
  commandItemVariants,
  commandShortcutVariants,
} from "./Command.variants";

function Command({ className, size, ...props }: CommandProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // Let original handler run if present
    if (props.onKeyDown) {
      props.onKeyDown(event);
    }

    // If Enter is pressed, find the selected item and trigger its onSelect
    if (event.key === "Enter") {
      const selectedItem = document.querySelector(
        '[cmdk-item][data-selected="true"]'
      );
      if (selectedItem) {
        // Simulate a click on the selected item
        (selectedItem as HTMLElement).click();
      }
    }
  };

  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(commandVariants({ size, className }))}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  ...props
}: CommandDialogProps) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent className="overflow-hidden p-0">
        <Command>{children}</Command>
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({
  className,
  variant,
  inputSize,
  // Destructure size to prevent conflict with HTML input size attribute
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  size,
  ...props
}: CommandInputProps & {
  variant?: "default" | "subtle";
  inputSize?: "default" | "sm" | "lg";
}) {
  return (
    <div
      data-slot="command-input-wrapper"
      className={cn(commandInputWrapperVariants({ size: inputSize }))}
    >
      <Icon name="search" size={16} className="shrink-0" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(commandInputVariants({ variant, className }))}
        {...props}
      />
    </div>
  );
}

function CommandList({
  className,
  maxHeight,
  ...props
}: CommandListProps & { maxHeight?: "default" | "sm" | "lg" | "xl" }) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(commandListVariants({ maxHeight, className }))}
      {...props}
    />
  );
}

function CommandEmpty({ className, ...props }: CommandEmptyProps) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn(commandEmptyVariants(), className)}
      {...props}
    />
  );
}

function CommandGroup({ className, ...props }: CommandGroupProps) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(commandGroupVariants(), className)}
      {...props}
    />
  );
}

function CommandSeparator({ className, ...props }: CommandSeparatorProps) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn(commandSeparatorVariants(), className)}
      {...props}
    />
  );
}

function CommandItem({
  className,
  variant,
  value,
  children,
  onSelect,
  ...props
}: CommandItemProps & {
  variant?: "default" | "destructive";
}) {
  // If no explicit value is provided, use children string as value
  const itemValue =
    value || (typeof children === "string" ? children : undefined);

  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        commandItemVariants({ variant, className }),
        "cursor-pointer" // Ensure cursor shows as pointer
      )}
      value={itemValue}
      onSelect={onSelect}
      {...props}
    >
      {children}
    </CommandPrimitive.Item>
  );
}

function CommandShortcut({ className, ...props }: CommandShortcutProps) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(commandShortcutVariants(), className)}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
