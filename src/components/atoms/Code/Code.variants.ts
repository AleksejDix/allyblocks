import { cva } from "class-variance-authority";

export const codeVariants = cva(
  "rounded-md inline-block font-mono text-sm",
  {
    variants: {
      variant: {
        default: "bg-muted px-2 py-1",
        inline: "bg-muted px-1.5 py-0.5",
        outline: "border border-border px-2 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
); 