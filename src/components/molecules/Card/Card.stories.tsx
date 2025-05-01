import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";
import { Plus, Share } from "lucide-react";

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "./Card";
import { Button } from "@/components/atoms/Button";
import { ButtonGroup } from "../ButtonGroup";

const meta: Meta<typeof Card> = {
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
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
        <ButtonGroup>
          <Button variant="secondary" asChild>
            <a
              href="#"
              >
              Learn more →
            </a>
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
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


export const WithImage: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Featured Content</CardTitle>
        <CardDescription>Highlighted information</CardDescription>
      </CardHeader>
      <CardContent>
        <img src="https://placehold.co/600x400" alt="Featured Content" />
      </CardContent>
    </Card>
  ),
};


export const WithFooterActions: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Featured Content</CardTitle>
        <CardDescription>Highlighted information</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card has a custom border color to draw attention to it.</p>
      </CardContent>
      <CardFooter>
        <ButtonGroup>
          <Button>Action 1</Button>
          <Button>Action 2</Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  ),
};


export const WithHeaderActions: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Featured Content</CardTitle>
        <CardDescription>Highlighted information</CardDescription>
        <CardAction>
          <ButtonGroup>
            <Button size="icon" variant="ghost">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add item</span>
            </Button>
            <Button size="icon" variant="ghost">
              <Share className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
          </ButtonGroup>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>This card has a custom border color to draw attention to it.</p>
      </CardContent>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify content is present
    const title = canvas.getByText("Featured Content");
    await expect(title).toBeInTheDocument();
    
    // Verify buttons are present
    const addButton = canvas.getByLabelText("Add item");
    const shareButton = canvas.getByLabelText("Share");
    await expect(addButton).toBeInTheDocument();
    await expect(shareButton).toBeInTheDocument();
  },
};