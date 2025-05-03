import * as React from "react";

import { cn } from "@/lib/utils";

const disabled = "disabled:cursor-not-allowed disabled:opacity-50";
const invalid =
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30";
const focus = "focus-visible:border-ring focus-visible:ring-ring/50";
const placeholder = "placeholder:text-muted-foreground";
const sizing =
  "field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(disabled, invalid, focus, placeholder, sizing, className)}
      {...props}
    />
  );
}

export { Textarea };
