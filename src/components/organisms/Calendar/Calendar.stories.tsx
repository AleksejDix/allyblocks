import type { Meta, StoryObj } from '@storybook/react-vite'
import { within, expect, userEvent } from 'storybook/test'
import { addDays } from 'date-fns'
import * as React from 'react'

import { Calendar } from '@/components/organisms/Calendar/'

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  parameters: {
    docs: {
      description: {
        component:
          'A date picker calendar component built on top of react-day-picker. For time zone support, refer to [DayPicker Time Zone documentation](https://daypicker.dev/docs/time-zone).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'multiple', 'range'],
      description: 'The selection mode of the calendar',
      defaultValue: 'single',
    },
    showOutsideDays: {
      control: 'boolean',
      description: 'Show days from the previous and next months',
      defaultValue: true,
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the calendar',
      defaultValue: false,
    },
    initialFocus: {
      control: 'boolean',
      description: 'Whether to focus the calendar initially',
      defaultValue: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof Calendar>

// Default single selection calendar
export const Default: Story = {
  args: {
    mode: 'single',
    showOutsideDays: true,
    className: 'rounded-md border',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify calendar is rendered
    const calendar = canvas.getByRole('grid')
    await expect(calendar).toBeInTheDocument()

    // Check if navigation buttons are present
    const prevButton = canvas.getByRole('button', { name: /previous/i })
    const nextButton = canvas.getByRole('button', { name: /next/i })
    await expect(prevButton).toBeInTheDocument()
    await expect(nextButton).toBeInTheDocument()

    // Verify days are rendered
    const days = canvas.getAllByRole('gridcell')
    await expect(days.length).toBeGreaterThan(0)
  },
}

// Calendar with selected date
export const WithSelectedDate: Story = {
  render: (args) => {
    const [selected, setSelected] = React.useState<Date | undefined>(new Date())
    
    return (
      <Calendar
        {...args}
        mode="single"
        selected={selected}
        onSelect={setSelected}
        className="rounded-md border"
      />
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify calendar is rendered
    const calendar = canvas.getByRole('grid')
    await expect(calendar).toBeInTheDocument()

    // Wait for the calendar to stabilize
    await new Promise(resolve => setTimeout(resolve, 100))

    // Find today's date as a number
    const todayNum = new Date().getDate()
    
    // Find all grid cells
    const gridCells = canvas.getAllByRole('gridcell')
    
    // Find the cell containing today's date and check if it's selected
    let selectedCell = null
    for (const cell of gridCells) {
      const button = cell.querySelector('button')
      if (button && button.textContent === todayNum.toString()) {
        // In react-day-picker v9, selection is on the gridcell
        if (cell.getAttribute('aria-selected') === 'true' || 
            cell.getAttribute('data-selected') === 'true') {
          selectedCell = cell
          break
        }
      }
    }

    await expect(selectedCell).not.toBeNull()
    // Check for selected class on the cell
    await expect(selectedCell).toHaveClass('bg-primary')
  },
}

// Calendar in range selection mode
export const RangeSelection: Story = {
  render: (args) => {
    const [selected, setSelected] = React.useState<{ from?: Date; to?: Date } | undefined>({
      from: new Date(),
      to: addDays(new Date(), 5),
    })
    
    return (
      <Calendar
        {...args}
        mode="range"
        selected={selected}
        onSelect={setSelected}
        className="rounded-md border"
      />
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify calendar is rendered
    const calendar = canvas.getByRole('grid')
    await expect(calendar).toBeInTheDocument()

    // Wait for the calendar to stabilize
    await new Promise(resolve => setTimeout(resolve, 100))

    // Find today's date as a number
    const todayNum = new Date().getDate()
    
    // Find all grid cells
    const gridCells = canvas.getAllByRole('gridcell')
    
    // Find the cell containing today's date and check if it's part of the range
    let selectedCell = null
    for (const cell of gridCells) {
      const button = cell.querySelector('button')
      if (button && button.textContent === todayNum.toString()) {
        // Check if this cell is selected (part of range)
        if (cell.getAttribute('aria-selected') === 'true' || 
            cell.getAttribute('data-selected') === 'true') {
          selectedCell = cell
          break
        }
      }
    }

    await expect(selectedCell).not.toBeNull()
  },
}

// Calendar in multiple selection mode
export const MultipleSelection: Story = {
  render: (args) => {
    const [selected, setSelected] = React.useState<Date[] | undefined>([
      new Date(),
      addDays(new Date(), 2),
      addDays(new Date(), 5),
    ])
    
    return (
      <Calendar
        {...args}
        mode="multiple"
        selected={selected}
        onSelect={setSelected}
        className="rounded-md border"
      />
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify calendar is rendered
    const calendar = canvas.getByRole('grid')
    await expect(calendar).toBeInTheDocument()

    // Wait for the calendar to stabilize
    await new Promise(resolve => setTimeout(resolve, 100))

    // Find today's date as a number
    const todayNum = new Date().getDate()
    
    // Find all grid cells
    const gridCells = canvas.getAllByRole('gridcell')
    
    // Find the cell containing today's date and check if it's selected
    let selectedCell = null
    for (const cell of gridCells) {
      const button = cell.querySelector('button')
      if (button && button.textContent === todayNum.toString()) {
        // Check if this cell is selected
        if (cell.getAttribute('aria-selected') === 'true' || 
            cell.getAttribute('data-selected') === 'true') {
          selectedCell = cell
          break
        }
      }
    }

    await expect(selectedCell).not.toBeNull()
  },
}

// Calendar with disabled dates
export const DisabledDates: Story = {
  args: {
    mode: 'single',
    disabled: [{ from: new Date(), to: addDays(new Date(), 5) }],
    className: 'rounded-md border',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify calendar is rendered
    const calendar = canvas.getByRole('grid')
    await expect(calendar).toBeInTheDocument()

    // Find today's date as a number
    const today = new Date()
    const todayNum = today.getDate()

    // Find a button with today's date (might be multiple if month view shows previous/next month dates)
    const todayButtons = canvas.getAllByText(todayNum.toString())

    // At least one of the buttons should be disabled
    let hasDisabledButton = false
    for (const button of todayButtons) {
      if (button.hasAttribute('disabled')) {
        hasDisabledButton = true
        break
      }
    }

    await expect(hasDisabledButton).toBe(true)
  },
}

// Test navigation
export const Navigation: Story = {
  args: {
    mode: 'single',
    className: 'rounded-md border',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify calendar is rendered
    const calendar = canvas.getByRole('grid')
    await expect(calendar).toBeInTheDocument()

    // Find the caption element with a more specific selector - the month and year display
    const captionElement = canvas.getByText(
      /^(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{4}$/,
    )

    // Ensure we found the correct element - it should have aria-live attribute
    await expect(captionElement).toHaveAttribute('aria-live', 'polite')

    const initialMonthLabel = captionElement.textContent

    // Click navigation button to go to next month
    const nextButton = canvas.getByRole('button', { name: /next/i })
    await userEvent.click(nextButton)

    // Wait for UI update
    await new Promise((resolve) => setTimeout(resolve, 100))

    // Get month after navigation
    const updatedMonthLabel = captionElement.textContent

    // Verify month has changed
    await expect(initialMonthLabel).not.toEqual(updatedMonthLabel)
    await expect(updatedMonthLabel).toMatch(
      /^(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{4}$/,
    )
  },
}

// Calendar in footer of form
export const InFormFooter: Story = {
  render: () => (
    <div className="space-y-4 rounded-md border p-4">
      <div className="space-y-2">
        <h3 className="font-medium">Select Date</h3>
        <p className="text-sm text-muted-foreground">Please select a date for your appointment</p>
      </div>
      <Calendar className="rounded-md border" />
      <div className="flex justify-end">
        <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Confirm</button>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify calendar is rendered
    const calendar = canvas.getByRole('grid')
    await expect(calendar).toBeInTheDocument()

    // Check if the form container has the calendar
    const header = canvas.getByText('Select Date')
    await expect(header).toBeInTheDocument()

    // Check if confirm button is present
    const confirmButton = canvas.getByRole('button', { name: 'Confirm' })
    await expect(confirmButton).toBeInTheDocument()
  },
}
