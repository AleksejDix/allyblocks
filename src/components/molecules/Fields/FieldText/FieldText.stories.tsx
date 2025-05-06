import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/molecules/Form/Form";
import { FieldText } from "./FieldText";
import { Button } from "@/components/atoms/Button/Button";

const meta: Meta<typeof FieldText> = {
  component: FieldText,
  parameters: {},
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
  },
};

export default meta;
type Story = StoryObj<typeof FieldText>;

type TextFormValues = {
  text: string;
};

function BasicTextForm() {
  const form = useForm<TextFormValues>({
    defaultValues: {
      text: "",
    },
  });

  function onSubmit(values: TextFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldText name="text" label="Text Input" />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function PlaceholderForm() {
  const form = useForm<TextFormValues>();

  function onSubmit(values: TextFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldText
          name="text"
          label="Text Input"
          placeholder="Enter text here"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function DescriptionForm() {
  const form = useForm<TextFormValues>();

  function onSubmit(values: TextFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldText
          name="text"
          label="Text Input"
          description="Enter your text in the field above"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function RequiredForm() {
  const form = useForm<TextFormValues>();

  function onSubmit(values: TextFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldText name="text" label="Text Input" required />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function DisabledForm() {
  const form = useForm<TextFormValues>({
    defaultValues: {
      text: "This field is disabled",
    },
  });

  function onSubmit(values: TextFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldText name="text" label="Text Input" disabled />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function ErrorForm() {
  const schema = z.object({
    text: z.string().min(8, "Text must be at least 8 characters"),
  });

  const form = useForm<TextFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      text: "",
    },
  });

  function onSubmit(values: TextFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldText
          name="text"
          label="Text Input"
          placeholder="Type to see validation error"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

// Basic text field
export const Default: Story = {
  render: () => <BasicTextForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test empty submission
    const input = canvas.getByLabelText(/text input/i);
    await userEvent.click(input);
    await userEvent.tab();

    // Submit the form
    const submitButton = canvas.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    // Test valid input
    await userEvent.type(input, "Sample text");
    await userEvent.tab();
  },
};

// Text field with placeholder
export const WithPlaceholder: Story = {
  render: () => <PlaceholderForm />,
};

// Text field with description
export const WithDescription: Story = {
  render: () => <DescriptionForm />,
};

// Required text field
export const Required: Story = {
  render: () => <RequiredForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test empty submission
    const input = canvas.getByLabelText(/text input \*/i);
    await userEvent.click(input);
    await userEvent.tab();

    // Check for required error
    const error = canvas.getByText(/field is required/i);
    await expect(error).toBeVisible();

    // Test valid input
    await userEvent.type(input, "Sample text");
    await userEvent.tab();

    // Verify no error messages
    await expect(error).not.toBeVisible();
  },
};

// Text field with validation error
export const WithError: Story = {
  render: () => <ErrorForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get the input
    const input = canvas.getByLabelText(/text input/i);

    // Type text that's too short (less than 8 characters)
    await userEvent.type(input, "short");
    await userEvent.tab();

    // Check for validation error
    const error = canvas.getByText(/text must be at least 8 characters/i);
    await expect(error).toBeVisible();

    // Clear and type valid text
    await userEvent.clear(input);
    await userEvent.type(input, "this is long enough");
    await userEvent.tab();

    // Verify error is gone
    await expect(error).not.toBeVisible();
  },
};

// Disabled text field
export const Disabled: Story = {
  render: () => <DisabledForm />,
};
