import { cva } from "class-variance-authority";

export const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden",
  {
    variants: {
      size: {
        sm: "size-6",
        md: "size-8",
        lg: "size-10",
        xl: "size-12",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-md",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
    },
  },
);

export const avatarImageVariants = cva(
  "aspect-square size-full"
);

export const avatarFallbackVariants = cva(
  "absolute inset-0 flex items-center justify-center bg-muted",
); 