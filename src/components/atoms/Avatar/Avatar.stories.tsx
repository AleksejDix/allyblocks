import type { Meta, StoryObj } from "@storybook/react";
import { within, expect, waitFor } from "@storybook/test";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  // List subcomponents for documentation
  subcomponents: { AvatarImage, AvatarFallback },
  parameters: {
    nuqs: {
      disabled: true,
    },
    docs: {
      description: {
        component:
          "Avatar component for displaying user images with fallback support",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "inline-radio" },
      options: ["sm", "md", "lg", "xl"],
    },
    shape: {
      control: { type: "inline-radio" },
      options: ["circle", "square"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  name: "With Image",
  args: {
    size: "md",
    shape: "circle",
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByRole("img")).toBeInTheDocument();
    });
  },
};

export const WithFallback: Story = {
  name: "With Fallback Only",
  args: {
    size: "md",
    shape: "circle",
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>OM</AvatarFallback>
    </Avatar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("OM")).toBeInTheDocument();
  },
};

export const AllSizes: Story = {
  name: "All Sizes",
  args: {
    shape: "circle",
  },
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <AvatarImage src="https://github.com/shadcn.png" alt="Small avatar" />
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar size="md">
        <AvatarImage src="https://github.com/shadcn.png" alt="Medium avatar" />
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="https://github.com/shadcn.png" alt="Large avatar" />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar size="xl">
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="Extra large avatar"
        />
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const AllShapes: Story = {
  name: "All Shapes",
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar shape="circle">
        <AvatarImage src="https://github.com/shadcn.png" alt="Circle avatar" />
        <AvatarFallback>Circle</AvatarFallback>
      </Avatar>
      <Avatar shape="square">
        <AvatarImage src="https://github.com/shadcn.png" alt="Square avatar" />
        <AvatarFallback>Square</AvatarFallback>
      </Avatar>
    </div>
  ),
};
