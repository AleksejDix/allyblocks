import { cn } from "@/lib/utils";
import type { ButtonGroupProps } from "./ButtonGroup.types";
import { buttonGroupVariants } from "./ButtonGroup.variants";

export function ButtonGroup({
  children,
  className,
  direction,
}: ButtonGroupProps) {
  return (
    <div
      className={cn(
        buttonGroupVariants({
          direction,
        }),
        className
      )}
    >
      {children}
    </div>
  );
}
