import * as React from "react";
import { cn } from "@/lib/utils";
import { desVariants } from "./Des.variants";
import { DesProps } from "./Des.types";

function Des({ className, variant, ...props }: DesProps) {
  return <dl className={cn(desVariants({ variant, className }))} {...props} />;
}

function DesLabel({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <dt
      className={cn(
        "col-span-3 py-2 text-sm text-foreground font-book",
        className
      )}
      {...props}
    />
  );
}

function DesValue({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <dd
      className={cn("col-span-5 py-2 font-normal text-sm ", className)}
      {...props}
    />
  );
}

export { Des, DesLabel, DesValue };
