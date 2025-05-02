import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import { useForm } from "react-hook-form";
import { Form } from "@/components/molecules/Form/Form";
import { FieldEmail } from "./FieldEmail";
import { Button } from "@/components/atoms/Button/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isRequired } from "../hooks/useRequired";

const meta: Meta<typeof FieldEmail> = {
  component: FieldEmail,
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
  },
};

export default meta;
type Story = StoryObj<typeof FieldEmail>;

function FormWithZod() {
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

function DescriptionForm() {
  const form = useForm();
  return (
    <Form {...form}>
      <form className="space-y-4">
        <FieldEmail
          name="email"
          description="We'll never share your email with anyone else."
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

// function OptionalForm() {
//   const form = useForm();
//   return (
//     <Form {...form}>
//       <form className="space-y-4">
//         <FieldEmail name="email" required={false} />
//       </form>
//     </Form>
//   );
// }

// Basic email field
export const withZod: Story = {
  render: () => <FormWithZod />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test empty submission
    const input = canvas.getByRole("textbox", { name: /email/i });
    await userEvent.click(input);
    await userEvent.tab();
    await userEvent.keyboard("{enter}");

    //  Check for required error
    // const error = canvas.getByText(/email is required/i);
    // await expect(error).toBeVisible();

    // // Test invalid email
    // await userEvent.type(input, "invalid-email");
    // await userEvent.tab();

    // // Check for invalid email error
    // const invalidError = canvas.getByText(
    //   /please enter a valid email address/i
    // );
    // await expect(invalidError).toBeVisible();

    // // Test valid email
    // await userEvent.clear(input);
    // await userEvent.type(input, "test@example.com");
    // await userEvent.tab();

    // // Verify no error messages
    // await expect(error).not.toBeVisible();
    // await expect(invalidError).not.toBeVisible();
  },
};

export const WithPrefilled: Story = {
  render: () => <PrefilledForm />,
};

export const WithDescription: Story = {
  render: () => <DescriptionForm />,
};

// // Optional email field
// export const Optional: Story = {
//   render: () => <OptionalForm />,
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);

//     // Test empty submission
//     const input = canvas.getByRole("textbox", { name: /email/i });
//     await userEvent.click(input);
//     await userEvent.tab();

//     // Verify no required error
//     const error = canvas.queryByText(/email is required/i);
//     await expect(error).not.toBeInTheDocument();

//     // Test invalid email
//     await userEvent.type(input, "invalid-email");
//     await userEvent.tab();

//     // Check for invalid email error
//     const invalidError = canvas.getByText(
//       /please enter a valid email address/i
//     );
//     await expect(invalidError).toBeVisible();
//   },
// };
