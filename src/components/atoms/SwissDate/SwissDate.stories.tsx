import type { Meta, StoryObj } from '@storybook/react-vite'
import { SwissDate } from './SwissDate'
import { Stack } from '@/components/atoms/Stack'
import { Text } from '@/components/atoms/Text'

const meta = {
  component: SwissDate,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    date: {
      control: { type: 'date' },
      description: 'Date to format',
    },
    relative: {
      control: { type: 'boolean' },
      description: 'Show in relative format',
    },
    locale: {
      control: { type: 'select' },
      options: ['de-CH', 'fr-CH', 'it-CH', 'en'],
      description: 'Locale for formatting',
    },
    className: {
      control: { type: 'text' },
      description: 'CSS class name',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text when date is empty',
    },
  },
} satisfies Meta<typeof SwissDate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    date: new Date('2025-07-17'),
  },
}

export const EmptyDate: Story = {
  args: {
    date: null,
    placeholder: 'No date',
  },
}

export const DifferentLocales: Story = {
  render: () => {
    const date = new Date('2025-12-25')

    return (
      <Stack gap="md">
        <div>
          <Text tone="muted" size="sm">
            German (de-CH):
          </Text>
          <SwissDate date={date} locale="de-CH" />
        </div>
        <div>
          <Text tone="muted" size="sm">
            French (fr-CH):
          </Text>
          <SwissDate date={date} locale="fr-CH" />
        </div>
        <div>
          <Text tone="muted" size="sm">
            Italian (it-CH):
          </Text>
          <SwissDate date={date} locale="it-CH" />
        </div>
        <div>
          <Text tone="muted" size="sm">
            English (en):
          </Text>
          <SwissDate date={date} locale="en" />
        </div>
      </Stack>
    )
  },
}

