import { z } from "zod";

import { personalInfoSchema } from "./steps/personalInfoSchema";
import { parentInfoSchema } from "./steps/parentInfoSchema";
import { addressSchema } from "./steps/addressSchema";
import { contractInfoSchema } from "./steps/contractInfoSchema";
import { contactInfoSchema } from "./steps/contactInfoSchema";

export const deathFormSchema = z.object({
  ...personalInfoSchema.shape,
  ...parentInfoSchema.shape,

  residence: addressSchema,
  placeOfDeath: addressSchema,

  cemeteryAddress: z.string().nonempty("Cemetery Address is required"),

  ...contractInfoSchema.shape,
  ...contactInfoSchema.shape
});
