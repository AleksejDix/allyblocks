import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import { useForm } from "react-hook-form";
import { Form } from "@/components/molecules/Form/Form";
import { FieldTextarea } from "./FieldTextarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/atoms/Button/Button";

const meta: Meta<typeof FieldTextarea> = {
  component: FieldTextarea,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "text",
      description: "The name of the field",
    },
    label: {
      control: "text",
      description: "The label text for the field",
    },
    description: {
      control: "text",
      description: "Optional description text",
    },
    required: {
      control: "boolean",
      description: "Whether the field is required",
    },
    minHeight: {
      control: "number",
      description: "Minimum height of the textarea",
    },
    maxHeight: {
      control: "number",
      description: "Maximum height of the textarea",
    },
    autoResize: {
      control: "boolean",
      description: "Whether the textarea should auto-resize",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FieldTextarea>;

function BasicTextareaForm() {
  const schema = z.object({
    message: z.string().min(10, "Message must be at least 10 characters"),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-[400px]"
      >
        <FieldTextarea
          name="message"
          label="Message"
          description="Enter your message (min 10 characters)"
          placeholder="Type your message here..."
          required
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function LargeTextareaForm() {
  const form = useForm({
    defaultValues: {
      feedback: "",
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-4 w-[400px]">
        <FieldTextarea
          name="feedback"
          label="Feedback"
          description="Provide detailed feedback"
          placeholder="Type your feedback here..."
          minHeight={150}
          maxHeight={300}
        />
      </form>
    </Form>
  );
}

function DisabledTextareaForm() {
  const form = useForm();
  return (
    <Form {...form}>
      <form className="space-y-4 w-[400px]">
        <FieldTextarea
          name="disabled"
          label="Disabled Textarea"
          description="This textarea is disabled"
          placeholder="You cannot type here"
          disabled
        />
      </form>
    </Form>
  );
}

function PrefilledTextareaForm() {
  const form = useForm({
    defaultValues: {
      prefilled:
        "This is some prefilled text in the textarea that demonstrates how the component handles existing content.",
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-4 w-[400px]">
        <FieldTextarea
          name="prefilled"
          label="Prefilled Textarea"
          description="This textarea has prefilled content"
        />
      </form>
    </Form>
  );
}

// Basic textarea with validation
export const Basic: Story = {
  render: () => <BasicTextareaForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test validation on empty submission
    const submitButton = canvas.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    // Check for validation message
    const error = canvas.getByText(/message must be at least 10 characters/i);
    await expect(error).toBeVisible();

    // Fill with valid text
    const textarea = canvas.getByRole("textbox");
    await userEvent.type(
      textarea,
      "This is a long enough message to pass validation"
    );

    // Submit and check that error is gone
    await userEvent.click(submitButton);
    await expect(error).not.toBeVisible();
  },
};

// Textarea with custom height
export const CustomHeight: Story = {
  render: () => <LargeTextareaForm />,
};

// Disabled textarea
export const Disabled: Story = {
  render: () => <DisabledTextareaForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole("textbox");
    await expect(textarea).toBeDisabled();
  },
};

// Prefilled textarea
export const Prefilled: Story = {
  render: () => <PrefilledTextareaForm />,
};
