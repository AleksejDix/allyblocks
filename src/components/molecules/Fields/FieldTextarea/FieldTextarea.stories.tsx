import type { Meta, StoryObj } from '@storybook/react-vite'
import { within, userEvent, expect } from 'storybook/test'
import { FieldTextarea } from './FieldTextarea'
import { withForm } from '../decorators/FormDecorator'

const meta: Meta<typeof FieldTextarea> = {
  component: FieldTextarea,
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
    minHeight: {
      control: 'number',
      description: 'Minimum height of the textarea',
    },
    maxHeight: {
      control: 'number',
      description: 'Maximum height of the textarea',
    },
    autoResize: {
      control: 'boolean',
      description: 'Whether the textarea should auto-resize',
    },
  },
}

export default meta
type Story = StoryObj<typeof FieldTextarea>

export const Default: Story = {
  decorators: [withForm],
  args: {
    name: 'message',
    label: 'Message',
    description: 'Enter your message (min 10 characters)',
    placeholder: 'Type your message here...',
    required: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Test validation on empty submission
    const submitButton = canvas.getByRole('button', { name: /submit/i })
    await userEvent.click(submitButton)

    // Fill with valid text
    const textarea = canvas.getByRole('textbox')
    await userEvent.type(textarea, 'This is a long enough message to pass validation')

    // Submit and check that it works
    await userEvent.click(submitButton)
  },
}

export const Basic: Story = {
  decorators: [withForm],
  args: {
    name: 'basic',
    label: 'Basic Textarea',
  },
}

export const WithPlaceholder: Story = {
  decorators: [withForm],
  args: {
    name: 'placeholder',
    label: 'Textarea with placeholder',
    placeholder: 'Enter your text here...',
  },
}

export const WithDescription: Story = {
  decorators: [withForm],
  args: {
    name: 'description',
    label: 'Textarea with description',
    description: 'Please provide detailed information',
  },
}

export const CustomHeight: Story = {
  decorators: [withForm],
  args: {
    name: 'feedback',
    label: 'Feedback',
    description: 'Provide detailed feedback',
    placeholder: 'Type your feedback here...',
    minHeight: 150,
    maxHeight: 300,
  },
}

export const Required: Story = {
  decorators: [withForm],
  args: {
    name: 'required',
    label: 'Required Textarea',
    required: true,
  },
}

export const Disabled: Story = {
  decorators: [withForm],
  args: {
    name: 'disabled',
    label: 'Disabled Textarea',
    description: 'This textarea is disabled',
    placeholder: 'You cannot type here',
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByRole('textbox')
    await expect(textarea).toBeDisabled()
  },
}
