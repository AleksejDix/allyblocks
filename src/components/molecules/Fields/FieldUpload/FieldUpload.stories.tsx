import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import { useForm } from "react-hook-form";
import { Form } from "@/components/molecules/Form/Form";
import { FieldUpload } from "./FieldUpload";
import { Button } from "@/components/atoms/Button/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const meta: Meta<typeof FieldUpload> = {
  component: FieldUpload,
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
    accept: {
      control: "text",
      description: "Accepted file types (e.g., '.jpg,.png,.pdf')",
    },
    multiple: {
      control: "boolean",
      description: "Allow multiple file uploads",
    },
    maxSize: {
      control: "number",
      description: "Maximum file size in bytes",
    },
    helpText: {
      control: "text",
      description: "Help text for upload instructions",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FieldUpload>;

type SingleFileFormValues = {
  document: File | null;
};

type MultiFileFormValues = {
  documents: FileList | null;
};

function BasicUploadForm() {
  const schema = z.object({
    document: z
      .instanceof(File, { message: "Please upload a file" })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: "File size must be less than 5MB",
      }),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  function onSubmit(values: z.infer<typeof schema>) {
    alert(
      JSON.stringify({ name: values.document.name, size: values.document.size })
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-[400px]"
      >
        <FieldUpload
          name="document"
          label="Upload Document"
          description="Upload your document in PDF format"
          accept=".pdf"
          required
          maxSize={5 * 1024 * 1024} // 5MB
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function MultipleUploadForm() {
  const form = useForm<MultiFileFormValues>();

  function onSubmit(values: MultiFileFormValues) {
    if (values.documents) {
      const files = Array.from(values.documents).map((file) => ({
        name: file.name,
        size: file.size,
      }));
      alert(JSON.stringify(files));
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-[400px]"
      >
        <FieldUpload
          name="documents"
          label="Upload Images"
          description="Upload one or more image files"
          accept=".jpg,.jpeg,.png,.gif"
          multiple
          helpText="Drag and drop image files or click to browse"
        />
        <Button type="submit">Upload Images</Button>
      </form>
    </Form>
  );
}

function DisabledUploadForm() {
  const form = useForm<SingleFileFormValues>();

  function onSubmit(values: SingleFileFormValues) {
    // This won't be called since the form is disabled
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-[400px]"
      >
        <FieldUpload
          name="document"
          label="Upload Document"
          description="This upload field is disabled"
          disabled
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function CustomUploadForm() {
  const form = useForm<SingleFileFormValues>();

  function onSubmit(values: SingleFileFormValues) {
    alert(
      values.document
        ? JSON.stringify({ name: values.document.name })
        : "No file"
    );
  }

  function validateFile(file: File) {
    // Only allow PDF files that start with "report-"
    if (!file.name.startsWith("report-")) {
      return "Filename must start with 'report-'";
    }
    return null;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-[400px]"
      >
        <FieldUpload
          name="document"
          label="Upload Report"
          description="Upload a report file (must start with 'report-')"
          accept=".pdf"
          validateFile={validateFile}
          helpText="File name must start with 'report-'"
        />
        <Button type="submit">Submit Report</Button>
      </form>
    </Form>
  );
}

// Basic file upload
export const Basic: Story = {
  render: () => <BasicUploadForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitButton = canvas.getByRole("button", { name: /submit/i });

    // Click submit without file should show validation error
    await userEvent.click(submitButton);
    const error = canvas.getByText(/please upload a file/i);
    await expect(error).toBeVisible();
  },
};

// Multiple file upload
export const MultipleFiles: Story = {
  render: () => <MultipleUploadForm />,
};

// Disabled upload
export const Disabled: Story = {
  render: () => <DisabledUploadForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const uploadArea = canvas.getByText(/upload document/i).closest("div");
    await expect(uploadArea).toHaveClass("cursor-not-allowed");
  },
};

// Custom validation
export const CustomValidation: Story = {
  render: () => <CustomUploadForm />,
};
