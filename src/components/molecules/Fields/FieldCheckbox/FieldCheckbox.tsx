import { useFormContext } from 'react-hook-form'
import type { CheckboxFieldProps } from '../Field.types'
import { Required } from '@/components/atoms/Required'
import { Checkbox } from '@/components/atoms/Checkbox'

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  FormDescription,
} from '@/components/molecules/Form/Form'

export function FieldCheckbox({
  name,
  label,
  description,
  required = false,
  disabled = false,
  className,
  size,
}: CheckboxFieldProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
              size={size}
              className={className}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            {label && (
              <FormLabel>
                {label}
                {required && <Required required={required} />}
              </FormLabel>
            )}
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}
