import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { iconButtonVariants } from "./IconButton.variants";
import { IconButtonProps } from "./IconButton.types";

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    // Ensure aria-label is provided
    if (!props["aria-label"]) {
      console.warn("IconButton: aria-label is required for accessibility");
    }

    return (
      <Comp
        data-slot="icon-button"
        className={cn(iconButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        title={props["aria-label"]}
      >
        {children}
      </Comp>
    );
  }
);

IconButton.displayName = "IconButton";
