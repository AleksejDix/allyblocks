import React, { useId, useContext, createContext } from 'react'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/atoms/Checkbox'
import { Radio } from '@/components/atoms/RadioGroup'
import * as RadioPrimitive from '@radix-ui/react-radio-group'
import {
  choiceVariants,
  choiceItemVariants,
  choiceIconVariants,
  choiceContentVariants,
  choiceLabelVariants,
  choiceDescriptionVariants,
} from './Choice.variants'
import type {
  ChoiceProps,
  ChoiceItemProps,
  ChoiceIconProps,
  ChoiceContentProps,
  ChoiceLabelProps,
  ChoiceDescriptionProps,
} from './Choice.types'

type ChoiceContextValue = {
  name: string
  defaultValue?: string | string[]
  multiselect?: boolean
}

const ChoiceContext = createContext<ChoiceContextValue | null>(null)

/**
 * Choice component for creating radio button or checkbox cards with rich content.
 *
 * Features:
 * - Composable with ChoiceItem, ChoiceIcon, ChoiceContent, etc.
 * - Full card clickable area
 * - Accessible with proper labeling
 * - Visual feedback on selection
 * - Custom Radio and Checkbox components for maximum accessibility and design consistency
 * - Single select (radio) or multiselect (checkbox) modes
 *
 * @example
 * ```tsx
 * // Single select (radio buttons)
 * <Choice name="plan" defaultValue="premium">
 *   <ChoiceItem value="basic" id="choice-basic">
 *     <ChoiceIcon>
 *       <Icon name="user" />
 *     </ChoiceIcon>
 *     <ChoiceContent>
 *       <ChoiceLabel>Basic Plan</ChoiceLabel>
 *       <ChoiceDescription>Perfect for individuals</ChoiceDescription>
 *     </ChoiceContent>
 *   </ChoiceItem>
 * </Choice>
 *
 * // Multiple select (checkboxes)
 * <Choice multiselect defaultValue={["feature1", "feature3"]}>
 *   <ChoiceItem value="feature1" id="feature-1">
 *     <ChoiceContent>
 *       <ChoiceLabel>Advanced Analytics</ChoiceLabel>
 *       <ChoiceDescription>Get detailed insights</ChoiceDescription>
 *     </ChoiceContent>
 *   </ChoiceItem>
 * </Choice>
 * ```
 */
function Choice({ className, children, name, defaultValue, multiselect = false, ...props }: ChoiceProps) {
  const generatedName = useId()
  const radioGroupName = name || generatedName

  const role = multiselect ? 'group' : 'radiogroup'
  const ariaLabel = multiselect ? 'Select multiple options' : 'Select one option'

  if (multiselect) {
    return (
      <ChoiceContext.Provider value={{ name: radioGroupName, defaultValue, multiselect }}>
        <div
          className={cn(choiceVariants(), className)}
          role={role}
          aria-label={props['aria-label'] || ariaLabel}
          {...props}
        >
          {children}
        </div>
      </ChoiceContext.Provider>
    )
  }

  // For single select, wrap in RadioGroup.Root
  return (
    <ChoiceContext.Provider value={{ name: radioGroupName, defaultValue, multiselect }}>
      <RadioPrimitive.Root
        className={cn(choiceVariants(), className)}
        defaultValue={typeof defaultValue === 'string' ? defaultValue : undefined}
        name={radioGroupName}
      >
        {children}
      </RadioPrimitive.Root>
    </ChoiceContext.Provider>
  )
}

/**
 * ChoiceItem - Individual choice card
 */
function ChoiceItem({
  className,
  children,
  value,
  id,
  defaultChecked,
  disabled
}: ChoiceItemProps) {
  const context = useContext(ChoiceContext)
  const generatedId = useId()
  const itemId = id || `${generatedId}-${value}`
  const isMultiselect = context?.multiselect || false

  // Determine if this item should be checked by default
  let isDefaultChecked = defaultChecked
  if (!isDefaultChecked && context?.defaultValue) {
    if (isMultiselect && Array.isArray(context.defaultValue)) {
      isDefaultChecked = context.defaultValue.includes(value)
    } else if (!isMultiselect && typeof context.defaultValue === 'string') {
      isDefaultChecked = context.defaultValue === value
    }
  }

  return (
    <label htmlFor={itemId} className={cn(choiceItemVariants(), className)}>
      {children}
      {isMultiselect ? (
        <Checkbox
          id={itemId}
          defaultChecked={isDefaultChecked}
          disabled={disabled}
          className={cn('absolute', 'right-4', 'top-4')}
        />
      ) : (
        <Radio value={value} id={itemId} disabled={disabled} className={cn('absolute', 'right-4', 'top-4')} />
      )}
    </label>
  )
}

/**
 * ChoiceIcon - Icon container for choice items
 */
function ChoiceIcon({ children, className }: ChoiceIconProps) {
  return <div className={cn(choiceIconVariants(), className)}>{children}</div>
}

/**
 * ChoiceContent - Content container for label and description
 */
function ChoiceContent({ children, className }: ChoiceContentProps) {
  return <div className={cn(choiceContentVariants(), className)}>{children}</div>
}

/**
 * ChoiceLabel - Label for choice items
 */
function ChoiceLabel({ children, className, ...props }: ChoiceLabelProps) {
  return (
    <span className={cn(choiceLabelVariants(), className)} {...props}>
      {children}
    </span>
  )
}

/**
 * ChoiceDescription - Description text for choice items
 */
function ChoiceDescription({ children, className, ...props }: ChoiceDescriptionProps) {
  return (
    <p className={cn(choiceDescriptionVariants(), className)} {...props}>
      {children}
    </p>
  )
}

// Set display names for better debugging
Choice.displayName = 'Choice'
ChoiceItem.displayName = 'ChoiceItem'
ChoiceIcon.displayName = 'ChoiceIcon'
ChoiceContent.displayName = 'ChoiceContent'
ChoiceLabel.displayName = 'ChoiceLabel'
ChoiceDescription.displayName = 'ChoiceDescription'

export { Choice, ChoiceItem, ChoiceIcon, ChoiceContent, ChoiceLabel, ChoiceDescription }
