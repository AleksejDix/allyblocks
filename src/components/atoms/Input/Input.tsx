import { cn } from "@/lib/utils";
import { inputVariants } from "./Input.variants";
import { InputProps, InputSize } from "./Input.types";

export function Input({
  className,
  type,
  size,
  required,
  ...props
}: InputProps) {
  // Handle both numeric HTML size attribute and our string-based size variants
  const sizeVariant =
    typeof size === "string" && ["sm", "md", "lg"].includes(size)
      ? (size as InputSize)
      : undefined;

  // Apply default size if no valid size variant provided
  const effectiveSize = sizeVariant || "md";

  return (
    <input
      type={type}
      data-slot="input"
      aria-required={required ? "true" : undefined}
      className={cn(inputVariants({ size: effectiveSize, className }))}
      {...props}
    />
  );
}
