import type { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, expect } from '@storybook/test'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Checkbox } from './Checkbox'
import { Input } from '../Input'

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'select',
      options: [true, false, 'indeterminate'],
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    className: {
      control: 'text',
    },
  },
}
export default meta

type Story = StoryObj<typeof Checkbox>

export const Unchecked: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tests that the Checkbox component renders correctly in its default state.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole('checkbox', { hidden: true })

    // Verify checkbox is unchecked by default
    await expect(checkbox).not.toBeChecked()
  },
}

export const Indeterminate: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive checkbox that cycles through indeterminate, checked, and unchecked states.',
      },
    },
  },
  render: function Render() {
    const [state, setState] = React.useState<'indeterminate' | boolean>('indeterminate')

    const { t } = useTranslation()

    const handleChange = React.useCallback(() => {
      if (state === 'indeterminate') {
        setState(true)
      } else if (state === true) {
        setState(false)
      } else {
        setState('indeterminate')
      }
    }, [state])

    return (
      <div className="flex items-center gap-2">
        <Checkbox checked={state} onCheckedChange={handleChange} data-testid="indeterminate-checkbox" />
        <span className="text-sm font-medium">{t('hello')}</span>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByTestId('indeterminate-checkbox')

    // Test initial indeterminate state
    await expect(checkbox).toHaveAttribute('aria-checked', 'mixed')

    // Test state cycling
    await userEvent.click(checkbox)
    await expect(checkbox).toHaveAttribute('aria-checked', 'true')

    await userEvent.click(checkbox)
    await expect(checkbox).toHaveAttribute('aria-checked', 'false')

    await userEvent.click(checkbox)
    await expect(checkbox).toHaveAttribute('aria-checked', 'mixed')
  },
}

export const Checked: Story = {
  args: {
    checked: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests that the Checkbox component can be rendered in a checked state.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole('checkbox', { hidden: true })

    // Verify checkbox is checked
    await expect(checkbox).toBeChecked()
  },
}

export const UncheckedDisabled: Story = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests that the Checkbox component can be disabled, preventing user interaction.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole('checkbox', { hidden: true })

    // Verify checkbox is disabled
    await expect(checkbox).toBeDisabled()

    // Verify it remains unchecked when clicked
    await userEvent.click(checkbox)
    await expect(checkbox).not.toBeChecked()
  },
}

export const CheckedDisabled: Story = {
  args: {
    disabled: true,
    checked: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests that the Checkbox component can be both checked and disabled simultaneously.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole('checkbox', { hidden: true })

    // Verify checkbox is checked and disabled
    await expect(checkbox).toBeChecked()
    await expect(checkbox).toBeDisabled()
  },
}

export const IndeterminateDisabled: Story = {
  args: {
    disabled: true,
    checked: 'indeterminate',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests that the Checkbox component can be both indeterminate and disabled simultaneously.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole('checkbox', { hidden: true })

    // Verify checkbox is indeterminate and disabled
    await expect(checkbox).toHaveAttribute('aria-checked', 'mixed')
    await expect(checkbox).toBeDisabled()
  },
}

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tests that the Checkbox component can be toggled through user interaction.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole('checkbox', { hidden: true })

    // Verify toggling behavior
    await expect(checkbox).not.toBeChecked()

    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()

    await userEvent.click(checkbox)
    await expect(checkbox).not.toBeChecked()
  },
}

export const KeyboardAccessibility: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tests that the Checkbox component is keyboard accessible, following WCAG guidelines.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole('checkbox', { hidden: true })

    // Initial state
    await expect(checkbox).not.toBeChecked()

    // Test keyboard navigation
    await userEvent.tab()
    await expect(checkbox).toHaveFocus()

    // Test keyboard toggling
    await userEvent.keyboard(' ')
    await expect(checkbox).toBeChecked()

    await userEvent.keyboard(' ')
    await expect(checkbox).not.toBeChecked()
  },
}

export const Alignment: Story = {
  render: function Render() {
    return (
      <div className="">
        <Checkbox />
        <Checkbox checked />
        <Checkbox checked="indeterminate" />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows alignment of different checkbox states side by side.',
      },
    },
  },
}

export const Sizes: Story = {
  render: function Render() {
    return (
      <div className="">
        <Checkbox size="sm" />
        <Checkbox size="default" />
        <Checkbox size="lg" />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows alignment of different checkbox states side by side.',
      },
    },
  },
}

export const Navite: Story = {
  render: function Render() {
    return (
      <div className="">
        <table>
          <tr>
            <td>
              <input type="checkbox" className="size-3" />
            </td>
            <td>
              <input type="checkbox" />
            </td>
            <td className="text-lg">
              <input type="checkbox" className="size-5" />
            </td>
          </tr>
          <tr>
            <td>
              <Checkbox size="sm" />
            </td>
            <td>
              <Checkbox />
            </td>
            <td>
              <Checkbox size="lg" />
            </td>
          </tr>
        </table>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows alignment of different checkbox states side by side.',
      },
    },
  },
}

export const InlineAlignment: Story = {
  render: function Render() {
    return (
      <p>
        Lorem ipsum dolor sit amet <input type="checkbox" /> consectetur adipisicing elit. Quisquam, quos.
        <Checkbox /> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </p>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Inline checkbox inside a text.',
      },
    },
  },
}

export const InEnvironment: Story = {
  render: function Render() {
    return (
      <div className="flex items-center gap-2">
        <Input />
        <Checkbox size="lg" />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Inline checkbox inside a text.',
      },
    },
  },
}
