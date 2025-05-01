import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";

const meta: Meta<typeof Icon> = {
  component: Icon,
  parameters: {
    layout: "centered",
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
      control: "number",
      description: "The size of the icon in pixels",
      defaultValue: 24,
    },
    color: {
      control: "color",
      description: "The color of the icon",
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
    size: 24,
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

export const DifferentSize: Story = {
  args: {
    name: "check",
    size: 32,
  },
};

export const DifferentColor: Story = {
  args: {
    name: "check",
    color: "red",
  },
};

export const DifferentStrokeWidth: Story = {
  args: {
    name: "check",
    strokeWidth: 3,
  },
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
