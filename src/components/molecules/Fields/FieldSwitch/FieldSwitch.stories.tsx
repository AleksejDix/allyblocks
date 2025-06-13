import type { Meta, StoryObj } from '@storybook/react-vite'
import { within, userEvent, expect } from 'storybook/test'
import { FieldSwitch } from './FieldSwitch'
import { withForm } from '../decorators/FormDecorator'

const meta: Meta<typeof FieldSwitch> = {
  component: FieldSwitch,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FieldSwitch>

export const Default: Story = {
  decorators: [withForm],
  args: {
    name: 'notifications',
    label: 'Enable Notifications',
    description: 'Receive notifications when someone mentions you',
  },
}

export const WithLabels: Story = {
  decorators: [withForm],
  args: {
    name: 'darkMode',
    label: 'Dark Mode',
    onLabel: 'On',
    offLabel: 'Off',
  },
}

export const AlignRight: Story = {
  decorators: [withForm],
  args: {
    name: 'maintenance',
    label: 'Maintenance Mode',
    description: 'Put the system in maintenance mode',
    alignRight: true,
    onLabel: 'Enabled',
    offLabel: 'Disabled',
  },
}

export const WithDescription: Story = {
  decorators: [withForm],
  args: {
    name: 'newsletter',
    label: 'Newsletter Subscription',
    description: 'Receive our weekly newsletter',
  },
}

export const Required: Story = {
  decorators: [withForm],
  args: {
    name: 'terms',
    label: 'Accept Terms',
    description: 'You must accept the terms to continue',
    required: true,
  },
}

export const Disabled: Story = {
  decorators: [withForm],
  args: {
    name: 'advanced',
    label: 'Advanced Features',
    description: 'Enable advanced features (requires admin privileges)',
    disabled: true,
  },
}
