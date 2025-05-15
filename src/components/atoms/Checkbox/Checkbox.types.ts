import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import type { VariantProps } from "class-variance-authority";
import { checkboxVariants } from "./Checkbox.variants";

export type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> &
  VariantProps<typeof checkboxVariants>; 