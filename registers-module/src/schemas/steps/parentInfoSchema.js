import { z } from "zod";

export const parentInfoSchema = z.object({
  firstNameOfFather: z.string().trim().nonempty("Father's First Name is required")
    .regex(/^[A-Za-z\s'-]+$/, "Father's First Name must contain only letters"),

  middleNameOfFather: z.string().trim()
    .regex(/^[A-Za-z\s'-]*$/, "Father's Middle Name must contain letters")
    .optional().or(z.literal("")),

  lastNameOfFather: z.string().trim().nonempty("Father's Last Name is required")
    .regex(/^[A-Za-z\s'-]+$/, "Father's Last Name must contain only letters"),

  firstNameOfMother: z.string().trim().nonempty("Mother's First Name is required")
    .regex(/^[A-Za-z\s'-]+$/, "Mother's First Name must contain only letters"),

  middleNameOfMother: z.string().trim()
    .regex(/^[A-Za-z\s'-]*$/, "Mother's Middle Name must contain letters")
    .optional().or(z.literal("")),

  lastNameOfMother: z.string().trim().nonempty("Mother's Last Name is required")
    .regex(/^[A-Za-z\s'-]+$/, "Mother's Last Name must contain only letters"),

  causeOfDeath: z.string().nonempty("Cause of Death is required")
});
