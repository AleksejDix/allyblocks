import type { Meta, StoryObj } from '@storybook/react-vite'
import { FileSize } from './FileSize'
import { Stack } from '@/components/atoms/Stack'
import { Text } from '@/components/atoms/Text'

const meta = {
  component: FileSize,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    bytes: {
      control: { type: 'number' },
      description: 'Size in bytes',
    },
    decimals: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Number of decimal places',
    },
    locale: {
      control: { type: 'text' },
      description: 'Locale for number formatting',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
    },
    emptyText: {
      control: { type: 'text' },
      description: 'Text to display when bytes is null/undefined',
    },
  },
} satisfies Meta<typeof FileSize>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    bytes: 1536,
  },
}

export const EmptyValue: Story = {
  args: {
    bytes: null as any,
    emptyText: 'N/A',
  },
}

export const SwissLanguagesAndEnglish: Story = {
  render: () => {
    const fileSize = 1536.5 * 1024 * 1024
    return (
      <Stack gap="md">
        <div>
          <Text tone="muted" size="sm">
            English (International):
          </Text>
          <FileSize bytes={fileSize} locale="en" />
        </div>
        <div>
          <Text tone="muted" size="sm">
            German (Switzerland):
          </Text>
          <FileSize bytes={fileSize} locale="de-CH" />
        </div>
        <div>
          <Text tone="muted" size="sm">
            French (Switzerland):
          </Text>
          <FileSize bytes={fileSize} locale="fr-CH" />
        </div>
        <div>
          <Text tone="muted" size="sm">
            Italian (Switzerland):
          </Text>
          <FileSize bytes={fileSize} locale="it-CH" />
        </div>
      </Stack>
    )
  },
}
