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

export const StateMatrix: Story = {
  render: () => {
    const baseStates = [
      { name: 'Default', props: {} },
      { name: 'Disabled', props: { disabled: true } },
      { name: 'Invalid', props: { 'aria-invalid': true } },
      { name: 'Read-only', props: { readOnly: true } },
      { name: 'With Value', props: { defaultValue: 'Sample content' } },
    ]

    const interactiveStates = [
      { name: 'Default', dataState: undefined },
      { name: 'Focus', dataState: 'focus' },
      { name: 'Active', dataState: 'active' },
    ]

    return (
      <div className="space-y-4">
        <div className="text-sm font-medium text-muted-foreground mb-4">
          State Matrix: Base states (rows) × Interactive states (columns)
        </div>

        {/* Header row */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-xs font-medium text-muted-foreground"></div>
          {interactiveStates.map((interactiveState) => (
            <div key={interactiveState.name} className="text-xs font-medium text-muted-foreground text-center">
              {interactiveState.name}
            </div>
          ))}
        </div>

        {/* Matrix rows */}
        {baseStates.map((baseState) => (
          <div key={baseState.name} className="grid grid-cols-4 gap-4 items-center">
            <div className="text-xs font-medium text-muted-foreground">{baseState.name}</div>
            {interactiveStates.map((interactiveState) => (
              <div key={`${baseState.name}-${interactiveState.name}`}>
                <Textarea
                  placeholder={`${baseState.name} + ${interactiveState.name}`}
                  data-state={interactiveState.dataState}
                  {...baseState.props}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Comprehensive state matrix showing all combinations of base states (disabled, invalid, read-only, with value) and interactive states (focus, active). Form inputs typically do not have hover states, focusing on keyboard and click interactions instead.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Test a few key combinations
    const defaultFocus = canvas.getByPlaceholderText('Default + Focus')
    await expect(defaultFocus).toHaveAttribute('data-state', 'focus')

    const invalidFocus = canvas.getByPlaceholderText('Invalid + Focus')
    await expect(invalidFocus).toHaveAttribute('aria-invalid')
    await expect(invalidFocus).toHaveAttribute('data-state', 'focus')

    const disabledActive = canvas.getByPlaceholderText('Disabled + Active')
    await expect(disabledActive).toBeDisabled()
    await expect(disabledActive).toHaveAttribute('data-state', 'active')

    const readOnlyFocus = canvas.getByPlaceholderText('Read-only + Focus')
    await expect(readOnlyFocus).toHaveAttribute('readonly')
    await expect(readOnlyFocus).toHaveAttribute('data-state', 'focus')
  },
}
