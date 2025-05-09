import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";

const meta: Meta<typeof Icon> = {
  component: Icon,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
    docs: {
      description: {
        component: `
A dynamic icon component that renders Lucide icons by name.

## Accessibility

Icons are decorative by default and have \`aria-hidden="true"\`. If an icon is meaningful and needs to be announced to screen readers, you should provide an \`aria-label\` or wrap it in a button with appropriate text.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: [
        "check",
        "x",
        "plus",
        "minus",
        "search",
        "user",
        "settings",
        "mail",
      ],
      description: "The name of the Lucide icon to display",
    },
    size: {
      control: "select",
      options: [12, 16, 20, 24, 32, 40, 48, 72, 96],
      description: "The size of the icon in pixels",
      defaultValue: 16,
    },
    strokeWidth: {
      control: "number",
      description: "The width of the icon stroke",
      defaultValue: 2,
    },
    "aria-label": {
      control: "text",
      description:
        "Accessible label for the icon when it needs to be announced to screen readers",
    },
  },
  args: {
    name: "check",
    size: 16,
    strokeWidth: 2,
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: "check",
  },
};

export const WithAriaLabel: Story = {
  args: {
    name: "check",
    "aria-label": "Check mark",
  },
};

export const DifferentColor: Story = {
  args: {
    name: "check",
    className: "text-red-500",
  },
};

export const DifferentStrokeWidth: Story = {
  args: {
    name: "check",
    strokeWidth: 5,
  },
};

export const FailedToLoad: Story = {
  args: {
    // @ts-expect-error - This should fail to load
    name: "non-existent-icon",
  },
};

export const AllSizeVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon name="check" size={12} />
      <Icon name="check" size={16} />
      <Icon name="check" size={20} />
      <Icon name="check" size={24} />
      <Icon name="check" size={32} />
      <Icon name="check" size={40} />
      <Icon name="check" size={48} />
    </div>
  ),
};

export const DifferentIcons: Story = {
  render: () => (
    <div className="flex gap-4">
      <Icon name="check" />
      <Icon name="x" />
      <Icon name="plus" />
      <Icon name="minus" />
      <Icon name="search" />
      <Icon name="user" />
      <Icon name="settings" />
      <Icon name="mail" />
    </div>
  ),
};
