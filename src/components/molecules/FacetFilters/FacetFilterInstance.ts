import { createFacetFilter } from './FacetFilter.context'
import { parseAsString, parseAsBoolean, parseAsArrayOf } from 'nuqs'

export const parsers = {
  search: parseAsString.withDefault(''),
  status: parseAsString.withDefault(''),
  category: parseAsString.withDefault(''),
  priority: parseAsString.withDefault('medium'),
  tags: parseAsArrayOf(parseAsString).withDefault([]),
  includeArchived: parseAsBoolean.withDefault(false),
}

export const { FacetFilterProvider, useFacetFilters } = createFacetFilter<typeof parsers>()
