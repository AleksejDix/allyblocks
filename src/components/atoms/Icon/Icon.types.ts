import { type LucideProps } from "lucide-react";

// Accept any string for name property instead of strict typing
export type IconName = string;

export type IconProps = LucideProps & {
  name: IconName;
  className?: string;
};
