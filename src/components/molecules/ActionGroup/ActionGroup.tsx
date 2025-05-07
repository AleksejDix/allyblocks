import { cn } from "@/lib/utils";
import type { ActionGroupProps } from "./ActionGroup.types";
import { ActionGroupVariants } from "./ActionGroup.variants";

export function ActionGroup({
  children,
  className,
  direction,
}: ActionGroupProps) {
  return (
    <div
      className={cn(
        ActionGroupVariants({
          direction,
        }),
        className
      )}
    >
      {children}
    </div>
  );
}
