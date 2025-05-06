import { DynamicIcon } from "lucide-react/dynamic";
import { type LucideProps } from "lucide-react";

type IconName = Parameters<typeof DynamicIcon>[0]["name"];

export function Icon({
  name,
  "aria-label": ariaLabel,
  ...props
}: LucideProps & { name: IconName }) {
  return (
    <div className="flex items-center justify-center size-4">
      <DynamicIcon
        name={name}
        data-testid="icon"
        aria-hidden={!ariaLabel}
        aria-label={ariaLabel}
        {...props}
      />
    </div>
  );
}
