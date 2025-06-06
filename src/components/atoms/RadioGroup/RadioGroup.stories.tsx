import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { RadioGroup, Radio, RadioItem } from './RadioGroup'
import { Label } from '@/components/atoms/Label'
import { useState } from 'react'
import { Icon } from '@/components/atoms/Icon'

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: (args) => (
    <RadioGroup defaultValue="option-one" {...args}>
      <RadioItem>
        <Radio value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </RadioItem>
      <RadioItem>
        <Radio value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </RadioItem>
      <RadioItem>
        <Radio value="option-three" id="option-three" />
        <Label htmlFor="option-three">Option Three</Label>
      </RadioItem>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Check that there are three radio options
    const radioButtons = canvas.getAllByRole('radio')
    expect(radioButtons).toHaveLength(3)

    // Option one should be checked by default
    expect(radioButtons[0]).toBeChecked()

    // Click on option two
    await userEvent.click(radioButtons[1])
    expect(radioButtons[1]).toBeChecked()
    expect(radioButtons[0]).not.toBeChecked()
  },
}

export const StateMatrix: Story = {
  render: () => {
    const baseStates = [
      { name: 'Default', props: {}, groupProps: {} },
      { name: 'Disabled', props: { disabled: true }, groupProps: {} },
      { name: 'Invalid', props: {}, groupProps: { 'aria-invalid': true } },
      { name: 'Checked', props: {}, groupProps: { defaultValue: 'state-option' } },
      { name: 'Disabled + Checked', props: { disabled: true }, groupProps: { defaultValue: 'state-option' } },
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
        {baseStates.map((baseState, rowIndex) => (
          <div key={baseState.name} className="grid grid-cols-4 gap-4 items-center">
            <div className="text-xs font-medium text-muted-foreground">{baseState.name}</div>
            {interactiveStates.map((interactiveState, colIndex) => {
              const uniqueId = `state-${rowIndex}-${colIndex}`
              const radioValue = 'state-option'

              return (
                <div key={`${baseState.name}-${interactiveState.name}`}>
                  <RadioGroup {...baseState.groupProps}>
                    <RadioItem>
                      <Radio
                        value={radioValue}
                        id={uniqueId}
                        data-state={interactiveState.dataState}
                        {...baseState.props}
                      />
                      <Label htmlFor={uniqueId} className="text-xs">
                        {baseState.name} + {interactiveState.name}
                      </Label>
                    </RadioItem>
                  </RadioGroup>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Comprehensive state matrix showing all combinations of base states (default, disabled, invalid, checked) and interactive states (focus, active). Radio buttons typically have hover states and keyboard/click interactions.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Test that matrix renders properly
    const radioButtons = canvas.getAllByRole('radio')
    expect(radioButtons.length).toBeGreaterThan(0)

    // Test a few key combinations
    const defaultFocus = canvas.getByLabelText('Default + Focus')
    expect(defaultFocus).toHaveAttribute('data-state', 'focus')

    const invalidFocus = canvas.getByLabelText('Invalid + Focus')
    expect(invalidFocus).toHaveAttribute('data-state', 'focus')

    const disabledActive = canvas.getByLabelText('Disabled + Active')
    expect(disabledActive).toBeDisabled()
    expect(disabledActive).toHaveAttribute('data-state', 'active')

    // Test some disabled states
    const disabledRadios = canvas.getAllByRole('radio', { name: /Disabled/ })
    disabledRadios.forEach((radio) => {
      expect(radio).toBeDisabled()
    })
  },
}

export const WithLabelsInline: Story = {
  render: (args) => (
    <RadioGroup defaultValue="inline-one" className="flex space-x-4" {...args}>
      <RadioItem>
        <Radio value="inline-one" id="inline-one" />
        <Label htmlFor="inline-one">Option 1</Label>
      </RadioItem>
      <RadioItem>
        <Radio value="inline-two" id="inline-two" />
        <Label htmlFor="inline-two">Option 2</Label>
      </RadioItem>
      <RadioItem>
        <Radio value="inline-three" id="inline-three" />
        <Label htmlFor="inline-three">Option 3</Label>
      </RadioItem>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio group with horizontally aligned options',
      },
    },
  },
}

export const WithCustomIcons: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [os, setOs] = useState('mac')

    return (
      <div className="space-y-4">
        <div>Selected OS: {os}</div>
        <RadioGroup value={os} onValueChange={setOs} {...args}>
          <RadioItem>
            <Radio value="windows" id="windows" />
            <Label htmlFor="windows">
              <Icon name="monitor" />
              Windows
            </Label>
          </RadioItem>
          <RadioItem>
            <Radio value="mac" id="mac" />
            <Label htmlFor="mac">
              <Icon name="laptop" />
              macOS
            </Label>
          </RadioItem>
          <RadioItem>
            <Radio value="linux" id="linux" />
            <Label htmlFor="linux">
              <Icon name="terminal" />
              Linux
            </Label>
          </RadioItem>
        </RadioGroup>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Radio group with custom icons next to each option',
      },
    },
  },
}

export const WithDisabledOptions: Story = {
  render: (args) => (
    <RadioGroup defaultValue="available" {...args}>
      <RadioItem>
        <Radio value="available" id="available" />
        <Label htmlFor="available">Available</Label>
      </RadioItem>
      <RadioItem>
        <Radio value="unavailable" id="unavailable" disabled />
        <Label htmlFor="unavailable" className="text-muted-foreground">
          Unavailable (Disabled)
        </Label>
      </RadioItem>
      <RadioItem>
        <Radio value="coming-soon" id="coming-soon" disabled />
        <Label htmlFor="coming-soon" className="text-muted-foreground">
          Coming Soon (Disabled)
        </Label>
      </RadioItem>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio group with some options disabled',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const radioButtons = canvas.getAllByRole('radio')

    // Try to click a disabled option
    await userEvent.click(radioButtons[1])

    // The first option should still be checked
    expect(radioButtons[0]).toBeChecked()
    expect(radioButtons[1]).not.toBeChecked()
  },
}

export const DisabledGroup: Story = {
  render: (args) => (
    <RadioGroup defaultValue="option-one" disabled {...args}>
      <RadioItem>
        <Radio value="option-one" id="disabled-option-one" />
        <Label htmlFor="disabled-option-one" className="text-muted-foreground">
          Option One
        </Label>
      </RadioItem>
      <RadioItem>
        <Radio value="option-two" id="disabled-option-two" />
        <Label htmlFor="disabled-option-two" className="text-muted-foreground">
          Option Two
        </Label>
      </RadioItem>
      <RadioItem>
        <Radio value="option-three" id="disabled-option-three" />
        <Label htmlFor="disabled-option-three" className="text-muted-foreground">
          Option Three
        </Label>
      </RadioItem>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Entire radio group disabled - all options are non-interactive',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const radioButtons = canvas.getAllByRole('radio')

    // All radio buttons should be disabled
    radioButtons.forEach((radio) => {
      expect(radio).toBeDisabled()
    })

    // Try to click any option - none should change
    await userEvent.click(radioButtons[1])
    await userEvent.click(radioButtons[2])

    // The first option should still be checked (default value)
    expect(radioButtons[0]).toBeChecked()
    expect(radioButtons[1]).not.toBeChecked()
    expect(radioButtons[2]).not.toBeChecked()
  },
}
