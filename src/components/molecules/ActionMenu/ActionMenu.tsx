"use client";

import { useState, createContext, useContext } from "react";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/molecules/DropdownMenu";

import type {
  ActionMenuRootProps,
  ActionMenuTriggerProps,
  ActionMenuContentProps,
  ActionMenuItemProps,
  ActionMenuGroupProps,
  ActionMenuLabelProps,
  ActionMenuSeparatorProps,
  ActionMenuCheckboxItemProps,
  ActionMenuRadioGroupProps,
  ActionMenuRadioItemProps,
  PendingAction,
  ActionMenuContextType,
} from "./ActionMenu.types";

const ActionMenuContext = createContext<ActionMenuContextType | undefined>(
  undefined
);

// Hook to use the context
const useActionMenu = () => {
  const context = useContext(ActionMenuContext);
  if (context === undefined) {
    throw new Error("useActionMenu must be used within an ActionMenu");
  }
  return context;
};

/**
 * ActionMenu - Root component for the menu system
 */
export function ActionMenu({ children, onValueChange }: ActionMenuRootProps) {
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  return (
    <ActionMenuContext.Provider
      value={{ pendingAction, setPendingAction, onValueChange }}
    >
      <DropdownMenu>{children}</DropdownMenu>
    </ActionMenuContext.Provider>
  );
}

/**
 * ActionMenuTrigger - The button that toggles the dropdown
 */
export function ActionMenuTrigger({
  children,
  className,
}: ActionMenuTriggerProps) {
  return (
    <DropdownMenuTrigger asChild className={className}>
      {children}
    </DropdownMenuTrigger>
  );
}

/**
 * ActionMenuContent - The dropdown content container
 */
export function ActionMenuContent({
  children,
  className,
  align = "end",
  collisionPadding = 16,
  ...props
}: ActionMenuContentProps) {
  const { pendingAction, setPendingAction, onValueChange } = useActionMenu();

  return (
    <DropdownMenuContent
      className={className}
      align={align}
      collisionPadding={collisionPadding}
      onAnimationEnd={() => {
        if (pendingAction) {
          // Execute the item-specific action if provided
          if (pendingAction.callback) {
            pendingAction.callback(pendingAction.event);
          }

          // Also call the menu-level onValueChange if provided and value exists
          if (onValueChange && pendingAction.value) {
            onValueChange(
              pendingAction.value,
              pendingAction.event,
              pendingAction.context
            );
          }

          setPendingAction(null);
        }
      }}
      {...props}
    >
      {children}
    </DropdownMenuContent>
  );
}

/**
 * ActionMenuItem - Individual menu item that triggers an action
 */
export function ActionMenuItem({
  children,
  className,
  onSelect,
  action,
  onAction,
  value,
  context,
  ...props
}: ActionMenuItemProps) {
  const { setPendingAction } = useActionMenu();

  // Handle the selection
  const handleSelect = (event: Event) => {
    // Support both action and onAction for backward compatibility
    const actionHandler = onAction || action;

    // If a value is provided or there's a local action, use the pending action mechanism
    if (value || actionHandler) {
      setPendingAction({
        callback: actionHandler,
        value,
        context,
        event,
      });
    } else if (onSelect) {
      // Support traditional onSelect for backward compatibility
      onSelect(event);
    }
  };

  return (
    <DropdownMenuItem
      className={cn("flex items-center", className)}
      onSelect={handleSelect}
      {...props}
    >
      {children}
    </DropdownMenuItem>
  );
}

/**
 * ActionMenuGroup - Logical grouping of related menu items
 */
export function ActionMenuGroup({
  children,
  className,
  ...props
}: ActionMenuGroupProps) {
  return (
    <DropdownMenuGroup className={cn(className)} {...props}>
      {children}
    </DropdownMenuGroup>
  );
}

/**
 * ActionMenuLabel - Non-interactive label within the menu
 */
export function ActionMenuLabel({
  children,
  className,
  ...props
}: ActionMenuLabelProps) {
  return (
    <DropdownMenuLabel className={cn(className)} {...props}>
      {children}
    </DropdownMenuLabel>
  );
}

/**
 * ActionMenuSeparator - Visual separator between menu items
 */
export function ActionMenuSeparator({
  className,
  ...props
}: ActionMenuSeparatorProps) {
  return <DropdownMenuSeparator className={cn(className)} {...props} />;
}

/**
 * ActionMenuCheckboxItem - Menu item with checkbox functionality
 */
export function ActionMenuCheckboxItem({
  children,
  className,
  checked,
  onCheckedChange,
  action,
  onAction,
  value,
  context,
  ...props
}: ActionMenuCheckboxItemProps) {
  const { setPendingAction } = useActionMenu();

  const handleCheckedChange = (checked: boolean) => {
    if (onCheckedChange) {
      onCheckedChange(checked);
    }
  };

  const handleSelect = (event: Event) => {
    const newChecked = !checked;

    // Support both action and onAction for backward compatibility
    const actionHandler = onAction || action;

    // Schedule the action to run after animation
    setPendingAction({
      callback: actionHandler ? (e) => actionHandler(newChecked, e) : undefined,
      value,
      // Include the new checked state in the context
      context: { ...context, checked: newChecked },
      event,
    });

    // Update the checked state through the original handler
    handleCheckedChange(newChecked);
  };

  return (
    <DropdownMenuCheckboxItem
      className={cn("flex items-center", className)}
      checked={checked}
      // Use the original onCheckedChange for controlled behavior
      onCheckedChange={handleCheckedChange}
      // But intercept the selection to handle actions
      onSelect={handleSelect}
      {...props}
    >
      {children}
    </DropdownMenuCheckboxItem>
  );
}

/**
 * ActionMenuRadioGroup - Container for radio items
 */
export function ActionMenuRadioGroup({
  children,
  className,
  value,
  onValueChange: onRadioValueChange,
  ...props
}: ActionMenuRadioGroupProps) {
  return (
    <DropdownMenuRadioGroup
      className={cn(className)}
      value={value}
      onValueChange={onRadioValueChange}
      {...props}
    >
      {children}
    </DropdownMenuRadioGroup>
  );
}

/**
 * ActionMenuRadioItem - Menu item with radio selection functionality
 */
export function ActionMenuRadioItem({
  children,
  className,
  value: radioValue,
  action,
  onAction,
  value, // Action value, different from radio value
  context,
  ...props
}: ActionMenuRadioItemProps) {
  const { setPendingAction } = useActionMenu();

  const handleSelect = (event: Event) => {
    // Support both action and onAction for backward compatibility
    const actionHandler = onAction || action;

    // Schedule the action to run after animation
    if (actionHandler || value) {
      setPendingAction({
        callback: actionHandler,
        value: value, // Use the action value if provided
        // Include the radio value in the context
        context: { ...context, radioValue },
        event,
      });
    }
  };

  return (
    <DropdownMenuRadioItem
      className={cn("flex items-center", className)}
      value={radioValue}
      onSelect={handleSelect}
      {...props}
    >
      {children}
    </DropdownMenuRadioItem>
  );
}
