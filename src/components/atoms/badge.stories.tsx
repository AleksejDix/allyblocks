import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@/components/atoms/badge";
import { CheckCircle } from "lucide-react"; // Example icon
import { within, expect } from "@storybook/test"; // <-- Removed unused userEvent

// Extract variants for argTypes
const variantOptions = [
  "default",
  "secondary",
  "destructive",
  "outline",
] as const;

const meta: Meta<typeof Badge> = {
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: variantOptions, // Use the extracted options
      description: "The visual style of the badge.",
    },
    children: {
      control: "text",
      description: "The content displayed inside the badge.",
    },
    asChild: {
      control: "boolean",
      description:
        "Merge the props and behavior of the component with its immediate child.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
  args: {
    children: "Badge",
    variant: "default",
    asChild: false,
  },
  // Global play function that runs for all stories
  play: async ({ canvasElement }) => {
    // Verify the component renders something
    await expect(canvasElement).not.toBeEmptyDOMElement();
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "Default",
  },
};

// Story for the secondary variant
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

// Story for the destructive variant
export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
};

// Story for the outline variant
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

// Story showcasing a badge with an icon
export const WithIcon: Story = {
  args: {
    variant: "secondary",
    children: (
      <>
        <CheckCircle data-testid="badge-icon" />
        <span>Verified</span>
      </>
    ),
  },
};

// Story showcasing the badge used as a link via asChild
export const AsLink: Story = {
  args: {
    asChild: true,
    variant: "outline",
    children: <a href="#">Link Badge</a>,
  },
  parameters: {
    docs: {
      description: {
        story:
          "The Badge can render as its child element (e.g., an `<a>` tag) using the `asChild` prop. Note how hover styles apply.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link");
    await expect(link).toBeInTheDocument();
  },
};
