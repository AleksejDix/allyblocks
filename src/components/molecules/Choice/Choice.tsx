import React, { useId, useContext, createContext } from 'react'
import { cn } from '@/lib/utils'
import {
  choiceVariants,
  choiceItemVariants,
  choiceIconVariants,
  choiceContentVariants,
  choiceLabelVariants,
  choiceDescriptionVariants,
  choiceRadioVariants,
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
  defaultValue?: string
}

const ChoiceContext = createContext<ChoiceContextValue | null>(null)

/**
 * Choice component for creating radio button cards with rich content.
 *
 * Features:
 * - Composable with ChoiceItem, ChoiceIcon, ChoiceContent, etc.
 * - Full card clickable area
 * - Accessible with proper labeling
 * - Visual feedback on selection
 * - Native HTML radio inputs for maximum accessibility
 *
 * @example
 * ```tsx
 * <Choice name="plan" defaultValue="1">
 *   <ChoiceItem value="1" id="choice-1">
 *     <ChoiceIcon>
 *       <Icon name="star" />
 *     </ChoiceIcon>
 *     <ChoiceContent>
 *       <ChoiceLabel>Premium Plan</ChoiceLabel>
 *       <ChoiceDescription>
 *         Access to all features with priority support
 *       </ChoiceDescription>
 *     </ChoiceContent>
 *   </ChoiceItem>
 * </Choice>
 * ```
 */
function Choice({ className, children, name, defaultValue, ...props }: ChoiceProps) {
  const generatedName = useId()
  const radioGroupName = name || generatedName

  return (
    <ChoiceContext.Provider value={{ name: radioGroupName, defaultValue }}>
      <div className={cn(choiceVariants(), className)} role="radiogroup" {...props}>
        {children}
      </div>
    </ChoiceContext.Provider>
  )
}

/**
 * ChoiceItem - Individual choice card
 */
function ChoiceItem({ className, children, value, id, name: propName, defaultChecked, ...props }: ChoiceItemProps) {
  const context = useContext(ChoiceContext)
  const generatedId = useId()
  const itemId = id || `${generatedId}-${value}`
  const radioName = propName || context?.name
  const isDefaultChecked = defaultChecked || context?.defaultValue === value

  return (
    <label htmlFor={itemId} className={cn(choiceItemVariants(), className)}>
      {children}
      <input
        type="radio"
        value={value}
        id={itemId}
        name={radioName}
        defaultChecked={isDefaultChecked}
        className={cn(choiceRadioVariants())}
        {...props}
      />
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
