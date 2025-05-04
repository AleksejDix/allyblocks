import type { Meta, StoryObj } from "@storybook/react";
import { UserStatus } from "./UserStatus";

const meta: Meta<typeof UserStatus> = {
  component: UserStatus,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    status: {
      control: "select",
      options: ["online", "offline", "away", "busy"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserStatus>;

export const Default: Story = {
  args: {
    status: "online",
    avatarSrc: "https://github.com/shadcn.png",
  },
};

export const WithInitials: Story = {
  args: {
    status: "online",
    avatarFallback: "JS",
  },
};

export const WithoutAvatar: Story = {
  args: {
    status: "online",
  },
};

export const StatusVariants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <UserStatus
        {...args}
        status="online"
        avatarSrc="https://github.com/shadcn.png"
      />
      <UserStatus {...args} status="offline" avatarFallback="JS" />
      <UserStatus {...args} status="away" avatarFallback="AJ" />
      <UserStatus {...args} status="busy" avatarFallback="BB" />
    </div>
  ),
};
