import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import { useForm } from "react-hook-form";
import { Form } from "@/components/molecules/Form/Form";
import { FieldEmail } from "./FieldEmail";
import { Button } from "@/components/atoms/Button/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isRequired } from "../hooks/useRequired";
import { useEffect } from "react";

const meta: Meta<typeof FieldEmail> = {
  component: FieldEmail,
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
  },
};

export default meta;
type Story = StoryObj<typeof FieldEmail>;

function RequiredForm() {
  const schema = z.object({
    email: z.string().email(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="space-y-4"
      >
        <FieldEmail name="email" required={isRequired(schema, "email")} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function PrefilledForm() {
  const form = useForm({
    defaultValues: {
      email: "test@example.com",
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-4" noValidate>
        <FieldEmail name="email" label="Email" />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function DisabledForm() {
  const form = useForm();
  return (
    <Form {...form}>
      <form className="space-y-4" noValidate>
        <FieldEmail name="email" label="Email" disabled />
      </form>
    </Form>
  );
}

function InvalidForm() {
  const form = useForm({
    defaultValues: {
      email: "invalid-email",
    },
  });

  useEffect(() => {
    form.clearErrors();

    form.setError("email", {
      type: "manual",
      message: "I guess this is an invalid email",
    });
  }, [form]);

  return (
    <Form {...form}>
      <form className="space-y-4" noValidate>
        <FieldEmail name="email" label="Email" />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

// Basic email field
export const Required: Story = {
  render: () => <RequiredForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test empty submission
    const input = canvas.getByRole("textbox", { name: /email/i });
    await userEvent.click(input);
    await userEvent.tab();
    await userEvent.keyboard("{enter}");

    //  Check for required error
    const error = canvas.getByText(/Invalid email/i);
    await expect(error).toBeVisible();

    // Test invalid email
    await userEvent.type(input, "invalid-email");
    await userEvent.tab();

    // Check for invalid email error
    const invalidError = canvas.getByText(/Invalid email/i);
    await expect(invalidError).toBeVisible();

    // Test valid email
    await userEvent.clear(input);
    await userEvent.type(input, "test@example.com");
    await userEvent.tab();

    // Verify no error messages
    await expect(error).not.toBeVisible();
    await expect(invalidError).not.toBeVisible();
  },
};

export const Prefilled: Story = {
  render: () => <PrefilledForm />,
};

export const Disabled: Story = {
  render: () => <DisabledForm />,
};

export const Invalid: Story = {
  render: () => <InvalidForm />,
};
