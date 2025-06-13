import type { Meta, StoryObj } from '@storybook/react-vite'
import { within, userEvent, expect } from 'storybook/test'
import { FieldNumber } from './FieldNumber'
import { withForm } from '../decorators/FormDecorator'

const meta: Meta<typeof FieldNumber> = {
  component: FieldNumber,
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
    step: {
      control: 'number',
      description: 'Step increment value',
    },
  },
}

export default meta
type Story = StoryObj<typeof FieldNumber>

export const Default: Story = {
  decorators: [withForm],
  args: {
    name: 'number',
    label: 'Number Input',
  },
}

export const WithPlaceholder: Story = {
  decorators: [withForm],
  args: {
    name: 'number',
    label: 'Number Input',
    placeholder: 'Enter a number',
  },
}

export const WithMinMax: Story = {
  decorators: [withForm],
  args: {
    name: 'number',
    label: 'Number Input (1-10)',
    min: 1,
    max: 10,
    description: 'Please enter a number between 1 and 10',
  },
}

export const WithStep: Story = {
  decorators: [withForm],
  args: {
    name: 'number',
    label: 'Number Input (step 0.5)',
    step: 0.5,
    description: 'Use the arrows to increment by 0.5',
  },
}

export const Required: Story = {
  decorators: [withForm],
  args: {
    name: 'number',
    label: 'Required Number',
    required: true,
  },
}

export const WithDescription: Story = {
  decorators: [withForm],
  args: {
    name: 'number',
    label: 'Number Input',
    description: 'Enter a valid number value',
  },
}

export const Disabled: Story = {
  decorators: [withForm],
  args: {
    name: 'number',
    label: 'Disabled Number',
    disabled: true,
  },
}
