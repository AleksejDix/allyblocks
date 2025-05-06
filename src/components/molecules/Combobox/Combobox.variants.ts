import { cva } from "class-variance-authority";

export const comboboxTriggerVariants = cva(
  [
    "flex",
    "h-10",
    "w-full",
    "items-center",
    "justify-between",
    "rounded-md",
    "border",
    "border-input",
    "bg-background",
    "px-3",
    "py-2",
    "text-sm",
    "ring-offset-background",
    "placeholder:text-muted-foreground",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-ring",
    "focus:ring-offset-2",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
    "aria-[invalid=true]:border-destructive",
  ],
  {
    variants: {
      variant: {
        default: [],
        outline: [
          "border-border",
          "hover:bg-accent",
          "hover:text-accent-foreground",
        ],
        ghost: [
          "border-transparent",
          "hover:bg-accent",
          "hover:text-accent-foreground",
        ],
      },
      size: {
        default: ["h-10", "px-4", "py-2"],
        sm: ["h-9", "rounded-md", "px-3"],
        lg: ["h-11", "rounded-md", "px-8"],
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  }
);

export const comboboxContentVariants = cva(
  [
    "relative",
    "z-50",
    "max-h-96",
    "min-w-[8rem]",
    "overflow-hidden",
    "rounded-md",
    "border",
    "border-border",
    "bg-popover",
    "text-popover-foreground",
    "shadow-md",
    "animate-in",
    "fade-in-0",
    "zoom-in-95",
    "data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0",
    "data-[state=closed]:zoom-out-95",
    "data-[side=bottom]:slide-in-from-top-2",
    "data-[side=left]:slide-in-from-right-2",
    "data-[side=right]:slide-in-from-left-2",
    "data-[side=top]:slide-in-from-bottom-2",
    "[&_[cmdk-item]::before]:!hidden",
    "[&_[cmdk-item]::after]:!hidden",
    "[&_[cmdk-item-prefix]]:!hidden",
    "[&_[cmdk-item-suffix]]:!hidden",
  ],
  {
    variants: {
      width: {
        auto: ["min-w-[8rem]"],
        trigger: ["w-full"],
      },
    },
    defaultVariants: {
      width: "trigger",
    },
  }
);

export const comboboxInputVariants = cva(
  [
    "flex",
    "w-full",
    "bg-transparent",
    "text-sm",
    "outline-none",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
    "placeholder:text-muted-foreground",
  ],
  {
    variants: {
      size: {
        sm: ["h-9", "px-0", "py-1"],
        default: ["h-10", "px-2", "py-2"],
        lg: ["h-11", "px-5", "py-3"],
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export const comboboxEmptyVariants = cva(
  [
    "py-6",
    "text-center",
    "text-sm",
    "text-muted-foreground",
  ]
);

export const comboboxItemVariants = cva(
  [
    "relative",
    "flex",
    "cursor-default",
    "select-none",
    "items-center",
    "rounded-sm",
    "px-2",
    "py-1.5",
    "text-sm",
    "outline-none",
    "data-[disabled]:pointer-events-none",
    "data-[disabled]:opacity-50",
    "aria-selected:bg-accent",
    "aria-selected:text-accent-foreground",
    "[&_[cmdk-item-prefix]]:!hidden",
    "[&_[cmdk-item-suffix]]:!hidden",
    "[&::before]:!hidden",
    "[&::after]:!hidden",
  ],
  {
    variants: {
      withDescription: {
        true: ["h-auto", "min-h-[3rem]", "justify-start", "gap-2"],
        false: ["h-10", "justify-between", "gap-1"],
      },
    },
    defaultVariants: {
      withDescription: false,
    },
  }
);

export const comboboxGroupVariants = cva(
  [
    "overflow-hidden",
    "[&_[cmdk-group-heading]]:text-xs",
    "[&_[cmdk-group-heading]]:font-medium",
    "[&_[cmdk-group-heading]]:text-muted-foreground",
  ]
);

export const comboboxDescriptionVariants = cva(
  [
    "text-xs",
    "text-muted-foreground",
  ]
); 