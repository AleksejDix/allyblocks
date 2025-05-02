import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";
import { userEvent } from "@storybook/test";

import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  // Global play function for all textarea stories
  play: async ({ canvasElement }) => {
    // Verify the component renders something
    await expect(canvasElement).not.toBeEmptyDOMElement();
  },
};
export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
  parameters: {
    docs: {
      description: {
        story: "Default textarea with placeholder.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText("Enter text...");

    // Test typing behavior
    await userEvent.type(textarea, "Hello, world!");
    await expect(textarea).toHaveValue("Hello, world!");
  },
};

export const WithInitialValue: Story = {
  args: {
    defaultValue: "This is some initial text in the textarea.",
    placeholder: "Enter text...",
  },
  parameters: {
    docs: {
      description: {
        story: "Textarea with initial content.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText("Enter text...");
    await expect(textarea).toHaveValue(
      "This is some initial text in the textarea."
    );
  },
};

export const WithRowsAndCols: Story = {
  args: {
    placeholder: "This textarea has custom dimensions...",
    rows: 8,
    cols: 40,
  },
  parameters: {
    docs: {
      description: {
        story: "Textarea with custom rows and columns.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText(
      "This textarea has custom dimensions..."
    );
    await expect(textarea).toHaveAttribute("rows", "8");
    await expect(textarea).toHaveAttribute("cols", "40");
  },
};

export const NonResizable: Story = {
  args: {
    placeholder: "This textarea cannot be resized...",
    className: "resize-none",
  },
  parameters: {
    docs: {
      description: {
        story: "Textarea that cannot be resized by the user.",
      },
    },
  },
  // Visual verification only
};

export const ResizeVertical: Story = {
  args: {
    placeholder: "This textarea can only be resized vertically...",
    className: "resize-y",
  },
  parameters: {
    docs: {
      description: {
        story: "Textarea that can only be resized vertically.",
      },
    },
  },
  // Visual verification only
};

export const Disabled: Story = {
  args: {
    placeholder: "This textarea is disabled",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled textarea that cannot be interacted with.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText("This textarea is disabled");
    await expect(textarea).toBeDisabled();
  },
};

export const Invalid: Story = {
  args: {
    placeholder: "Invalid textarea",
    "aria-invalid": true,
  },
  parameters: {
    docs: {
      description: {
        story: "Textarea in an error state, indicated by red outline.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText("Invalid textarea");
    await expect(textarea).toHaveAttribute("aria-invalid", "true");
  },
};

export const WithMaxLength: Story = {
  args: {
    placeholder: "This textarea has a character limit...",
    maxLength: 50,
  },
  parameters: {
    docs: {
      description: {
        story: "Textarea with a maximum character limit of 50.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText(
      "This textarea has a character limit..."
    );
    await expect(textarea).toHaveAttribute("maxlength", "50");

    // Try typing a long string and verify it gets truncated
    const longText =
      "This is a very long text that should exceed the maximum length of 50 characters set on this textarea element.";
    await userEvent.type(textarea, longText);
    await expect(textarea).toHaveValue(longText.substring(0, 50));
  },
};

export const ReadOnly: Story = {
  args: {
    defaultValue:
      "This content cannot be edited because the textarea is read-only.",
    readOnly: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Read-only textarea that displays content but cannot be edited.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByDisplayValue(
      "This content cannot be edited because the textarea is read-only."
    );
    await expect(textarea).toHaveAttribute("readonly");

    // Try typing and verify the value doesn't change
    await userEvent.type(textarea, "Attempting to add text");
    await expect(textarea).toHaveValue(
      "This content cannot be edited because the textarea is read-only."
    );
  },
};
