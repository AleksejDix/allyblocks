import { cva } from "class-variance-authority";

/**
 * ActionGroup component styling using class-variance-authority
 */
export const ActionGroupVariants = cva(
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
