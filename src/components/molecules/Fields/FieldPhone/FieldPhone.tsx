import React from "react";
import { ChevronDownIcon, PhoneIcon } from "lucide-react";
import PhoneInputLib from "react-phone-number-input";
import type { Country } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { useFormContext } from "react-hook-form";
import "react-phone-number-input/style.css";

import { cn } from "@/lib/utils";
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
import { BaseFieldProps } from "../Field";

export interface PhoneFieldProps extends BaseFieldProps {
  defaultCountry?: Country;
}

export function FieldPhone({
  name,
  label = "Phone Number",
  description,
  required = false,
  disabled = false,
  defaultCountry,
}: PhoneFieldProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
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
            <div className="phone-input-container">
              <PhoneInputLib
                className="flex rounded-md shadow-xs"
                international
                countrySelectComponent={CountrySelect}
                inputComponent={PhoneInput}
                withCountryCallingCode
                placeholder="Enter phone number"
                value={field.value}
                onChange={field.onChange}
                disabled={disabled}
                defaultCountry={defaultCountry}
              />
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

const PhoneInput = ({ className, ...props }: React.ComponentProps<"input">) => {
  return (
    <Input
      data-slot="phone-input"
      className={cn(
        "-ms-px rounded-s-none shadow-none focus-visible:z-10",
        className
      )}
      {...props}
    />
  );
};

PhoneInput.displayName = "PhoneInput";

const CountrySelect = ({
  disabled,
  value,
  onChange,
  options,
}: {
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div
      className="outline-1
outline-zinc-950/5 border-input bg-background text-muted-foreground focus-within:border-ring focus-within:ring-ring/50 hover:bg-accent hover:text-foreground has-aria-invalid:border-destructive/60 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 relative inline-flex items-center self-stretch rounded-s-md border py-2 ps-3 pe-2 transition-[color,box-shadow] focus-within:z-10 focus-within:ring-[3px] has-disabled:pointer-events-none has-disabled:opacity-50"
    >
      <div className="inline-flex items-center gap-1" aria-hidden="true">
        <FlagComponent country={value} countryName={value} />
        <span className="text-muted-foreground/80">
          <ChevronDownIcon size={16} aria-hidden="true" />
        </span>
      </div>
      <select
        disabled={disabled}
        value={value}
        onChange={handleSelect}
        className="absolute inset-0 text-sm opacity-0"
        aria-label="Select country"
      >
        <option key="default" value="">
          Select a country
        </option>
        {options.map(({ value, label }) => (
          <option key={value || `empty-${label}`} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Simplified FlagComponent
const FlagComponent = ({
  country,
  countryName,
}: {
  country: string;
  countryName: string;
}) => {
  const Flag = country && flags[country as keyof typeof flags];

  return (
    <span className="w-5 overflow-hidden rounded-sm">
      {Flag ? (
        <Flag title={countryName} />
      ) : (
        <PhoneIcon size={16} aria-hidden="true" />
      )}
    </span>
  );
};

export default FieldPhone;
