import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { expect, userEvent, waitFor, within, screen } from "@storybook/test";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/Select/Select";
import { Label } from "../Label";
import { Icon } from "@/components/atoms/Icon";

// Define meta using the explicit Meta type annotation
const meta: Meta<typeof Select> = {
  component: Select,
  tags: ["autodocs"],
  parameters: {
    nuqs: {
      disabled: true,
    },
  },
  argTypes: {
    defaultValue: {
      control: "text",
      description: "The default selected value",
    },
    disabled: {
      control: "boolean",
      description: "Whether the select is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether the select is required",
    },
  },
  // Add a base play function to verify component existence
  play: async ({ canvasElement }) => {
    await expect(canvasElement).not.toBeEmptyDOMElement();
  },
};

// Export the meta as a clear default export
export default meta;

// Define Story type
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selected, setSelected] = useState("");

    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>Toppings: {selected}</Label>
        <Select {...args} onValueChange={setSelected}>
          <SelectTrigger>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
              <SelectItem value="grape">Grape</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  },
  args: {
    defaultValue: "apple",
  },
  parameters: {
    docs: {
      description: {
        story: "Basic select with a group of fruit options.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectTrigger = canvas.getByRole("combobox");
    await expect(selectTrigger).toBeInTheDocument();

    await userEvent.click(selectTrigger);

    await waitFor(() => {
      const selectItem = screen.getByRole("option", { name: "Apple" });
      expect(selectItem).toBeInTheDocument();
    });
  },
};

export const Variants: Story = {
  render: () => {
    return (
      <div className="grid gap-8">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Default Variant</h3>
          <Select defaultValue="apple">
            <SelectTrigger variant="default">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Outline Variant</h3>
          <Select defaultValue="apple">
            <SelectTrigger variant="outline">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Ghost Variant</h3>
          <Select defaultValue="apple">
            <SelectTrigger variant="ghost">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Different variants of the SelectTrigger component.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div className="grid gap-8">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Small Size</h3>
          <Select defaultValue="apple">
            <SelectTrigger size="sm">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Medium Size (Default)</h3>
          <Select defaultValue="apple">
            <SelectTrigger size="md">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Large Size</h3>
          <Select defaultValue="apple">
            <SelectTrigger size="lg">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Different sizes of the SelectTrigger component.",
      },
    },
  },
};

export const Widths: Story = {
  render: () => {
    return (
      <div className="grid gap-8">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Auto Width (Default)</h3>
          <Select defaultValue="apple">
            <SelectTrigger width="auto">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Full Width</h3>
          <Select defaultValue="apple">
            <SelectTrigger width="full">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Different width configurations of the SelectTrigger component.",
      },
    },
  },
};

export const DestructiveItems: Story = {
  render: () => {
    return (
      <div className="w-full max-w-sm">
        <Select defaultValue="cancel">
          <SelectTrigger>
            <SelectValue placeholder="Select an action" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Actions</SelectLabel>
              <SelectItem value="save">Save changes</SelectItem>
              <SelectItem value="cancel">Cancel</SelectItem>
              <SelectItem value="archive">Archive</SelectItem>
              <SelectItem value="delete" variant="destructive">
                Delete permanently
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Using a destructive variant for critical action items.",
      },
    },
  },
};

export const WithPlaceholder: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selected, setSelected] = useState<string>("");

    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>Selected city: {selected || "None"}</Label>
        <Select onValueChange={setSelected}>
          <SelectTrigger>
            <SelectValue placeholder="Where do you live?" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Cities</SelectLabel>
              <SelectItem value="new-york">New York</SelectItem>
              <SelectItem value="london">London</SelectItem>
              <SelectItem value="tokyo">Tokyo</SelectItem>
              <SelectItem value="paris">Paris</SelectItem>
              <SelectItem value="sydney">Sydney</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Select with a descriptive placeholder that guides the user.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectTrigger = canvas.getByRole("combobox");

    // Verify placeholder text is visible
    expect(canvas.getByText("Where do you live?")).toBeInTheDocument();

    // Click to open the select
    await userEvent.click(selectTrigger);

    // Select an option
    await waitFor(() => {
      const selectItem = screen.getByRole("option", { name: "London" });
      expect(selectItem).toBeInTheDocument();
    });

    const londonOption = screen.getByRole("option", { name: "London" });
    await userEvent.click(londonOption);

    // Verify the placeholder is replaced with the selection
    await waitFor(() => {
      expect(canvas.queryByText("Where do you live?")).not.toBeInTheDocument();
      expect(canvas.getByText("London")).toBeInTheDocument();
    });
  },
};

export const WithIcons: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selected, setSelected] = useState<string>("");

    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>Weather: {selected || "Select weather"}</Label>
        <Select onValueChange={setSelected}>
          <SelectTrigger>
            <SelectValue placeholder="Select weather" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Weather Conditions</SelectLabel>
              <SelectItem value="sunny">
                <Icon name="sun" className="text-yellow-500" />
                Sunny
              </SelectItem>
              <SelectItem value="cloudy">
                <Icon name="cloud" className="text-gray-400" />
                Cloudy
              </SelectItem>
              <SelectItem value="rainy">
                <Icon name="umbrella" className="text-gray-400" />
                Rainy
              </SelectItem>
              <SelectItem value="snowy">
                <Icon name="snowflake" className="text-blue-400" />
                Snowy
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Select with icons in the options to provide visual cues.",
      },
    },
  },
};

export const WithGroupsAndSeparator: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger>
        <SelectValue placeholder="Select a food" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="spinach">Spinach</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  args: {
    defaultValue: "spinach",
  },
  parameters: {
    docs: {
      description: {
        story: "Select with multiple groups and a separator.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectTrigger = canvas.getByRole("combobox");
    await expect(selectTrigger).toBeInTheDocument();

    await userEvent.click(selectTrigger);

    await waitFor(() => {
      const selectItem = screen.getByRole("option", { name: "Spinach" });
      expect(selectItem).toHaveAttribute("aria-selected", "true");
    });
  },
};

export const DisabledOptions: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana" disabled>
          Banana (Unavailable)
        </SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="grape" disabled>
          Grape (Unavailable)
        </SelectItem>
      </SelectContent>
    </Select>
  ),
  args: {
    defaultValue: "orange",
  },
  parameters: {
    docs: {
      description: {
        story: "Select with some disabled options that cannot be selected.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectTrigger = canvas.getByRole("combobox");
    await expect(selectTrigger).toBeInTheDocument();

    await userEvent.click(selectTrigger);

    await waitFor(() => {
      const selectItem = screen.getByRole("option", { name: "Orange" });
      expect(selectItem).toBeInTheDocument();

      // Verify disabled items
      const disabledItem = screen.getByRole("option", {
        name: "Banana (Unavailable)",
      });
      expect(disabledItem).toHaveAttribute("aria-disabled", "true");
    });
  },
};

export const Disabled: Story = {
  render: (args) => (
    <Select {...args} disabled>
      <SelectTrigger>
        <SelectValue placeholder="Disabled select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
  args: {
    defaultValue: "option1",
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled select that cannot be interacted with.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectTrigger = canvas.getByRole("combobox");
    await expect(selectTrigger).toBeInTheDocument();
    expect(selectTrigger).toHaveAttribute("disabled");
  },
};

export const EmptyOptions: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger>
        <SelectValue placeholder="No options available" />
      </SelectTrigger>
      <SelectContent>
        <div className="flex h-12 items-center justify-center text-sm text-muted-foreground">
          No options available
        </div>
      </SelectContent>
    </Select>
  ),
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Select component with no options, showing a proper empty state message.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectTrigger = canvas.getByRole("combobox");
    await expect(selectTrigger).toBeInTheDocument();

    await userEvent.click(selectTrigger);

    // Verify that the content shows the empty state message
    await waitFor(() => {
      const content = screen.getByRole("listbox");
      expect(content).toBeInTheDocument();
      expect(content).toHaveTextContent("No options available");
    });
  },
};

export const KeyboardNavigation: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger>
        <SelectValue placeholder="Navigate with keyboard" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Planets</SelectLabel>
          <SelectItem value="mercury">Mercury</SelectItem>
          <SelectItem value="venus">Venus</SelectItem>
          <SelectItem value="earth">Earth</SelectItem>
          <SelectItem value="mars">Mars</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates keyboard accessibility: open with Enter/Space, navigate with arrow keys, select with Enter, close with Escape.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectTrigger = canvas.getByRole("combobox");

    await userEvent.keyboard("{Tab}");
    async function firstItemHasFocus() {
      await waitFor(() => {
        const content = screen.getByRole("listbox");
        expect(content).toBeVisible();
        const firstItem = screen.getByRole("option", { name: "Mercury" });
        expect(firstItem).toHaveFocus();
      });
    }

    async function triggerHasFocusAndListboxIsClosed() {
      await waitFor(() => {
        expect(selectTrigger).toHaveFocus();
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    }

    await triggerHasFocusAndListboxIsClosed();

    await userEvent.keyboard("{Enter}");

    await firstItemHasFocus();

    await userEvent.keyboard("{Escape}");

    await triggerHasFocusAndListboxIsClosed();

    await userEvent.keyboard("{Enter}");

    await firstItemHasFocus();

    await userEvent.keyboard("{Escape}");

    await triggerHasFocusAndListboxIsClosed();

    await userEvent.keyboard("{ArrowUp}");

    await firstItemHasFocus();

    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");

    await userEvent.keyboard("{Enter}");

    await waitFor(() => {
      expect(selectTrigger).toHaveTextContent("Mars");
    });
  },
};
