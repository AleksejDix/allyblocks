import { ChevronDownIcon } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/atoms/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/organisms/dropdown-menu";
import { ButtonGroup } from "@/components/molecules/button-group";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/molecules/tooltip";

// This component is a split button that shows a main action and a dropdown menu of actions.
// The main action is the first action in the actions arr
// Each action has a type and payload and original event object

export type ActionEvent = {
  type: string;
  event: Event | React.SyntheticEvent;
  payload?: Record<string, string>;
};

export type Action = {
  label: string;
  type: string;
  action: (action: ActionEvent) => void;
  props?: Record<string, string> & { disabled?: boolean };
  before?: React.ReactNode;
  after?: React.ReactNode;
  payload?: Record<string, string>;
};

type Props = {
  actions: Action[];
  children: React.ReactNode;
  moreButtonRef?: React.Ref<HTMLButtonElement>;
};

const firstAction = (actions: Action[]) => actions[0];
const isFirstActionDisabled = (actions: Action[]) =>
  firstAction(actions).props?.disabled;

export function ActionSplitButton(props: Props) {
  const first = firstAction(props.actions);
  const [pendingAction, setPendingAction] = useState<{
    type: string;
    event: Event | React.SyntheticEvent;
    payload?: Record<string, string>;
    action: (action: ActionEvent) => void;
  } | null>(null);

  return (
    <ButtonGroup>
      <Button
        onClick={(event) =>
          first.action({
            type: first.type,
            event,
            payload: first.payload,
          })
        }
        disabled={isFirstActionDisabled(props.actions)}
      >
        {first.before}
        {first.label}
        {first.after}
      </Button>
      <TooltipProvider>
        <Tooltip>
          <DropdownMenu>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  aria-label="Select action"
                  ref={props.moreButtonRef}
                >
                  <ChevronDownIcon size={16} aria-hidden="true" />
                </Button>
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
              {props.actions.map((action, index) => (
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
    </ButtonGroup>
  );
}
