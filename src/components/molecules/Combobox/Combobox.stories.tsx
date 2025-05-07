import type { Meta, StoryObj } from "@storybook/react";
import { useState, useCallback } from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "./Combobox";
import { Icon } from "@/components/atoms/Icon";
import type { IconProps } from "@/components/atoms/Icon/Icon.types";

const meta: Meta<typeof Combobox> = {
  component: Combobox,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Combobox>;

// Define option type for type safety
type OptionType = {
  value: string;
  label: string;
  icon?: IconProps["name"];
  description?: string;
};

const frameworks: OptionType[] = [
  {
    value: "react",
    label: "React",
    icon: "code",
  },
  {
    value: "vue",
    label: "Vue",
    icon: "code",
  },
  {
    value: "angular",
    label: "Angular",
    icon: "code",
  },
  {
    value: "svelte",
    label: "Svelte",
    icon: "code",
  },
];

// Wrapper component to handle state for the demo
const ComboboxDemo = ({
  options,
  initialValue = "",
  placeholder = "Select framework...",
  disabled = false,
}: {
  options: OptionType[];
  initialValue?: string;
  placeholder?: string;
  disabled?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [inputValue, setInputValue] = useState("");

  const handleSelect = useCallback((currentValue: string) => {
    console.log("Selected:", currentValue);
    setValue(currentValue);
    setOpen(false);
  }, []);

  const selectedItem = options.find((item) => item.value === value);

  return (
    <Combobox open={open} onOpenChange={setOpen}>
      <ComboboxTrigger disabled={disabled}>
        {selectedItem ? (
          <span className="flex items-center gap-2">{selectedItem.label}</span>
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput
          placeholder="Search..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <ComboboxList>
          <ComboboxEmpty>No results found.</ComboboxEmpty>
          <ComboboxGroup heading="Options">
            {options.map((option) => (
              <ComboboxItem
                key={option.value}
                value={option.value}
                onSelect={handleSelect}
              >
                <div className="flex items-center gap-2">
                  {option.icon && (
                    <Icon name={option.icon} className="h-4 w-4" />
                  )}
                  <span>{option.label}</span>
                  {option.description && (
                    <span className="text-xs text-muted-foreground ml-2">
                      {option.description}
                    </span>
                  )}
                </div>
                {value === option.value && (
                  <Icon name="check" className="ml-auto h-4 w-4" />
                )}
              </ComboboxItem>
            ))}
          </ComboboxGroup>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export const Default: Story = {
  render: () => <ComboboxDemo options={frameworks} />,
};

const countries: OptionType[] = [
  {
    value: "us",
    label: "United States",
    description: "North America",
    icon: "globe",
  },
  {
    value: "ca",
    label: "Canada",
    description: "North America",
    icon: "globe",
  },
  {
    value: "uk",
    label: "United Kingdom",
    description: "Europe",
    icon: "globe",
  },
  {
    value: "fr",
    label: "France",
    description: "Europe",
    icon: "globe",
  },
  {
    value: "de",
    label: "Germany",
    description: "Europe",
    icon: "globe",
  },
  {
    value: "jp",
    label: "Japan",
    description: "Asia",
    icon: "globe",
  },
  {
    value: "au",
    label: "Australia",
    description: "Oceania",
    icon: "globe",
  },
];

export const WithDescription: Story = {
  render: () => (
    <ComboboxDemo options={countries} placeholder="Select a country" />
  ),
};

export const Disabled: Story = {
  render: () => <ComboboxDemo options={frameworks} disabled={true} />,
};

export const Controlled: Story = {
  render: () => <ComboboxDemo options={frameworks} initialValue="react" />,
};
