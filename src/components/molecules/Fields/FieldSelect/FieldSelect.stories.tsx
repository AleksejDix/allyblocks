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
    actions: { argTypesRegex: "^on.*" },
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
    fruit: z.string(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      fruit: "",
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-4" noValidate>
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

function WithPlaceholderForm() {
  const schema = z.object({
    city: z.string().min(1, "Please select a city"),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      city: "",
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values);
  }

  const cityOptions = [
    { value: "new-york", label: "New York" },
    { value: "san-francisco", label: "San Francisco" },
    { value: "london", label: "London" },
    { value: "tokyo", label: "Tokyo" },
    { value: "paris", label: "Paris" },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-[300px]"
        noValidate
      >
        <FieldSelect
          name="city"
          label="Select Your City"
          options={cityOptions}
          placeholder="Where are you located?"
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
      <form className="space-y-4 w-[300px]" noValidate>
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
      <form className="space-y-4 w-[300px]" noValidate>
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
      <form className="space-y-4 w-[300px]" noValidate>
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
      <form className="space-y-4 w-[300px]" noValidate>
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

export const Default: Story = {
  render: () => <SelectForm />,
};

// Select field with placeholder
export const WithPlaceholder: Story = {
  render: () => <WithPlaceholderForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check placeholder is visible
    const placeholder = canvas.getByText(/where are you located\?/i);
    await expect(placeholder).toBeVisible();

    // Open the select
    const select = canvas.getByRole("combobox");
    await userEvent.click(select);

    // Verify options are available
    await expect(canvas.getByText("New York")).toBeVisible();
    await expect(canvas.getByText("Tokyo")).toBeVisible();

    // Select an option
    const option = canvas.getByText("Paris");
    await userEvent.click(option);

    // Verify the placeholder is replaced by the selection
    await expect(canvas.getByText("Paris")).toBeVisible();
    await expect(placeholder).not.toBeInTheDocument();
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
    await expect(canvas.getByText("Banana")).toBeVisible();
  },
};
