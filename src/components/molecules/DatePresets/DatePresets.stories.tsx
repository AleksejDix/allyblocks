import type { Meta, StoryObj } from '@storybook/react'
import { useForm, FormProvider } from 'react-hook-form'
import { within, userEvent, expect } from '@storybook/test'
import { startOfToday, endOfToday, subDays, subMonths, startOfDay, endOfDay, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns'
import { DatePresets, DatePreset } from './index'
import { FieldDate } from '@/components/molecules/Fields/FieldDate'
import { FieldDateRange } from '@/components/molecules/Fields/FieldDateRange'
import { Button } from '@/components/atoms/Button'

// Helper function to format date to YYYY-MM-DD string
const formatDateString = (date: Date): string => {
  return date.toLocaleDateString('en-CA')
}

const meta = {
  title: 'molecules/DatePresets',
  component: DatePresets,
  tags: ['autodocs'],
} satisfies Meta<typeof DatePresets>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    fromFieldName: 'startDate',
    toFieldName: 'endDate',
    children: null, // Children are defined in render
  },
  render: () => {
    const form = useForm({
      defaultValues: {
        startDate: undefined,
        endDate: undefined,
      },
    })

    return (
      <FormProvider {...form}>
        <div className="space-y-4">
          <DatePresets fromFieldName="startDate" toFieldName="endDate">
            <DatePreset 
              value="today" 
              label="Today"
              getDateRange={() => ({
                from: formatDateString(startOfToday()),
                to: formatDateString(endOfToday())
              })}
            />
            <DatePreset 
              value="lastWeek" 
              label="Last Week"
              getDateRange={() => ({
                from: formatDateString(startOfDay(subDays(new Date(), 7))),
                to: formatDateString(endOfDay(subDays(new Date(), 1)))
              })}
            />
            <DatePreset 
              value="lastMonth" 
              label="Last Month"
              getDateRange={() => ({
                from: formatDateString(startOfDay(subMonths(new Date(), 1))),
                to: formatDateString(endOfDay(subDays(new Date(), 1)))
              })}
            />
          </DatePresets>
        </div>
      </FormProvider>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Check all preset buttons are present
    const todayButton = canvas.getByRole('radio', { name: 'Today' })
    const lastWeekButton = canvas.getByRole('radio', { name: 'Last Week' })
    const lastMonthButton = canvas.getByRole('radio', { name: 'Last Month' })
    
    await expect(todayButton).toBeInTheDocument()
    await expect(lastWeekButton).toBeInTheDocument()
    await expect(lastMonthButton).toBeInTheDocument()
    
    // Initially no preset should be selected
    await expect(todayButton).toHaveAttribute('aria-checked', 'false')
    await expect(lastWeekButton).toHaveAttribute('aria-checked', 'false')
    await expect(lastMonthButton).toHaveAttribute('aria-checked', 'false')
    
    // Click Today and verify selection
    await userEvent.click(todayButton)
    await expect(todayButton).toHaveAttribute('aria-checked', 'true')
  },
}

export const WithDateFields: Story = {
  args: {
    fromFieldName: 'dateFrom',
    toFieldName: 'dateTo',
    children: null, // Children are defined in render
  },
  render: () => {
    const form = useForm({
      defaultValues: {
        dateFrom: undefined,
        dateTo: undefined,
      },
    })

    const watchedValues = form.watch()

    return (
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit((data) => console.log(data))} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Select Date Range</h3>
            <p className="text-sm text-muted-foreground">
              The preset will automatically highlight when you select dates that match a preset range
            </p>
            <DatePresets fromFieldName="dateFrom" toFieldName="dateTo">
              <DatePreset 
                value="today" 
                label="Today"
                getDateRange={() => ({
                  from: startOfToday(),
                  to: endOfToday()
                })}
              />
              <DatePreset 
                value="lastWeek" 
                label="Last Week"
                getDateRange={() => ({
                  from: startOfDay(subDays(new Date(), 7)),
                  to: endOfDay(subDays(new Date(), 1))
                })}
              />
              <DatePreset 
                value="lastMonth" 
                label="Last Month"
                getDateRange={() => ({
                  from: startOfDay(subMonths(new Date(), 1)),
                  to: endOfDay(subDays(new Date(), 1))
                })}
              />
            </DatePresets>
            <FieldDateRange>
              <FieldDate name="dateFrom" label="Start Date" placeholder="Select start date" />
              <FieldDate name="dateTo" label="End Date" placeholder="Select end date" />
            </FieldDateRange>

            {/* Debug display of selected values */}
            <div className="mt-4 p-4 bg-muted rounded-md text-sm">
              <p className="font-medium mb-2">Selected Values:</p>
              <p>
                From: {watchedValues.dateFrom ? new Date(watchedValues.dateFrom).toLocaleDateString() : 'Not selected'}
              </p>
              <p>To: {watchedValues.dateTo ? new Date(watchedValues.dateTo).toLocaleDateString() : 'Not selected'}</p>
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Initial state - no dates selected
    let fromText = canvas.getByText(/From:/).textContent
    let toText = canvas.getByText(/To:/).textContent
    expect(fromText).toContain('Not selected')
    expect(toText).toContain('Not selected')

    // Click on Today preset
    const todayButton = canvas.getByRole('radio', { name: 'Today' })
    const lastWeekButton = canvas.getByRole('radio', { name: 'Last Week' })
    
    await userEvent.click(todayButton)
    await expect(todayButton).toHaveAttribute('aria-checked', 'true')

    // Wait for the form to update
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Verify dates are now set
    fromText = canvas.getByText(/From:/).textContent
    toText = canvas.getByText(/To:/).textContent
    expect(fromText).not.toContain('Not selected')
    expect(toText).not.toContain('Not selected')

    // Both should show the same date (today)
    expect(fromText).toContain(new Date().getDate().toString())
    expect(toText).toContain(new Date().getDate().toString())
    
    // Now manually select dates using the date pickers to trigger auto-highlighting
    // First click Last Week to set different dates
    await userEvent.click(lastWeekButton)
    await expect(lastWeekButton).toHaveAttribute('aria-checked', 'true')
    await expect(todayButton).toHaveAttribute('aria-checked', 'false')
    
    // Wait for update
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    // Now click Today again to verify it works
    await userEvent.click(todayButton)
    await expect(todayButton).toHaveAttribute('aria-checked', 'true')
    await expect(lastWeekButton).toHaveAttribute('aria-checked', 'false')
  },
}

export const WithCustomPresets: Story = {
  args: {
    fromFieldName: 'dateFrom',
    toFieldName: 'dateTo',
    children: null, // Children are defined in render
  },
  render: () => {
    const form = useForm({
      defaultValues: {
        dateFrom: undefined,
        dateTo: undefined,
      },
    })

    const watchedValues = form.watch()

    return (
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit((data) => console.log(data))} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Financial Report Date Range</h3>
            <DatePresets fromFieldName="dateFrom" toFieldName="dateTo">
              <DatePreset 
                value="thisMonth" 
                label="This Month"
                getDateRange={() => ({
                  from: formatDateString(startOfMonth(new Date())),
                  to: formatDateString(endOfMonth(new Date()))
                })}
              />
              <DatePreset 
                value="lastMonth" 
                label="Last Month"
                getDateRange={() => ({
                  from: formatDateString(startOfMonth(subMonths(new Date(), 1))),
                  to: formatDateString(endOfMonth(subMonths(new Date(), 1)))
                })}
              />
              <DatePreset 
                value="thisYear" 
                label="This Year"
                getDateRange={() => ({
                  from: formatDateString(startOfYear(new Date())),
                  to: formatDateString(endOfYear(new Date()))
                })}
              />
              <DatePreset 
                value="q4-2024" 
                label="Q4 2024"
                getDateRange={() => ({
                  from: '2024-10-01',
                  to: '2024-12-31'
                })}
              />
            </DatePresets>
            <FieldDateRange>
              <FieldDate name="dateFrom" label="Start Date" placeholder="Select start date" />
              <FieldDate name="dateTo" label="End Date" placeholder="Select end date" />
            </FieldDateRange>

            {/* Debug display of selected values */}
            <div className="mt-4 p-4 bg-muted rounded-md text-sm">
              <p className="font-medium mb-2">Selected Values:</p>
              <p>
                From: {watchedValues.dateFrom ? new Date(watchedValues.dateFrom).toLocaleDateString() : 'Not selected'}
              </p>
              <p>To: {watchedValues.dateTo ? new Date(watchedValues.dateTo).toLocaleDateString() : 'Not selected'}</p>
            </div>
          </div>
          <Button type="submit">Generate Report</Button>
        </form>
      </FormProvider>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Check custom preset buttons are present
    const thisMonthButton = canvas.getByRole('radio', { name: 'This Month' })
    const lastMonthButton = canvas.getByRole('radio', { name: 'Last Month' })
    const thisYearButton = canvas.getByRole('radio', { name: 'This Year' })
    const q4Button = canvas.getByRole('radio', { name: 'Q4 2024' })
    
    await expect(thisMonthButton).toBeInTheDocument()
    await expect(lastMonthButton).toBeInTheDocument()
    await expect(thisYearButton).toBeInTheDocument()
    await expect(q4Button).toBeInTheDocument()
    
    // Click on Q4 2024 preset
    await userEvent.click(q4Button)
    await expect(q4Button).toHaveAttribute('aria-checked', 'true')
    
    // Wait for the form to update
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    // Verify dates are set to Q4 2024 range
    const fromText = canvas.getByText(/From:/).textContent
    const toText = canvas.getByText(/To:/).textContent
    // Check for October 1st and December 31st in any format
    expect(fromText).toMatch(/1\.10\.2024|10\/1\/2024|2024-10-01/)
    expect(toText).toMatch(/31\.12\.2024|12\/31\/2024|2024-12-31/)
  },
}
