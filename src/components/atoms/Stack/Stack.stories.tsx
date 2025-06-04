import type { Meta, StoryObj } from '@storybook/react'
import { within, expect } from 'storybook/test'

import { Stack } from './Stack'
import { Text } from '@/components/atoms/Text'
import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/molecules/Card'

const meta = {
  component: Stack,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Space between children',
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'space-around', 'space-between', 'space-evenly'],
      description: 'Main axis alignment (justify-content)',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'baseline', 'stretch'],
      description: 'Cross axis alignment (align-items)',
    },
    direction: {
      control: 'select',
      options: ['column', 'column-reverse', 'row', 'row-reverse'],
      description: 'Flex direction',
    },
    as: {
      control: 'select',
      options: ['div', 'span', 'ul', 'ol', 'li', 'fieldset', 'section'],
      description: 'HTML element to render',
    },
    reverseOrder: {
      control: 'boolean',
      description: 'Reverse the order of children',
    },
  },
} satisfies Meta<typeof Stack>

export default meta
type Story = StoryObj<typeof meta>

const Placeholder = ({ children, height = '48px' }: { children: React.ReactNode; height?: string }) => (
  <div
    className="bg-primary/10 border border-primary/20 rounded px-4 py-2 flex items-center justify-center"
    style={{ height }}
  >
    <Text type="body" size="sm">
      {children}
    </Text>
  </div>
)

export const Default: Story = {
  args: {
    children: [
      <Placeholder key="1">Item 1</Placeholder>,
      <Placeholder key="2">Item 2</Placeholder>,
      <Placeholder key="3">Item 3</Placeholder>,
    ],
  },
}

export const GapVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Text type="heading" size="md" className="mb-4">
          T-shirt Sizes
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Text type="body" size="sm" tone="muted" className="mb-2">
              Extra Small (xs)
            </Text>
            <Stack gap="xs">
              <Placeholder>Item 1</Placeholder>
              <Placeholder>Item 2</Placeholder>
              <Placeholder>Item 3</Placeholder>
            </Stack>
          </div>
          <div>
            <Text type="body" size="sm" tone="muted" className="mb-2">
              Small (sm)
            </Text>
            <Stack gap="sm">
              <Placeholder>Item 1</Placeholder>
              <Placeholder>Item 2</Placeholder>
              <Placeholder>Item 3</Placeholder>
            </Stack>
          </div>
          <div>
            <Text type="body" size="sm" tone="muted" className="mb-2">
              Medium (md)
            </Text>
            <Stack gap="md">
              <Placeholder>Item 1</Placeholder>
              <Placeholder>Item 2</Placeholder>
              <Placeholder>Item 3</Placeholder>
            </Stack>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div>
            <Text type="body" size="sm" tone="muted" className="mb-2">
              Large (lg)
            </Text>
            <Stack gap="lg">
              <Placeholder>Item 1</Placeholder>
              <Placeholder>Item 2</Placeholder>
              <Placeholder>Item 3</Placeholder>
            </Stack>
          </div>
          <div>
            <Text type="body" size="sm" tone="muted" className="mb-2">
              Extra Large (xl)
            </Text>
            <Stack gap="xl">
              <Placeholder>Item 1</Placeholder>
              <Placeholder>Item 2</Placeholder>
              <Placeholder>Item 3</Placeholder>
            </Stack>
          </div>
          <div>
            <Text type="body" size="sm" tone="muted" className="mb-2">
              2X Large (2xl)
            </Text>
            <Stack gap="2xl">
              <Placeholder>Item 1</Placeholder>
              <Placeholder>Item 2</Placeholder>
              <Placeholder>Item 3</Placeholder>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const AlignmentOptions: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Text type="heading" size="md" className="mb-4">
          Main Axis Alignment (justify)
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Text type="body" size="sm" tone="muted" className="mb-2">
                Start
              </Text>
              <div className="bg-muted/30 p-4 h-32">
                <Stack justify="start" gap="sm">
                  <Placeholder height="24px">Item 1</Placeholder>
                  <Placeholder height="24px">Item 2</Placeholder>
                </Stack>
              </div>
            </div>
            <div>
              <Text type="body" size="sm" tone="muted" className="mb-2">
                Center
              </Text>
              <div className="bg-muted/30 p-4 h-32">
                <Stack justify="center" gap="sm">
                  <Placeholder height="24px">Item 1</Placeholder>
                  <Placeholder height="24px">Item 2</Placeholder>
                </Stack>
              </div>
            </div>
            <div>
              <Text type="body" size="sm" tone="muted" className="mb-2">
                End
              </Text>
              <div className="bg-muted/30 p-4 h-32">
                <Stack justify="end" gap="sm">
                  <Placeholder height="24px">Item 1</Placeholder>
                  <Placeholder height="24px">Item 2</Placeholder>
                </Stack>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Text type="body" size="sm" tone="muted" className="mb-2">
                Space Between
              </Text>
              <div className="bg-muted/30 p-4 h-32">
                <Stack justify="space-between" gap="sm">
                  <Placeholder height="24px">Item 1</Placeholder>
                  <Placeholder height="24px">Item 2</Placeholder>
                </Stack>
              </div>
            </div>
            <div>
              <Text type="body" size="sm" tone="muted" className="mb-2">
                Space Around
              </Text>
              <div className="bg-muted/30 p-4 h-32">
                <Stack justify="space-around" gap="sm">
                  <Placeholder height="24px">Item 1</Placeholder>
                  <Placeholder height="24px">Item 2</Placeholder>
                </Stack>
              </div>
            </div>
            <div>
              <Text type="body" size="sm" tone="muted" className="mb-2">
                Space Evenly
              </Text>
              <div className="bg-muted/30 p-4 h-32">
                <Stack justify="space-evenly" gap="sm">
                  <Placeholder height="24px">Item 1</Placeholder>
                  <Placeholder height="24px">Item 2</Placeholder>
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Text type="heading" size="md" className="mb-4">
          Cross Axis Alignment (align)
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Text type="body" size="sm" tone="muted" className="mb-2">
              Start
            </Text>
            <div className="bg-muted/30 p-4">
              <Stack align="start" gap="sm">
                <Placeholder>Short</Placeholder>
                <Placeholder>Much longer content</Placeholder>
              </Stack>
            </div>
          </div>
          <div>
            <Text type="body" size="sm" tone="muted" className="mb-2">
              Center
            </Text>
            <div className="bg-muted/30 p-4">
              <Stack align="center" gap="sm">
                <Placeholder>Short</Placeholder>
                <Placeholder>Much longer content</Placeholder>
              </Stack>
            </div>
          </div>
          <div>
            <Text type="body" size="sm" tone="muted" className="mb-2">
              Stretch (default)
            </Text>
            <div className="bg-muted/30 p-4">
              <Stack align="stretch" gap="sm">
                <Placeholder>Short</Placeholder>
                <Placeholder>Much longer content</Placeholder>
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const DirectionVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Text type="heading" size="md" className="mb-4">
            Column (default)
          </Text>
          <Stack direction="column" gap="sm">
            <Placeholder>First</Placeholder>
            <Placeholder>Second</Placeholder>
            <Placeholder>Third</Placeholder>
          </Stack>
        </div>
        <div>
          <Text type="heading" size="md" className="mb-4">
            Row
          </Text>
          <Stack direction="row" gap="sm">
            <Placeholder>First</Placeholder>
            <Placeholder>Second</Placeholder>
            <Placeholder>Third</Placeholder>
          </Stack>
        </div>
        <div>
          <Text type="heading" size="md" className="mb-4">
            Column Reverse
          </Text>
          <Stack direction="column-reverse" gap="sm">
            <Placeholder>First</Placeholder>
            <Placeholder>Second</Placeholder>
            <Placeholder>Third</Placeholder>
          </Stack>
        </div>
        <div>
          <Text type="heading" size="md" className="mb-4">
            Row Reverse
          </Text>
          <Stack direction="row-reverse" gap="sm">
            <Placeholder>First</Placeholder>
            <Placeholder>Second</Placeholder>
            <Placeholder>Third</Placeholder>
          </Stack>
        </div>
      </div>
    </div>
  ),
}

export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <div>
        <Text type="heading" size="lg" className="mb-4">
          Card with Vertical Content
        </Text>
        <Card className="p-6">
          <Stack gap="lg">
            <Text type="heading" size="md">
              Product Settings
            </Text>
            <Text type="body" tone="muted">
              Configure your product visibility and availability
            </Text>

            <Stack gap="sm">
              <Text type="body" size="sm" weight={500}>
                Visibility
              </Text>
              <Text type="body" size="sm">
                Visible on online store and point of sale
              </Text>
            </Stack>

            <Stack direction="row" gap="sm" justify="start">
              <Button>Save Changes</Button>
              <Button variant="outline">Cancel</Button>
            </Stack>
          </Stack>
        </Card>
      </div>

      <div>
        <Text type="heading" size="lg" className="mb-4">
          Action Bar
        </Text>
        <div className="bg-muted/30 p-4 rounded">
          <Stack direction="row" justify="space-between" align="center" gap="md">
            <Text type="body" weight={500}>
              3 items selected
            </Text>
            <Stack direction="row" gap="sm">
              <Button size="sm">Edit</Button>
              <Button size="sm" variant="outline">
                Delete
              </Button>
              <Button size="sm" variant="ghost">
                More actions
              </Button>
            </Stack>
          </Stack>
        </div>
      </div>

      <div>
        <Text type="heading" size="lg" className="mb-4">
          Form Layout
        </Text>
        <Card className="p-6">
          <Stack gap="lg">
            <Text type="heading" size="md">
              Contact Information
            </Text>

            <Stack gap="md">
              <Stack gap="xs">
                <Text type="body" size="sm" weight={500}>
                  Full Name
                </Text>
                <div className="h-10 bg-muted rounded border"></div>
              </Stack>

              <Stack gap="xs">
                <Text type="body" size="sm" weight={500}>
                  Email
                </Text>
                <div className="h-10 bg-muted rounded border"></div>
              </Stack>

              <Stack direction="row" gap="md">
                <Stack gap="xs" className="flex-1">
                  <Text type="body" size="sm" weight={500}>
                    City
                  </Text>
                  <div className="h-10 bg-muted rounded border"></div>
                </Stack>
                <Stack gap="xs" className="flex-1">
                  <Text type="body" size="sm" weight={500}>
                    Postal Code
                  </Text>
                  <div className="h-10 bg-muted rounded border"></div>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Card>
      </div>
    </div>
  ),
}

export const ReverseOrder: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Text type="heading" size="md" className="mb-4">
            Normal Order
          </Text>
          <Stack gap="sm">
            <Placeholder>First (1)</Placeholder>
            <Placeholder>Second (2)</Placeholder>
            <Placeholder>Third (3)</Placeholder>
          </Stack>
        </div>
        <div>
          <Text type="heading" size="md" className="mb-4">
            Reverse Order
          </Text>
          <Stack gap="sm" reverseOrder>
            <Placeholder>First (1)</Placeholder>
            <Placeholder>Second (2)</Placeholder>
            <Placeholder>Third (3)</Placeholder>
          </Stack>
        </div>
      </div>
    </div>
  ),
}

export const SemanticElements: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Text type="heading" size="md" className="mb-4">
          List Elements
        </Text>
        <Stack as="ul" gap="sm" className="list-none">
          <Text as="li" type="body">
            Navigation item 1
          </Text>
          <Text as="li" type="body">
            Navigation item 2
          </Text>
          <Text as="li" type="body">
            Navigation item 3
          </Text>
        </Stack>
      </div>

      <div>
        <Text type="heading" size="md" className="mb-4">
          Section Element
        </Text>
        <Stack as="section" gap="lg">
          <Text type="heading" size="lg">
            Article Title
          </Text>
          <Text type="body">Article content goes here...</Text>
          <Text type="body" size="sm" tone="muted">
            Published on January 15, 2024
          </Text>
        </Stack>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const listElement = canvas.getByRole('list')
    await expect(listElement).toBeInTheDocument()
  },
}
