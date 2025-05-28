import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { textareaVariants } from './Textarea.variants'

// Define specific sizes allowed for the Textarea component
export type TextareaSize = 'sm' | 'md' | 'lg'

// Define specific states for testing visual appearance
export type TextareaState = 'default' | 'hover' | 'focus'

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
     * Visual state for testing purposes (adds CSS classes for Chromatic screenshots)
     * @default 'default'
     */
    state?: TextareaState
  }
