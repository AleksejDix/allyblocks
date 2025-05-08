/**
 * Icon component that uses Lucide icons
 *
 * @see CHANGELOG.md for version history
 */

import type { IconProps } from "./Icon.types";
import { icons } from "lucide-react";
import { Suspense } from "react";

const Placeholder = ({ size }: { size: number }) => (
  <div style={{ width: `${size}px`, height: `${size}px` }}></div>
);

const LoadingIcon = ({ size, name }: { size: number; name: string }) => {
  console.error(`Icon "${name}" not found`);
  return <Placeholder size={size} />;
};

const MissingIcon = ({ size, name }: { size: number; name: string }) => {
  console.error(`Icon "${name}" not found`);
  return <Placeholder size={size} />;
};

export function Icon({
  name,
  "aria-label": ariaLabel,
  className,
  size = 16,
  ...props
}: IconProps) {
  const numericSize = typeof size === "string" ? parseInt(size, 10) : size;
  const LucideIcon = icons[name as keyof typeof icons];

  return (
    <Suspense fallback={<LoadingIcon size={numericSize} name={name} />}>
      {LucideIcon ? (
        <LucideIcon
          data-slot="icon"
          aria-hidden={!ariaLabel}
          aria-label={ariaLabel}
          size={size}
          className={className}
          {...props}
        />
      ) : (
        <MissingIcon size={numericSize} name={name} />
      )}
    </Suspense>
  );
}
