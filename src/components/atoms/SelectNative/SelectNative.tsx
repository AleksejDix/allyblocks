import * as React from "react";
import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/lib/utils";
import { selectNativeVariants } from "./SelectNative.variants";
import type { SelectNativeProps } from "./SelectNative.types";

const SelectNative = React.forwardRef<HTMLSelectElement, SelectNativeProps>(
  (
    { className, children, icon, variant, sizeVariant, width, ...props },
    ref
  ) => {
    return (
      <div
        className={cn("relative", width === "full" ? "w-full" : "max-w-fit")}
      >
        <select
          ref={ref}
          data-slot="select-native"
          className={cn(
            selectNativeVariants({
              variant,
              sizeVariant,
              width,
              multiple: !!props.multiple,
              className,
            }),
            props.multiple && "[&_option:checked]:bg-accent py-1 *:px-3 *:py-1"
          )}
          {...props}
        >
          {children}
        </select>
        {!props.multiple && (
          <span
            className="text-muted-foreground/80 peer-aria-invalid:text-destructive/80 pointer-events-none absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center peer-disabled:opacity-50"
            aria-hidden="true"
          >
            {icon || <Icon name="chevron-down" size={16} />}
          </span>
        )}
      </div>
    );
  }
);

SelectNative.displayName = "SelectNative";

export { SelectNative };
