import type { Meta, StoryObj } from "@storybook/react";
import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateAction,
} from "./EmptyState";
import { Button } from "@/components/atoms/Button";

const meta: Meta<typeof EmptyState> = {
  component: EmptyState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  render: (args) => (
    <EmptyState {...args}>
      <EmptyStateTitle>No results found</EmptyStateTitle>
      <EmptyStateDescription>
        Try adjusting your search or filter to find what you're looking for.
      </EmptyStateDescription>
    </EmptyState>
  ),
};

export const WithIcon: Story = {
  render: (args) => (
    <EmptyState {...args}>
      <EmptyStateIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
          <line x1="9" x2="9.01" y1="9" y2="9" />
          <line x1="15" x2="15.01" y1="9" y2="9" />
        </svg>
      </EmptyStateIcon>
      <EmptyStateTitle>No results found</EmptyStateTitle>
      <EmptyStateDescription>
        Try adjusting your search or filter to find what you're looking for.
      </EmptyStateDescription>
    </EmptyState>
  ),
};

export const WithAction: Story = {
  render: (args) => (
    <EmptyState {...args}>
      <EmptyStateTitle>No results found</EmptyStateTitle>
      <EmptyStateDescription>
        Try adjusting your search or filter to find what you're looking for.
      </EmptyStateDescription>
      <EmptyStateAction>
        <Button>Retry</Button>
      </EmptyStateAction>
    </EmptyState>
  ),
};

export const Error404: Story = {
  render: (args) => (
    <EmptyState variant="card" size="lg" {...args}>
      <EmptyStateIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-12"
        >
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
          <path d="M13 2v7h7" />
          <path d="m10.5 10.5-2 2 2 2" />
          <path d="m13.5 10.5 2 2-2 2" />
        </svg>
      </EmptyStateIcon>
      <EmptyStateTitle>404 - Page not found</EmptyStateTitle>
      <EmptyStateDescription>
        The page you're looking for doesn't exist or has been moved.
      </EmptyStateDescription>
      <EmptyStateAction>
        <Button>Go back home</Button>
      </EmptyStateAction>
    </EmptyState>
  ),
};

export const NoData: Story = {
  render: (args) => (
    <EmptyState {...args}>
      <EmptyStateIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-12"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.29 7 12 12 20.71 7" />
          <line x1="12" x2="12" y1="22" y2="12" />
        </svg>
      </EmptyStateIcon>
      <EmptyStateTitle>No data available</EmptyStateTitle>
      <EmptyStateDescription>
        There is no data to display at this time.
      </EmptyStateDescription>
      <EmptyStateAction>
        <Button variant="outline">Refresh</Button>
      </EmptyStateAction>
    </EmptyState>
  ),
};

export const Card: Story = {
  render: (args) => (
    <EmptyState variant="card" {...args}>
      <EmptyStateIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-12"
        >
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
      </EmptyStateIcon>
      <EmptyStateTitle>No notifications</EmptyStateTitle>
      <EmptyStateDescription>
        You don't have any notifications at this time.
      </EmptyStateDescription>
    </EmptyState>
  ),
};

export const Compact: Story = {
  render: (args) => (
    <EmptyState size="sm" {...args}>
      <EmptyStateIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-8"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </EmptyStateIcon>
      <EmptyStateTitle>No results</EmptyStateTitle>
      <EmptyStateDescription>
        Try changing your search term.
      </EmptyStateDescription>
    </EmptyState>
  ),
};
