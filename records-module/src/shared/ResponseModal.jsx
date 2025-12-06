import React from "react";
import { Modal, Button } from "react-bootstrap";

/**
 * @param {boolean} show - Whether modal is visible
 * @param {function} onHide - Close modal
 * @param {string} message - Success or error message
 * @param {"success"|"error"} type - Type of response
 */
export const ResponseModal = ({ show, onHide, message, type }) => {
  const variant = type === "success" ? "success" : "danger";

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className={`bg-${variant} text-white`}>
        <Modal.Title>{type === "success" ? "Success" : "Error"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant={variant} onClick={onHide}>OK</Button>
      </Modal.Footer>
    </Modal>
  );
};
