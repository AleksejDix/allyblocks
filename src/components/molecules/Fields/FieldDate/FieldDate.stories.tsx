import type { Meta, StoryObj } from '@storybook/react-vite'
import { within, userEvent, screen } from 'storybook/test'
import { FieldDate } from './FieldDate'
import { withForm } from '../decorators/FormDecorator'

const meta: Meta<typeof FieldDate> = {
  component: FieldDate,
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
      description: 'Placeholder text for the date picker',
    },
  },
}

export default meta
type Story = StoryObj<typeof FieldDate>

export const Default: Story = {
  decorators: [withForm],
  args: {
    name: 'date',
    label: 'Date',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Click on the date picker input
    const input = canvas.getByPlaceholderText('Select a date')
    await userEvent.click(input)

    // Calendar should open
    const calendar = await screen.findByRole('dialog')
    
    // Select today's date
    const todayButton = within(calendar).getByRole('button', { name: /today/i })
    await userEvent.click(todayButton)
  },
}

export const WithPlaceholder: Story = {
  decorators: [withForm],
  args: {
    name: 'date',
    label: 'Date',
    placeholder: 'Pick your date',
  },
}

export const WithDescription: Story = {
  decorators: [withForm],
  args: {
    name: 'date',
    label: 'Date',
    description: 'Select your preferred date',
  },
}

export const Required: Story = {
  decorators: [withForm],
  args: {
    name: 'date',
    label: 'Date',
    required: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Try to submit without selecting a date to trigger error
    const submitButton = canvas.getByRole('button', { name: /submit/i })
    await userEvent.click(submitButton)
  },
}

export const Disabled: Story = {
  decorators: [withForm],
  args: {
    name: 'date',
    label: 'Date',
    disabled: true,
  },
}

export const WithDateFormat: Story = {
  decorators: [withForm],
  args: {
    name: 'date',
    label: 'Date',
    dateFormat: 'dd.MM.yyyy',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Click on the date picker input
    const input = canvas.getByPlaceholderText('Select a date')
    await userEvent.click(input)

    // Calendar should open - use screen for portal content
    const calendar = await screen.findByRole('dialog')
    
    // Find and click on today button which should be more reliable
    const todayButton = within(calendar).getByRole('button', { name: /today/i })
    await userEvent.click(todayButton)
  },
}