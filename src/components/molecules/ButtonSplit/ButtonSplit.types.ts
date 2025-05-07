import type { ReactNode } from "react";

import type { VariantProps } from "class-variance-authority";
import { buttonSplitVariants } from "./ButtonSplit.variants";

export type ButtonSplitProps = {
  children: ReactNode;
  className?: string;
} & VariantProps<typeof buttonSplitVariants>;
