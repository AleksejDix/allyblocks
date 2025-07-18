import { useDataGridServer } from './DataGridServer.types'
import { DataGridColumnVisibility, DataGridColumnSorter } from '../Shared/DataGrid.shared'

// Wrapper for DataGridColumnVisibility that works with Server context
type DataGridServerColumnVisibilityProps = {
  label?: string
  iconName?: Parameters<typeof DataGridColumnVisibility>[0]['iconName']
  iconPosition?: Parameters<typeof DataGridColumnVisibility>[0]['iconPosition']
}

export function DataGridServerColumnVisibility(props: DataGridServerColumnVisibilityProps) {
  const { tableInstance } = useDataGridServer()

  if (!tableInstance) {
    return null
  }

  return <DataGridColumnVisibility tableInstance={tableInstance} {...props} />
}

// Wrapper for DataGridColumnSorter that works with Server context
export function DataGridServerColumnSorter() {
  const { tableInstance } = useDataGridServer()

  if (!tableInstance) {
    return null
  }

  return <DataGridColumnSorter tableInstance={tableInstance} />
}
