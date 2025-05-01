import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/molecules/Form/Form";
import { Input } from "@/components/atoms/Input/Input";
import { FieldValues, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Required } from "@/components/atoms/Required/Required";

type TextInputAutocompleteOption =
  | "off"
  | "on"
  | "name"
  | "given-name"
  | "family-name"
  | "username"
  | "street-address"
  | "address-line1"
  | "address-line2"
  | "address-line3"
  | "address-level1"
  | "address-level2"
  | "address-level3"
  | "address-level4"
  | "country"
  | "postal-code"
  | "organization";

type Props = {
  name: string;
  label: string;
  description?: string;
  className?: string;
  hideLabel?: boolean;
  placeholder?: string;
  autoComplete?: TextInputAutocompleteOption;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  pattern?: string;
  defaultValue?: string;
};

export const FormFieldText = ({
  name,
  label,
  description,
  className,
  hideLabel = false,
  placeholder,
  autoComplete = "off",
  disabled = false,
  required = false,
  maxLength,
  pattern,
}: Props) => {
  const context = useFormContext();
  const { control } = context;

  const renderLabel = () =>
    label ? (
      <FormLabel className={cn(hideLabel && "sr-only")}>
        <Required required={required} />
        {label}
      </FormLabel>
    ) : null;

  const renderDescription = () =>
    description ? <FormDescription>{description}</FormDescription> : null;

  const renderInput = (field: FieldValues) => (
    <FormControl>
      <Input
        {...field}
        type="text"
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
        pattern={pattern}
      />
    </FormControl>
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }: { field: FieldValues }) => (
        <FormItem className={className}>
          {renderLabel()}
          {renderDescription()}
          {renderInput(field)}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
