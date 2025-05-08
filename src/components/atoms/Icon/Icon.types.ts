import { type LucideProps } from "lucide-react";
import { icons } from "lucide-react";

export type IconName = keyof typeof icons;

export type IconProps = LucideProps & {
  name: IconName;
  className?: string;
};
