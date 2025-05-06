import { cva } from "class-variance-authority";

export const selectNativeVariants = cva(
  [
    "border-input text-foreground focus-visible:border-ring focus-visible:ring-ring/50",
    "has-[option[disabled]:checked]:text-muted-foreground",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    "inline-flex cursor-pointer appearance-none items-center rounded-md border shadow-xs",
    "transition-[color,box-shadow] outline-none focus-visible:ring-[3px]",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "dark:bg-input/30 dark:hover:bg-input/50"
  ],
  {
    variants: {
      variant: {
        default: "bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "border-none shadow-none hover:bg-accent hover:text-accent-foreground",
      },
      sizeVariant: {
        sm: "h-8 ps-2 pe-7 text-xs",
        md: "h-9 ps-3 pe-8 text-sm",
        lg: "h-10 ps-4 pe-9 text-base",
      },
      width: {
        auto: "w-fit",
        full: "w-full",
      },
      // Multiple is handled separately in the component
      multiple: {
        true: "",
        false: "",
      }
    },
    defaultVariants: {
      variant: "default",
      sizeVariant: "md",
      width: "auto",
      multiple: false,
    },
  }
); 