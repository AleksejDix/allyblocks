import { useFormContext } from 'react-hook-form'
import { RadioGroup, Radio, RadioItem } from '@/components/atoms/RadioGroup'
import { Required } from '@/components/atoms/Required'
import { Label } from '@/components/atoms/Label'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/molecules/Form/Form'
import { type BaseFieldProps } from '../Field.types'

export type RadioOption = {
  label: string
  value: string
  disabled?: boolean
  id?: string
}

export type FieldRadioGroupProps = BaseFieldProps & {
  /** The options for the radio group */
  options: RadioOption[]
  /** The orientation of the radio group */
  orientation?: 'horizontal' | 'vertical'
}

export function FieldRadioGroup({
  name,
  label,
  description,
  required = false,
  disabled = false,
  options,
  orientation = 'vertical',
  ...props
}: FieldRadioGroupProps) {
  const context = useFormContext()

  return (
    <FormField
      control={context.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="space-y-2">
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
            <RadioGroup
              orientation={orientation}
              value={field.value}
              onValueChange={field.onChange}
              disabled={disabled}
              aria-invalid={fieldState.error ? 'true' : undefined}
              {...props}
            >
              {options.map((option) => {
                const id = option.id || `${name}-${option.value}`

                return (
                  <RadioItem key={option.value}>
                    <Radio value={option.value} id={id} disabled={option.disabled} />
                    <Label htmlFor={id} className={option.disabled ? 'text-muted-foreground' : ''}>
                      {option.label}
                    </Label>
                  </RadioItem>
                )
              })}
            </RadioGroup>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FieldRadioGroup
