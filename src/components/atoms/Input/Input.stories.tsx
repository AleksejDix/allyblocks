import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";
import { userEvent } from "@storybook/test";

import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  // Global play function for all input stories
  play: async ({ canvasElement }) => {
    // Verify the component renders something
    await expect(canvasElement).not.toBeEmptyDOMElement();
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const RendersTextInput: Story = {
  args: {
    placeholder: "Enter text...",
  },
  parameters: {
    docs: {
      description: {
        story: "Default text input with placeholder.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Enter text...");

    // Test typing behavior
    await userEvent.type(input, "Hello, world!");
    await expect(input).toHaveValue("Hello, world!");
  },
};

export const SupportsEmailType: Story = {
  args: {
    type: "email",
    placeholder: "email@example.com",
  },
  parameters: {
    docs: {
      description: {
        story: "Email input with appropriate keyboard on mobile devices.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("email@example.com");
    await expect(input).toHaveAttribute("type", "email");
  },
};

export const SupportsPasswordType: Story = {
  args: {
    type: "password",
    placeholder: "Enter password...",
  },
  parameters: {
    docs: {
      description: {
        story: "Password input that masks the entered text.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Enter password...");
    await expect(input).toHaveAttribute("type", "password");
  },
};

export const SupportsNumberType: Story = {
  args: {
    type: "number",
    placeholder: "0",
    min: 0,
    max: 100,
  },
  parameters: {
    docs: {
      description: {
        story: "Numeric input with min and max constraints.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("0");
    await expect(input).toHaveAttribute("type", "number");
  },
};

export const HandlesDisabledState: Story = {
  args: {
    placeholder: "This input is disabled",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled input that cannot be interacted with.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("This input is disabled");
    await expect(input).toBeDisabled();
  },
};

export const SupportsInvalidState: Story = {
  args: {
    placeholder: "Invalid input",
    "aria-invalid": true,
  },
  parameters: {
    docs: {
      description: {
        story: "Input in an error state, indicated by red outline.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Invalid input");
    await expect(input).toHaveAttribute("aria-invalid", "true");
  },
};

export const SupportsCustomClasses: Story = {
  args: {
    placeholder: "Custom styled input",
    className: "border-2 border-primary",
  },
  parameters: {
    docs: {
      description: {
        story: "Input with custom styling applied through className.",
      },
    },
  },
  // No play function needed - just visual verification
};
