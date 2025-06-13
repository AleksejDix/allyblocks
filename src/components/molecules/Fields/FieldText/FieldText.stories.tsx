import type { Meta, StoryObj } from '@storybook/react-vite'
import { within, userEvent, expect } from 'storybook/test'
import { FieldText } from './FieldText'
import { withForm } from '../decorators/FormDecorator'

const meta: Meta<typeof FieldText> = {
  component: FieldText,
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
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
  },
}

export default meta
type Story = StoryObj<typeof FieldText>

export const Default: Story = {
  decorators: [withForm],
  args: {
    name: 'text',
    label: 'Text Input',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const input = canvas.getByLabelText(/text input/i)
    await userEvent.click(input)
    await userEvent.tab()

    const submitButton = canvas.getByRole('button', { name: /submit/i })
    await userEvent.click(submitButton)

    await userEvent.type(input, 'Sample text')
    await userEvent.tab()
  },
}

export const WithPlaceholder: Story = {
  decorators: [withForm],
  args: {
    name: 'text',
    label: 'Text Input',
    placeholder: 'Enter text here',
  },
}

export const WithDescription: Story = {
  decorators: [withForm],
  args: {
    name: 'text',
    label: 'Text Input',
    description: 'Enter your text in the field above',
  },
}

export const Required: Story = {
  decorators: [withForm],
  args: {
    name: 'text',
    label: 'Text Input',
    required: true,
  },
}

export const Disabled: Story = {
  decorators: [withForm],
  args: {
    name: 'text',
    label: 'Text Input',
    disabled: true,
  },
}
