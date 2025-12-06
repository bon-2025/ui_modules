import React from "react";
import { Form } from "react-bootstrap";

export default function CemeterySelectField({ field, register, error }) {
  return (
    <Form.Group className="mb-2">
      <Form.Label>{field.label}</Form.Label>
      <Form.Select {...register(field.name)}>
        <option value="">Select {field.label}</option>
        {field.options?.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Form.Select>
      {error && <div className="text-danger">{error}</div>}
    </Form.Group>
  );
}
