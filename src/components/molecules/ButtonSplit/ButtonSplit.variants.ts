import { cva } from "class-variance-authority";

/**
 * ButtonSplit component styling using class-variance-authority
 */
export const buttonSplitVariants = cva(
  // Base styles that apply to all variants
  [
    "grid grid-cols-2",
    "[&>button]:rounded-none",
    "[&>button]:shadow-none",
    "[&>button:focus-visible]:z-20",
    "divide-x",
    "[&>button:first-child]:rounded-s-md",
    "[&>button:last-child]:rounded-e-md",
    "inline-flex rounded-md shadow-xs rtl:space-x-reverse",
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

export type ButtonSplitVariants = typeof buttonSplitVariants;
