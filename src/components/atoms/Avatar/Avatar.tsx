"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";
import {
  avatarVariants,
  avatarImageVariants,
  avatarFallbackVariants,
} from "./Avatar.variants";
import type {
  AvatarProps,
  AvatarImageProps,
  AvatarFallbackProps,
} from "./Avatar.types";

export function Avatar({ className, size, shape, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ size, shape }), className)}
      {...props}
    />
  );
}

export function AvatarImage({ className, ...props }: AvatarImageProps) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(avatarImageVariants(), className)}
      {...props}
    />
  );
}

export function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(avatarFallbackVariants(), className)}
      {...props}
    />
  );
}
