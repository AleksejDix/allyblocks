import type { Meta, StoryObj } from '@storybook/react-vite'
import { within, userEvent } from 'storybook/test'
import { FieldPassword } from './FieldPassword'
import { withForm } from '../decorators/FormDecorator'

const meta: Meta<typeof FieldPassword> = {
  component: FieldPassword,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'The name of the field',
    },
    label: {
      control: 'text',
      description: 'The label text for the field',
    },
    description: {
      control: 'text',
      description: 'Optional description text',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    showStrength: {
      control: 'boolean',
      description: 'Whether to show password strength indicator',
    },
  },
}

export default meta
type Story = StoryObj<typeof FieldPassword>

export const Default: Story = {
  decorators: [withForm],
  args: {
    name: 'password',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Test empty submission
    const input = canvas.getByLabelText(/password/i)
    await userEvent.click(input)
    await userEvent.tab()

    // Test valid password
    await userEvent.type(input, 'Password123!')
    await userEvent.tab()
  },
}

export const WithCustomLabel: Story = {
  decorators: [withForm],
  args: {
    name: 'password',
    label: 'Create Password',
  },
}

export const WithDescription: Story = {
  decorators: [withForm],
  args: {
    name: 'password',
    description:
      'Use a strong password with at least 8 characters, including uppercase, lowercase, numbers, and special characters.',
  },
}

export const WithStrengthIndicator: Story = {
  decorators: [withForm],
  args: {
    name: 'password',
    showStrength: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const input = canvas.getByLabelText(/password/i)
    await userEvent.type(input, 'weak')
    await userEvent.clear(input)
    await userEvent.type(input, 'StrongPassword123!')
  },
}

export const Required: Story = {
  decorators: [withForm],
  args: {
    name: 'password',
    required: true,
  },
}

export const Optional: Story = {
  decorators: [withForm],
  args: {
    name: 'password',
    required: false,
  },
}
