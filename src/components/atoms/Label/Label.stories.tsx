import type { Meta, StoryObj } from "@storybook/react";
import { expect, within, userEvent } from "@storybook/test";
import { Label } from "./Label";
import { Input } from "../Input/Input";
import { Checkbox } from "../Checkbox/Checkbox";

const meta: Meta<typeof Label> = {
  component: Label,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A form label component with accessibility features.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
    },
    htmlFor: {
      control: "text",
      description: "Associates the label with a form control using its ID",
    },
    asChild: {
      control: "boolean",
      description: "When true, component will render as its child element",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
  // Global play function for all label stories
  play: async ({ canvasElement }) => {
    // Verify the component renders something
    await expect(canvasElement).not.toBeEmptyDOMElement();
  },
};
export default meta;

type Story = StoryObj<typeof Label>;

export const RendersTextContent: Story = {
  args: {
    children: "Email address",
  },
  parameters: {
    docs: {
      description: {
        story: "A basic label that can be used to label form fields.",
      },
    },
  },
};

export const WithHtmlFor: Story = {
  args: {
    children: "Your email",
    htmlFor: "email",
  },
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label {...args} />
      <Input id="email" type="email" placeholder="Email" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Using htmlFor to associate the label with a form control by ID.",
      },
    },
  },
};

export const WrappingControl: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Label>
        <Checkbox className="mr-2 h-4 w-4" />
        Accept terms and conditions
      </Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Labels can wrap controls to automatically associate them.",
      },
    },
  },
};

export const SupportsPolymorphism: Story = {
  args: {
    asChild: true,
  },
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <div className="flex items-center justify-between">
        <Label asChild htmlFor="custom-styled-input">
          <label className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
            Custom styled label
          </label>
        </Label>
        <span className="text-xs text-muted-foreground">Optional</span>
      </div>
      <Input id="custom-styled-input" placeholder="Enter value" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "When using asChild, use a real label element as the child to maintain proper semantics. This is the correct pattern for customizing label appearance while preserving accessibility.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find elements using accessible queries
    const label = canvas.getByText("Custom styled label");
    const input = canvas.getByLabelText("Custom styled label");

    // Test the key accessibility behavior - clicking label focuses input
    await userEvent.click(label);
    await expect(input).toHaveFocus();
  },
};

// Rename the FocusesAssociatedInput story
export const AccessibleLabelInputAssociation: Story = {
  args: {
    children: "Username",
    htmlFor: "username-input",
  },
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label {...args} />
      <Input id="username-input" placeholder="Enter username" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates proper label-input association using the htmlFor attribute matched with the input's id.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find elements using accessible querxies
    const label = canvas.getByText("Username");
    const input = canvas.getByLabelText("Username");

    // Test the key accessibility behavior - clicking label focuses input
    await userEvent.click(label);
    await expect(input).toHaveFocus();
  },
};
