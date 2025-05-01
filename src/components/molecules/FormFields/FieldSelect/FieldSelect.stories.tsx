import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import { useForm } from "react-hook-form";
import { Form } from "@/components/molecules/Form/Form";
import { FieldSelect } from "./FieldSelect";

const meta: Meta<typeof FieldSelect> = {
  component: FieldSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "text",
      description: "The name of the field",
    },
    label: {
      control: "text",
      description: "The label text for the field",
    },
    description: {
      control: "text",
      description: "Optional description text",
    },
    required: {
      control: "boolean",
      description: "Whether the field is required",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no option is selected",
    },
    disabled: {
      control: "boolean",
      description: "Whether the field is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FieldSelect>;

const fruitOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape" },
  { value: "strawberry", label: "Strawberry" },
];

function SelectForm() {
  const form = useForm({
    defaultValues: {
      fruit: "",
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-4">
        <FieldSelect
          name="fruit"
          label="Favorite Fruit"
          options={fruitOptions}
          required
        />
      </form>
    </Form>
  );
}

function CustomLabelForm() {
  const form = useForm();
  return (
    <Form {...form}>
      <form className="space-y-4">
        <FieldSelect
          name="fruit"
          label="Select Your Favorite Fruit"
          options={fruitOptions}
        />
      </form>
    </Form>
  );
}

function DescriptionForm() {
  const form = useForm();
  return (
    <Form {...form}>
      <form className="space-y-4">
        <FieldSelect
          name="fruit"
          label="Favorite Fruit"
          description="Choose your favorite fruit from the list"
          options={fruitOptions}
        />
      </form>
    </Form>
  );
}

function DisabledForm() {
  const form = useForm();
  return (
    <Form {...form}>
      <form className="space-y-4">
        <FieldSelect
          name="fruit"
          label="Favorite Fruit"
          options={fruitOptions}
          disabled
        />
      </form>
    </Form>
  );
}

function OptionalForm() {
  const form = useForm();
  return (
    <Form {...form}>
      <form className="space-y-4">
        <FieldSelect
          name="fruit"
          label="Favorite Fruit"
          options={fruitOptions}
          required={false}
        />
      </form>
    </Form>
  );
}

// Basic select field
export const Default: Story = {
  render: () => <SelectForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test empty submission
    const trigger = canvas.getByRole("combobox");
    await userEvent.click(trigger);
    await userEvent.tab();

    // Check for required error
    const error = canvas.getByText(/favorite fruit is required/i);
    await expect(error).toBeVisible();

    // Test selecting an option
    await userEvent.click(trigger);
    const option = canvas.getByText("Apple");
    await userEvent.click(option);

    // Verify no error message
    await expect(error).not.toBeVisible();
  },
};

// Select field with custom label
export const WithCustomLabel: Story = {
  render: () => <CustomLabelForm />,
};

// Select field with description
export const WithDescription: Story = {
  render: () => <DescriptionForm />,
};

// Disabled select field
export const Disabled: Story = {
  render: () => <DisabledForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test disabled state
    const trigger = canvas.getByRole("combobox");
    await expect(trigger).toBeDisabled();
  },
};

// Optional select field
export const Optional: Story = {
  render: () => <OptionalForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test empty submission
    const trigger = canvas.getByRole("combobox");
    await userEvent.click(trigger);
    await userEvent.tab();

    // Verify no required error
    const error = canvas.queryByText(/favorite fruit is required/i);
    await expect(error).not.toBeInTheDocument();
  },
};
