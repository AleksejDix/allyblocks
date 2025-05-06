import { cva } from "class-variance-authority";

export const inputVariants = cva(
  [
    "md:text-sm selection:bg-primary selection:text-primary-foreground",
    "dark:bg-input/30 inline-flex h-9 w-max min-w-0 rounded-md bg-background px-3 py-1 text-base",
    "border border-input outline-1 outline-zinc-950/5 transition-[color,outline]",
    "ring-offset-background",
    "placeholder:text-muted-foreground",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:text-muted-foreground disabled:bg-muted-background",
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    "[aria-invalid=true]:outline-destructive/10 [aria-invalid=true]:border-destructive [aria-invalid=true]:bg-destructive/5 [aria-invalid=true]:text-destructive",
    "[aria-invalid=true]:focus-visible:ring-2 [aria-invalid=true]:focus-visible:ring-destructive/50 [aria-invalid=true]:focus-visible:ring-offset-2 [aria-invalid=true]:focus-visible:ring-opacity-100",
    "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
    "bg-background",
  ],
  {
    variants: {
      size: {
        sm: "h-8 px-2 text-xs",
        md: "h-9 px-3 text-sm",
        lg: "h-10 px-4 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);
