import { type ColumnDef } from "@tanstack/react-table";
import { DataGridContextProvider } from "./DataGrid.context";
import { type RowData } from "./DataGrid.types";

type DataGridProps<TData extends RowData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  totalCount?: number;
  children: React.ReactNode;
};

export const DataGrid = <TData extends RowData>({
  columns,
  data,
  totalCount,
  children,
}: DataGridProps<TData>) => {
  return (
    <DataGridContextProvider
      columns={columns as ColumnDef<RowData>[]}
      data={data}
      totalCount={totalCount}
    >
      {children}
    </DataGridContextProvider>
  );
};
