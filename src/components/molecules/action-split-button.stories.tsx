import { Meta, StoryObj } from "@storybook/react";
import {
  ActionSplitButton,
  type Action,
  type ActionEvent,
} from "./action-split-button";
import { useReducer, useRef, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/organisms/alert-dialog";

const meta: Meta<typeof ActionSplitButton> = {
  component: ActionSplitButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ActionSplitButton>;

type State = {
  count: number;
  lastAction: string | null;
};

type ActionType = "increment" | "decrement" | "reset" | "double";

const reducer = (state: State, action: ActionEvent) => {
  switch (action.type as ActionType) {
    case "increment":
      return { ...state, count: state.count + 1, lastAction: "increment" };
    case "decrement":
      return { ...state, count: state.count - 1, lastAction: "decrement" };
    case "reset":
      return { ...state, count: 0, lastAction: "reset" };
    case "double":
      return { ...state, count: state.count * 2, lastAction: "double" };
    default:
      return state;
  }
};

const CounterDemo = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0, lastAction: null });
  const dialogTriggerRef = useRef<HTMLButtonElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);

  const handleAction = (event: ActionEvent) => {
    dispatch(event);
  };

  useEffect(() => {
    if (state.lastAction) {
      dialogTriggerRef.current?.click();
    }
  }, [state]);

  const actions: Action[] = [
    {
      label: "Increment",
      type: "increment",
      action: handleAction,
    },
    {
      label: "Decrement",
      type: "decrement",
      action: handleAction,
    },
    {
      label: "Reset",
      type: "reset",
      action: handleAction,
    },
    {
      label: "Double",
      type: "double",
      action: handleAction,
    },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-lg">
        Count: {state.count}
        {state.lastAction && (
          <div className="text-sm text-gray-500">
            Last action: {state.lastAction}
          </div>
        )}
      </div>
      <ActionSplitButton actions={actions} moreButtonRef={moreButtonRef}>
        Count Actions
      </ActionSplitButton>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            ref={dialogTriggerRef}
            className="hidden"
            aria-hidden="true"
          />
        </AlertDialogTrigger>
        <AlertDialogContent
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            moreButtonRef.current?.focus();
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Action Completed</AlertDialogTitle>
            <AlertDialogDescription>
              Your export should arrive in your email inbox shortly.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction autoFocus>Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export const Default: Story = {
  render: () => <CounterDemo />,
};
