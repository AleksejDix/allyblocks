import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataGrid } from "./DataGrid";
import { DataTable } from "./DataTable";
import { User, users } from "./data";
import {
  //createDateCell,
  useDataGrid,
} from "./DataGrid.types";

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
      <DataTable />
      <CountLabel />
    </DataGrid>
  );
};

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: BasicCase,
} satisfies Meta<typeof BasicCase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
