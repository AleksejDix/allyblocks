import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "./Table";
import { Button } from "@/components/atoms/Button";
import { ActionGroup } from "@/components/molecules/ActionGroup";
import { IconButton } from "../IconButton";
import { Icon } from "../Icon";
import {
  ActionMenuItem,
  ActionMenuTrigger,
  ActionMenuContent,
} from "@/components/molecules/ActionMenu";
import { ActionMenu } from "@/components/molecules/ActionMenu";
const meta: Meta<typeof Table> = {
  component: Table,
  subcomponents: {
    TableHeader: TableHeader,
    TableBody: TableBody,
    TableFooter: TableFooter,
    TableHead: TableHead,
    TableRow: TableRow,
    TableCell: TableCell,
  },
  tags: ["autodocs"],
  parameters: {
    nuqs: {
      disabled: true,
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "striped", "divided", "spectrum", "bordered"],
      defaultValue: "default",
    },
    density: {
      control: "select",
      options: ["compact", "default", "relaxed"],
      defaultValue: "default",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      defaultValue: "md",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

// Basic Table
export const Default: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Button>Add new User</Button>
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
            <TableCell>Developer</TableCell>
            <TableCell className="text-right">
              <ActionGroup>
                <Button size="default" variant="outline">
                  Edit
                </Button>
                <Button size="default" variant="outline">
                  Delete
                </Button>
              </ActionGroup>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>jane@example.com</TableCell>
            <TableCell>Designer</TableCell>
            <TableCell className="text-right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Robert Johnson</TableCell>
            <TableCell>robert@example.com</TableCell>
            <TableCell>Product Manager</TableCell>
            <TableCell className="text-right">
              <ActionGroup>
                <ActionMenu>
                  <ActionMenuTrigger asChild>
                    <IconButton aria-label="Edit" size="md" variant="ghost">
                      <Icon name="pencil" />
                    </IconButton>
                  </ActionMenuTrigger>
                  <ActionMenuContent side="bottom" align="end">
                    <ActionMenuItem>Edit</ActionMenuItem>
                    <ActionMenuItem>Delete</ActionMenuItem>
                  </ActionMenuContent>
                </ActionMenu>
              </ActionGroup>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};

// Striped Table
export const Striped: Story = {
  render: () => (
    <Table variant="striped">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>Developer</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>Designer</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Robert Johnson</TableCell>
          <TableCell>robert@example.com</TableCell>
          <TableCell>Product Manager</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Emily White</TableCell>
          <TableCell>emily@example.com</TableCell>
          <TableCell>Marketing</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Michael Brown</TableCell>
          <TableCell>michael@example.com</TableCell>
          <TableCell>Sales</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

// Divided Table
export const Divided: Story = {
  render: () => (
    <Table variant="divided">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>Developer</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>Designer</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Robert Johnson</TableCell>
          <TableCell>robert@example.com</TableCell>
          <TableCell>Product Manager</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

// Table with footer
export const WithFooter: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Product A</TableCell>
          <TableCell>$10.00</TableCell>
          <TableCell>2</TableCell>
          <TableCell>$20.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Product B</TableCell>
          <TableCell>$15.00</TableCell>
          <TableCell>1</TableCell>
          <TableCell>$15.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>$35.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

// Data Table
export const DataTable: Story = {
  render: () => {
    const invoices = [
      {
        id: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
      },
      {
        id: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
      },
      {
        id: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
      },
      {
        id: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
      },
      {
        id: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
      },
    ];

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell className="text-right">
                {invoice.totalAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

// Dynamic Columns example
export const DynamicColumns: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-2 text-lg font-medium">3-Column Table</h3>
        <Table columns={3}>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>Developer</TableCell>
              <TableCell>Engineering</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jane Smith</TableCell>
              <TableCell>Designer</TableCell>
              <TableCell>Design</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-medium">5-Column Table</h3>
        <Table columns={5}>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>001</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>john@example.com</TableCell>
              <TableCell>Developer</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>002</TableCell>
              <TableCell>Jane Smith</TableCell>
              <TableCell>jane@example.com</TableCell>
              <TableCell>Designer</TableCell>
              <TableCell>Away</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  ),
};

// Table with buttons in cells
export const WithButtons: Story = {
  render: () => {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>
              <Button data-slot="button" variant="outline" size="sm">
                Edit
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>Inactive</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button data-slot="button" variant="outline" size="sm">
                  Edit
                </Button>
                <Button data-slot="button" variant="destructive" size="sm">
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Robert Johnson</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell>
              <Button data-slot="button" variant="outline" size="sm">
                Approve
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  },
};
