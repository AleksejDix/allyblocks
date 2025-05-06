import { createContext, useContext, useId, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/molecules/DropdownMenu";
import { Button } from "@/components/atoms/Button";

import {
  MultiSelectProps,
  MultiSelectTriggerProps,
  MultiSelectContentProps,
  MultiSelectItemProps,
  MultiSelectValueProps,
  MultiSelectGroupProps,
  MultiSelectLabelProps,
  MultiSelectSeparatorProps,
  MultiSelectOption,
} from "./MultiSelect.types";

import {
  multiSelectContentVariants,
  multiSelectItemVariants,
} from "./MultiSelect.variants";

// Create context to share state between components
type MultiSelectContextValue = {
  value: string[];
  onValueChange: (value: string[]) => void;
  options?: MultiSelectOption[];
  disabled?: boolean;
  required?: boolean;
  id: string;
};

const MultiSelectContext = createContext<MultiSelectContextValue | undefined>(
  undefined
);

function useMultiSelect() {
  const context = useContext(MultiSelectContext);
  if (!context) {
    throw new Error(
      "MultiSelect components must be used within a MultiSelect root"
    );
  }
  return context;
}

export function MultiSelect({
  value,
  defaultValue = [],
  onValueChange,
  disabled,
  id: customId,
  required,
  children,
  className,
  options,
  ...props
}: MultiSelectProps) {
  const [internalValue, setInternalValue] = useState<string[]>(
    defaultValue || []
  );
  const generatedId = useId();
  const id = customId ?? generatedId;

  // Use provided value if controlled, internal state if uncontrolled
  const currentValue = value !== undefined ? value : internalValue;

  const handleValueChange = useCallback(
    (newValue: string[]) => {
      setInternalValue(newValue);
      onValueChange?.(newValue);
    },
    [onValueChange]
  );

  // Simplify context value creation by inlining it
  return (
    <MultiSelectContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
        options,
        disabled,
        required,
        id,
      }}
    >
      <DropdownMenu>
        <div
          className={cn("relative", className)}
          data-slot="multi-select-container"
          {...props}
        >
          {children}
          {options && (
            <MultiSelectContent>
              {options.map((option: MultiSelectOption) => (
                <MultiSelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </MultiSelectItem>
              ))}
            </MultiSelectContent>
          )}
        </div>
      </DropdownMenu>
    </MultiSelectContext.Provider>
  );
}

export function MultiSelectTrigger({
  className,
  children,
  variant = "outline",
  size = "default",
  ...props
}: MultiSelectTriggerProps) {
  const { disabled, id, required } = useMultiSelect();

  return (
    <DropdownMenuTrigger asChild disabled={disabled}>
      <Button
        id={id}
        type="button"
        variant={variant}
        size={size}
        className={className}
        data-slot="multi-select-trigger"
        aria-required={required}
        disabled={disabled}
        {...props}
      >
        {children}
      </Button>
    </DropdownMenuTrigger>
  );
}

export function MultiSelectValue({
  className,
  placeholder = "Select options",
  selectedText = "Selected",
  maxDisplayItems = 2,
  showSelectedLabels = true,
}: MultiSelectValueProps) {
  const { value, options } = useMultiSelect();
  const selectedCount = value.length;

  const getDisplayText = () => {
    if (selectedCount === 0) return placeholder;

    if (!showSelectedLabels) {
      return `${selectedText}: ${selectedCount}`;
    }

    const selectedLabels = value
      .map((val) => {
        // Find matching option label or fallback to capitalized value
        const option = options?.find((opt) => opt.value === val);
        if (option) return option.label;

        // If no option found, just capitalize the value
        return val.charAt(0).toUpperCase() + val.slice(1);
      })
      .filter(Boolean);

    if (selectedLabels.length <= maxDisplayItems) {
      return selectedLabels.join(", ");
    } else {
      const visibleLabels = selectedLabels.slice(0, maxDisplayItems);
      const remainingCount = selectedLabels.length - maxDisplayItems;
      return `${visibleLabels.join(", ")} +${remainingCount} more`;
    }
  };

  return (
    <span
      className={cn(
        !selectedCount && "text-muted-foreground",
        "truncate",
        className
      )}
    >
      {getDisplayText()}
    </span>
  );
}

export function MultiSelectGroup({
  className,
  children,
  ...props
}: MultiSelectGroupProps) {
  return (
    <DropdownMenuGroup
      className={className}
      data-slot="multi-select-group"
      {...props}
    >
      {children}
    </DropdownMenuGroup>
  );
}

export function MultiSelectContent({
  className,
  children,
  width = "auto",
  side,
  align,
  sideOffset,
  ...props
}: MultiSelectContentProps) {
  // Workaround for TypeScript incompatibility with Radix UI props
  // Create a type safe compatible subset of props
  const safeContentProps = {
    className: cn(multiSelectContentVariants({ width, className })),
    "data-slot": "multi-select-content",
    ...props,
  } as const;

  // Add positioning props directly to the element (technically supported but not typed correctly)
  return (
    // @ts-expect-error - Radix UI's types don't properly expose positioning props
    <DropdownMenuContent
      {...safeContentProps}
      side={side}
      align={align}
      sideOffset={sideOffset}
    >
      {children}
    </DropdownMenuContent>
  );
}

export function MultiSelectLabel({
  className,
  children,
  ...props
}: MultiSelectLabelProps) {
  return (
    <DropdownMenuLabel
      className={cn("px-2 py-1.5 text-xs text-muted-foreground", className)}
      data-slot="multi-select-label"
      {...props}
    >
      {children}
    </DropdownMenuLabel>
  );
}

export function MultiSelectSeparator({
  className,
  ...props
}: MultiSelectSeparatorProps) {
  return (
    <DropdownMenuSeparator
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      data-slot="multi-select-separator"
      {...props}
    />
  );
}

export function MultiSelectItem({
  className,
  children,
  value: itemValue,
  disabled,
}: MultiSelectItemProps) {
  const { value, onValueChange } = useMultiSelect();
  const isSelected = value.includes(itemValue);

  const handleCheckedChange = (checked: boolean) => {
    if (checked) {
      onValueChange([...value, itemValue]);
    } else {
      onValueChange(value.filter((v) => v !== itemValue));
    }
  };

  return (
    <DropdownMenuCheckboxItem
      className={cn(multiSelectItemVariants({ className }))}
      checked={isSelected}
      onCheckedChange={handleCheckedChange}
      disabled={disabled}
      data-slot="multi-select-item"
    >
      {children}
    </DropdownMenuCheckboxItem>
  );
}
