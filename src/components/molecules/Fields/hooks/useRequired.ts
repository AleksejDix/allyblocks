import { z, type ZodRawShape } from "zod";

function isOptionalField(fieldSchema: z.ZodTypeAny): boolean {
  // If the field is wrapped with .optional()
  if (fieldSchema._def?.typeName === "ZodOptional") {
    return true;
  }

  // If the field is nullable but not optional
  if (fieldSchema._def?.typeName === "ZodNullable") {
    return isOptionalField(fieldSchema._def.innerType);
  }

  // Other complex cases like union types that include undefined
  if (fieldSchema._def?.typeName === "ZodUnion") {
    return fieldSchema._def.options.some(
      (option: z.ZodTypeAny) =>
        option._def.typeName === "ZodUndefined" ||
        option._def.typeName === "ZodNull"
    );
  }

  return false;
}

export function isRequired(
  schema: z.ZodObject<ZodRawShape>,
  fieldName: string
): boolean {
  try {
    const shape =
      typeof schema._def.shape === "function"
        ? schema._def.shape()
        : schema._def.shape;

    if (!shape || !(fieldName in shape)) {
      return false;
    }

    const fieldSchema = shape[fieldName];
    return !isOptionalField(fieldSchema);
  } catch {
    return false;
  }
}
