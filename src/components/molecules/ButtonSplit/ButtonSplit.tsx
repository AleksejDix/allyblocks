import { cn } from "@/lib/utils";
import type { ButtonSplitProps } from "./ButtonSplit.types";
import { buttonSplitVariants } from "./ButtonSplit.variants";

export function ButtonSplit({
  children,
  variant = "default",
  className,
}: ButtonSplitProps) {
  return (
    <div className={cn(buttonSplitVariants({ variant }), className)}>
      {children}
    </div>
  );
}
