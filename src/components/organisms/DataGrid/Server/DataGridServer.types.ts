import { createContext, useContext } from 'react'
import type { Table } from '@tanstack/react-table'

// Generic type for DataGridServer context
type DataGridServerContextType<TData = unknown> = {
  tableInstance: Table<TData> | null
  isLoading: boolean
}

export const DataGridServerContext = createContext<DataGridServerContextType | null>(null)

export function useDataGridServer<TData = unknown>() {
  const context = useContext(DataGridServerContext) as DataGridServerContextType<TData> | null
  if (!context) {
    throw new Error('useDataGridServer must be used within a DataGridServerContextProvider')
  }
  return context
}
