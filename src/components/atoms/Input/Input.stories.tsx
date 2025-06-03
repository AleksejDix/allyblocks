import type { Meta, StoryObj } from '@storybook/react-vite'
import { within, expect } from 'storybook/test'
import { userEvent } from 'storybook/test'

import { Input } from './Input'

const meta: Meta<typeof Input> = {
  component: Input,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
}
export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default input with basic functionality and interaction testing.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText('Enter text...')

    await expect(input).toBeInTheDocument()
    await expect(input).not.toBeDisabled()

    // Test typing behavior
    await userEvent.type(input, 'Hello, world!')
    await expect(input).toHaveValue('Hello, world!')
  },
}

export const SizeVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Small</label>
        <Input size="sm" placeholder="Small input" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Medium (Default)</label>
        <Input size="md" placeholder="Medium input" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Large</label>
        <Input size="lg" placeholder="Large input" />
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

export const TypeVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Text</label>
        <Input type="text" placeholder="Enter text..." />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <Input type="email" placeholder="email@example.com" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <Input type="password" placeholder="Enter password..." />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Number</label>
        <Input type="number" placeholder="0" min={0} max={100} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <Input type="date" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different input types: text, email, password, number, and date.',
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
      { name: 'With Value', props: { defaultValue: 'Sample text' } },
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
                <Input
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
