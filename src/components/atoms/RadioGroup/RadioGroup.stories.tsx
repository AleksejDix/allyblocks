import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";
import { Label } from "@/components/atoms/Label";
import { useState } from "react";
import { Icon } from "@/components/atoms/Icon";

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup defaultValue="option-one" {...args}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="option-three" />
        <Label htmlFor="option-three">Option Three</Label>
      </div>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that there are three radio options
    const radioButtons = canvas.getAllByRole("radio");
    expect(radioButtons).toHaveLength(3);

    // Option one should be checked by default
    expect(radioButtons[0]).toBeChecked();

    // Click on option two
    await userEvent.click(radioButtons[1]);
    expect(radioButtons[1]).toBeChecked();
    expect(radioButtons[0]).not.toBeChecked();
  },
};

export const WithLabelsInline: Story = {
  render: (args) => (
    <RadioGroup defaultValue="inline-one" className="flex space-x-4" {...args}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="inline-one" id="inline-one" />
        <Label htmlFor="inline-one">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="inline-two" id="inline-two" />
        <Label htmlFor="inline-two">Option 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="inline-three" id="inline-three" />
        <Label htmlFor="inline-three">Option 3</Label>
      </div>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: "Radio group with horizontally aligned options",
      },
    },
  },
};

export const WithCustomIcons: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [os, setOs] = useState("mac");

    return (
      <div className="space-y-4">
        <div>Selected OS: {os}</div>
        <RadioGroup value={os} onValueChange={setOs} {...args}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="windows" id="windows" />
            <div className="flex items-center space-x-2">
              <Label htmlFor="windows">
                <Icon name="monitor" />
                Windows
              </Label>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mac" id="mac" />
            <div className="flex items-center space-x-2">
              <Label htmlFor="mac">
                <Icon name="laptop" />
                macOS
              </Label>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="linux" id="linux" />
            <div className="flex items-center space-x-2">
              <Label htmlFor="linux">
                <Icon name="terminal" />
                Linux
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Radio group with custom icons next to each option",
      },
    },
  },
};

export const WithDisabledOptions: Story = {
  render: (args) => (
    <RadioGroup defaultValue="available" {...args}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="available" id="available" />
        <Label htmlFor="available">Available</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="unavailable" id="unavailable" disabled />
        <Label htmlFor="unavailable" className="text-muted-foreground">
          Unavailable (Disabled)
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="coming-soon" id="coming-soon" disabled />
        <Label htmlFor="coming-soon" className="text-muted-foreground">
          Coming Soon (Disabled)
        </Label>
      </div>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: "Radio group with some options disabled",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const radioButtons = canvas.getAllByRole("radio");

    // Try to click a disabled option
    await userEvent.click(radioButtons[1]);

    // The first option should still be checked
    expect(radioButtons[0]).toBeChecked();
    expect(radioButtons[1]).not.toBeChecked();
  },
};

export const CardRadioGroup: Story = {
  render: (args) => (
    <RadioGroup
      defaultValue="card"
      className="grid grid-cols-3 gap-4"
      {...args}
    >
      <div className="relative">
        <RadioGroupItem
          value="card"
          id="card"
          className="peer absolute right-4 top-5"
        />
        <Label
          htmlFor="card"
          className="rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <Icon name="credit-card" />
          <span className="text-sm font-sm">Card</span>
        </Label>
      </div>
      <div>
        <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
        <Label
          htmlFor="paypal"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <Icon name="wallet" className="mb-3 h-6 w-6" />
          <span className="text-sm font-medium">PayPal</span>
        </Label>
      </div>
      <div>
        <RadioGroupItem value="apple" id="apple" className="peer sr-only" />
        <Label
          htmlFor="apple"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <Icon name="smartphone" className="mb-3 h-6 w-6" />
          <span className="text-sm font-medium">Apple Pay</span>
        </Label>
      </div>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Card-based radio group using peer styling for a rich UI experience",
      },
    },
  },
};
