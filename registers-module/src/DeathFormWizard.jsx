import React, { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deathFormSchema } from "./schemas/registrationSchema";
import { deathFormDefaultValues } from "./utils/deathFormDefaultValues";
import { formSteps, cemeteries } from "./utils/fields";
import { formatAge } from "./utils/ageUtils";
import StepPage from "./components/StepPage";
import SuccessModal from "./shared/SuccessModal";
import ErrorModal from "./shared/ErrorModal";
import { regions, provinces, cities, barangays } from "phil-address";

export default function DeathFormWizard() {
  const [page, setPage] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDateError, setShowDateError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm({
    resolver: zodResolver(deathFormSchema),
    mode: "onChange",
    defaultValues: deathFormDefaultValues,
  });

  const { watch, setValue, trigger, register, formState: { errors } } = form;

  // AUTO CALCULATE AGE
  const dob = watch("dateOfBirth");
  const dod = watch("dateOfDeath");
  const startDate = watch("startDate");

  useEffect(() => {
    if (!startDate) return;

    const start = new Date(startDate);
    const end = new Date(start);
    end.setFullYear(start.getFullYear() + 5);
    const formatted = end.toISOString().split("T")[0];

    setValue("endDate", formatted, { shouldValidate: true });
  }, [startDate, setValue]);

  useEffect(() => {
    if (dob && dod) {
      const birth = new Date(dob);
      const death = new Date(dod);
      let age = death.getFullYear() - birth.getFullYear();
      const monthDiff = death.getMonth() - birth.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && death.getDate() < birth.getDate())) age--;
      setValue("ageAtDeath", age.toString());
    }
  }, [dob, dod, setValue]);

  // HANDLE DYNAMIC LOT OPTIONS (Step 2)
  const selectedCemetery = watch("cemeteryArea");
  const [lotOptions, setLotOptions] = useState([]);

  useEffect(() => {
    if (selectedCemetery) {
      const cemetery = cemeteries.find(c => c.id === Number(selectedCemetery));

      // Set cemetery address (optional)
      setValue("cemeteryAddress", cemetery?.address || "");

      // LOT OPTIONS → now using IDs
      const lots = cemetery?.lots.map(lot => ({
        label: lot.label,
        value: lot.id
      })) || [];

      setLotOptions(lots);

      // Reset lot selection
      setValue("cemeteryLot", "");
    } else {
      setLotOptions([]);
      setValue("cemeteryAddress", "");
      setValue("cemeteryLot", "");
    }
  }, [selectedCemetery]);


  useEffect(() => {
  if (dob && dod) {
    const ageStr = formatAge(dob, dod);
    setValue("ageAtDeath", ageStr);
  }
}, [dob, dod, setValue]);

  // NEXT PAGE
  const nextPage = async () => {
    const nestedFields = formSteps[page].flatMap(section =>
      section.fields.flatMap(f =>
        f.type === "address"
          ? [`${f.name}.region`, `${f.name}.province`, `${f.name}.city`, `${f.name}.barangay`]
          : [f.name]
      )
    );

    // DOB > DOD check
    if ((nestedFields.includes("dateOfBirth") || nestedFields.includes("dateOfDeath")) && dob && dod) {
      if (new Date(dob) > new Date(dod)) {
        setShowDateError(true);
        return;
      }
    }

    const isValid = await trigger(nestedFields);
    if (isValid) setPage(p => p + 1);
  };

  const prevPage = () => setPage(p => p - 1);

  // FINAL SUBMIT
  const onSubmit = async (data) => {
    try {
      const convert = async (addr) => {
        const reg = await regions();
        const prov = await provinces(addr.region);
        const cts = await cities(addr.province);
        const brg = await barangays(addr.city);

        return {
          region: reg.find(r => r.psgcCode === addr.region)?.name || "",
          province: prov.find(p => p.psgcCode === addr.province || p.id === addr.province)?.name || "",
          city: cts.find(c => c.psgcCode === addr.city || c.id === addr.city)?.name || "",
          barangay: brg.find(b => b.id === addr.barangay)?.name || "",
        };
      };

      data.residence = await convert(data.residence);
      data.placeOfDeath = await convert(data.placeOfDeath);

      console.log("FINAL DATA:", data);
      setShowSuccess(true);
    } catch (err) {
      console.error(err);
      setErrorMessage("Address conversion failed.");
      setShowError(true);
    }
  };

  // DYNAMICLY ADJUST LOT OPTIONS IN Step2
  const currentSections = formSteps[page].map(section => ({
    ...section,
    fields: section.fields.map(f =>
      f.name === "cemeteryLot"
        ? { ...f, options: lotOptions }
        : f
    )
  }));


  return (
    <Container className="py-4">
      <Card className="p-4 shadow">
        <h2 className="text-center m-4">Step {page + 1}</h2>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <StepPage
            sections={currentSections}
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />

          <div className="d-flex justify-content-between mt-4">
            {page > 0 ? (
              <Button variant="secondary" onClick={prevPage}>Back</Button>
            ) : <span />}
            {page < formSteps.length - 1 ? (
              <Button type="button" onClick={nextPage}>Next</Button>
            ) : (
              <Button type="submit" variant="success">Submit</Button>
            )}
          </div>
        </form>
      </Card>

      <SuccessModal show={showSuccess} message="Form submitted successfully!" onClose={() => setShowSuccess(false)} />
      <ErrorModal show={showError} message={errorMessage} onClose={() => setShowError(false)} />
      <ErrorModal show={showDateError} message="Date of Death must be after Date of Birth." onClose={() => setShowDateError(false)} />
    </Container>
  );
}
