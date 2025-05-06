import * as React from "react";
import { VariantProps } from "class-variance-authority";
import { desVariants } from "./Des.variants";

export type DesProps = React.ComponentProps<"dl"> &
  VariantProps<typeof desVariants>; 