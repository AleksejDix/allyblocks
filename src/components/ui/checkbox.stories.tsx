import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/test";
import { expect } from "@storybook/test";
import React from "react";
import { useTranslation } from "react-i18next";

import { Checkbox } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  argTypes: {
    checked: {
      control: "select",
      options: [true, false, "indeterminate"],
      defaultValue: false,
    },
    disabled: {
      control: "boolean",
      defaultValue: false,
    },
    className: {
      control: "text",
    },
  },
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "A customizable checkbox component with various states",
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: "button-name",
            enabled: false,
          },
        ],
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Tests that the Checkbox component renders correctly in its default state.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    // Verify checkbox is rendered
    await expect(checkbox).toBeInTheDocument();
    // Should be unchecked by default
    await expect(checkbox).not.toBeChecked();
  },
};

export const Indeterminate: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Interactive checkbox that cycles through indeterminate, checked, and unchecked states.",
      },
    },
  },
  render: function Render() {
    const [state, setState] = React.useState<"indeterminate" | boolean>(
      "indeterminate"
    );

    const { t } = useTranslation();

    const handleChange = () => {
      if (state === "indeterminate") {
        setState(true);
      } else if (state === true) {
        setState(false);
      } else {
        setState("indeterminate");
      }
    };

    return (
      <div className="flex items-center gap-2">
        <Checkbox checked={state} onCheckedChange={handleChange} />
        <span className="text-sm font-medium">{t("hello")}</span>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    // Verify checkbox is rendered with indeterminate state initially
    await expect(checkbox).toBeInTheDocument();
    await expect(checkbox).toHaveAttribute("aria-checked", "mixed");

    // Test that clicking changes it to checked state
    await userEvent.click(checkbox);
    await expect(checkbox).toHaveAttribute("aria-checked", "true");

    // Test that clicking again changes it to unchecked state
    await userEvent.click(checkbox);
    await expect(checkbox).toHaveAttribute("aria-checked", "false");

    // Test that clicking once more returns to indeterminate state
    await userEvent.click(checkbox);
    await expect(checkbox).toHaveAttribute("aria-checked", "mixed");
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tests that the Checkbox component can be rendered in a checked state.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    // Verify checkbox is rendered and checked
    await expect(checkbox).toBeInTheDocument();
    await expect(checkbox).toBeChecked();
  },
};

export const UncheckedDisabled: Story = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tests that the Checkbox component can be disabled, preventing user interaction.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    // Verify checkbox is rendered and disabled
    await expect(checkbox).toBeInTheDocument();
    await expect(checkbox).toBeDisabled();

    // Attempt to click and verify it remains unchecked
    await userEvent.click(checkbox);
    await expect(checkbox).not.toBeChecked();
  },
};

export const CheckedDisabled: Story = {
  args: {
    disabled: true,
    checked: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tests that the Checkbox component can be both checked and disabled simultaneously.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    // Verify checkbox is rendered, checked, and disabled
    await expect(checkbox).toBeInTheDocument();
    await expect(checkbox).toBeChecked();
    await expect(checkbox).toBeDisabled();
  },
};

export const IndeterminateDisabled: Story = {
  args: {
    disabled: true,
    checked: "indeterminate",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tests that the Checkbox component can be both indeterminate and disabled simultaneously.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    // Verify checkbox is rendered, checked, and disabled
    await expect(checkbox).toBeInTheDocument();
    await expect(checkbox).toHaveAttribute("aria-checked", "mixed");
    await expect(checkbox).toBeDisabled();
  },
};

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Tests that the Checkbox component can be toggled through user interaction.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    // Verify checkbox is rendered and initially unchecked
    await expect(checkbox).toBeInTheDocument();
    await expect(checkbox).not.toBeChecked();

    // Click to check
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();

    // Click to uncheck
    await userEvent.click(checkbox);
    await expect(checkbox).not.toBeChecked();
  },
};

export const KeyboardAccessibility: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Tests that the Checkbox component is keyboard accessible, following WCAG guidelines.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    // Verify checkbox is rendered and initially unchecked
    await expect(checkbox).toBeInTheDocument();
    await expect(checkbox).not.toBeChecked();

    // Focus with keyboard
    await userEvent.tab();
    await expect(checkbox).toHaveFocus();

    // Toggle with space key
    await userEvent.keyboard(" ");
    await expect(checkbox).toBeChecked();

    // Toggle again
    await userEvent.keyboard(" ");
    await expect(checkbox).not.toBeChecked();
  },
};
