import * as React from "react";
import { cn } from "@/lib/utils";

export const Hidden = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      "absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0",
      "clip-rect-0 not-sr-only",
      className
    )}
    {...props}
  />
);

