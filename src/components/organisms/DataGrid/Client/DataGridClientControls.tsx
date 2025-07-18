import { useDataGridClient } from './DataGridClient.types'
import { DataGridColumnVisibility, DataGridColumnSorter } from '../Shared/DataGrid.shared'

// Wrapper for DataGridColumnVisibility that works with Client context
type DataGridClientColumnVisibilityProps = {
  label?: string
  iconName?: Parameters<typeof DataGridColumnVisibility>[0]['iconName']
  iconPosition?: Parameters<typeof DataGridColumnVisibility>[0]['iconPosition']
}

export function DataGridClientColumnVisibility(props: DataGridClientColumnVisibilityProps) {
  const { tableInstance } = useDataGridClient()

  if (!tableInstance) {
    return null
  }

  return <DataGridColumnVisibility tableInstance={tableInstance} {...props} />
}

// Wrapper for DataGridColumnSorter that works with Client context
export function DataGridClientColumnSorter() {
  const { tableInstance } = useDataGridClient()

  if (!tableInstance) {
    return null
  }

  return <DataGridColumnSorter tableInstance={tableInstance} />
}
