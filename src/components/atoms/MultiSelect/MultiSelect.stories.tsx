import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within, screen } from "@storybook/test";
import { Icon } from "@/components/atoms/Icon";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
  MultiSelectGroup,
  MultiSelectLabel,
  MultiSelectSeparator,
} from "./MultiSelect";
import { waitFor } from "@testing-library/react";

const meta: Meta<typeof MultiSelect> = {
  component: MultiSelect,
  subcomponents: {
    MultiSelectContent: MultiSelectContent,
    MultiSelectItem: MultiSelectItem,
    MultiSelectTrigger: MultiSelectTrigger,
    MultiSelectValue: MultiSelectValue,
    MultiSelectGroup: MultiSelectGroup,
    MultiSelectLabel: MultiSelectLabel,
    MultiSelectSeparator: MultiSelectSeparator,
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "object",
      description: "The value of the select",
    },
    defaultValue: {
      control: "object",
      description: "The default value of the select",
    },
    onValueChange: {
      action: "value changed",
      description: "Callback when the selection changes",
    },
    disabled: {
      control: "boolean",
      description: "Whether the select is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether the select is required",
    },
  },
};

export default meta;

type Story = StoryObj<typeof MultiSelect>;

const fruitOptions = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Orange", value: "orange" },
  { label: "Grape", value: "grape" },
  { label: "Strawberry", value: "strawberry" },
];

export const CustomTriggerText: Story = {
  render: () => (
    <MultiSelect defaultValue={["apple", "orange"]}>
      <MultiSelectTrigger>
        <MultiSelectValue
          placeholder="Select fruits"
          showSelectedLabels={false}
          selectedText="Fruits"
        />
        <Icon name="chevron-down" size={16} className="opacity-50" />
      </MultiSelectTrigger>
      <MultiSelectContent width="trigger">
        <MultiSelectGroup>
          {fruitOptions.map((option) => (
            <MultiSelectItem
              key={option.value}
              value={option.value}
              label={option.label}
            >
              {option.label}
            </MultiSelectItem>
          ))}
        </MultiSelectGroup>
      </MultiSelectContent>
    </MultiSelect>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");

    // Check that the trigger text shows the custom text
    await expect(trigger).toHaveTextContent("Fruits: 2");
  },
};

export const Default: Story = {
  render: (args) => {
    return (
      <MultiSelect {...args}>
        <MultiSelectTrigger>
          <MultiSelectValue
            placeholder="Select fruits"
            showSelectedLabels={true}
            maxDisplayItems={2}
          />
          <Icon name="chevron-down" size={16} className="opacity-50" />
        </MultiSelectTrigger>
        <MultiSelectContent>
          <MultiSelectGroup>
            {fruitOptions.map((option) => (
              <MultiSelectItem
                key={option.value}
                value={option.value}
                label={option.label}
              >
                {option.label}
              </MultiSelectItem>
            ))}
          </MultiSelectGroup>
        </MultiSelectContent>
      </MultiSelect>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");

    await expect(trigger).toBeInTheDocument();

    await userEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });

    const appleOption = screen.getByRole("menuitemcheckbox", { name: "Apple" });
    await userEvent.click(appleOption);

    await expect(trigger).toHaveTextContent("Apple");
  },
};

export const Disabled: Story = {
  render: () => (
    <MultiSelect disabled>
      <MultiSelectTrigger>
        <MultiSelectValue placeholder="Disabled select" />
        <Icon name="chevron-down" size={16} className="opacity-50" />
      </MultiSelectTrigger>
      <MultiSelectContent>
        <MultiSelectGroup>
          {fruitOptions.map((option) => (
            <MultiSelectItem key={option.value} value={option.value}>
              {option.label}
            </MultiSelectItem>
          ))}
        </MultiSelectGroup>
      </MultiSelectContent>
    </MultiSelect>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");

    await expect(trigger).toBeDisabled();
  },
};

export const DisabledOptions: Story = {
  render: () => (
    <MultiSelect>
      <MultiSelectTrigger>
        <MultiSelectValue placeholder="Some options disabled" />
        <Icon name="chevron-down" size={16} className="opacity-50" />
      </MultiSelectTrigger>
      <MultiSelectContent>
        <MultiSelectGroup>
          <MultiSelectItem value="apple" label="Apple">
            Apple
          </MultiSelectItem>
          <MultiSelectItem value="banana" disabled label="Banana (Unavailable)">
            Banana (Unavailable)
          </MultiSelectItem>
          <MultiSelectItem value="orange" label="Orange">
            Orange
          </MultiSelectItem>
          <MultiSelectItem value="grape" disabled label="Grape (Unavailable)">
            Grape (Unavailable)
          </MultiSelectItem>
        </MultiSelectGroup>
      </MultiSelectContent>
    </MultiSelect>
  ),
};

export const Groups: Story = {
  render: () => (
    <MultiSelect>
      <MultiSelectTrigger>
        <MultiSelectValue placeholder="Select fruits or vegetables" />
        <Icon name="chevron-down" size={16} className="opacity-50" />
      </MultiSelectTrigger>
      <MultiSelectContent>
        <MultiSelectGroup>
          <MultiSelectLabel>Fruits</MultiSelectLabel>
          <MultiSelectItem value="apple" label="Apple">
            Apple
          </MultiSelectItem>
          <MultiSelectItem value="banana" label="Banana">
            Banana
          </MultiSelectItem>
          <MultiSelectItem value="orange" label="Orange">
            Orange
          </MultiSelectItem>
        </MultiSelectGroup>
        <MultiSelectSeparator />
        <MultiSelectGroup>
          <MultiSelectLabel>Vegetables</MultiSelectLabel>
          <MultiSelectItem value="carrot" label="Carrot">
            Carrot
          </MultiSelectItem>
          <MultiSelectItem value="broccoli" label="Broccoli">
            Broccoli
          </MultiSelectItem>
          <MultiSelectItem value="spinach" label="Spinach">
            Spinach
          </MultiSelectItem>
        </MultiSelectGroup>
      </MultiSelectContent>
    </MultiSelect>
  ),
};

export const Prefilled: Story = {
  render: () => {
    return (
      <MultiSelect defaultValue={["apple", "orange"]} options={fruitOptions}>
        <MultiSelectTrigger>
          <MultiSelectValue placeholder="Select fruits" />
          <Icon name="chevron-down" size={16} className="opacity-50" />
        </MultiSelectTrigger>
        <MultiSelectContent>
          <MultiSelectGroup>
            {fruitOptions.map((option) => (
              <MultiSelectItem
                key={option.value}
                value={option.value}
                label={option.label}
              >
                {option.label}
              </MultiSelectItem>
            ))}
          </MultiSelectGroup>
        </MultiSelectContent>
      </MultiSelect>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");

    // Check that the trigger text shows the correct count
    await expect(trigger).toHaveTextContent("Apple, Orange");
  },
};

export const SelectionDisplay: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="font-medium mb-2">Show Selected Items (Default)</h3>
          <MultiSelect
            defaultValue={["apple", "orange", "grape"]}
            options={fruitOptions}
          >
            <MultiSelectTrigger className="w-full">
              <MultiSelectValue
                placeholder="Select fruits"
                showSelectedLabels={true}
                maxDisplayItems={2}
              />
              <Icon name="chevron-down" size={16} className="opacity-50" />
            </MultiSelectTrigger>
            <MultiSelectContent width="trigger">
              <MultiSelectGroup>
                {fruitOptions.map((option) => (
                  <MultiSelectItem
                    key={option.value}
                    value={option.value}
                    label={option.label}
                  >
                    {option.label}
                  </MultiSelectItem>
                ))}
              </MultiSelectGroup>
            </MultiSelectContent>
          </MultiSelect>
          <p className="text-sm text-muted-foreground mt-1">
            Shows selected item labels with truncation
          </p>
        </div>

        <div>
          <h3 className="font-medium mb-2">Show More Items</h3>
          <MultiSelect
            defaultValue={["apple", "orange", "grape", "strawberry"]}
            options={fruitOptions}
          >
            <MultiSelectTrigger className="w-full">
              <MultiSelectValue
                placeholder="Select fruits"
                showSelectedLabels={true}
                maxDisplayItems={3}
              />
              <Icon name="chevron-down" size={16} className="opacity-50" />
            </MultiSelectTrigger>
            <MultiSelectContent width="trigger">
              <MultiSelectGroup>
                {fruitOptions.map((option) => (
                  <MultiSelectItem
                    key={option.value}
                    value={option.value}
                    label={option.label}
                  >
                    {option.label}
                  </MultiSelectItem>
                ))}
              </MultiSelectGroup>
            </MultiSelectContent>
          </MultiSelect>
          <p className="text-sm text-muted-foreground mt-1">
            Shows more selected items before truncating
          </p>
        </div>

        <div>
          <h3 className="font-medium mb-2">Count Only</h3>
          <MultiSelect
            defaultValue={["apple", "orange", "grape"]}
            options={fruitOptions}
          >
            <MultiSelectTrigger className="w-full">
              <MultiSelectValue
                placeholder="Select fruits"
                showSelectedLabels={false}
                selectedText="Selected"
              />
              <Icon name="chevron-down" size={16} className="opacity-50" />
            </MultiSelectTrigger>
            <MultiSelectContent width="trigger">
              <MultiSelectGroup>
                {fruitOptions.map((option) => (
                  <MultiSelectItem
                    key={option.value}
                    value={option.value}
                    label={option.label}
                  >
                    {option.label}
                  </MultiSelectItem>
                ))}
              </MultiSelectGroup>
            </MultiSelectContent>
          </MultiSelect>
          <p className="text-sm text-muted-foreground mt-1">
            Shows only the count of selected items
          </p>
        </div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-medium mb-2">Small</h3>
        <MultiSelect>
          <MultiSelectTrigger size="sm">
            <MultiSelectValue placeholder="Select fruits" />
            <Icon name="chevron-down" size={16} className="opacity-50" />
          </MultiSelectTrigger>
          <MultiSelectContent>
            <MultiSelectGroup>
              {fruitOptions.map((option) => (
                <MultiSelectItem
                  key={option.value}
                  value={option.value}
                  label={option.label}
                >
                  {option.label}
                </MultiSelectItem>
              ))}
            </MultiSelectGroup>
          </MultiSelectContent>
        </MultiSelect>
      </div>

      <div>
        <h3 className="font-medium mb-2">Medium (Default)</h3>
        <MultiSelect>
          <MultiSelectTrigger size="default">
            <MultiSelectValue placeholder="Select fruits" />
            <Icon name="chevron-down" size={16} className="opacity-50" />
          </MultiSelectTrigger>
          <MultiSelectContent>
            <MultiSelectGroup>
              {fruitOptions.map((option) => (
                <MultiSelectItem
                  key={option.value}
                  value={option.value}
                  label={option.label}
                >
                  {option.label}
                </MultiSelectItem>
              ))}
            </MultiSelectGroup>
          </MultiSelectContent>
        </MultiSelect>
      </div>

      <div>
        <h3 className="font-medium mb-2">Large</h3>
        <MultiSelect>
          <MultiSelectTrigger size="lg">
            <MultiSelectValue placeholder="Select fruits" />
            <Icon name="chevron-down" size={16} className="opacity-50" />
          </MultiSelectTrigger>
          <MultiSelectContent>
            <MultiSelectGroup>
              {fruitOptions.map((option) => (
                <MultiSelectItem
                  key={option.value}
                  value={option.value}
                  label={option.label}
                >
                  {option.label}
                </MultiSelectItem>
              ))}
            </MultiSelectGroup>
          </MultiSelectContent>
        </MultiSelect>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-medium mb-2">Default</h3>
        <MultiSelect>
          <MultiSelectTrigger>
            <MultiSelectValue placeholder="Select fruits" />
            <Icon name="chevron-down" size={16} className="opacity-50" />
          </MultiSelectTrigger>
          <MultiSelectContent>
            <MultiSelectGroup>
              {fruitOptions.map((option) => (
                <MultiSelectItem
                  key={option.value}
                  value={option.value}
                  label={option.label}
                >
                  {option.label}
                </MultiSelectItem>
              ))}
            </MultiSelectGroup>
          </MultiSelectContent>
        </MultiSelect>
      </div>

      <div>
        <h3 className="font-medium mb-2">Ghost</h3>
        <MultiSelect>
          <MultiSelectTrigger variant="ghost">
            <MultiSelectValue placeholder="Select fruits" />
            <Icon name="chevron-down" size={16} className="opacity-50" />
          </MultiSelectTrigger>
          <MultiSelectContent>
            <MultiSelectGroup>
              {fruitOptions.map((option) => (
                <MultiSelectItem
                  key={option.value}
                  value={option.value}
                  label={option.label}
                >
                  {option.label}
                </MultiSelectItem>
              ))}
            </MultiSelectGroup>
          </MultiSelectContent>
        </MultiSelect>
      </div>
    </div>
  ),
};

export const Widths: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-medium mb-2">Auto Width (Default)</h3>
        <MultiSelect>
          <MultiSelectTrigger>
            <MultiSelectValue placeholder="Select fruits" />
            <Icon name="chevron-down" size={16} className="opacity-50" />
          </MultiSelectTrigger>
          <MultiSelectContent>
            <MultiSelectGroup>
              {fruitOptions.map((option) => (
                <MultiSelectItem
                  key={option.value}
                  value={option.value}
                  label={option.label}
                >
                  {option.label}
                </MultiSelectItem>
              ))}
            </MultiSelectGroup>
          </MultiSelectContent>
        </MultiSelect>
      </div>

      <div>
        <h3 className="font-medium mb-2">Full Width</h3>
        <MultiSelect>
          <MultiSelectTrigger className="w-full">
            <MultiSelectValue placeholder="Select fruits" />
            <Icon name="chevron-down" size={16} className="opacity-50" />
          </MultiSelectTrigger>
          <MultiSelectContent width="trigger">
            <MultiSelectGroup>
              {fruitOptions.map((option) => (
                <MultiSelectItem
                  key={option.value}
                  value={option.value}
                  label={option.label}
                >
                  {option.label}
                </MultiSelectItem>
              ))}
            </MultiSelectGroup>
          </MultiSelectContent>
        </MultiSelect>
      </div>
    </div>
  ),
};

export const Descriptions: Story = {
  render: () => {
    // Define options for better reuse
    const frameworks = [
      {
        value: "react",
        label: "React",
        description: "A JavaScript library for building user interfaces",
      },
      {
        value: "vue",
        label: "Vue",
        description: "Progressive JavaScript framework for building UIs",
      },
      {
        value: "angular",
        label: "Angular",
        description:
          "Platform for building mobile and desktop web applications",
      },
      {
        value: "svelte",
        label: "Svelte",
        description: "Compiler that creates reactive components",
      },
    ];

    return (
      <div className="space-y-4">
        <MultiSelect>
          <MultiSelectTrigger className="w-full">
            <MultiSelectValue placeholder="Select with descriptions" />
            <Icon name="chevron-down" size={16} className="opacity-50" />
          </MultiSelectTrigger>
          <MultiSelectContent>
            <MultiSelectGroup>
              {frameworks.map((option) => (
                <MultiSelectItem
                  key={option.value}
                  value={option.value}
                  label={option.label}
                >
                  <div>
                    <span className="font-medium line-clamp-1">
                      {option.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {option.description}
                    </span>
                  </div>
                </MultiSelectItem>
              ))}
            </MultiSelectGroup>
          </MultiSelectContent>
        </MultiSelect>

        <p className="text-sm text-muted-foreground">
          Items with descriptions provide additional context about each option.
          Using the <code>label</code> prop ensures proper display in the
          trigger.
        </p>
      </div>
    );
  },
};

export const EmptyOptions: Story = {
  render: () => (
    <div className="max-w-sm space-y-4">
      <h3 className="text-sm font-medium">Empty state</h3>
      <MultiSelect>
        <MultiSelectTrigger className="w-full">
          <MultiSelectValue placeholder="No options available" />
          <Icon name="chevron-down" size={16} className="opacity-50" />
        </MultiSelectTrigger>
        <MultiSelectContent width="trigger">
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <Icon name="x-circle" size={24} className="text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              No options available
            </p>
          </div>
        </MultiSelectContent>
      </MultiSelect>
      <p className="text-sm text-muted-foreground">
        Custom empty state when no options are available
      </p>
    </div>
  ),
};
