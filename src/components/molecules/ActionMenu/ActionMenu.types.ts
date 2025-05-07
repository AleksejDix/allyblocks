import type { ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import { actionMenuVariants } from "./ActionMenu.variants";

/**
 * Event object for action handlers
 */
export type ActionEvent = {
  /**
   * Type identifier for the action
   */
  type: string;

  /**
   * Original event that triggered the action
   */
  event: Event | React.SyntheticEvent;

  /**
   * Optional payload data for the action
   */
  payload?: Record<string, unknown>;
};

/**
 * Action object configuration
 */
export type Action = {
  /**
   * Label text for the action
   */
  label: string;

  /**
   * Type identifier for the action
   */
  type: string;

  /**
   * Optional props to pass to the menu item
   */
  props?: Record<string, unknown> & { disabled?: boolean };

  /**
   * Content to render before the label
   */
  before?: ReactNode;

  /**
   * Content to render after the label
   */
  after?: ReactNode;

  /**
   * Optional payload data for the action
   */
  payload?: Record<string, unknown>;
};

/**
 * Common props for ActionMenu components
 */
export type ActionMenuProps = VariantProps<typeof actionMenuVariants> & {
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
