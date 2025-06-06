import type { Meta, StoryObj } from '@storybook/react'
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from './Table'
import { Checkbox } from '@/components/atoms/Checkbox'
import { IconButton } from '@/components/atoms/IconButton'
import { Icon } from '@/components/atoms/Icon'
import {
  ActionMenu,
  ActionMenuTrigger,
  ActionMenuContent,
  ActionMenuItem,
  ActionMenuSeparator,
} from '@/components/molecules/ActionMenu'

const meta: Meta<typeof Table> = {
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Table>

// Sample data for demonstrations
const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
]

export const Default: Story = {
  render: (args) => (
    <Table {...args}>
      <TableCaption>A list of users and their information.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const WithCheckboxes: Story = {
  args: {
    size: 'sm',
  },
  render: (args) => (
    <Table {...args}>
      <TableCaption>Users table with selectable rows using checkboxes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox aria-label="Select all" />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead align="right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <Checkbox aria-label={`Select ${user.name}`} />
            </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.status}</TableCell>
            <TableCell align="right">
              <ActionMenu>
                <ActionMenuTrigger asChild>
                  <IconButton variant="ghost" size="sm" aria-label={`Actions for ${user.name}`}>
                    <Icon name="more-horizontal" />
                  </IconButton>
                </ActionMenuTrigger>
                <ActionMenuContent>
                  <ActionMenuItem onAction={() => console.log(`Edit ${user.name}`)}>
                    <Icon name="edit" />
                    Edit
                  </ActionMenuItem>
                  <ActionMenuItem onAction={() => console.log(`View ${user.name}`)}>
                    <Icon name="eye" />
                    View
                  </ActionMenuItem>
                  <ActionMenuSeparator />
                  <ActionMenuItem className="text-destructive" onAction={() => console.log(`Delete ${user.name}`)}>
                    <Icon name="trash" />
                    Delete
                  </ActionMenuItem>
                </ActionMenuContent>
              </ActionMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const Small: Story = {
  args: {
    size: 'sm',
  },
  render: (args) => (
    <Table {...args}>
      <TableCaption>Small size table with compact padding</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.slice(0, 3).map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const Medium: Story = {
  args: {
    size: 'md',
  },
  render: (args) => (
    <Table {...args}>
      <TableCaption>Medium size table (default)</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.slice(0, 3).map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const Large: Story = {
  args: {
    size: 'lg',
  },
  render: (args) => (
    <Table {...args}>
      <TableCaption>Large size table with generous padding</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.slice(0, 3).map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const WithFooter: Story = {
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead align="right">Price</TableHead>
          <TableHead align="right">Quantity</TableHead>
          <TableHead align="right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Product A</TableCell>
          <TableCell align="right">$29.99</TableCell>
          <TableCell align="right">2</TableCell>
          <TableCell align="right">$59.98</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Product B</TableCell>
          <TableCell align="right">$19.99</TableCell>
          <TableCell align="right">1</TableCell>
          <TableCell align="right">$19.99</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Product C</TableCell>
          <TableCell align="right">$39.99</TableCell>
          <TableCell align="right">3</TableCell>
          <TableCell align="right">$119.97</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell align="right">$199.94</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
}

export const TextAlignment: Story = {
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead align="center">Category</TableHead>
          <TableHead align="right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Laptop</TableCell>
          <TableCell align="center">Electronics</TableCell>
          <TableCell align="right">$999.99</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Coffee Mug</TableCell>
          <TableCell align="center">Kitchen</TableCell>
          <TableCell align="right">$12.99</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Notebook</TableCell>
          <TableCell align="center">Stationery</TableCell>
          <TableCell align="right">$5.99</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}
