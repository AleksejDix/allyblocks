"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";

/**
 * Type for representing an action
 */
export type Action<ContextType = Record<string, unknown>> = {
  callback?: (e: Event) => void;
  value?: string;
  context?: ContextType;
  event: Event;
} | null;

/**
 * Generic context type for components with action support
 */
export type ActionContextType<ContextType = Record<string, unknown>> = {
  action: Action<ContextType>;
  setAction: Dispatch<SetStateAction<Action<ContextType>>>;
  onValueChange?: (value: string, event: Event, context?: ContextType) => void;
};

/**
 * Function to create a context for action-based components
 */
export function createActionContext<ContextType = Record<string, unknown>>() {
  return createContext<ActionContextType<ContextType> | undefined>(undefined);
}

/**
 * Props for components with action support
 */
export type ActionProviderProps<ContextType = Record<string, unknown>> = {
  children: ReactNode;
  onValueChange?: (value: string, event: Event, context?: ContextType) => void;
};

/**
 * Hook to create action state and provider
 */
export function useActionProvider<ContextType = Record<string, unknown>>() {
  const [action, setAction] = useState<Action<ContextType>>(null);

  return {
    action,
    setAction,
  };
}

/**
 * Props for components that can trigger actions
 */
export type ActionTriggerProps<ContextType = Record<string, unknown>> = {
  onAction?: (e: Event) => void;
  value?: string;
  context?: ContextType;
};

/**
 * Hook to process action after animation
 */
export function useActionHandler<ContextType = Record<string, unknown>>({
  action,
  setAction,
  onValueChange,
}: ActionContextType<ContextType>) {
  return () => {
    if (action) {
      // Execute the item-specific action if provided
      if (action.callback) {
        action.callback(action.event);
      }

      // Also call the component-level onValueChange if provided and value exists
      if (onValueChange && action.value) {
        onValueChange(action.value, action.event, action.context);
      }

      setAction(null);
    }
  };
}

export function createActionHook<ContextType = Record<string, unknown>>(
  context: React.Context<ActionContextType<ContextType> | undefined>,
  hookName: string
) {
  return () => {
    const actionContext = useContext(context);
    if (actionContext === undefined) {
      throw new Error(`${hookName} must be used within its Provider`);
    }
    return actionContext;
  };
}
