import type { Meta, StoryObj } from '@storybook/react-vite'
import { within, userEvent, expect } from 'storybook/test'
import { FieldCheckbox } from './FieldCheckbox'
import { withForm } from '../decorators/FormDecorator'

const meta: Meta<typeof FieldCheckbox> = {
  component: FieldCheckbox,
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
  },
}

export default meta
type Story = StoryObj<typeof FieldCheckbox>

export const Default: Story = {
  decorators: [withForm],
  args: {
    name: 'acceptTerms',
    label: 'I accept the terms and conditions',
    description: 'By checking this box, you agree to our Terms of Service and Privacy Policy',
    required: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Test empty submission
    const submitButton = canvas.getByRole('button', { name: /submit/i })
    await userEvent.click(submitButton)

    // Check the checkbox
    const checkbox = canvas.getByRole('checkbox')
    await userEvent.click(checkbox)

    // Submit with checkbox checked
    await userEvent.click(submitButton)
  },
}

export const Basic: Story = {
  decorators: [withForm],
  args: {
    name: 'basic',
    label: 'Basic checkbox',
  },
}

export const WithDescription: Story = {
  decorators: [withForm],
  args: {
    name: 'withDesc',
    label: 'Checkbox with description',
    description: 'This is a helpful description for the checkbox',
  },
}

export const Required: Story = {
  decorators: [withForm],
  args: {
    name: 'required',
    label: 'Required checkbox',
    required: true,
  },
}

export const Disabled: Story = {
  decorators: [withForm],
  args: {
    name: 'disabled',
    label: 'This checkbox is disabled',
    description: 'You cannot interact with this checkbox',
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole('checkbox')
    await expect(checkbox).toBeDisabled()
  },
}
