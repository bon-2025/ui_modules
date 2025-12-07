import { z } from "zod";

export const contractInfoSchema = z.object({
  permitNumber: z.string()
    .trim()
    .nonempty("Burial Permit Number is required")
    .regex(/^[0-9]+$/, "Permit Number must contain numbers only")
    .length(9, "Permit Number must be exactly 9 digits"),

  cemeteryArea: z.string({
    required_error: "Cemetery is required",
    invalid_type_error: "Cemetery must be selected",
  }),

  cemeteryLot: z.string({
    required_error: "Cemetery Lot is required",
    invalid_type_error: "Cemetery Lot must be selected",
  }),

  startDate: z.string()
    .nonempty("Start Date is required")
    .refine(v => !isNaN(Date.parse(v)), "Invalid Start Date"),

  endDate: z.string()
    .nonempty("End Date is required")
    .refine(v => !isNaN(Date.parse(v)), "Invalid End Date"),

  infectious: z.enum(["Yes", "No"]),
  bodyEmbalmed: z.enum(["Yes", "No"])
});
