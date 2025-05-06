import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/atoms/Icon";
import { Button } from "@/components/atoms/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/molecules/Command";
import {
  ComboboxTriggerProps,
  ComboboxContentProps,
  ComboboxInputProps,
} from "./Combobox.types";
import {
  comboboxContentVariants,
  comboboxInputVariants,
} from "./Combobox.variants";

function Combobox({
  className,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Popover.Root>, "className"> & {
  className?: string;
}) {
  return (
    <Popover.Root {...props}>
      <div className={cn("relative", className)}>{children}</div>
    </Popover.Root>
  );
}

function ComboboxTrigger({
  className,
  variant = "outline",
  size = "default",
  children,
  ...props
}: ComboboxTriggerProps & {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}) {
  return (
    <Popover.Trigger asChild>
      <Button
        type="button"
        variant={variant}
        size={size}
        className={cn("w-full justify-between", className)}
        {...props}
      >
        <Icon name="search" />
        {children}
      </Button>
    </Popover.Trigger>
  );
}

function ComboboxContent({
  className,
  width = "trigger",
  align = "start",
  side = "bottom",
  sideOffset = 4,
  children,
  ...props
}: ComboboxContentProps) {
  return (
    <Popover.Portal>
      <Popover.Content
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={cn(comboboxContentVariants({ width, className }))}
        {...props}
      >
        <Command
          className="overflow-hidden rounded-md bg-popover"
          shouldFilter={true}
        >
          {children}
        </Command>
      </Popover.Content>
    </Popover.Portal>
  );
}

function ComboboxInput({
  className,
  inputSize = "default",
  onChange,
  ...props
}: ComboboxInputProps & {
  inputSize?: "default" | "sm" | "lg";
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  // Extract value to handle it properly
  const { value, ...restProps } = props;
  const stringValue = typeof value === "string" ? value : "";

  // If onChange is provided, use it along with CommandInput's onValueChange
  const handleValueChange = (newValue: string) => {
    if (onChange) {
      // Create a synthetic event that mimics enough of a change event
      // to be useful in typical React patterns
      const syntheticEvent = {
        target: { value: newValue },
        currentTarget: { value: newValue },
        preventDefault: () => {},
        stopPropagation: () => {},
      } as React.ChangeEvent<HTMLInputElement>;

      onChange(syntheticEvent);
    }
  };

  return (
    <CommandInput
      className={cn(comboboxInputVariants({ size: inputSize, className }))}
      value={stringValue}
      onValueChange={handleValueChange}
      {...restProps}
    />
  );
}

// Create a ComboboxItem component that uses a direct click handler
function ComboboxItem({
  className,
  value,
  onSelect,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandItem> & {
  onSelect?: (value: string) => void;
  value: string;
}) {
  // Use a direct click handler
  const handleClick = React.useCallback(() => {
    if (onSelect && value) {
      onSelect(value);
    }
  }, [onSelect, value]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" && onSelect && value) {
        console.log("Enter key pressed");
        onSelect(value);
      }
    },
    [onSelect, value]
  );

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="cursor-pointer"
    >
      <CommandItem className={className} value={value} {...props}>
        {children}
      </CommandItem>
    </div>
  );
}

// Re-export the Command components directly
export {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  // Direct re-exports of Command components
  CommandEmpty as ComboboxEmpty,
  CommandGroup as ComboboxGroup,
  CommandList as ComboboxList,
  CommandSeparator as ComboboxSeparator,
  CommandShortcut as ComboboxShortcut,
  // Alias
  Combobox as ComboboxRoot,
};
