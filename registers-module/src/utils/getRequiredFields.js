// utils/getRequiredFields.js
import { ZodObject, ZodOptional, ZodNullable } from "zod";

/**
 * Recursively returns required field paths in dot notation
 */
export function getRequiredFields(schema, parentKey = "") {
  const fields = [];

  if (!(schema instanceof ZodObject)) return fields;

  const shape = schema.shape;

  for (const key in shape) {
    const field = shape[key];
    const path = parentKey ? `${parentKey}.${key}` : key;

    if (field instanceof ZodObject) {
      fields.push(...getRequiredFields(field, path));
    } else if (!(field instanceof ZodOptional || field instanceof ZodNullable)) {
      fields.push(path);
    }
  }

  return fields;
}
