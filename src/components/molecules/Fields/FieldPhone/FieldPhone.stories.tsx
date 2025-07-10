import type { Meta, StoryObj } from '@storybook/react-vite'
import { within, userEvent } from 'storybook/test'
import { FieldPhone } from './FieldPhone'
import { withForm } from '../decorators/FormDecorator'

const meta: Meta<typeof FieldPhone> = {
  component: FieldPhone,
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
    defaultCountry: {
      control: 'text',
      description: 'The default country code',
    },
  },
}

export default meta
type Story = StoryObj<typeof FieldPhone>

export const Default: Story = {
  decorators: [withForm],
  args: {
    name: 'phone',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Test entering a valid phone number
    const input = canvas.getByPlaceholderText(/enter phone number/i)
    await userEvent.type(input, '+1234567890')
    await userEvent.tab()
  },
}

export const WithCustomLabel: Story = {
  decorators: [withForm],
  args: {
    name: 'phone',
    label: 'Contact Number',
  },
}

export const WithDescription: Story = {
  decorators: [withForm],
  args: {
    name: 'phone',
    description: 'Please enter your phone number with country code',
  },
}

export const Required: Story = {
  decorators: [withForm],
  args: {
    name: 'phone',
    required: true,
  },
}

export const WithDefaultCountry: Story = {
  decorators: [withForm],
  args: {
    name: 'phone',
    defaultCountry: 'CH',
  },
}

export const Disabled: Story = {
  decorators: [withForm],
  args: {
    name: 'phone',
    disabled: true,
  },
}
