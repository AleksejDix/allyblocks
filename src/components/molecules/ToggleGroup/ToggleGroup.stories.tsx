import type { Meta, StoryObj } from "@storybook/react";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";

const meta = {
  component: ToggleGroup,
  parameters: {
    layout: "centered",
    nuqs: {
      disable: true,
    },
  },
  tags: ["autodocs"],

  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "outline",
        "ghost",
        "default",
        "outline",
        "destructive",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
    type: {
      control: "select",
      options: ["single", "multiple"],
    },
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "single",
    defaultValue: "center",
    variant: "destructive",
    children: (
      <>
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </>
    ),
  },
};

export const Multiple: Story = {
  args: {
    type: "multiple",
    children: (
      <>
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
        <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
      </>
    ),
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    type: "single",
    defaultValue: "center",
    children: (
      <>
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </>
    ),
  },
};

export const Small: Story = {
  args: {
    type: "single",
    defaultValue: "center",
    children: (
      <>
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </>
    ),
  },
};

export const Large: Story = {
  args: {
    type: "single",
    defaultValue: "center",
    children: (
      <>
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </>
    ),
  },
};

export const WithIcons: Story = {
  args: {
    type: "single",
    defaultValue: "center",
    children: (
      <>
        <ToggleGroupItem value="left">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16" />
            <path d="M4 12h16" />
            <path d="M4 18h16" />
          </svg>
        </ToggleGroupItem>
        <ToggleGroupItem value="center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16" />
            <path d="M4 12h16" />
            <path d="M4 18h16" />
          </svg>
        </ToggleGroupItem>
        <ToggleGroupItem value="right">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16" />
            <path d="M4 12h16" />
            <path d="M4 18h16" />
          </svg>
        </ToggleGroupItem>
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    type: "single",
    defaultValue: "center",
    children: (
      <>
        <ToggleGroupItem value="left" disabled>
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </>
    ),
  },
};
