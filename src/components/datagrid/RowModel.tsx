import { ReactNode } from "react";
import { flexRender, type Row } from "@tanstack/react-table";
import { type RowData, useDataGrid } from "./DataGrid.types";
import { TableBody, TableCell, TableRow } from "@/components/molecules/Table";

type RowModelProps = {
  children?: (row: Row<RowData>) => ReactNode;
};

export function RowModel({ children }: RowModelProps) {
  const { tableInstance } = useDataGrid();

  if (!tableInstance) return null;

  return (
    <TableBody>
      {tableInstance.getRowModel().rows.map((row) => (
        <TableRow
          key={row.id}
          className="relative hover:bg-input/75"
          role="row"
          aria-selected={row.getIsSelected()}
          tabIndex={-1}
          onClick={() => row.toggleSelected(!row.getIsSelected())}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              row.toggleSelected(!row.getIsSelected());
            }
          }}
        >
          {children
            ? children(row)
            : row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  style={{ width: cell.column.getSize() }}
                  className="[&>[role=checkbox]]:translate-y-[-3px]"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
