import { cva } from "class-variance-authority";

/**
 * ButtonGroup component styling using class-variance-authority
 */
export const buttonGroupVariants = cva(
  // Base styles that apply to all variants
  ["inline-flex", "gap-2"],
  {
    variants: {
      direction: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      direction: "horizontal",
    },
  }
);
