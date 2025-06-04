import type { Meta, StoryObj } from '@storybook/react-vite'
import { within, expect } from 'storybook/test'

import { Callout, CalloutClose } from './Callout'
import { ActionGroup } from '../ActionGroup'
import { Button } from '../../atoms/Button'
import { Text } from '../../atoms/Text'

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
      <Text as="h2" weight="semibold">
        Callout Title
      </Text>
      <Text>This is a standard callout with title and description.</Text>
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
      <Text>Credit Card Expiring Soon</Text>
      <Text>
        Your credit card ending in 4242 will expire in 2 weeks. Update your payment information to avoid service
        interruption.
      </Text>
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
      <Text>System Update Available</Text>
      <Text>A new system update is available with security improvements and bug fixes.</Text>
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
      <Text>Changes Saved Successfully</Text>
      <Text>Your profile has been updated. Changes may take a few minutes to appear across all services.</Text>
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
      <Text>Connection Failed</Text>
      <Text>Unable to connect to the server. Please check your internet connection and try again.</Text>
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
          <Text>{color.charAt(0).toUpperCase() + color.slice(1)} Callout</Text>
          <Text>This is an example of the {color} color variant for callouts.</Text>
        </Callout>
      ))}
    </div>
  ),
}

// Callout with only title
export const TitleOnly: Story = {
  render: () => (
    <Callout color="blue">
      <Text>Callout with title only</Text>
    </Callout>
  ),
}

// Callout with only description
export const DescriptionOnly: Story = {
  render: () => (
    <Callout color="green">
      <Text>This callout has only a description.</Text>
    </Callout>
  ),
}

// Callout with close button only
export const WithCloseOnly: Story = {
  render: () => (
    <Callout color="purple">
      <Text>Dismissible Callout</Text>
      <Text>This callout can be dismissed by clicking the close button.</Text>
      <CalloutClose />
    </Callout>
  ),
}

// Command/Terminal style callout
export const CommandCallout: Story = {
  render: () => (
    <Callout color="slate">
      <Text>Command</Text>
      <Text>
        <code>npm install @shadcn/ui</code>
      </Text>
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
          <Text>Using Existing Components</Text>
          <Text>
            This callout demonstrates how to use ActionGroup and Button components for actions instead of custom
            CalloutAction components.
          </Text>
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
          <Text>Payment Method Update Required</Text>
          <Text>
            Your payment method will expire soon. Please update your billing information to continue using our services.
          </Text>
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
