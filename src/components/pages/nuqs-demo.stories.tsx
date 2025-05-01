import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within, waitFor } from "@storybook/test";
import { NuqsInput } from "./nuqs-demo";

const meta: Meta<typeof NuqsInput> = {
  component: NuqsInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof NuqsInput>;

const withUrlCleanup = async (testFn: () => Promise<void>): Promise<void> => {
  const originalUrl = window.location.href;
  try {
    await testFn();
  } finally {
    // Restore the original URL state
    window.history.pushState({}, "", originalUrl);
  }
};

// Example where URL is predefined and should fill the input
export const WithDefault: Story = {
  args: {
    paramName: "q",
    defaultValue: "predefined search",
  },
  play: async ({ canvasElement }) => {
    await withUrlCleanup(async () => {
      const canvas = within(canvasElement);

      // Verify the input gets filled from the URL
      await waitFor(async () => {
        const input = canvas.getByRole("textbox");
        await expect(input).toHaveValue("predefined search");
        expect(window.location.search).not.toContain("q=predefined search");
      });
    });
  },
};

export const WithQueryParams: Story = {
  args: {
    paramName: "q",
  },
  play: async ({ canvasElement }) => {
    await withUrlCleanup(async () => {
      const url = new URL(window.location.href);
      url.searchParams.set("q", "Nenad was here!");
      window.history.pushState({}, "", url);

      const canvas = within(canvasElement);

      await waitFor(async () => {
        const input = canvas.getByRole("textbox");
        await expect(input).toHaveValue("Nenad was here!");
      });
    });
  },
};

// Example with typing and keyboard shortcuts - typing one letter at a time
export const InteractiveTyping: Story = {
  args: {
    paramName: "search",
  },
  play: async ({ canvasElement }) => {
    await withUrlCleanup(async () => {
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

      await userEvent.type(input, "e", { delay: 30 });
      await waitFor(() => {
        expect(input).toHaveValue("he");
        expect(window.location.search).toContain("search=he");
      });

      await userEvent.type(input, "lo", { delay: 60 });
      await waitFor(() => {
        expect(input).toHaveValue("helo");
        expect(window.location.search).toContain("search=helo");
      });

      await userEvent.type(input, "{backspace}");
      await userEvent.type(input, "{backspace}", { delay: 30 });
      await userEvent.type(input, "{backspace}", { delay: 40 });
      await userEvent.type(input, "{backspace}", { delay: 20 });

      // Wait for URL parameter to be removed
      await waitFor(() => {
        expect(input).toHaveValue("");
        const search = window.location.search;
        return search === "" || !search.includes("search=");
      });
    });
  },
};
