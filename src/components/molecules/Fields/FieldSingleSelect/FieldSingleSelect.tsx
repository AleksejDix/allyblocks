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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/molecules/DropdownMenu";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { cn } from "@/lib/utils";

export type DropdownRadioOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type FieldSingleSelectProps = BaseFieldProps & {
  options: DropdownRadioOption[];
  placeholder?: string;
};

export function FieldSingleSelect({
  name,
  label,
  description,
  required = false,
  disabled = false,
  options,
  placeholder = "Select an option",
}: FieldSingleSelectProps) {
  const context = useFormContext();

  return (
    <FormField
      control={context.control}
      name={name}
      render={({ field }) => {
        const selectedOption = options.find(
          (option) => option.value === field.value
        );

        return (
          <FormItem>
            <FormLabel>
              <div className="flex items-center">
                {label}
                {required && <Required required={required} />}
              </div>
            </FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
            <FormControl>
              <DropdownMenu>
                <DropdownMenuTrigger asChild disabled={disabled}>
                  <Button
                    variant="outline"
                    className={cn(!field.value && "text-muted-foreground")}
                    aria-invalid={!!context.getFieldState(name).error}
                  >
                    {selectedOption ? selectedOption.label : placeholder}

                    <Icon name="chevron-down" size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuRadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    {options.map((option) => (
                      <DropdownMenuRadioItem
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                      >
                        {option.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </FormControl>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
