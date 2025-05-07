import { DynamicIcon } from "lucide-react/dynamic";
import { cn } from "@/lib/utils";
import { iconVariants } from "./Icon.variants";
import type { IconProps } from "./Icon.types";

export function Icon({
  name,
  "aria-label": ariaLabel,
  className,
  size,
  ...props
}: IconProps) {
  // Check if the size is one of our predefined variant sizes
  const isVariantSize =
    size === 12 ||
    size === 16 ||
    size === 20 ||
    size === 24 ||
    size === 32 ||
    size === 40 ||
    size === 48;

  return (
    <div
      className={cn(
        isVariantSize
          ? iconVariants({
              size: size as 12 | 16 | 20 | 24 | 32 | 40 | 48,
            })
          : "flex items-center justify-center",
        className
      )}
    >
      <DynamicIcon
        name={name}
        data-testid="icon"
        aria-hidden={!ariaLabel}
        aria-label={ariaLabel}
        size={!isVariantSize ? size : undefined}
        {...props}
      />
    </div>
  );
}
