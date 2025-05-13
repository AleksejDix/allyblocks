import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export type TooltipSide = "top" | "right" | "bottom" | "left";
export type TooltipAlign = "start" | "center" | "end";

export type TooltipProviderProps = React.ComponentProps<
  typeof TooltipPrimitive.Provider
> & {
  /**
   * The duration from when the mouse enters a tooltip trigger until the tooltip opens.
   * @default 0
   */
  delayDuration?: number;
};

export type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root>;

export type TooltipTriggerProps = React.ComponentProps<
  typeof TooltipPrimitive.Trigger
>;

export type TooltipPortalProps = React.ComponentProps<
  typeof TooltipPrimitive.Portal
>;

export type TooltipContentProps = React.ComponentProps<
  typeof TooltipPrimitive.Content
> & {
  /**
   * The distance in pixels from the trigger.
   * @default 0
   */
  sideOffset?: number;
  /**
   * The element to use as the collision boundary
   */
  collisionBoundary?: React.ComponentProps<
    typeof TooltipPrimitive.Content
  >["collisionBoundary"];
  /**
   * The distance in pixels from the boundary edges where collision detection should occur.
   * @default 16
   */
  collisionPadding?: React.ComponentProps<
    typeof TooltipPrimitive.Content
  >["collisionPadding"];
};
