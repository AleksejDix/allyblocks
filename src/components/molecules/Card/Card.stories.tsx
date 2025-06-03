import type { Meta, StoryObj } from '@storybook/react-vite'
import { within, expect } from 'storybook/test'

import { Card, CardHeader, CardSection, CardFooter, CardTitle, CardDescription, CardBody, CardAction } from './Card'
import { Button } from '@/components/atoms/Button'
import { ActionGroup } from '../ActionGroup'
import { IconButton } from '@/components/atoms/IconButton'
import { Terms, Term, TermDefinition } from '@/components/atoms/Terms'
import { Icon } from '@/components/atoms/Icon'
import { Input } from '@/components/atoms/Input'
import { Label } from '@/components/atoms/Label'
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/atoms/Table'

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
    <div className="flex flex-col gap-4">
      <Button>Button</Button>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Featured Content</CardTitle>
          <CardDescription>Highlighted information</CardDescription>
          <CardAction>
            <Button variant="ghost">Edit</Button>
            <IconButton variant="ghost" aria-label="Close">
              <Icon name="x" size={16} />
            </IconButton>
          </CardAction>
        </CardHeader>
        <CardFooter>
          <Button variant="outline">View Full Specs</Button>
        </CardFooter>
      </Card>
    </div>
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
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is the card description that provides additional context.</CardDescription>
      </CardHeader>
      <CardBody>
        <p>This is the main content area of the card where the primary information is displayed.</p>
      </CardBody>
      <CardFooter>
        <p className="text-sm text-muted-foreground">Last updated: 2 hours ago</p>
      </CardFooter>
    </Card>
  ),
}

// NEW: Sectioned Card (Polaris-style)
export const SectionedCard: Story = {
  render: () => (
    <Card className="w-[450px]" sectioned>
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
        <CardDescription>Manage your product information</CardDescription>
        <CardAction>
          <ActionGroup>
            <IconButton variant="outline" size="sm" aria-label="Edit">
              <Icon name="edit" />
            </IconButton>
            <IconButton variant="outline" size="sm" aria-label="More options">
              <Icon name="more-horizontal" />
            </IconButton>
          </ActionGroup>
        </CardAction>
      </CardHeader>

      <CardSection
        title="Basic Information"
        actions={
          <Button variant="ghost" size="sm">
            Edit
          </Button>
        }
      >
        <div className="space-y-3">
          <div>
            <Label className="text-sm font-medium">Product Name</Label>
            <p className="text-sm text-muted-foreground">Wireless Headphones Pro</p>
          </div>
          <div>
            <Label className="text-sm font-medium">SKU</Label>
            <p className="text-sm text-muted-foreground">WHP-001</p>
          </div>
        </div>
      </CardSection>

      <CardSection title="Pricing" subdued>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Price</Label>
              <p className="text-lg font-semibold">$299.99</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Compare at price</Label>
              <p className="text-sm text-muted-foreground line-through">$399.99</p>
            </div>
          </div>
        </div>
      </CardSection>

      <CardSection title="Inventory">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label className="text-sm font-medium">Available</Label>
            <p className="text-2xl font-bold text-green-600">127</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Committed</Label>
            <p className="text-2xl font-bold">23</p>
          </div>
          <div>
            <Label className="text-sm font-medium">On hand</Label>
            <p className="text-2xl font-bold">150</p>
          </div>
        </div>
      </CardSection>
    </Card>
  ),
}

// NEW: Form Layout Card (Polaris-style)
export const FormLayoutCard: Story = {
  render: () => (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Customer Information</CardTitle>
        <CardDescription>Update customer details</CardDescription>
      </CardHeader>

      <CardBody>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" placeholder="Enter first name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" placeholder="Enter last name" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="customer@example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone number</Label>
            <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
          </div>
        </div>
      </CardBody>

      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Save Customer</Button>
      </CardFooter>
    </Card>
  ),
}

// NEW: Resource Details Card (Polaris-style)
export const ResourceDetailsCard: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 max-w-6xl">
      {/* Main content */}
      <div className="space-y-6">
        <Card sectioned>
          <CardSection title="Product Images">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <Icon name="image" size={48} className="text-muted-foreground" />
            </div>
          </CardSection>

          <CardSection title="Product Description">
            <div className="prose prose-sm max-w-none">
              <p>High-quality wireless headphones with active noise cancellation and premium sound quality.</p>
              <ul>
                <li>40-hour battery life</li>
                <li>Active noise cancellation</li>
                <li>Premium audio drivers</li>
                <li>Comfortable over-ear design</li>
              </ul>
            </div>
          </CardSection>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-4">
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle size="sm">Status</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Active</span>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle size="sm">Sales Channels</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Online Store</span>
                <Icon name="check" size={16} className="text-green-500" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Point of Sale</span>
                <Icon name="x" size={16} className="text-muted-foreground" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  ),
}

// Existing stories with minor adjustments
export const WithImage: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Featured Content</CardTitle>
        <CardDescription>Highlighted information</CardDescription>
      </CardHeader>
      <img src="https://picsum.photos/500/300" className="w-full object-cover aspect-video" alt="Featured Content" />
    </Card>
  ),
}

export const WithFooterActions: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Featured Content</CardTitle>
        <CardDescription>Highlighted information</CardDescription>
      </CardHeader>
      <CardBody>
        <p>This card has a custom border color to draw attention to it.</p>
      </CardBody>
      <CardFooter>
        <ActionGroup>
          <Button>Action 1</Button>
          <Button>Action 2</Button>
        </ActionGroup>
      </CardFooter>
    </Card>
  ),
}

export const WithHeaderActions: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button>Button</Button>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>
            <Icon name="webcam" size={24} /> Featured Content
          </CardTitle>
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
        </CardHeader>
        <CardBody>
          <p>This card has a custom border color to draw attention to it.</p>
        </CardBody>
      </Card>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const title = canvas.getByText('Featured Content')
    await expect(title).toBeInTheDocument()
    const addButton = canvas.getByText('Add item', { selector: '.sr-only' })
    const shareButton = canvas.getByText('Share', { selector: '.sr-only' })
    await expect(addButton).toBeInTheDocument()
    await expect(shareButton).toBeInTheDocument()
  },
}

export const WithTerms: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>User information displayed with Terms component</CardDescription>
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
        <p className="text-sm text-muted-foreground">Last updated: 2 hours ago</p>
      </CardFooter>
    </Card>
  ),
}

export const WithStyledTerms: Story = {
  render: () => (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Product Specifications</CardTitle>
        <CardDescription>Technical details shown with styled Terms component</CardDescription>
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

export const WithStripedTerms: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Subscription Details</CardTitle>
        <CardDescription>Current plan information with striped styling</CardDescription>
      </CardHeader>
      <CardBody>
        <Terms variant="striped" className="md:grid-cols-5 text-sm">
          <Term className="md:col-span-2">Plan</Term>
          <TermDefinition className="md:col-span-3">Business Pro</TermDefinition>

          <Term className="md:col-span-2">Billing Cycle</Term>
          <TermDefinition className="md:col-span-3">Annual (paid monthly)</TermDefinition>

          <Term className="md:col-span-2">Amount</Term>
          <TermDefinition className="md:col-span-3">$49.99/month</TermDefinition>

          <Term className="md:col-span-2">Next Billing Date</Term>
          <TermDefinition className="md:col-span-3">July 15, 2023</TermDefinition>

          <Term className="md:col-span-2">Payment Method</Term>
          <TermDefinition className="md:col-span-3">•••• 4242</TermDefinition>
        </Terms>
      </CardBody>
      <CardFooter>
        <ActionGroup className="justify-end w-full">
          <Button variant="ghost">Cancel</Button>
          <Button>Change Plan</Button>
        </ActionGroup>
      </CardFooter>
    </Card>
  ),
}

// NEW: Card with Table - Orders List
export const WithTable: Story = {
  render: () => (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Manage and track your customer orders</CardDescription>
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
      </CardHeader>

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
                <div>
                  <div className="font-medium">John Doe</div>
                  <div className="text-sm text-muted-foreground">john@example.com</div>
                </div>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  Completed
                </span>
              </TableCell>
              <TableCell className="font-medium">$299.99</TableCell>
              <TableCell className="text-muted-foreground">Dec 15, 2023</TableCell>
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
                <div>
                  <div className="font-medium">Jane Smith</div>
                  <div className="text-sm text-muted-foreground">jane@example.com</div>
                </div>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
                  Processing
                </span>
              </TableCell>
              <TableCell className="font-medium">$149.50</TableCell>
              <TableCell className="text-muted-foreground">Dec 14, 2023</TableCell>
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
                <div>
                  <div className="font-medium">Robert Johnson</div>
                  <div className="text-sm text-muted-foreground">robert@example.com</div>
                </div>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                  Cancelled
                </span>
              </TableCell>
              <TableCell className="font-medium">$89.99</TableCell>
              <TableCell className="text-muted-foreground">Dec 13, 2023</TableCell>
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
                <div>
                  <div className="font-medium">Emily White</div>
                  <div className="text-sm text-muted-foreground">emily@example.com</div>
                </div>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                  Shipped
                </span>
              </TableCell>
              <TableCell className="font-medium">$199.99</TableCell>
              <TableCell className="text-muted-foreground">Dec 12, 2023</TableCell>
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

      <CardFooter className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Showing 4 of 247 orders</p>
        <ActionGroup>
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </ActionGroup>
      </CardFooter>
    </Card>
  ),
}

// NEW: Sectioned Card with Multiple Tables
export const SectionedWithTables: Story = {
  render: () => (
    <Card className="w-full max-w-5xl" sectioned>
      <CardHeader>
        <CardTitle>Sales Analytics</CardTitle>
        <CardDescription>Overview of sales performance across different metrics</CardDescription>
      </CardHeader>

      <CardSection
        title="Top Products"
        actions={
          <Button variant="ghost" size="sm">
            View All
          </Button>
        }
      >
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
      </CardSection>

      <CardSection
        title="Regional Performance"
        actions={
          <Button variant="ghost" size="sm">
            Export
          </Button>
        }
      >
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
      </CardSection>
    </Card>
  ),
}
