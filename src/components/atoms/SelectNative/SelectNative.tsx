import * as React from "react";
import { Icon } from "@/components/atoms/Icon";

import { cn } from "@/lib/utils";

export type SelectNativeProps = React.ComponentPropsWithoutRef<"select"> & {
  icon?: React.ReactNode;
};

const SelectNative = React.forwardRef<HTMLSelectElement, SelectNativeProps>(
  ({ className, children, icon, ...props }, ref) => {
    return (
      <div className="relative max-w-fit">
        <select
          ref={ref}
          data-slot="select-native"
          className={cn(
            "peer border-input text-foreground focus-visible:border-ring focus-visible:ring-ring/50 has-[option[disabled]:checked]:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex cursor-pointer appearance-none items-center rounded-md border text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            props.multiple
              ? "[&_option:checked]:bg-accent py-1 *:px-3 *:py-1"
              : "h-9 ps-3 pe-8",
            className
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
