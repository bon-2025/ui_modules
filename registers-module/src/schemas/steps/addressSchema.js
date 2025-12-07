import { z } from "zod";

export const addressSchema = z.object({
  region: z.string().nonempty("Region is required"),
  province: z.string().nonempty("Province is required"),
  city: z.string().nonempty("City/Municipality is required"),
  barangay: z.string().nonempty("Barangay is required")
});
