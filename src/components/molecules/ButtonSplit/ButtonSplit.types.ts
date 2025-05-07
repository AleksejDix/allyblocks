import type { ReactNode } from "react";

import type { VariantProps } from "class-variance-authority";
import { buttonSplitVariants } from "./ButtonSplit.variants";

/**
 * Props for the ButtonSplit component
 *
 * ButtonSplit provides a grouped button interface with two buttons side by side,
 * typically used for primary/secondary actions or main action with dropdown.
 */
export type ButtonSplitProps = {
  /**
   * The content of the ButtonSplit (typically Button components)
   */
  children: ReactNode;

  /**
   * Additional CSS classes to apply to the ButtonSplit container
   */
  className?: string;
} & VariantProps<typeof buttonSplitVariants>;
