import { useFormContext } from 'react-hook-form'
import { DatePicker } from '@/components/molecules/DatePicker'
import { Required } from '@/components/atoms/Required'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/molecules/Form/Form'
import type { BaseFieldProps } from '../BaseField.types'
import type { DatePickerProps } from '@/components/molecules/DatePicker/DatePicker.types'

export type FieldDateProps = BaseFieldProps &
  Omit<DatePickerProps<'single'>, 'name' | 'value' | 'defaultValue' | 'onValueChange'>

export function FieldDate({
  name,
  label,
  description,
  required = false,
  disabled = false,
  placeholder = 'Select a date',
  ...props
}: FieldDateProps) {
  const context = useFormContext()

  return (
    <FormField
      control={context.control}
      name={name}
      render={({ field, fieldState }) => (
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
            <DatePicker
              mode="single"
              value={field.value}
              onValueChange={field.onChange}
              placeholder={placeholder}
              required={required}
              disabled={disabled}
              aria-invalid={!!fieldState.error}
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FieldDate