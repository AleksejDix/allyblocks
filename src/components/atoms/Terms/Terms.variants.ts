import { cva } from "class-variance-authority";

export const termsVariants = cva("text-foreground md:grid md:grid-cols-8", {
  variants: {
    variant: {
      default: "[&>dt+dd]:pt-0 md:[&>dt+dd]:py-2 [&>dt]:pt-2 [&>dd]:py-2",
      divided:
        "[&>dt+dd]:pt-0 md:[&>dt+dd]:py-2 [&>dt]:pt-2 [&>dd]:py-2 [&>dt+dd]:border-t-0 md:[&>dt+dd]:border-t [&>dt]:border-t md:[&>dd]:border-t-0 md:[&>dt:first-of-type]:border-t-0 [&>dd]:border-t [&>dd:nth-of-type(1)]:border-t-0 border-border",
      striped:
        "[&>dt+dd]:pt-0 md:[&>dt+dd]:py-2 [&>dt]:pt-2 [&>dd]:py-2 [&>dt:nth-of-type(odd)]:bg-muted [&>dd:nth-of-type(odd)]:bg-muted [&>*]:px-3",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
