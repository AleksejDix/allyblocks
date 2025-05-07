import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./Button.variants";

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };
