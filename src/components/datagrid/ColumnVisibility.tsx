import { LblColumnDef, useDataGrid } from "./DataGrid.types";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/molecules/DropdownMenu";
import { Button } from "@/components/atoms/Button";
import { RotateCcw } from "lucide-react";
import { DynamicIcon, IconName } from "lucide-react/dynamic";

type IconPosition = "Leading" | "Trailing";
type Props = {
  label?: string;
  iconName?: IconName;
  iconPosition?: IconPosition;
};

export const ColumnVisibility = ({
  label = "Columns",
  iconName = "columns",
  iconPosition = "Leading",
}: Props) => {
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
            <DynamicIcon name={iconName} className="h-4 w-4" />
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
                  ? (
                      column.columnDef as LblColumnDef<never>
                    ).headerLabel?.toString() ?? column.id
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
};
