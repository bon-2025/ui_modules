import React from "react";
import { Modal, Button, Form, Row, Col, Card } from "react-bootstrap";
import { simpleFields, nestedFields } from "./config/recordFields.js";

export const RecordModal = ({ show, onHide, mode, record, onChange, onSave, onArchive }) => {
  if (!record) return null;

    const renderInput = (field) => (
    <Form.Group className="mb-3" key={field.name}>
        <Form.Label>{field.label}</Form.Label>
        <Form.Control
        type={field.type || "text"}
        name={field.name}
        value={record[field.name] || ""}
        onChange={onChange}
        disabled={mode === "view" || field.disabled} // Respect the field's disabled property
        />
    </Form.Group>
    );

    const renderNestedInput = (parent, field) => (
    <Form.Group className="mb-3" key={`${parent}-${field.name}`}>
        <Form.Label>{`${field.label}`}</Form.Label>
        <Form.Control
        type="text"
        name={field.name}
        value={record[parent]?.[field.name] || ""}
        onChange={(e) =>
            onChange({
            target: {
                name: parent,
                value: { ...record[parent], [field.name]: e.target.value },
            },
            })
        }
        disabled={mode === "view" || field.disabled} // Can also add disabled if needed for nested fields
        />
    </Form.Group>
    );


  // Group fields by section
  const groupFieldsBySection = (fields) =>
    fields.reduce((acc, field) => {
      acc[field.section] = acc[field.section] || [];
      acc[field.section].push(field);
      return acc;
    }, {});

  const renderSections = () => {
    const grouped = groupFieldsBySection(simpleFields);
    return Object.entries(grouped).map(([section, fields]) => (
      <Card className="mb-3 border-primary" key={section}>
        <Card.Header>{section}</Card.Header>
        <Card.Body>
          {fields.map((field, i) =>
            i % 2 === 0 ? (
              <Row key={i}>
                <Col md={6}>{renderInput(fields[i])}</Col>
                {fields[i + 1] && <Col md={6}>{renderInput(fields[i + 1])}</Col>}
              </Row>
            ) : null
          )}
        </Card.Body>
      </Card>
    ));
  };

  const renderNestedSections = () =>
    nestedFields.map((group) => (
      <Card className="mb-3 border-secondary" key={group.parent}>
        <Card.Header>{group.section}</Card.Header>
        <Card.Body>
          {group.fields.map((field, i) =>
            i % 2 === 0 ? (
              <Row key={i}>
                <Col md={6}>{renderNestedInput(group.parent, group.fields[i])}</Col>
                {group.fields[i + 1] && <Col md={6}>{renderNestedInput(group.parent, group.fields[i + 1])}</Col>}
              </Row>
            ) : null
          )}
        </Card.Body>
      </Card>
    ));

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === "view" ? "View Record" : mode === "edit" ? "Edit Record" : mode === "extend" ? "Extend Contract" : "Add Record"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {renderSections()}
          {renderNestedSections()}

          <Card className="mb-3 border-success">
            <Card.Header>Status</Card.Header>
            <Card.Body>
              <Form.Group>
                <Form.Control type="text" value={record.status || "Active"} disabled />
              </Form.Group>
            </Card.Body>
          </Card>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        {(mode === "edit" || mode === "extend" || mode === "add") && (
          <Button variant="success" onClick={() => onSave(record)}>Save</Button>
        )}
        {mode === "view" && (
          <Button variant="danger" onClick={() => { onArchive(record.id); onHide(); }}>Archive</Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
