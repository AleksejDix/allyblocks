import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import { inputVariants } from "./Input.variants";

// Define specific sizes allowed for the Input component
export type InputSize = "sm" | "md" | "lg";

// Use a more specific type to ensure size is properly handled
export type InputProps = Omit<React.ComponentProps<"input">, "size"> &
  Omit<VariantProps<typeof inputVariants>, "size"> & {
    required?: boolean;
    // Make size explicitly typed rather than relying on VariantProps inference
    size?: InputSize;
  };
