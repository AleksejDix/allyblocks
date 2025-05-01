import { flexRender } from "@tanstack/react-table";
import { TableRow, TableHead, TableHeader } from "@/components/molecules/Table";
import { useDataGrid } from "./DataGrid.types";
export function HeaderGroups() {
  const { tableInstance } = useDataGrid();
  if (!tableInstance) return null;

  return (
    <TableHeader>
      {tableInstance.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              colSpan={header.colSpan}
              scope="col"
              style={{ width: header.getSize() }}
              className="bg-primary text-primary-foreground border [&>[role=checkbox]]:translate-y-[-3px]"
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}
