import type { Meta, StoryObj } from "@storybook/react";
import { Bullet } from "./Bullet";
import { Avatar } from "../Avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

const meta: Meta<typeof Bullet> = {
  component: Bullet,
  tags: ["autodocs"],
  parameters: {},
  argTypes: {
    status: {
      control: "select",
      options: ["online", "offline", "away", "busy", "invisible"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Bullet>;

export const Default: Story = {
  args: {
    status: "online",
  },
};

export const Statuses: Story = {
  render: () => (
    <div className="flex items-center gap-6 p-4 bg-white dark:bg-slate-900 rounded-md">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Online</span>
        <Bullet status="online" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Offline</span>
        <Bullet status="offline" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Away</span>
        <Bullet status="away" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Busy</span>
        <Bullet status="busy" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Invisible</span>
        <Bullet status="offline" />
      </div>
    </div>
  ),
};

export const WithAvatar: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="relative w-8 h-8">
        <Avatar className="inset-0 absolute">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 flex items-end justify-end overflow-hidden">
          <Bullet status="online" />
        </div>
      </div>
      <div className="relative w-8 h-8">
        <Avatar className="inset-0 absolute">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 flex items-end justify-end overflow-hidden">
          <Bullet status="offline" />
        </div>
      </div>
    </div>
  ),
};
