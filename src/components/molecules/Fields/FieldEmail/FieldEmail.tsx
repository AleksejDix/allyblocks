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
      render={(fieldContext) => (
        <FormItem>
          <FormLabel>
            <div className="flex items-center">
              {label}
              {required && <Required required={required} />}
            </div>
          </FormLabel>
          <FormControl>
            <Input
              {...fieldContext.field}
              type="email"
              {...props}
              required={required}
              aria-invalid={!!fieldContext.fieldState.error}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
