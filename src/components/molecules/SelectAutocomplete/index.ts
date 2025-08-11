// Provider components - choose one based on your needs
export { SelectSingle } from './SelectSingle'
export { SelectMultiple } from './SelectMultiple'
export { SelectCombobox } from './SelectCombobox'

// Shared components - work with all providers
export {
  SelectTrigger,
  SelectValue,
  SelectSearch,
  SelectClear,
  SelectContent,
  SelectList,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  SelectOption,
  SelectEmpty,
  SelectLoading,
} from './SelectComponents'

// Context hooks
export { useSelectBase } from './SelectBase.context'

// Types
export type {
  SelectAutocompleteOption,
  SelectAutocompleteProps,
  SelectAutocompleteTriggerProps,
  SelectAutocompleteValueProps,
  SelectAutocompleteSearchProps,
  SelectAutocompleteClearProps,
  SelectAutocompleteContentProps,
  SelectAutocompleteListProps,
  SelectAutocompleteGroupProps,
  SelectAutocompleteLabelProps,
  SelectAutocompleteSeparatorProps,
  SelectAutocompleteItemProps,
  SelectAutocompleteEmptyProps,
} from './SelectAutocomplete.types'

// Legacy exports for backward compatibility (will be deprecated)
export { SelectAutocomplete } from './SelectAutocomplete'
export { useSelectAutocomplete } from './SelectAutocomplete.context'