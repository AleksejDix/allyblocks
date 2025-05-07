import type { Meta, StoryObj } from "@storybook/react";
import { ButtonSplit } from "./ButtonSplit";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import { Icon } from "@/components/atoms/Icon";

const meta: Meta<typeof ButtonSplit> = {
  component: ButtonSplit,
  parameters: {
    nuqs: {
      disabled: true,
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "destructive"],
      description: "The visual style variant of the ButtonSplit",
    },
  },
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
    <ButtonSplit variant="destructive">
      <Button variant="destructive">Previous</Button>
      <Button variant="destructive">Next</Button>
    </ButtonSplit>
  ),
};

export const Outline: Story = {
  render: () => (
    <ButtonSplit variant="outline">
      <Button variant="outline">Previous</Button>
      <Button variant="outline">1</Button>
      <Button variant="outline">2</Button>
      <Button variant="outline">3</Button>
      <Button variant="outline">Next</Button>
    </ButtonSplit>
  ),
};

export const ButtonSplitMenu: Story = {
  render: () => (
    <ButtonSplit>
      <Button>Export</Button>
      <IconButton aria-label="Open menu">
        <Icon name="chevron-down" />
      </IconButton>
    </ButtonSplit>
  ),
};
