import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useDeathFormWizard = (schema, defaultValues = {}) => {
  const [page, setPage] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues,
  });

  const { watch, setValue, trigger, getValues } = form;

  // Auto-calculate age if fields exist
  const dob = watch("dateOfBirth");
  const dod = watch("dateOfDeath");

  useEffect(() => {
    if (dob && dod) {
      const b = new Date(dob);
      const d = new Date(dod);
      let age = d.getFullYear() - b.getFullYear();
      const month = d.getMonth() - b.getMonth();
      if (month < 0 || (month === 0 && d.getDate() < b.getDate())) age--;
      setValue("ageAtDeath", age.toString());
    }
  }, [dob, dod, setValue]);

  const nextPage = async (currentStepFields) => {
    const currentFieldNames = currentStepFields.map((f) => f.name);
    const valid = await trigger(currentFieldNames);

    if (!valid) {
      const currentValues = getValues(currentFieldNames);
      try {
        schema.pick(currentFieldNames).parse(currentValues);
      } catch (err) {
        if (err?.errors) {
          setErrorMessage(err.errors.map(e => `${e.path[0]}: ${e.message}`).join("\n"));
          setShowError(true);
        }
      }
    } else {
      setPage((p) => p + 1);
    }
  };

  const prevPage = () => setPage((p) => p - 1);

  return {
    page,
    showSuccess,
    showError,
    errorMessage,
    setShowSuccess,
    setShowError,
    form,
    nextPage,
    prevPage,
  };
};
