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
        <Textarea placeholder="Hover state" className="hover" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Focus (for Chromatic)</label>
        <Textarea placeholder="Focus state" className="focus" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Disabled</label>
        <Textarea placeholder="Disabled state" disabled />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Invalid</label>
        <Textarea placeholder="Invalid state" aria-invalid />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Read-only</label>
        <Textarea defaultValue="This content is read-only and cannot be edited." readOnly />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different states including hover/focus classes for Chromatic screenshots, disabled, invalid, and read-only states.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Test disabled state
    const disabledTextarea = canvas.getByPlaceholderText('Disabled state')
    await expect(disabledTextarea).toBeDisabled()

    // Test invalid state
    const invalidTextarea = canvas.getByPlaceholderText('Invalid state')
    await expect(invalidTextarea).toHaveAttribute('aria-invalid')

    // Test read-only state
    const readOnlyTextarea = canvas.getByDisplayValue('This content is read-only and cannot be edited.')
    await expect(readOnlyTextarea).toHaveAttribute('readonly')
  },
}

export const Playground: Story = {
  args: {
    placeholder: 'Interactive playground...',
    size: 'md',
    autoGrow: false,
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
        story: 'Interactive playground to test different combinations of props.',
      },
    },
  },
}
