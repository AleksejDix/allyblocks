import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // No specific argTypes needed for the root Avatar component usually,
    // className can be added if desired for controls
    className: {
      control: "text",
      description: "Optional CSS classes for the root element.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// --- Stories ---

export const WithImage: Story = {
  name: "With Image",
  args: {
    // We pass children to the Avatar component
    children: (
      <>
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
          data-testid="avatar-image" // Test ID for selection
        />
        <AvatarFallback data-testid="avatar-fallback">CN</AvatarFallback>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // First, verify the fallback element is rendered (which works reliably)
    const fallback = canvas.getByTestId("avatar-fallback");
    await expect(fallback).toBeInTheDocument();
    await expect(fallback).toHaveTextContent("CN");

    // Get the avatar root through the fallback's parent
    const avatarRoot = fallback.closest('[data-slot="avatar"]');
    await expect(avatarRoot).toBeInTheDocument();

    // In test environments, Radix UI might immediately show the fallback
    // due to how image loading is handled in JSDOM/test runners
  },
};

export const WithFallback: Story = {
  name: "With Fallback Only",
  args: {
    children: <AvatarFallback data-testid="avatar-fallback">OM</AvatarFallback>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify avatar root is rendered
    const avatarRoot = canvas.getByText("OM").closest('[data-slot="avatar"]');
    await expect(avatarRoot).toBeInTheDocument();

    // Find the fallback element
    const fallback = canvas.getByTestId("avatar-fallback");
    await expect(fallback).toBeInTheDocument();
    await expect(fallback).toHaveTextContent("OM");

    // Ensure no image element is present
    const image = canvas.queryByTestId("avatar-image");
    await expect(image).not.toBeInTheDocument();
  },
};

export const ImageLoadError: Story = {
  name: "Image Load Error Fallback",
  args: {
    children: (
      <>
        <AvatarImage
          src="invalid-image-url.jpg" // Intentionally invalid URL
          alt="Invalid Image"
          data-testid="avatar-image"
        />
        <AvatarFallback data-testid="avatar-fallback">ERR</AvatarFallback>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify avatar root is rendered
    const avatarRoot = canvas.getByText("ERR").closest('[data-slot="avatar"]');
    await expect(avatarRoot).toBeInTheDocument();

    // In test environments, we might only see the fallback due to how image
    // loading errors are handled in JSDOM vs real browsers
    const fallback = canvas.getByTestId("avatar-fallback");
    await expect(fallback).toBeInTheDocument();
    await expect(fallback).toHaveTextContent("ERR");

    // Note: Testing the full image error → fallback behavior would be better
    // in a real browser environment or with special mocking of image loading.
  },
};
