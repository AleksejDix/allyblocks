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

// Design System Consistency Check
export const DesignSystemConsistency: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Design System Consistency Test</h3>
        <p className="text-sm text-muted-foreground">
          Testing hover, focus, cursor, and interaction states between Button and Segments
        </p>
      </div>

      {/* Interaction States Comparison */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Hover & Focus States</h4>
          <div className="space-y-4">
            <div>
              <span className="text-xs text-muted-foreground block mb-2">Button outline variant:</span>
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
              <span className="text-xs text-muted-foreground block mb-2">Segments surface variant:</span>
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
          <h4 className="text-sm font-medium">Classic Variant with Shadows</h4>
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
          <h4 className="text-sm font-medium">Mixed Usage Example</h4>
          <div className="flex items-center gap-4 flex-wrap">
            <Button variant="outline">Create New</Button>
            <Segments defaultValue="list" size="default">
              <Segment value="list">List</Segment>
              <Segment value="grid">Grid</Segment>
              <Segment value="card">Card</Segment>
            </Segments>
            <Button variant="ghost">Settings</Button>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Interaction Instructions</h4>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>
              • <strong>Hover:</strong> Both should show subtle background changes
            </p>
            <p>
              • <strong>Focus:</strong> Both should show consistent focus rings (Tab to test)
            </p>
            <p>
              • <strong>Cursor:</strong> Both should show pointer cursor on hover
            </p>
            <p>
              • <strong>Active/Pressed:</strong> Segments should maintain selected state
            </p>
            <p>
              • <strong>Transitions:</strong> Both should have smooth state changes
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
