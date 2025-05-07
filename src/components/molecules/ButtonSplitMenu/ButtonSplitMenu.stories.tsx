import type { Meta, StoryObj } from "@storybook/react";
import {
  ActionButtonSplit,
  type Action,
  type ActionEvent,
  type ButtonVariant,
  type ButtonSize,
} from "./ButtonSplitMenu";
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
} from "@/components/organisms/AlertDialog";

const meta: Meta<typeof ActionButtonSplit> = {
  component: ActionButtonSplit,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "secondary"],
      description: "The style variant of the split button",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "The size of the split button",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActionButtonSplit>;

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

const createActions = (
  handleAction: (event: ActionEvent) => void
): Action[] => [
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

const CounterDemo = ({
  variant,
  size,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) => {
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

  const actions = createActions(handleAction);

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
      <ActionButtonSplit
        actions={actions}
        moreButtonRef={moreButtonRef}
        variant={variant}
        size={size}
      >
        Count Actions
      </ActionButtonSplit>

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
              Action {state.lastAction} completed
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

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Variant: Default</h3>
        <CounterDemo variant="default" />
      </div>
      <div>
        <h3 className="text-lg font-medium mb-4">Variant: Outline</h3>
        <CounterDemo variant="outline" />
      </div>
      <div>
        <h3 className="text-lg font-medium mb-4">Variant: Secondary</h3>
        <CounterDemo variant="secondary" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Size: Default</h3>
        <CounterDemo size="default" />
      </div>
      <div>
        <h3 className="text-lg font-medium mb-4">Size: Small</h3>
        <CounterDemo size="sm" />
      </div>
      <div>
        <h3 className="text-lg font-medium mb-4">Size: Large</h3>
        <CounterDemo size="lg" />
      </div>
    </div>
  ),
};

export const VariantsAndSizes: Story = {
  render: () => {
    const variants: ButtonVariant[] = ["default", "outline", "secondary"];
    const sizes: ButtonSize[] = ["default", "sm", "lg"];

    return (
      <div className="grid grid-cols-3 gap-8">
        {variants.flatMap((variant) =>
          sizes.map((size) => (
            <div
              key={`${variant}-${size}`}
              className="flex flex-col items-center p-4 border rounded"
            >
              <p className="text-sm font-medium mb-4">
                {variant} / {size}
              </p>
              <CounterDemo variant={variant} size={size} />
            </div>
          ))
        )}
      </div>
    );
  },
};
