import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/molecules/Form/Form";
import { FieldSingleSelect } from "./FieldSingleSelect";
import { Button } from "@/components/atoms/Button/Button";

const meta: Meta<typeof FieldSingleSelect> = {
  component: FieldSingleSelect,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FieldSingleSelect>;

type SelectFormValues = {
  category: string;
};

const options = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
  { label: "Disabled Option", value: "option4", disabled: true },
];

function BasicSelectForm() {
  const form = useForm<SelectFormValues>({
    defaultValues: {
      category: "",
    },
  });

  function onSubmit(values: SelectFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldSingleSelect
          name="category"
          label="Category"
          options={options}
          description="Select a category from the dropdown"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function PreSelectedForm() {
  const form = useForm<SelectFormValues>({
    defaultValues: {
      category: "option2",
    },
  });

  function onSubmit(values: SelectFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldSingleSelect
          name="category"
          label="Category"
          options={options}
          description="Select a category from the dropdown"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function RequiredSelectForm() {
  const form = useForm<SelectFormValues>({
    defaultValues: {
      category: "",
    },
  });

  function onSubmit(values: SelectFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldSingleSelect
          name="category"
          label="Category"
          options={options}
          required
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function DisabledSelectForm() {
  const form = useForm<SelectFormValues>({
    defaultValues: {
      category: "",
    },
  });

  function onSubmit(values: SelectFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldSingleSelect
          name="category"
          label="Category"
          options={options}
          disabled
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function CustomWidthForm() {
  const form = useForm<SelectFormValues>({
    defaultValues: {
      category: "",
    },
  });

  function onSubmit(values: SelectFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldSingleSelect
          name="category"
          label="Category"
          options={options}
          width={300}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function CustomPlaceholderForm() {
  const form = useForm<SelectFormValues>({
    defaultValues: {
      category: "",
    },
  });

  function onSubmit(values: SelectFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldSingleSelect
          name="category"
          label="Category"
          options={options}
          placeholder="Choose a category..."
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function ValidationErrorForm() {
  const schema = z.object({
    category: z.string().min(1, "Please select a category"),
  });

  const form = useForm<SelectFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      category: "",
    },
  });

  function onSubmit(values: SelectFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldSingleSelect
          name="category"
          label="Category"
          options={options}
          required
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

// Basic single select field
export const Default: Story = {
  render: () => <BasicSelectForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /select an option/i });
    await expect(trigger).toBeInTheDocument();
  },
};

// Pre-selected value
export const PreSelected: Story = {
  render: () => <PreSelectedForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /option 2/i });
    await expect(trigger).toBeInTheDocument();
  },
};

// Required field
export const Required: Story = {
  render: () => <RequiredSelectForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("*", { selector: ".text-destructive" }),
    ).toBeInTheDocument();
  },
};

// Disabled field
export const Disabled: Story = {
  render: () => <DisabledSelectForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await expect(trigger).toBeDisabled();
  },
};

// Custom width
export const CustomWidth: Story = {
  render: () => <CustomWidthForm />,
};

// Custom placeholder
export const CustomPlaceholder: Story = {
  render: () => <CustomPlaceholderForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await expect(trigger).toHaveTextContent("Choose a category...");
  },
};

// With validation error
export const WithValidationError: Story = {
  render: () => <ValidationErrorForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click the button to focus and then tab out to trigger validation
    const trigger = canvas.getByRole("button");
    await userEvent.click(trigger);
    await userEvent.tab();

    // Submit the form to trigger validation
    const submitButton = canvas.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    // Check for error message
    const error = canvas.getByText(/please select a category/i);
    await expect(error).toBeVisible();
  },
};
