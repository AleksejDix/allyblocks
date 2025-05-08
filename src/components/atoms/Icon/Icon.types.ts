import { type LucideProps } from "lucide-react";

type IconName = Parameters<
  typeof import("lucide-react/dynamic").DynamicIcon
>[0]["name"];

export type IconProps = LucideProps & {
  name: IconName;
  className?: string;
};
