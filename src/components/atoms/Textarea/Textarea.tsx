import { cn } from '@/lib/utils'
import { textareaVariants } from './Textarea.variants'
import type { TextareaProps } from './Textarea.types'

function Textarea({ className, size, autoGrow, state, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      data-state={state !== 'default' ? state : undefined}
      className={cn(textareaVariants({ size, autoGrow, state }), className)}
      {...props}
    />
  )
}

export { Textarea }
