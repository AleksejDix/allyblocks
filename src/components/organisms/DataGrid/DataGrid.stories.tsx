import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import {
  DataGrid,
  DataGridTable,
  DataGridColumnVisibility,
  DataGridColumnSorter,
} from "./";
import { useDataGrid } from "./DataGrid.types";
import { type User, users } from "./data";

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("email", {
    header: "Email",
  }),
  columnHelper.accessor("role", {
    header: "Role",
  }),
  columnHelper.accessor("regStatus", {
    header: "Status",
  }),
  columnHelper.accessor("lastLogin", {
    header: "Last Login",
    // cell: createDateCell({ format: "dd. MMM. yyyy, HH:mm" }),
  }),
];

const CountLabel = () => {
  const { tableInstance } = useDataGrid();
  const totalCountLbl: string = "Total Users:";
  return (
    <div className="flex items-center justify-items-center mt-2">
      <p className="mr-1">{totalCountLbl}</p>
      <p>{tableInstance?.getRowCount()}</p>
    </div>
  );
};

export const BasicCase = () => {
  return (
    <DataGrid
      columns={columns as ColumnDef<User>[]}
      data={users}
      totalCount={users.length}
    >
      <DataGridColumnVisibility label="Toggle Columns" />
      <DataGridTable />
      <CountLabel />
    </DataGrid>
  );
};

import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/molecules/Card/Card";
import { ActionGroup } from "@/components/molecules/ActionGroup";

const meta = {
  component: BasicCase,
} satisfies Meta<typeof BasicCase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithColumnSorter: Story = {
  render: () => (
    <DataGrid
      columns={columns as ColumnDef<User>[]}
      data={users}
      totalCount={users.length}
    >
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            A list of users with their name, email, role, and status.
          </CardDescription>
          <CardAction>
            <ActionGroup>
              <DataGridColumnVisibility label="Toggle Columns" />
              <DataGridColumnSorter />
            </ActionGroup>
          </CardAction>
        </CardHeader>
        <DataGridTable />
        <CardFooter>
          <CountLabel />
        </CardFooter>
      </Card>
    </DataGrid>
  ),
};
