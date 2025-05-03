import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "./Box";

const meta: Meta<typeof Box> = {
  component: Box,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    surface: {
      control: "select",
      options: [
        "default",
        "card",
        "popover",
        "primary",
        "secondary",
        "muted",
        "accent",
        "destructive",
        "sidebar",
        "sidebar-primary",
        "sidebar-accent",
      ],
    },
  },
  args: {
    surface: "default",
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  render: () => <Box>Default surface</Box>,
};

export const Card: Story = {
  render: () => <Box surface="card">Card surface</Box>,
};

export const Popover: Story = {
  render: () => <Box surface="popover">Popover surface</Box>,
};

export const Primary: Story = {
  render: () => <Box surface="primary">Primary surface</Box>,
};

export const Secondary: Story = {
  render: () => <Box surface="secondary">Secondary surface</Box>,
};

export const Muted: Story = {
  render: () => <Box surface="muted">Muted surface</Box>,
};

export const Accent: Story = {
  render: () => <Box surface="accent">Accent surface</Box>,
};

export const Destructive: Story = {
  render: () => <Box surface="destructive">Destructive surface</Box>,
};

export const Sidebar: Story = {
  render: () => <Box surface="sidebar">Sidebar surface</Box>,
};

export const SidebarPrimary: Story = {
  render: () => <Box surface="sidebar-primary">Sidebar primary surface</Box>,
};

export const SidebarAccent: Story = {
  render: () => <Box surface="sidebar-accent">Sidebar accent surface</Box>,
};
