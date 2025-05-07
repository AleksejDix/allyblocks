import type { Meta, StoryObj } from "@storybook/react";
import { ActionSplit } from "./ActionSplit";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import { Icon } from "@/components/atoms/Icon";
import { Input } from "@/components/atoms/Input";

const meta: Meta<typeof ActionSplit> = {
  component: ActionSplit,
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
      description: "The visual style variant of the ActionSplit",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActionSplit>;

export const Default: Story = {
  render: () => (
    <ActionSplit>
      <Button>Previous</Button>
      <Button>Next</Button>
    </ActionSplit>
  ),
};

export const Search: Story = {
  render: () => (
    <ActionSplit>
      <Input placeholder="Search" />
      <Button>Search</Button>
    </ActionSplit>
  ),
};

export const DateInput: Story = {
  render: () => (
    <ActionSplit>
      <IconButton aria-label="Calendar" variant="outline">
        <Icon name="calendar" />
      </IconButton>
      <Input type="date" />
    </ActionSplit>
  ),
};

export const Secondary: Story = {
  render: () => (
    <ActionSplit variant="secondary">
      <Button variant="secondary">Previous</Button>
      <Button variant="secondary">Next</Button>
    </ActionSplit>
  ),
};

export const Destructive: Story = {
  render: () => (
    <ActionSplit variant="destructive">
      <Button variant="destructive">Previous</Button>
      <Button variant="destructive">Next</Button>
    </ActionSplit>
  ),
};

export const Outline: Story = {
  render: () => (
    <ActionSplit variant="outline">
      <Button variant="outline">Previous</Button>
      <Button variant="outline">1</Button>
      <Button variant="outline">2</Button>
      <Button variant="outline">3</Button>
      <Button variant="outline">Next</Button>
    </ActionSplit>
  ),
};

export const ActionSplitMenu: Story = {
  render: () => (
    <ActionSplit>
      <Button>Export</Button>
      <IconButton aria-label="Open menu">
        <Icon name="chevron-down" />
      </IconButton>
    </ActionSplit>
  ),
};
