import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  type VisibilityState,
  type ColumnResizeMode,
} from "@tanstack/react-table";
import {
  DataGridContext,
  type RowData,
  type LblColumnDef,
} from "./DataGrid.types";

type DataGridContextProviderProps = {
  children: React.ReactNode;
  columns: LblColumnDef<RowData>[];
  data: RowData[];
  totalCount?: number;
};

export const DataGridContextProvider: React.FC<
  DataGridContextProviderProps
> = ({ children, columns, data, totalCount }) => {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnResizeMode] = React.useState<ColumnResizeMode>("onChange");

  // Enable resizing for all columns by default
  const columnsWithResizing = React.useMemo(() => {
    return columns.map((column) => ({
      ...column,
      enableResizing: true,
    }));
  }, [columns]);

  const tableInstance = useReactTable({
    columns: columnsWithResizing,
    data,
    rowCount: totalCount ?? 0,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    columnResizeMode,
    enableColumnResizing: true,
    defaultColumn: {
      enableResizing: true,
    },
    state: {
      columnVisibility,
    },
    manualFiltering: true,
    enableGlobalFilter: false,
    manualPagination: true,
  });

  return (
    <DataGridContext.Provider value={{ tableInstance }}>
      {children}
    </DataGridContext.Provider>
  );
};
