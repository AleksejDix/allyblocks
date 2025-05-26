import type { Meta, StoryObj } from '@storybook/react'
import { within, expect, userEvent, waitFor } from '@storybook/test'
import { useState } from 'react'

import { Segments, Segment } from './Segments'
import { IconButton } from '../../atoms/IconButton'
import { Icon } from '../../atoms/Icon'
import {
  ActionMenu,
  ActionMenuTrigger,
  ActionMenuContent,
  ActionMenuItem,
  ActionMenuLabel,
} from '../../molecules/ActionMenu'

const meta = {
  component: Segments,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the segments (matches Button sizes)',
    },
    variant: {
      control: 'select',
      options: ['surface', 'classic'],
      description: 'Visual variant of the segments',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the segments are disabled',
    },
    loop: {
      control: 'boolean',
      description: 'Whether to loop through segments with keyboard navigation',
    },
  },
} satisfies Meta<typeof Segments>

export default meta
type Story = StoryObj<typeof meta>

// Basic usage with comprehensive accessibility tests
export const Default: Story = {
  args: {
    defaultValue: 'inbox',
    size: 'md',
    variant: 'surface',
  },
  render: (args) => (
    <Segments {...args}>
      <Segment value="inbox">Inbox</Segment>
      <Segment value="drafts">Drafts</Segment>
      <Segment value="sent">Sent</Segment>
    </Segments>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const segmentsRoot = canvas.getByRole('group')
    const inboxSegment = canvas.getByRole('radio', { name: 'Inbox' })
    const draftsSegment = canvas.getByRole('radio', { name: 'Drafts' })
    const sentSegment = canvas.getByRole('radio', { name: 'Sent' })

    // Accessibility tests
    await expect(segmentsRoot).toBeInTheDocument()
    await expect(segmentsRoot).toHaveAttribute('role', 'group')

    // Initial state
    await expect(inboxSegment).toHaveAttribute('aria-checked', 'true')
    await expect(draftsSegment).toHaveAttribute('aria-checked', 'false')
    await expect(sentSegment).toHaveAttribute('aria-checked', 'false')

    // Mouse interaction
    await userEvent.click(draftsSegment)
    await waitFor(() => {
      expect(draftsSegment).toHaveAttribute('aria-checked', 'true')
      expect(inboxSegment).toHaveAttribute('aria-checked', 'false')
    })

    // Keyboard navigation tests
    await userEvent.click(inboxSegment) // Focus first item
    await waitFor(() => {
      expect(inboxSegment).toHaveAttribute('aria-checked', 'true')
    })

    // Arrow key navigation
    await userEvent.keyboard('{ArrowRight}')
    await userEvent.keyboard('{Enter}')
    await waitFor(() => {
      expect(draftsSegment).toHaveAttribute('aria-checked', 'true')
    })
    expect(draftsSegment).toHaveFocus()

    await userEvent.keyboard('{ArrowRight}')
    await userEvent.keyboard('{Enter}')
    await waitFor(() => {
      expect(sentSegment).toHaveAttribute('aria-checked', 'true')
    })
    expect(sentSegment).toHaveFocus()

    // Test looping (should go back to first)
    await userEvent.keyboard('{ArrowRight}')
    await userEvent.keyboard('{Enter}')
    await waitFor(() => {
      expect(inboxSegment).toHaveAttribute('aria-checked', 'true')
    })
    expect(inboxSegment).toHaveFocus()

    // Arrow left navigation
    await userEvent.keyboard('{ArrowLeft}')
    await userEvent.keyboard('{Enter}')
    await waitFor(() => {
      expect(sentSegment).toHaveAttribute('aria-checked', 'true')
    })
    expect(sentSegment).toHaveFocus()

    // Home/End keys
    await userEvent.keyboard('{Home}')
    await userEvent.keyboard('{Enter}')
    await waitFor(() => {
      expect(inboxSegment).toHaveAttribute('aria-checked', 'true')
    })
    expect(inboxSegment).toHaveFocus()

    await userEvent.keyboard('{End}')
    await userEvent.keyboard('{Enter}')
    await waitFor(() => {
      expect(sentSegment).toHaveAttribute('aria-checked', 'true')
    })
    expect(sentSegment).toHaveFocus()
  },
}

// Size variants
export const SizeVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Small Size (h-8)</h3>
        <Segments defaultValue="option1" size="sm">
          <Segment value="option1">Option 1</Segment>
          <Segment value="option2">Option 2</Segment>
          <Segment value="option3">Option 3</Segment>
        </Segments>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Default Size (h-9)</h3>
        <Segments defaultValue="option1">
          <Segment value="option1">Option 1</Segment>
          <Segment value="option2">Option 2</Segment>
          <Segment value="option3">Option 3</Segment>
        </Segments>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Large Size (h-10)</h3>
        <Segments defaultValue="option1" size="lg">
          <Segment value="option1">Option 1</Segment>
          <Segment value="option2">Option 2</Segment>
          <Segment value="option3">Option 3</Segment>
        </Segments>
      </div>
    </div>
  ),
}

// Accessibility and disabled states
export const AccessibilityStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Disabled Group</h3>
        <Segments defaultValue="option1" disabled>
          <Segment value="option1">Option 1</Segment>
          <Segment value="option2">Option 2</Segment>
          <Segment value="option3">Option 3</Segment>
        </Segments>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Individual Disabled Items</h3>
        <Segments defaultValue="option1">
          <Segment value="option1">Available</Segment>
          <Segment value="option2" disabled>
            Disabled
          </Segment>
          <Segment value="option3">Available</Segment>
        </Segments>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Vertical Orientation</h3>
        <Segments defaultValue="dashboard" orientation="vertical">
          <Segment value="dashboard">Dashboard</Segment>
          <Segment value="analytics">Analytics</Segment>
          <Segment value="reports">Reports</Segment>
        </Segments>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Test disabled group - check what's actually rendering
    const disabledSegments = canvas.getAllByRole('radio').slice(0, 3)
    for (const segment of disabledSegments) {
      await expect(segment).toBeDisabled()
    }

    // Test individual disabled item
    const individualDisabled = canvas.getByRole('radio', { name: 'Disabled' })
    await expect(individualDisabled).toBeDisabled()

    // Test that disabled items are skipped in keyboard navigation
    const availableSegments = canvas.getAllByRole('radio', { name: 'Available' })
    const availableFirst = availableSegments[0]
    const availableSecond = availableSegments[1]

    await userEvent.click(availableFirst)
    await userEvent.keyboard('{ArrowRight}')
    await userEvent.keyboard('{Enter}')
    expect(availableSecond).toHaveFocus() // Should skip disabled item
  },
}

export const AppleCalendarExample: Story = {
  render: function AppleCalendarRender() {
    const [viewMode, setViewMode] = useState('Week')
    const [selectedDate, setSelectedDate] = useState('Today')

    const handleAction = (action: string, context?: any) => {
      console.log(`Calendar action: ${action}`, context)
    }

    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Apple macOS Calendar Interface</h3>
          <p className="text-sm text-muted-foreground">
            Real-world example with IconButton, Segments, and ActionMenu integration
          </p>
        </div>

        {/* Main Calendar Interface */}
        <div className="bg-background border border-border rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ActionMenu>
                <ActionMenuTrigger asChild>
                  <IconButton variant="outline" size="sm" aria-label="Add new event">
                    <Icon name="plus" />
                  </IconButton>
                </ActionMenuTrigger>
                <ActionMenuContent align="start">
                  <ActionMenuLabel>Create New</ActionMenuLabel>
                  <ActionMenuItem onAction={() => handleAction('create-event')}>
                    <Icon name="calendar-plus" />
                    Event
                  </ActionMenuItem>
                  <ActionMenuItem onAction={() => handleAction('create-meeting')}>
                    <Icon name="users" />
                    Meeting
                  </ActionMenuItem>
                </ActionMenuContent>
              </ActionMenu>
            </div>

            {/* Main View Switcher */}
            <Segments
              value={viewMode}
              onValueChange={(value) => setViewMode(value as string)}
              size="md"
              variant="surface"
            >
              <Segment value="Day">Day</Segment>
              <Segment value="Week">Week</Segment>
              <Segment value="Month">Month</Segment>
              <Segment value="Year">Year</Segment>
            </Segments>

            <ActionMenu>
              <ActionMenuTrigger asChild>
                <IconButton variant="ghost" size="sm" aria-label="Settings">
                  <Icon name="settings" />
                </IconButton>
              </ActionMenuTrigger>
              <ActionMenuContent align="end">
                <ActionMenuLabel>Settings</ActionMenuLabel>
                <ActionMenuItem onAction={() => handleAction('preferences')}>
                  <Icon name="settings" />
                  Preferences
                </ActionMenuItem>
                <ActionMenuItem onAction={() => handleAction('help')}>
                  <Icon name="help-circle" />
                  Help
                </ActionMenuItem>
              </ActionMenuContent>
            </ActionMenu>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <div className="flex items-center gap-2">
              <IconButton variant="ghost" size="sm" aria-label="Previous period">
                <Icon name="chevron-left" />
              </IconButton>
              <IconButton variant="ghost" size="sm" aria-label="Next period">
                <Icon name="chevron-right" />
              </IconButton>
              <span className="text-sm font-medium ml-2">December 2024</span>
            </div>

            <Segments
              value={selectedDate}
              onValueChange={(value) => setSelectedDate(value as string)}
              size="sm"
              variant="surface"
            >
              <Segment value="Today">Today</Segment>
              <Segment value="Tomorrow">Tomorrow</Segment>
              <Segment value="This Week">This Week</Segment>
            </Segments>
          </div>
        </div>

        {/* Compact Layout */}
        <div className="bg-background border border-border rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Calendar</span>
            <div className="flex items-center gap-2">
              <Segments defaultValue="Month" size="sm" variant="classic">
                <Segment value="Day">D</Segment>
                <Segment value="Week">W</Segment>
                <Segment value="Month">M</Segment>
                <Segment value="Year">Y</Segment>
              </Segments>
              <ActionMenu>
                <ActionMenuTrigger asChild>
                  <IconButton variant="ghost" size="sm" aria-label="More options">
                    <Icon name="more-horizontal" />
                  </IconButton>
                </ActionMenuTrigger>
                <ActionMenuContent align="end">
                  <ActionMenuItem onAction={() => handleAction('refresh')}>
                    <Icon name="refresh-cw" />
                    Refresh
                  </ActionMenuItem>
                  <ActionMenuItem onAction={() => handleAction('fullscreen')}>
                    <Icon name="maximize" />
                    Full Screen
                  </ActionMenuItem>
                </ActionMenuContent>
              </ActionMenu>
            </div>
          </div>
        </div>
      </div>
    )
  },
}
