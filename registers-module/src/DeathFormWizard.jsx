import { useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { deathFormSchema } from "./schemas/deathFormSchema";
import { deathFormDefaultValues } from "./utils/deathFormDefaultValues";
import { formSteps } from "./utils/fields";

import StepPage from "./components/StepPage";
import SuccessModal from "./shared/SuccessModal";
import ErrorModal from "./shared/ErrorModal";

import { registerUser } from "./services/registrationService";
import { convertAddress } from "./utils/addressUtils";

import { useAutoAge } from "./hooks/useAutoAge";
import { useCemeteryLots } from "./hooks/useCemeteryLots";
import { useAutoEndDate } from "./hooks/useAutoEndDate";

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


  const { watch, setValue, trigger, register, formState: { errors }, handleSubmit } = form;

  const dob = watch("dateOfBirth");
  const dod = watch("dateOfDeath");
  const startDate = watch("startDate");
  const cemeteryArea = watch("cemeteryArea");

  useAutoEndDate(startDate, setValue);
  useAutoAge(dob, dod, setValue);
  const lotOptions = useCemeteryLots(cemeteryArea, setValue);

  const currentSections = formSteps[page].map(section => ({
    ...section,
    fields: section.fields.map(f =>
      f.name === "cemeteryLot" ? { ...f, options: lotOptions } : f
    )
  }));

  const nextPage = async () => {
    const nestedFields = formSteps[page].flatMap(section =>
      section.fields.flatMap(f =>
        f.type === "address"
          ? [`${f.name}.region`, `${f.name}.province`, `${f.name}.city`, `${f.name}.barangay`]
          : [f.name]
      )
    );

    if (nestedFields.includes("dateOfBirth") && nestedFields.includes("dateOfDeath")) {
      if (new Date(dob) > new Date(dod)) {
        setShowDateError(true);
        return;
      }
    }

    const isValid = await trigger(nestedFields);
    if (isValid) setPage(p => p + 1);
  };

  const prevPage = () => setPage(p => p - 1);

const onSubmit = async (data) => {
  try {
    const finalPayload = {
      personalInfoDTO: {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        suffix: data.suffix,
        sex: data.sex,
        dateOfBirth: data.dateOfBirth,
        dateOfDeath: data.dateOfDeath,
        ageAtDeath: data.ageAtDeath
      },
      parentsInfoDTO: {
        fatherFirstName: data.firstNameOfFather,
        fatherMiddleName: data.middleNameOfFather,
        fatherLastName: data.lastNameOfFather,
        motherFirstName: data.firstNameOfMother,
        motherMiddleName: data.middleNameOfMother,
        motherLastName: data.lastNameOfMother,
      },
      deathDetailsDTO: {
        causeOfDeath: data.causeOfDeath,
        bodyEmbalmed: data.bodyEmbalmed,
        disposition: data.position,
        infectious: data.infectious,
        cemeteryAddress: data.cemeteryAddress,
      },
      contactInfoDTO: {
        phoneNumber: data.phoneNumber,
        email: data.email,
        position: data.position,
      },
      contractDTO: {
        permitNumber: data.permitNumber,
        startDate: data.startDate,
        endDate: data.endDate,
        cemeteryArea: data.cemeteryArea,
        cemeteryLot: data.cemeteryLot,
      },
      residenceDTO: await convertAddress(data.residence),
      placeOfDeathDTO: await convertAddress(data.placeOfDeath),
    };

    const response = await registerUser(finalPayload);

    if (response.success) setShowSuccess(true);
    else throw new Error("Registration failed.");
  } catch (err) {
    setErrorMessage(err.message);
    setShowError(true);
  }
};



  return (
    <Container className="py-4">
      <Card className="p-4 shadow">
        <h2 className="text-center m-4">Step {page + 1}</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <StepPage
            sections={currentSections}
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />

          <div className="d-flex justify-content-between mt-4">
            {page > 0 ? <Button variant="secondary" onClick={prevPage}>Back</Button> : <span />}
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
