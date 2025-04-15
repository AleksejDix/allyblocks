import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A responsive card component with flexible layout options for displaying content in a contained format. For more information, see the [shadcn UI Card documentation](https://ui.shadcn.com/docs/components/card).",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

// Basic card with content
export const Basic: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent>
        This is a basic card with just some content inside.
      </CardContent>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify content is rendered
    const content = canvas.getByText(
      "This is a basic card with just some content inside."
    );
    await expect(content).toBeInTheDocument();
  },
};

// Complete card with all components
export const Complete: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          This is the card description that provides additional context.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          This is the main content area of the card where the primary
          information is displayed.
        </p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Last updated: 2 hours ago
        </p>
      </CardFooter>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all content is present
    const title = canvas.getByText("Card Title");
    await expect(title).toBeInTheDocument();

    const description = canvas.getByText(
      "This is the card description that provides additional context."
    );
    await expect(description).toBeInTheDocument();

    const content = canvas.getByText(
      "This is the main content area of the card where the primary information is displayed."
    );
    await expect(content).toBeInTheDocument();

    const footer = canvas.getByText("Last updated: 2 hours ago");
    await expect(footer).toBeInTheDocument();
  },
};

// Card with border
export const WithBorder: Story = {
  render: () => (
    <Card className="w-[350px] border-primary">
      <CardHeader>
        <CardTitle>Featured Content</CardTitle>
        <CardDescription>Highlighted information</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card has a custom border color to draw attention to it.</p>
      </CardContent>
      <CardFooter>
        <a
          href="#"
          className="text-sm font-medium text-primary hover:underline"
        >
          Learn more →
        </a>
      </CardFooter>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify content is present
    const title = canvas.getByText("Featured Content");
    await expect(title).toBeInTheDocument();

    const content = canvas.getByText(
      "This card has a custom border color to draw attention to it."
    );
    await expect(content).toBeInTheDocument();

    const link = canvas.getByText(/Learn more/);
    await expect(link).toBeInTheDocument();
    await expect(link).toHaveAttribute("href", "#");
  },
};
