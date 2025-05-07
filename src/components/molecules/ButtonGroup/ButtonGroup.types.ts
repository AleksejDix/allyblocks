import type { ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import { buttonGroupVariants } from "./ButtonGroup.variants";

/**
 * Props for the ButtonGroup component
 *
 * ButtonGroup provides a container to group related buttons together
 * with consistent spacing and optional direction control.
 *
 * For styling customization, use the className prop with Tailwind classes:
 * - Use justify-* classes for alignment (justify-start, justify-center, justify-end, etc.)
 * - Use gap-* classes for custom spacing (gap-1, gap-2, gap-4, etc.)
 * - Use w-full for full width
 */
export type ButtonGroupProps = VariantProps<typeof buttonGroupVariants> & {
  /**
   * The buttons to be rendered within the group
   * Typically Button components, but can be any React nodes
   */
  children: ReactNode;

  /**
   * Additional CSS classes to apply to the ButtonGroup
   *
   * Use Tailwind utility classes for custom styling:
   * - Alignment: justify-start, justify-center, justify-end, justify-between
   * - Spacing: gap-1, gap-2, gap-4, etc.
   * - Width: w-full, w-auto
   */
  className?: string;
};
