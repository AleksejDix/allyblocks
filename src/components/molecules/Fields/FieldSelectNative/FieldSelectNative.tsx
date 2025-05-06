import { useFormContext } from "react-hook-form";
import { SelectNative } from "@/components/atoms/SelectNative";
import { Required } from "@/components/atoms/Required";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/molecules/Form/Form";
import { BaseFieldProps } from "../Field";
import React from "react";

export type FieldSelectNativeProps = BaseFieldProps &
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    /** Placeholder text for the select field */
    placeholder?: string;
    children: React.ReactNode;
  };

export function FieldSelectNative({
  name,
  label,
  description,
  required = false,
  disabled = false,
  placeholder,
  multiple,
  children,
  ...props
}: FieldSelectNativeProps) {
  const context = useFormContext();

  return (
    <FormField
      control={context.control}
      name={name}
      render={({ field }) => {
        // Handle multiple select values
        const handleMultipleChange = (
          e: React.ChangeEvent<HTMLSelectElement>,
        ) => {
          const options = Array.from(e.target.selectedOptions);
          const values = options.map((option) => option.value);
          field.onChange(values);
        };

        return (
          <FormItem>
            <FormLabel>
              <div className="flex items-center">
                {label}
                {required && <Required required={required} />}
              </div>
            </FormLabel>
            <FormControl>
              <SelectNative
                {...field}
                {...props}
                // For multiple select, we need special handling
                value={
                  multiple
                    ? Array.isArray(field.value)
                      ? field.value
                      : []
                    : field.value || ""
                }
                onChange={multiple ? handleMultipleChange : field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                required={required}
                multiple={multiple}
                disabled={disabled}
                aria-invalid={!!context.getFieldState(name).error}
              >
                {!multiple && placeholder && (
                  <option value="">{placeholder}</option>
                )}
                {children}
              </SelectNative>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export default FieldSelectNative;
