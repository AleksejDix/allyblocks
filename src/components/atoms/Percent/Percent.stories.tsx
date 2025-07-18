import type { Meta, StoryObj } from '@storybook/react'
import { Percent } from './Percent'

const meta = {
  component: Percent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 1, step: 0.01 },
      description: 'Value as decimal (0-1)',
    },
    decimals: {
      control: { type: 'number', min: 0, max: 4 },
      description: 'Number of decimal places',
    },
    locale: {
      control: 'select',
      options: ['de-CH', 'fr-CH', 'it-CH', 'en'],
      description: 'Override locale',
    },
    as: {
      control: 'select',
      options: ['span', 'div', 'p', 'strong'],
      description: 'HTML element to render as',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Percent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 0.7543,
  },
}

export const DifferentLocales: Story = {
  render: () => {
    const value = 0.6789
    return (
      <div className="space-y-2">
        <div>
          <strong>de-CH:</strong> <Percent value={value} locale="de-CH" />
        </div>
        <div>
          <strong>fr-CH:</strong> <Percent value={value} locale="fr-CH" />
        </div>
        <div>
          <strong>it-CH:</strong> <Percent value={value} locale="it-CH" />
        </div>
        <div>
          <strong>en:</strong> <Percent value={value} locale="en" />
        </div>
      </div>
    )
  },
}

export const NullValue: Story = {
  args: {
    value: null,
  },
}
