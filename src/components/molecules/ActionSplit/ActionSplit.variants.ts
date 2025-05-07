import { cva } from "class-variance-authority";

/**
 * ActionSplit component styling using class-variance-authority
 */
export const ActionSplitVariants = cva(
  // Base styles that apply to all variants
  [
    "grid grid-cols-2",
    "[&>*]:rounded-none",
    "[&>*]:shadow-none",
    "[&>*:focus-visible]:z-20",
    "divide-x",
    "[&>*:first-child]:rounded-s-md",
    "[&>*:last-child]:rounded-e-md",
    "inline-flex rounded-md rtl:space-x-reverse",
  ],
  {
    variants: {
      variant: {
        default: ["divide-white"],
        secondary: ["divide-border"],
        outline: ["divide-border", "-space-x-[1px]"],
        destructive: ["divide-border-destructive"],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type ActionSplitVariants = typeof ActionSplitVariants;
