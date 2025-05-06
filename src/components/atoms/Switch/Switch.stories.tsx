import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/test";
import { expect } from "@storybook/test";
import { Switch } from "./Switch";
import { Label } from "../Label";

const meta: Meta<typeof Switch> = {
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: "A switch component for toggling between states.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Whether the switch is disabled",
      defaultValue: false,
    },
    defaultChecked: {
      control: "boolean",
      description: "Whether the switch is checked by default",
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    "aria-label": "Toggle switch",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const switchElement = canvas.getByRole("switch");
    await expect(switchElement).toBeInTheDocument();
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
    "aria-label": "Toggle switch",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const switchElement = canvas.getByRole("switch");
    await expect(switchElement).toBeChecked();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    "aria-label": "Toggle switch",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const switchElement = canvas.getByRole("switch");
    await expect(switchElement).toBeDisabled();
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const switchElement = canvas.getByRole("switch");
    await expect(switchElement).toBeInTheDocument();
  },
};
