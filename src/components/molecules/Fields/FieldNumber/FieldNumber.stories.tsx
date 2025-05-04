import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/molecules/Form/Form";
import { FieldNumber } from "./FieldNumber";
import { Button } from "@/components/atoms/Button/Button";

const meta: Meta<typeof FieldNumber> = {
  component: FieldNumber,
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
    step: {
      control: "number",
      description: "Step increment value",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FieldNumber>;

type NumberFormValues = {
  number: number;
};

function BasicNumberForm() {
  const form = useForm<NumberFormValues>({
    defaultValues: {
      number: 0,
    },
  });

  function onSubmit(values: NumberFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldNumber name="number" label="Number Input" />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function PlaceholderForm() {
  const form = useForm<NumberFormValues>();

  function onSubmit(values: NumberFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldNumber
          name="number"
          label="Number Input"
          placeholder="Enter a number"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function MinMaxForm() {
  const schema = z.object({
    number: z
      .number()
      .min(1, "Number must be at least 1")
      .max(10, "Number must be at most 10"),
  });

  const form = useForm<NumberFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function onSubmit(values: NumberFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldNumber
          name="number"
          label="Number Input (1-10)"
          min={1}
          max={10}
          description="Please enter a number between 1 and 10"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function StepForm() {
  const schema = z.object({
    number: z.number().refine((val) => val % 0.5 === 0, {
      message: "Value must be a multiple of 0.5",
    }),
  });

  const form = useForm<NumberFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      number: 0,
    },
  });

  function onSubmit(values: NumberFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldNumber
          name="number"
          label="Number Input (step 0.5)"
          step={0.5}
          description="Use the arrows to increment by 0.5"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function RequiredForm() {
  const schema = z.object({
    number: z.number({
      required_error: "This field is required",
      invalid_type_error: "Please enter a valid number",
    }),
  });

  const form = useForm<NumberFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function onSubmit(values: NumberFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldNumber name="number" label="Number Input" required />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function DisabledForm() {
  const form = useForm<NumberFormValues>({
    defaultValues: {
      number: 42,
    },
  });

  function onSubmit(values: NumberFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldNumber name="number" label="Number Input" disabled />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function ErrorForm() {
  const schema = z.object({
    number: z
      .number()
      .min(10, "Number must be at least 10")
      .max(100, "Number must be at most 100"),
  });

  const form = useForm<NumberFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      number: 0,
    },
  });

  function onSubmit(values: NumberFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldNumber
          name="number"
          label="Number Input"
          placeholder="Enter a number between 10-100"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

// Basic number field
export const Default: Story = {
  render: () => <BasicNumberForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the input
    const input = canvas.getByLabelText(/number input/i);

    // Change the value
    await userEvent.clear(input);
    await userEvent.type(input, "42");
    await userEvent.tab();
  },
};

// Number field with placeholder
export const WithPlaceholder: Story = {
  render: () => <PlaceholderForm />,
};

// Number field with min and max values
export const WithMinMax: Story = {
  render: () => <MinMaxForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the input
    const input = canvas.getByLabelText(/number input/i);

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

// Number field with step
export const WithStep: Story = {
  render: () => <StepForm />,
};

// Required number field
export const Required: Story = {
  render: () => <RequiredForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test empty submission
    const input = canvas.getByLabelText(/number input \*/i);
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

// Number field with validation error
export const WithError: Story = {
  render: () => <ErrorForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the input
    const input = canvas.getByLabelText(/number input/i);

    // Enter a value below the minimum
    await userEvent.clear(input);
    await userEvent.type(input, "5");
    await userEvent.tab();

    // Check for validation error
    const error = canvas.getByText(/number must be at least 10/i);
    await expect(error).toBeVisible();

    // Enter a value above the maximum
    await userEvent.clear(input);
    await userEvent.type(input, "101");
    await userEvent.tab();

    // Check for validation error
    const maxError = canvas.getByText(/number must be at most 100/i);
    await expect(maxError).toBeVisible();

    // Enter a valid value
    await userEvent.clear(input);
    await userEvent.type(input, "50");
    await userEvent.tab();

    // Verify error is gone
    await expect(error).not.toBeInTheDocument();
  },
};

// Disabled number field
export const Disabled: Story = {
  render: () => <DisabledForm />,
};
