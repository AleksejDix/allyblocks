import { cva } from "class-variance-authority";

export const iconVariants = cva("flex items-center justify-center", {
  variants: {
    size: {
      12: "size-3", // 12px
      16: "size-4", // 16px
      20: "size-5", // 20px
      24: "size-6", // 24px
      32: "size-8", // 32px
      40: "size-10", // 40px
      48: "size-12", // 48px
    },
  },
  defaultVariants: {
    size: 16,
  },
});
