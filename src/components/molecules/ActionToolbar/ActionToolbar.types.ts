import type { ButtonProps } from "@/components/atoms/Button";
import type {
  ActionContextType,
  ActionTriggerProps,
  ActionProviderProps,
} from "@/lib/useAction";

/**
 * Type for actiontoolbar-specific context
 */
export type ActionToolbarContext = Record<string, unknown>;

/**
 * Context type for the ActionToolbar using shared action mechanism
 */
export type ActionToolbarContextType = ActionContextType<ActionToolbarContext>;

/**
 * Common props for ActionToolbar components
 */
export type ActionToolbarProps = {
  /**
   * Optional custom class name
   */
  className?: string;
};

/**
 * Props for the ActionToolbar component
 */
export type ActionToolbarRootProps = ActionToolbarProps &
  ActionProviderProps<ActionToolbarContext>;

/**
 * Props for ActionToolbarButton component
 */
export type ActionToolbarButtonProps = ButtonProps &
  ActionTriggerProps<ActionToolbarContext>;
