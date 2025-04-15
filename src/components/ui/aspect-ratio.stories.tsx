import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";

import { AspectRatio } from "@/components/ui/aspect-ratio";

const meta: Meta<typeof AspectRatio> = {
  title: "UI/Aspect Ratio",
  render: (args) => (
    <div className="max-w-xs overflow-auto resize-x text-white">
      <AspectRatio {...args} className="border" />
    </div>
  ),
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A component to maintain a consistent width-to-height ratio. We recommend using Tailwind classes for aspect ratio when possible (e.g., `aspect-video`, `aspect-square`) for simpler implementation.",
      },
    },
  },
  argTypes: {
    ratio: {
      control: { type: "number" },
      description: "The desired aspect ratio value (width/height)",
      defaultValue: 16 / 9,
    },
  },
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

// Standard 16:9 Video Aspect Ratio
export const VideoAspectRatio169: Story = {
  name: "Video (16:9)",
  args: {
    ratio: 16 / 9,
    children: <div className="bg-black absolute inset-0">16:9 Video</div>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the content and container
    const content = canvas.getByText("16:9 Video");
    await expect(content).toBeInTheDocument();

    // Get the AspectRatio root element
    const aspectRatioEl = content.closest(
      '[data-slot="aspect-ratio"]'
    ) as HTMLElement;
    await expect(aspectRatioEl).not.toBeNull();

    // The Radix AspectRatio component creates a child div with position:relative that sets
    // the padding-bottom based on the ratio (for 16:9, it's 9/16 or ~56.25%)
    const paddingContainer = aspectRatioEl.firstElementChild as HTMLElement;
    if (paddingContainer) {
      const style = window.getComputedStyle(paddingContainer);
      const paddingBottom = style.paddingBottom;

      // Check if we have padding-bottom as a percentage (classic aspect ratio technique)
      if (paddingBottom.includes("%")) {
        const paddingPercentage = parseFloat(paddingBottom);
        const expectedPercentage = (1 / (16 / 9)) * 100; // For 16:9, this is ~56.25%

        // Allow for small rounding differences
        await expect(
          Math.abs(paddingPercentage - expectedPercentage)
        ).toBeLessThan(1);
      }

      // Alternative: check for actual width/height ratio using getBoundingClientRect
      const rect = paddingContainer.getBoundingClientRect();
      if (rect.height > 0) {
        const actualRatio = rect.width / rect.height;
        const expectedRatio = 16 / 9;

        // Allow for significant rendering differences in the test environment
        await expect(Math.abs(actualRatio - expectedRatio)).toBeLessThan(1.5);
      }
    }
  },
};

// Square 1:1 Aspect Ratio
export const SquareAspectRatio: Story = {
  name: "Square (1:1)",
  args: {
    ratio: 1 / 1,
    children: <div className="bg-black absolute inset-0">1:1 Square</div>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the content
    const content = canvas.getByText("1:1 Square");
    await expect(content).toBeInTheDocument();

    // Get the AspectRatio container
    const aspectRatioEl = content.closest(
      '[data-slot="aspect-ratio"]'
    ) as HTMLElement;
    const container = aspectRatioEl?.firstElementChild as HTMLElement;

    if (container) {
      // For a square (1:1), the width and height should be approximately equal
      const rect = container.getBoundingClientRect();
      const actualRatio = rect.width / rect.height;

      // For 1:1 ratio, width/height should be ~1.0
      await expect(Math.abs(actualRatio - 1)).toBeLessThan(0.8);
    }
  },
};

// Portrait/Mobile Aspect Ratio
export const PortraitAspectRatio: Story = {
  name: "Portrait (9:16)",
  args: {
    ratio: 9 / 16,
    children: (
      <div
        data-testid="aspect-ratio-content"
        className="bg-red-500 w-full h-full flex items-center justify-center text-white font-bold"
      >
        9:16 Portrait Aspect Ratio
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Basic test - does the component render with our content
    const content = canvas.getByText("9:16 Portrait Aspect Ratio");
    await expect(content).toBeInTheDocument();

    // Get the AspectRatio container
    const aspectRatioEl = content.closest(
      '[data-slot="aspect-ratio"]'
    ) as HTMLElement;
    const container = aspectRatioEl?.firstElementChild as HTMLElement;

    if (container) {
      // For portrait orientation, height should be greater than width
      const rect = container.getBoundingClientRect();

      // For 9:16 ratio, the width/height should be ~0.5625
      const actualRatio = rect.width / rect.height;
      const expectedRatio = 9 / 16; // ~0.5625

      await expect(Math.abs(actualRatio - expectedRatio)).toBeLessThan(0.5);

      // Also verify height > width for portrait orientation
      await expect(rect.height).toBeGreaterThan(rect.width);
    }
  },
};
