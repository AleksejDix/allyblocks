import type { Meta, StoryObj } from '@storybook/react'
import { BulletList } from './BulletList'
import { BulletListItem } from './BulletListItem'
import { Text } from '@/components/atoms/Text'

const meta: Meta<typeof BulletList> = {
  component: BulletList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    gap: 'sm',
  },
  render: (args) => (
    <BulletList {...args}>
      <BulletListItem icon="check">
        <Text size="sm">Real-time contact syncing</Text>
      </BulletListItem>
      <BulletListItem icon="check">
        <Text size="sm">Automatic data enrichment</Text>
      </BulletListItem>
      <BulletListItem icon="check">
        <Text size="sm">Up to 3 seats</Text>
      </BulletListItem>
    </BulletList>
  ),
}
