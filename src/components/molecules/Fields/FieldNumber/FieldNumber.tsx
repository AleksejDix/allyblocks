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

export interface NumberFieldProps extends Omit<InputFieldProps, "type"> {
  min?: number;
  max?: number;
  step?: number;
}

export function FieldNumber({
  name,
  label,
  description,
  required = false,
  disabled = false,
  placeholder,
  min,
  max,
  step,
  ...props
}: NumberFieldProps) {
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
                step={step}
                aria-invalid={!!context.getFieldState(name).error}
                onKeyDown={(e) =>
                  handleNumberKeyDown(e, { integerOnly: false })
                }
                onChange={(e) =>
                  handleNumberChange(e, field, { integerOnly: false })
                }
                onPaste={(e) =>
                  handleNumberPaste(e, field, { integerOnly: false })
                }
                onBlur={(e) =>
                  handleNumberBlur(e, field, { integerOnly: false })
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

export default FieldNumber;
