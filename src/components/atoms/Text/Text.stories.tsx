import type { Meta, StoryObj } from '@storybook/react'
import { within, expect } from 'storybook/test'

import { Text } from './Text'

const meta = {
  component: Text,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['body', 'heading'],
      description: 'Typography type (body or heading)',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Size using t-shirt sizing (body: xs-lg, heading: sm-3xl)',
    },
    weight: {
      control: 'select',
      options: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      description: 'Font weight (100-900)',
    },
    tone: {
      control: 'select',
      options: ['default', 'muted', 'success', 'warning', 'error', 'info', 'inherit'],
      description: 'Semantic tone for color',
    },
    as: {
      control: 'select',
      options: ['span', 'p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'HTML element to render',
    },
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Default text',
  },
}

export const TypeSystem: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <Text type="body" as="p" size="xs">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
        <Text type="body" as="p" size="sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
        <Text type="body" as="p" size="md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
        <Text type="body" as="p" size="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
      </div>

      <div className="space-y-4">
        <Text type="heading" size="3xl" as="h1">
          Datenaustausch
        </Text>
        <Text type="heading" size="2xl" as="h2">
          Datenaustausch
        </Text>
        <Text type="heading" size="xl" as="h3">
          Datenaustausch
        </Text>
        <Text type="heading" size="lg" as="h4">
          Datenaustausch
        </Text>
        <Text type="heading" size="md" as="h5">
          Datenaustausch
        </Text>
        <Text type="heading" as="h6">
          Datenaustausch
        </Text>
      </div>
    </div>
  ),
}

export const WeightSystem: Story = {
  render: () => (
    <div className="space-y-2">
      <Text as="p" weight={100}>
        Weight 100
      </Text>
      <Text as="p" weight={200}>
        Weight 200
      </Text>
      <Text as="p" weight={300}>
        Weight 300
      </Text>
      <Text as="p" weight={400}>
        Weight 400
      </Text>
      <Text as="p" weight={500}>
        Weight 500
      </Text>
      <Text as="p" weight={600}>
        Weight 600
      </Text>
      <Text as="p" weight={700}>
        Weight 700
      </Text>
      <Text as="p" weight={800}>
        Weight 800
      </Text>
      <Text as="p" weight={900}>
        Weight 900
      </Text>
    </div>
  ),
}

export const ToneSystem: Story = {
  render: () => (
    <div className="space-y-2">
      <Text as="p" tone="default">
        Default tone
      </Text>
      <Text as="p" tone="muted">
        Muted tone
      </Text>
      <Text as="p" tone="success">
        Success tone
      </Text>
      <Text as="p" tone="warning">
        Warning tone
      </Text>
      <Text as="p" tone="error">
        Error tone
      </Text>
      <Text as="p" tone="info">
        Info tone
      </Text>
    </div>
  ),
}

export const StylingOptions: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Text decoration="none">No decoration</Text>
        <Text decoration="underline">Underlined text</Text>
        <Text decoration="strikethrough">Strikethrough text</Text>
      </div>

      <div className="space-y-2 max-w-md">
        <Text align="left" as="p">
          Left aligned
        </Text>
        <Text align="center" as="p">
          Center aligned
        </Text>
        <Text align="right" as="p">
          Right aligned
        </Text>
        <Text align="justify" as="p">
          Justified text that spreads across the full width
        </Text>
      </div>
    </div>
  ),
}

export const Truncation: Story = {
  render: () => (
    <div className="space-y-4 max-w-xs">
      <Text truncate as="p">
        This long text will be truncated with ellipsis when it exceeds container width
      </Text>
      <Text truncate="3" as="p">
        This longer text will be clamped to exactly two lines with ellipsis at the end
      </Text>
      <Text truncate="4" as="p">
        This even longer text will be clamped to exactly three lines giving more space while maintaining clean layout
      </Text>
    </div>
  ),
}
