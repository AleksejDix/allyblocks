import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within, waitFor } from "@storybook/test";
import { NuqsInput } from "./nuqs-demo";

const meta: Meta<typeof NuqsInput> = {
  title: "UI/NuqsInput",
  component: NuqsInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof NuqsInput>;

// Helper to dispatch URL change events that nuqs listens for
const notifyUrlChanged = () => {
  // Dispatch popstate event which nuqs listens for
  window.dispatchEvent(new PopStateEvent("popstate", { state: {} }));

  // Also dispatch our custom event that our component might be listening for
  document.dispatchEvent(new Event("nuqs:url-updated"));
};

// Example where URL is predefined and should fill the input
export const WithDefault: Story = {
  args: {
    paramName: "q",
    defaultValue: "predefined search",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify the input gets filled from the URL
    await waitFor(async () => {
      // Find the input field by role rather than testid
      const input = canvas.getByRole("textbox");
      await expect(input).toHaveValue("predefined search");
      expect(window.location.search).not.toContain("q=predefined search");
    });
  },
};

export const WithQueryParams: Story = {
  args: {
    paramName: "q",
  },
  play: async ({ canvasElement, args }) => {
    const originalUrl = new URL(window.location.href);
    const url = new URL(originalUrl);
    url.searchParams.set("q", "Nenad was here!");
    window.history.pushState({}, "", url);
    notifyUrlChanged();

    console.log(args, url);
    const canvas = within(canvasElement);

    // Verify the input gets filled from the URL
    await waitFor(async () => {
      // Find the input field by role rather than testid
      const input = canvas.getByRole("textbox");
      await expect(input).toHaveValue("Nenad was here!");
    });
  },
};

// Example with typing and keyboard shortcuts - typing one letter at a time
export const InteractiveTyping: Story = {
  args: {
    paramName: "search",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get input element
    const input = canvas.getByRole("textbox");

    // Make sure we start with a clean state
    await userEvent.clear(input);

    // Wait to ensure clear is applied
    await waitFor(() => {
      expect(input).toHaveValue("");
    });

    // Type one letter at a time with waits between
    await userEvent.type(input, "h");
    await waitFor(() => {
      expect(input).toHaveValue("h");
      expect(window.location.search).toContain("search=h");
    });

    await userEvent.type(input, "e");
    await waitFor(() => {
      expect(input).toHaveValue("he");
      expect(window.location.search).toContain("search=he");
    });

    await userEvent.type(input, "lo");
    await waitFor(() => {
      expect(input).toHaveValue("helo");
      expect(window.location.search).toContain("search=helo");
    });

    // Wait for URL parameter to be removed
    await waitFor(() => {
      expect(input).toHaveValue("");
      const search = window.location.search;
      return search === "" || !search.includes("search=");
    });
  },
};
