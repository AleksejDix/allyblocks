// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/test";
import { Plus } from "lucide-react";
import { expect } from "@storybook/test";

import { Button } from "./button";

// Constants for button sizes
const BUTTON_SIZES = {
  sm: "32px",
  default: "36px",
  lg: "40px",
  icon: "36px",
};

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    asChild: {
      control: "boolean",
      defaultValue: false,
    },
    className: {
      control: "text",
    },
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: {
      control: "boolean",
      defaultValue: false,
    },
  },
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A customizable button component with various styles and sizes",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Children: Story = {
  parameters: {
    docs: {
      description: {
        story: "Tests that the Button component can render children correctly.",
      },
    },
  },
  args: {
    children: "Click me",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // Verify button is rendered
    await expect(button).toBeInTheDocument();
    // Verify button has some content (without specifying what that content is)
    await expect(button.textContent).toBeTruthy();
  },
};

export const AsChild: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates the polymorphic 'asChild' pattern that lets the Button component render any child element while maintaining button styling. Useful for creating styled links or custom interactive elements.",
      },
    },
  },
  args: {
    asChild: true,
    children: (
      <a href="#" onClick={(e) => e.preventDefault()}>
        Link
      </a>
    ),
  },
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link");

    // Assert initial state
    await expect(link).toBeInTheDocument();
    await expect(link.tagName).toBe("A");
    await expect(link).toHaveAttribute("href", "#");

    // Act - click the link (preventDefault is in the onClick prop)
    await userEvent.click(link);

    // Assert after interaction
    await expect(link).toHaveFocus();
  },
};

export const Icon: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Button optimized for displaying icons with equal width and height. Uses the 'icon' size variant for proper spacing and appearance.",
      },
    },
  },
  args: {
    size: "icon",
    children: <Plus />,
  },
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // Assert initial state
    await expect(button).toBeInTheDocument();
    await expect(button.firstChild?.nodeName).toBe("svg");

    // Act
    await userEvent.click(button);

    // Assert after interaction
    await expect(button).toHaveFocus();
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates a disabled button state with reduced opacity. Cannot be clicked or focused, visually indicating it's not interactive.",
      },
    },
  },
  args: {
    children: "Disabled Button",
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // Assert initial state
    await expect(button).toBeDisabled();
    await expect(button).not.toHaveFocus();

    // Act - try to focus programmatically
    button.focus();

    // Assert after attempted focus
    await expect(document.activeElement).not.toBe(button);
  },
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Showcases all available button style variants. Includes default (primary), destructive (for dangerous actions), outline, secondary, ghost (for low-emphasis actions), and link variants.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement);
    const defaultButton = canvas.getByRole("button", { name: "Default" });
    const destructiveButton = canvas.getByRole("button", {
      name: "Destructive",
    });
    const outlineButton = canvas.getByRole("button", { name: "Outline" });
    const secondaryButton = canvas.getByRole("button", { name: "Secondary" });
    const ghostButton = canvas.getByRole("button", { name: "Ghost" });
    const linkButton = canvas.getByRole("button", { name: "Link" });

    // Assert initial state - check styling
    await expect(defaultButton.className).toContain("bg-primary");
    await expect(destructiveButton.className).toContain("bg-destructive");
    await expect(outlineButton.className).toContain("border");
    await expect(secondaryButton.className).toContain("bg-secondary");
    await expect(ghostButton.className).toContain("hover:bg-accent");
    await expect(linkButton.className).toContain("underline-offset-4");

    // Act - keyboard navigation
    await userEvent.tab();

    // Assert focused state
    await expect(defaultButton).toHaveFocus();

    // Act - continue navigation
    await userEvent.tab();

    // Assert next focus
    await expect(destructiveButton).toHaveFocus();

    // Act - final tab
    await userEvent.tab();

    // Assert final focus
    await expect(outlineButton).toHaveFocus();
  },
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Displays all available button size options. Includes default (medium), small, large, and icon-specific sizing for various interface needs.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-end gap-4">
      <Button size="default">Default</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Plus />
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement);
    const defaultButton = canvas.getByRole("button", { name: "Default" });
    const smallButton = canvas.getByRole("button", { name: "Small" });
    const largeButton = canvas.getByRole("button", { name: "Large" });
    const iconButton = canvas.getByRole("button", { name: "" }); // Icon button has no text

    // Test actual computed heights
    const defaultHeight = window.getComputedStyle(defaultButton).height;
    const smallHeight = window.getComputedStyle(smallButton).height;
    const largeHeight = window.getComputedStyle(largeButton).height;
    const iconHeight = window.getComputedStyle(iconButton).height;
    const iconWidth = window.getComputedStyle(iconButton).width;

    // Check that heights are in ascending order: small < default < large
    await expect(parseInt(smallHeight)).toBeLessThan(parseInt(defaultHeight));
    await expect(parseInt(defaultHeight)).toBeLessThan(parseInt(largeHeight));

    // Check icon button has exactly equal height and width
    await expect(parseInt(iconHeight)).toEqual(parseInt(iconWidth));

    // Check exact pixel values
    await expect(parseInt(smallHeight)).toEqual(parseInt(BUTTON_SIZES.sm));
    await expect(parseInt(defaultHeight)).toEqual(
      parseInt(BUTTON_SIZES.default)
    );
    await expect(parseInt(largeHeight)).toEqual(parseInt(BUTTON_SIZES.lg));
    await expect(parseInt(iconHeight)).toEqual(parseInt(BUTTON_SIZES.icon));
  },
};

export const KeyboardAccessibility: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates proper keyboard navigation and accessibility features. Shows how users can navigate between buttons using Tab and activate them with Enter or Space, following WCAG accessibility guidelines.",
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <div>
        <p>Press Tab to navigate between buttons</p>
        <p>Press Enter or Space to activate buttons</p>
      </div>
      <div className="flex gap-4">
        <Button>First Button</Button>
        <Button>Second Button</Button>
        <Button>Third Button</Button>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement);
    const firstButton = canvas.getByRole("button", { name: "First Button" });
    const secondButton = canvas.getByRole("button", { name: "Second Button" });
    const thirdButton = canvas.getByRole("button", { name: "Third Button" });

    // Assert initial state
    await expect(firstButton).not.toHaveFocus();
    await expect(secondButton).not.toHaveFocus();
    await expect(thirdButton).not.toHaveFocus();

    // Act - first tab
    await userEvent.tab();

    // Assert first focus
    await expect(firstButton).toHaveFocus();

    // Act - second tab
    await userEvent.tab();

    // Assert second focus
    await expect(secondButton).toHaveFocus();

    // Act - third tab
    await userEvent.tab();

    // Assert third focus
    await expect(thirdButton).toHaveFocus();

    // Act - press Enter
    await userEvent.keyboard("{Enter}");

    // Assert still focused after Enter
    await expect(thirdButton).toHaveFocus();

    // Act - press Space
    await userEvent.keyboard(" ");

    // Assert still focused after Space
    await expect(thirdButton).toHaveFocus();
  },
};
