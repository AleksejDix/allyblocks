import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import { useForm } from "react-hook-form";
import { Form } from "@/components/molecules/Form/Form";
import { FieldOTP } from "./FieldOTP";

const meta: Meta<typeof FieldOTP> = {
  component: FieldOTP,
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
    disabled: {
      control: "boolean",
      description: "Whether the field is disabled",
    },
    maxLength: {
      control: "number",
      description: "Maximum length of the OTP",
    },
    pattern: {
      control: "text",
      description: "Regex pattern for allowed characters",
    },
    showSeparator: {
      control: "boolean",
      description: "Whether to show the separator",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FieldOTP>;

function OTPForm() {
  const form = useForm({
    defaultValues: {
      otp: "",
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-4">
        <FieldOTP
          name="otp"
          label="Verification Code"
          description="Enter the 6-digit code sent to your phone"
          required
        />
      </form>
    </Form>
  );
}

function FourDigitForm() {
  const form = useForm();
  return (
    <Form {...form}>
      <form className="space-y-4">
        <FieldOTP
          name="pin"
          label="PIN Code"
          maxLength={4}
          showSeparator={false}
          description="Enter your 4-digit PIN"
          required
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
        <FieldOTP name="otp" label="Verification Code" disabled />
      </form>
    </Form>
  );
}

function OptionalForm() {
  const form = useForm();
  return (
    <Form {...form}>
      <form className="space-y-4">
        <FieldOTP
          name="otp"
          label="Backup Code"
          description="Enter your backup code (optional)"
          required={false}
        />
      </form>
    </Form>
  );
}

// Default 6-digit OTP field
export const Default: Story = {
  render: () => <OTPForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test empty submission
    await userEvent.tab();
    await userEvent.tab();

    // Check for required error
    const error = canvas.getByText(/verification code is required/i);
    await expect(error).toBeVisible();

    // Test entering valid input
    const input = canvas.getByRole("textbox");
    await userEvent.type(input, "123456");

    // Verify no error message
    await expect(error).not.toBeVisible();
  },
};

// 4-digit PIN field without separator
export const FourDigitPin: Story = {
  render: () => <FourDigitForm />,
};

// Disabled OTP field
export const Disabled: Story = {
  render: () => <DisabledForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");
    await expect(input).toBeDisabled();
  },
};

// Optional OTP field
export const Optional: Story = {
  render: () => <OptionalForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await userEvent.tab();

    // Verify no required error
    const error = canvas.queryByText(/is required/i);
    await expect(error).not.toBeInTheDocument();
  },
};
