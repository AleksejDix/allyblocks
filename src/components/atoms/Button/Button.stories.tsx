import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/test";
import { Plus } from "lucide-react";
import { expect } from "@storybook/test";
import { Button } from "./Button";
import { useState, useEffect } from "react";

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile button component with multiple variants and sizes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    asChild: {
      control: "boolean",
      description: "Whether to merge props with child element",
      defaultValue: false,
    },
    className: {
      control: "text",
    },
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      description: "The visual style of the button",
      defaultValue: "default",
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg", "icon"],
      description: "The size of the button",
      defaultValue: "default",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
      defaultValue: false,
    },
  },
  // Global play function for all button stories
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    // Verify the component renders something
    await expect(canvasElement).not.toBeEmptyDOMElement();
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const RendersText: Story = {
  args: {
    children: "Click me",
  },
  parameters: {
    docs: {
      description: {
        story: "Default button with text content",
      },
    },
  },
};

export const SupportsPolymorphism: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates the polymorphic 'asChild' pattern that lets the Button component render any child element.",
      },
    },
  },
  args: {
    asChild: true,
    children: (
      <a href="#" onClick={(e) => e.preventDefault()}>
        Link
      </a>
    ),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link");
    await expect(link).toBeInTheDocument();
  },
};

export const SupportsIconContent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Button optimized for displaying icons with equal width and height.",
      },
    },
  },
  args: {
    size: "icon",
    children: <Plus />,
    "aria-label": "Add item",
  },
};

export const HandlesDisabledState: Story = {
  parameters: {
    docs: {
      description: {
        story: "Demonstrates a disabled button state with reduced opacity.",
      },
    },
  },
  args: {
    children: "Disabled Button",
    disabled: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await expect(button).toBeDisabled();
  },
};

export const DisplaysAllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: "Showcases all available button style variants.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  // This is primarily a visual story
};

export const DisplaysAllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: "Displays all available button size options.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-end gap-4">
      <Button size="default">Default</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Plus />
        <span className="sr-only">Plus</span>
      </Button>
    </div>
  ),
  // This is primarily a visual story
};

export const SupportsFocusNavigation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates proper keyboard navigation and accessibility features.",
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <div>
        <p>Press Tab to navigate between buttons</p>
        <p>Press Enter or Space to activate buttons</p>
      </div>
      <div className="flex gap-4">
        <Button>First Button</Button>
        <Button>Second Button</Button>
        <Button>Third Button</Button>
      </div>
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Test keyboard navigation
    await userEvent.tab();
    const firstButton = canvas.getByRole("button", { name: "First Button" });
    await expect(firstButton).toHaveFocus();
  },
};

// Server Component Story (using client-side simulation)
export const ServerRendered = {
  render: () => {
    // Create a component that simulates server data fetching
    function SimulatedServerComponent() {
      const [data, setData] = useState<{ label: string } | null>(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        const fetchData = async () => {
          // Simulate server delay
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setData({ label: "Server Rendered Button" });
          setLoading(false);
        };

        fetchData();
      }, []);

      if (loading) {
        return <div>Loading server component...</div>;
      }

      return (
        <div className="space-y-4">
          <p>This button simulates data fetched from the server:</p>
          <Button variant="default">{data?.label}</Button>
        </div>
      );
    }

    return <SimulatedServerComponent />;
  },
};
