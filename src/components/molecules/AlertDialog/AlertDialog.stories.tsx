import type { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, expect, waitFor, screen } from '@storybook/test'
import { Button } from '@/components/atoms/Button'
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
} from './AlertDialog'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/molecules/Tooltip'
import { IconButton } from '@/components/atoms/IconButton'
import { Icon } from '@/components/atoms/Icon'
const meta: Meta<typeof AlertDialog> = {
  component: AlertDialog,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof AlertDialog>

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
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const button = canvas.getByRole('button', { name: /show dialog/i })

    await userEvent.click(button)

    await waitFor(() => {
      const alertDialog = screen.getByRole('alertdialog')
      expect(alertDialog).toBeInTheDocument()
    })

    const cancelButton = screen.getByRole('button', { name: /cancel/i })

    await userEvent.click(cancelButton)

    await waitFor(() => {
      const alertDialog = screen.getByRole('alertdialog')
      expect(alertDialog).not.toBeVisible()
    })
  },
}

export const IconButtonTooltip: Story = {
  render: (args) => (
    <TooltipProvider>
      <AlertDialog {...args}>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>
              <IconButton variant="outline" aria-label="Delete Item">
                <Icon name="trash" />
              </IconButton>
            </AlertDialogTrigger>
          </TooltipTrigger>
          <TooltipContent>Delete Item</TooltipContent>
        </Tooltip>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the item.
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
  args: {},
}

export const Keyboard: Story = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Focus Lock Test</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Focus Lock Test</AlertDialogTitle>
          <AlertDialogDescription>
            Tab should cycle through the buttons and return to the first button when reaching the end.
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
    const canvas = within(canvasElement)

    await userEvent.keyboard('{Tab}')

    const triggerButton = canvas.getByRole('button')
    expect(triggerButton).toHaveFocus()

    await userEvent.click(triggerButton)

    await waitFor(() => {
      const alertDialog = screen.getByRole('alertdialog')
      expect(alertDialog).toBeInTheDocument()
    })

    // Get all focusable buttons in the dialog
    const buttons = screen.getAllByRole('button')

    // Cancel button should be focused initially
    expect(buttons[0]).toHaveFocus()

    // Tab to the Continue button
    await userEvent.tab()
    expect(buttons[1]).toHaveFocus()

    // Tab again should cycle back to the first button (Cancel)
    await userEvent.tab()
    expect(buttons[0]).toHaveFocus()

    // Tab backwards (shift+tab) should cycle to the last button
    await userEvent.tab({ shift: true })
    expect(buttons[1]).toHaveFocus()

    // Close dialog and verify focus returns to trigger
    await userEvent.keyboard('{Escape}')

    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    })

    await expect(triggerButton).toHaveFocus()
  },
}
