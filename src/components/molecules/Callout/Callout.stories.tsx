import type { Meta, StoryObj } from '@storybook/react'
import { within, expect } from '@storybook/test'

import { Callout, CalloutTitle, CalloutDescription, CalloutClose } from './Callout'
import { ActionGroup } from '../ActionGroup'
import { Button } from '../../atoms/Button'

const meta = {
  component: Callout,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [
        'blue',
        'red',
        'green',
        'yellow',
        'purple',
        'orange',
        'pink',
        'emerald',
        'teal',
        'cyan',
        'sky',
        'indigo',
        'violet',
        'fuchsia',
        'rose',
        'amber',
        'lime',
        'zinc',
        'slate',
        'gray',
        'neutral',
        'stone',
        'destructive',
      ],
    },
  },
} satisfies Meta<typeof Callout>

export default meta
type Story = StoryObj<typeof meta>

// Basic callout with title and description
export const Default: Story = {
  render: () => (
    <Callout>
      <CalloutTitle>Callout Title</CalloutTitle>
      <CalloutDescription>This is a standard callout with title and description.</CalloutDescription>
    </Callout>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify callout role and structure
    const callout = canvas.getByRole('region')
    await expect(callout).toHaveAttribute('data-slot', 'callout')

    // Check title and description
    const title = canvas.getByText('Callout Title')
    await expect(title).toHaveAttribute('data-slot', 'callout-title')

    const description = canvas.getByText(/This is a standard callout/)
    await expect(description).toHaveAttribute('data-slot', 'callout-description')
  },
}

// Credit card expiration callout with action button
export const CreditCardExpiration: Story = {
  render: () => (
    <Callout color="amber">
      <CalloutTitle>Credit Card Expiring Soon</CalloutTitle>
      <CalloutDescription>
        Your credit card ending in 4242 will expire in 2 weeks. Update your payment information to avoid service
        interruption.
      </CalloutDescription>
      <div className="mt-3">
        <ActionGroup>
          <Button size="sm" variant="default">
            Update Card
          </Button>
          <Button size="sm" variant="ghost">
            Remind Later
          </Button>
        </ActionGroup>
      </div>
      <CalloutClose />
    </Callout>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify callout structure
    const callout = canvas.getByRole('region')
    await expect(callout).toBeInTheDocument()

    // Check title and description
    const title = canvas.getByText('Credit Card Expiring Soon')
    await expect(title).toBeInTheDocument()

    const description = canvas.getByText(/Your credit card ending in 4242/)
    await expect(description).toBeInTheDocument()

    // Check action buttons
    const updateButton = canvas.getByRole('button', { name: 'Update Card' })
    await expect(updateButton).toBeInTheDocument()

    const remindButton = canvas.getByRole('button', { name: 'Remind Later' })
    await expect(remindButton).toBeInTheDocument()

    // Check close button
    const closeButton = canvas.getByRole('button', { name: 'Close callout' })
    await expect(closeButton).toBeInTheDocument()
  },
}

// System update notification
export const SystemUpdate: Story = {
  render: () => (
    <Callout color="blue">
      <CalloutTitle>System Update Available</CalloutTitle>
      <CalloutDescription>
        A new system update is available with security improvements and bug fixes.
      </CalloutDescription>
      <div className="mt-3">
        <ActionGroup>
          <Button size="sm" variant="default">
            Update Now
          </Button>
          <Button size="sm" variant="outline">
            Schedule Later
          </Button>
        </ActionGroup>
      </div>
    </Callout>
  ),
}

// Success callout with action
export const SuccessWithAction: Story = {
  render: () => (
    <Callout color="green">
      <CalloutTitle>Changes Saved Successfully</CalloutTitle>
      <CalloutDescription>
        Your profile has been updated. Changes may take a few minutes to appear across all services.
      </CalloutDescription>
      <div className="mt-3">
        <ActionGroup>
          <Button size="sm" variant="ghost">
            View Profile
          </Button>
        </ActionGroup>
      </div>
      <CalloutClose />
    </Callout>
  ),
}

// Error callout with action
export const ErrorWithAction: Story = {
  render: () => (
    <Callout color="destructive">
      <CalloutTitle>Connection Failed</CalloutTitle>
      <CalloutDescription>
        Unable to connect to the server. Please check your internet connection and try again.
      </CalloutDescription>
      <div className="mt-3">
        <ActionGroup>
          <Button size="sm" variant="default">
            Retry
          </Button>
          <Button size="sm" variant="ghost">
            Go Offline
          </Button>
        </ActionGroup>
      </div>
    </Callout>
  ),
}

// All Colors Showcase
export const AllColors: Story = {
  render: () => (
    <div className="space-y-4">
      {(
        [
          'blue',
          'red',
          'green',
          'yellow',
          'purple',
          'orange',
          'pink',
          'emerald',
          'teal',
          'cyan',
          'sky',
          'indigo',
          'violet',
          'fuchsia',
          'rose',
          'amber',
          'lime',
          'zinc',
          'slate',
          'gray',
          'neutral',
          'stone',
          'destructive',
        ] as const
      ).map((color) => (
        <Callout key={color} color={color}>
          <CalloutTitle>{color.charAt(0).toUpperCase() + color.slice(1)} Callout</CalloutTitle>
          <CalloutDescription>This is an example of the {color} color variant for callouts.</CalloutDescription>
        </Callout>
      ))}
    </div>
  ),
}

// Callout with only title
export const TitleOnly: Story = {
  render: () => (
    <Callout color="blue">
      <CalloutTitle>Callout with title only</CalloutTitle>
    </Callout>
  ),
}

// Callout with only description
export const DescriptionOnly: Story = {
  render: () => (
    <Callout color="green">
      <CalloutDescription>This callout has only a description.</CalloutDescription>
    </Callout>
  ),
}

// Callout with close button only
export const WithCloseOnly: Story = {
  render: () => (
    <Callout color="purple">
      <CalloutTitle>Dismissible Callout</CalloutTitle>
      <CalloutDescription>This callout can be dismissed by clicking the close button.</CalloutDescription>
      <CalloutClose />
    </Callout>
  ),
}

// Command/Terminal style callout
export const CommandCallout: Story = {
  render: () => (
    <Callout color="slate">
      <CalloutTitle>Command</CalloutTitle>
      <CalloutDescription>
        <code>npm install @shadcn/ui</code>
      </CalloutDescription>
      <div className="mt-3">
        <ActionGroup>
          <Button size="sm" variant="outline">
            Copy
          </Button>
        </ActionGroup>
      </div>
    </Callout>
  ),
}

// Comprehensive example showing best practices
export const BestPracticesExample: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Callout with ActionGroup and Button Components</h3>
        <Callout color="blue">
          <CalloutTitle>Using Existing Components</CalloutTitle>
          <CalloutDescription>
            This callout demonstrates how to use ActionGroup and Button components for actions instead of custom
            CalloutAction components.
          </CalloutDescription>
          <div className="mt-3">
            <ActionGroup>
              <Button size="sm" variant="default">
                Primary Action
              </Button>
              <Button size="sm" variant="outline">
                Secondary Action
              </Button>
              <Button size="sm" variant="ghost">
                Tertiary Action
              </Button>
            </ActionGroup>
          </div>
          <CalloutClose />
        </Callout>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Vertical Action Layout</h3>
        <Callout color="amber">
          <CalloutTitle>Payment Method Update Required</CalloutTitle>
          <CalloutDescription>
            Your payment method will expire soon. Please update your billing information to continue using our services.
          </CalloutDescription>
          <div className="mt-3">
            <ActionGroup direction="vertical">
              <Button size="sm" variant="default" className="w-full">
                Update Payment Method
              </Button>
              <Button size="sm" variant="outline" className="w-full">
                View Billing History
              </Button>
              <Button size="sm" variant="ghost" className="w-full">
                Contact Support
              </Button>
            </ActionGroup>
          </div>
        </Callout>
      </div>
    </div>
  ),
}
