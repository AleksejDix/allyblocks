import * as React from "react";
import { VariantProps } from "class-variance-authority";
import { iconButtonVariants } from "./IconButton.variants";

export type IconButtonSize = "sm" | "md" | "lg";

export type IconButtonProps = Omit<React.ComponentProps<"button">, "children"> &
  VariantProps<typeof iconButtonVariants> & {
    asChild?: boolean;
    children: React.ReactNode;
    "aria-label": string; // Force providing an accessible label
  };
