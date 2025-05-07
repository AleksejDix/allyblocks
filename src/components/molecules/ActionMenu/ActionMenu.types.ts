import type { ReactNode } from "react";
import type { Dispatch, SetStateAction, ComponentPropsWithoutRef } from "react";
import type {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/molecules/DropdownMenu";

/**
 * Internal type for tracking pending actions
 */
export type PendingAction = {
  callback?: (e: Event) => void;
  value?: string;
  context?: Record<string, unknown>;
  event: Event;
} | null;

/**
 * Context type for the ActionMenu
 */
export type ActionMenuContextType = {
  pendingAction: PendingAction;
  setPendingAction: Dispatch<SetStateAction<PendingAction>>;
  onValueChange?: (
    value: string,
    event: Event,
    context?: Record<string, unknown>
  ) => void;
};

/**
 * Common props for ActionMenu components
 */
export type ActionMenuProps = {
  /**
   * Optional custom class name
   */
  className?: string;
};

/**
 * Props for the ActionMenu component
 */
export type ActionMenuRootProps = ActionMenuProps & {
  /**
   * Children content
   */
  children: ReactNode;

  /**
   * Callback fired when any action in the menu is executed
   * This allows for centralized handling of all menu actions
   */
  onValueChange?: (
    value: string,
    event: Event,
    context?: Record<string, unknown>
  ) => void;
};

/**
 * Props for ActionMenuTrigger component
 */
export type ActionMenuTriggerProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Props for ActionMenuContent component
 */
export type ActionMenuContentProps = ComponentPropsWithoutRef<
  typeof DropdownMenuContent
>;

/**
 * Props for ActionMenuItem component
 */
export type ActionMenuItemProps = ComponentPropsWithoutRef<
  typeof DropdownMenuItem
> & {
  action?: (e: Event) => void;
  onAction?: (e: Event) => void;
  value?: string;
  context?: Record<string, unknown>;
};

/**
 * Props for ActionMenuGroup component
 */
export type ActionMenuGroupProps = ComponentPropsWithoutRef<
  typeof DropdownMenuGroup
>;

/**
 * Props for ActionMenuLabel component
 */
export type ActionMenuLabelProps = ComponentPropsWithoutRef<
  typeof DropdownMenuLabel
>;

/**
 * Props for ActionMenuSeparator component
 */
export type ActionMenuSeparatorProps = ComponentPropsWithoutRef<
  typeof DropdownMenuSeparator
>;

/**
 * Props for ActionMenuCheckboxItem component
 */
export type ActionMenuCheckboxItemProps = ComponentPropsWithoutRef<
  typeof DropdownMenuCheckboxItem
> & {
  action?: (checked: boolean, e: Event) => void;
  onAction?: (checked: boolean, e: Event) => void;
  value?: string;
  context?: Record<string, unknown>;
};

/**
 * Props for ActionMenuRadioGroup component
 */
export type ActionMenuRadioGroupProps = ComponentPropsWithoutRef<
  typeof DropdownMenuRadioGroup
>;

/**
 * Props for ActionMenuRadioItem component
 */
export type ActionMenuRadioItemProps = ComponentPropsWithoutRef<
  typeof DropdownMenuRadioItem
> & {
  action?: (e: Event) => void;
  onAction?: (e: Event) => void;
  value?: string; // Action value (different from radio value)
  context?: Record<string, unknown>;
};
