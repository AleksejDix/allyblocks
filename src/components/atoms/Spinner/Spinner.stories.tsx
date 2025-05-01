import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";
import { within, expect } from "@storybook/test";
import { RefreshCw } from "lucide-react";

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A loading spinner component that uses the Lucide Loader2 icon with animation.

## Usage

\`\`\`tsx
import { Spinner } from "@/components/atoms/Spinner";

// Basic usage with default icon
<Spinner />

// With label using children
<Spinner>Loading...</Spinner>

// With custom icon
<Spinner icon={<RefreshCw className="animate-spin" />}>Refreshing...</Spinner>

// Different sizes with labels
<Spinner size="sm">Small</Spinner>
<Spinner size="lg">Large</Spinner>

// Different sizes
<Spinner size="default">Default</Spinner>
<Spinner size="xl">Extra Large</Spinner>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | "sm" | "default" | "lg" | "xl" | "default" | Size of the spinner |
| icon | React.ReactNode | - | Custom icon to use instead of the default Loader2 |
| children | React.ReactNode | - | Label text or content to display next to the spinner |
| className | string | - | Additional CSS classes |
| ...props | HTMLAttributes | - | All other HTML div element props |

## Accessibility

The Spinner component includes the \`role="status"\` attribute to indicate that it represents a loading state. When children are provided, they will be associated with the spinner for screen readers.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg", "xl"],
      description: "Size of the spinner",
    },
    children: {
      control: "text",
      description: "Label text or content to display next to the spinner",
    },
  },
  args: {
    size: "default",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("status")).toBeInTheDocument();
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    children: "Loading...",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large",
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
    children: "Extra Large",
  },
};

export const CustomIcon: Story = {
  args: {
    icon: <RefreshCw className="animate-spin" />,
    children: "Refreshing...",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <Spinner size="sm">Small</Spinner>
      <Spinner size="default">Default</Spinner>
      <Spinner size="lg">Large</Spinner>
      <Spinner size="xl">Extra Large</Spinner>
    </div>
  ),
}; 