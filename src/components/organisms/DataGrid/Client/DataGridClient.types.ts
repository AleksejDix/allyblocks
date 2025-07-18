import { createContext, useContext } from 'react'
import type { Table } from '@tanstack/react-table'

// Generic type for DataGridClient context
type DataGridClientContextType<TData = unknown> = {
  tableInstance: Table<TData> | null
}

export const DataGridClientContext = createContext<DataGridClientContextType | null>(null)

export function useDataGridClient<TData = unknown>() {
  const context = useContext(DataGridClientContext) as DataGridClientContextType<TData> | null
  if (!context) {
    throw new Error('useDataGridClient must be used within a DataGridClientContextProvider')
  }
  return context
}
