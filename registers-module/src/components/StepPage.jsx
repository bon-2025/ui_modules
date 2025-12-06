import React from "react";
import DynamicField from "./DynamicField";

export default function StepPage({ sections, register, errors, watch, setValue }) {
  return (
    <>
      {sections.map((section, index) => (
        <div key={index} className="mb-4">
          <h4 className="mb-3 text-uppercase fw-bold">{section.section}</h4>
          <div className="row g-3">
            {section.fields.map((field) => (
              <DynamicField
                key={field.name}
                field={field}
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue} // optional if needed inside DynamicField
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
