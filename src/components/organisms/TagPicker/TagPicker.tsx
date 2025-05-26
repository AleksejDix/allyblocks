import { memo, useMemo } from 'react'
import {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectGroup,
} from '@/components/atoms/MultiSelect'
import { Tag } from '@/components/molecules/Tag'
import { Icon } from '@/components/atoms/Icon'
import { Button } from '@/components/atoms/Button'
import { cn } from '@/lib/utils'
import {
  tagPickerVariants,
  tagPickerTagsVariants,
  tagPickerTriggerVariants,
  tagPickerOverflowVariants,
} from './TagPicker.variants'
import type { TagPickerProps, TagPickerOption } from './TagPicker.types'

/**
 * TagPicker component for selecting multiple options as removable tags.
 *
 * Features:
 * - Combines MultiSelect dropdown with Tag display
 * - Configurable tag colors and labels
 * - Overflow handling for many selections
 * - Accessible keyboard and screen reader support
 * - Customizable styling and behavior
 *
 * @example
 * ```tsx
 * // Basic usage
 * <TagPicker
 *   options={[
 *     { value: 'react', label: 'React', color: 'blue' },
 *     { value: 'vue', label: 'Vue.js', color: 'green' },
 *   ]}
 *   value={selectedValues}
 *   onValueChange={setSelectedValues}
 *   placeholder="Select technologies..."
 * />
 *
 * // With custom tag display
 * <TagPicker
 *   options={users}
 *   maxVisibleTags={3}
 *   size="sm"
 *   renderTag={(option, onRemove) => (
 *     <CustomUserTag user={option} onRemove={onRemove} />
 *   )}
 * />
 * ```
 */
export const TagPicker = memo(function TagPicker({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Select options...',
  loadingText = 'Loading...',
  emptyText = 'No options available',
  maxVisibleTags = 10,
  showDropdown = true,
  size = 'md',
  removableTags = true,
  removeLabel = 'Remove',
  removingTags = [],
  renderTag,
  className,
  tagsClassName,
  triggerClassName,
  disabled,
  ...props
}: TagPickerProps) {
  // Get selected options with their metadata
  const selectedOptions = useMemo(() => {
    const currentValue = value || defaultValue || []
    return currentValue
      .map((val) => options.find((opt) => opt.value === val))
      .filter((opt): opt is TagPickerOption => Boolean(opt))
  }, [value, defaultValue, options])

  // Calculate visible and overflow tags
  const { visibleTags, overflowCount } = useMemo(() => {
    if (selectedOptions.length <= maxVisibleTags) {
      return { visibleTags: selectedOptions, overflowCount: 0 }
    }
    return {
      visibleTags: selectedOptions.slice(0, maxVisibleTags),
      overflowCount: selectedOptions.length - maxVisibleTags,
    }
  }, [selectedOptions, maxVisibleTags])

  // Handle tag removal
  const handleRemoveTag = (optionValue: string) => {
    const currentValue = value || defaultValue || []
    const newValue = currentValue.filter((val) => val !== optionValue)
    onValueChange?.(newValue)
  }

  // Render individual tag
  const renderTagItem = (option: TagPickerOption) => {
    if (renderTag) {
      return renderTag(option, () => handleRemoveTag(option.value))
    }

    return (
      <Tag
        key={option.value}
        color={option.color || 'zinc'}
        size={size}
        onRemove={() => handleRemoveTag(option.value)}
        removeLabel={`${removeLabel} ${option.tagLabel || option.label}`}
        removable={removableTags && !disabled}
        removing={removingTags.includes(option.value)}
      >
        {option.tagLabel || option.label}
      </Tag>
    )
  }

  const hasSelection = selectedOptions.length > 0

  return (
    <div className={cn(tagPickerVariants({ disabled }), className)}>
      {/* Selected Tags Display */}
      <div className={cn(tagPickerTagsVariants({ size, hasSelection }), tagsClassName)}>
        {visibleTags.map(renderTagItem)}

        {/* Overflow Indicator */}
        {overflowCount > 0 && <span className={tagPickerOverflowVariants({ size })}>+{overflowCount} more</span>}
      </div>

      {/* Selection Dropdown */}
      {showDropdown && (
        <MultiSelect
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          options={options}
          disabled={disabled}
          {...props}
        >
          <MultiSelectTrigger
            variant="outline"
            size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'default'}
            className={cn(tagPickerTriggerVariants({ hasSelection }), triggerClassName)}
          >
            <div className="flex items-center justify-between w-full">
              <span className="truncate">{hasSelection ? `${selectedOptions.length} selected` : placeholder}</span>
              <Icon name="chevron-down" className="h-4 w-4 shrink-0 opacity-50" />
            </div>
          </MultiSelectTrigger>

          <MultiSelectContent className="w-[--radix-popover-trigger-width] max-h-[300px]">
            {options.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">{emptyText}</div>
            ) : (
              <MultiSelectGroup>
                {options.map((option) => (
                  <MultiSelectItem key={option.value} value={option.value} disabled={option.disabled}>
                    {option.label}
                  </MultiSelectItem>
                ))}
              </MultiSelectGroup>
            )}
          </MultiSelectContent>
        </MultiSelect>
      )}
    </div>
  )
})
