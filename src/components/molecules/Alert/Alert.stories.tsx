import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";
import { AlertCircle, Info, Terminal, CheckCircle2 } from "lucide-react";

import { Alert, AlertTitle, AlertDescription } from "./Alert";

const meta = {
  component: Alert,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic alert with title and description
export const Default: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Alert Title</AlertTitle>
      <AlertDescription>
        This is a standard alert with title and description.
      </AlertDescription>
    </Alert>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify alert role and structure
    const alert = canvas.getByRole("alert");
    await expect(alert).toHaveAttribute("data-slot", "alert");

    // Check title and description
    const title = canvas.getByText("Alert Title");
    await expect(title).toHaveAttribute("data-slot", "alert-title");

    const description = canvas.getByText(/This is a standard alert/);
    await expect(description).toHaveAttribute("data-slot", "alert-description");
  },
};

// Destructive alert variant
export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertCircle />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please sign in again.
      </AlertDescription>
    </Alert>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify alert has the destructive variant
    const alert = canvas.getByRole("alert");
    const alertClasses = alert.className;
    await expect(alertClasses).toContain("text-destructive");

    // Check for icon, title and description
    const title = canvas.getByText("Error");
    await expect(title).toBeInTheDocument();

    const description = canvas.getByText(/Your session has expired/);
    await expect(description).toBeInTheDocument();

    // Check for the SVG icon
    const svg = alert.querySelector("svg");
    await expect(svg).not.toBeNull();
  },
};

// Alert with an info icon
export const WithInfoIcon: Story = {
  render: () => (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        Updates were recently applied to your account.
      </AlertDescription>
    </Alert>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify alert has the correct grid structure for icon
    const alert = canvas.getByRole("alert");
    const computedStyle = window.getComputedStyle(alert);

    // Check if the icon affects the grid layout
    await expect(computedStyle.gridTemplateColumns).not.toBe("0 1fr");

    // Verify icon, title and description
    const title = canvas.getByText("Information");
    await expect(title).toHaveClass("col-start-2");

    const description = canvas.getByText(/Updates were recently applied/);
    await expect(description).toHaveClass("col-start-2");
  },
};

// Alert with only title (no description)
export const TitleOnly: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Alert with title only</AlertTitle>
    </Alert>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify alert structure
    const alert = canvas.getByRole("alert");
    await expect(alert).toBeInTheDocument();

    // Check title exists
    const title = canvas.getByText("Alert with title only");
    await expect(title).toBeInTheDocument();

    // Ensure no description is present
    const description = alert.querySelector('[data-slot="alert-description"]');
    await expect(description).toBeNull();
  },
};

// Alert with only description (no title)
export const DescriptionOnly: Story = {
  render: () => (
    <Alert>
      <AlertDescription>This alert has only a description.</AlertDescription>
    </Alert>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify alert structure
    const alert = canvas.getByRole("alert");
    await expect(alert).toBeInTheDocument();

    // Check description exists
    const description = canvas.getByText("This alert has only a description.");
    await expect(description).toBeInTheDocument();

    // Ensure no title is present
    const title = alert.querySelector('[data-slot="alert-title"]');
    await expect(title).toBeNull();
  },
};

// Command/Terminal style alert
export const CommandAlert: Story = {
  render: () => (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Command</AlertTitle>
      <AlertDescription>
        <code>npm install @shadcn/ui</code>
      </AlertDescription>
    </Alert>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify alert structure
    const alert = canvas.getByRole("alert");
    await expect(alert).toBeInTheDocument();

    // Check code element within description
    const codeElement = canvas.getByText("npm install @shadcn/ui");
    await expect(codeElement.tagName.toLowerCase()).toBe("code");

    // Check title and icon are present
    const title = canvas.getByText("Command");
    await expect(title).toBeInTheDocument();

    const svg = alert.querySelector("svg");
    await expect(svg).not.toBeNull();
  },
};

// Success alert with CheckCircle icon
export const SuccessAlert: Story = {
  render: () => (
    <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription className="text-green-700 dark:text-green-300">
        Your changes have been saved successfully.
      </AlertDescription>
    </Alert>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify alert has custom styling
    const alert = canvas.getByRole("alert");
    const alertClasses = alert.className;
    await expect(alertClasses).toContain("bg-green-50");

    // Check title, description and icon
    const title = canvas.getByText("Success");
    await expect(title).toBeInTheDocument();

    const description = canvas.getByText(/Your changes have been saved/);
    await expect(description).toHaveClass("text-green-700");

    const svg = alert.querySelector("svg");
    await expect(svg).not.toBeNull();
  },
};
