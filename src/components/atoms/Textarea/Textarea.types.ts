import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { textareaVariants } from './Textarea.variants'

// Define specific sizes allowed for the Textarea component
export type TextareaSize = 'sm' | 'md' | 'lg'

// Use a more specific type to ensure size is properly handled
export type TextareaProps = Omit<React.ComponentProps<'textarea'>, 'size'> &
  Omit<VariantProps<typeof textareaVariants>, 'size'> & {
    // Make size explicitly typed rather than relying on VariantProps inference
    size?: TextareaSize
    /**
     * Whether the textarea should automatically grow in height based on content
     * Uses CSS field-sizing: content property
     */
    autoGrow?: boolean
  }
