import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";
import { within, expect } from "@storybook/test";

const meta: Meta<typeof Icon> = {
  component: Icon,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A dynamic icon component that renders Lucide icons by name.

## Usage

\`\`\`tsx
import { Icon } from "@/components/atoms/Icon";

// Basic usage
<Icon name="check" />

// With custom size and color
<Icon name="check" size={24} color="red" />
\`\`\`

## Available Icons

This component uses [Lucide Icons](https://lucide.dev/icons), a beautiful and consistent icon set. You can browse all available icons on their website.

### Common Icon Names
- \`check\` - Checkmark
- \`x\` - X mark
- \`plus\` - Plus sign
- \`minus\` - Minus sign
- \`search\` - Search/magnifying glass
- \`user\` - User profile
- \`settings\` - Settings/gear
- \`mail\` - Email/envelope
- \`arrow-right\` - Right arrow
- \`arrow-left\` - Left arrow
- \`chevron-down\` - Down chevron
- \`chevron-up\` - Up chevron

For a complete list of available icons, visit [lucide.dev/icons](https://lucide.dev/icons).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| name | string | - | Name of the Lucide icon to display |
| size | number | 24 | Size of the icon in pixels |
| color | string | - | Color of the icon (any valid CSS color) |
| strokeWidth | number | 2 | Width of the icon stroke |
| className | string | - | Additional CSS classes |
| ...props | LucideProps | - | All other Lucide icon props |

## Accessibility

The Icon component automatically includes the appropriate ARIA attributes for accessibility. Icons are rendered as \`<svg>\` elements with the \`role="img"\` attribute.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: ["check", "x", "plus", "minus", "search", "user", "settings", "mail"],
      description: "The name of the Lucide icon to display. See [lucide.dev/icons](https://lucide.dev/icons) for all available icons.",
    },
    size: {
      control: "number",
      description: "The size of the icon in pixels",
      defaultValue: 24,
    },
    color: {
      control: "color",
      description: "The color of the icon",
    },
    strokeWidth: {
      control: "number",
      description: "The width of the icon stroke",
      defaultValue: 2,
    },
  },
  args: {
    name: "check",
    size: 24,
    strokeWidth: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("img")).toBeInTheDocument();
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: "check",
  },
};

export const DifferentSize: Story = {
  args: {
    name: "check",
    size: 32,
  },
};

export const DifferentColor: Story = {
  args: {
    name: "check",
    color: "red",
  },
};

export const DifferentStrokeWidth: Story = {
  args: {
    name: "check",
    strokeWidth: 3,
  },
};

export const DifferentIcons: Story = {
  render: () => (
    <div className="flex gap-4">
      <Icon name="check" />
      <Icon name="x" />
      <Icon name="plus" />
      <Icon name="minus" />
      <Icon name="search" />
      <Icon name="user" />
      <Icon name="settings" />
      <Icon name="mail" />
    </div>
  ),
};
