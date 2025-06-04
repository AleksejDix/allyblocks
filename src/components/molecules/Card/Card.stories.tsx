import type { Meta, StoryObj } from '@storybook/react-vite'
import { within, expect } from 'storybook/test'

import { Card, CardHeader, CardFooter, CardBody, CardAction, Bleed } from './Card'
import { Text } from '@/components/atoms/Text'
import { Button } from '@/components/atoms/Button'
import { ActionGroup } from '../ActionGroup'
import { IconButton } from '@/components/atoms/IconButton'
import { Terms, Term, TermDefinition } from '@/components/atoms/Terms'
import { Icon } from '@/components/atoms/Icon'
import { Input } from '@/components/atoms/Input'
import { Label } from '@/components/atoms/Label'
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/atoms/Table'
import { Stack } from '@/components/atoms/Stack'
import { Badge } from '@/components/atoms/Badge'

const meta: Meta<typeof Card> = {
  component: Card,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Card>

// Basic card with content
export const Basic: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <Stack justify="between" align="center" direction="row">
          <Stack direction="row" align="center" gap="sm">
            <Icon name="apple" size={16} />
            <Text as="h2" type="heading">
              Featured Content
            </Text>
          </Stack>
          <CardAction>
            <IconButton variant="outline" aria-label="Close">
              <Icon name="expand" size={16} />
            </IconButton>
          </CardAction>
        </Stack>
      </CardHeader>

      <CardBody>
        <Text type="body" tone="muted">
          This is the main content area of the card where the primary information is displayed.
        </Text>
      </CardBody>
      <CardFooter>
        <Button variant="outline">View Full Specs</Button>
      </CardFooter>
    </Card>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const content = canvas.getByText('Featured Content')
    await expect(content).toBeInTheDocument()
  },
}

// Complete card with all components
export const Complete: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <Text as="h2" type="heading">
          Card Title
        </Text>
        <Text as="p" type="body" tone="muted">
          This is the card description that provides additional context.
        </Text>
      </CardHeader>
      <CardBody>
        <Text type="body">This is the main content area of the card where the primary information is displayed.</Text>
      </CardBody>
      <CardFooter>
        <Text type="body" size="sm" tone="muted">
          Last updated: 2 hours ago
        </Text>
      </CardFooter>
    </Card>
  ),
}

// Product details card with structured content
export const ProductCard: Story = {
  render: () => (
    <Card className="w-[450px]">
      <CardHeader>
        <Stack justify="between" align="start" direction="row">
          <div>
            <Text as="h2" type="heading">
              Product Details
            </Text>
            <Text as="p" type="body" size="sm" tone="muted">
              Manage your product information
            </Text>
          </div>
          <CardAction>
            <ActionGroup>
              <IconButton variant="ghost" aria-label="Edit">
                <Icon name="pen" />
              </IconButton>
              <IconButton variant="ghost" aria-label="More options">
                <Icon name="more-horizontal" />
              </IconButton>
            </ActionGroup>
          </CardAction>
        </Stack>
      </CardHeader>

      <CardBody>
        <Stack gap="lg">
          <Stack gap="md">
            <Stack justify="between" align="center" direction="row">
              <Text type="body" weight={500}>
                Basic Information
              </Text>
              <Button variant="link" size="sm">
                Edit
              </Button>
            </Stack>
            <Stack gap="sm">
              <Stack gap="xs">
                <Label className="text-sm font-medium">Product Name</Label>
                <Text type="body" size="sm" tone="muted">
                  Wireless Headphones Pro
                </Text>
              </Stack>
              <Stack gap="xs">
                <Label className="text-sm font-medium">SKU</Label>
                <Text type="body" size="sm" tone="muted">
                  WHP-001
                </Text>
              </Stack>
            </Stack>
          </Stack>

          <div className="bg-muted/30 p-4 rounded-lg">
            <Stack gap="md">
              <Text type="body" weight={500}>
                Pricing
              </Text>
              <div className="grid grid-cols-2 gap-4">
                <Stack gap="xs">
                  <Text type="body" size="sm" weight={600}>
                    Price
                  </Text>
                  <Text type="body" size="lg" weight={600}>
                    $299.99
                  </Text>
                </Stack>
                <Stack gap="xs">
                  <Text type="body" size="sm" weight={600}>
                    Compare at price
                  </Text>
                  <Text type="body" size="sm" tone="muted" className="line-through">
                    $399.99
                  </Text>
                </Stack>
              </div>
            </Stack>
          </div>

          <Stack gap="md">
            <Text type="body" weight={500}>
              Inventory
            </Text>
            <div className="grid grid-cols-3 gap-4">
              <Stack gap="xs">
                <Text type="body" size="sm" tone="muted">
                  Available
                </Text>
                <Text type="body" size="lg" weight={600}>
                  127
                </Text>
              </Stack>
              <Stack gap="xs">
                <Text type="body" size="sm" tone="muted">
                  Committed
                </Text>
                <Text type="body" size="lg" weight={600}>
                  23
                </Text>
              </Stack>
              <Stack gap="xs">
                <Text type="body" size="sm" tone="muted">
                  On hand
                </Text>
                <Text type="body" size="lg" weight={600}>
                  150
                </Text>
              </Stack>
            </div>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  ),
}

// Form layout card
export const FormLayoutCard: Story = {
  render: () => (
    <Card className="w-[500px]">
      <CardHeader>
        <Stack gap="xs">
          <Text type="heading">Customer Information</Text>
          <Text type="body" size="sm" tone="muted">
            Update customer details
          </Text>
        </Stack>
      </CardHeader>

      <CardBody>
        <Stack gap="lg">
          <div className="grid grid-cols-2 gap-4">
            <Stack gap="xs">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" placeholder="Enter first name" />
            </Stack>
            <Stack gap="xs">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" placeholder="Enter last name" />
            </Stack>
          </div>

          <Stack gap="xs">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="customer@example.com" />
          </Stack>

          <Stack gap="xs">
            <Label htmlFor="phone">Phone number</Label>
            <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
          </Stack>
        </Stack>
      </CardBody>

      <CardFooter>
        <Stack direction="row" justify="between" className="w-full">
          <Button variant="outline">Cancel</Button>
          <Button>Save Customer</Button>
        </Stack>
      </CardFooter>
    </Card>
  ),
}

// Resource details card with sidebar layout
export const ResourceDetailsCard: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 max-w-6xl">
      {/* Main content */}
      <Stack gap="lg">
        <Card>
          <CardHeader>
            <Text type="heading">Product Images</Text>
          </CardHeader>
          <CardBody>
            <Bleed>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <Icon name="image" size={48} className="text-muted-foreground" />
              </div>
            </Bleed>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Text type="heading">Product Description</Text>
          </CardHeader>
          <CardBody>
            <Stack gap="md">
              <Text type="body">
                High-quality wireless headphones with active noise cancellation and premium sound quality.
              </Text>
              <Stack gap="xs">
                <Text type="body">• 40-hour battery life</Text>
                <Text type="body">• Active noise cancellation</Text>
                <Text type="body">• Premium audio drivers</Text>
                <Text type="body">• Comfortable over-ear design</Text>
              </Stack>
            </Stack>
          </CardBody>
        </Card>
      </Stack>

      {/* Sidebar */}
      <Stack gap="md">
        <Card className="bg-muted/50">
          <CardHeader>
            <Text type="heading" size="md">
              Status
            </Text>
          </CardHeader>
          <CardBody>
            <Stack direction="row" align="center" gap="sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <Text type="body" size="sm">
                Active
              </Text>
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Text type="heading" size="md">
              Sales Channels
            </Text>
          </CardHeader>
          <CardBody>
            <Stack gap="sm">
              <Stack direction="row" justify="between" align="center">
                <Text type="body" size="sm">
                  Online Store
                </Text>
                <Icon name="check" size={16} className="text-green-500" />
              </Stack>
              <Stack direction="row" justify="between" align="center">
                <Text type="body" size="sm">
                  Point of Sale
                </Text>
                <Icon name="x" size={16} className="text-muted-foreground" />
              </Stack>
            </Stack>
          </CardBody>
        </Card>
      </Stack>
    </div>
  ),
}

// Card with image
export const WithImage: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <Stack gap="xs">
          <Text type="heading">Featured Content</Text>
          <Text type="body" size="sm" tone="muted">
            Highlighted information
          </Text>
        </Stack>
      </CardHeader>
      <CardBody>
        <Bleed>
          <img
            src="https://picsum.photos/500/300"
            className="w-full object-cover aspect-video"
            alt="Featured Content"
          />
        </Bleed>
      </CardBody>
    </Card>
  ),
}

// Card with footer actions
export const WithFooterActions: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <Stack gap="xs">
          <Text type="heading">Featured Content</Text>
          <Text type="body" size="sm" tone="muted">
            Highlighted information
          </Text>
        </Stack>
      </CardHeader>
      <CardBody>
        <Text type="body">This card has footer actions to perform various operations.</Text>
      </CardBody>
      <CardFooter>
        <ActionGroup>
          <Button>Action 1</Button>
          <Button variant="outline">Action 2</Button>
        </ActionGroup>
      </CardFooter>
    </Card>
  ),
}

// Card with header actions
export const WithHeaderActions: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <Stack justify="between" align="center" direction="row">
          <Text type="heading">Featured Content</Text>

          <CardAction>
            <ActionGroup>
              <IconButton variant="outline" aria-label="Add item">
                <Icon name="plus" />
              </IconButton>
              <IconButton variant="outline" aria-label="Share">
                <Icon name="share" />
              </IconButton>
            </ActionGroup>
          </CardAction>
        </Stack>
      </CardHeader>
      <CardBody>
        <Text type="body">This card has header actions for quick access to common operations.</Text>
      </CardBody>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const title = canvas.getByText('Featured Content')
    await expect(title).toBeInTheDocument()
    const addButton = canvas.getByLabelText('Add item')
    const shareButton = canvas.getByLabelText('Share')
    await expect(addButton).toBeInTheDocument()
    await expect(shareButton).toBeInTheDocument()
  },
}

// Card with Terms component
export const WithTerms: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <Stack gap="xs">
          <Text type="heading">User Profile</Text>
          <Text type="body" size="sm" tone="muted">
            User information displayed with Terms component
          </Text>
        </Stack>
      </CardHeader>
      <CardBody>
        <Terms>
          <Term>Name</Term>
          <TermDefinition>John Doe</TermDefinition>

          <Term>Email</Term>
          <TermDefinition>john.doe@example.com</TermDefinition>

          <Term>Role</Term>
          <TermDefinition>Administrator</TermDefinition>

          <Term>Status</Term>
          <TermDefinition>
            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              Active
            </span>
          </TermDefinition>
        </Terms>
      </CardBody>
      <CardFooter>
        <Text type="body" size="sm" tone="muted">
          Last updated: 2 hours ago
        </Text>
      </CardFooter>
    </Card>
  ),
}

// Card with styled Terms
export const WithStyledTerms: Story = {
  render: () => (
    <Card className="w-[450px]">
      <CardHeader>
        <Stack gap="xs">
          <Text type="heading">Product Specifications</Text>
          <Text type="body" size="sm" tone="muted">
            Technical details shown with styled Terms component
          </Text>
        </Stack>
      </CardHeader>
      <CardBody>
        <Terms variant="divided" className="text-sm">
          <Term>Model</Term>
          <TermDefinition>XPS 13 9310</TermDefinition>

          <Term>Processor</Term>
          <TermDefinition>Intel Core i7-1165G7 (12MB Cache, up to 4.7 GHz)</TermDefinition>

          <Term>Memory</Term>
          <TermDefinition>16GB 4267MHz LPDDR4x</TermDefinition>

          <Term>Storage</Term>
          <TermDefinition>512GB M.2 PCIe NVMe SSD</TermDefinition>

          <Term>Display</Term>
          <TermDefinition>13.4" UHD+ (3840 x 2400) InfinityEdge Touch</TermDefinition>

          <Term>Graphics</Term>
          <TermDefinition>Intel Iris Xe Graphics</TermDefinition>
        </Terms>
      </CardBody>
      <CardFooter>
        <Button variant="outline">View Full Specs</Button>
      </CardFooter>
    </Card>
  ),
}

// Card with Table - Orders List
export const WithTable: Story = {
  render: () => (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <Stack justify="between" align="start" direction="row">
          <Stack gap="xs">
            <Text type="heading">Recent Orders</Text>
            <Text type="body" size="sm" tone="muted">
              Manage and track your customer orders
            </Text>
          </Stack>
          <CardAction>
            <ActionGroup>
              <Button variant="outline" size="sm">
                <Icon name="download" size={16} />
                Export
              </Button>
              <Button size="sm">
                <Icon name="plus" size={16} />
                Add Order
              </Button>
            </ActionGroup>
          </CardAction>
        </Stack>
      </CardHeader>

      <CardBody>
        <Bleed>
          <div className="overflow-hidden">
            <Table variant="divided" density="default">
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono text-sm">#12345</TableCell>
                  <TableCell>
                    <Stack gap="xs">
                      <Text type="body" weight={500}>
                        John Doe
                      </Text>
                      <Text type="body" size="sm" tone="muted">
                        john@example.com
                      </Text>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Badge color="green">Completed</Badge>
                  </TableCell>
                  <TableCell>
                    <Text type="body" weight={500}>
                      $299.99
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Text type="body" tone="muted">
                      Dec 15, 2023
                    </Text>
                  </TableCell>
                  <TableCell className="text-right">
                    <ActionGroup>
                      <IconButton variant="ghost" size="sm" aria-label="View order">
                        <Icon name="eye" />
                      </IconButton>
                      <IconButton variant="ghost" size="sm" aria-label="Edit order">
                        <Icon name="edit" />
                      </IconButton>
                    </ActionGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">#12344</TableCell>
                  <TableCell>
                    <Stack gap="xs">
                      <Text type="body" weight={500}>
                        Jane Smith
                      </Text>
                      <Text type="body" size="sm" tone="muted">
                        jane@example.com
                      </Text>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Badge color="yellow">Processing</Badge>
                  </TableCell>
                  <TableCell>
                    <Text type="body" weight={500}>
                      $149.50
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Text type="body" tone="muted">
                      Dec 14, 2023
                    </Text>
                  </TableCell>
                  <TableCell className="text-right">
                    <ActionGroup>
                      <IconButton variant="ghost" size="sm" aria-label="View order">
                        <Icon name="eye" />
                      </IconButton>
                      <IconButton variant="ghost" size="sm" aria-label="Edit order">
                        <Icon name="edit" />
                      </IconButton>
                    </ActionGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">#12343</TableCell>
                  <TableCell>
                    <Stack gap="xs">
                      <Text type="body" weight={500}>
                        Robert Johnson
                      </Text>
                      <Text type="body" size="sm" tone="muted">
                        robert@example.com
                      </Text>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Badge color="red">Cancelled</Badge>
                  </TableCell>
                  <TableCell>
                    <Text type="body" weight={500}>
                      $89.99
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Text type="body" tone="muted">
                      Dec 13, 2023
                    </Text>
                  </TableCell>
                  <TableCell className="text-right">
                    <ActionGroup>
                      <IconButton variant="ghost" size="sm" aria-label="View order">
                        <Icon name="eye" />
                      </IconButton>
                      <IconButton variant="ghost" size="sm" aria-label="Refund">
                        <Icon name="undo" />
                      </IconButton>
                    </ActionGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">#12342</TableCell>
                  <TableCell>
                    <Stack gap="xs">
                      <Text type="body" weight={500}>
                        Emily White
                      </Text>
                      <Text type="body" size="sm" tone="muted">
                        emily@example.com
                      </Text>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Badge color="blue">Shipped</Badge>
                  </TableCell>
                  <TableCell>
                    <Text type="body" weight={500}>
                      $199.99
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Text type="body" tone="muted">
                      Dec 12, 2023
                    </Text>
                  </TableCell>
                  <TableCell className="text-right">
                    <ActionGroup>
                      <IconButton variant="ghost" size="sm" aria-label="Track order">
                        <Icon name="truck" />
                      </IconButton>
                      <IconButton variant="ghost" size="sm" aria-label="View order">
                        <Icon name="eye" />
                      </IconButton>
                    </ActionGroup>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Bleed>
      </CardBody>

      <CardFooter>
        <Stack direction="row" justify="between" align="center" className="w-full">
          <Text type="body" size="sm" tone="muted">
            Showing 4 of 247 orders
          </Text>
          <ActionGroup>
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </ActionGroup>
        </Stack>
      </CardFooter>
    </Card>
  ),
}

// Analytics card with multiple data sections
export const AnalyticsCard: Story = {
  render: () => (
    <Card className="w-full max-w-5xl">
      <CardHeader>
        <Stack gap="xs">
          <Text type="heading">Sales Analytics</Text>
          <Text type="body" size="sm" tone="muted">
            Overview of sales performance across different metrics
          </Text>
        </Stack>
      </CardHeader>

      <CardBody>
        <Stack gap="xl">
          <Stack gap="md">
            <Stack justify="between" align="center" direction="row">
              <Text type="body" weight={500}>
                Top Products
              </Text>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Stack>
            <Table variant="striped" density="compact">
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Wireless Headphones</TableCell>
                  <TableCell>1,234</TableCell>
                  <TableCell>$369,966</TableCell>
                  <TableCell className="text-green-600">+12.5%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Smartphone Case</TableCell>
                  <TableCell>856</TableCell>
                  <TableCell>$25,680</TableCell>
                  <TableCell className="text-green-600">+8.2%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>USB Cable</TableCell>
                  <TableCell>2,143</TableCell>
                  <TableCell>$42,860</TableCell>
                  <TableCell className="text-red-600">-3.1%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Stack>

          <Stack gap="md">
            <Stack justify="between" align="center" direction="row">
              <Text type="body" weight={500}>
                Regional Performance
              </Text>
              <Button variant="ghost" size="sm">
                Export
              </Button>
            </Stack>
            <Table variant="divided" density="default">
              <TableHeader>
                <TableRow>
                  <TableHead>Region</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Avg. Order Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>North America</TableCell>
                  <TableCell>5,467</TableCell>
                  <TableCell>$1,634,010</TableCell>
                  <TableCell>$298.89</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Europe</TableCell>
                  <TableCell>3,892</TableCell>
                  <TableCell>$1,167,600</TableCell>
                  <TableCell>$299.95</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Asia Pacific</TableCell>
                  <TableCell>2,156</TableCell>
                  <TableCell>$646,800</TableCell>
                  <TableCell>$300.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  ),
}
