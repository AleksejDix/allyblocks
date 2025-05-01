import { flexRender } from "@tanstack/react-table";
import { useDataGrid } from "./DataGrid.types";
import { TableFooter, TableRow, TableCell } from "@/components/molecules/Table";

export function FooterGroups() {
  const { tableInstance } = useDataGrid();

  if (!tableInstance) return null;

  const hasFooters = () => {
    let hasFooters: boolean = false;
    if (tableInstance) {
      tableInstance.getFooterGroups().map((footerGroup) => {
        footerGroup.headers.map((header) => {
          hasFooters =
            hasFooters || header.column.columnDef.footer != undefined;
        });
      });
    }
    return hasFooters;
  };

  if (!hasFooters()) return null;

  return (
    <TableFooter>
      {tableInstance.getFooterGroups().map((footerGroup) => (
        <TableRow key={footerGroup.id}>
          {footerGroup.headers.map((header) => (
            <TableCell
              key={header.id}
              colSpan={header.colSpan}
              className="bg-primary text-primary-foreground border [&>[role=checkbox]]:translate-y-[-3px]"
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.footer,
                    header.getContext()
                  )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableFooter>
  );
}
