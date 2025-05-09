import type { Meta, StoryObj } from "@storybook/react";
import { Code } from "./Code";

const meta = {
  component: Code,
  tags: ["autodocs"],
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "const greeting = 'Hello, World!';",
  },
};

export const Inline: Story = {
  args: {
    variant: "inline",
    children: "npm install",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "border: 1px solid #ccc;",
  },
};

export const WithCustomClass: Story = {
  args: {
    className: "text-blue-500",
    children: "function example() { return true; }",
  },
};
