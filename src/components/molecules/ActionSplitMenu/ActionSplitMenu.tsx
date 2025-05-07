import React, { useState } from "react";

import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import { Icon } from "@/components/atoms/Icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/molecules/DropdownMenu";
import { ActionSplit } from "../ActionSplit";
import { cn } from "@/lib/utils";
import type {
  Action,
  ActionEvent,
  ActionSplitMenuProps,
} from "./ActionSplitMenu.types";

import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/molecules/Tooltip";

// This component is a split button that shows a main action and a dropdown menu of actions.
// The main action is the first action in the actions arr
// Each action has a type and payload and original event object

const firstAction = (actions: Action[]) => actions[0];
const isFirstActionDisabled = (actions: Action[]) =>
  firstAction(actions).props?.disabled;

export function ActionActionSplit({
  actions,
  children,
  moreButtonRef,
  variant = "default",
  size = "default",
  className,
}: ActionSplitMenuProps) {
  const first = firstAction(actions);
  const [pendingAction, setPendingAction] = useState<{
    type: string;
    event: Event | React.SyntheticEvent;
    payload?: Record<string, string>;
    action: (action: ActionEvent) => void;
  } | null>(null);

  // Map Button size to IconButton size
  const iconSize = size === "sm" ? "sm" : size === "lg" ? "lg" : "md";

  return (
    <ActionSplit variant={variant} className={cn(className)}>
      <Button
        variant={variant}
        size={size}
        onClick={(event) =>
          first.action({
            type: first.type,
            event,
            payload: first.payload,
          })
        }
        disabled={isFirstActionDisabled(actions)}
      >
        {first.before}
        {first.label || children}
        {first.after}
      </Button>
      <TooltipProvider>
        <Tooltip>
          <DropdownMenu>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <IconButton
                  variant={variant}
                  size={iconSize}
                  aria-label="Select action"
                  ref={moreButtonRef}
                >
                  <Icon name="chevron-down" size={16} />
                </IconButton>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Select an action</p>
            </TooltipContent>

            <DropdownMenuContent
              align="end"
              onCloseAutoFocus={(e) => {
                if (pendingAction) {
                  e.preventDefault();
                }
              }}
              onAnimationEnd={() => {
                if (pendingAction) {
                  pendingAction.action({
                    type: pendingAction.type,
                    event: pendingAction.event,
                    payload: pendingAction.payload,
                  });
                  setPendingAction(null);
                }
              }}
            >
              {actions.map((action, index) => (
                <DropdownMenuItem
                  key={index}
                  onSelect={(event) => {
                    setPendingAction({
                      type: action.type,
                      event,
                      payload: action.payload,
                      action: action.action,
                    });
                  }}
                  {...action.props}
                >
                  {action.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </Tooltip>
      </TooltipProvider>
    </ActionSplit>
  );
}

export type {
  Action,
  ActionEvent,
  ButtonVariant,
  ButtonSize,
} from "./ActionSplitMenu.types";
