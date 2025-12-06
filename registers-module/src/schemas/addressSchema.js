import { z } from "zod";

export const addressSchema = z.object({
  region: z.string().min(1, "Region is required"),
  province: z.string().min(1, "Province is required"),
  city: z.string().min(1, "City/Municipality is required"),
  barangay: z.string().min(1, "Barangay is required"),
  street: z.string().optional(), // optional if you want street input
});
