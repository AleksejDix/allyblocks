import type { Meta, StoryObj } from '@storybook/react-vite'
import { within, expect } from 'storybook/test'

import { Callout, CalloutClose } from './Callout'
import { ActionGroup } from '../ActionGroup'
import { Button } from '../../atoms/Button'
import { Text } from '../../atoms/Text'
import { Stack } from '../../atoms/Stack'

const meta = {
  component: Callout,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Callout>

export default meta
type Story = StoryObj<typeof meta>

// Basic callout with title, description and action
export const Default: Story = {
  render: () => (
    <Callout>
      <Stack gap="xs">
        <Text as="h2" type="heading" size="lg">
          Schedule your annual check-up
        </Text>
        <Text tone="muted">
          Book your yearly physical examination to maintain optimal health and catch any issues early.
        </Text>
      </Stack>
      <ActionGroup>
        <Button variant="default">Book appointment</Button>
      </ActionGroup>
    </Callout>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const callout = canvas.getByRole('region')
    await expect(callout).toHaveAttribute('data-slot', 'callout')

    const title = canvas.getByText('Schedule your annual check-up')
    await expect(title).toBeInTheDocument()
  },
}

// Dismissible callout with close button
export const WithClose: Story = {
  render: () => (
    <Callout>
      <Stack gap="xs">
        <Text as="h2" type="heading" size="lg">
          Flu vaccination available
        </Text>
        <Text tone="muted">Protect yourself and others by getting your annual flu vaccine. Walk-ins welcome.</Text>
      </Stack>
      <ActionGroup>
        <Button variant="default">Schedule vaccination</Button>
      </ActionGroup>
      <CalloutClose />
    </Callout>
  ),
}

// Callout with primary and secondary actions
export const WithSecondaryAction: Story = {
  render: () => (
    <Callout>
      <Stack gap="xs">
        <Text as="h2" type="heading" size="lg">
          Update your emergency contacts
        </Text>
        <Text tone="muted">
          Your emergency contact information is outdated. Please update it to ensure we can reach someone in case of
          emergency.
        </Text>
      </Stack>
      <ActionGroup>
        <Button variant="default">Update contacts</Button>
        <Button variant="outline">Review information</Button>
      </ActionGroup>
    </Callout>
  ),
}

// Callout with primary, secondary, and tertiary actions
export const WithTertiaryAction: Story = {
  render: () => (
    <Callout>
      <Stack gap="xs">
        <Text as="h2" type="heading" size="lg">
          Complete your health profile
        </Text>
        <Text tone="muted">
          Help us provide better care by completing your medical history and current medications list.
        </Text>
      </Stack>
      <ActionGroup>
        <Button variant="default">Complete profile</Button>
        <Button variant="outline">Save for later</Button>
        <Button variant="link">Skip for now</Button>
      </ActionGroup>
    </Callout>
  ),
}
