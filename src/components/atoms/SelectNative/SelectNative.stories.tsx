import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { SelectNative } from "./SelectNative";
import { Icon } from "@/components/atoms/Icon";

const meta: Meta<typeof SelectNative> = {
  component: SelectNative,
  tags: ["autodocs"],
  argTypes: {},
  play: async ({ canvasElement }) => {
    await expect(canvasElement).not.toBeEmptyDOMElement();
  },
};

export default meta;

type Story = StoryObj<typeof SelectNative>;

export const Default: Story = {
  render: (args) => (
    <SelectNative {...args}>
      <option value="">Select an option</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </SelectNative>
  ),
  args: {
    defaultValue: "",
  },
  parameters: {
    docs: {
      description: {
        story: "Basic native select with multiple options.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");
    await expect(select).toBeInTheDocument();
  },
};

export const WithGroups: Story = {
  render: (args) => (
    <SelectNative {...args}>
      <option value="">Select a fruit or vegetable</option>
      <optgroup label="Fruits">
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="orange">Orange</option>
      </optgroup>
      <optgroup label="Vegetables">
        <option value="carrot">Carrot</option>
        <option value="broccoli">Broccoli</option>
        <option value="spinach">Spinach</option>
      </optgroup>
    </SelectNative>
  ),
  args: {
    defaultValue: "",
  },
  parameters: {
    docs: {
      description: {
        story: "Native select with option groups categorizing the choices.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");
    await expect(select).toBeInTheDocument();

    await userEvent.selectOptions(select, "banana");
    expect(select).toHaveValue("banana");
  },
};

export const Multiple: Story = {
  render: (args) => (
    <SelectNative {...args} multiple size={4}>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
      <option value="option4">Option 4</option>
      <option value="option5">Option 5</option>
    </SelectNative>
  ),
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Multiple selection enabled select allowing to pick multiple options.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("listbox") as HTMLSelectElement;
    await expect(select).toBeInTheDocument();

    await userEvent.selectOptions(select, ["option1", "option3"]);
    const selectedOptions = Array.from(select.selectedOptions).map(
      (option: HTMLOptionElement) => option.value,
    );
    expect(selectedOptions).toContain("option1");
    expect(selectedOptions).toContain("option3");
  },
};

export const CustomIcon: Story = {
  render: (args) => (
    <SelectNative
      {...args}
      icon={<Icon name="chevron-down-circle" className="text-primary" />}
    >
      <option value="">Select with custom icon</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </SelectNative>
  ),
  args: {
    defaultValue: "",
  },
  parameters: {
    docs: {
      description: {
        story: "Select with a custom icon replacing the default chevron.",
      },
    },
  },
};

export const Disabled: Story = {
  render: (args) => (
    <SelectNative {...args} disabled>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </SelectNative>
  ),
  args: {
    defaultValue: "option1",
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled select that cannot be interacted with.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");
    await expect(select).toBeInTheDocument();
    expect(select).toBeDisabled();
  },
};

export const WithDisabledOptions: Story = {
  render: (args) => (
    <SelectNative {...args}>
      <option value="option1">Option 1</option>
      <option value="option2" disabled>
        Option 2 (Unavailable)
      </option>
      <option value="option3">Option 3</option>
    </SelectNative>
  ),
  args: {
    defaultValue: "option1",
  },
  parameters: {
    docs: {
      description: {
        story: "Select with some disabled options that cannot be selected.",
      },
    },
  },
};
