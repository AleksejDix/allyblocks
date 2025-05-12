import { createActionContext, createActionHook } from "@/lib/useAction";
import type { ActionMenuContextData } from "./ActionMenu.types";

/**
 * Context for sharing ActionMenu state across components
 */
export const ActionMenuContext = createActionContext<ActionMenuContextData>();

/**
 * Hook to use the actionMenu context
 */
export const useActionMenu = createActionHook<ActionMenuContextData>(
  ActionMenuContext,
  "useActionMenu"
);
