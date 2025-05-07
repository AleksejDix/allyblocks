import React, { useState, createContext, useContext } from "react";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/molecules/DropdownMenu";

import type { ActionMenuRootProps } from "./ActionMenu.types";

// Context to share state across the compound component
type PendingAction = {
  callback?: (e: Event) => void;
  value?: string;
  context?: Record<string, unknown>;
  event: Event;
} | null;

type ActionMenuContextType = {
  pendingAction: PendingAction;
  setPendingAction: React.Dispatch<React.SetStateAction<PendingAction>>;
  onValueChange?: (
    value: string,
    event: Event,
    context?: Record<string, unknown>
  ) => void;
};

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
export function ActionMenu({
  children,
  className,
  onValueChange,
}: ActionMenuRootProps) {
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  return (
    <ActionMenuContext.Provider
      value={{ pendingAction, setPendingAction, onValueChange }}
    >
      <DropdownMenu>
        <div className={cn("inline-flex", className)}>{children}</div>
      </DropdownMenu>
    </ActionMenuContext.Provider>
  );
}

/**
 * ActionMenuTrigger - The button that toggles the dropdown
 */
export function ActionMenuTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
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
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuContent>) {
  const { pendingAction, setPendingAction, onValueChange } = useActionMenu();

  return (
    <DropdownMenuContent
      className={className}
      align={align}
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
  value,
  context,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuItem> & {
  action?: (e: Event) => void;
  value?: string;
  context?: Record<string, unknown>;
}) {
  const { setPendingAction } = useActionMenu();

  // Handle the selection
  const handleSelect = (event: Event) => {
    // If a value is provided or there's a local action, use the pending action mechanism
    if (value || action) {
      setPendingAction({
        callback: action,
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
