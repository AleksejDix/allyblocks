import { type ColumnDef, flexRender, type Row } from "@tanstack/react-table";
import { ReactNode, PropsWithChildren } from "react";
import { DataGridContextProvider } from "./DataGrid.context";
import { type RowData, useDataGrid, LblColumnDef } from "./DataGrid.types";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/Table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/molecules/DropdownMenu";
import { Button } from "@/components/atoms/Button";
import {
  ChevronUp,
  ChevronDown,
  MoveHorizontal,
  RotateCcw,
} from "lucide-react";
import { useEffect, useState } from "react";
import { DynamicIcon, IconName } from "lucide-react/dynamic";

// Main DataGrid Component
type DataGridProps<TData extends RowData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  totalCount?: number;
  children: React.ReactNode;
};

export function DataGrid<TData extends RowData>({
  columns,
  data,
  totalCount,
  children,
}: DataGridProps<TData>) {
  return (
    <DataGridContextProvider
      columns={columns as ColumnDef<RowData>[]}
      data={data}
      totalCount={totalCount}
    >
      {children}
    </DataGridContextProvider>
  );
}

// DataGridTable Component
export function DataGridTable({ children }: PropsWithChildren) {
  const { tableInstance } = useDataGrid();

  if (!tableInstance) {
    return null;
  }

  return (
    <Table className="md-bordered md-striped md-vertical-lines">
      {children || (
        <>
          <DataGridHeader />
          <DataGridBody />
          <DataGridFooter />
        </>
      )}
    </Table>
  );
}

// DataGridHeader Component
export function DataGridHeader() {
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
                    header.getContext(),
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}

// DataGridBody Component
type DataGridBodyProps = {
  children?: (row: Row<RowData>) => ReactNode;
};

export function DataGridBody({ children }: DataGridBodyProps) {
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

// DataGridFooter Component
export function DataGridFooter() {
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
                    header.getContext(),
                  )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableFooter>
  );
}

// DataGridColumnVisibility Component
type IconPosition = "Leading" | "Trailing";
type ColumnVisibilityProps = {
  label?: string;
  iconName?: IconName;
  iconPosition?: IconPosition;
};

export function DataGridColumnVisibility({
  label = "Columns",
  iconName = "columns",
  iconPosition = "Leading",
}: ColumnVisibilityProps) {
  const { tableInstance } = useDataGrid();

  if (!tableInstance) {
    return null;
  }

  // Get all leaf columns (columns that can be shown/hidden)
  const columns = tableInstance.getAllLeafColumns();

  // Toggle visibility for a single column
  const toggleColumnVisibility = (columnId: string, visible: boolean) => {
    tableInstance.setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: visible,
    }));
  };

  // Reset all columns to visible
  const resetColumnVisibility = () => {
    const newState: Record<string, boolean> = {};
    columns.forEach((column) => {
      newState[column.id] = true;
    });
    tableInstance.setColumnVisibility(newState);
  };

  return (
    <div className="mb-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {iconPosition === "Trailing" ? label : null}
            <DynamicIcon name={iconName} />
            {iconPosition === "Leading" ? label : null}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {columns.map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={column.getIsVisible()}
              onCheckedChange={(value) =>
                toggleColumnVisibility(column.id, !!value)
              }
            >
              <div className="flex items-center justify-between w-full">
                {typeof column.columnDef.header !== "string"
                  ? ((
                      column.columnDef as LblColumnDef<never>
                    ).headerLabel?.toString() ?? column.id)
                  : column.columnDef.header?.toString()}
              </div>
            </DropdownMenuCheckboxItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex justify-center items-center text-sm text-gray-500"
            onSelect={(e) => {
              e.preventDefault();
              resetColumnVisibility();
            }}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Show All Columns
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// DataGridColumnSorter Component
export function DataGridColumnSorter() {
  const { tableInstance } = useDataGrid();
  // Local state to track column order so we can update the UI immediately
  const [localColumnOrder, setLocalColumnOrder] = useState<string[]>([]);

  // Update local order whenever the table's column order changes
  const columnOrder = tableInstance?.getState().columnOrder;
  useEffect(() => {
    if (tableInstance) {
      const visibleColumns = tableInstance.getVisibleLeafColumns();
      // If the table has an explicit column order, use it
      const currentOrder = tableInstance.getState().columnOrder;

      if (currentOrder && currentOrder.length > 0) {
        setLocalColumnOrder(currentOrder);
      } else {
        // Otherwise use the default order from visible columns
        setLocalColumnOrder(visibleColumns.map((col) => col.id));
      }
    }
  }, [tableInstance, columnOrder]);

  if (!tableInstance) {
    return null;
  }

  const visibleColumns = tableInstance.getVisibleLeafColumns();

  // Function to move a column up in order
  const moveColumnUp = (columnId: string) => {
    const index = localColumnOrder.indexOf(columnId);

    if (index > 0) {
      const newOrder = [...localColumnOrder];
      // Swap with previous column
      [newOrder[index], newOrder[index - 1]] = [
        newOrder[index - 1],
        newOrder[index],
      ];

      // Update both local state and table state
      setLocalColumnOrder(newOrder);
      tableInstance.setColumnOrder(newOrder);
    }
  };

  // Function to move a column down in order
  const moveColumnDown = (columnId: string) => {
    const index = localColumnOrder.indexOf(columnId);

    if (index < localColumnOrder.length - 1) {
      const newOrder = [...localColumnOrder];
      // Swap with next column
      [newOrder[index], newOrder[index + 1]] = [
        newOrder[index + 1],
        newOrder[index],
      ];

      // Update both local state and table state
      setLocalColumnOrder(newOrder);
      tableInstance.setColumnOrder(newOrder);
    }
  };

  // Reset column ordering to default
  const resetColumnOrder = () => {
    // Setting an empty array resets to default order
    tableInstance.setColumnOrder([]);
    // Update local state to match
    setLocalColumnOrder(visibleColumns.map((col) => col.id));
  };

  // Sort visible columns based on localColumnOrder
  const sortedColumns = [...visibleColumns].sort((a, b) => {
    const indexA = localColumnOrder.indexOf(a.id);
    const indexB = localColumnOrder.indexOf(b.id);

    // If a column isn't in the localColumnOrder, put it at the end
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });

  return (
    <div className="mb-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <MoveHorizontal className="mr-2 h-4 w-4" />
            Reorder Columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {sortedColumns.map((column) => (
            <DropdownMenuItem
              key={column.id}
              className="flex justify-between items-center p-2"
              // Prevent the dropdown from closing when clicking the menu item
              onSelect={(e) => e.preventDefault()}
            >
              <span>{column.columnDef.header?.toString() || column.id}</span>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    moveColumnUp(column.id);
                  }}
                  disabled={localColumnOrder.indexOf(column.id) === 0}
                >
                  <ChevronUp />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    moveColumnDown(column.id);
                  }}
                  disabled={
                    localColumnOrder.indexOf(column.id) ===
                    localColumnOrder.length - 1
                  }
                >
                  <ChevronDown />
                </Button>
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex justify-center items-center text-sm text-gray-500"
            onSelect={(e) => {
              e.preventDefault();
              resetColumnOrder();
            }}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset to Default
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
