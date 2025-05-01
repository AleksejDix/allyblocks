import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor } from "@storybook/test";
import { Button } from "@/components/atoms/Button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./AlertDialog";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/molecules/Tooltip";
import { Trash2 } from "lucide-react";

const meta: Meta<typeof AlertDialog> = {
  component: AlertDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

// Basic AlertDialog story
export const Default: Story = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  args: {
    // Default args for the AlertDialog root, if any (often none needed)
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const triggerButton = canvas.getByRole("button", { name: /show dialog/i });

    expect(
      canvas.queryByRole("heading", { name: /are you absolutely sure/i })
    ).not.toBeInTheDocument();

    await userEvent.click(triggerButton);

    // 1. Wait for the dialog content container to appear in the DOM
    let contentElement: HTMLElement | null = null;
    await waitFor(() => {
      // Use document.querySelector as it might be portaled outside the canvas
      contentElement = document.querySelector(
        '[data-slot="alert-dialog-content"]'
      );
      expect(contentElement).toBeInTheDocument();
    });

    // Ensure contentElement is not null for TypeScript
    if (!contentElement) {
      throw new Error("Alert dialog content element not found after wait.");
    }

    // 2. Wait for the heading within the container to become visible
    await waitFor(() => {
      expect(
        within(contentElement!).getByRole("heading", {
          name: /are you absolutely sure/i,
          level: 2, // Assuming AlertDialogTitle renders an h2
        })
      ).toBeVisible();
    });

    // Now queries can safely use the container
    const title = within(contentElement).getByRole("heading", {
      name: /are you absolutely sure/i,
      level: 2,
    });

    await expect(title).toBeVisible();

    const description = within(contentElement).getByText(
      /This action cannot be undone/i
    );
    await expect(description).toBeVisible();

    const cancelButton = within(contentElement).getByRole("button", {
      name: /cancel/i,
    });
    await userEvent.click(cancelButton);

    await waitFor(() => {
      expect(
        document.querySelector('[data-slot="alert-dialog-content"]')
      ).not.toBeInTheDocument();
    });

    // --- Repeat for re-opening ---
    await userEvent.click(triggerButton);

    // 1. Wait for content container again
    let reopenedContentElement: HTMLElement | null = null;
    await waitFor(() => {
      reopenedContentElement = document.querySelector(
        '[data-slot="alert-dialog-content"]'
      );
      expect(reopenedContentElement).toBeInTheDocument();
    });

    if (!reopenedContentElement) {
      throw new Error(
        "Alert dialog content element not found after re-open wait."
      );
    }

    // 2. Wait for heading again
    await waitFor(() => {
      expect(
        within(reopenedContentElement!).getByRole("heading", {
          name: /are you absolutely sure/i,
          level: 2,
        })
      ).toBeVisible();
    });

    const continueButton = within(reopenedContentElement).getByRole("button", {
      name: /continue/i,
    });
    await userEvent.click(continueButton);

    await waitFor(() => {
      expect(
        document.querySelector('[data-slot="alert-dialog-content"]')
      ).not.toBeInTheDocument();
    });
  },
};

// Story with Icon Button and Tooltip Trigger
export const WithIconButtonAndTooltip: Story = {
  render: (args) => (
    <TooltipProvider>
      <AlertDialog {...args}>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete Item</span>
              </Button>
            </AlertDialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete Item</p>
          </TooltipContent>
        </Tooltip>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Yes, Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  ),
  args: {
    // Args specific to this story if needed
  },
};

// Story testing focus trap and restore
export const FocusManagement: Story = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog (Focus Test)</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Focus Management Test</AlertDialogTitle>
          <AlertDialogDescription>
            Tab should cycle between Cancel and Continue. Focus should return to
            the trigger button on close.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggerButton = canvas.getByRole("button", {
      name: /show dialog \(focus test\)/i,
    });

    // Optional: Ensure trigger has focus initially
    triggerButton.focus();
    await expect(triggerButton).toHaveFocus();

    // Open dialog
    await userEvent.click(triggerButton);

    // Wait for dialog content and find focusable elements
    let contentElement: HTMLElement | null = null;
    await waitFor(() => {
      contentElement = document.querySelector(
        '[data-slot="alert-dialog-content"]'
      );
      expect(contentElement).toBeInTheDocument();
    });
    if (!contentElement) throw new Error("Dialog content not found");
    const dialogWithin = within(contentElement);

    const cancelButton = dialogWithin.getByRole("button", { name: /cancel/i });
    const continueButton = dialogWithin.getByRole("button", {
      name: /continue/i,
    });

    // 1. Test initial focus (likely Cancel button)
    await waitFor(() => expect(cancelButton).toHaveFocus());

    // 2. Test Tab trapping: Cancel -> Continue
    await userEvent.tab();
    await expect(continueButton).toHaveFocus();

    // 3. Test Tab trapping: Continue -> Cancel (wrap around)
    await userEvent.tab();
    await expect(cancelButton).toHaveFocus();

    // 4. Test Shift+Tab trapping: Cancel -> Continue (wrap around)
    await userEvent.tab({ shift: true });
    await expect(continueButton).toHaveFocus();

    // 5. Test focus restore on Cancel
    await userEvent.click(cancelButton);
    await waitFor(() => {
      expect(
        document.querySelector('[data-slot="alert-dialog-content"]')
      ).not.toBeInTheDocument();
    });
    await expect(triggerButton).toHaveFocus();

    // --- Repeat for Action button ---

    // Re-open dialog
    await userEvent.click(triggerButton);
    await waitFor(() => {
      contentElement = document.querySelector(
        '[data-slot="alert-dialog-content"]'
      );
      expect(contentElement).toBeInTheDocument();
    });
    if (!contentElement) throw new Error("Dialog content not found on reopen");
    const reopenedDialogWithin = within(contentElement);
    const reopenedContinueButton = reopenedDialogWithin.getByRole("button", {
      name: /continue/i,
    });

    // Wait for focus to settle (e.g., on Cancel button)
    await waitFor(() =>
      expect(
        reopenedDialogWithin.getByRole("button", { name: /cancel/i })
      ).toHaveFocus()
    );

    // Click Continue button
    await userEvent.click(reopenedContinueButton);

    // 6. Test focus restore on Continue
    await waitFor(() => {
      expect(
        document.querySelector('[data-slot="alert-dialog-content"]')
      ).not.toBeInTheDocument();
    });
    await expect(triggerButton).toHaveFocus();
  },
};
