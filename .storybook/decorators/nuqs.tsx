import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NuqsAdapter } from "nuqs/adapters/react-router";

// Interface for nuqs parameters
interface NuqsParams {
  disabled?: boolean;
  searchParams?: Record<string, string>;
}

// Enhanced decorator for nuqs with react-router that supports initial URL parameters
export const withNuqs = (
  Story: React.ComponentType,
  context: { parameters?: { nuqs?: NuqsParams } }
) => {
  // Get nuqs parameters or set defaults
  const nuqsParams = context.parameters?.nuqs || {};
  const { disabled = false } = nuqsParams;

  // If nuqs is disabled, render the story directly
  if (disabled) {
    return <Story />;
  }

  // Create router with initial URL
  const router = createBrowserRouter([
    {
      path: "*",
      element: <Story />,
    },
  ]);

  return (
    <NuqsAdapter>
      <RouterProvider router={router} />
    </NuqsAdapter>
  );
};
