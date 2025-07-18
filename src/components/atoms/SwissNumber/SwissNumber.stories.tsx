import type { Meta, StoryObj } from '@storybook/react'
import { SwissNumber } from './SwissNumber'

const meta = {
  component: SwissNumber,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'number',
      description: 'Number to format',
    },
    decimals: {
      control: { type: 'number', min: 0, max: 6 },
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
} satisfies Meta<typeof SwissNumber>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 1234567.89,
  },
}

export const DifferentLocales: Story = {
  render: () => {
    const value = 1234567.89
    return (
      <div className="space-y-2">
        <div>
          <strong>de-CH:</strong> <SwissNumber value={value} locale="de-CH" />
        </div>
        <div>
          <strong>fr-CH:</strong> <SwissNumber value={value} locale="fr-CH" />
        </div>
        <div>
          <strong>it-CH:</strong> <SwissNumber value={value} locale="it-CH" />
        </div>
        <div>
          <strong>en:</strong> <SwissNumber value={value} locale="en" />
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
