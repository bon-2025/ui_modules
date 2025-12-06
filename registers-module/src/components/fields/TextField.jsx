import React from "react";
import { Form } from "react-bootstrap";

export default function TextField({ field, register, error, value }) {
  return (
    <div className="col-12 col-md-12">
      <Form.Label>{field.label}</Form.Label>
      <Form.Control
        type="text"
        {...register(field.name)}
        disabled={field.disabled}
        placeholder={field.placeholder}
        value={field.disabled ? value : undefined}
      />
      {error && <Form.Text className="text-danger">{error}</Form.Text>}
    </div>
  );
}
