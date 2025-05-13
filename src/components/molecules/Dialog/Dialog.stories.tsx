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
  DialogBody,
} from "./Dialog";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/molecules/Form/Form";
import { FieldEmail } from "@/components/molecules/Fields/FieldEmail";
import { FieldPassword } from "../Fields/FieldPassword";

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
        <DialogBody>
          <p>Content</p>
        </DialogBody>
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
    setOpen(isOpen);
    if (isOpen) {
      notify("Dialog opened");
    } else {
      notify("Dialog closed");
    }
  };

  const onValueChange = (value: string) => {
    if (value) {
      console.log("Dialog opened");
    } else {
      console.log("Dialog closed");
    }
    //  For controlled dialogs, we need to focus the trigger button when the dialog is opened
    triggerButton.current?.focus();
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

      <Dialog open={open} onValueChange={onValueChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Controlled Dialog</DialogTitle>
            <DialogDescription>
              This dialog's state is controlled externally.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
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
          </DialogBody>
          <DialogFooter>
            <DialogClose
              asChild
              value="ok"
              context={{ timestamp: new Date().toISOString() }}
            >
              <Button variant="outline" onClick={() => handleOpenChange(false)}>
                Ok
              </Button>
            </DialogClose>
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

    const externalButton = canvas.getByRole("button");

    expect(externalButton).toBeVisible();
    await userEvent.click(externalButton);

    await waitFor(() => {
      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeVisible();
    });

    const okButton = screen.getByRole("button", { name: /ok/i });
    await userEvent.click(okButton);

    await waitFor(() => {
      const dialog = screen.getByRole("dialog");
      expect(dialog).not.toBeVisible();
    });
    expect(externalButton).toHaveFocus();
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
        <DialogBody className="grid gap-4">
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

          <div className="h-[2000px] border border-[lime]"></div>
        </DialogBody>
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

export const WithForm: Story = {
  render: (args) => <EmailSubscriptionDialog {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const triggerButton = canvas.getByRole("button", {
      name: /email subscription/i,
    });
    await userEvent.click(triggerButton);

    await waitFor(() => {
      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeVisible();
    });

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveFocus();

    await userEvent.type(emailInput, "invalid-email");

    const submitButton = screen.getByRole("button", { name: /Subscribe/i });
    expect(submitButton).toBeInTheDocument();
    await userEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(
        /Please enter a valid email address/i
      );
      expect(errorMessage).toBeVisible();
    });

    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.click(submitButton);

    await waitFor(() => {
      const spinner = screen.getByText(/submitting/i);
      expect(spinner).toBeVisible();

      // Wait for the submission to complete (1 second delay)
      waitFor(() => expect(spinner).not.toBeInTheDocument(), {
        timeout: 1500,
      });
    });
  },
};

export const WithActionHandlers: Story = {
  render: (args) => {
    const handleSave = (e: Event) => {
      notify(`Save action triggered at ${e.timeStamp}`);
    };

    const handleDelete = (e: Event) => {
      notify(`Delete action triggered at ${e.timeStamp}`);
    };

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
          <DialogBody>
            <p>Item #123: Sample Product</p>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild value="save" onAction={handleSave}>
              <Button variant="outline">
                <Icon name="save" className="mr-2" />
                Save
              </Button>
            </DialogClose>
            <DialogClose asChild value="delete" onAction={handleDelete}>
              <Button variant="destructive">
                <Icon name="trash" className="mr-2" />
                Delete
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

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
        <DialogBody>
          <Button>I should be focused</Button>
        </DialogBody>
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

    await userEvent.tab();
    await expect(triggerButton).toHaveFocus();

    await userEvent.click(triggerButton);

    await waitFor(() => {
      const firstButton = screen.getByRole("button", {
        name: /I should be focused/i,
      });
      expect(firstButton).toHaveFocus();
    });

    await userEvent.tab();

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    await expect(cancelButton).toHaveFocus();

    await userEvent.tab();

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await expect(submitButton).toHaveFocus();

    await userEvent.tab({ shift: true });

    await expect(cancelButton).toHaveFocus();

    await userEvent.keyboard("{Escape}");

    await waitFor(() => {
      expect(triggerButton).toHaveFocus();
    });
  },
};
