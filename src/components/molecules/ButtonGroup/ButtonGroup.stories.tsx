import type { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup } from "./ButtonGroup";
import { Button } from "@/components/atoms/Button";
import { ChevronDown } from "lucide-react";

const meta: Meta<typeof ButtonGroup> = {
  component: ButtonGroup,
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
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button>Previous</Button>
      <Button>Next</Button>
    </ButtonGroup>
  ),
};

export const Centered: Story = {
  render: () => (
    <ButtonGroup className="justify-center w-full">
      <Button variant="secondary">Previous</Button>
      <Button variant="secondary">Next</Button>
    </ButtonGroup>
  ),
};

export const EndAlignment: Story = {
  render: () => (
    <ButtonGroup className="justify-end w-full">
      <Button variant="destructive">Cancel</Button>
      <Button>Save</Button>
    </ButtonGroup>
  ),
};

export const SpaceBetween: Story = {
  render: () => (
    <ButtonGroup className="justify-between w-full">
      <Button variant="destructive">Cancel</Button>
      <Button>Save</Button>
    </ButtonGroup>
  ),
};

export const CustomSpacing: Story = {
  render: () => (
    <ButtonGroup className="gap-4">
      <Button variant="outline">First</Button>
      <Button variant="outline">Second</Button>
      <Button variant="outline">Third</Button>
    </ButtonGroup>
  ),
};

export const VerticalLayout: Story = {
  render: () => (
    <ButtonGroup direction="vertical" className="gap-4">
      <Button variant="outline">First Option</Button>
      <Button variant="outline">Second Option</Button>
      <Button variant="outline">Third Option</Button>
    </ButtonGroup>
  ),
};

export const ActionButtons: Story = {
  render: () => (
    <ButtonGroup>
      <Button>Export</Button>
      <Button size="icon">
        <ChevronDown className="h-4 w-4" />
      </Button>
    </ButtonGroup>
  ),
};
