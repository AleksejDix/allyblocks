import type { Meta, StoryObj } from '@storybook/react-vite'
import { Empty } from './Empty'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
import { Box } from '@/components/atoms/Box'
import { Text } from '@/components/atoms/Text'
import { Stack } from '@/index'
import { ActionGroup } from '@/components/molecules/ActionGroup'
import { Card } from '@/components/molecules/Card'

const meta: Meta<typeof Empty> = {
  component: Empty,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Empty>

export const Default: Story = {
  render: (args) => (
    <div className="h-96 w-full border rounded-lg">
      <Empty {...args}>
        <Stack gap="xs" align="center">
          <Text as="h2" type="heading" size="lg" align="center">
            No results found
          </Text>
          <Text tone="muted" align="center">
            Try adjusting your search or filter to find what you're looking for.
          </Text>
        </Stack>
      </Empty>
    </div>
  ),
}

export const WithIcon: Story = {
  render: (args) => (
    <div className="h-96 w-full border rounded-lg">
      <Empty {...args}>
        <Box variant="orange" className="size-10 p-2 rounded-lg flex items-center justify-center">
          <Icon name="frown" />
        </Box>
        <Stack gap="xs" align="center">
          <Text as="h2" type="heading" size="lg" align="center">
            No results found
          </Text>
          <Text tone="muted" align="center">
            Try adjusting your search or filter to find what you're looking for.
          </Text>
        </Stack>
      </Empty>
    </div>
  ),
}

export const WithAction: Story = {
  render: (args) => (
    <div className="h-96 w-full border rounded-lg">
      <Empty {...args}>
        <Box variant="blue" className="size-10 p-2 rounded-lg flex items-center justify-center">
          <Icon name="search" />
        </Box>
        <Stack gap="xs" align="center">
          <Text as="h2" type="heading" size="lg" align="center">
            No results found
          </Text>
          <Text tone="muted" align="center">
            Try adjusting your search or filter to find what you're looking for.
          </Text>
        </Stack>
        <ActionGroup>
          <Button>Retry</Button>
        </ActionGroup>
      </Empty>
    </div>
  ),
}

export const Error404: Story = {
  render: (args) => (
    <div className="h-96 w-full border rounded-lg">
      <Empty {...args}>
        <Box variant="red" className="size-10 p-2 rounded-lg flex items-center justify-center">
          <Icon name="file-x" />
        </Box>
        <Stack gap="xs" align="center">
          <Text as="h2" type="heading" size="lg" align="center">
            404 - Page not found
          </Text>
          <Text tone="muted" align="center">
            The page you're looking for doesn't exist or has been moved.
          </Text>
        </Stack>
        <ActionGroup>
          <Button>Go back home</Button>
        </ActionGroup>
      </Empty>
    </div>
  ),
}

export const NoData: Story = {
  render: (args) => (
    <div className="h-96 w-full border rounded-lg">
      <Empty {...args}>
        <Box variant="slate" className="size-10 p-2 rounded-lg flex items-center justify-center">
          <Icon name="database" />
        </Box>
        <Stack gap="xs" align="center">
          <Text as="h2" type="heading" size="lg" align="center">
            No data available
          </Text>
          <Text tone="muted" align="center">
            There is no data to display at this time.
          </Text>
        </Stack>
        <ActionGroup>
          <Button variant="outline">Refresh</Button>
        </ActionGroup>
      </Empty>
    </div>
  ),
}

export const EmptyCard: Story = {
  render: (args) => (
    <Card>
      <Empty {...args}>
        <Box variant="purple" className="size-10 p-2 rounded-lg flex items-center justify-center">
          <Icon name="bell" />
        </Box>
        <Stack gap="xs" align="center">
          <Text as="h2" type="heading" size="lg" align="center">
            No notifications
          </Text>
          <Text tone="muted" align="center">
            You don't have any notifications at this time.
          </Text>
        </Stack>
      </Empty>
    </Card>
  ),
}

export const InboxEmpty: Story = {
  render: (args) => (
    <div className="h-96 w-full border rounded-lg">
      <Empty {...args}>
        <Box variant="emerald" className="size-10 p-2 rounded-lg flex items-center justify-center">
          <Icon name="inbox" />
        </Box>
        <Stack gap="xs" align="center">
          <Text as="h2" type="heading" size="lg" align="center">
            Your inbox is empty
          </Text>
          <Text tone="muted" align="center">
            When you receive messages, they'll appear here.
          </Text>
        </Stack>
        <ActionGroup>
          <Button>Compose message</Button>
        </ActionGroup>
      </Empty>
    </div>
  ),
}

export const WithMultipleActions: Story = {
  render: (args) => (
    <div className="h-96 w-full border rounded-lg">
      <Empty {...args}>
        <Box variant="cyan" className="size-10 p-2 rounded-lg flex items-center justify-center">
          <Icon name="search" />
        </Box>
        <Stack gap="xs" align="center">
          <Text as="h2" type="heading" size="lg" align="center">
            Nothing here yet
          </Text>
          <Text tone="muted" align="center">
            This space is waiting for your content.
          </Text>
        </Stack>
        <ActionGroup>
          <Button variant="outline">Clear filters</Button>
          <Button>Create new</Button>
        </ActionGroup>
      </Empty>
    </div>
  ),
}

// New colorful examples
export const SuccessState: Story = {
  render: (args) => (
    <div className="h-96 w-full border rounded-lg">
      <Empty {...args}>
        <Box variant="green" className="size-12 p-3 rounded-xl flex items-center justify-center">
          <Icon name="check-circle" />
        </Box>
        <Stack gap="xs" align="center">
          <Text as="h2" type="heading" size="lg" align="center">
            All done!
          </Text>
          <Text tone="muted" align="center">
            You've completed all your tasks. Great work!
          </Text>
        </Stack>
        <ActionGroup>
          <Button>Add new task</Button>
        </ActionGroup>
      </Empty>
    </div>
  ),
}

export const InfoState: Story = {
  render: (args) => (
    <div className="h-96 w-full border rounded-lg">
      <Empty {...args}>
        <Box variant="sky" className="size-12 p-3 rounded-xl flex items-center justify-center">
          <Icon name="info" />
        </Box>
        <Stack gap="xs" align="center">
          <Text as="h2" type="heading" size="lg" align="center">
            Getting started
          </Text>
          <Text tone="muted" align="center">
            Create your first project to begin your journey.
          </Text>
        </Stack>
        <ActionGroup>
          <Button>Create project</Button>
          <Button variant="outline">Learn more</Button>
        </ActionGroup>
      </Empty>
    </div>
  ),
}

export const WarningState: Story = {
  render: (args) => (
    <div className="h-96 w-full border rounded-lg">
      <Empty {...args}>
        <Box variant="amber" className="size-12 p-3 rounded-xl flex items-center justify-center">
          <Icon name="alert-triangle" />
        </Box>
        <Stack gap="xs" align="center">
          <Text as="h2" type="heading" size="lg" align="center">
            Access restricted
          </Text>
          <Text tone="muted" align="center">
            You don't have permission to view this content.
          </Text>
        </Stack>
        <ActionGroup>
          <Button variant="outline">Request access</Button>
        </ActionGroup>
      </Empty>
    </div>
  ),
}

export const CreativeState: Story = {
  render: (args) => (
    <Card>
      <Empty {...args}>
        <Box variant="pink" className="size-12 p-3 rounded-xl flex items-center justify-center">
          <Icon name="sparkles" />
        </Box>
        <Stack gap="xs" align="center">
          <Text as="h2" type="heading" size="lg" align="center">
            Ready to create
          </Text>
          <Text tone="muted" align="center">
            Your canvas is blank. What will you create today?
          </Text>
        </Stack>
        <ActionGroup>
          <Button>Start creating</Button>
          <Button variant="outline">View templates</Button>
        </ActionGroup>
      </Empty>
    </Card>
  ),
}

export const ColorShowcase: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 gap-6 p-4">
      <div className="h-64 border rounded-lg">
        <Empty {...args}>
          <Box variant="violet" className="size-10 p-2 rounded-lg flex items-center justify-center">
            <Icon name="heart" />
          </Box>
          <Text as="h3" type="heading" align="center">
            Violet Empty
          </Text>
        </Empty>
      </div>
      <div className="h-64 border rounded-lg">
        <Empty {...args}>
          <Box variant="rose" className="size-10 p-2 rounded-lg flex items-center justify-center">
            <Icon name="star" />
          </Box>
          <Text as="h3" type="heading" align="center">
            Rose Empty
          </Text>
        </Empty>
      </div>
      <div className="h-64 border rounded-lg">
        <Empty {...args}>
          <Box variant="teal" className="size-10 p-2 rounded-lg flex items-center justify-center">
            <Icon name="zap" />
          </Box>
          <Text as="h3" type="heading" align="center">
            Teal Empty
          </Text>
        </Empty>
      </div>
      <div className="h-64 border rounded-lg">
        <Empty {...args}>
          <Box variant="indigo" className="size-10 p-2 rounded-lg flex items-center justify-center">
            <Icon name="moon" />
          </Box>
          <Text as="h3" type="heading" align="center">
            Indigo Empty
          </Text>
        </Empty>
      </div>
    </div>
  ),
}
