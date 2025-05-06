import { cva } from "class-variance-authority";

export const commandVariants = cva(
  [
    "bg-popover",
    "text-popover-foreground",
    "flex",
    "flex-col",
    "overflow-hidden",
    "outline-none",
  ],
  {
    variants: {
      size: {
        default: ["w-full"],
        sm: ["w-[300px]"],
        md: ["w-[400px]"],
        lg: ["w-[500px]"],
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export const commandInputWrapperVariants = cva(
  [
    "flex",
    "items-center",
    "px-3",
    "py-2",
    "border-b",
    "border-border",
  ],
  {
    variants: {
      size: {
        default: ["h-9"],
        sm: ["h-9"],
        lg: ["h-11"],
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export const commandInputVariants = cva(
  [
    "placeholder:text-muted-foreground",
    "flex",
    "w-full",
    "bg-transparent",
    "text-sm",
    "outline-none",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: [],
        subtle: ["bg-accent/20"],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const commandListVariants = cva(
  [
    "max-h-[300px]",
    "overflow-y-auto",
    "overflow-x-hidden",
  ],
  {
    variants: {
      maxHeight: {
        default: ["max-h-[300px]"],
        sm: ["max-h-[200px]"],
        lg: ["max-h-[400px]"],
        xl: ["max-h-[500px]"],
      },
    },
    defaultVariants: {
      maxHeight: "default",
    },
  }
);

export const commandEmptyVariants = cva(
  [
    "py-6",
    "text-center",
    "text-sm",
    "text-muted-foreground",
  ]
);

export const commandGroupVariants = cva(
  [
    "text-foreground",
    "overflow-hidden",
    "p-1",
    "[&_[cmdk-group-heading]]:px-2",
    "[&_[cmdk-group-heading]]:py-1.5",
    "[&_[cmdk-group-heading]]:text-xs",
    "[&_[cmdk-group-heading]]:font-medium",
    "[&_[cmdk-group-heading]]:text-muted-foreground",
  ]
);

export const commandSeparatorVariants = cva(
  [
    "bg-border",
    "-mx-1",
    "h-px",
    "my-1",
  ]
);

export const commandItemVariants = cva(
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
    "aria-selected:bg-accent",
    "aria-selected:text-accent-foreground",
    "data-[disabled]:pointer-events-none",
    "data-[disabled]:opacity-50",
    "gap-2",
  ],
  {
    variants: {
      variant: {
        default: [],
        destructive: ["text-destructive", "aria-selected:bg-destructive/10"],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const commandShortcutVariants = cva(
  [
    "ml-auto",
    "text-xs",
    "tracking-widest",
    "text-muted-foreground",
  ]
); 