import type { LucideProps } from "lucide-react";
import type { DynamicIcon } from "lucide-react/dynamic";

// Extract the name parameter type from DynamicIcon
type IconName = Parameters<typeof DynamicIcon>[0]["name"];

export type IconProps = LucideProps & {
  name: IconName;
  className?: string;
};
