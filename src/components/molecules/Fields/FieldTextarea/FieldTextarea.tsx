import { useFormContext } from 'react-hook-form'
import type { TextareaFieldProps } from './FieldTextarea.types'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/molecules/Form/Form'
import { Required } from '@/components/atoms/Required'
import { Textarea } from '@/components/atoms/Textarea'

// Add CSS property type definition for fieldSizing
declare module 'react' {
  interface CSSProperties {
    fieldSizing?: 'content' | 'normal'
  }
}

export function FieldTextarea({
  name,
  label,
  description,
  required = false,
  minHeight,
  maxHeight,
  autoResize = false,
  className,
  style,
  ...props
}: TextareaFieldProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>
            <div className="flex items-center">
              {label}
              {required && <Required required={required} />}
            </div>
          </FormLabel>
          <FormControl>
            <Textarea
              className={className}
              style={{
                ...style,
                minHeight: minHeight ? `${minHeight}px` : undefined,
                maxHeight: maxHeight ? `${maxHeight}px` : undefined,
                resize: autoResize ? 'none' : 'vertical',
                fieldSizing: autoResize ? 'content' : 'normal',
              }}
              aria-invalid={!!fieldState.error}
              aria-required={required}
              {...field}
              {...props}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
