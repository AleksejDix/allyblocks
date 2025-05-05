import { useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/atoms/RadioGroup";
import { Required } from "@/components/atoms/Required";
import { Label } from "@/components/atoms/Label";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/molecules/Form/Form";
import { BaseFieldProps } from "../Field";

export type RadioOption = {
  label: string;
  value: string;
  disabled?: boolean;
  id?: string;
};

export type FieldRadioGroupProps = BaseFieldProps & {
  /** The options for the radio group */
  options: RadioOption[];
  /** The orientation of the radio group */
  orientation?: "horizontal" | "vertical";
  /** Whether to render radios as card-style UI */
  cardStyle?: boolean;
};

export function FieldRadioGroup({
  name,
  label,
  description,
  required = false,
  disabled = false,
  options,
  orientation = "vertical",
  cardStyle = false,
  ...props
}: FieldRadioGroupProps) {
  const context = useFormContext();

  return (
    <FormField
      control={context.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>
            <div className="flex items-center">
              {label}
              {required && <Required required={required} />}
            </div>
          </FormLabel>
          <FormControl>
            <RadioGroup
              className={
                orientation === "horizontal" ? "flex gap-4" : "space-y-2"
              }
              value={field.value}
              onValueChange={field.onChange}
              disabled={disabled}
              aria-invalid={!!context.getFieldState(name).error}
              {...props}
            >
              {options.map((option) => {
                const id = option.id || `${name}-${option.value}`;

                if (cardStyle) {
                  return (
                    <div key={option.value}>
                      <RadioGroupItem
                        value={option.value}
                        id={id}
                        className="peer sr-only"
                        disabled={option.disabled}
                      />
                      <Label
                        htmlFor={id}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="text-sm font-medium">
                          {option.label}
                        </span>
                      </Label>
                    </div>
                  );
                }

                return (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={id}
                      disabled={option.disabled}
                    />
                    <Label
                      htmlFor={id}
                      className={option.disabled ? "text-muted-foreground" : ""}
                    >
                      {option.label}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FieldRadioGroup;
