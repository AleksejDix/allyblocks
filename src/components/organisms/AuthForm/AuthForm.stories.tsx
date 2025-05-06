import type { Meta, StoryObj } from "@storybook/react";
import { AuthForm } from "./AuthForm";
import { userEvent, within, expect } from "@storybook/test";

const meta = {
  component: AuthForm,
  parameters: {
    docs: {
      description: {
        component:
          "A flexible authentication form component that handles both login and signup flows with built-in validation and accessibility features.",
      },
    },
  },
  argTypes: {
    mode: {
      control: "radio",
      options: ["login", "signup"],
      description: "The form mode - either login or signup",
    },
    onSubmit: {
      description:
        "Callback function called when the form is submitted successfully",
    },
    onError: {
      description:
        "Callback function called when an error occurs during submission",
    },
    defaultValues: {
      description: "Default values for the form fields",
      control: "object",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AuthForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Login: Story = {
  args: {
    mode: "login",
    onSubmit: async (data) => {
      console.log("Login data:", data);
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
    defaultValues: {
      email: "",
      password: "",
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    // Test form validation
    await step("Submit empty form", async () => {
      const submitButton = canvas.getByRole("button");
      await userEvent.click(submitButton);

      // Expect validation errors
      const emailError = await canvas.findByText(/valid email/i);
      const passwordError = await canvas.findByText(/at least 8 characters/i);
      expect(emailError).toBeInTheDocument();
      expect(passwordError).toBeInTheDocument();
    });

    // Test valid submission
    await step("Submit valid form", async () => {
      const emailInput = canvas.getByLabelText(/email/i);
      const passwordInput = canvas.getByLabelText(/password/i);
      const submitButton = canvas.getByRole("button");

      await userEvent.type(emailInput, "test@example.com");
      await userEvent.type(passwordInput, "password123");
      await userEvent.click(submitButton);
    });
  },
};

export const Signup: Story = {
  args: {
    mode: "signup",
    onSubmit: async (data) => {
      console.log("Signup data:", data);
    },
    onError: (error) => {
      console.error("Signup error:", error);
    },
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    // Test password match validation
    await step("Test password mismatch", async () => {
      const emailInput = canvas.getByLabelText(/email/i);
      const passwordInput = canvas.getByLabelText(/^password/i);
      const confirmPasswordInput = canvas.getByLabelText(/confirm password/i);
      const submitButton = canvas.getByRole("button");

      await userEvent.type(emailInput, "test@example.com");
      await userEvent.type(passwordInput, "password123");
      await userEvent.type(confirmPasswordInput, "password456");
      await userEvent.click(submitButton);

      const mismatchError = await canvas.findByText(/passwords don't match/i);
      expect(mismatchError).toBeInTheDocument();
    });

    // Test valid submission
    await step("Submit valid form", async () => {
      const emailInput = canvas.getByLabelText(/email/i);
      const passwordInput = canvas.getByLabelText(/^password/i);
      const confirmPasswordInput = canvas.getByLabelText(/confirm password/i);
      const submitButton = canvas.getByRole("button");

      await userEvent.clear(emailInput);
      await userEvent.clear(passwordInput);
      await userEvent.clear(confirmPasswordInput);

      await userEvent.type(emailInput, "test@example.com");
      await userEvent.type(passwordInput, "password123");
      await userEvent.type(confirmPasswordInput, "password123");
      await userEvent.click(submitButton);
    });
  },
};

export const WithPrefilledValues: Story = {
  args: {
    mode: "login",
    onSubmit: async (data) => {
      console.log("Login data:", data);
    },
    defaultValues: {
      email: "user@example.com",
      password: "",
    },
  },
};
