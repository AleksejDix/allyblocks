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
  subcomponents: {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
  },
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

export const WithIconButtonAndTooltip: Story = {
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
        <Button variant="outline">Show Dialog (Escape to Close)</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Press Escape to Close</AlertDialogTitle>
          <AlertDialogDescription>
            This dialog can be closed by pressing the Escape key on your keyboard.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.keyboard('{Tab}')

    const triggerButton = canvas.getByRole('button')
    expect(triggerButton).toHaveFocus()

    await expect(triggerButton).toHaveFocus()

    await userEvent.click(triggerButton)

    await waitFor(() => {
      const alertDialog = screen.getByRole('alertdialog')
      expect(alertDialog).toBeInTheDocument()
    })

    await userEvent.keyboard('{Escape}')

    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    })

    await expect(triggerButton).toHaveFocus()
  },
}

export const FocusLock: Story = {
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

    const buttons = screen.getAllByRole('button')

    expect(buttons[0]).toHaveFocus()

    await userEvent.tab()
    expect(buttons[1]).toHaveFocus()

    await userEvent.tab()
    expect(buttons[0]).toHaveFocus()

    await userEvent.tab({ shift: true })
    expect(buttons[1]).toHaveFocus()

    await userEvent.keyboard('{Escape}')

    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    })

    await expect(triggerButton).toHaveFocus()
  },
}

export const WithActions: Story = {
  render: (args) => {
    const handleValueChange = (value: string, event: Event, context?: Record<string, unknown>) => {
      console.log('Action value:', value, 'Context:', context)
    }

    return (
      <AlertDialog {...args} onValueChange={handleValueChange}>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Dialog with Actions</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Action Demonstration</AlertDialogTitle>
            <AlertDialogDescription>
              This dialog demonstrates the action mechanism with values and context.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              value="cancel"
              onAction={(e) => console.log('Cancel clicked', e)}
              context={{ source: 'cancel-button' }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              value="confirm"
              onAction={(e) => console.log('Confirm clicked', e)}
              context={{ source: 'confirm-button', timestamp: new Date().toISOString() }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'This example demonstrates using the action mechanism to handle user interactions with additional context.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.keyboard('{Tab}')
    const triggerButton = canvas.getByRole('button')

    await userEvent.click(triggerButton)

    await waitFor(() => {
      const alertDialog = screen.getByRole('alertdialog')
      expect(alertDialog).toBeInTheDocument()
    })

    const confirmButton = screen.getByRole('button', { name: /confirm/i })
    await userEvent.click(confirmButton)

    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    })
  },
}
