"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";
import { useActionProvider, useActionHandler } from "@/lib/useAction";
import type {
  ActionToolbarRootProps,
  ActionToolbarButtonProps,
} from "./ActionToolbar.types";
import {
  ActionToolbarContext,
  useActionToolbar,
} from "./ActionToolbar.context";

/**
 * ActionToolbar - A flexible toolbar with action support
 */
export function ActionToolbar({
  children,
  className,
  onValueChange,
  ...props
}: ActionToolbarRootProps) {
  const { action, setAction } = useActionProvider();

  return (
    <ActionToolbarContext.Provider value={{ action, setAction, onValueChange }}>
      <div
        className={cn(
          "flex items-center space-x-2 bg-muted/20 p-2 rounded-md",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </ActionToolbarContext.Provider>
  );
}

/**
 * ActionToolbarButton - Button with action support
 */
export function ActionToolbarButton({
  children,
  className,
  onClick,
  action,
  onAction,
  value,
  context,
  ...props
}: ActionToolbarButtonProps) {
  const { setAction } = useActionToolbar();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Call the original onClick if provided
    if (onClick) {
      onClick(event);
    }

    // Support both action and onAction for backward compatibility
    const actionHandler = onAction || action;

    // If a value is provided or there's a local action, use the action mechanism
    if (value || actionHandler) {
      setAction({
        callback: actionHandler,
        value,
        context,
        event: event as unknown as Event,
      });
    }
  };

  return (
    <Button className={className} onClick={handleClick} {...props}>
      {children}
    </Button>
  );
}

/**
 * ActionToolbarContent - Container for handling action animation
 */
export function ActionToolbarContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const actionContext = useActionToolbar();
  const handleAnimationEnd = useActionHandler(actionContext);

  return (
    <div
      className={cn("flex-1", className)}
      onAnimationEnd={handleAnimationEnd}
      {...props}
    >
      {children}
    </div>
  );
}
