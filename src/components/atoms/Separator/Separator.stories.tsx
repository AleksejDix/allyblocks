import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";

import { Separator } from "./Separator";

const meta: Meta<typeof Separator> = {
  component: Separator,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Visually or semantically separates content. Based on [shadcn/ui Separator](https://ui.shadcn.com/docs/components/separator) and [Radix UI Separator](https://www.radix-ui.com/primitives/docs/components/separator).\n\n" +
          "### Features\n" +
          "- Supports horizontal and vertical orientations\n" +
          "- Can be decorative or semantic for accessibility\n" +
          "- Adheres to the separator role requirements",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      defaultValue: "horizontal",
      description: "The orientation of the separator.",
    },
    decorative: {
      control: "boolean",
      defaultValue: true,
      description: "Whether the separator is purely decorative.",
    },
    asChild: {
      control: "boolean",
      description: "When true, component will render as its child element.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the separator.",
    },
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement).not.toBeEmptyDOMElement();
  },
};
export default meta;

type Story = StoryObj<typeof Separator>;

export const HorizontalSeparator: Story = {
  args: {
    orientation: "horizontal",
  },
  render: (args) => (
    <div className="space-y-4">
      <div>Content above</div>
      <Separator {...args} />
      <div>Content below</div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Default horizontal separator that visually divides content.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Only verify that the content is correctly rendered with the separator between
    await expect(canvas.getByText("Content above")).toBeInTheDocument();
    await expect(canvas.getByText("Content below")).toBeInTheDocument();
    await expect(canvas.getByRole("none")).toBeInTheDocument();
  },
};

export const VerticalSeparator: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <div className="flex h-16 items-center">
      <div className="px-4">Left content</div>
      <Separator {...args} />
      <div className="px-4">Right content</div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Vertical separator that divides content horizontally.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Only verify that the content is correctly rendered with the separator between
    await expect(canvas.getByText("Left content")).toBeInTheDocument();
    await expect(canvas.getByText("Right content")).toBeInTheDocument();
    await expect(canvas.getByRole("none")).toBeInTheDocument();
  },
};

export const NonDecorativeSeparator: Story = {
  args: {
    decorative: false,
  },
  render: (args) => (
    <div className="space-y-4">
      <section>
        <h2 className="text-lg font-semibold">First Section</h2>
        <p>Some content in the first section</p>
      </section>
      <Separator {...args} />
      <section>
        <h2 className="text-lg font-semibold">Second Section</h2>
        <p>Some content in the second section</p>
      </section>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Non-decorative separator that semantically separates content for accessibility. This adds 'separator' ARIA role and is not announced as decorative to screen readers.",
      },
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLCanvasElement }) => {
    const canvas = within(canvasElement);

    // For non-decorative separator we can verify content and check for the separator role
    await expect(canvas.getByText("First Section")).toBeInTheDocument();
    await expect(canvas.getByText("Second Section")).toBeInTheDocument();
    await expect(canvas.getByRole("separator")).toBeInTheDocument();
  },
};

export const CustomStyledSeparator: Story = {
  args: {
    className: "bg-primary h-1 rounded-full my-4",
  },
  render: (args: { className: string }) => (
    <div className="space-y-4">
      <div>Above the custom separator</div>
      <Separator {...args} />
      <div>Below the custom separator</div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Separator with custom styling applied through the className prop.",
      },
    },
  },
};

export const AsChildSeparator: Story = {
  args: {
    asChild: true,
    decorative: false,
  },
  render: (args) => (
    <div className="space-y-4">
      <div>Content above</div>
      <Separator {...args}>
        <hr
          className="border-t-2 border-dashed border-primary my-4"
          aria-label="Section divider"
        />
      </Separator>
      <div>Content below</div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Using the asChild prop to render the Separator as a custom element (hr) while maintaining accessibility attributes.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Only verify that the content is correctly rendered with the custom separator between
    await expect(canvas.getByText("Content above")).toBeInTheDocument();
    await expect(canvas.getByText("Content below")).toBeInTheDocument();
    await expect(canvas.getByRole("separator")).toBeInTheDocument();
  },
};
