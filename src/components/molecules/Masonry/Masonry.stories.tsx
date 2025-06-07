import type { Meta, StoryObj } from '@storybook/react'
import { Masonry } from './Masonry'
import { MasonryItem } from './MasonryItem'
import { Card } from '@/components/molecules/Card'
import { Text } from '@/components/atoms/Text'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/atoms/Avatar'
import { Feedback } from '@/components/organisms/Feedback'
import { Stack } from '@/components/atoms/Stack'

const meta: Meta<typeof Masonry> = {
  component: Masonry,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
    },
    gap: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Sample content with varying heights
const sampleCards = [
  { height: 'h-24', content: 'Short card' },
  { height: 'h-40', content: 'Medium height card with more content to demonstrate how masonry layout works.' },
  { height: 'h-32', content: 'Another card with different height' },
  { height: 'h-48', content: 'Taller card with even more content to show the masonry effect in action.' },
  { height: 'h-28', content: 'Small card' },
  {
    height: 'h-56',
    content:
      'Very tall card with lots of content to demonstrate how the masonry layout automatically arranges items based on their natural height.',
  },
  { height: 'h-36', content: 'Medium card' },
  { height: 'h-20', content: 'Tiny' },
  { height: 'h-44', content: 'Another tall card with substantial content' },
]

export const Default: Story = {
  args: {
    columns: 3,
    gap: 'md',
  },
  render: (args) => (
    <Masonry {...args}>
      {sampleCards.map((card, index) => (
        <MasonryItem key={index}>
          <Card className={`p-4 ${card.height} flex items-center justify-center`}>
            <Text size="sm" align="center">
              {card.content}
            </Text>
          </Card>
        </MasonryItem>
      ))}
    </Masonry>
  ),
}

export const WithFeedbackCards: Story = {
  args: {
    columns: 3,
    gap: 'md',
  },
  render: (args) => (
    <Masonry {...args}>
      <MasonryItem>
        <Feedback>
          <Avatar size="md">
            <AvatarImage
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              alt="User"
            />
            <AvatarFallback>VA</AvatarFallback>
          </Avatar>
          <Text size="lg">Subframe is reshaping what it means to "design" software.</Text>
          <Stack gap="xs">
            <Text size="sm">Varun Ahir</Text>
            <Text tone="muted" size="sm">
              Senior Product Designer @ R1 RCM
            </Text>
          </Stack>
        </Feedback>
      </MasonryItem>

      <MasonryItem>
        <Feedback>
          <Avatar size="md">
            <AvatarFallback>FK</AvatarFallback>
          </Avatar>
          <Text size="lg">
            Subframe was a game changer for us. We went from design/UI being our Achilles' heel to it becoming one of
            the strengths of our product.
          </Text>
          <Stack gap="xs">
            <Text size="sm">Fawad Khaliq</Text>
            <Text tone="muted" size="sm">
              CTO @ Chkk
            </Text>
          </Stack>
        </Feedback>
      </MasonryItem>

      <MasonryItem>
        <Feedback>
          <Avatar size="md">
            <AvatarImage
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
              alt="User"
            />
            <AvatarFallback>GP</AvatarFallback>
          </Avatar>
          <Text size="lg">Tools like Subframe are blurring boundaries.</Text>
          <Stack gap="xs">
            <Text size="sm">Greg Petroff</Text>
            <Text tone="muted" size="sm">
              Chief Design Officer @ Paddle
            </Text>
          </Stack>
        </Feedback>
      </MasonryItem>

      <MasonryItem>
        <Feedback>
          <Avatar size="md">
            <AvatarFallback>RL</AvatarFallback>
          </Avatar>
          <Text size="lg">
            One thing I think Subframe gets right—and most prompt-to-UI tools completely miss—is divergence. Subframe
            brings that back.
          </Text>
          <Stack gap="xs">
            <Text size="sm">Ran Liu</Text>
            <Text tone="muted" size="sm">
              Head of Design @ Gable
            </Text>
          </Stack>
        </Feedback>
      </MasonryItem>

      <MasonryItem>
        <Feedback>
          <Avatar size="md">
            <AvatarImage
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              alt="User"
            />
            <AvatarFallback>TW</AvatarFallback>
          </Avatar>
          <Text size="lg">80% of the things I'm likely to need are there at my fingertips.</Text>
          <Stack gap="xs">
            <Text size="sm">Tom Weaver</Text>
            <Text tone="muted" size="sm">
              Founder @ Chainmaker
            </Text>
          </Stack>
        </Feedback>
      </MasonryItem>
    </Masonry>
  ),
}
