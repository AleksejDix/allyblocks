import type { Meta, StoryObj } from '@storybook/react'
import { Bullet } from './Bullet'
import { Avatar } from '../Avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'

const meta: Meta<typeof Bullet> = {
  component: Bullet,
  tags: ['autodocs'],
  parameters: {},
  argTypes: {
    color: {
      control: 'text',
      description: "Any Tailwind color name (e.g., 'blue', 'red', 'purple')",
    },
    label: {
      control: 'text',
      description: 'Accessible label for the bullet',
    },
  },
}

export default meta
type Story = StoryObj<typeof Bullet>

export const Default: Story = {
  args: {
    color: 'blue',
    label: 'Status indicator',
  },
}

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-6 p-4 bg-white dark:bg-slate-900 rounded-md">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Blue</span>
        <Bullet color="blue" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Red</span>
        <Bullet color="red" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Green</span>
        <Bullet color="green" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Yellow</span>
        <Bullet color="yellow" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Purple</span>
        <Bullet color="purple" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Orange</span>
        <Bullet color="orange" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Pink</span>
        <Bullet color="pink" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Emerald</span>
        <Bullet color="emerald" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Zinc</span>
        <Bullet color="zinc" />
      </div>
    </div>
  ),
}

export const WithAvatar: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="relative w-8 h-8">
        <Avatar className="inset-0 absolute">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 flex items-end justify-end overflow-hidden">
          <Bullet color="green" label="Online" />
        </div>
      </div>
      <div className="relative w-8 h-8">
        <Avatar className="inset-0 absolute">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 flex items-end justify-end overflow-hidden">
          <Bullet color="zinc" label="Offline" />
        </div>
      </div>
    </div>
  ),
}
