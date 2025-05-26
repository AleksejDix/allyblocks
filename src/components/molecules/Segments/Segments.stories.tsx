import type { Meta, StoryObj } from '@storybook/react'
import { within, expect, userEvent } from '@storybook/test'
import { useState } from 'react'

import { Segments, Segment } from './Segments'

const meta = {
  component: Segments,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['1', '2', '3'],
      description: 'Size of the segments',
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
    size: '2',
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
        <h3 className="text-sm font-medium">Size 1 (Small)</h3>
        <Segments defaultValue="option1" size="1">
          <Segment value="option1">Option 1</Segment>
          <Segment value="option2">Option 2</Segment>
          <Segment value="option3">Option 3</Segment>
        </Segments>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Size 2 (Default)</h3>
        <Segments defaultValue="option1" size="2">
          <Segment value="option1">Option 1</Segment>
          <Segment value="option2">Option 2</Segment>
          <Segment value="option3">Option 3</Segment>
        </Segments>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Size 3 (Large)</h3>
        <Segments defaultValue="option1" size="3">
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
        <Segments defaultValue="list" size="3">
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
        <Segments defaultValue="dashboard" size="3">
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
          <Segments defaultValue="grid" size="1">
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
            <Segments defaultValue="all" size="2" className="mt-2">
              <Segment value="all">All</Segment>
              <Segment value="active">Active</Segment>
              <Segment value="inactive">Inactive</Segment>
            </Segments>
          </div>
          <div>
            <label className="text-sm font-medium">Priority</label>
            <Segments type="multiple" defaultValue={['high']} size="2" className="mt-2">
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
          <Segments type="multiple" defaultValue={['bold']} size="2">
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
    size: '2',
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
