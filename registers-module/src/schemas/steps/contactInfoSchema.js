import { z } from "zod";

export const contactInfoSchema = z.object({
  firstName: z.string().trim().nonempty("Contact First Name is required")
    .regex(/^[A-Za-z\s'-]+$/, "First Name must contain only letters"),

  middleName: z.string().trim()
    .regex(/^[A-Za-z\s'-]*$/, "Middle Name must contain letters")
    .optional().or(z.literal("")),

  lastName: z.string().trim().nonempty("Contact Last Name is required")
    .regex(/^[A-Za-z\s'-]+$/, "Last Name must contain only letters"),

  suffix: z.string().trim()
    .regex(/^[A-Za-z.]*$/, "Suffix must be alphabetic")
    .optional().or(z.literal("")),

  position: z.string().trim().nonempty("Position is required"),

  phoneNumber: z.string().trim()
    .nonempty("Phone number is required")
    .regex(/^09\d{9}$/, "Phone number must start with 09 and be 11 digits"),

  email: z.string().trim()
    .nonempty("Email Address is required")
    .email("Invalid email format")
});
