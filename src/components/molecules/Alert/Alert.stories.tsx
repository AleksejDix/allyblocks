import type { Meta, StoryObj } from '@storybook/react'
import { within, expect } from '@storybook/test'
import { AlertCircle, Info, Terminal, CheckCircle2, CreditCard, Bell } from 'lucide-react'

import { Alert, AlertTitle, AlertDescription, AlertClose } from './Alert'
import { ActionGroup } from '../ActionGroup'
import { Button } from '../../atoms/Button'

const meta = {
  component: Alert,
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
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

// Basic alert with title and description
export const Default: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Alert Title</AlertTitle>
      <AlertDescription>This is a standard alert with title and description.</AlertDescription>
    </Alert>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify alert role and structure
    const alert = canvas.getByRole('alert')
    await expect(alert).toHaveAttribute('data-slot', 'alert')

    // Check title and description
    const title = canvas.getByText('Alert Title')
    await expect(title).toHaveAttribute('data-slot', 'alert-title')

    const description = canvas.getByText(/This is a standard alert/)
    await expect(description).toHaveAttribute('data-slot', 'alert-description')
  },
}

// Credit card expiration alert with action button
export const CreditCardExpiration: Story = {
  render: () => (
    <Alert color="amber">
      <CreditCard className="h-4 w-4" />
      <AlertTitle>Credit Card Expiring Soon</AlertTitle>
      <AlertDescription>
        Your credit card ending in 4242 will expire in 2 weeks. Update your payment information to avoid service
        interruption.
      </AlertDescription>
      <div className="col-start-2 mt-3">
        <ActionGroup>
          <Button size="sm" variant="default">
            Update Card
          </Button>
          <Button size="sm" variant="ghost">
            Remind Later
          </Button>
        </ActionGroup>
      </div>
      <AlertClose />
    </Alert>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify alert structure
    const alert = canvas.getByRole('alert')
    await expect(alert).toBeInTheDocument()

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
    const closeButton = canvas.getByRole('button', { name: 'Close alert' })
    await expect(closeButton).toBeInTheDocument()
  },
}

// System update notification
export const SystemUpdate: Story = {
  render: () => (
    <Alert color="blue">
      <Bell className="h-4 w-4" />
      <AlertTitle>System Update Available</AlertTitle>
      <AlertDescription>A new system update is available with security improvements and bug fixes.</AlertDescription>
      <div className="col-start-2 mt-3">
        <ActionGroup>
          <Button size="sm" variant="default">
            Update Now
          </Button>
          <Button size="sm" variant="outline">
            Schedule Later
          </Button>
        </ActionGroup>
      </div>
    </Alert>
  ),
}

// Success alert with action
export const SuccessWithAction: Story = {
  render: () => (
    <Alert color="green">
      <CheckCircle2 className="h-4 w-4" />
      <AlertTitle>Changes Saved Successfully</AlertTitle>
      <AlertDescription>
        Your profile has been updated. Changes may take a few minutes to appear across all services.
      </AlertDescription>
      <div className="col-start-2 mt-3">
        <ActionGroup>
          <Button size="sm" variant="ghost">
            View Profile
          </Button>
        </ActionGroup>
      </div>
      <AlertClose />
    </Alert>
  ),
}

// Error alert with action
export const ErrorWithAction: Story = {
  render: () => (
    <Alert color="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Connection Failed</AlertTitle>
      <AlertDescription>
        Unable to connect to the server. Please check your internet connection and try again.
      </AlertDescription>
      <div className="col-start-2 mt-3">
        <ActionGroup>
          <Button size="sm" variant="default">
            Retry
          </Button>
          <Button size="sm" variant="ghost">
            Go Offline
          </Button>
        </ActionGroup>
      </div>
    </Alert>
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
        <Alert key={color} color={color}>
          <Info className="h-4 w-4" />
          <AlertTitle>{color.charAt(0).toUpperCase() + color.slice(1)} Alert</AlertTitle>
          <AlertDescription>This is an example of the {color} color variant for alerts.</AlertDescription>
        </Alert>
      ))}
    </div>
  ),
}

// Alert with only title
export const TitleOnly: Story = {
  render: () => (
    <Alert color="blue">
      <AlertTitle>Alert with title only</AlertTitle>
    </Alert>
  ),
}

// Alert with only description
export const DescriptionOnly: Story = {
  render: () => (
    <Alert color="green">
      <AlertDescription>This alert has only a description.</AlertDescription>
    </Alert>
  ),
}

// Alert with close button only
export const WithCloseOnly: Story = {
  render: () => (
    <Alert color="purple">
      <AlertTitle>Dismissible Alert</AlertTitle>
      <AlertDescription>This alert can be dismissed by clicking the close button.</AlertDescription>
      <AlertClose />
    </Alert>
  ),
}

// Command/Terminal style alert
export const CommandAlert: Story = {
  render: () => (
    <Alert color="slate">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Command</AlertTitle>
      <AlertDescription>
        <code>npm install @shadcn/ui</code>
      </AlertDescription>
      <div className="col-start-2 mt-3">
        <ActionGroup>
          <Button size="sm" variant="outline">
            Copy
          </Button>
        </ActionGroup>
      </div>
    </Alert>
  ),
}

// Comprehensive example showing best practices
export const BestPracticesExample: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Alert with ActionGroup and Button Components</h3>
        <Alert color="blue">
          <Info className="h-4 w-4" />
          <AlertTitle>Using Existing Components</AlertTitle>
          <AlertDescription>
            This alert demonstrates how to use ActionGroup and Button components for actions instead of custom
            AlertAction components.
          </AlertDescription>
          <div className="col-start-2 mt-3">
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
          <AlertClose />
        </Alert>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Vertical Action Layout</h3>
        <Alert color="amber">
          <CreditCard className="h-4 w-4" />
          <AlertTitle>Payment Method Update Required</AlertTitle>
          <AlertDescription>
            Your payment method will expire soon. Please update your billing information to continue using our services.
          </AlertDescription>
          <div className="col-start-2 mt-3">
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
        </Alert>
      </div>
    </div>
  ),
}
