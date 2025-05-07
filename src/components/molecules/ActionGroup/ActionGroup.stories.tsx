import type { Meta, StoryObj } from "@storybook/react";
import { ActionGroup } from "./ActionGroup";
import { Button } from "@/components/atoms/Button";
import { ChevronDown } from "lucide-react";

const meta: Meta<typeof ActionGroup> = {
  component: ActionGroup,
  parameters: {
    nuqs: {
      disabled: true,
    },
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "Controls the layout direction of buttons",
    },
    className: {
      control: "text",
      description: "Custom CSS classes to apply custom styling",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActionGroup>;

export const Default: Story = {
  render: () => (
    <ActionGroup>
      <Button>Previous</Button>
      <Button>Next</Button>
    </ActionGroup>
  ),
};

export const Centered: Story = {
  render: () => (
    <ActionGroup className="justify-center w-full">
      <Button variant="secondary">Previous</Button>
      <Button variant="secondary">Next</Button>
    </ActionGroup>
  ),
};

export const EndAlignment: Story = {
  render: () => (
    <ActionGroup className="justify-end w-full">
      <Button variant="destructive">Cancel</Button>
      <Button>Save</Button>
    </ActionGroup>
  ),
};

export const SpaceBetween: Story = {
  render: () => (
    <ActionGroup className="justify-between w-full">
      <Button variant="destructive">Cancel</Button>
      <Button>Save</Button>
    </ActionGroup>
  ),
};

export const CustomSpacing: Story = {
  render: () => (
    <ActionGroup className="gap-4">
      <Button variant="outline">First</Button>
      <Button variant="outline">Second</Button>
      <Button variant="outline">Third</Button>
    </ActionGroup>
  ),
};

export const VerticalLayout: Story = {
  render: () => (
    <ActionGroup direction="vertical" className="gap-4">
      <Button variant="outline">First Option</Button>
      <Button variant="outline">Second Option</Button>
      <Button variant="outline">Third Option</Button>
    </ActionGroup>
  ),
};

export const ActionButtons: Story = {
  render: () => (
    <ActionGroup>
      <Button>Export</Button>
      <Button size="icon">
        <ChevronDown className="h-4 w-4" />
      </Button>
    </ActionGroup>
  ),
};
