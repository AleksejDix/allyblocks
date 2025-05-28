import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { textareaVariants } from './Textarea.variants'

// Define specific sizes allowed for the Textarea component
export type TextareaSize = 'sm' | 'md' | 'lg'

// Define specific states for testing visual appearance
export type TextareaState = 'default' | 'hover' | 'focus' | 'active'

// Use a more specific type to ensure size is properly handled
export type TextareaProps = Omit<React.ComponentProps<'textarea'>, 'size'> &
  Omit<VariantProps<typeof textareaVariants>, 'size' | 'state'> & {
    // Make size explicitly typed rather than relying on VariantProps inference
    size?: TextareaSize
    /**
     * Whether the textarea should automatically grow in height based on content
     * Uses CSS field-sizing: content property
     */
    autoGrow?: boolean
    /**
     * Visual state for testing purposes (adds data-state attribute for easy testing)
     * - 'hover': Simulates hover state with data-state="hover"
     * - 'focus': Simulates focus state with data-state="focus"
     * - 'active': Simulates active state with data-state="active"
     * @default 'default'
     */
    state?: TextareaState
  }
