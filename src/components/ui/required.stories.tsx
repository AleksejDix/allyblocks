import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";

import { Required } from "./required";

const meta: Meta<typeof Required> = {
  title: "UI/Required Star",
  component: Required,
  argTypes: {
    required: {
      control: "boolean",
      defaultValue: true,
    },
    className: {
      control: "text",
    },
  },
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "A visual indicator for required form fields",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Required>;

export const Default: Story = {
  args: {
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tests that the Required component renders correctly in its default state.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify the required indicator renders correctly
    const asterisk = canvas.getByText("*");
    await expect(asterisk).toBeInTheDocument();
    await expect(asterisk).toHaveAttribute("aria-hidden", "true");

    // Verify screen reader text
    const srText = canvas.getByText("(required)");
    await expect(srText).toHaveClass("sr-only");
  },
};

export const NotRequired: Story = {
  args: {
    required: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "When required is false, the component should not render anything.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify nothing is rendered
    await expect(canvas.queryByText("*")).not.toBeInTheDocument();
    await expect(canvas.queryByText("(required)")).not.toBeInTheDocument();
  },
};
