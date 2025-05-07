import { createContext, useContext } from "react";
import type { Table, ColumnDef } from "@tanstack/react-table";

export type RowData = {
  id: string | number;
  [key: string]: unknown;
};

type LblColumnDef<TData> = ColumnDef<TData> & {
  headerLabel?: string;
};

type DataGridContextType<TData extends RowData> = {
  tableInstance: Table<TData> | null;
};

export const DataGridContext =
  createContext<DataGridContextType<RowData> | null>(null);

export const useDataGrid = () => {
  const context = useContext(DataGridContext);
  if (!context) {
    throw new Error(
      "useDataGrid must be used within a DataGridContextProvider"
    );
  }
  return context;
};

export type { ColumnDef, LblColumnDef };
