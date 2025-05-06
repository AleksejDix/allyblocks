import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

export type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root> & {
  className?: string;
};
