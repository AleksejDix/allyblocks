import type { Meta, StoryObj } from '@storybook/react'
import { within, expect, userEvent } from '@storybook/test'
import { useState } from 'react'

import { Segments, Segment } from './Segments'
import { Button } from '../../atoms/Button'
import { IconButton } from '../../atoms/IconButton'
import { Icon } from '../../atoms/Icon'
import {
  ActionMenu,
  ActionMenuTrigger,
  ActionMenuContent,
  ActionMenuItem,
  ActionMenuSeparator,
  ActionMenuGroup,
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
      options: ['sm', 'default', 'lg'],
      description: 'Size of the segments (now matches Button sizes)',
    },
    variant: {
      control: 'select',
      options: ['surface', 'classic'],
      description: 'Visual variant of the segments',
    },
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Selection mode - single or multiple',
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

// Basic usage
export const Default: Story = {
  args: {
    defaultValue: 'inbox',
    size: 'default',
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
    const inboxSegment = canvas.getByRole('button', { name: 'Inbox' })
    const draftsSegment = canvas.getByRole('button', { name: 'Drafts' })

    await expect(inboxSegment).toBeInTheDocument()
    await expect(inboxSegment).toHaveAttribute('aria-pressed', 'true')
    await expect(draftsSegment).toHaveAttribute('aria-pressed', 'false')

    // Test interaction
    await userEvent.click(draftsSegment)
    await expect(draftsSegment).toHaveAttribute('aria-pressed', 'true')
    await expect(inboxSegment).toHaveAttribute('aria-pressed', 'false')
  },
}

// Size variants
export const SizeVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Small Size</h3>
        <Segments defaultValue="option1" size="sm">
          <Segment value="option1">Option 1</Segment>
          <Segment value="option2">Option 2</Segment>
          <Segment value="option3">Option 3</Segment>
        </Segments>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Default Size</h3>
        <Segments defaultValue="option1" size="default">
          <Segment value="option1">Option 1</Segment>
          <Segment value="option2">Option 2</Segment>
          <Segment value="option3">Option 3</Segment>
        </Segments>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Large Size</h3>
        <Segments defaultValue="option1" size="lg">
          <Segment value="option1">Option 1</Segment>
          <Segment value="option2">Option 2</Segment>
          <Segment value="option3">Option 3</Segment>
        </Segments>
      </div>
    </div>
  ),
}

// Variant styles
export const VariantStyles: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Surface Variant (Default)</h3>
        <Segments defaultValue="view" variant="surface">
          <Segment value="view">View</Segment>
          <Segment value="edit">Edit</Segment>
          <Segment value="settings">Settings</Segment>
        </Segments>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Classic Variant</h3>
        <Segments defaultValue="view" variant="classic">
          <Segment value="view">View</Segment>
          <Segment value="edit">Edit</Segment>
          <Segment value="settings">Settings</Segment>
        </Segments>
      </div>
    </div>
  ),
}

// Multiple selection
export const MultipleSelection: Story = {
  render: function MultipleSelectionRender() {
    const [selectedValues, setSelectedValues] = useState<string[]>(['inbox', 'drafts'])

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Multiple Selection Mode</h3>
          <p className="text-xs text-muted-foreground">
            Selected: {selectedValues.length > 0 ? selectedValues.join(', ') : 'None'}
          </p>
        </div>
        <Segments
          type="multiple"
          value={selectedValues}
          onValueChange={(value) => setSelectedValues(value as string[])}
        >
          <Segment value="inbox">Inbox</Segment>
          <Segment value="drafts">Drafts</Segment>
          <Segment value="sent">Sent</Segment>
          <Segment value="archive">Archive</Segment>
        </Segments>
      </div>
    )
  },
}

// Vertical orientation
export const VerticalOrientation: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Vertical Layout</h3>
        <Segments defaultValue="dashboard" orientation="vertical">
          <Segment value="dashboard">Dashboard</Segment>
          <Segment value="analytics">Analytics</Segment>
          <Segment value="reports">Reports</Segment>
          <Segment value="settings">Settings</Segment>
        </Segments>
      </div>
    </div>
  ),
}

// Disabled states
export const DisabledStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Entire Group Disabled</h3>
        <Segments defaultValue="option1" disabled>
          <Segment value="option1">Option 1</Segment>
          <Segment value="option2">Option 2</Segment>
          <Segment value="option3">Option 3</Segment>
        </Segments>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Individual Segments Disabled</h3>
        <Segments defaultValue="option1">
          <Segment value="option1">Available</Segment>
          <Segment value="option2" disabled>
            Disabled
          </Segment>
          <Segment value="option3">Available</Segment>
        </Segments>
      </div>
    </div>
  ),
}

// With icons and content
export const WithContent: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-sm font-medium">With Icons and Text</h3>
        <Segments defaultValue="list" size="lg">
          <Segment value="list">
            <span className="flex items-center gap-2">
              <span>📋</span>
              List
            </span>
          </Segment>
          <Segment value="grid">
            <span className="flex items-center gap-2">
              <span>⊞</span>
              Grid
            </span>
          </Segment>
          <Segment value="card">
            <span className="flex items-center gap-2">
              <span>🃏</span>
              Card
            </span>
          </Segment>
        </Segments>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Icon Only</h3>
        <Segments defaultValue="bold">
          <Segment value="bold" aria-label="Bold">
            <strong>B</strong>
          </Segment>
          <Segment value="italic" aria-label="Italic">
            <em>I</em>
          </Segment>
          <Segment value="underline" aria-label="Underline">
            <u>U</u>
          </Segment>
        </Segments>
      </div>
    </div>
  ),
}

// Controlled usage
export const ControlledUsage: Story = {
  render: function ControlledUsageRender() {
    const [selectedTab, setSelectedTab] = useState('overview')

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Controlled Segments</h3>
          <p className="text-xs text-muted-foreground">Current selection: {selectedTab}</p>
        </div>

        <Segments value={selectedTab} onValueChange={(value) => setSelectedTab(value as string)}>
          <Segment value="overview">Overview</Segment>
          <Segment value="details">Details</Segment>
          <Segment value="history">History</Segment>
        </Segments>

        <div className="mt-4 p-4 border rounded-lg">
          {selectedTab === 'overview' && <div>Overview content goes here...</div>}
          {selectedTab === 'details' && <div>Details content goes here...</div>}
          {selectedTab === 'history' && <div>History content goes here...</div>}
        </div>
      </div>
    )
  },
}

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Navigation tabs */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Navigation Tabs</h3>
        <Segments defaultValue="dashboard" size="lg">
          <Segment value="dashboard">Dashboard</Segment>
          <Segment value="projects">Projects</Segment>
          <Segment value="team">Team</Segment>
          <Segment value="settings">Settings</Segment>
        </Segments>
      </div>

      {/* View switcher */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">View Switcher</h3>
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Products</h4>
          <Segments defaultValue="grid" size="sm">
            <Segment value="list" aria-label="List view">
              📋
            </Segment>
            <Segment value="grid" aria-label="Grid view">
              ⊞
            </Segment>
          </Segments>
        </div>
      </div>

      {/* Filter controls */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Filter Controls</h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">Status</label>
            <Segments defaultValue="all" size="default" className="mt-2">
              <Segment value="all">All</Segment>
              <Segment value="active">Active</Segment>
              <Segment value="inactive">Inactive</Segment>
            </Segments>
          </div>
          <div>
            <label className="text-sm font-medium">Priority</label>
            <Segments type="multiple" defaultValue={['high']} size="default" className="mt-2">
              <Segment value="low">Low</Segment>
              <Segment value="medium">Medium</Segment>
              <Segment value="high">High</Segment>
            </Segments>
          </div>
        </div>
      </div>

      {/* Text formatting */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Text Formatting</h3>
        <div className="space-y-3">
          <Segments type="multiple" defaultValue={['bold']} size="default">
            <Segment value="bold" aria-label="Bold">
              <strong>B</strong>
            </Segment>
            <Segment value="italic" aria-label="Italic">
              <em>I</em>
            </Segment>
            <Segment value="underline" aria-label="Underline">
              <u>U</u>
            </Segment>
          </Segments>
        </div>
      </div>
    </div>
  ),
}

// Interactive playground
export const Playground: Story = {
  args: {
    size: 'default',
    variant: 'surface',
    type: 'single',
    orientation: 'horizontal',
    disabled: false,
    loop: true,
    defaultValue: 'option1',
  },
  render: (args) => (
    <Segments {...args}>
      <Segment value="option1">Option 1</Segment>
      <Segment value="option2">Option 2</Segment>
      <Segment value="option3">Option 3</Segment>
    </Segments>
  ),
}

// Design System Consistency Check
export const DesignSystemConsistency: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Design System Consistency Test</h3>
        <p className="text-sm text-muted-foreground">
          Testing hover, focus, cursor, borders, and interaction states between Button and Segments
        </p>
      </div>

      {/* Interaction States Comparison */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Border & Contrast Comparison</h4>
          <div className="space-y-4">
            <div>
              <span className="text-xs text-muted-foreground block mb-2">Button outline variant (with borders):</span>
              <div className="space-x-2">
                <Button size="sm" variant="outline">
                  Small
                </Button>
                <Button size="default" variant="outline">
                  Default
                </Button>
                <Button size="lg" variant="outline">
                  Large
                </Button>
              </div>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block mb-2">
                Segments surface variant (now with borders):
              </span>
              <div className="space-x-2">
                <Segments defaultValue="option1" size="sm">
                  <Segment value="option1">Small</Segment>
                  <Segment value="option2">Segments</Segment>
                </Segments>
                <Segments defaultValue="option1" size="default">
                  <Segment value="option1">Default</Segment>
                  <Segment value="option2">Segments</Segment>
                </Segments>
                <Segments defaultValue="option1" size="lg">
                  <Segment value="option1">Large</Segment>
                  <Segment value="option2">Segments</Segment>
                </Segments>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Secondary/Classic Variant Comparison</h4>
          <div className="space-y-4">
            <div>
              <span className="text-xs text-muted-foreground block mb-2">Button secondary variant:</span>
              <div className="space-x-2">
                <Button size="sm" variant="secondary">
                  Small
                </Button>
                <Button size="default" variant="secondary">
                  Default
                </Button>
                <Button size="lg" variant="secondary">
                  Large
                </Button>
              </div>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block mb-2">Segments classic variant:</span>
              <div className="space-x-2">
                <Segments defaultValue="option1" size="sm" variant="classic">
                  <Segment value="option1">Small</Segment>
                  <Segment value="option2">Segments</Segment>
                </Segments>
                <Segments defaultValue="option1" size="default" variant="classic">
                  <Segment value="option1">Default</Segment>
                  <Segment value="option2">Segments</Segment>
                </Segments>
                <Segments defaultValue="option1" size="lg" variant="classic">
                  <Segment value="option1">Large</Segment>
                  <Segment value="option2">Segments</Segment>
                </Segments>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Mixed Usage Example - Real World</h4>
          <div className="flex items-center gap-4 flex-wrap">
            <Button variant="outline">Create New</Button>
            <Segments defaultValue="list" size="default">
              <Segment value="list">List</Segment>
              <Segment value="grid">Grid</Segment>
              <Segment value="card">Card</Segment>
            </Segments>
            <Button variant="ghost">Settings</Button>
          </div>
          <div className="flex items-center gap-4 flex-wrap mt-3">
            <Button variant="secondary">Export</Button>
            <Segments defaultValue="week" size="default" variant="classic">
              <Segment value="day">Day</Segment>
              <Segment value="week">Week</Segment>
              <Segment value="month">Month</Segment>
            </Segments>
            <Button variant="outline">Filter</Button>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Visual Consistency Checklist</h4>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>
              ✅ <strong>Heights:</strong> Perfect alignment across all sizes
            </p>
            <p>
              ✅ <strong>Borders:</strong> Both have consistent border styling
            </p>
            <p>
              ✅ <strong>Shadows:</strong> Both use shadow-xs for depth
            </p>
            <p>
              ✅ <strong>Hover:</strong> Both show subtle background changes
            </p>
            <p>
              ✅ <strong>Focus:</strong> Both show consistent focus rings (Tab to test)
            </p>
            <p>
              ✅ <strong>Cursor:</strong> Both show pointer cursor on hover
            </p>
            <p>
              ✅ <strong>Transitions:</strong> Both have smooth state changes
            </p>
            <p>
              ✅ <strong>Typography:</strong> Both use text-sm and font-medium
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
}

// Button vs Segments size comparison
export const ButtonSizeComparison: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Size Comparison: Button vs Segments (Updated)</h3>
        <p className="text-sm text-muted-foreground">
          Segments now match Button component heights and styling for perfect alignment
        </p>
      </div>

      {/* Inline Comparison */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Inline Comparison (Same Line) - Perfect Alignment!</h4>
        <div className="space-y-4">
          <div>
            <span className="text-xs text-muted-foreground block mb-2">Small sizes inline (both h-8):</span>
            <Button size="sm" variant="outline">
              Small Button
            </Button>{' '}
            <Segments defaultValue="option1" size="sm" className="inline-flex">
              <Segment value="option1">Small</Segment>
              <Segment value="option2">Segments</Segment>
            </Segments>
          </div>

          <div>
            <span className="text-xs text-muted-foreground block mb-2">Default sizes inline (both h-9):</span>
            <Button size="default" variant="outline">
              Default Button
            </Button>{' '}
            <Segments defaultValue="option1" size="default" className="inline-flex">
              <Segment value="option1">Default</Segment>
              <Segment value="option2">Segments</Segment>
            </Segments>
          </div>

          <div>
            <span className="text-xs text-muted-foreground block mb-2">Large sizes inline (both h-10):</span>
            <Button size="lg" variant="outline">
              Large Button
            </Button>{' '}
            <Segments defaultValue="option1" size="lg" className="inline-flex">
              <Segment value="option1">Large</Segment>
              <Segment value="option2">Segments</Segment>
            </Segments>
          </div>
        </div>
      </div>

      {/* Analysis */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Updated Size Analysis</h4>
        <div className="text-xs space-y-1 text-muted-foreground">
          <p>
            <strong>Button sizes:</strong> sm (h-8), default (h-9), lg (h-10)
          </p>
          <p>
            <strong>Segments container:</strong> sm (h-8), default (h-9), lg (h-10)
          </p>
          <p>
            <strong>Segment items:</strong> sm (h-6), default (h-7), lg (h-8)
          </p>
          <p>
            <strong>Font sizes:</strong> Both use text-sm and font-medium for consistency
          </p>
          <p>
            <strong>✅ Perfect alignment:</strong> All Button and Segments sizes now match exactly!
          </p>
        </div>
      </div>
    </div>
  ),
}

// Apple macOS Calendar Example
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
            Recreating the classic Calendar app with IconButton, Segments, and ActionMenu components
          </p>
        </div>

        {/* Calendar Header */}
        <div className="bg-background border border-border rounded-lg p-4 space-y-4">
          {/* Top Navigation Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Calendar Grid Icon */}
              <IconButton variant="outline" size="sm" aria-label="Calendar grid view">
                <Icon name="calendar" />
              </IconButton>

              {/* Inbox Icon */}
              <IconButton variant="outline" size="sm" aria-label="Inbox">
                <Icon name="inbox" />
              </IconButton>

              {/* Add Button with ActionMenu */}
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
                  <ActionMenuItem onAction={() => handleAction('create-reminder')}>
                    <Icon name="bell" />
                    Reminder
                  </ActionMenuItem>
                  <ActionMenuSeparator />
                  <ActionMenuItem onAction={() => handleAction('import-calendar')}>
                    <Icon name="upload" />
                    Import Calendar
                  </ActionMenuItem>
                </ActionMenuContent>
              </ActionMenu>
            </div>

            {/* View Mode Segments - Main Feature */}
            <Segments
              value={viewMode}
              onValueChange={(value) => setViewMode(value as string)}
              size="default"
              variant="surface"
            >
              <Segment value="Day">Day</Segment>
              <Segment value="Week">Week</Segment>
              <Segment value="Month">Month</Segment>
              <Segment value="Year">Year</Segment>
            </Segments>

            {/* Search and Settings with ActionMenu */}
            <div className="flex items-center gap-2">
              <IconButton variant="ghost" size="sm" aria-label="Search events">
                <Icon name="search" />
              </IconButton>

              <ActionMenu>
                <ActionMenuTrigger asChild>
                  <IconButton variant="ghost" size="sm" aria-label="Settings">
                    <Icon name="settings" />
                  </IconButton>
                </ActionMenuTrigger>
                <ActionMenuContent align="end">
                  <ActionMenuLabel>Calendar Settings</ActionMenuLabel>
                  <ActionMenuItem onAction={() => handleAction('preferences')}>
                    <Icon name="settings" />
                    Preferences
                  </ActionMenuItem>
                  <ActionMenuItem onAction={() => handleAction('accounts')}>
                    <Icon name="user" />
                    Accounts
                  </ActionMenuItem>
                  <ActionMenuSeparator />
                  <ActionMenuGroup>
                    <ActionMenuItem onAction={() => handleAction('export')}>
                      <Icon name="download" />
                      Export Calendar
                    </ActionMenuItem>
                    <ActionMenuItem onAction={() => handleAction('print')}>
                      <Icon name="printer" />
                      Print
                    </ActionMenuItem>
                  </ActionMenuGroup>
                  <ActionMenuSeparator />
                  <ActionMenuItem onAction={() => handleAction('help')}>
                    <Icon name="help-circle" />
                    Help
                  </ActionMenuItem>
                </ActionMenuContent>
              </ActionMenu>
            </div>
          </div>

          {/* Date Navigation */}
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div className="flex items-center gap-2">
              <IconButton variant="ghost" size="sm" aria-label="Previous period">
                <Icon name="chevron-left" />
              </IconButton>
              <IconButton variant="ghost" size="sm" aria-label="Next period">
                <Icon name="chevron-right" />
              </IconButton>
              <span className="text-sm font-medium ml-2">December 2024</span>
              <IconButton variant="ghost" size="sm" aria-label="Go to today">
                <Icon name="calendar-days" />
              </IconButton>
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

          {/* Current View Display */}
          <div className="bg-muted/30 rounded-lg p-6 text-center">
            <div className="space-y-2">
              <h4 className="text-lg font-medium">{viewMode} View</h4>
              <p className="text-sm text-muted-foreground">
                Showing {selectedDate.toLowerCase()} in {viewMode.toLowerCase()} format
              </p>
              <div className="grid grid-cols-7 gap-2 mt-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-xs text-muted-foreground p-2">
                    {day}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Alternative Compact Layout */}
        <div className="bg-background border border-border rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IconButton variant="ghost" size="sm" aria-label="Calendar menu">
                <Icon name="calendar" />
              </IconButton>
              <span className="text-sm font-medium">Calendar</span>
              <div className="w-px h-4 bg-border" />
              <span className="text-xs text-muted-foreground">December 2024</span>
            </div>

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
                  <ActionMenuItem onAction={() => handleAction('sync')}>
                    <Icon name="refresh-cw" />
                    Sync Calendars
                  </ActionMenuItem>
                  <ActionMenuSeparator />
                  <ActionMenuItem onAction={() => handleAction('fullscreen')}>
                    <Icon name="maximize" />
                    Full Screen
                  </ActionMenuItem>
                </ActionMenuContent>
              </ActionMenu>
            </div>
          </div>
        </div>

        {/* Advanced Toolbar Example */}
        <div className="bg-background border border-border rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ActionMenu>
                <ActionMenuTrigger asChild>
                  <IconButton variant="outline" size="sm" aria-label="Create event">
                    <Icon name="plus" />
                  </IconButton>
                </ActionMenuTrigger>
                <ActionMenuContent align="start">
                  <ActionMenuItem onAction={() => handleAction('quick-event')}>
                    <Icon name="zap" />
                    Quick Event
                  </ActionMenuItem>
                  <ActionMenuItem onAction={() => handleAction('detailed-event')}>
                    <Icon name="calendar-plus" />
                    Detailed Event
                  </ActionMenuItem>
                  <ActionMenuItem onAction={() => handleAction('recurring-event')}>
                    <Icon name="repeat" />
                    Recurring Event
                  </ActionMenuItem>
                </ActionMenuContent>
              </ActionMenu>

              <IconButton variant="outline" size="sm" aria-label="Import calendar">
                <Icon name="upload" />
              </IconButton>
              <div className="w-px h-4 bg-border mx-1" />
              <IconButton variant="ghost" size="sm" aria-label="Refresh">
                <Icon name="refresh-cw" />
              </IconButton>
            </div>

            <Segments defaultValue="Week" size="sm" variant="surface">
              <Segment value="Day">
                <Icon name="calendar-days" className="w-3 h-3 mr-1" />
                Day
              </Segment>
              <Segment value="Week">
                <Icon name="calendar" className="w-3 h-3 mr-1" />
                Week
              </Segment>
              <Segment value="Month">
                <Icon name="calendar-range" className="w-3 h-3 mr-1" />
                Month
              </Segment>
            </Segments>

            <div className="flex items-center gap-2">
              <IconButton variant="ghost" size="sm" aria-label="Filter events">
                <Icon name="filter" />
              </IconButton>

              <ActionMenu>
                <ActionMenuTrigger asChild>
                  <IconButton variant="ghost" size="sm" aria-label="Share calendar">
                    <Icon name="share" />
                  </IconButton>
                </ActionMenuTrigger>
                <ActionMenuContent align="end">
                  <ActionMenuLabel>Share Options</ActionMenuLabel>
                  <ActionMenuItem onAction={() => handleAction('share-link')}>
                    <Icon name="link" />
                    Copy Link
                  </ActionMenuItem>
                  <ActionMenuItem onAction={() => handleAction('share-email')}>
                    <Icon name="mail" />
                    Send via Email
                  </ActionMenuItem>
                  <ActionMenuSeparator />
                  <ActionMenuItem onAction={() => handleAction('export-ics')}>
                    <Icon name="download" />
                    Export as ICS
                  </ActionMenuItem>
                  <ActionMenuItem onAction={() => handleAction('export-pdf')}>
                    <Icon name="file-text" />
                    Export as PDF
                  </ActionMenuItem>
                </ActionMenuContent>
              </ActionMenu>
            </div>
          </div>
        </div>

        {/* Usage Notes */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Design Notes</h4>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>
              • <strong>IconButton Integration:</strong> Uses outline, ghost, and default variants
            </p>
            <p>
              • <strong>ActionMenu Enhancement:</strong> Adds contextual actions to IconButtons
            </p>
            <p>
              • <strong>Primary View Switcher:</strong> Uses default size with surface variant
            </p>
            <p>
              • <strong>Secondary Navigation:</strong> Uses small size for compact areas
            </p>
            <p>
              • <strong>Icon + Text Segments:</strong> Combines icons with text in segments
            </p>
            <p>
              • <strong>Accessibility:</strong> All components have proper aria-labels and keyboard navigation
            </p>
            <p>
              • <strong>Consistent Sizing:</strong> All components align perfectly at sm size (h-8/size-8)
            </p>
            <p>
              • <strong>Layered Interactions:</strong> ActionMenus provide secondary actions without cluttering the UI
            </p>
          </div>
        </div>
      </div>
    )
  },
}
