import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";

import { Required } from "./Required";

const meta: Meta<typeof Required> = {
  component: Required,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
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
    const srText = canvas.getByText("is required");
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
    await expect(canvas.queryByText("is required")).not.toBeInTheDocument();
  },
};
