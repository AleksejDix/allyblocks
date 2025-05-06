import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import { useForm } from "react-hook-form";
import { Form } from "@/components/molecules/Form/Form";
import { FieldPhone } from "./FieldPhone";
import { Button } from "@/components/atoms/Button/Button";

const meta: Meta<typeof FieldPhone> = {
  component: FieldPhone,
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
    defaultCountry: {
      control: "text",
      description: "The default country code",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FieldPhone>;

type PhoneFormValues = {
  phone: string;
};

function PhoneForm() {
  const form = useForm<PhoneFormValues>({
    defaultValues: {
      phone: "",
    },
  });

  function onSubmit(values: PhoneFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldPhone name="phone" />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function CustomLabelForm() {
  const form = useForm<PhoneFormValues>();

  function onSubmit(values: PhoneFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldPhone name="phone" label="Contact Number" />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function DescriptionForm() {
  const form = useForm<PhoneFormValues>();

  function onSubmit(values: PhoneFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldPhone
          name="phone"
          description="Please enter your phone number with country code"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function RequiredForm() {
  const form = useForm<PhoneFormValues>();

  function onSubmit(values: PhoneFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldPhone name="phone" required={true} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function DefaultCountryForm() {
  const form = useForm<PhoneFormValues>();

  function onSubmit(values: PhoneFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldPhone name="phone" defaultCountry="CH" />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function DisabledForm() {
  const form = useForm<PhoneFormValues>({
    defaultValues: {
      phone: "+1234567890",
    },
  });

  function onSubmit(values: PhoneFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldPhone name="phone" disabled />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

// Basic phone field
export const Default: Story = {
  render: () => <PhoneForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test empty submission
    const input = canvas.getByPlaceholderText(/enter phone number/i);
    await userEvent.click(input);
    await userEvent.tab();

    // Check for required error
    const error = canvas.getByText(/field is required/i);
    await expect(error).toBeVisible();

    // Test valid phone number
    await userEvent.type(input, "+1234567890");
    await userEvent.tab();

    // Verify no error messages
    await expect(error).not.toBeVisible();
  },
};

// Phone field with custom label
export const WithCustomLabel: Story = {
  render: () => <CustomLabelForm />,
};

// Phone field with description
export const WithDescription: Story = {
  render: () => <DescriptionForm />,
};

// Required phone field
export const Required: Story = {
  render: () => <RequiredForm />,
};

// Phone field with default country
export const WithDefaultCountry: Story = {
  render: () => <DefaultCountryForm />,
};

// Disabled phone field
export const Disabled: Story = {
  render: () => <DisabledForm />,
};
