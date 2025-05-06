import { ReactNode } from "react";
import { Input } from "../../atoms/Input";
import {
  DataGrid,
  DataGridTable,
  DataGridColumnVisibility,
} from "../../organisms/DataGrid";
import { ColumnDef } from "@tanstack/react-table";
import { RowData } from "../../organisms/DataGrid/DataGrid.types";

// Generic interface for TableTemplate props
interface TableTemplateProps<TData> {
  /**
   * Table columns definition
   */
  columns: ColumnDef<TData>[];
  /**
   * Table data
   */
  data: TData[];
  /**
   * Total count of items (for pagination)
   */
  totalCount?: number;
  /**
   * Custom table components
   */
  tableComponents?: ReactNode;
  /**
   * Title displayed above the table
   */
  title?: string;
  /**
   * Description displayed below the title
   */
  description?: string;
  /**
   * The pagination component
   */
  pagination?: ReactNode;
  /**
   * Custom actions to be displayed in the top-right corner
   */
  actions?: ReactNode;
  /**
   * Function called when search input changes
   */
  onSearch?: (value: string) => void;
  /**
   * Initial search value
   */
  searchValue?: string;
  /**
   * Placeholder text for the search input
   */
  searchPlaceholder?: string;
  /**
   * Is data loading?
   */
  isLoading?: boolean;
}

// Helper type to enforce that the generic type extends RowData
type TableTemplatePropsWithRowData<TData extends RowData> =
  TableTemplateProps<TData>;

export function TableTemplate<TData extends RowData>(
  props: TableTemplatePropsWithRowData<TData>,
) {
  const {
    columns,
    data,
    totalCount,
    tableComponents,
    title,
    description,
    pagination,
    actions,
    onSearch,
    searchValue = "",
    searchPlaceholder = "Search...",
    isLoading = false,
  } = props;

  return (
    <div className="space-y-4" data-slot="table-template">
      {/* Header Section */}
      {(title || description) && (
        <div className="mb-6" data-slot="table-template-header">
          {title && <h2 className="text-2xl font-bold">{title}</h2>}
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      )}

      {/* DataGrid component */}
      <DataGrid columns={columns} data={data} totalCount={totalCount}>
        {/* Controls Section */}
        <div
          className="flex justify-between items-center mb-4"
          data-slot="table-template-controls"
        >
          {/* Search - left side */}
          <div className="flex-1 max-w-sm" data-slot="table-template-search">
            <Input
              type="search"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearch?.(e.target.value)}
              aria-label="Search"
              disabled={isLoading}
            />
          </div>

          {/* Actions and Column Visibility - right side */}
          <div
            className="flex items-center space-x-2"
            data-slot="table-template-actions"
          >
            {actions}
            <DataGridColumnVisibility />
          </div>
        </div>

        {/* Table Section */}
        <div className="rounded-md border overflow-hidden">
          {tableComponents || <DataGridTable />}
        </div>

        {/* Pagination Section */}
        {pagination && (
          <div
            className="flex items-center justify-end mt-4"
            data-slot="table-template-pagination"
          >
            {pagination}
          </div>
        )}
      </DataGrid>
    </div>
  );
}
