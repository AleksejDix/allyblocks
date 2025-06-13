import type { Meta, StoryObj } from '@storybook/react-vite'
import { within, userEvent, expect } from 'storybook/test'
import { FieldEmail } from './FieldEmail'
import { withForm } from '../decorators/FormDecorator'

const meta: Meta<typeof FieldEmail> = {
  component: FieldEmail,
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
  },
}

export default meta
type Story = StoryObj<typeof FieldEmail>

export const Default: Story = {
  decorators: [withForm],
  args: {
    name: 'email',
    label: 'Email',
  },
}

export const Required: Story = {
  decorators: [withForm],
  args: {
    name: 'email',
    required: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Test empty submission
    const input = canvas.getByRole('textbox', { name: /email/i })
    await userEvent.click(input)
    await userEvent.tab()
    await userEvent.keyboard('{enter}')

    // Test invalid email
    await userEvent.type(input, 'invalid-email')
    await userEvent.tab()

    // Test valid email
    await userEvent.clear(input)
    await userEvent.type(input, 'test@example.com')
    await userEvent.tab()
  },
}

export const WithDescription: Story = {
  decorators: [withForm],
  args: {
    name: 'email',
    label: 'Email',
    description: 'Please enter a valid email address',
  },
}

export const Disabled: Story = {
  decorators: [withForm],
  args: {
    name: 'email',
    label: 'Email',
    disabled: true,
  },
}
