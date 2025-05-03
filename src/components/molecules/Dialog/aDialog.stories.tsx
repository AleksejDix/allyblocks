import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor } from "@storybook/test";
import { Button } from "@/components/atoms/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./aDialog";

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Dialog>;

// Basic Dialog story
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
            This is a basic dialog with a title, description, and close button.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>This is the main content area of the dialog.</p>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click the trigger button
    const triggerButton = canvas.getByRole("button", { name: /open dialog/i });
    await userEvent.click(triggerButton);

    // Verify dialog is open by checking for visible content
    const title = canvas.getByRole("heading", { name: /dialog title/i });
    await expect(title).toBeVisible();

    const description = canvas.getByText(/This is a basic dialog/i);
    await expect(description).toBeVisible();

    // Test close button
    const closeButton = canvas.getByRole("button", { name: /close/i });
    await userEvent.click(closeButton);

    // Verify dialog is closed by checking content is not visible
    await waitFor(() => {
      expect(title).not.toBeVisible();
    });
  },
};

// Dialog with custom content
export const WithCustomContent: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Custom Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Custom Content Dialog</DialogTitle>
          <DialogDescription>
            This dialog demonstrates custom content layout.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Name
            </label>
            <input id="name" defaultValue="John Doe" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right">
              Username
            </label>
            <input
              id="username"
              defaultValue="@johndoe"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
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
          <Button variant="outline">Cancel</Button>
          <Button>Submit</Button>
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
