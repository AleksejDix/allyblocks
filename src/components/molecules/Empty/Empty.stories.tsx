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
        <Stack gap="sm" align="center">
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
        <Box variant="muted" className="size-10 p-2 rounded-lg flex items-center justify-center">
          <Icon name="frown" />
        </Box>
        <Stack gap="sm" align="center">
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
        <Box variant="muted" className="size-10 p-2 rounded-lg flex items-center justify-center">
          <Icon name="search" />
        </Box>
        <Stack gap="sm" align="center">
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
        <Box variant="muted" className="size-10 p-2 rounded-lg flex items-center justify-center">
          <Icon name="file-x" />
        </Box>
        <Stack gap="sm" align="center">
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
        <Box variant="muted" className="size-10 p-2 rounded-lg flex items-center justify-center">
          <Icon name="database" />
        </Box>
        <Stack gap="sm" align="center">
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
        <Box variant="muted" className="size-10 p-2 rounded-lg flex items-center justify-center">
          <Icon name="bell" />
        </Box>
        <Stack gap="sm" align="center">
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
        <Box variant="muted" className="size-10 p-2 rounded-lg flex items-center justify-center">
          <Icon name="inbox" />
        </Box>
        <Stack gap="sm" align="center">
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
        <Box variant="muted" className="size-10 p-2 rounded-lg flex items-center justify-center">
          <Icon name="search" />
        </Box>
        <Stack gap="sm" align="center">
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
