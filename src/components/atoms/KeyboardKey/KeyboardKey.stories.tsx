import type { Meta, StoryObj } from '@storybook/react'
import { KeyboardKey } from './KeyboardKey'

const meta: Meta<typeof KeyboardKey> = {
  component: KeyboardKey,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    keyName: {
      control: 'select',
      options: [
        'ctrl',
        'cmd',
        'alt',
        'shift',
        'tab',
        'enter',
        'space',
        'esc',
        'delete',
        'backspace',
        'up',
        'down',
        'left',
        'right',
        'home',
        'end',
        'pageup',
        'pagedown',
        'f1',
        'f2',
        'f3',
        'f4',
        'f5',
        'f6',
        'f7',
        'f8',
        'f9',
        'f10',
        'f11',
        'f12',
      ],
      description: 'Common key name for automatic formatting',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the keyboard key',
    },
    variant: {
      control: 'select',
      options: ['default', 'outline', 'ghost', 'pressed'],
      description: 'Visual variant of the key',
    },
    modifier: {
      control: 'boolean',
      description: 'Whether to style as a modifier key',
    },
    platformSpecific: {
      control: 'boolean',
      description: 'Show platform-specific symbols (Mac vs PC)',
    },
    asChild: {
      control: 'boolean',
      description: 'Render as child element instead of kbd',
    },
    className: {
      control: 'text',
      description: 'Custom className to apply',
    },
  },
}

export default meta
type Story = StoryObj<typeof KeyboardKey>

export const Default: Story = {
  args: {
    children: 'K',
  },
}

export const CommonKeys: Story = {
  args: {},
  render: () => (
    <div className="flex flex-wrap gap-2">
      <KeyboardKey keyName="ctrl" />
      <KeyboardKey keyName="cmd" />
      <KeyboardKey keyName="alt" />
      <KeyboardKey keyName="shift" />
      <KeyboardKey keyName="tab" />
      <KeyboardKey keyName="enter" />
      <KeyboardKey keyName="space" />
      <KeyboardKey keyName="esc" />
      <KeyboardKey keyName="delete" />
      <KeyboardKey keyName="backspace" />
    </div>
  ),
}

export const ArrowKeys: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col items-center gap-1">
      <KeyboardKey keyName="up" />
      <div className="flex gap-1">
        <KeyboardKey keyName="left" />
        <KeyboardKey keyName="down" />
        <KeyboardKey keyName="right" />
      </div>
    </div>
  ),
}

export const FunctionKeys: Story = {
  args: {},
  render: () => (
    <div className="flex flex-wrap gap-1">
      <KeyboardKey keyName="f1" size="sm" />
      <KeyboardKey keyName="f2" size="sm" />
      <KeyboardKey keyName="f3" size="sm" />
      <KeyboardKey keyName="f4" size="sm" />
      <KeyboardKey keyName="f5" size="sm" />
      <KeyboardKey keyName="f6" size="sm" />
      <KeyboardKey keyName="f7" size="sm" />
      <KeyboardKey keyName="f8" size="sm" />
      <KeyboardKey keyName="f9" size="sm" />
      <KeyboardKey keyName="f10" size="sm" />
      <KeyboardKey keyName="f11" size="sm" />
      <KeyboardKey keyName="f12" size="sm" />
    </div>
  ),
}

export const Sizes: Story = {
  args: {},
  render: () => (
    <div className="flex items-end gap-2">
      <KeyboardKey size="xs">A</KeyboardKey>
      <KeyboardKey size="sm">A</KeyboardKey>
      <KeyboardKey size="md">A</KeyboardKey>
      <KeyboardKey size="lg">A</KeyboardKey>
      <KeyboardKey size="xl">A</KeyboardKey>
    </div>
  ),
}

export const Variants: Story = {
  args: {},
  render: () => (
    <div className="flex gap-2">
      <KeyboardKey variant="default">Default</KeyboardKey>
      <KeyboardKey variant="outline">Outline</KeyboardKey>
      <KeyboardKey variant="ghost">Ghost</KeyboardKey>
      <KeyboardKey variant="pressed">Pressed</KeyboardKey>
    </div>
  ),
}

export const ModifierKeys: Story = {
  args: {},
  render: () => (
    <div className="flex gap-2">
      <KeyboardKey keyName="ctrl" />
      <KeyboardKey keyName="cmd" />
      <KeyboardKey keyName="alt" />
      <KeyboardKey keyName="shift" />
      <KeyboardKey modifier={false} keyName="ctrl">
        Custom
      </KeyboardKey>
      <KeyboardKey modifier={true}>Custom Mod</KeyboardKey>
    </div>
  ),
}

export const PlatformSpecific: Story = {
  args: {},
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Platform Specific (Default)</h3>
        <div className="flex gap-2">
          <KeyboardKey keyName="ctrl" />
          <KeyboardKey keyName="cmd" />
          <KeyboardKey keyName="alt" />
          <KeyboardKey keyName="shift" />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Platform Agnostic</h3>
        <div className="flex gap-2">
          <KeyboardKey keyName="ctrl" platformSpecific={false} />
          <KeyboardKey keyName="cmd" platformSpecific={false} />
          <KeyboardKey keyName="alt" platformSpecific={false} />
          <KeyboardKey keyName="shift" platformSpecific={false} />
        </div>
      </div>
    </div>
  ),
}

export const KeyboardShortcuts: Story = {
  args: {},
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm">Copy:</span>
        <KeyboardKey keyName="ctrl" size="sm" />
        <span className="text-xs text-muted-foreground">+</span>
        <KeyboardKey size="sm">C</KeyboardKey>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Paste:</span>
        <KeyboardKey keyName="ctrl" size="sm" />
        <span className="text-xs text-muted-foreground">+</span>
        <KeyboardKey size="sm">V</KeyboardKey>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Save:</span>
        <KeyboardKey keyName="ctrl" size="sm" />
        <span className="text-xs text-muted-foreground">+</span>
        <KeyboardKey size="sm">S</KeyboardKey>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Undo:</span>
        <KeyboardKey keyName="ctrl" size="sm" />
        <span className="text-xs text-muted-foreground">+</span>
        <KeyboardKey size="sm">Z</KeyboardKey>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Find:</span>
        <KeyboardKey keyName="ctrl" size="sm" />
        <span className="text-xs text-muted-foreground">+</span>
        <KeyboardKey size="sm">F</KeyboardKey>
      </div>
    </div>
  ),
}

export const CustomContent: Story = {
  args: {},
  render: () => (
    <div className="flex gap-2">
      <KeyboardKey>⌘</KeyboardKey>
      <KeyboardKey>⌥</KeyboardKey>
      <KeyboardKey>⇧</KeyboardKey>
      <KeyboardKey>⌃</KeyboardKey>
      <KeyboardKey>123</KeyboardKey>
      <KeyboardKey>Fn</KeyboardKey>
    </div>
  ),
}

export const AsChild: Story = {
  args: {},
  render: () => (
    <div className="flex gap-2">
      <KeyboardKey asChild>
        <span>Custom Span</span>
      </KeyboardKey>
      <KeyboardKey asChild>
        <code>Code Element</code>
      </KeyboardKey>
    </div>
  ),
}

export const InteractiveExample: Story = {
  args: {},
  render: () => (
    <div className="space-y-4 p-6 border rounded-lg">
      <h3 className="text-lg font-semibold">Keyboard Navigation Help</h3>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <KeyboardKey keyName="tab" size="sm" />
          <span>Navigate between elements</span>
        </div>
        <div className="flex items-center gap-2">
          <KeyboardKey keyName="enter" size="sm" />
          <span>Activate selected element</span>
        </div>
        <div className="flex items-center gap-2">
          <KeyboardKey keyName="esc" size="sm" />
          <span>Close dialog or cancel action</span>
        </div>
        <div className="flex items-center gap-2">
          <KeyboardKey keyName="space" size="sm" />
          <span>Toggle checkbox or button</span>
        </div>
        <div className="flex items-center gap-2">
          <KeyboardKey keyName="up" size="sm" />
          <KeyboardKey keyName="down" size="sm" />
          <span>Navigate list items</span>
        </div>
      </div>
    </div>
  ),
}

export const Playground: Story = {
  args: {
    children: 'K',
    size: 'md',
    variant: 'default',
    modifier: false,
    platformSpecific: true,
    asChild: false,
  },
}
