import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Avatar,
  DisplayAvatarImage,
  DisplayAvatarFallback,
} from "@/components/atoms/Avatar";
import { StatusIndicator, StatusType } from "@/components/atoms";

export type Status = StatusType;

interface UserStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: Status;
  avatarSrc?: string;
  avatarFallback?: string;
  hideStatusIndicator?: boolean;
}

export function UserStatus({
  className,
  status = "offline",
  avatarSrc,
  avatarFallback,
  hideStatusIndicator = false,
  ...props
}: UserStatusProps) {
  // Get first letter of name for avatar fallback if needed
  const initials = avatarFallback || "";

  return (
    <div className={cn("relative w-8 h-8", className)} {...props}>
      <Avatar className="inset-0 absolute">
        {avatarSrc && <DisplayAvatarImage src={avatarSrc} alt="" />}
        <DisplayAvatarFallback>{initials}</DisplayAvatarFallback>
      </Avatar>

      {!hideStatusIndicator && (
        <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 flex items-end justify-end overflow-hidden">
          <StatusIndicator status={status} />
        </div>
      )}
    </div>
  );
}
