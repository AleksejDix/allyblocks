import type { ComponentPropsWithoutRef } from 'react'

export interface SelectAutocompleteOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectAutocompleteProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  options: SelectAutocompleteOption[]
  value?: string | string[]
  defaultValue?: string | string[]
  onChange?: (value: string | string[]) => void
  multiple?: boolean
  disabled?: boolean
  filterFunction?: (option: SelectAutocompleteOption, inputValue: string) => boolean
}

export interface SelectAutocompleteTriggerProps extends ComponentPropsWithoutRef<'div'> {
  asChild?: boolean
}

export interface SelectAutocompleteValueProps {
  placeholder?: string
  className?: string
  renderValue?: (value: string | string[], options: SelectAutocompleteOption[]) => React.ReactNode
}

export interface SelectAutocompleteSearchProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  showIcon?: boolean
}

export interface SelectAutocompleteClearProps extends ComponentPropsWithoutRef<'button'> {}

export interface SelectAutocompleteContentProps extends ComponentPropsWithoutRef<'div'> {
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
  maxHeight?: number | string
}

export interface SelectAutocompleteListProps extends ComponentPropsWithoutRef<'ul'> {}

export interface SelectAutocompleteGroupProps extends ComponentPropsWithoutRef<'div'> {}

export interface SelectAutocompleteLabelProps extends ComponentPropsWithoutRef<'div'> {}

export interface SelectAutocompleteSeparatorProps extends ComponentPropsWithoutRef<'div'> {}

export interface SelectAutocompleteItemProps extends Omit<ComponentPropsWithoutRef<'li'>, 'item'> {
  option: SelectAutocompleteOption
  index: number
  showCheck?: boolean
}

export interface SelectAutocompleteEmptyProps extends ComponentPropsWithoutRef<'div'> {}

export interface SelectAutocompleteInputProps extends ComponentPropsWithoutRef<'input'> {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outline' | 'filled' | 'ghost'
  error?: boolean
}

export interface SelectAutocompleteContextValue {
  options: SelectAutocompleteOption[]
  selectedItem: SelectAutocompleteOption | null
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  highlightedIndex: number
  disabled: boolean
  getToggleButtonProps: (options?: any) => any
  getMenuProps: (options?: any) => any
  getItemProps: (options: any) => any
}