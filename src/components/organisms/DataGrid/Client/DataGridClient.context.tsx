import React from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  type VisibilityState,
  type ColumnResizeMode,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type RowSelectionState,
  type PaginationState,
} from '@tanstack/react-table'
import { DataGridClientContext } from './DataGridClient.types'

type DataGridClientContextProviderProps<TData> = {
  children: React.ReactNode
  columns: ColumnDef<TData, any>[]
  data: TData[]
  // Client-specific features
  enableSorting?: boolean
  enableFiltering?: boolean
  enableRowSelection?: boolean
  enableColumnResizing?: boolean
  enablePagination?: boolean
  pageSize?: number
}

export function DataGridClientContextProvider<TData>({
  children,
  columns,
  data,
  enableSorting = true,
  enableFiltering = true,
  enableRowSelection = false,
  enableColumnResizing = true,
  enablePagination = false,
  pageSize = 10,
}: DataGridClientContextProviderProps<TData>) {
  // Client-side state management
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnResizeMode] = React.useState<ColumnResizeMode>('onChange')
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  })

  // Enable resizing for all columns by default
  const columnsWithResizing = React.useMemo(() => {
    if (!enableColumnResizing) return columns

    return columns.map((column) => ({
      ...column,
      enableResizing: column.enableResizing ?? true,
    }))
  }, [columns, enableColumnResizing])

  const tableInstance = useReactTable({
    // Core
    columns: columnsWithResizing,
    data,
    getCoreRowModel: getCoreRowModel(),

    // Features based on props
    ...(enableFiltering && {
      getFilteredRowModel: getFilteredRowModel(),
      onColumnFiltersChange: setColumnFilters,
    }),

    ...(enableSorting && {
      getSortedRowModel: getSortedRowModel(),
      onSortingChange: setSorting,
    }),

    ...(enableRowSelection && {
      onRowSelectionChange: setRowSelection,
      enableRowSelection: true,
    }),

    ...(enablePagination && {
      getPaginationRowModel: getPaginationRowModel(),
      onPaginationChange: setPagination,
      pageCount: Math.ceil(data.length / pagination.pageSize),
    }),

    // Column features
    onColumnVisibilityChange: setColumnVisibility,
    columnResizeMode,
    enableColumnResizing,

    // Default column settings
    defaultColumn: {
      enableResizing: enableColumnResizing,
    },

    // State
    state: {
      columnVisibility,
      sorting,
      columnFilters,
      rowSelection,
      pagination,
    },
  })

  return <DataGridClientContext.Provider value={{ tableInstance } as any}>{children}</DataGridClientContext.Provider>
}
