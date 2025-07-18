import React from 'react'
import {
  useReactTable,
  getCoreRowModel,
  type VisibilityState,
  type ColumnResizeMode,
  type ColumnDef,
  type PaginationState,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table'
import { DataGridServerContext } from './DataGridServer.types'
import type { ServerPaginationState, ServerSortingState, ServerFilterState } from './DataGridServer'

type DataGridServerContextProviderProps<TData> = {
  children: React.ReactNode
  columns: ColumnDef<TData, any>[]
  data: TData[]
  // Server-side specific
  totalCount: number
  pageCount: number
  pagination: ServerPaginationState
  onPaginationChange: (pagination: ServerPaginationState) => void
  sorting?: ServerSortingState
  onSortingChange?: (sorting: ServerSortingState) => void
  filters?: ServerFilterState
  onFiltersChange?: (filters: ServerFilterState) => void
  isLoading?: boolean
  // Optional features
  enableRowSelection?: boolean
  rowSelection?: Record<string, boolean>
  onRowSelectionChange?: (selection: Record<string, boolean>) => void
}

export function DataGridServerContextProvider<TData>({
  children,
  columns,
  data,
  totalCount,
  pageCount,
  pagination,
  onPaginationChange,
  sorting = [],
  onSortingChange,
  filters = [],
  onFiltersChange,
  isLoading = false,
  enableRowSelection = false,
  rowSelection = {},
  onRowSelectionChange,
}: DataGridServerContextProviderProps<TData>) {
  // Local state for column visibility and resizing
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnResizeMode] = React.useState<ColumnResizeMode>('onChange')

  // Convert server state to TanStack Table state format
  const tablePagination: PaginationState = React.useMemo(
    () => ({
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
    }),
    [pagination],
  )

  const tableSorting: SortingState = React.useMemo(
    () =>
      sorting.map((sort) => ({
        id: sort.id,
        desc: sort.desc,
      })),
    [sorting],
  )

  const tableFilters: ColumnFiltersState = React.useMemo(
    () =>
      filters.map((filter) => ({
        id: filter.id,
        value: filter.value,
      })),
    [filters],
  )

  // Enable resizing for all columns by default
  const columnsWithResizing = React.useMemo(() => {
    return columns.map((column) => ({
      ...column,
      enableResizing: column.enableResizing ?? true,
    }))
  }, [columns])

  const tableInstance = useReactTable({
    // Core
    columns: columnsWithResizing,
    data,
    pageCount,
    rowCount: totalCount,
    getCoreRowModel: getCoreRowModel(),

    // Server-side controlled state
    manualPagination: true,
    manualSorting: !!onSortingChange,
    manualFiltering: !!onFiltersChange,

    // State change handlers
    onPaginationChange: (updater) => {
      const newPagination = typeof updater === 'function' ? updater(tablePagination) : updater
      onPaginationChange({
        pageIndex: newPagination.pageIndex,
        pageSize: newPagination.pageSize,
      })
    },

    ...(onSortingChange && {
      onSortingChange: (updater) => {
        const newSorting = typeof updater === 'function' ? updater(tableSorting) : updater
        onSortingChange(
          newSorting.map((sort) => ({
            id: sort.id,
            desc: sort.desc,
          })),
        )
      },
    }),

    ...(onFiltersChange && {
      onColumnFiltersChange: (updater) => {
        const newFilters = typeof updater === 'function' ? updater(tableFilters) : updater
        onFiltersChange(
          newFilters.map((filter) => ({
            id: filter.id,
            value: filter.value,
          })),
        )
      },
    }),

    // Row selection
    ...(enableRowSelection && {
      enableRowSelection: true,
      onRowSelectionChange: (updater) => {
        if (onRowSelectionChange) {
          const newSelection = typeof updater === 'function' ? updater(rowSelection) : updater
          onRowSelectionChange(newSelection)
        }
      },
    }),

    // Column features
    onColumnVisibilityChange: setColumnVisibility,
    columnResizeMode,
    enableColumnResizing: true,

    // Default column settings
    defaultColumn: {
      enableResizing: true,
    },

    // State
    state: {
      pagination: tablePagination,
      sorting: tableSorting,
      columnFilters: tableFilters,
      rowSelection: rowSelection || {},
      columnVisibility,
    },
  })

  return (
    <DataGridServerContext.Provider value={{ tableInstance, isLoading } as any}>
      {children}
    </DataGridServerContext.Provider>
  )
}
