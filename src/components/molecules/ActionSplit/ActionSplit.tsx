import { cn } from "@/lib/utils";
import type { ActionSplitProps } from "./ActionSplit.types";
import { ActionSplitVariants } from "./ActionSplit.variants";

export function ActionSplit({
  children,
  variant = "default",
  className,
}: ActionSplitProps) {
  return (
    <div className={cn(ActionSplitVariants({ variant }), className)}>
      {children}
    </div>
  );
}
