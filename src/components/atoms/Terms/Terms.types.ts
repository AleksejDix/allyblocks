import * as React from "react";
import { VariantProps } from "class-variance-authority";
import { termsVariants } from "./Terms.variants";

export type TermsProps = React.ComponentProps<"dl"> &
  VariantProps<typeof termsVariants>;
