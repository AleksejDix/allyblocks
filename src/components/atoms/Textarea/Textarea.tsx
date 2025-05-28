import { cn } from '@/lib/utils'
import { textareaVariants } from './Textarea.variants'
import type { TextareaProps } from './Textarea.types'

function Textarea({ className, size, autoGrow, ...props }: TextareaProps) {
  return <textarea data-slot="textarea" className={cn(textareaVariants({ size, autoGrow }), className)} {...props} />
}

export { Textarea }
