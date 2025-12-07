import React from "react";
import { Form } from "react-bootstrap";
import TextField from "./fields/TextField";
import DateField from "./fields/DateField";
import SelectField from "./fields/SelectField";
import AddressField from "./fields/AddressField";
import CemeterySelectField from "./fields/CemeterySelectField";
import LotSelectField from "./fields/LotSelectField";

export default function DynamicField({ field, register, errors, watch }) {
  const error = errors?.[field.name]?.message || "";
  const watchedValue = field.type === "text" ? watch(field.name) || "" : undefined;

  return (
    <>
    <div className="col-12 col-md-3">
      <Form.Group className="mb-2">
        {field.type === "text" && (<TextField field={field} register={register} error={error} value={watchedValue} />)}
        {field.type === "date" && <DateField field={field} register={register} error={error} />}
        {field.type === "select" && <SelectField field={field} register={register} error={error} />}
        {field.type === "cemetery" && <CemeterySelectField field={field} register={register} error={error} />}
        {field.type === "lot" && <LotSelectField field={field} register={register} error={error} />}
      </Form.Group>
    </div>
    {field.type === "address" && ( <AddressField field={field} register={register} watch={watch} errors={errors} />)}
    </>
    
  );
}
