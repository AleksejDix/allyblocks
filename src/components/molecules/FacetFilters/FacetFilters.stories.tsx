import type { Meta, StoryObj } from '@storybook/react-vite'
import { z } from 'zod'
import { parseAsString, parseAsInteger, useQueryStates } from 'nuqs'
import { startOfToday, endOfToday, subDays, startOfDay, endOfDay, startOfWeek, endOfWeek, subWeeks, startOfMonth, endOfMonth, subMonths } from 'date-fns'

// Helper function to format date to YYYY-MM-DD string
const formatDateString = (date: Date): string => {
  return date.toLocaleDateString('en-CA')
}
import { Button } from '@/components/atoms/Button'
import { FacetFilter, FacetFilterReset } from './index'
import { createFacetFilter } from './FacetFilter.context'
import { FieldSelect } from '@/components/molecules/Fields/FieldSelect'
import { FieldText } from '@/components/molecules/Fields/FieldText'
import { FieldInteger } from '@/components/molecules/Fields/FieldInteger'
import { FieldDate } from '@/components/molecules/Fields/FieldDate'
import { FieldDateRange } from '@/components/molecules/Fields/FieldDateRange'
import { DatePresets, DatePreset } from '@/components/molecules/DatePresets'
import { SelectItem } from '@/components/atoms/Select'

const meta: Meta = {
  parameters: {
    layout: 'padded',
  },
}

export default meta

type Story = StoryObj<typeof meta>

// Example with date range filters
export const WithDateRangeFilter: Story = {
  render: () => {
    // Define parsers for URL state
    const parsers = {
      search: parseAsString.withDefault(''),
      datefrom: parseAsString.withDefault(''),
      dateto: parseAsString.withDefault(''),
      status: parseAsString.withDefault(''),
    } as const

    // Create typed provider and hook
    const { FacetFilterProvider, useFacetFilters } = createFacetFilter<typeof parsers>()

    const DateRangeFiltersExample = () => {
      // Use the hook before the provider
      const queryStates = useQueryStates(parsers, {
        history: 'replace',
        clearOnDefault: true,
      })

      // Define schema
      const schema = z.object({
        search: z.string(),
        datefrom: z.string(),
        dateto: z.string(),
        status: z.string(),
      })

      // Define default values
      const defaultValues = {
        search: '',
        datefrom: '',
        dateto: '',
        status: '',
      }

      const handleSubmit = (data: z.infer<typeof schema>) => {
        console.log('Date filter data submitted:', data)
      }

      return (
        <FacetFilterProvider queryStates={queryStates} defaultValues={defaultValues}>
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Date Range Filters</h2>

            <FacetFilter
              schema={schema}
              onSubmit={handleSubmit}
              className="space-y-6"
              useFacetFilters={useFacetFilters}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search */}
                <div className="md:col-span-2">
                  <FieldText
                    name="search"
                    label="Search"
                    placeholder="Search..."
                    description="Search by name or description"
                  />
                </div>

                {/* Date Range */}
                <div className="md:col-span-2">
                  <FieldDateRange label="Date Range" description="Filter items within this date range">
                    <DatePresets fromFieldName="datefrom" toFieldName="dateto" className="mb-4">
                      <DatePreset 
                        value="today" 
                        label="Today"
                        getDateRange={() => ({
                          from: formatDateString(startOfToday()),
                          to: formatDateString(endOfToday())
                        })}
                      />
                      <DatePreset 
                        value="lastWeek" 
                        label="Last Week"
                        getDateRange={() => ({
                          from: formatDateString(startOfDay(subDays(new Date(), 7))),
                          to: formatDateString(endOfDay(subDays(new Date(), 1)))
                        })}
                      />
                      <DatePreset 
                        value="lastMonth" 
                        label="Last Month"
                        getDateRange={() => ({
                          from: formatDateString(startOfDay(subMonths(new Date(), 1))),
                          to: formatDateString(endOfDay(subDays(new Date(), 1)))
                        })}
                      />
                    </DatePresets>
                    <FieldDate
                      name="datefrom"
                      label="Date From"
                      placeholder="Select start date"
                      description="Filter items from this date"
                    />
                    <FieldDate
                      name="dateto"
                      label="Date To"
                      placeholder="Select end date"
                      description="Filter items until this date"
                    />
                  </FieldDateRange>
                </div>

                {/* Status */}
                <div className="md:col-span-2">
                  <FieldSelect name="status" label="Status" placeholder="All statuses">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </FieldSelect>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2">
                <FacetFilterReset useFacetFilters={useFacetFilters} />
                <Button type="submit">Apply Date Filters</Button>
              </div>
            </FacetFilter>
          </div>
        </FacetFilterProvider>
      )
    }

    return <DateRangeFiltersExample />
  },
}

// Example with validated date range filters
export const WithValidatedDateRange: Story = {
  render: () => {
    // Define parsers for URL state
    const parsers = {
      search: parseAsString.withDefault(''),
      datefrom: parseAsString.withDefault(''),
      dateto: parseAsString.withDefault(''),
      category: parseAsString.withDefault(''),
      minPrice: parseAsInteger.withDefault(0),
      maxPrice: parseAsInteger.withDefault(1000),
    } as const

    // Create typed provider and hook
    const { FacetFilterProvider, useFacetFilters } = createFacetFilter<typeof parsers>()

    const ValidatedDateRangeExample = () => {
      // Use the hook before the provider
      const queryStates = useQueryStates(parsers, {
        history: 'replace',
        clearOnDefault: true,
      })

      // Define schema with date validation
      const schema = z
        .object({
          search: z.string(),
          datefrom: z.string(),
          dateto: z.string(),
          category: z.string(),
          minPrice: z.number().min(0),
          maxPrice: z.number().min(0),
        })
        .refine(
          (data) => {
            if (data.datefrom && data.dateto) {
              return new Date(data.datefrom) <= new Date(data.dateto)
            }
            return true
          },
          {
            message: 'End date must be after start date',
            path: ['dateto'],
          },
        )
        .refine(
          (data) => {
            return data.minPrice <= data.maxPrice
          },
          {
            message: 'Maximum price must be greater than minimum price',
            path: ['maxPrice'],
          },
        )

      // Define default values
      const defaultValues = {
        search: '',
        datefrom: '',
        dateto: '',
        category: '',
        minPrice: 0,
        maxPrice: 1000,
      }

      const handleSubmit = (data: z.infer<typeof schema>) => {
        console.log('Validated filter data submitted:', data)
      }

      return (
        <FacetFilterProvider queryStates={queryStates} defaultValues={defaultValues}>
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Product Filters with Date Range</h2>

            <FacetFilter
              schema={schema}
              onSubmit={handleSubmit}
              className="space-y-6"
              debug
              useFacetFilters={useFacetFilters}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search */}
                <div className="md:col-span-2">
                  <FieldText
                    name="search"
                    label="Search Products"
                    placeholder="Search by name, SKU, or description..."
                  />
                </div>

                {/* Date Range */}
                <div className="md:col-span-2">
                  <FieldDateRange label="Availability Period" description="Filter products by their availability dates">
                    <DatePresets fromFieldName="datefrom" toFieldName="dateto" className="mb-4">
                      <DatePreset 
                        value="today" 
                        label="Today"
                        getDateRange={() => ({
                          from: formatDateString(startOfToday()),
                          to: formatDateString(endOfToday())
                        })}
                      />
                      <DatePreset 
                        value="lastWeek" 
                        label="Last Week"
                        getDateRange={() => ({
                          from: formatDateString(startOfDay(subDays(new Date(), 7))),
                          to: formatDateString(endOfDay(subDays(new Date(), 1)))
                        })}
                      />
                      <DatePreset 
                        value="lastMonth" 
                        label="Last Month"
                        getDateRange={() => ({
                          from: formatDateString(startOfDay(subMonths(new Date(), 1))),
                          to: formatDateString(endOfDay(subDays(new Date(), 1)))
                        })}
                      />
                    </DatePresets>
                    <FieldDate
                      name="datefrom"
                      label="Available From"
                      description="Show products available from this date"
                    />
                    <FieldDate
                      name="dateto"
                      label="Available Until"
                      description="Show products available until this date"
                    />
                  </FieldDateRange>
                </div>

                {/* Category */}
                <FieldSelect name="category" label="Category" placeholder="All categories">
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="home">Home & Garden</SelectItem>
                  <SelectItem value="sports">Sports & Outdoors</SelectItem>
                </FieldSelect>

                {/* Price Range */}
                <FieldInteger name="minPrice" label="Min Price ($)" min={0} placeholder="0" />

                <FieldInteger name="maxPrice" label="Max Price ($)" min={0} placeholder="1000" />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2">
                <FacetFilterReset useFacetFilters={useFacetFilters} />
                <Button type="submit" variant="default">
                  Apply Filters
                </Button>
              </div>
            </FacetFilter>
          </div>
        </FacetFilterProvider>
      )
    }

    return <ValidatedDateRangeExample />
  },
}

// Example with custom date presets for analytics
export const WithCustomDatePresets: Story = {
  render: () => {
    // Define parsers for URL state
    const parsers = {
      search: parseAsString.withDefault(''),
      datefrom: parseAsString.withDefault(''),
      dateto: parseAsString.withDefault(''),
      metric: parseAsString.withDefault(''),
    } as const

    // Create typed provider and hook
    const { FacetFilterProvider, useFacetFilters } = createFacetFilter<typeof parsers>()

    const AnalyticsFiltersExample = () => {
      // Use the hook before the provider
      const queryStates = useQueryStates(parsers, {
        history: 'replace',
        clearOnDefault: true,
      })


      // Define schema
      const schema = z.object({
        search: z.string(),
        datefrom: z.string(),
        dateto: z.string(),
        metric: z.string(),
      })

      // Define default values
      const defaultValues = {
        search: '',
        datefrom: '',
        dateto: '',
        metric: '',
      }

      const handleSubmit = (data: z.infer<typeof schema>) => {
        console.log('Analytics filter data submitted:', data)
      }

      return (
        <FacetFilterProvider queryStates={queryStates} defaultValues={defaultValues}>
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Analytics Dashboard Filters</h2>

            <FacetFilter
              schema={schema}
              onSubmit={handleSubmit}
              className="space-y-6"
              useFacetFilters={useFacetFilters}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search */}
                <div className="md:col-span-2">
                  <FieldText
                    name="search"
                    label="Search Events"
                    placeholder="Search by event name, category, or source..."
                  />
                </div>

                {/* Date Range with Custom Presets */}
                <div className="md:col-span-2">
                  <FieldDateRange label="Analytics Period" description="Select the time period for your analytics data">
                    <DatePresets 
                      fromFieldName="datefrom" 
                      toFieldName="dateto" 
                      className="mb-4"
                    >
                      <DatePreset 
                        value="thisWeek" 
                        label="This Week"
                        getDateRange={() => ({
                          from: formatDateString(startOfWeek(new Date(), { weekStartsOn: 1 })),
                          to: formatDateString(endOfWeek(new Date(), { weekStartsOn: 1 }))
                        })}
                      />
                      <DatePreset 
                        value="last7Days" 
                        label="Last 7 Days"
                        getDateRange={() => ({
                          from: formatDateString(subWeeks(new Date(), 1)),
                          to: formatDateString(new Date())
                        })}
                      />
                      <DatePreset 
                        value="thisMonth" 
                        label="This Month"
                        getDateRange={() => ({
                          from: formatDateString(startOfMonth(new Date())),
                          to: formatDateString(endOfMonth(new Date()))
                        })}
                      />
                      <DatePreset 
                        value="last30Days" 
                        label="Last 30 Days"
                        getDateRange={() => ({
                          from: formatDateString(subMonths(new Date(), 1)),
                          to: formatDateString(new Date())
                        })}
                      />
                      <DatePreset 
                        value="last3Months" 
                        label="Last 3 Months"
                        getDateRange={() => ({
                          from: formatDateString(subMonths(new Date(), 3)),
                          to: formatDateString(new Date())
                        })}
                      />
                    </DatePresets>
                    <FieldDate
                      name="datefrom"
                      label="Start Date"
                      placeholder="Select start date"
                    />
                    <FieldDate
                      name="dateto"
                      label="End Date"
                      placeholder="Select end date"
                    />
                  </FieldDateRange>
                </div>

                {/* Metric */}
                <div className="md:col-span-2">
                  <FieldSelect name="metric" label="Metric Type" placeholder="All metrics">
                    <SelectItem value="pageviews">Page Views</SelectItem>
                    <SelectItem value="uniquevisitors">Unique Visitors</SelectItem>
                    <SelectItem value="conversions">Conversions</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="engagement">Engagement Rate</SelectItem>
                  </FieldSelect>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2">
                <FacetFilterReset useFacetFilters={useFacetFilters} />
                <Button type="submit">Update Analytics</Button>
              </div>
            </FacetFilter>
          </div>
        </FacetFilterProvider>
      )
    }

    return <AnalyticsFiltersExample />
  },
}
