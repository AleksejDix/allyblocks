import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within, screen } from 'storybook/test'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './Select'

const meta: Meta<typeof Select> = {
  component: Select,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
}
export default meta

type Story = StoryObj<typeof Select>

export const Default: Story = {
  render: () => (
    <Select defaultValue="apple">
      <SelectTrigger>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="grape">Grape</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default select with basic functionality and interaction testing.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const selectTrigger = canvas.getByRole('combobox')

    await expect(selectTrigger).toBeInTheDocument()
    await expect(selectTrigger).not.toBeDisabled()

    await userEvent.click(selectTrigger)

    await waitFor(() => {
      const listbox = screen.getByRole('listbox')
      expect(listbox).toBeInTheDocument()

      const selectItem = screen.getByRole('option', { name: 'Apple' })
      expect(selectItem).toBeInTheDocument()
    })
  },
}

export const SizeVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Small</label>
        <Select defaultValue="apple">
          <SelectTrigger size="sm">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Medium (Default)</label>
        <Select defaultValue="apple">
          <SelectTrigger size="md">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Large</label>
        <Select defaultValue="apple">
          <SelectTrigger size="lg">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectContent>
        </Select>
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

export const VariantStyles: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Default</label>
        <Select defaultValue="apple">
          <SelectTrigger>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Ghost</label>
        <Select defaultValue="apple">
          <SelectTrigger variant="ghost">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different visual variants: default and ghost.',
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
      { name: 'With Value', props: { defaultValue: 'apple' } },
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
                <Select {...baseState.props}>
                  <SelectTrigger data-state={interactiveState.dataState}>
                    <SelectValue placeholder={`${baseState.name} + ${interactiveState.name}`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                  </SelectContent>
                </Select>
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
    const defaultFocus = canvas.getByDisplayValue('Default + Focus')
    await expect(defaultFocus).toHaveAttribute('data-state', 'focus')

    const invalidFocus = canvas.getByDisplayValue('Invalid + Focus')
    await expect(invalidFocus).toHaveAttribute('aria-invalid')
    await expect(invalidFocus).toHaveAttribute('data-state', 'focus')

    const disabledActive = canvas.getByDisplayValue('Disabled + Active')
    await expect(disabledActive).toBeDisabled()
    await expect(disabledActive).toHaveAttribute('data-state', 'active')

    const readOnlyFocus = canvas.getByDisplayValue('Read-only + Focus')
    await expect(readOnlyFocus).toHaveAttribute('readonly')
    await expect(readOnlyFocus).toHaveAttribute('data-state', 'focus')
  },
}
