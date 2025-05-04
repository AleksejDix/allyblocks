import { useFormContext } from "react-hook-form";
import { Input } from "@/components/atoms/Input";
import { Required } from "@/components/atoms/Required";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/molecules/Form/Form";
import { InputFieldProps } from "../Field";

export function FieldText({
  name,
  label,
  description,
  required = false,
  disabled = false,
  placeholder,
  ...props
}: InputFieldProps) {
  const context = useFormContext();

  return (
    <FormField
      control={context.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <div className="flex items-center">
              {label}
              {required && <Required required={required} />}
            </div>
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              {...props}
              placeholder={placeholder}
              required={required}
              disabled={disabled}
              aria-invalid={!!context.getFieldState(name).error}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FieldText;
