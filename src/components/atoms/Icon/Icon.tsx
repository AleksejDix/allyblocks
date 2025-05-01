import { DynamicIcon } from "lucide-react/dynamic";
import { type LucideProps } from "lucide-react";

type IconName = Parameters<typeof DynamicIcon>[0]["name"];

export function Icon({
  name,
  "aria-label": ariaLabel,
  ...props
}: LucideProps & { name: IconName }) {
  return (
    <DynamicIcon
      name={name}
      data-testid="icon"
      aria-hidden={!ariaLabel}
      aria-label={ariaLabel}
      {...props}
    />
  );
}
