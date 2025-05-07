import type * as React from "react";
import type * as AvatarPrimitive from "@radix-ui/react-avatar";
import type { VariantProps } from "class-variance-authority";
import { avatarVariants, avatarImageVariants, avatarFallbackVariants } from "./Avatar.variants";

export type AvatarProps = React.ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants>;

export type AvatarImageProps = Omit<React.ComponentProps<typeof AvatarPrimitive.Image>, 'src' | 'alt'> &
  VariantProps<typeof avatarImageVariants> &
  {
    src: string;
    alt: string;
  };

export type AvatarFallbackProps = React.ComponentProps<typeof AvatarPrimitive.Fallback> &
  VariantProps<typeof avatarFallbackVariants>; 