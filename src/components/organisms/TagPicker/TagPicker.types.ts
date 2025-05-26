import * as React from 'react'
import type { MultiSelectProps, MultiSelectOption } from '@/components/atoms/MultiSelect'
import type { TagProps } from '@/components/molecules/Tag'

/**
 * Extended option type for TagPicker with additional display properties.
 */
export type TagPickerOption = MultiSelectOption & {
  /** Optional color for the tag when selected */
  color?: TagProps['color']
  /** Custom display text for the tag (if different from label) */
  tagLabel?: string
}

/**
 * Props for the TagPicker component.
 * Extends MultiSelect functionality with tag-specific features.
 */
export type TagPickerProps = Omit<MultiSelectProps, 'children' | 'options'> & {
  /** Array of selectable options */
  options: TagPickerOption[]

  /** Placeholder text for the trigger button */
  placeholder?: string

  /** Text to display when options are loading */
  loadingText?: string

  /** Text to display when no options are available */
  emptyText?: string

  /** Maximum number of tags to display before showing count */
  maxVisibleTags?: number

  /** Whether to show the selection dropdown */
  showDropdown?: boolean

  /** Size variant for both tags and trigger */
  size?: 'sm' | 'md' | 'lg'

  /** Whether tags should be removable */
  removableTags?: boolean

  /** Custom remove label for accessibility */
  removeLabel?: string

  /** Whether tags are currently being animated out */
  removingTags?: string[]

  /** Custom render function for tags */
  renderTag?: (option: TagPickerOption, onRemove: () => void) => React.ReactNode

  /** Additional CSS classes for the container */
  className?: string

  /** Additional CSS classes for the tags container */
  tagsClassName?: string

  /** Additional CSS classes for the dropdown trigger */
  triggerClassName?: string
}
