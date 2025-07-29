import type { Meta, StoryObj } from '@storybook/react-vite'
import { z } from 'zod'
import { parseAsString, parseAsInteger, parseAsBoolean, parseAsArrayOf } from 'nuqs'
import { Button } from '@/components/atoms/Button'
import { FacetFilterProvider, FacetFilter, FacetFilterReset } from './index'
import { FieldSelect } from '@/components/molecules/Fields/FieldSelect'
import { FieldText } from '@/components/molecules/Fields/FieldText'
import { FieldCheckbox } from '@/components/molecules/Fields/FieldCheckbox'
import { FieldRadioGroup } from '@/components/molecules/Fields/FieldRadioGroup'
import { FieldInteger } from '@/components/molecules/Fields/FieldInteger'
import { SelectItem } from '@/components/atoms/Select'

const meta: Meta = {
  parameters: {
    layout: 'padded',
  },
}

export default meta

type Story = StoryObj<typeof meta>

// Basic example with various field types
export const WithFieldComponents: Story = {
  render: () => {
    const BasicFiltersExample = () => {
      // Define parsers for URL state
      const parsers = {
        search: parseAsString.withDefault(''),
        status: parseAsString.withDefault(''),
        category: parseAsString.withDefault(''),
        priority: parseAsString.withDefault('medium'),
        tags: parseAsArrayOf(parseAsString).withDefault([]),
        includeArchived: parseAsBoolean.withDefault(false),
        limit: parseAsInteger.withDefault(10),
      }

      // Define schema
      const schema = z.object({
        search: z.string(),
        status: z.string(),
        category: z.string(),
        priority: z.string(),
        tags: z.array(z.string()),
        includeArchived: z.boolean(),
        limit: z.number().min(1).max(100),
      })

      // Define default values
      const defaultValues = {
        search: '',
        status: '',
        category: '',
        priority: 'medium',
        tags: [],
        includeArchived: false,
        limit: 10,
      }

      const handleSubmit = (data: z.infer<typeof schema>) => {
        console.log('Filter data submitted:', data)
      }

      return (
        <FacetFilterProvider parsers={parsers} defaultValues={defaultValues}>
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Product Filters</h2>

            <FacetFilter schema={schema} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Text Search */}
                <FieldText
                  name="search"
                  label="Search"
                  placeholder="Search products..."
                  description="Search by name or description"
                />

                {/* Status Select */}
                <FieldSelect name="status" label="Status" placeholder="All statuses">
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </FieldSelect>

                {/* Category Select */}
                <FieldSelect name="category" label="Category" placeholder="All categories">
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="food">Food & Beverages</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                </FieldSelect>

                {/* Priority Radio Group */}
                <div className="lg:col-span-2">
                  <FieldRadioGroup
                    name="priority"
                    label="Priority"
                    options={[
                      { value: 'low', label: 'Low Priority' },
                      { value: 'medium', label: 'Medium Priority' },
                      { value: 'high', label: 'High Priority' },
                    ]}
                  />
                </div>

                {/* Limit */}
                <FieldInteger
                  name="limit"
                  label="Items per page"
                  min={1}
                  max={100}
                  description="Number of items to display"
                />
              </div>

              {/* Tags Multi-Select */}
              <FieldSelect name="tags" label="Tags" placeholder="Select tags..." mode="multiple">
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="sale">On Sale</SelectItem>
                <SelectItem value="new">New Arrival</SelectItem>
                <SelectItem value="bestseller">Best Seller</SelectItem>
                <SelectItem value="limited">Limited Edition</SelectItem>
              </FieldSelect>

              {/* Include Archived Checkbox */}
              <FieldCheckbox
                name="includeArchived"
                label="Include archived items"
                description="Show archived products in search results"
              />

              {/* Action Buttons */}
              <div className="flex justify-end gap-2">
                <FacetFilterReset />
                <Button type="submit">Apply Filters</Button>
              </div>
            </FacetFilter>

            {/* Display current filter values */}
          </div>
        </FacetFilterProvider>
      )
    }

    return <BasicFiltersExample />
  },
}
