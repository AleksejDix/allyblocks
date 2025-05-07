import { cva } from "class-variance-authority";

export const ActionSplitMenuVariants = cva("inline-flex", {
  variants: {
    variant: {
      default: "",
      outline: "",
      destructive: "",
      ghost: "",
      link: "",
    },
    size: {
      default: "",
      sm: "",
      lg: "",
      icon: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
