import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import { useForm } from "react-hook-form";
import { Form } from "@/components/molecules/Form/Form";
import { FieldSelect } from "./FieldSelect";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/atoms/Button/Button";

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
  const schema = z.object({
    fruit: z.string().min(1, "Please select a fruit"),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      fruit: "",
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-[300px]"
      >
        <FieldSelect
          name="fruit"
          label="Favorite Fruit"
          options={fruitOptions}
          placeholder="Select a fruit"
          required
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function CustomLabelForm() {
  const form = useForm();
  return (
    <Form {...form}>
      <form className="space-y-4 w-[300px]">
        <FieldSelect
          name="fruit"
          label="Select Your Favorite Fruit"
          options={fruitOptions}
          placeholder="Choose an option"
        />
      </form>
    </Form>
  );
}

function DescriptionForm() {
  const form = useForm();
  return (
    <Form {...form}>
      <form className="space-y-4 w-[300px]">
        <FieldSelect
          name="fruit"
          label="Favorite Fruit"
          description="Choose your favorite fruit from the list"
          options={fruitOptions}
          placeholder="Select a fruit"
        />
      </form>
    </Form>
  );
}

function DisabledForm() {
  const form = useForm();
  return (
    <Form {...form}>
      <form className="space-y-4 w-[300px]">
        <FieldSelect
          name="fruit"
          label="Favorite Fruit"
          options={fruitOptions}
          placeholder="Select a fruit"
          disabled
        />
      </form>
    </Form>
  );
}

function PreselectedForm() {
  const form = useForm({
    defaultValues: {
      fruit: "banana",
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-4 w-[300px]">
        <FieldSelect
          name="fruit"
          label="Favorite Fruit"
          options={fruitOptions}
          placeholder="Select a fruit"
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
    const submitButton = canvas.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    // Check for validation error
    const error = canvas.getByText(/please select a fruit/i);
    await expect(error).toBeVisible();

    // Test selecting an option
    const select = canvas.getByRole("combobox");
    await userEvent.selectOptions(select, "apple");

    // Submit again
    await userEvent.click(submitButton);

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
    const select = canvas.getByRole("combobox");
    await expect(select).toBeDisabled();
  },
};

// Select field with preselected value
export const Preselected: Story = {
  render: () => <PreselectedForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check if "Banana" is selected
    const select = canvas.getByRole("combobox") as HTMLSelectElement;
    await expect(select.value).toBe("banana");
  },
};
