import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import { useForm } from "react-hook-form";
import { Form } from "@/components/molecules/Form/Form";
import { FieldPassword } from "./FieldPassword";
import { Button } from "@/components/atoms/Button/Button";

const meta: Meta<typeof FieldPassword> = {
  component: FieldPassword,
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
    showStrength: {
      control: "boolean",
      description: "Whether to show password strength indicator",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FieldPassword>;

type PasswordFormValues = {
  password: string;
};

function PasswordForm() {
  const form = useForm<PasswordFormValues>({
    defaultValues: {
      password: "",
    },
  });

  function onSubmit(values: PasswordFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldPassword name="password" />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function CustomLabelForm() {
  const form = useForm<PasswordFormValues>();

  function onSubmit(values: PasswordFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldPassword name="password" label="Create Password" />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function DescriptionForm() {
  const form = useForm<PasswordFormValues>();

  function onSubmit(values: PasswordFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldPassword
          name="password"
          description="Use a strong password with at least 8 characters, including uppercase, lowercase, numbers, and special characters."
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function StrengthIndicatorForm() {
  const form = useForm<PasswordFormValues>();

  function onSubmit(values: PasswordFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldPassword name="password" showStrength />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function OptionalForm() {
  const form = useForm<PasswordFormValues>();

  function onSubmit(values: PasswordFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldPassword name="password" required={false} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

// Basic password field
export const Default: Story = {
  render: () => <PasswordForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test empty submission
    const input = canvas.getByLabelText(/password/i);
    await userEvent.click(input);
    await userEvent.tab();

    // Check for required error
    const error = canvas.getByText(/password is required/i);
    await expect(error).toBeVisible();

    // Test invalid password (too short)
    await userEvent.type(input, "short");
    await userEvent.tab();

    // Check for length error
    const lengthError = canvas.getByText(
      /password must be at least 8 characters/i,
    );
    await expect(lengthError).toBeVisible();

    // Test invalid password (missing requirements)
    await userEvent.clear(input);
    await userEvent.type(input, "password123");
    await userEvent.tab();

    // Check for pattern error
    const patternError = canvas.getByText(
      /password must contain at least one uppercase letter/i,
    );
    await expect(patternError).toBeVisible();

    // Test valid password
    await userEvent.clear(input);
    await userEvent.type(input, "Password123!");
    await userEvent.tab();

    // Verify no error messages
    await expect(error).not.toBeVisible();
    await expect(lengthError).not.toBeVisible();
    await expect(patternError).not.toBeVisible();
  },
};

// Password field with custom label
export const WithCustomLabel: Story = {
  render: () => <CustomLabelForm />,
};

// Password field with description
export const WithDescription: Story = {
  render: () => <DescriptionForm />,
};

// Password field with strength indicator
export const WithStrengthIndicator: Story = {
  render: () => <StrengthIndicatorForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test password strength indicator
    const input = canvas.getByLabelText(/password/i);

    // Type a weak password
    await userEvent.type(input, "password");
    const weakText = canvas.getByText(/weak/i);
    await expect(weakText).toBeVisible();

    // Type a medium password
    await userEvent.clear(input);
    await userEvent.type(input, "Password123");
    const mediumText = canvas.getByText(/medium/i);
    await expect(mediumText).toBeVisible();

    // Type a strong password
    await userEvent.clear(input);
    await userEvent.type(input, "Password123!");
    const strongText = canvas.getByText(/strong/i);
    await expect(strongText).toBeVisible();
  },
};

// Optional password field
export const Optional: Story = {
  render: () => <OptionalForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test empty submission
    const input = canvas.getByLabelText(/password/i);
    await userEvent.click(input);
    await userEvent.tab();

    // Verify no required error
    const error = canvas.queryByText(/password is required/i);
    await expect(error).not.toBeInTheDocument();

    // Test invalid password
    await userEvent.type(input, "short");
    await userEvent.tab();

    // Check for length error
    const lengthError = canvas.getByText(
      /password must be at least 8 characters/i,
    );
    await expect(lengthError).toBeVisible();
  },
};
