import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { z } from "zod";
import { FieldRadioGroup } from "./FieldRadioGroup";
import { Form } from "@/components/molecules/Form/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/atoms/Button/Button";

const meta: Meta<typeof FieldRadioGroup> = {
  component: FieldRadioGroup,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-md">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof FieldRadioGroup>;

type DefaultValues = {
  favoriteFramework: string;
};

function DefaultForm() {
  const schema = z.object({
    favoriteFramework: z.string().min(1, "Please select a framework"),
  });

  const form = useForm<DefaultValues>({
    defaultValues: {
      favoriteFramework: "",
    },
    resolver: zodResolver(schema),
  });

  function onSubmit(values: DefaultValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldRadioGroup
          name="favoriteFramework"
          label="Favorite Framework"
          description="Select your favorite JavaScript framework"
          required
          options={[
            { value: "react", label: "React" },
            { value: "vue", label: "Vue" },
            { value: "angular", label: "Angular" },
            { value: "svelte", label: "Svelte" },
          ]}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export const Default: Story = {
  render: () => <DefaultForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const radioButtons = canvas.getAllByRole("radio");
    expect(radioButtons).toHaveLength(4);

    // Click on Vue option
    await userEvent.click(radioButtons[1]);
    expect(radioButtons[1]).toBeChecked();
  },
};

type HorizontalValues = {
  paymentMethod: string;
};

function HorizontalForm() {
  const schema = z.object({
    paymentMethod: z.string().min(1, "Please select a payment method"),
  });

  const form = useForm<HorizontalValues>({
    defaultValues: {
      paymentMethod: "",
    },
    resolver: zodResolver(schema),
  });

  function onSubmit(values: HorizontalValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldRadioGroup
          name="paymentMethod"
          label="Payment Method"
          description="Select your preferred payment method"
          required
          orientation="horizontal"
          options={[
            { value: "credit-card", label: "Credit Card" },
            { value: "paypal", label: "PayPal" },
            { value: "bank", label: "Bank Transfer" },
          ]}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export const Horizontal: Story = {
  render: () => <HorizontalForm />,
  parameters: {
    docs: {
      description: {
        story: "Radio options displayed horizontally",
      },
    },
  },
};

type DisabledValues = {
  subscription: string;
};

function DisabledForm() {
  const schema = z.object({
    subscription: z.string().min(1, "Please select a subscription"),
  });

  const form = useForm<DisabledValues>({
    defaultValues: {
      subscription: "basic",
    },
    resolver: zodResolver(schema),
  });

  function onSubmit(values: DisabledValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldRadioGroup
          name="subscription"
          label="Subscription Plan"
          description="Select your subscription plan"
          options={[
            { value: "basic", label: "Basic" },
            { value: "pro", label: "Pro" },
            {
              value: "enterprise",
              label: "Enterprise (Coming Soon)",
              disabled: true,
            },
          ]}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export const WithDisabledOption: Story = {
  render: () => <DisabledForm />,
  parameters: {
    docs: {
      description: {
        story: "Radio group with a disabled option",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const radioButtons = canvas.getAllByRole("radio");
    // The first option should be checked initially
    expect(radioButtons[0]).toBeChecked();

    // Try to click the third disabled option
    await userEvent.click(radioButtons[2]);

    // First option should still be checked since the third is disabled
    expect(radioButtons[0]).toBeChecked();
    expect(radioButtons[2]).not.toBeChecked();
  },
};

type CardValues = {
  theme: string;
};

function CardForm() {
  const schema = z.object({
    theme: z.string().min(1, "Please select a theme"),
  });

  const form = useForm<CardValues>({
    defaultValues: {
      theme: "",
    },
    resolver: zodResolver(schema),
  });

  function onSubmit(values: CardValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldRadioGroup
          name="theme"
          label="Select Theme"
          description="Choose your preferred theme style"
          required
          cardStyle
          orientation="horizontal"
          options={[
            { value: "light", label: "Light" },
            { value: "dark", label: "Dark" },
            { value: "system", label: "System" },
          ]}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export const CardStyle: Story = {
  render: () => <CardForm />,
  parameters: {
    docs: {
      description: {
        story: "Radio options displayed as card UI elements",
      },
    },
  },
};

type ValidationValues = {
  required_field: string;
};

function ValidationForm() {
  const schema = z.object({
    required_field: z.string().min(1, "This field is required"),
  });

  const form = useForm<ValidationValues>({
    defaultValues: {
      required_field: "",
    },
    resolver: zodResolver(schema),
  });

  function onSubmit(values: ValidationValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldRadioGroup
          name="required_field"
          label="Required Field"
          required
          options={[
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
          ]}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export const WithValidation: Story = {
  render: () => <ValidationForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Submit the form without selecting a value
    const submitButton = canvas.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    // Validation error should appear
    await expect(
      canvas.getByText("This field is required")
    ).toBeInTheDocument();

    // Select an option
    const radioButtons = canvas.getAllByRole("radio");
    await userEvent.click(radioButtons[0]);

    // Submit again
    await userEvent.click(submitButton);

    // Error should be gone
    await expect(
      canvas.queryByText("This field is required")
    ).not.toBeInTheDocument();
  },
};
