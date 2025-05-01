import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";
import { Avatar, DisplayAvatarFallback, DisplayAvatarImage } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  name: "With Image",
  args: {
    children: (
      <>
        <DisplayAvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <DisplayAvatarFallback>CN</DisplayAvatarFallback>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("CN")).toBeInTheDocument();
  },
};

export const WithFallback: Story = {
  name: "With Fallback Only",
  args: {
    children: <DisplayAvatarFallback>OM</DisplayAvatarFallback>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("OM")).toBeInTheDocument();
  },
};

export const ImageLoadError: Story = {
  name: "Image Load Error Fallback",
  args: {
    children: (
      <>
        <DisplayAvatarImage
          src="invalid-image-url.jpg"
          alt="Invalid Image"
        />
        <DisplayAvatarFallback>ERR</DisplayAvatarFallback>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("ERR")).toBeInTheDocument();
  },
};

export const LongTextFallback: Story = {
  name: "Long Text Fallback",
  args: {
    children: <DisplayAvatarFallback>LongUsername</DisplayAvatarFallback>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("LongUsername")).toBeInTheDocument();
  },
};
