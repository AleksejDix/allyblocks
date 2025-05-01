import { Meta, StoryObj } from "@storybook/react";
import { ButtonSplit } from "./ButtonSplit";
import { Button } from "@/components/atoms/Button";
import { ChevronDown } from "lucide-react";

const meta: Meta<typeof ButtonSplit> = {
  component: ButtonSplit,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ButtonSplit>;

export const Default: Story = {
  render: () => (
    <ButtonSplit>
      <Button>Previous</Button>
      <Button>Next</Button>
    </ButtonSplit>
  ),
};

export const Secondary: Story = {
  render: () => (
    <ButtonSplit variant="secondary">
      <Button variant="secondary">Previous</Button>
      <Button variant="secondary">Next</Button>
    </ButtonSplit>
  ),
};

export const Destructive: Story = {
  render: () => (
    <ButtonSplit>
      <Button variant="destructive">Previous</Button>
      <Button variant="destructive">Next</Button>
    </ButtonSplit>
  ),
};

export const Outline: Story = {
  render: () => (
    <ButtonSplit variant="outline">
      <Button variant="outline">Previous</Button>
      <Button variant="outline">Next</Button>
    </ButtonSplit>
  ),
};

export const ButtonSplitMenu: Story = {
  render: () => (
    <ButtonSplit>
      <Button>Export</Button>
      <Button size="icon">
        <ChevronDown />
      </Button>
    </ButtonSplit>
  ),
};
