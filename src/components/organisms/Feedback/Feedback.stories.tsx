import type { Meta, StoryObj } from '@storybook/react'
import { Feedback } from './Feedback'
import { Text } from '@/components/atoms/Text'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/atoms/Avatar'
import { Stack } from '@/components/atoms/Stack'

const meta: Meta<typeof Feedback> = {
  component: Feedback,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Feedback {...args}>
      <Avatar size="md">
        <AvatarImage
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Varun Ahir"
        />
        <AvatarFallback>VA</AvatarFallback>
      </Avatar>

      <Text size="lg">
        Subframe is reshaping what it means to "design" software. Designers are not just drawing interfaces anymore,
        they're building products.
      </Text>

      <Stack gap="xs">
        <Text size="sm">Varun Ahir</Text>
        <Text tone="muted" size="sm">
          Senior Product Designer @ R1 RCM
        </Text>
      </Stack>
    </Feedback>
  ),
}

export const GameChanger: Story = {
  render: (args) => (
    <Feedback {...args}>
      <Avatar size="md">
        <AvatarImage
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
          alt="Fawad Khaliq"
        />
        <AvatarFallback>FK</AvatarFallback>
      </Avatar>

      <Text size="lg">
        Subframe was a game changer for us. We went from design/UI being our Achilles' heel to it becoming one of the
        strengths of our product.
      </Text>

      <Stack gap="xs">
        <Text size="sm">Fawad Khaliq</Text>
        <Text tone="muted" size="sm">
          CTO @ Chkk
        </Text>
      </Stack>
    </Feedback>
  ),
}

export const WithoutAvatar: Story = {
  render: (args) => (
    <Feedback {...args}>
      <Avatar size="md">
        <AvatarFallback>GP</AvatarFallback>
      </Avatar>

      <Text size="lg">
        Tools like Subframe are blurring these boundaries by creating a shared language — code — that all team members
        can understand and contribute to.
      </Text>

      <Stack gap="xs">
        <Text size="sm">Greg Petroff</Text>
        <Text tone="muted" size="sm">
          Chief Design Officer & Advisor @ Paddle
        </Text>
      </Stack>
    </Feedback>
  ),
}

export const LongTestimonial: Story = {
  render: (args) => (
    <Feedback {...args}>
      <Avatar size="md">
        <AvatarImage
          src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
          alt="Ran Liu"
        />
        <AvatarFallback>RL</AvatarFallback>
      </Avatar>

      <Text size="lg">
        One thing I think Subframe gets right—and most prompt-to-UI tools completely miss—is divergence. Subframe brings
        that back. If AI tools want to support real design workflows, they need to mirror how we actually think.
      </Text>

      <Stack gap="xs">
        <Text size="sm">Ran Liu</Text>
        <Text tone="muted" size="sm">
          Head of Design @ Gable
        </Text>
      </Stack>
    </Feedback>
  ),
}
