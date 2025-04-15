import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import React from "react";
import { useTranslation } from "react-i18next";

import { Checkbox } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
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
    const checkbox = canvas.getByRole("checkbox", { hidden: true });

    // Verify checkbox is unchecked by default
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

    const handleChange = React.useCallback(() => {
      if (state === "indeterminate") {
        setState(true);
      } else if (state === true) {
        setState(false);
      } else {
        setState("indeterminate");
      }
    }, [state]);

    return (
      <div className="flex items-center gap-2">
        <Checkbox
          checked={state}
          onCheckedChange={handleChange}
          data-testid="indeterminate-checkbox"
        />
        <span className="text-sm font-medium">{t("hello")}</span>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByTestId("indeterminate-checkbox");

    // Test initial indeterminate state
    await expect(checkbox).toHaveAttribute("aria-checked", "mixed");

    // Test state cycling
    await userEvent.click(checkbox);
    await expect(checkbox).toHaveAttribute("aria-checked", "true");

    await userEvent.click(checkbox);
    await expect(checkbox).toHaveAttribute("aria-checked", "false");

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
    const checkbox = canvas.getByRole("checkbox", { hidden: true });

    // Verify checkbox is checked
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
    const checkbox = canvas.getByRole("checkbox", { hidden: true });

    // Verify checkbox is disabled
    await expect(checkbox).toBeDisabled();

    // Verify it remains unchecked when clicked
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
    const checkbox = canvas.getByRole("checkbox", { hidden: true });

    // Verify checkbox is checked and disabled
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
    const checkbox = canvas.getByRole("checkbox", { hidden: true });

    // Verify checkbox is indeterminate and disabled
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
    const checkbox = canvas.getByRole("checkbox", { hidden: true });

    // Verify toggling behavior
    await expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();

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
    const checkbox = canvas.getByRole("checkbox", { hidden: true });

    // Initial state
    await expect(checkbox).not.toBeChecked();

    // Test keyboard navigation
    await userEvent.tab();
    await expect(checkbox).toHaveFocus();

    // Test keyboard toggling
    await userEvent.keyboard(" ");
    await expect(checkbox).toBeChecked();

    await userEvent.keyboard(" ");
    await expect(checkbox).not.toBeChecked();
  },
};
