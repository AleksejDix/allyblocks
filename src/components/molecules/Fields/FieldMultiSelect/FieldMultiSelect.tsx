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
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/molecules/DropdownMenu";
import { Button } from "@/components/atoms/Button";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/atoms/Icon";
export type DropdownCheckboxOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type FieldMultiSelectProps = BaseFieldProps & {
  /** The options for the dropdown menu checkbox group */
  options: DropdownCheckboxOption[];
  /** The trigger button text when no option is selected */
  placeholder?: string;
  /** The width of the dropdown menu */
  width?: string | number;
  /** Text to show in front of the selected count */
  selectedText?: string;
};

export function FieldMultiSelect({
  name,
  label,
  description,
  required = false,
  disabled = false,
  options,
  placeholder = "Select options",
  width,
  selectedText = "Selected",
}: FieldMultiSelectProps) {
  const context = useFormContext();

  return (
    <FormField
      control={context.control}
      name={name}
      render={({ field }) => {
        // Ensure field value is always an array
        const values = Array.isArray(field.value) ? field.value : [];

        // Handle checkbox changes
        const handleCheckedChange = (value: string, checked: boolean) => {
          if (checked) {
            field.onChange([...values, value]);
          } else {
            field.onChange(values.filter((item) => item !== value));
          }
        };

        // Get selected count
        const selectedCount = values.length;

        return (
          <FormItem>
            <FormLabel>
              <div>
                <div className="flex items-center">
                  {label}
                  {required && <Required required={required} />}
                </div>
                {description && (
                  <FormDescription>{description}</FormDescription>
                )}
              </div>
            </FormLabel>
            <div>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild disabled={disabled}>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-10",
                        !selectedCount && "text-muted-foreground",
                      )}
                      aria-invalid={!!context.getFieldState(name).error}
                      style={width ? { width } : undefined}
                    >
                      <span>
                        {selectedCount
                          ? `${selectedText}: ${selectedCount}`
                          : placeholder}
                      </span>
                      <Icon name="chevron-down" size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      {options.map((option) => (
                        <DropdownMenuCheckboxItem
                          key={option.value}
                          checked={values.includes(option.value)}
                          onCheckedChange={(checked) =>
                            handleCheckedChange(option.value, checked)
                          }
                          disabled={option.disabled}
                        >
                          {option.label}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>

              <FormMessage />
            </div>
          </FormItem>
        );
      }}
    />
  );
}

export default FieldMultiSelect;
