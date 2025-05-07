import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/atoms/Avatar";
import { Bullet, type StatusType } from "@/components/atoms";

export type Status = StatusType;

interface UserStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: Status;
  avatarSrc?: string;
  avatarFallback?: string;
  hideBullet?: boolean;
}

export function UserStatus({
  className,
  status = "offline",
  avatarSrc,
  avatarFallback,
  hideBullet = false,
  ...props
}: UserStatusProps) {
  // Get first letter of name for avatar fallback if needed
  const initials = avatarFallback || "";

  return (
    <div className={cn("relative w-8 h-8", className)} {...props}>
      <Avatar className="inset-0 absolute">
        {avatarSrc && <AvatarImage src={avatarSrc} alt="" />}
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>

      {!hideBullet && (
        <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 flex items-end justify-end overflow-hidden">
          <Bullet status={status} />
        </div>
      )}
    </div>
  );
}
