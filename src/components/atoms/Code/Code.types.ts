import type { HTMLAttributes } from "react";

export interface CodeProps extends HTMLAttributes<HTMLElement> {
  variant?: "default" | "inline" | "outline";
  asChild?: boolean;
} 