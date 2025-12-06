import { z } from "zod";

// -------------------------
// STEP 1 — PERSONAL INFORMATION
// -------------------------
const personalInfoSchema = z
  .object({
    lastName: z
      .string()
      .trim()
      .nonempty("Last Name is required")
      .regex(/^[A-Za-z\s'-]+$/, "Last Name must contain only letters"),

    firstName: z
      .string()
      .trim()
      .nonempty("First Name is required")
      .regex(/^[A-Za-z\s'-]+$/, "First Name must contain only letters"),

    middleName: z
      .string()
      .trim()
      .regex(/^[A-Za-z\s'-]*$/, "Middle Name must contain only letters")
      .optional(), // ✔ regex before optional

    suffix: z
      .string()
      .trim()
      .regex(/^[A-Za-z.]*$/, "Suffix must be alphabetic")
      .optional(), // ✔ regex before optional

    sex: z.enum(["Male", "Female"], {
      errorMap: () => ({ message: "Sex is required" }),
    }),

    dateOfBirth: z
      .string()
      .nonempty("Date of Birth is required")
      .refine((val) => !isNaN(Date.parse(val)), "Invalid Date of Birth"),

    dateOfDeath: z
      .string()
      .nonempty("Date of Death is required")
      .refine((val) => !isNaN(Date.parse(val)), "Invalid Date of Death"),

    ageAtDeath: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Number(val)), "Age must be a number"),

    citizenship: z
      .string()
      .trim()
      .nonempty("Citizenship is required")
      .regex(/^[A-Za-z\s'-]+$/, "Citizenship must contain only letters"),

    religion: z
      .string()
      .trim()
      .regex(/^[A-Za-z\s'-]*$/, "Religion must contain only letters")
      .optional(), // ✔ fixed order

    civilStatus: z.enum(["Single", "Married", "Widowed", "Separated"], {
      errorMap: () => ({ message: "Civil Status is required" }),
    }),
  })



// -------------------------
// STEP 1 — PARENTS INFORMATION
// -------------------------
const parentInfoSchema = z.object({
  // Father
  firstNameOfFather: z
    .string()
    .trim()
    .nonempty("Father's First Name is required")
    .regex(/^[A-Za-z\s'-]+$/, "Father's First Name must contain only letters"),

  middleNameOfFather: z
    .string()
    .trim()
    .regex(/^[A-Za-z\s'-]*$/, "Father's Middle Name must contain only letters")
    .optional(),

  lastNameOfFather: z
    .string()
    .trim()
    .nonempty("Father's Last Name is required")
    .regex(/^[A-Za-z\s'-]+$/, "Father's Last Name must contain only letters"),

  // Mother
  firstNameOfMother: z
    .string()
    .trim()
    .nonempty("Mother's First Name is required")
    .regex(/^[A-Za-z\s'-]+$/, "Mother's First Name must contain only letters"),

  middleNameOfMother: z
    .string()
    .trim()
    .regex(/^[A-Za-z\s'-]*$/, "Mother's Middle Name must contain only letters")
    .optional(),

  lastNameOfMother: z
    .string()
    .trim()
    .nonempty("Mother's Last Name is required")
    .regex(/^[A-Za-z\s'-]+$/, "Mother's Last Name must contain only letters"),
});


// -------------------------
// STEP 1 — ADDRESSES
// -------------------------
const addressSchema = z.object({
  region: z.string().nonempty("Region is required"),
  province: z.string().nonempty("Province is required"),
  city: z.string().nonempty("City/Municipality is required"),
  barangay: z.string().nonempty("Barangay is required"),
});

// -------------------------
// STEP 2 — CONTRACT INFORMATION
// -------------------------
const contractInfoSchema = z
  .object({
    permitNumber: z
      .string()
      .trim()
      .nonempty("Burial Permit Number is required")
      .regex(/^[0-9]+$/, "Permit Number must contain numbers only")
      .min(9, "Permit Number must be exactly 9 digits")
      .max(9, "Permit Number must be exactly 9 digits"),


    cemeteryName: z
      .string()
      .trim()
      .nonempty("Cemetery Name is required")
      .regex(/^[A-Za-z0-9\s'-]+$/, "Cemetery Name must contain valid characters"),

    cemeteryLot: z
      .string()
      .trim()
      .nonempty("Cemetery Lot is required")
      .regex(/^[A-Za-z0-9\s-]+$/, "Cemetery Lot must be alphanumeric"),

    startDate: z
      .string()
      .nonempty("Start Date is required")
      .refine((v) => !isNaN(Date.parse(v)), "Invalid Start Date"),

    endDate: z
      .string()
      .nonempty("End Date is required")
      .refine((v) => !isNaN(Date.parse(v)), "Invalid End Date"),
  })

export const contactInfoSchema = z.object({
  firstName: z
    .string()
    .trim()
    .nonempty("Contact First Name is required")
    .regex(/^[A-Za-z\s'-]+$/, "First Name must contain only letters"),

  middleName: z
    .string()
    .trim()
    .regex(/^[A-Za-z\s'-]*$/, "Middle Name must contain only letters")
    .optional()
    .or(z.literal("")),

  lastName: z
    .string()
    .trim()
    .nonempty("Contact Last Name is required")
    .regex(/^[A-Za-z\s'-]+$/, "Last Name must contain only letters"),

  suffix: z
    .string()
    .trim()
    .regex(/^[A-Za-z.]*$/, "Suffix must be alphabetic")
    .optional()
    .or(z.literal("")),

  position: z
    .string()
    .trim()
    .nonempty("Position is required"),

  phoneNumber: z
    .string()
    .trim()
    .nonempty("Phone number is required")
    .regex(/^09\d{9}$/,"Phone number must start with 09 and be exactly 11 digits"),

  email: z
    .string()
    .trim()
    .nonempty("Email Address is required")
    .email("Invalid email format")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Email must be a valid format (example@example.com)"),
});



// -------------------------
// COMPLETE DEATH FORM SCHEMA
// -------------------------
export const deathFormSchema = z.object({
  ...personalInfoSchema.shape,
  ...parentInfoSchema.shape,
  residence: addressSchema,
  placeOfDeath: addressSchema,
  cemeteryAddress: z.string().nonempty("Cemetery Address is required"), // Step 1

  ...contractInfoSchema.shape, // Step 2
  ...contactInfoSchema.shape
});
