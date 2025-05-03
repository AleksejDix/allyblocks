import { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup } from "./ButtonGroup";
import { Button } from "@/components/atoms/Button";
import { ChevronDown } from "lucide-react";

const meta: Meta<typeof ButtonGroup> = {
  component: ButtonGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
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

export const Secondary: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="secondary">Previous</Button>
      <Button variant="secondary">Next</Button>
    </ButtonGroup>
  ),
};

export const Destructive: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="destructive">Previous</Button>
      <Button variant="destructive">Next</Button>
    </ButtonGroup>
  ),
};

export const Outline: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Previous</Button>
      <Button variant="outline">Next</Button>
    </ButtonGroup>
  ),
};

export const ActionButtons: Story = {
  render: () => (
    <ButtonGroup>
      <Button>Export</Button>
      <Button size="icon">
        <ChevronDown />
      </Button>
    </ButtonGroup>
  ),
};
