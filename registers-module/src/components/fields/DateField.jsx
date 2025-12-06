import React from "react";
import { Form } from "react-bootstrap";

export default function DateField({ field, register, error }) {
  return (
    <div className="col-12 col-md-12">
      <Form.Label>{field.label}</Form.Label>
      <Form.Control type="date" {...register(field.name)} />
      {error && <Form.Text className="text-danger">{error}</Form.Text>}
    </div>
  );
}
