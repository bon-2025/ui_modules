import { z } from "zod";

export const personalInfoSchema = z.object({
  lastName: z.string().trim().nonempty("Last Name is required")
    .regex(/^[A-Za-z\s'-]+$/, "Last Name must contain only letters"),

  firstName: z.string().trim().nonempty("First Name is required")
    .regex(/^[A-Za-z\s'-]+$/, "First Name must contain only letters"),

  middleName: z.string().trim()
    .regex(/^[A-Za-z\s'-]*$/, "Middle Name must contain only letters")
    .optional().or(z.literal("")),

  suffix: z.string().trim()
    .regex(/^[A-Za-z.]*$/, "Suffix must be alphabetic")
    .optional().or(z.literal("")),

  sex: z.enum(["MALE", "FEMALE", "OTHER"], { errorMap: () => ({ message: "Sex is required" }) }),

  dateOfBirth: z.string().nonempty("Date of Birth is required")
    .refine(v => !isNaN(Date.parse(v)), "Invalid Date of Birth"),

  dateOfDeath: z.string().nonempty("Date of Death is required")
    .refine(v => !isNaN(Date.parse(v)), "Invalid Date of Death"),

  ageAtDeath: z.string().optional(),

  citizenship: z.string().trim().nonempty("Citizenship is required")
    .regex(/^[A-Za-z\s'-]+$/, "Citizenship must contain only letters"),

  religion: z.string().trim()
    .regex(/^[A-Za-z\s'-]*$/, "Religion must contain only letters")
    .optional().or(z.literal("")),

  civilStatus: z.enum(["SINGLE", "MARRIED", "WIDOWED", "SEPARATED", "OTHER"], {
    errorMap: () => ({ message: "Civil Status is required" })
  }),

  occupation: z.string().optional().or(z.literal(""))
});
