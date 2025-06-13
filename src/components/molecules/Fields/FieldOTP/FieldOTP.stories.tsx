import type { Meta, StoryObj } from '@storybook/react-vite'
import { within, userEvent, expect } from 'storybook/test'
import { FieldOTP } from './FieldOTP'
import { withForm } from '../decorators/FormDecorator'

const meta: Meta<typeof FieldOTP> = {
  component: FieldOTP,
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
    disabled: {
      control: 'boolean',
      description: 'Whether the field is disabled',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum length of the OTP',
    },
  },
}

export default meta
type Story = StoryObj<typeof FieldOTP>

export const Default: Story = {
  decorators: [withForm],
  args: {
    name: 'otp',
    label: 'Verification Code',
    description: 'Enter the 6-digit code sent to your phone',
    required: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Test entering valid input
    const input = canvas.getByRole('textbox')
    await userEvent.type(input, '123456')
  },
}

export const FourDigitPin: Story = {
  decorators: [withForm],
  args: {
    name: 'pin',
    label: 'PIN Code',
    maxLength: 4,
    description: 'Enter your 4-digit PIN',
    required: true,
  },
}

export const WithDescription: Story = {
  decorators: [withForm],
  args: {
    name: 'otp',
    label: 'Verification Code',
    description: 'Check your email for the verification code',
  },
}

export const Required: Story = {
  decorators: [withForm],
  args: {
    name: 'otp',
    label: 'Verification Code',
    required: true,
  },
}

export const Optional: Story = {
  decorators: [withForm],
  args: {
    name: 'otp',
    label: 'Backup Code',
    description: 'Enter your backup code (optional)',
    required: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.tab()
    await userEvent.tab()

    // Verify no required error
    const error = canvas.queryByText(/is required/i)
    await expect(error).not.toBeInTheDocument()
  },
}

export const Disabled: Story = {
  decorators: [withForm],
  args: {
    name: 'otp',
    label: 'Verification Code',
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox')
    await expect(input).toBeDisabled()
  },
}
