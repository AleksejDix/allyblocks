import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/molecules/Form/Form";
import { FieldInteger } from "./FieldInteger";
import { Button } from "@/components/atoms/Button/Button";

const meta: Meta<typeof FieldInteger> = {
  component: FieldInteger,
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
      description: "Placeholder text for the input",
    },
    min: {
      control: "number",
      description: "Minimum allowed value",
    },
    max: {
      control: "number",
      description: "Maximum allowed value",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FieldInteger>;

type IntegerFormValues = {
  integer: number;
};

function BasicIntegerForm() {
  const form = useForm<IntegerFormValues>({
    defaultValues: {
      integer: 0,
    },
  });

  function onSubmit(values: IntegerFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldInteger name="integer" label="Integer Input" />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function PlaceholderForm() {
  const form = useForm<IntegerFormValues>();

  function onSubmit(values: IntegerFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldInteger
          name="integer"
          label="Integer Input"
          placeholder="Enter an integer"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function MinMaxForm() {
  const schema = z.object({
    integer: z
      .number()
      .int("Value must be an integer")
      .min(1, "Integer must be at least 1")
      .max(10, "Integer must be at most 10"),
  });

  const form = useForm<IntegerFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function onSubmit(values: IntegerFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldInteger
          name="integer"
          label="Integer Input (1-10)"
          min={1}
          max={10}
          description="Please enter an integer between 1 and 10"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function RequiredForm() {
  const schema = z.object({
    integer: z
      .number({
        required_error: "This field is required",
        invalid_type_error: "Please enter a valid integer",
      })
      .int("Value must be an integer"),
  });

  const form = useForm<IntegerFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function onSubmit(values: IntegerFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldInteger name="integer" label="Integer Input" required />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function DisabledForm() {
  const form = useForm<IntegerFormValues>({
    defaultValues: {
      integer: 42,
    },
  });

  function onSubmit(values: IntegerFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldInteger name="integer" label="Integer Input" disabled />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function ErrorForm() {
  const schema = z.object({
    integer: z
      .number()
      .int("Value must be an integer")
      .min(10, "Integer must be at least 10")
      .max(100, "Integer must be at most 100"),
  });

  const form = useForm<IntegerFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      integer: 0,
    },
  });

  function onSubmit(values: IntegerFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldInteger
          name="integer"
          label="Integer Input"
          placeholder="Enter an integer between 10-100"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

// Basic integer field
export const Default: Story = {
  render: () => <BasicIntegerForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the input
    const input = canvas.getByLabelText(/integer input/i);

    // Change the value
    await userEvent.clear(input);
    await userEvent.type(input, "42");
    await userEvent.tab();
  },
};

// Integer field with placeholder
export const WithPlaceholder: Story = {
  render: () => <PlaceholderForm />,
};

// Integer field with min and max values
export const WithMinMax: Story = {
  render: () => <MinMaxForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the input
    const input = canvas.getByLabelText(/integer input/i);

    // Test entering a value below the minimum
    await userEvent.clear(input);
    await userEvent.type(input, "0");
    await userEvent.tab();

    // Test entering a value above the maximum
    await userEvent.clear(input);
    await userEvent.type(input, "11");
    await userEvent.tab();

    // Test entering a valid value
    await userEvent.clear(input);
    await userEvent.type(input, "5");
    await userEvent.tab();
  },
};

// Required integer field
export const Required: Story = {
  render: () => <RequiredForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test empty submission
    const input = canvas.getByLabelText(/integer input \*/i);
    await userEvent.click(input);
    await userEvent.tab();

    // Check for required error
    const error = canvas.getByText(/field is required/i);
    await expect(error).toBeVisible();

    // Test valid input
    await userEvent.type(input, "42");
    await userEvent.tab();

    // Verify no error messages
    await expect(error).not.toBeVisible();
  },
};

// Integer field with validation error
export const WithError: Story = {
  render: () => <ErrorForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the input
    const input = canvas.getByLabelText(/integer input/i);

    // Enter a value below the minimum
    await userEvent.clear(input);
    await userEvent.type(input, "5");
    await userEvent.tab();

    // Check for validation error
    const error = canvas.getByText(/integer must be at least 10/i);
    await expect(error).toBeVisible();

    // Enter a value above the maximum
    await userEvent.clear(input);
    await userEvent.type(input, "101");
    await userEvent.tab();

    // Check for validation error
    const maxError = canvas.getByText(/integer must be at most 100/i);
    await expect(maxError).toBeVisible();

    // Enter a valid value
    await userEvent.clear(input);
    await userEvent.type(input, "50");
    await userEvent.tab();

    // Verify error is gone
    await expect(error).not.toBeInTheDocument();
  },
};

// Disabled integer field
export const Disabled: Story = {
  render: () => <DisabledForm />,
};
