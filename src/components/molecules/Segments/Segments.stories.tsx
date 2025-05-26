import type { Meta, StoryObj } from '@storybook/react'
import { within, expect, userEvent } from '@storybook/test'
import { useState } from 'react'

import { Segments, Segment } from './Segments'
import { Button } from '../../atoms/Button'

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

      {/* Small Size Comparison */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Small Size</h4>
        <div className="space-y-2">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Button (sm): h-8</span>
            <div>
              <Button size="sm" variant="outline">
                Small Button
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Segments (sm): h-8 container, h-6 items</span>
            <div>
              <Segments defaultValue="option1" size="sm">
                <Segment value="option1">Option 1</Segment>
                <Segment value="option2">Option 2</Segment>
              </Segments>
            </div>
          </div>
        </div>
      </div>

      {/* Default Size Comparison */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Default Size</h4>
        <div className="space-y-2">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Button (default): h-9</span>
            <div>
              <Button size="default" variant="outline">
                Default Button
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Segments (default): h-9 container, h-7 items</span>
            <div>
              <Segments defaultValue="option1" size="default">
                <Segment value="option1">Option 1</Segment>
                <Segment value="option2">Option 2</Segment>
              </Segments>
            </div>
          </div>
        </div>
      </div>

      {/* Large Size Comparison */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Large Size</h4>
        <div className="space-y-2">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Button (lg): h-10</span>
            <div>
              <Button size="lg" variant="outline">
                Large Button
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Segments (lg): h-10 container, h-8 items</span>
            <div>
              <Segments defaultValue="option1" size="lg">
                <Segment value="option1">Option 1</Segment>
                <Segment value="option2">Option 2</Segment>
              </Segments>
            </div>
          </div>
        </div>
      </div>

      {/* Side by Side Comparison */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Side by Side Comparison (No Flexbox)</h4>
        <div className="space-y-4">
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Small: Button (h-8) + Segments (h-8) - Perfect Match!</span>
            <div className="space-y-1">
              <Button size="sm" variant="outline">
                Small Button
              </Button>
              <br />
              <Segments defaultValue="option1" size="sm">
                <Segment value="option1">Small</Segment>
                <Segment value="option2">Segments</Segment>
              </Segments>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">
              Default: Button (h-9) + Segments (h-9) - Perfect Match!
            </span>
            <div className="space-y-1">
              <Button size="default" variant="outline">
                Default Button
              </Button>
              <br />
              <Segments defaultValue="option1" size="default">
                <Segment value="option1">Default</Segment>
                <Segment value="option2">Segments</Segment>
              </Segments>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">
              Large: Button (h-10) + Segments (h-10) - Perfect Match!
            </span>
            <div className="space-y-1">
              <Button size="lg" variant="outline">
                Large Button
              </Button>
              <br />
              <Segments defaultValue="option1" size="lg">
                <Segment value="option1">Large</Segment>
                <Segment value="option2">Segments</Segment>
              </Segments>
            </div>
          </div>
        </div>
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
