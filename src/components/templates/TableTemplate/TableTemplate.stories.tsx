import type { Meta, StoryObj } from "@storybook/react";
import { TableTemplate } from "./TableTemplate";
import { Button } from "../../atoms/Button";
import { useState } from "react";
import type { RowData } from "../../organisms/DataGrid/DataGrid.types";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";

// Define the data type that extends RowData
interface User extends RowData {
  name: string;
  email: string;
  role: string;
}

// Sample data for the table
const sampleData: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User" },
  { id: 5, name: "Charlie Davis", email: "charlie@example.com", role: "Admin" },
];

// Create column helper for type safety
const columnHelper = createColumnHelper<User>();

// Define columns with explicit cast
const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    footer: "Total: 5 users",
  }),
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("email", {
    header: "Email",
  }),
  columnHelper.accessor("role", {
    header: "Role",
  }),
] as ColumnDef<User>[];

const meta = {
  component: TableTemplate as typeof TableTemplate<User>,
  parameters: {
    docs: {
      description: {
        component:
          "A template for displaying data tables with search, column visibility controls, and pagination.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TableTemplate<User>>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample pagination component
const SamplePagination = () => (
  <div className="flex items-center gap-2">
    <Button variant="outline" size="sm" disabled>
      Previous
    </Button>
    <span className="text-sm">Page 1 of 1</span>
    <Button variant="outline" size="sm" disabled>
      Next
    </Button>
  </div>
);

export const Default: Story = {
  args: {
    title: "Users",
    description: "Manage user accounts and permissions.",
    columns: columns,
    data: sampleData,
    totalCount: sampleData.length,
    pagination: <SamplePagination />,
    onSearch: (value) => console.log("Search:", value),
  },
};
