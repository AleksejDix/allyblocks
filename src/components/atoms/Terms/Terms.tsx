import * as React from "react";
import { cn } from "@/lib/utils";
import { termsVariants } from "./Terms.variants";
import { TermsProps } from "./Terms.types";

function Terms({ className, variant, ...props }: TermsProps) {
  return (
    <dl className={cn(termsVariants({ variant, className }))} {...props} />
  );
}

function Term({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <dt
      className={cn(
        "md:col-span-3 text-sm text-foreground font-medium",
        className,
      )}
      {...props}
    />
  );
}

function TermDefinition({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <dd
      className={cn("md:col-span-5 font-normal text-sm ", className)}
      {...props}
    />
  );
}

export { Terms, Term, TermDefinition };
