import { useFormContext } from "react-hook-form";
import { SelectFieldProps } from "../Field";
import { Required } from "@/components/atoms/Required";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/molecules/Form/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/Select";

export function FieldSelect({
  name,
  label,
  description,
  options,
  placeholder,
  required = false,
  disabled = false,
  className,
}: SelectFieldProps) {
  const { control, getFieldState } = useFormContext();
  const fieldState = getFieldState(name);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
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
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={disabled}
            >
              <SelectTrigger
                className={className}
                aria-invalid={!!fieldState.error}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
