import * as React from "react";

import { cn } from "@/lib/utils";

const basedClass = `
md:text-sm
selection:bg-primary 
selection:text-primary-foreground
dark:bg-input/30 flex h-9 w-full min-w-0 
rounded-md  bg-background px-3 py-1 text-base 
border
border-input
outline-1
outline-zinc-950/5
transition-[color,outline]
ring-offset-background
`;

const placeholderClass = `
placeholder:text-muted-foreground
`;

const invalidClass = `
[aria-invalid=true]:outline-destructive/10
[aria-invalid=true]:border-destructive
[aria-invalid=true]:bg-destructive/5
[aria-invalid=true]:text-destructive
[aria-invalid=true]:focus-visible:ring-2
[aria-invalid=true]:focus-visible:ring-destructive/50
[aria-invalid=true]:focus-visible:ring-offset-2
[aria-invalid=true]:focus-visible:ring-opacity-100
`;

const focusVisibleClass = `
focus-visible:ring-2
focus-visible:ring-offset-2
focus-visible:ring-primary
focus-visible:ring-opacity-100
focus-visible:transition-colors
`;

const disabledClass = `
disabled:pointer-events-none
disabled:cursor-not-allowed 
disabled:opacity-50
disabled:text-muted-foreground
disabled:bg-muted-background
`;

const fileClass = `
file:text-foreground 
file:inline-flex 
file:h-7 
file:border-0 
file:bg-transparent
file:text-sm 
file:font-medium   
`;

type Props = React.ComponentProps<"input"> & {
  required?: boolean;
};

export function Input({ className, type, required, ...props }: Props) {
  return (
    <input
      type={type}
      data-slot="input"
      aria-required={required ? "true" : undefined}
      className={cn(
        basedClass,
        placeholderClass,
        disabledClass,
        focusVisibleClass,
        invalidClass,
        fileClass,
        className
      )}
      {...props}
    />
  );
}
