import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import { useForm } from "react-hook-form";
import { Form } from "@/components/molecules/Form/Form";
import { FieldCheckbox } from "./FieldCheckbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/atoms/Button/Button";

const meta: Meta<typeof FieldCheckbox> = {
  component: FieldCheckbox,
  parameters: {
    layout: "centered",
  },
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
    disabled: {
      control: "boolean",
      description: "Whether the field is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FieldCheckbox>;

function BasicCheckboxForm() {
  const schema = z.object({
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      acceptTerms: false,
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
        <FieldCheckbox
          name="acceptTerms"
          label="I accept the terms and conditions"
          description="By checking this box, you agree to our Terms of Service and Privacy Policy"
          required
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function DisabledCheckboxForm() {
  const form = useForm({
    defaultValues: {
      disabled: false,
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-4 w-[400px]">
        <FieldCheckbox
          name="disabled"
          label="This checkbox is disabled"
          description="You cannot interact with this checkbox"
          disabled
        />
      </form>
    </Form>
  );
}

function CheckedCheckboxForm() {
  const form = useForm({
    defaultValues: {
      preChecked: true,
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-4 w-[400px]">
        <FieldCheckbox
          name="preChecked"
          label="Pre-checked checkbox"
          description="This checkbox starts in the checked state"
        />
      </form>
    </Form>
  );
}

// Basic checkbox with validation
export const Basic: Story = {
  render: () => <BasicCheckboxForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test empty submission
    const submitButton = canvas.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    // Check for validation error
    const error = canvas.getByText(/you must accept the terms and conditions/i);
    await expect(error).toBeVisible();

    // Check the checkbox
    const checkbox = canvas.getByRole("checkbox");
    await userEvent.click(checkbox);

    // Submit with checkbox checked
    await userEvent.click(submitButton);

    // Verify error is gone
    await expect(error).not.toBeVisible();
  },
};

// Disabled checkbox
export const Disabled: Story = {
  render: () => <DisabledCheckboxForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");
    await expect(checkbox).toBeDisabled();
  },
};

// Pre-checked checkbox
export const PreChecked: Story = {
  render: () => <CheckedCheckboxForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");
    await expect(checkbox).toBeChecked();
  },
};
