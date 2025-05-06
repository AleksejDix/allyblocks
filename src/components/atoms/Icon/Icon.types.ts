import { type LucideProps } from "lucide-react";

type IconName = Parameters<typeof import("lucide-react/dynamic").DynamicIcon>[0]["name"];

// We define our own size type to avoid conflicts with CVA and allow both variant and custom sizes
type IconSize = 12 | 16 | 20 | 24 | 32 | 40 | 48 | number;

export interface IconProps extends Omit<LucideProps, 'size'> {
  name: IconName;
  size?: IconSize;
  className?: string;
} 