import type { Meta, StoryObj } from '@storybook/react-vite'
import { within, userEvent, screen } from 'storybook/test'
import { FieldDateRange } from './FieldDateRange'
import { FieldDate } from '../FieldDate'
import { withForm } from '../decorators/FormDecorator'

const meta: Meta<typeof FieldDateRange> = {
  component: FieldDateRange,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The main label for the date range',
    },
    description: {
      control: 'text',
      description: 'Optional description text for the date range',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
}

export default meta
type Story = StoryObj<typeof FieldDateRange>

export const Default: Story = {
  decorators: [withForm],
  args: {
    label: 'Date Range',
  },
  render: (args) => (
    <FieldDateRange {...args}>
      <FieldDate
        name="startDate"
        label="From"
        placeholder="Select start date"
      />
      <FieldDate
        name="endDate"
        label="To"
        placeholder="Select end date"
      />
    </FieldDateRange>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Click on the from date picker
    const fromInput = canvas.getByPlaceholderText('Select start date')
    await userEvent.click(fromInput)

    // Calendar should open
    const calendar = await screen.findByRole('dialog')
    
    // Select today's date
    const todayButton = within(calendar).getByRole('button', { name: /today/i })
    await userEvent.click(todayButton)

    // Click on the to date picker
    const toInput = canvas.getByPlaceholderText('Select end date')
    await userEvent.click(toInput)

    // Calendar should open again
    const calendar2 = await screen.findByRole('dialog')
    
    // Select today's date
    const todayButton2 = within(calendar2).getByRole('button', { name: /today/i })
    await userEvent.click(todayButton2)
  },
}

export const WithDescription: Story = {
  decorators: [withForm],
  args: {
    label: 'Event Date Range',
    description: 'Select the start and end dates for the event',
  },
  render: (args) => (
    <FieldDateRange {...args}>
      <FieldDate
        name="eventStart"
        label="Event Start"
        placeholder="When does it begin?"
        description="The first day of the event"
      />
      <FieldDate
        name="eventEnd"
        label="Event End"
        placeholder="When does it end?"
        description="The last day of the event"
      />
    </FieldDateRange>
  ),
}

export const Required: Story = {
  decorators: [withForm],
  args: {
    label: 'Date Range',
  },
  render: (args) => (
    <FieldDateRange {...args}>
      <FieldDate
        name="startDate"
        label="From"
        required
      />
      <FieldDate
        name="endDate"
        label="To"
        required
      />
    </FieldDateRange>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Try to submit without selecting dates to trigger error
    const submitButton = canvas.getByRole('button', { name: /submit/i })
    await userEvent.click(submitButton)
  },
}

export const Disabled: Story = {
  decorators: [withForm],
  args: {
    label: 'Date Range',
  },
  render: (args) => (
    <FieldDateRange {...args}>
      <FieldDate
        name="startDate"
        label="From"
        disabled
      />
      <FieldDate
        name="endDate"
        label="To"
        disabled
      />
    </FieldDateRange>
  ),
}

export const ProductAvailability: Story = {
  decorators: [withForm],
  args: {
    label: 'Product Availability',
    description: 'Set the availability period for this product',
  },
  render: (args) => (
    <FieldDateRange {...args}>
      <FieldDate
        name="availableFrom"
        label="Available From"
        placeholder="Product launch date"
        description="When customers can start ordering"
      />
      <FieldDate
        name="availableUntil"
        label="Available Until"
        placeholder="Product end date"
        description="Last day for orders"
      />
    </FieldDateRange>
  ),
}

export const WithoutMainLabel: Story = {
  decorators: [withForm],
  render: () => (
    <FieldDateRange>
      <FieldDate
        name="startDate"
        label="Start Date"
      />
      <FieldDate
        name="endDate"
        label="End Date"
      />
    </FieldDateRange>
  ),
}