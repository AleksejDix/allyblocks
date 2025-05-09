import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { codeVariants } from "./Code.variants";
import type { CodeProps } from "./Code.types";

export function Code({
  className,
  variant,
  asChild = false,
  ...props
}: CodeProps) {
  const Comp = asChild ? Slot : "code";

  return (
    <Comp
      data-slot="code"
      className={cn(codeVariants({ variant }), className)}
      {...props}
    />
  );
}
