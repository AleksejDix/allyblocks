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
import { type InputFieldProps } from "../Field.types";

export function FieldEmail({
  name,
  label = "Email",
  description,
  required = false,
  ...props
}: InputFieldProps) {
  const context = useFormContext();

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
            <Input
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              type="email"
              {...props}
              required={required}
              aria-invalid={!!fieldState.error}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
