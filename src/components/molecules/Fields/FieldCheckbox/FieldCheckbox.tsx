import { useFormContext } from "react-hook-form";
import type { CheckboxFieldProps } from "../Field.types";
import { Required } from "@/components/atoms/Required";

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  FormDescription,
} from "@/components/molecules/Form/Form";

export function FieldCheckbox({
  name,
  label,
  description,
  required = false,
  disabled = false,
  className,
  ...props
}: CheckboxFieldProps) {
  const { control, getFieldState } = useFormContext();
  const fieldState = getFieldState(name);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <input
              type="checkbox"
              checked={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              disabled={disabled}
              aria-invalid={!!fieldState.error}
              aria-required={required}
              className={`mt-1 ${className || ""}`}
              {...props}
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
  );
}
