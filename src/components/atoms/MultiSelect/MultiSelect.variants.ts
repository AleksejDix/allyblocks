import { cva } from "class-variance-authority";

export const multiSelectTriggerVariants = cva(
  [
    "inline-flex items-center justify-between gap-2 rounded-md text-sm font-medium",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    "transition-colors",
    "whitespace-nowrap",
    "border-input border bg-transparent shadow-xs",
    "dark:bg-input/30 dark:hover:bg-input/50",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
        ],
        ghost: [
          "border-transparent hover:bg-accent hover:text-accent-foreground",
        ]
      },
      size: {
        sm: "h-8 px-4 text-xs",
        md: "h-9 px-4 text-sm",
        lg: "h-10 px-6 text-base",
      },
      width: {
        auto: "w-fit",
        full: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      width: "auto",
    },
  }
);

export const multiSelectContentVariants = cva(
  [
    "bg-popover text-popover-foreground z-50 min-w-[8rem] overflow-hidden rounded-md border shadow-lg",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
    "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  ],
  {
    variants: {
      width: {
        auto: "",
        trigger: "w-[var(--radix-dropdown-menu-trigger-width)]",
      },
    },
    defaultVariants: {
      width: "auto",
    },
  }
);

export const multiSelectItemVariants = cva(
  [
    "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
    "focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none",
    "data-[disabled]:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
); 