'use client'

import { forwardRef, useMemo } from 'react'
import { Check, ChevronDown, X, Loader2, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PopoverContent, PopoverTrigger, PopoverAnchor } from '@/components/molecules/Popover'
import {
  selectAutocompleteInputVariants,
  selectAutocompleteTriggerVariants,
  selectAutocompleteItemVariants,
  selectAutocompleteEmptyVariants,
} from './SelectAutocomplete.variants'
import { useSelectBase } from './SelectBase.context'
import type { SelectAutocompleteOption } from './SelectAutocomplete.types'

// Trigger component - the main input/button that opens the dropdown
export const SelectTrigger = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'> & { asChild?: boolean }>(
  ({ children, className, asChild = false, ...props }, ref) => {
    const { disabled, isOpen, setIsOpen, inputRef } = useSelectBase()

    if (asChild) {
      return (
        <PopoverAnchor asChild>
          <PopoverTrigger asChild>
            {children}
          </PopoverTrigger>
        </PopoverAnchor>
      )
    }

    return (
      <PopoverAnchor asChild>
        <div
          ref={ref}
          className={cn('relative', className)}
          data-slot="select-trigger"
          {...props}
        >
          {children}
          <PopoverTrigger asChild>
            <button
              type="button"
              disabled={disabled}
              className={cn(
                selectAutocompleteTriggerVariants(),
                disabled && 'cursor-not-allowed opacity-50',
              )}
              aria-label="Toggle dropdown"
              onClick={(e) => {
                e.preventDefault()
                setIsOpen(!isOpen)
                if (!isOpen) {
                  setTimeout(() => inputRef.current?.focus(), 0)
                }
              }}
            >
              <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
            </button>
          </PopoverTrigger>
        </div>
      </PopoverAnchor>
    )
  },
)

SelectTrigger.displayName = 'SelectTrigger'

// Value display component
export function SelectValue({
  placeholder = 'Select an option...',
  className,
  renderValue,
}: {
  placeholder?: string
  className?: string
  renderValue?: (value: string | string[], options: SelectAutocompleteOption[]) => React.ReactNode
}) {
  const { selectedOptions, mode, options, inputValue, getInputProps, disabled } = useSelectBase()

  const displayValue = useMemo(() => {
    if (renderValue) {
      return renderValue(
        mode === 'multiple' ? selectedOptions.map(o => o.value) : selectedOptions[0]?.value || '',
        options
      )
    }

    if (selectedOptions.length === 0) return null

    if (mode === 'multiple') {
      return (
        <div className="flex flex-wrap gap-1">
          {selectedOptions.map((option) => (
            <SelectChip key={option.value} option={option} />
          ))}
        </div>
      )
    }

    return selectedOptions[0]?.label
  }, [selectedOptions, mode, options, renderValue])

  // For single select without search, show value as placeholder
  if (mode === 'single' && selectedOptions.length > 0 && !inputValue) {
    return (
      <input
        {...getInputProps({
          disabled,
          placeholder: displayValue || placeholder,
          className: cn(
            selectAutocompleteInputVariants(),
            'cursor-pointer',
            className
          ),
          readOnly: true,
        })}
      />
    )
  }

  // For combobox, always show the input value
  if (mode === 'combobox') {
    return (
      <input
        {...getInputProps({
          disabled,
          placeholder: placeholder,
          className: cn(
            selectAutocompleteInputVariants(),
            className
          ),
        })}
      />
    )
  }

  return (
    <>
      {mode === 'multiple' && displayValue}
      <input
        {...getInputProps({
          disabled,
          placeholder: placeholder,
          className: cn(
            selectAutocompleteInputVariants(),
            !inputValue && 'cursor-pointer',
            mode === 'multiple' && selectedOptions.length > 0 && 'mt-1',
            className
          ),
        })}
      />
    </>
  )
}

// Search input component
export const SelectSearch = forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<'input'> & { showIcon?: boolean }>(
  ({ placeholder = 'Search...', className, showIcon = true, ...props }, ref) => {
    const { getInputProps, inputRef, disabled } = useSelectBase()

    return (
      <div className="relative">
        {showIcon && (
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        )}
        <input
          ref={ref || inputRef}
          {...getInputProps({
            disabled,
            placeholder,
            className: cn(
              selectAutocompleteInputVariants(),
              showIcon && 'pl-8',
              className
            ),
            ...props,
          })}
        />
      </div>
    )
  },
)

SelectSearch.displayName = 'SelectSearch'

// Chip component for selected options in multiple mode
function SelectChip({ option }: { option: SelectAutocompleteOption }) {
  const { removeOption } = useSelectBase()

  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-sm text-secondary-foreground">
      {option.label}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          removeOption(option)
        }}
        className="rounded-sm hover:bg-secondary-foreground/20"
        aria-label={`Remove ${option.label}`}
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  )
}

// Clear button component
export function SelectClear({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'button'>) {
  const { selectedOptions, reset, disabled } = useSelectBase()

  if (selectedOptions.length === 0 || disabled) return null

  return (
    <button
      type="button"
      onClick={reset}
      className={cn('rounded-sm p-1 hover:bg-accent', className)}
      aria-label="Clear selection"
      {...props}
    >
      <X className="h-4 w-4" />
    </button>
  )
}

// Content component - the dropdown content
export function SelectContent({
  children,
  className,
  align = 'start',
  side = 'bottom',
  sideOffset = 4,
  maxHeight = 300,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
  maxHeight?: number | string
}) {
  const { inputRef } = useSelectBase()

  return (
    <PopoverContent
      className={cn('p-0', className)}
      align={align}
      side={side}
      sideOffset={sideOffset}
      style={{
        width: 'var(--radix-popover-trigger-width)',
        maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
      }}
      onOpenAutoFocus={(e) => {
        e.preventDefault()
        inputRef.current?.focus()
      }}
      {...props}
    >
      {children}
    </PopoverContent>
  )
}

// List component - can optionally auto-render filtered options
export function SelectList({
  children,
  className,
  renderOptions = false,
  ...props
}: React.ComponentPropsWithoutRef<'ul'> & { renderOptions?: boolean }) {
  const { getMenuProps, filteredOptions } = useSelectBase()

  return (
    <ul
      {...getMenuProps({
        className: cn(
          'max-h-full overflow-auto rounded-md bg-popover text-popover-foreground',
          className
        ),
      })}
      {...props}
    >
      {renderOptions ? (
        <>
          {filteredOptions.map((option, index) => (
            <SelectOption key={option.value} option={option} index={index} />
          ))}
          <SelectEmpty />
        </>
      ) : (
        children
      )}
    </ul>
  )
}

// Group component
export function SelectGroup({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn('p-1', className)}
      data-slot="select-group"
      {...props}
    >
      {children}
    </div>
  )
}

// Label component for groups
export function SelectLabel({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'px-2 py-1.5 text-xs font-medium text-muted-foreground',
        className
      )}
      data-slot="select-label"
      {...props}
    >
      {children}
    </div>
  )
}

// Separator component
export function SelectSeparator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn('my-1 h-px bg-border', className)}
      data-slot="select-separator"
      {...props}
    />
  )
}

// Option/Item component - works with all modes
export function SelectOption({
  option,
  index,
  children,
  className,
  showCheck = true,
  ...props
}: {
  option: SelectAutocompleteOption
  index: number
  showCheck?: boolean
} & Omit<React.ComponentPropsWithoutRef<'li'>, 'option'>) {
  const { getItemProps, highlightedIndex, selectedOptions, mode } = useSelectBase()

  const isHighlighted = highlightedIndex === index
  const isSelected = selectedOptions.some((selected) => selected.value === option.value)

  return (
    <li
      {...getItemProps({
        item: option,
        index,
        disabled: option.disabled,
        className: cn(
          selectAutocompleteItemVariants({
            highlighted: isHighlighted,
            selected: isSelected,
            disabled: option.disabled,
          }),
          className
        ),
      })}
      {...props}
    >
      {children || (
        <div className="flex w-full items-center justify-between">
          <span>{option.label}</span>
          {showCheck && isSelected && <Check className="h-4 w-4" />}
        </div>
      )}
    </li>
  )
}

// Empty state component
export function SelectEmpty({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const { filteredOptions } = useSelectBase()

  if (filteredOptions.length > 0) return null

  return (
    <div
      className={cn(selectAutocompleteEmptyVariants(), className)}
      data-slot="select-empty"
      {...props}
    >
      {children || 'No results found'}
    </div>
  )
}

// Loading component
export function SelectLoading({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(selectAutocompleteEmptyVariants(), className)}
      data-slot="select-loading"
      {...props}
    >
      {children || (
        <>
          <Loader2 className="mx-auto h-4 w-4 animate-spin" />
          <span className="mt-2 block">Loading...</span>
        </>
      )}
    </div>
  )
}