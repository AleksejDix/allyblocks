import type { Meta, StoryObj } from '@storybook/react'
import { SwissFranc } from './SwissFranc'

const meta = {
  component: SwissFranc,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    amount: {
      control: 'number',
      description: 'Amount in Swiss Francs',
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
} satisfies Meta<typeof SwissFranc>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    amount: 1234.56,
  },
}

export const WithCHFCode: Story = {
  args: {
    amount: 1234.56,
    showCode: true,
  },
}

export const DifferentLocales: Story = {
  render: () => {
    const amount = 1234567.89
    return (
      <div className="space-y-2">
        <div>
          <strong>de-CH:</strong> <SwissFranc amount={amount} locale="de-CH" />
        </div>
        <div>
          <strong>fr-CH:</strong> <SwissFranc amount={amount} locale="fr-CH" />
        </div>
        <div>
          <strong>it-CH:</strong> <SwissFranc amount={amount} locale="it-CH" />
        </div>
        <div>
          <strong>en:</strong> <SwissFranc amount={amount} locale="en" />
        </div>
      </div>
    )
  },
}

export const NullAmount: Story = {
  args: {
    amount: null,
  },
}
