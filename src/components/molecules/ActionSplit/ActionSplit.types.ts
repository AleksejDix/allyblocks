import type { ReactNode } from "react";

import type { VariantProps } from "class-variance-authority";
import { ActionSplitVariants } from "./ActionSplit.variants";

/**
 * Props for the ActionSplit component
 *
 * ActionSplit provides a grouped button interface with two buttons side by side,
 * typically used for primary/secondary actions or main action with dropdown.
 */
export type ActionSplitProps = {
  /**
   * The content of the ActionSplit (typically Button components)
   */
  children: ReactNode;

  /**
   * Additional CSS classes to apply to the ActionSplit container
   */
  className?: string;
} & VariantProps<typeof ActionSplitVariants>;
