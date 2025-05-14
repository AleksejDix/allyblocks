import { cva } from "class-variance-authority";

export const accordionVariants = cva(
  "rounded transition-all focus-within:outline-none",
  {
    variants: {
      variant: {
        default: "",
        divided: "divide-y divide-input",
        bordered: "border divide-y divide-input",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const accordionItemVariants = cva("overflow-hidden group", {
  variants: {
    variant: {
      default: "",
      divided: "",
      bordered: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const accordionTriggerVariants = cva(
  "w-full max-w-full flex items-center gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring px-3 py-2",
  {
    variants: {
      variant: {
        default: "hover:bg-accent/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const accordionBodyVariants = cva(
  "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
  {
    variants: {
      variant: {
        default: "py-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
