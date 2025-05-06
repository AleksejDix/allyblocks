import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/molecules/Form/Form";
import { FieldMultiSelect } from "./FieldMultiSelect";
import { Button } from "@/components/atoms/Button/Button";

const meta: Meta<typeof FieldMultiSelect> = {
  component: FieldMultiSelect,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FieldMultiSelect>;

type MultiSelectFormValues = {
  tags: string[];
};

const options = [
  { label: "Tag 1", value: "tag1" },
  { label: "Tag 2", value: "tag2" },
  { label: "Tag 3", value: "tag3" },
  { label: "Disabled Tag", value: "tag4", disabled: true },
];

function BasicMultiSelectForm() {
  const form = useForm<MultiSelectFormValues>({
    defaultValues: {
      tags: [],
    },
  });

  function onSubmit(values: MultiSelectFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldMultiSelect
          name="tags"
          label="Tags"
          options={options}
          description="Select one or more tags"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function PreSelectedForm() {
  const form = useForm<MultiSelectFormValues>({
    defaultValues: {
      tags: ["tag1", "tag3"],
    },
  });

  function onSubmit(values: MultiSelectFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldMultiSelect
          name="tags"
          label="Tags"
          options={options}
          description="Select one or more tags"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function RequiredMultiSelectForm() {
  const schema = z.object({
    tags: z.array(z.string()).min(1, "Please select at least one tag"),
  });

  const form = useForm<MultiSelectFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      tags: [],
    },
  });

  function onSubmit(values: MultiSelectFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldMultiSelect name="tags" label="Tags" options={options} required />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function DisabledMultiSelectForm() {
  const form = useForm<MultiSelectFormValues>({
    defaultValues: {
      tags: [],
    },
  });

  function onSubmit(values: MultiSelectFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldMultiSelect name="tags" label="Tags" options={options} disabled />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function CustomWidthForm() {
  const form = useForm<MultiSelectFormValues>({
    defaultValues: {
      tags: [],
    },
  });

  function onSubmit(values: MultiSelectFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldMultiSelect
          name="tags"
          label="Tags"
          options={options}
          width={300}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function CustomPlaceholderForm() {
  const form = useForm<MultiSelectFormValues>({
    defaultValues: {
      tags: [],
    },
  });

  function onSubmit(values: MultiSelectFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldMultiSelect
          name="tags"
          label="Tags"
          options={options}
          placeholder="Choose tags..."
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function CustomSelectedTextForm() {
  const form = useForm<MultiSelectFormValues>({
    defaultValues: {
      tags: ["tag1", "tag2"],
    },
  });

  function onSubmit(values: MultiSelectFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldMultiSelect
          name="tags"
          label="Tags"
          options={options}
          selectedText="Tags chosen"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function ValidationErrorForm() {
  const schema = z.object({
    tags: z.array(z.string()).min(1, "Please select at least one tag"),
  });

  const form = useForm<MultiSelectFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      tags: [],
    },
  });

  function onSubmit(values: MultiSelectFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldMultiSelect name="tags" label="Tags" options={options} required />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

// Basic multi select field
export const Default: Story = {
  render: () => <BasicMultiSelectForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /select options/i });
    await expect(trigger).toBeInTheDocument();
  },
};

// Pre-selected values
export const PreSelected: Story = {
  render: () => <PreSelectedForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /selected: 2/i });
    await expect(trigger).toBeInTheDocument();
  },
};

// Required field
export const Required: Story = {
  render: () => <RequiredMultiSelectForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("*", { selector: ".text-destructive" })
    ).toBeInTheDocument();
  },
};

// Disabled field
export const Disabled: Story = {
  render: () => <DisabledMultiSelectForm />,
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
    await expect(trigger).toHaveTextContent("Choose tags...");
  },
};

// Custom selected text
export const CustomSelectedText: Story = {
  render: () => <CustomSelectedTextForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await expect(trigger).toHaveTextContent("Tags chosen: 2");
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
    const error = canvas.getByText(/please select at least one tag/i);
    await expect(error).toBeVisible();
  },
};
