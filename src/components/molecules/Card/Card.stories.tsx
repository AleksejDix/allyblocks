import type { Meta, StoryObj } from '@storybook/react'
import { within, expect } from '@storybook/test'
import { Plus, Share } from 'lucide-react'

import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardBody, CardAction } from './Card'
import { Button } from '@/components/atoms/Button'
import { ActionGroup } from '../ActionGroup'
import { IconButton } from '@/components/atoms/IconButton'
import { Terms, Term, TermDefinition } from '@/components/atoms/Terms'

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
        <CardBody>This is a basic card with just some content inside.</CardBody>
      </Card>
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)

    // Verify content is rendered
    const content = canvas.getByText('This is a basic card with just some content inside.')
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)

    // Verify all content is present
    const title = canvas.getByText('Card Title')
    await expect(title).toBeInTheDocument()

    const description = canvas.getByText('This is the card description that provides additional context.')
    await expect(description).toBeInTheDocument()

    const content = canvas.getByText(
      'This is the main content area of the card where the primary information is displayed.',
    )
    await expect(content).toBeInTheDocument()

    const footer = canvas.getByText('Last updated: 2 hours ago')
    await expect(footer).toBeInTheDocument()
  },
}

export const WithImage: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Featured Content</CardTitle>
        <CardDescription>Highlighted information</CardDescription>
      </CardHeader>

      <img src="https://placehold.co/600x400" alt="Featured Content" />
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
          <CardTitle>Featured Content</CardTitle>
          <CardDescription>Highlighted information</CardDescription>
          <CardAction>
            <ActionGroup>
              <IconButton variant="ghost" aria-label="Add item">
                <Plus className="h-4 w-4" />
              </IconButton>
              <IconButton variant="ghost" aria-label="Share">
                <Share className="h-4 w-4" />
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

    // Verify content is present
    const title = canvas.getByText('Featured Content')
    await expect(title).toBeInTheDocument()

    // Verify buttons are present by finding their screen reader text
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
    <Card className="w-[450px]" variant="outline">
      <CardHeader>
        <CardTitle>Product Specifications</CardTitle>
        <CardDescription>Technical details shown with styled Terms component</CardDescription>
      </CardHeader>
      <CardBody>
        <Terms variant="divided">
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
    <Card className="w-[400px]" variant="primary">
      <CardHeader>
        <CardTitle>Subscription Details</CardTitle>
        <CardDescription>Current plan information with striped styling</CardDescription>
      </CardHeader>
      <CardBody>
        <Terms variant="striped" className="md:grid-cols-2">
          <Term>Plan</Term>
          <TermDefinition>Business Pro</TermDefinition>

          <Term>Billing Cycle</Term>
          <TermDefinition>Annual (paid monthly)</TermDefinition>

          <Term>Amount</Term>
          <TermDefinition>$49.99/month</TermDefinition>

          <Term>Next Billing Date</Term>
          <TermDefinition>July 15, 2023</TermDefinition>

          <Term>Payment Method</Term>
          <TermDefinition>•••• 4242</TermDefinition>
        </Terms>
      </CardBody>
      <CardFooter>
        <ActionGroup>
          <Button variant="outline">Change Plan</Button>
          <Button variant="ghost">Cancel Subscription</Button>
        </ActionGroup>
      </CardFooter>
    </Card>
  ),
}
