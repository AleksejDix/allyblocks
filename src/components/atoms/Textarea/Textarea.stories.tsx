import type { Meta, StoryObj } from '@storybook/react'
import { within, expect } from '@storybook/test'

import { Textarea } from './Textarea'

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
}
export default meta

type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default textarea with basic functionality and interaction testing.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByPlaceholderText('Enter your message...')

    await expect(textarea).toBeInTheDocument()
    await expect(textarea).not.toBeDisabled()
  },
}

export const SizeVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Small</label>
        <Textarea size="sm" placeholder="Small textarea" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Medium (Default)</label>
        <Textarea size="md" placeholder="Medium textarea" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Large</label>
        <Textarea size="lg" placeholder="Large textarea" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different size variants: sm, md (default), and lg.',
      },
    },
  },
}

export const AutoGrowVariant: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Fixed Height</label>
        <Textarea
          placeholder="This textarea has fixed height..."
          defaultValue="Type more content here and see how it behaves. This textarea will not grow automatically."
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Auto-Growing</label>
        <Textarea
          autoGrow
          placeholder="This textarea grows with content..."
          defaultValue="Type more content here and see how it grows. This textarea will automatically adjust its height based on the content."
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison between fixed height and auto-growing textarea using the autoGrow prop.',
      },
    },
  },
}

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Default</label>
        <Textarea placeholder="Default state" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Hover (for Chromatic)</label>
        <Textarea state="hover" placeholder="Hover state" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Focus (for Chromatic)</label>
        <Textarea state="focus" placeholder="Focus state" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Active (for Chromatic)</label>
        <Textarea state="active" placeholder="Active state" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Disabled</label>
        <Textarea placeholder="Disabled state" disabled />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Disabled + Hover</label>
        <Textarea state="hover" placeholder="Disabled hover state" disabled />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Invalid</label>
        <Textarea placeholder="Invalid state" aria-invalid />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Invalid + Focus</label>
        <Textarea state="focus" placeholder="Invalid focus state" aria-invalid />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Read-only</label>
        <Textarea defaultValue="This content is read-only and cannot be edited." readOnly />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Read-only + Active</label>
        <Textarea state="active" defaultValue="Read-only content with active state." readOnly />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">With Value</label>
        <Textarea defaultValue="This textarea has existing content that can be edited." />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">With Value + Focus</label>
        <Textarea state="focus" defaultValue="This textarea has content and is focused." />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Comprehensive visual states using data-state attributes for easy testing. Includes hover, focus, active states for Chromatic screenshots, plus disabled, invalid, read-only states and combinations.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Test data-state attributes
    const hoverTextarea = canvas.getByPlaceholderText('Hover state')
    await expect(hoverTextarea).toHaveAttribute('data-state', 'hover')

    const focusTextarea = canvas.getByPlaceholderText('Focus state')
    await expect(focusTextarea).toHaveAttribute('data-state', 'focus')

    const activeTextarea = canvas.getByPlaceholderText('Active state')
    await expect(activeTextarea).toHaveAttribute('data-state', 'active')

    // Test default state (should not have data-state attribute)
    const defaultTextarea = canvas.getByPlaceholderText('Default state')
    await expect(defaultTextarea).not.toHaveAttribute('data-state')

    // Test disabled state
    const disabledTextarea = canvas.getByPlaceholderText('Disabled state')
    await expect(disabledTextarea).toBeDisabled()

    // Test disabled + hover state (should have both disabled and data-state)
    const disabledHoverTextarea = canvas.getByPlaceholderText('Disabled hover state')
    await expect(disabledHoverTextarea).toBeDisabled()
    await expect(disabledHoverTextarea).toHaveAttribute('data-state', 'hover')

    // Test invalid state
    const invalidTextarea = canvas.getByPlaceholderText('Invalid state')
    await expect(invalidTextarea).toHaveAttribute('aria-invalid')

    // Test invalid + focus state
    const invalidFocusTextarea = canvas.getByPlaceholderText('Invalid focus state')
    await expect(invalidFocusTextarea).toHaveAttribute('aria-invalid')
    await expect(invalidFocusTextarea).toHaveAttribute('data-state', 'focus')

    // Test read-only state
    const readOnlyTextarea = canvas.getByDisplayValue('This content is read-only and cannot be edited.')
    await expect(readOnlyTextarea).toHaveAttribute('readonly')

    // Test read-only + active state
    const readOnlyActiveTextarea = canvas.getByDisplayValue('Read-only content with active state.')
    await expect(readOnlyActiveTextarea).toHaveAttribute('readonly')
    await expect(readOnlyActiveTextarea).toHaveAttribute('data-state', 'active')

    // Test textareas with existing content
    const withValueTextarea = canvas.getByDisplayValue('This textarea has existing content that can be edited.')
    await expect(withValueTextarea).toBeInTheDocument()
    await expect(withValueTextarea).not.toBeDisabled()

    const withValueFocusTextarea = canvas.getByDisplayValue('This textarea has content and is focused.')
    await expect(withValueFocusTextarea).toBeInTheDocument()
    await expect(withValueFocusTextarea).not.toBeDisabled()
    await expect(withValueFocusTextarea).toHaveAttribute('data-state', 'focus')
  },
}

export const Playground: Story = {
  args: {
    placeholder: 'Interactive playground...',
    size: 'md',
    autoGrow: false,
    state: 'default',
    disabled: false,
    readOnly: false,
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    autoGrow: {
      control: { type: 'boolean' },
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'hover', 'focus', 'active'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    readOnly: {
      control: { type: 'boolean' },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different combinations of props including visual states.',
      },
    },
  },
}
