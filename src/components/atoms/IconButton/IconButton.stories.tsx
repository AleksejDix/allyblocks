import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";
import { Icon } from "@/components/atoms/Icon";

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  tags: ["autodocs"],
  parameters: {
    nuqs: {
      disabled: true,
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      description: "The visual variant of the button",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the button",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    children: <Icon name="chevron-right" />,
    "aria-label": "Go to next page",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <IconButton variant="default" aria-label="Confirm action">
        <Icon name="check" />
      </IconButton>
      <IconButton variant="destructive" aria-label="Delete item">
        <Icon name="trash" />
      </IconButton>
      <IconButton variant="outline" aria-label="Add new item">
        <Icon name="plus" />
      </IconButton>
      <IconButton variant="secondary" aria-label="Search content">
        <Icon name="search" />
      </IconButton>
      <IconButton variant="ghost" aria-label="Open settings">
        <Icon name="settings" />
      </IconButton>
      <IconButton variant="link" aria-label="Open menu">
        <Icon name="menu" />
      </IconButton>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <IconButton size="sm" aria-label="Add item (small)">
        <Icon name="plus" />
      </IconButton>
      <IconButton size="md" aria-label="Add item (medium)">
        <Icon name="plus" />
      </IconButton>
      <IconButton size="lg" aria-label="Add item (large)">
        <Icon name="plus" />
      </IconButton>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: <Icon name="trash" />,
    "aria-label": "Delete item",
    disabled: true,
  },
};

export const WithDifferentIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <IconButton aria-label="Confirm">
        <Icon name="check" />
      </IconButton>
      <IconButton aria-label="Cancel">
        <Icon name="x" />
      </IconButton>
      <IconButton aria-label="Add">
        <Icon name="plus" />
      </IconButton>
      <IconButton aria-label="Delete">
        <Icon name="trash" />
      </IconButton>
      <IconButton aria-label="Search">
        <Icon name="search" />
      </IconButton>
      <IconButton aria-label="Settings">
        <Icon name="settings" />
      </IconButton>
      <IconButton aria-label="Menu">
        <Icon name="menu" />
      </IconButton>
    </div>
  ),
};
