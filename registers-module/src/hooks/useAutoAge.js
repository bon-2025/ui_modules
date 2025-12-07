import { useEffect } from "react";
import { formatAge } from "../utils/ageUtils";

export const useAutoAge = (dob, dod, setValue) => {
  useEffect(() => {
    if (!dob || !dod) return;

    const ageStr = formatAge(dob, dod);
    setValue("ageAtDeath", ageStr);
  }, [dob, dod, setValue]);
};
