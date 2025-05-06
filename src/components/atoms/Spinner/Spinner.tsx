import * as React from "react";
import { Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      default: "h-4 w-4",
      sm: "h-3 w-3",
      lg: "h-6 w-6",
      xl: "h-8 w-8",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  icon?: React.ReactNode;
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, icon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        {icon || <Loader2 className={cn(spinnerVariants({ size }))} />}
        {children && (
          <span className="text-sm text-muted-foreground">{children}</span>
        )}
      </div>
    );
  },
);

Spinner.displayName = "Spinner";

export { Spinner };
