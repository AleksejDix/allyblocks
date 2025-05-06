import { useFormContext } from "react-hook-form";
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
import { Switch } from "@/components/atoms/Switch/Switch";

export type FieldSwitchProps = BaseFieldProps & {
  /** Label to show when switch is on */
  onLabel?: string;
  /** Label to show when switch is off */
  offLabel?: string;
  /** Whether the switch should appear on the right side of the label */
  alignRight?: boolean;
};

export function FieldSwitch({
  name,
  label,
  description,
  required = false,
  disabled = false,
  onLabel,
  offLabel,
  alignRight = false,
}: FieldSwitchProps) {
  const context = useFormContext();

  return (
    <FormField
      control={context.control}
      name={name}
      render={({ field }) => {
        // Convert boolean value to be compatible with the Switch component
        const checked = !!field.value;
        const onValueChange = (checked: boolean) => field.onChange(checked);

        return (
          <FormItem
            className={
              alignRight
                ? "flex flex-row items-center justify-between gap-2"
                : ""
            }
          >
            <div className="flex flex-col">
              <FormLabel htmlFor={name}>
                <div className="flex items-center">
                  {label}
                  {required && <Required required={required} />}
                </div>
              </FormLabel>
              {description && <FormDescription>{description}</FormDescription>}
            </div>
            <FormControl>
              <div className="flex items-center gap-2">
                {!alignRight && offLabel && (
                  <span className="text-sm text-muted-foreground">
                    {offLabel}
                  </span>
                )}
                <Switch
                  id={name}
                  checked={checked}
                  onCheckedChange={onValueChange}
                  disabled={disabled}
                  aria-invalid={!!context.getFieldState(name).error}
                />
                {!alignRight && onLabel && (
                  <span className="text-sm text-muted-foreground">
                    {onLabel}
                  </span>
                )}
                {alignRight && (checked ? onLabel : offLabel) && (
                  <span className="text-sm text-muted-foreground">
                    {checked ? onLabel : offLabel}
                  </span>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export default FieldSwitch;
