import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, waitFor } from "@storybook/test";
import { expect } from "@storybook/test";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion";

const meta: Meta<typeof Accordion> = {
  title: "UI/Accordion",
  component: Accordion,
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
      defaultValue: "single",
    },
    collapsible: {
      control: "boolean",
      defaultValue: false,
    },
    className: {
      control: "text",
    },
    defaultValue: {
      control: "text",
    },
  },
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A vertically stacked set of interactive headings that each reveal an associated section of content.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Accordion>;

const ExampleAccordion = ({
  type = "single",
  collapsible = true,
  defaultValue,
}: {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string;
}) => {
  const accordionContent = (
    <>
      <AccordionItem value="item-1" data-testid="accordion-item-1">
        <AccordionTrigger data-testid="accordion-trigger-1">
          Is it accessible?
        </AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" data-testid="accordion-item-2">
        <AccordionTrigger data-testid="accordion-trigger-2">
          Is it styled?
        </AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match the other components'
          aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" data-testid="accordion-item-3">
        <AccordionTrigger data-testid="accordion-trigger-3">
          Is it animated?
        </AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </>
  );

  if (type === "multiple") {
    return (
      <Accordion
        type="multiple"
        defaultValue={defaultValue ? [defaultValue] : undefined}
        className="w-full max-w-sm"
      >
        {accordionContent}
      </Accordion>
    );
  }

  return (
    <Accordion
      type="single"
      collapsible={collapsible}
      defaultValue={defaultValue}
      className="w-full max-w-sm"
    >
      {accordionContent}
    </Accordion>
  );
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default accordion with single item open and collapsible behavior.",
      },
    },
  },
  render: () => <ExampleAccordion />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole("button");
    await expect(triggers[0]).toHaveAttribute("aria-expanded", "false");
    await expect(triggers[1]).toHaveAttribute("aria-expanded", "false");
    await expect(triggers[2]).toHaveAttribute("aria-expanded", "false");
  },
};

export const SingleOpen: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Accordion with a single item open by default and non-collapsible behavior.",
      },
    },
  },
  render: () => <ExampleAccordion defaultValue="item-1" collapsible={false} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger1 = canvas.getByTestId("accordion-trigger-1");
    const trigger2 = canvas.getByTestId("accordion-trigger-2");

    await expect(trigger1).toHaveAttribute("aria-expanded", "true");

    await userEvent.click(trigger2);
    await waitFor(() => {
      expect(trigger1).toHaveAttribute("aria-expanded", "false");
      expect(trigger2).toHaveAttribute("aria-expanded", "true");
    });

    await userEvent.click(trigger2);
    await waitFor(async () => {
      await new Promise((res) => setTimeout(res, 50));
      expect(trigger2).toHaveAttribute("aria-expanded", "true");
    });
  },
};

export const MultipleOpen: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Accordion that allows multiple items to be open simultaneously.",
      },
    },
  },
  render: () => <ExampleAccordion type="multiple" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger1 = canvas.getByTestId("accordion-trigger-1");
    const trigger2 = canvas.getByTestId("accordion-trigger-2");

    await userEvent.click(trigger1);
    await waitFor(() => {
      expect(trigger1).toHaveAttribute("aria-expanded", "true");
    });

    await userEvent.click(trigger2);
    await waitFor(() => {
      expect(trigger1).toHaveAttribute("aria-expanded", "true");
      expect(trigger2).toHaveAttribute("aria-expanded", "true");
    });

    await userEvent.click(trigger1);
    await waitFor(() => {
      expect(trigger1).toHaveAttribute("aria-expanded", "false");
      expect(trigger2).toHaveAttribute("aria-expanded", "true");
    });
  },
};

export const KeyboardNavigation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates keyboard navigation through the accordion using Tab to move between items and Enter or Space to toggle them.",
      },
    },
  },
  render: () => <ExampleAccordion />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger1 = canvas.getByTestId("accordion-trigger-1");
    const trigger2 = canvas.getByTestId("accordion-trigger-2");

    await userEvent.tab();
    await expect(trigger1).toHaveFocus();

    await userEvent.keyboard("{Enter}");
    await waitFor(() => {
      expect(trigger1).toHaveAttribute("aria-expanded", "true");
    });

    await userEvent.tab();
    await expect(trigger2).toHaveFocus();

    await userEvent.keyboard(" ");
    await waitFor(() => {
      expect(trigger1).toHaveAttribute("aria-expanded", "false");
      expect(trigger2).toHaveAttribute("aria-expanded", "true");
    });
  },
};

export const CustomStyle: Story = {
  parameters: {
    docs: {
      description: {
        story: "Accordion with custom styling applied to its components.",
      },
    },
  },
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-sm">
      <AccordionItem
        value="item-1"
        className="rounded-md border border-primary p-1"
      >
        <AccordionTrigger className="px-4 text-primary">
          Custom Styled Accordion
        </AccordionTrigger>
        <AccordionContent className="bg-secondary/20 rounded p-4 mt-2">
          This accordion has custom styling applied to demonstrate the
          flexibility of the component.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="rounded-md border mt-2 p-1">
        <AccordionTrigger className="px-4">Additional Section</AccordionTrigger>
        <AccordionContent className="p-4 mt-2">
          You can style each accordion item differently if needed.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  // Visual test only - no interaction testing needed
};
