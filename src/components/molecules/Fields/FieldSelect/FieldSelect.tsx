import { useFormContext } from 'react-hook-form'
import type { SelectFieldProps } from './FieldSelect.types'
import { Required } from '@/components/atoms/Required'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/molecules/Form/Form'
import { Select, SelectTrigger, SelectValue, SelectContent } from '@/components/atoms/Select'
import { Icon } from '@/components/atoms/Icon'
import { cn } from '@/lib/utils'

export function FieldSelect({
  name,
  label,
  description,
  placeholder,
  required = false,
  disabled = false,
  className,
  children,
  mode = 'single',
  width,
  selectedText = 'Selected',
}: SelectFieldProps) {
  const { control, getFieldState } = useFormContext()
  const fieldState = getFieldState(name)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // Ensure field value matches the mode
        const fieldValue = mode === 'multiple' ? (Array.isArray(field.value) ? field.value : []) : field.value || ''

        return (
          <FormItem>
            <FormLabel>
              <div>
                <div className="flex items-center">
                  {label}
                  {required && <Required required={required} />}
                </div>
                {description && <FormDescription>{description}</FormDescription>}
              </div>
            </FormLabel>
            <FormControl>
              <Select mode={mode} value={fieldValue} onValueChange={field.onChange} disabled={disabled}>
                <SelectTrigger
                  className={cn('h-10 w-full', className)}
                  style={width ? { width: typeof width === 'number' ? `${width}px` : width } : undefined}
                  aria-invalid={!!fieldState.error}
                >
                  <SelectValue placeholder={placeholder} selectedText={selectedText} />
                  <Icon name="chevron-down" size={16} />
                </SelectTrigger>
                <SelectContent width="trigger" side="bottom" align="start">
                  {children}
                </SelectContent>
              </Select>
            </FormControl>

            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
