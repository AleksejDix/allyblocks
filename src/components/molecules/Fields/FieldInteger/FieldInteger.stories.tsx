import type { Meta, StoryObj } from '@storybook/react-vite'
import { FieldInteger } from './FieldInteger'
import { withForm } from '../decorators/FormDecorator'

const meta: Meta<typeof FieldInteger> = {
  component: FieldInteger,
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
    min: {
      control: 'number',
      description: 'Minimum allowed value',
    },
    max: {
      control: 'number',
      description: 'Maximum allowed value',
    },
  },
}

export default meta
type Story = StoryObj<typeof FieldInteger>

export const Default: Story = {
  decorators: [withForm],
  args: {
    name: 'integer',
    label: 'Integer Input',
  },
}

export const WithPlaceholder: Story = {
  decorators: [withForm],
  args: {
    name: 'integer',
    label: 'Integer Input',
    placeholder: 'Enter an integer',
  },
}

export const WithMinMax: Story = {
  decorators: [withForm],
  args: {
    name: 'integer',
    label: 'Integer Input (1-10)',
    min: 1,
    max: 10,
    description: 'Please enter an integer between 1 and 10',
  },
}

export const Required: Story = {
  decorators: [withForm],
  args: {
    name: 'integer',
    label: 'Integer Input',
    required: true,
  },
}

export const WithDescription: Story = {
  decorators: [withForm],
  args: {
    name: 'integer',
    label: 'Integer Input',
    description: 'Enter a valid integer value',
  },
}

export const Disabled: Story = {
  decorators: [withForm],
  args: {
    name: 'integer',
    label: 'Integer Input',
    disabled: true,
  },
}
