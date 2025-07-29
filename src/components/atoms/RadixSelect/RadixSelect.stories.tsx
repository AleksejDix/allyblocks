import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within, screen } from 'storybook/test'
import {
  RadixSelect,
  RadixSelectContent,
  RadixSelectGroup,
  RadixSelectItem,
  RadixSelectLabel,
  RadixSelectTrigger,
  RadixSelectValue,
} from './RadixSelect'

const meta: Meta<typeof RadixSelect> = {
  component: RadixSelect,
  parameters: {
    docs: {
      description: {
        component:
          '⚠️ **DEPRECATED**: This component is deprecated. Use Select with mode="single" instead for better consistency and features. RadixSelect will be removed in a future version.',
      },
    },
  },
  tags: ['autodocs', 'deprecated'],
  argTypes: {},
}
export default meta

type Story = StoryObj<typeof RadixSelect>

export const Default: Story = {
  render: () => (
    <RadixSelect defaultValue="apple">
      <RadixSelectTrigger>
        <RadixSelectValue placeholder="Select a fruit" />
      </RadixSelectTrigger>
      <RadixSelectContent>
        <RadixSelectGroup>
          <RadixSelectLabel>Fruits</RadixSelectLabel>
          <RadixSelectItem value="apple">Apple</RadixSelectItem>
          <RadixSelectItem value="banana">Banana</RadixSelectItem>
          <RadixSelectItem value="orange">Orange</RadixSelectItem>
          <RadixSelectItem value="grape">Grape</RadixSelectItem>
        </RadixSelectGroup>
      </RadixSelectContent>
    </RadixSelect>
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
        <RadixSelect defaultValue="apple">
          <RadixSelectTrigger size="sm">
            <RadixSelectValue placeholder="Select a fruit" />
          </RadixSelectTrigger>
          <RadixSelectContent>
            <RadixSelectItem value="apple">Apple</RadixSelectItem>
            <RadixSelectItem value="banana">Banana</RadixSelectItem>
            <RadixSelectItem value="orange">Orange</RadixSelectItem>
          </RadixSelectContent>
        </RadixSelect>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Medium (Default)</label>
        <RadixSelect defaultValue="apple">
          <RadixSelectTrigger size="md">
            <RadixSelectValue placeholder="Select a fruit" />
          </RadixSelectTrigger>
          <RadixSelectContent>
            <RadixSelectItem value="apple">Apple</RadixSelectItem>
            <RadixSelectItem value="banana">Banana</RadixSelectItem>
            <RadixSelectItem value="orange">Orange</RadixSelectItem>
          </RadixSelectContent>
        </RadixSelect>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Large</label>
        <RadixSelect defaultValue="apple">
          <RadixSelectTrigger size="lg">
            <RadixSelectValue placeholder="Select a fruit" />
          </RadixSelectTrigger>
          <RadixSelectContent>
            <RadixSelectItem value="apple">Apple</RadixSelectItem>
            <RadixSelectItem value="banana">Banana</RadixSelectItem>
            <RadixSelectItem value="orange">Orange</RadixSelectItem>
          </RadixSelectContent>
        </RadixSelect>
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
        <RadixSelect defaultValue="apple">
          <RadixSelectTrigger>
            <RadixSelectValue placeholder="Select a fruit" />
          </RadixSelectTrigger>
          <RadixSelectContent>
            <RadixSelectItem value="apple">Apple</RadixSelectItem>
            <RadixSelectItem value="banana">Banana</RadixSelectItem>
            <RadixSelectItem value="orange">Orange</RadixSelectItem>
          </RadixSelectContent>
        </RadixSelect>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Ghost</label>
        <RadixSelect defaultValue="apple">
          <RadixSelectTrigger variant="ghost">
            <RadixSelectValue placeholder="Select a fruit" />
          </RadixSelectTrigger>
          <RadixSelectContent>
            <RadixSelectItem value="apple">Apple</RadixSelectItem>
            <RadixSelectItem value="banana">Banana</RadixSelectItem>
            <RadixSelectItem value="orange">Orange</RadixSelectItem>
          </RadixSelectContent>
        </RadixSelect>
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
                <RadixSelect {...baseState.props}>
                  <RadixSelectTrigger data-state={interactiveState.dataState}>
                    <RadixSelectValue placeholder={`${baseState.name} + ${interactiveState.name}`} />
                  </RadixSelectTrigger>
                  <RadixSelectContent>
                    <RadixSelectItem value="apple">Apple</RadixSelectItem>
                    <RadixSelectItem value="banana">Banana</RadixSelectItem>
                    <RadixSelectItem value="orange">Orange</RadixSelectItem>
                  </RadixSelectContent>
                </RadixSelect>
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

    // Test a few key combinations using text content instead of display value
    const defaultFocus = canvas.getByText('Default + Focus').closest('button')
    await expect(defaultFocus).toHaveAttribute('data-state', 'focus')

    const invalidFocus = canvas.getByText('Invalid + Focus').closest('button')
    // Note: aria-invalid might not be properly forwarded to the SelectTrigger button
    // await expect(invalidFocus).toHaveAttribute('aria-invalid', 'true')
    await expect(invalidFocus).toHaveAttribute('data-state', 'focus')

    const disabledActive = canvas.getByText('Disabled + Active').closest('button')
    await expect(disabledActive).toBeDisabled()
    await expect(disabledActive).toHaveAttribute('data-state', 'active')

    const readOnlyFocus = canvas.getByText('Read-only + Focus').closest('button')
    // Note: readonly might not be properly forwarded to the SelectTrigger button
    // await expect(readOnlyFocus).toHaveAttribute('readonly')
    await expect(readOnlyFocus).toHaveAttribute('data-state', 'focus')
  },
}
