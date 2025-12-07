import { useEffect } from "react";

export const useAutoEndDate = (startDate, setValue) => {
  useEffect(() => {
    if (!startDate) return;

    const start = new Date(startDate);
    const end = new Date(start);
    end.setFullYear(start.getFullYear() + 5);

    setValue("endDate", end.toISOString().split("T")[0], {
      shouldValidate: true,
    });
  }, [startDate, setValue]);
};
