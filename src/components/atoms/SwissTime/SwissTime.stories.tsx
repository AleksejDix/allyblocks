import type { Meta, StoryObj } from '@storybook/react'
import { SwissTime } from './SwissTime'

const meta = {
  component: SwissTime,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    time: {
      control: 'date',
      description: 'Time to format',
    },
    showSeconds: {
      control: 'boolean',
      description: 'Show seconds',
    },
    locale: {
      control: 'select',
      options: ['de-CH', 'fr-CH', 'it-CH', 'en'],
      description: 'Override locale',
    },
    as: {
      control: 'select',
      options: ['span', 'div', 'p', 'time'],
      description: 'HTML element to render as',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof SwissTime>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    time: new Date('2024-03-14T15:30:45'),
  },
}

export const DifferentLocales: Story = {
  render: () => {
    const time = new Date('2024-03-14T15:30:45')
    return (
      <div className="space-y-2">
        <div>
          <strong>de-CH:</strong> <SwissTime time={time} locale="de-CH" />
        </div>
        <div>
          <strong>fr-CH:</strong> <SwissTime time={time} locale="fr-CH" />
        </div>
        <div>
          <strong>it-CH:</strong> <SwissTime time={time} locale="it-CH" />
        </div>
        <div>
          <strong>en:</strong> <SwissTime time={time} locale="en" />
        </div>
      </div>
    )
  },
}

export const NullTime: Story = {
  args: {
    time: null,
  },
}
