import type { Meta, StoryObj } from '@storybook/react-vite'
import { DataGridClient } from './'
import { ProductInventoryManagement } from './DataGrid.products.stories'

const meta = {
  component: DataGridClient,
} satisfies Meta<typeof DataGridClient>

export default meta
type Story = StoryObj<typeof meta>

// Re-export the Product Inventory Management story as the main example
export const Default: Story = {
  render: () => <ProductInventoryManagement />,
}