import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/test";
import { expect } from "@storybook/test";
import React from "react";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionHeader,
  AccordionBody,
  AccordionIndicator,
  AccordionIndicatorOpen,
  AccordionIndicatorClosed,
} from "./Accordion";
import { Button } from "@/components/atoms/Button";

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  subcomponents: {
    AccordionItem,
    AccordionTrigger,
    AccordionHeader,
    AccordionBody,
    AccordionIndicator,
  },
  parameters: {
    nuqs: {
      disabled: true,
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "divided", "bordered"],
      description: "The variant of the accordion to render",
      defaultValue: "default",
    },
    type: {
      control: "radio",
      options: ["single", "multiple"],
      description: "The type of accordion to render",
      defaultValue: "single",
    },
    collapsible: {
      control: "boolean",
      description: "Whether the accordion is collapsible",
      defaultValue: true,
    },
    disabled: {
      control: "boolean",
      description: "Whether the accordion is disabled",
      defaultValue: false,
    },
    dir: {
      control: "radio",
      options: ["ltr", "rtl"],
      description: "The direction of the accordion",
      defaultValue: "ltr",
    },
    orientation: {
      control: "radio",
      options: ["vertical", "horizontal"],
      description: "The orientation of the accordion",
      defaultValue: "vertical",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionHeader>
          <AccordionTrigger>
            <AccordionIndicator />
            Is it accessible?
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionBody>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionBody>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionHeader>
          <AccordionTrigger>
            <AccordionIndicator />
            Is it styled?
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionBody>
          Yes. It comes with default styles that match the other components'
          aesthetic.
        </AccordionBody>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionHeader>
          <AccordionTrigger>
            <AccordionIndicator />
            Is it animated?
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionBody>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole("button");
    await expect(triggers[0]).toHaveAttribute("aria-expanded", "false");
    await expect(triggers[1]).toHaveAttribute("aria-expanded", "false");
    await expect(triggers[2]).toHaveAttribute("aria-expanded", "false");
  },
};

export const Preselected: Story = {
  args: {
    defaultValue: "item-2",
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionHeader>
          <AccordionTrigger>
            Is it accessible? <AccordionIndicator className="ml-auto" />
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionBody>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionBody>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionHeader>
          <AccordionTrigger>
            Is it styled? <AccordionIndicator className="ml-auto" />
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionBody>
          Yes. It comes with default styles that match the other components'
          aesthetic.
        </AccordionBody>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionHeader>
          <AccordionTrigger>
            Is it animated? <AccordionIndicator className="ml-auto" />
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionBody>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole("button");
    await expect(triggers[0]).toHaveAttribute("aria-expanded", "false");
    await expect(triggers[1]).toHaveAttribute("aria-expanded", "true");
    await expect(triggers[2]).toHaveAttribute("aria-expanded", "false");
  },
};

export const CustomIcon: Story = {
  args: {
    variant: "bordered",
    collapsible: true,
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionHeader>
          <AccordionTrigger>
            Custom Icon
            <AccordionIndicator icon="heart" />
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionBody>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  ),
};

export const PlusMinusIcon: Story = {
  args: {
    variant: "bordered",
    collapsible: true,
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionHeader>
          <AccordionTrigger>
            <AccordionIndicator openIcon="minus" closedIcon="plus" />
            Plus Icon with Rotation
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionBody>
          This example uses a plus icon that rotates to create a visual effect
          when open.
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  ),
};

// Wrapper component for controlled story to properly use React hooks
export const Controlled: Story = {
  render: function Render() {
    // Use React's useState hook to control the accordion state
    const [value, setValue] = React.useState<string>("item-1");

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button
            onClick={() => setValue("item-1")}
            variant={value === "item-1" ? "default" : "outline"}
          >
            Show Item 1
          </Button>
          <Button
            onClick={() => setValue("item-2")}
            variant={value === "item-2" ? "default" : "outline"}
          >
            Show Item 2
          </Button>
          <Button
            onClick={() => setValue("item-3")}
            variant={value === "item-3" ? "default" : "outline"}
          >
            Show Item 3
          </Button>
          <Button
            onClick={() => setValue("")}
            variant={value === "" ? "default" : "outline"}
          >
            Close All
          </Button>
        </div>

        <Accordion
          type="single"
          collapsible
          value={value}
          onValueChange={setValue}
        >
          <AccordionItem value="item-1">
            <AccordionHeader>
              <AccordionTrigger>
                Item 1 <AccordionIndicator className="ml-auto" />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionBody>
              This accordion item is externally controlled.
            </AccordionBody>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionHeader>
              <AccordionTrigger>
                Item 2 <AccordionIndicator className="ml-auto" />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionBody>
              Click the buttons above to control which item is open.
            </AccordionBody>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionHeader>
              <AccordionTrigger>
                Item 3 <AccordionIndicator className="ml-auto" />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionBody>
              The state is managed outside the Accordion component.
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </div>
    );
  },
};

export const SeparateIndicators: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionHeader>
          <AccordionTrigger>
            <AccordionIndicatorClosed icon="plus" />
            <AccordionIndicatorOpen icon="minus" />
            Advanced Indicator Control
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionBody>
          This example uses separate indicator components for open and closed
          states, giving you precise control over each state independently.
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  ),
};
