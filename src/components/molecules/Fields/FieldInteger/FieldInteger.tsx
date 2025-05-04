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
import {
  handleNumberKeyDown,
  handleNumberChange,
  handleNumberPaste,
  handleNumberBlur,
} from "../utils/numberValidation";

export interface IntegerFieldProps extends Omit<InputFieldProps, "type"> {
  min?: number;
  max?: number;
}

export function FieldInteger({
  name,
  label,
  description,
  required = false,
  disabled = false,
  placeholder,
  min,
  max,
  ...props
}: IntegerFieldProps) {
  const context = useFormContext();

  return (
    <FormField
      control={context.control}
      name={name}
      render={({ field }) => {
        return (
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
                type="number"
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                min={min}
                max={max}
                step={1} // Force step to be 1 for integers
                aria-invalid={!!context.getFieldState(name).error}
                onKeyDown={(e) => handleNumberKeyDown(e, { integerOnly: true })}
                onChange={(e) =>
                  handleNumberChange(e, field, { integerOnly: true })
                }
                onPaste={(e) =>
                  handleNumberPaste(e, field, { integerOnly: true })
                }
                onBlur={(e) =>
                  handleNumberBlur(e, field, { integerOnly: true })
                }
                {...props}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export default FieldInteger;
