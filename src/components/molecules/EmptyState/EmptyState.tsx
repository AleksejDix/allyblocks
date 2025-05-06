import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const emptyStateVariants = cva(
  "flex flex-col items-center justify-center p-6 text-center space-y-4 rounded-lg",
  {
    variants: {
      variant: {
        default: "bg-background border",
        card: "bg-card text-card-foreground border shadow-sm",
        destructive: "bg-destructive/10 text-destructive border-destructive/20",
      },
      size: {
        default: "min-h-[200px] p-6",
        sm: "min-h-[150px] p-4",
        lg: "min-h-[300px] p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function EmptyState({
  className,
  variant,
  size,
  role = "region",
  "aria-live": ariaLive = "polite",
  ...props
}: React.ComponentProps<"section"> & VariantProps<typeof emptyStateVariants>) {
  return (
    <section
      data-slot="empty-state"
      role={role}
      aria-live={ariaLive}
      className={cn(emptyStateVariants({ variant, size }), className)}
      {...props}
    />
  );
}

function EmptyStateIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-state-icon"
      aria-hidden="true"
      className={cn("text-muted-foreground mb-2", className)}
      {...props}
    />
  );
}

function EmptyStateTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      id="empty-state-title"
      data-slot="empty-state-title"
      className={cn("text-lg font-medium", className)}
      {...props}
    />
  );
}

function EmptyStateDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      id="empty-state-description"
      data-slot="empty-state-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function EmptyStateAction({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-state-action"
      className={cn("mt-2", className)}
      {...props}
    />
  );
}

export {
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateAction,
  emptyStateVariants,
};
