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

// Convert kebab-case or camelCase to PascalCase
const toPascalCase = (str: string): string => {
  return str
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("");
};

export function Icon({
  name,
  "aria-label": ariaLabel,
  className,
  size = 16,
  ...props
}: IconProps) {
  const numericSize = typeof size === "string" ? parseInt(size, 10) : size;

  // Convert kebab-case like "check-circle" to PascalCase "CheckCircle"
  const pascalCaseName =
    name.indexOf("-") >= 0 || name.indexOf("_") >= 0
      ? toPascalCase(name)
      : // Handle simple names like "check" to "Check"
        name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  const LucideIcon = icons[pascalCaseName as keyof typeof icons];

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
