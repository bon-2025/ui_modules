import React from "react";
import { Form } from "react-bootstrap";

export default function SelectField({ field, register, error }) {
  return (
    <div className="col-12 col-md-12">
      <Form.Label>{field.label}</Form.Label>
      <Form.Select {...register(field.name)}>
        <option value="">Select...</option>
        {field.options?.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </Form.Select>
      {error && <Form.Text className="text-danger">{error}</Form.Text>}
    </div>
  );
}
