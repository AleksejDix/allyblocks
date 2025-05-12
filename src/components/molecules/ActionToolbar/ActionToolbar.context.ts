import { createActionContext, createActionHook } from "@/lib/useAction";
import type { ActionToolbarContext } from "./ActionToolbar.types";

/**
 * Context for sharing ActionToolbar state across components
 */
export const ActionToolbarContext = createActionContext<ActionToolbarContext>();

/**
 * Hook to use the ActionToolbar context
 */
export const useActionToolbar = createActionHook<ActionToolbarContext>(
  ActionToolbarContext,
  "useActionToolbar"
);
