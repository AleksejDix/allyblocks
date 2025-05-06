import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const boxVariants = cva("", {
  variants: {
    surface: {
      default: "bg-background",
      muted: "bg-muted",
      primary: "bg-primary",
      secondary: "bg-secondary",
      accent: "bg-accent",
      transparent: "bg-transparent",
      card: "bg-card",
      popover: "bg-popover",
      destructive: "bg-destructive",
      sidebar: "bg-sidebar",
      "sidebar-primary": "bg-sidebar-primary",
      "sidebar-accent": "bg-sidebar-accent",
    },
    elevation: {
      none: "shadow-none",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
    },
  },
  defaultVariants: {
    surface: "default",
  },
});

export interface BoxProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof boxVariants> {
  as?: React.ElementType;
}

const Box = React.forwardRef<HTMLElement, BoxProps>(
  ({ className, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={boxVariants({ ...props, className })}
        {...props}
      />
    );
  },
);

Box.displayName = "Box";

export { Box };
