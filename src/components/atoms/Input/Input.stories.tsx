import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";
import { userEvent } from "@storybook/test";
import { InputSize } from "./Input.types";
import { Button } from "../Button";

import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  component: Input,
  parameters: {
    nuqs: {
      disabled: true,
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the input",
    },
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

// Size variants
export const SmallSize: Story = {
  args: {
    placeholder: "Small input",
    size: "sm" as InputSize,
  },
  parameters: {
    docs: {
      description: {
        story: "Small sized input.",
      },
    },
  },
};

export const MediumSize: Story = {
  args: {
    placeholder: "Medium input (default)",
    size: "md" as InputSize,
  },
  parameters: {
    docs: {
      description: {
        story: "Medium sized input (default).",
      },
    },
  },
};

export const LargeSize: Story = {
  args: {
    placeholder: "Large input",
    size: "lg" as InputSize,
  },
  parameters: {
    docs: {
      description: {
        story: "Large sized input.",
      },
    },
  },
};

// Input with Button combinations
export const EmailSubscriptionLayouts: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[600px] max-w-full">
      <div>
        <h3 className="text-sm font-medium mb-3">Small Size</h3>
        <div className="">
          <Input
            placeholder="Enter email..."
            size="sm"
            className="flex-1"
            type="email"
          />
          <Button size="sm">Subscribe</Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Medium Size (Default)</h3>
        <div className="">
          <Input
            placeholder="Enter email..."
            size="md"
            className="flex-1"
            type="email"
          />
          <Button size="default">Subscribe</Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Large Size</h3>
        <div className="">
          <Input
            placeholder="Enter email..."
            size="lg"
            className="flex-1"
            type="email"
          />
          <Button size="lg">Subscribe</Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Stacked Layout</h3>
        <div className="space-y-2 max-w-md">
          <Input
            placeholder="Enter email..."
            size="md"
            className="w-full"
            type="email"
          />
          <Button className="w-full">Subscribe</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Email subscription layouts with matching input and button sizes.",
      },
    },
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
    className: "border-2 border-green-500 rounded-none",
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
