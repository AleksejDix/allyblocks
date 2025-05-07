import {
  type ChangeEvent,
  type ClipboardEvent,
  type KeyboardEvent,
  type FocusEvent,
} from "react";
import {
  type ControllerRenderProps,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface NumberValidationOptions {
  integerOnly?: boolean;
}

/**
 * Handles keyboard input to prevent invalid characters
 */
export function handleNumberKeyDown(
  e: KeyboardEvent<HTMLInputElement>,
  options: NumberValidationOptions = {}
) {
  const { integerOnly = false } = options;

  // Block scientific notation
  if (e.key === "e" || e.key === "E") {
    e.preventDefault();
    return;
  }

  // For integer mode, also block decimal points
  if (integerOnly && (e.key === "." || e.key === ",")) {
    e.preventDefault();
    return;
  }

  // Prevent multiple minus signs
  if (e.key === "-") {
    const input = e.target as HTMLInputElement;
    const cursorPos = input.selectionStart || 0;

    // Allow minus only at the beginning and only if there isn't already one
    if (cursorPos !== 0 || input.value.includes("-")) {
      e.preventDefault();
    }
  }
}

/**
 * Handles input change, converting the value to the appropriate number type
 */
export function handleNumberChange<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>(
  e: ChangeEvent<HTMLInputElement>,
  field: ControllerRenderProps<TFieldValues, TName>,
  options: NumberValidationOptions = {}
) {
  const { integerOnly = false } = options;

  // Handle empty case
  if (e.target.value === "" || e.target.value === "-") {
    field.onChange("");
    return;
  }

  // Format multiple minus signs
  const value = e.target.value.replace(/-{2,}/g, "-");

  // For integer mode, check if it's a valid integer pattern
  if (integerOnly) {
    if (/^-?\d+$/.test(value)) {
      field.onChange(parseInt(value, 10));
    }
    return;
  }

  // For float mode
  if (/^-?\d*\.?\d*$/.test(value)) {
    field.onChange(parseFloat(value) || value);
  }
}

/**
 * Handles pasted content to ensure only valid numeric input
 */
export function handleNumberPaste<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>(
  e: ClipboardEvent<HTMLInputElement>,
  field: ControllerRenderProps<TFieldValues, TName>,
  options: NumberValidationOptions = {}
) {
  const { integerOnly = false } = options;

  // Prevent default paste behavior
  e.preventDefault();

  // Get pasted text
  const pastedText = e.clipboardData.getData("text");

  // Prepare regex pattern based on mode (integer or float)
  const charPattern = integerOnly ? /[^\d-]/g : /[^\d.-]/g;

  // Clean pasted text
  const sanitized = pastedText
    .replace(charPattern, "") // Remove invalid chars
    .replace(/^-?/, (match) => match) // Keep first minus if exists
    .replace(/-/g, ""); // Remove any other minus

  // For float, ensure only one decimal point
  const finalSanitized = !integerOnly
    ? sanitized.replace(/\.(?=.*\.)/g, "")
    : sanitized;

  // Combine with existing value
  const inputEl = e.target as HTMLInputElement;
  const cursorPos = inputEl.selectionStart || 0;
  const currentValue = inputEl.value;
  const newValue =
    currentValue.substring(0, cursorPos) +
    finalSanitized +
    currentValue.substring(inputEl.selectionEnd || cursorPos);

  // Update field value
  if (newValue === "" || newValue === "-") {
    field.onChange("");
  } else if (integerOnly) {
    const finalValue = parseInt(newValue, 10);
    if (!isNaN(finalValue)) {
      field.onChange(finalValue);
    }
  } else {
    const finalValue = parseFloat(newValue);
    if (!isNaN(finalValue)) {
      field.onChange(finalValue);
    } else if (
      newValue === "." ||
      newValue.endsWith(".") ||
      newValue.startsWith(".")
    ) {
      // Handle case of typing just a decimal point or starting with one
      field.onChange(newValue);
    }
  }
}

/**
 * Handles blur event to format the field value correctly
 */
export function handleNumberBlur<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>(
  e: FocusEvent<HTMLInputElement>,
  field: ControllerRenderProps<TFieldValues, TName>,
  options: NumberValidationOptions = {}
) {
  const { integerOnly = false } = options;

  field.onBlur();

  // Handle empty or just a minus sign
  if (
    e.target.value === "-" ||
    e.target.value === "" ||
    e.target.value === "."
  ) {
    field.onChange("");
    return;
  }

  // Format value based on mode
  if (integerOnly) {
    const numValue = parseInt(e.target.value, 10);
    if (!isNaN(numValue)) {
      field.onChange(numValue);
    } else {
      field.onChange("");
    }
  } else {
    const numValue = parseFloat(e.target.value);
    if (!isNaN(numValue)) {
      field.onChange(numValue);
    } else {
      field.onChange("");
    }
  }
}
