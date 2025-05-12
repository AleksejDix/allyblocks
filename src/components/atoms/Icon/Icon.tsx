import type { IconProps } from "./Icon.types";
import { DynamicIcon } from "lucide-react/dynamic";
import { Suspense } from "react";

export function Icon({
  name,
  "aria-label": ariaLabel,
  className,
  size = 16,
  ...props
}: IconProps) {
  const numericSize = typeof size === "string" ? parseInt(size, 10) : size;

  const Placeholder = ({ size }: { size: number }) => (
    <div style={{ width: `${size}px`, height: `${size}px` }}></div>
  );

  const LoadingIcon = ({ size }: { size: number }) => {
    return <Placeholder size={size} />;
  };

  const MissingIcon = ({ size }: { size: number }) => {
    return <Placeholder size={size} />;
  };

  return (
    <Suspense fallback={<LoadingIcon size={numericSize} />}>
      <DynamicIcon
        name={name}
        focusable={false}
        data-slot="icon"
        aria-hidden={!ariaLabel}
        aria-label={ariaLabel}
        size={size}
        className={className}
        fallback={() => {
          console.error(`Icon "${name}" not found`);
          return <MissingIcon size={numericSize} />;
        }}
        {...props}
      />
    </Suspense>
  );
}
