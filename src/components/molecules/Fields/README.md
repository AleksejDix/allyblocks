# Fields Components

This directory contains a collection of form field components built with React Hook Form and shadcn/ui. These components are designed with accessibility in mind and provide a consistent interface for building forms.

## Available Fields

| Component       | Description                                                          |
| --------------- | -------------------------------------------------------------------- |
| `FieldEmail`    | Email input field with validation                                    |
| `FieldPassword` | Password input with show/hide toggle and optional strength indicator |
| `FieldSelect`   | Dropdown select component with options                               |
| `FieldTextarea` | Multi-line text input                                                |
| `FieldCheckbox` | Checkbox component                                                   |
| `FieldOTP`      | One-time password input for verification codes                       |
| `FieldUpload`   | File upload component                                                |
| `FieldPhone`    | Phone number input with international format and country selection   |
| `FieldText`     | Basic text input field                                               |

## Usage

All field components are designed to work with React Hook Form. Each component requires a `name` prop and should be used within a `FormProvider` context.

```jsx
import { useForm, FormProvider } from "react-hook-form";
import { FieldEmail } from "../Fields/FieldEmail";

function MyForm() {
  const methods = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FieldEmail
          name="email"
          label="Email Address"
          required
          description="We'll never share your email with anyone else."
        />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}
```

## Common Props

Most field components share these common props:

| Prop          | Type    | Description                           |
| ------------- | ------- | ------------------------------------- |
| `name`        | string  | Field name (required)                 |
| `label`       | string  | Field label text                      |
| `description` | string  | Helper text displayed below the field |
| `required`    | boolean | Whether the field is required         |
| `disabled`    | boolean | Whether the field is disabled         |

## TODO: Missing Field Components

Based on modern form requirements and common shadcn/ui components, we should implement the following field types:

- [x] `FieldText` - Basic text input field
- [ ] `FieldNumber` - Numeric input with validation
- [x] `FieldPhone` - Phone number input with formatting
- [ ] `FieldDatePicker` - Date selection field
- [ ] `FieldRadioGroup` - Radio button group
- [ ] `FieldSwitch` - Toggle switch
- [ ] `FieldSlider` - Range slider component
- [ ] `FieldCombobox` - Autocomplete input field
- [ ] `FieldMultiSelect` - Multiple selection component
- [ ] `FieldColorPicker` - Color selection field
- [ ] `FieldRating` - Star/rating input component
- [ ] `FieldAutocomplete` - Address or search autocomplete
- [ ] `FieldRichText` - Rich text editor field

These additional fields would complete the form component library and provide a comprehensive set of tools for building accessible, well-designed forms.
