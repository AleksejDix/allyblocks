import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export type StatusType = "online" | "offline" | "away" | "busy";

const statusIndicatorVariants = cva(
  "inline-block rounded-full border-2 border-background shrink-0 w-3 h-3",
  {
    variants: {
      status: {
        online: "bg-green-400",
        offline: "bg-zinc-400 ",
        away: "bg-yellow-400",
        busy: "bg-red-400",
      },
    },
    defaultVariants: {
      status: "offline",
    },
  }
);

export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusIndicatorVariants> {
  label?: string;
}

export function StatusIndicator({
  className,
  status,
  label,
  ...props
}: StatusIndicatorProps) {
  // Determine the appropriate aria label if not provided
  const ariaLabel =
    label ||
    (status === "online"
      ? "Online"
      : status === "offline"
      ? "Offline"
      : status === "away"
      ? "Away"
      : status === "busy"
      ? "Do not disturb"
      : "");

  return (
    <span
      role="status"
      aria-label={ariaLabel}
      className={cn(statusIndicatorVariants({ status }), className)}
      {...props}
    />
  );
}
