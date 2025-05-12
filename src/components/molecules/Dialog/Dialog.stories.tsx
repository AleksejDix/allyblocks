import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor, screen } from "@storybook/test";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./Dialog";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/molecules/Form/Form";
import { FieldEmail } from "@/components/molecules/Fields/FieldEmail";
import { FieldPassword } from "../Fields/FieldPassword";
import {
  ActionMenu,
  ActionMenuTrigger,
  ActionMenuContent,
  ActionMenuItem,
  ActionMenuGroup,
  ActionMenuLabel,
  ActionMenuSeparator,
} from "@/components/molecules/ActionMenu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/Select";

import { Label } from "@/components/atoms/Label";
import { IconButton } from "@/components/atoms/IconButton";
import { Input } from "@/index";
import { ActionSplit } from "../ActionSplit";

// Mock notification function
const notify = (message: string) => {
  console.log(message);
};

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  parameters: {
    docs: {},
  },
  tags: ["autodocs"],
  argTypes: {
    onValueChange: {
      action: "value changed",
      description: "Callback when any action in the dialog is executed",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </DialogDescription>
        </DialogHeader>
        <p>Content</p>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const triggerButton = canvas.getByRole("button");
    await userEvent.click(triggerButton);

    await waitFor(() => {
      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeVisible();
    });

    const saveButton = screen.getByRole("button", { name: /Save/i });

    await userEvent.click(saveButton);

    await waitFor(() => {
      const dialog = screen.getByRole("dialog");
      expect(dialog).not.toBeVisible();
    });
  },
};

// Controlled Dialog story
function ControlledDialogDemo() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  const triggerButton = useRef<HTMLButtonElement>(null);

  const handleOpenChange = (isOpen: boolean) => {
    // restore focus to the <Button onClick={() => handleOpenChange(true)}>Open</Button>

    setOpen(isOpen);
    if (isOpen) {
      notify("Dialog opened");
    } else {
      notify("Dialog closed");
      setTimeout(() => {
        triggerButton.current?.focus();
      }, 0);
    }
  };

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex gap-4 items-center">
        <Button
          variant="ghost"
          onClick={() => handleOpenChange(true)}
          ref={triggerButton}
        >
          Open
        </Button>
        <p className="text-sm">Current count: {count}</p>
      </div>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Controlled Dialog</DialogTitle>
            <DialogDescription>
              This dialog's state is controlled externally.
            </DialogDescription>
          </DialogHeader>
          <ActionSplit>
            <IconButton
              aria-label="Decrement Count"
              variant="outline"
              onClick={handleDecrement}
            >
              <Icon name="minus" />
            </IconButton>
            <Input
              type="number"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            />
            <IconButton
              aria-label="Increment Count"
              variant="outline"
              onClick={handleIncrement}
            >
              <Icon name="plus" />
            </IconButton>
          </ActionSplit>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              Ok
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledDialogDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click the external button to open the dialog
    const externalButton = canvas.getByRole("button", {
      name: /Open Controlled Dialog/i,
    });

    expect(externalButton).toBeVisible();
    await userEvent.click(externalButton);

    await waitFor(() => {
      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeVisible();
    });

    // // Verify dialog is open
    // const title = canvas.getByRole("heading", { name: /controlled dialog/i });
    // await expect(title).toBeVisible();

    // // Increment the counter
    // const incrementButton = canvas.getByRole("button", {
    //   name: /increment count/i,
    // });
    // await userEvent.click(incrementButton);

    // // Verify the count has been incremented
    // const countText = canvas.getByText(/current count: 1/i);
    // await expect(countText).toBeVisible();

    // // Close the dialog with the close button
    // const closeButton = canvas.getByRole("button", { name: /close/i });
    // await userEvent.click(closeButton);

    // // Verify dialog is closed
    // await waitFor(() => {
    //   expect(title).not.toBeVisible();
    // });

    // // Verify the count state persists after closing
    // const externalCount = canvas.getByText(/current count: 1/i);
    // await expect(externalCount).toBeVisible();
  },
};

// Dialog with action buttons
export const WithActions: Story = {
  render: (args) => {
    // Create a custom component to handle the DialogClose props
    const CloseButton = React.forwardRef<
      HTMLButtonElement,
      React.ComponentProps<typeof Button> & {
        value?: string;
        context?: Record<string, unknown>;
        onAction?: (e: Event) => void;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    >(({ value, context, onAction, ...props }, ref) => (
      <Button {...props} ref={ref} />
    ));

    return (
      <Dialog
        {...args}
        onValueChange={(value, event, context) => {
          notify(`Action: ${value}, Context: ${JSON.stringify(context)}`);
        }}
      >
        <DialogTrigger asChild>
          <Button variant="outline">Dialog with Actions</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              Please confirm you want to perform this action.
            </DialogDescription>
          </DialogHeader>
          <div>
            <p>This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <CloseButton
                variant="outline"
                value="cancel"
                context={{ timestamp: new Date().toISOString() }}
              >
                Cancel
              </CloseButton>
            </DialogClose>
            <DialogClose asChild>
              <CloseButton
                value="confirm"
                context={{ timestamp: new Date().toISOString() }}
                onAction={() => notify("Confirmation action executed")}
              >
                Confirm
              </CloseButton>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

// Component to use in the Dialog story
function EmailSubscriptionForm(props: { onClose: () => void }) {
  // Define the form schema
  const schema = z.object({
    email: z.string().email("Please enter a valid email address"),
  });

  // Create form state with React Hook Form
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof schema>) => {
    setIsSubmitting(true);

    // Simulate API call with 1 second delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Log the submitted values
    notify(`Submitted email: ${values.email}`);

    // Reset form and close dialog
    setIsSubmitting(false);
    methods.reset();
    props.onClose();
  };

  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        className="contents"
      >
        <div className="flex flex-col gap-4">
          <FieldEmail
            name="email"
            label="Email Address"
            description="We'll never share your email with anyone else."
            required={true}
          />
          <FieldPassword
            name="password"
            label="Password"
            description="We'll never share your email with anyone else."
            required={true}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Icon name="loader-2" className="mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

// Wrapper component for the Email Subscription Dialog
function EmailSubscriptionDialog(props: React.ComponentProps<typeof Dialog>) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog {...props} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Email Subscription</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subscribe to Newsletter</DialogTitle>
          <DialogDescription>
            Enter your email to subscribe to our newsletter.
          </DialogDescription>
        </DialogHeader>
        <EmailSubscriptionForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

// Dialog with custom content using FieldEmail component
export const WithCustomContent: Story = {
  render: (args) => <EmailSubscriptionDialog {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click the button to open the dialog
    const triggerButton = canvas.getByRole("button", {
      name: /email subscription/i,
    });
    await userEvent.click(triggerButton);

    // Find the email input field
    const emailInput = canvas.getByRole("textbox", { name: /email address/i });
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveFocus();

    // Type an invalid email and try to submit
    await userEvent.type(emailInput, "invalid-email");
    const submitButton = canvas.getByRole("button", { name: /subscribe/i });
    await userEvent.click(submitButton);

    // Check for validation error
    const errorMessage = await canvas.findByText(
      /please enter a valid email address/i
    );
    await expect(errorMessage).toBeVisible();

    // Type a valid email and submit
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.click(submitButton);

    // Verify spinner appears
    const spinner = canvas.getByText(/submitting/i);
    await expect(spinner).toBeVisible();

    // Wait for the submission to complete (1 second delay)
    await waitFor(() => expect(spinner).not.toBeInTheDocument(), {
      timeout: 1500,
    });
  },
};

// Dialog with action handlers
export const WithActionHandlers: Story = {
  render: (args) => {
    const handleSave = (e: Event) => {
      notify(`Save action triggered at ${e.timeStamp}`);
    };

    const handleDelete = (e: Event) => {
      notify(`Delete action triggered at ${e.timeStamp}`);
    };

    // Create a custom component to handle the DialogClose props
    const ActionButton = React.forwardRef<
      HTMLButtonElement,
      React.ComponentProps<typeof Button> & {
        value?: string;
        context?: Record<string, unknown>;
        onAction?: (e: Event) => void;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    >(({ value, context, onAction, ...props }, ref) => (
      <Button {...props} ref={ref} />
    ));

    return (
      <Dialog {...args}>
        <DialogTrigger asChild>
          <Button>Manage Item</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Item Management</DialogTitle>
            <DialogDescription>Perform actions on this item.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>Item #123: Sample Product</p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <ActionButton
                variant="outline"
                onAction={handleSave}
                value="save"
              >
                <Icon name="save" className="mr-2" />
                Save
              </ActionButton>
            </DialogClose>
            <DialogClose asChild>
              <ActionButton
                variant="destructive"
                onAction={handleDelete}
                value="delete"
              >
                <Icon name="trash" className="mr-2" />
                Delete
              </ActionButton>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

// Dialog with no footer
export const WithoutFooter: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Simple Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Simple Dialog</DialogTitle>
          <DialogDescription>
            This dialog has no footer, just a close button.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>Some content here...</p>
        </div>
      </DialogContent>
    </Dialog>
  ),
};

// Dialog with focus management
export const FocusManagement: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="outline">Test Focus</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Focus Test</DialogTitle>
          <DialogDescription>
            Tab should cycle through interactive elements. Focus should return
            to trigger on close.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <input type="text" placeholder="First input" className="w-full" />
          <input type="text" placeholder="Second input" className="w-full" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Submit</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggerButton = canvas.getByRole("button", { name: /test focus/i });

    // Ensure trigger has focus initially
    triggerButton.focus();
    await expect(triggerButton).toHaveFocus();

    // Open dialog
    await userEvent.click(triggerButton);

    // Test focus management by checking visible elements
    const firstInput = canvas.getByPlaceholderText(/first input/i);
    await expect(firstInput).toHaveFocus();

    // Test tab navigation through visible elements
    await userEvent.tab();
    const secondInput = canvas.getByPlaceholderText(/second input/i);
    await expect(secondInput).toHaveFocus();

    await userEvent.tab();
    const cancelButton = canvas.getByRole("button", { name: /cancel/i });
    await expect(cancelButton).toHaveFocus();

    await userEvent.tab();
    const submitButton = canvas.getByRole("button", { name: /submit/i });
    await expect(submitButton).toHaveFocus();

    // Close dialog
    await userEvent.click(submitButton);

    // Verify focus returns to trigger
    await waitFor(() => {
      expect(triggerButton).toHaveFocus();
    });
  },
};

// Complex dialog with ActionMenu and Select
function DialogWithComplexElements() {
  const [open, setOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedDepartment) {
      return;
    }

    setIsSubmitting(true);
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    notify(
      `Submitted: Department=${selectedDepartment}, Action=${selectedAction || "None"}`
    );
    setIsSubmitting(false);
    setOpen(false);
  };

  const handleMenuAction = (value: string) => {
    setSelectedAction(value);
    notify(`Selected action: ${value}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Advanced Configuration</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Resource Configuration</DialogTitle>
          <DialogDescription>
            Configure the resource and choose available actions.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger
                variant="default"
                id="department"
                className="w-full"
                aria-label="Select department"
              >
                <SelectValue placeholder="Select a department" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Departments</SelectLabel>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="support">Customer Support</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Quick Actions</label>
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {selectedAction
                  ? `Selected: ${selectedAction}`
                  : "No action selected"}
              </div>
              <ActionMenu onValueChange={(value) => handleMenuAction(value)}>
                <ActionMenuTrigger>
                  <Button variant="outline" size="sm">
                    <Icon name="more-horizontal" className="mr-2" />
                    Actions
                  </Button>
                </ActionMenuTrigger>
                <ActionMenuContent>
                  <ActionMenuLabel>Resource Actions</ActionMenuLabel>
                  <ActionMenuSeparator />
                  <ActionMenuGroup>
                    <ActionMenuItem value="view">
                      <Icon name="eye" />
                      View Details
                    </ActionMenuItem>
                    <ActionMenuItem value="edit">
                      <Icon name="pencil" />
                      Edit Resource
                    </ActionMenuItem>
                    <ActionMenuItem value="share">
                      <Icon name="share" />
                      Share Resource
                    </ActionMenuItem>
                  </ActionMenuGroup>
                  <ActionMenuSeparator />
                  <ActionMenuGroup>
                    <ActionMenuItem value="delete" variant="destructive">
                      <Icon name="trash" />
                      Delete Resource
                    </ActionMenuItem>
                  </ActionMenuGroup>
                </ActionMenuContent>
              </ActionMenu>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedDepartment || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Icon name="loader-2" className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Save Configuration"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Add the story to your stories object
export const WithComplexElements: Story = {
  render: () => <DialogWithComplexElements />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open the dialog
    const openButton = canvas.getByRole("button", {
      name: /advanced configuration/i,
    });
    await userEvent.click(openButton);

    // Wait for dialog to be visible
    const dialogTitle = await canvas.findByRole("heading", {
      name: /resource configuration/i,
    });
    await expect(dialogTitle).toBeVisible();

    // Select a department
    const departmentTrigger = canvas.getByRole("combobox", {
      name: /select department/i,
    });
    await userEvent.click(departmentTrigger);

    // Select Engineering department
    const engineeringOption = await canvas.findByRole("option", {
      name: /engineering/i,
    });
    await userEvent.click(engineeringOption);

    // Open the action menu
    const actionsButton = canvas.getByRole("button", { name: /actions/i });
    await userEvent.click(actionsButton);

    // Select Edit action
    const editOption = await canvas.findByRole("menuitem", {
      name: /edit resource/i,
    });
    await userEvent.click(editOption);

    // Check that the action selection is displayed
    const selectedActionText = await canvas.findByText(/selected: edit/i);
    await expect(selectedActionText).toBeVisible();

    // Submit the form
    const saveButton = canvas.getByRole("button", {
      name: /save configuration/i,
    });
    await userEvent.click(saveButton);

    // Check for loading state
    const loadingText = canvas.getByText(/submitting/i);
    await expect(loadingText).toBeVisible();

    // Wait for submission to complete and dialog to close
    await waitFor(() => expect(dialogTitle).not.toBeInTheDocument(), {
      timeout: 1500,
    });
  },
};
