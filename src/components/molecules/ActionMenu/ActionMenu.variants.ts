import { cva } from "class-variance-authority";

/**
 * ActionMenu component styling using class-variance-authority
 */
export const actionMenuVariants = cva(
  // Base styles that apply to all variants
  [],
  {
    variants: {
      variant: {
        default: "",
        outline: "",
        secondary: "",
        ghost: "",
        destructive: "",
      },
      size: {
        default: "",
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
