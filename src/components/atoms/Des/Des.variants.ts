import { cva } from "class-variance-authority";

export const desVariants = cva(
  "text-foreground grid grid-cols-8",
  {
    variants: {
      variant: {
        default: "",
        divided: "[&>dt+dd]:border-t [&>dt]:border-t [&>dt:first-of-type]:border-t-0 [&>dd]:border-t [&>dd:nth-of-type(1)]:border-t-0 border-border",
        striped: "[&>dt:nth-of-type(odd)]:bg-muted [&>dd:nth-of-type(odd)]:bg-muted [&>*]:px-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
); 